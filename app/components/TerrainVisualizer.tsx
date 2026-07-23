"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";
import { useAudioPlayer } from "./AudioPlayerProvider";

// ---- lightweight value-noise (deterministic, no deps) ----
function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function noise2(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

const SEG_X = 110;
const SEG_Y = 78;
const PLANE_W = 30;
const PLANE_H = 24;

// ---- tunable view/motion config ----
export interface TerrainConfig {
  tilt: number; // extra lean added to the flat plane (radians)
  camX: number;
  camY: number;
  camZ: number;
  lookX: number;
  lookY: number;
  lookZ: number;
  fov: number;
  meshY: number;
  meshZ: number;
  baseAmp: number; // idle noise height
  audioAmp: number; // reactive spectrum height
  scroll: number; // forward scroll speed
}

export const DEFAULT_CONFIG: TerrainConfig = {
  tilt: 0.06,
  camX: 0,
  camY: 2.4,
  camZ: 7.6,
  lookX: 0,
  lookY: 0.2,
  lookZ: -5,
  fov: 42,
  meshY: -0.9,
  meshZ: -1,
  baseAmp: 0.9,
  audioAmp: 3.6,
  scroll: 0.4,
};

interface TerrainProps {
  color: string;
  levelRef: React.MutableRefObject<number>;
  spectrumRef: React.MutableRefObject<Float32Array>;
  beatRef: React.MutableRefObject<number>;
  cfgRef: React.MutableRefObject<TerrainConfig>;
  config: TerrainConfig;
}

function Terrain({ color, levelRef, spectrumRef, beatRef, cfgRef, config }: TerrainProps) {
  const meshRef = useRef<THREE.LineSegments>(null);
  const matRef = useRef<THREE.LineBasicMaterial>(null);

  const geometry = useMemo(() => {
    const plane = new THREE.PlaneGeometry(PLANE_W, PLANE_H, SEG_X, SEG_Y);
    plane.rotateX(-Math.PI / 2); // flat floor; viewing lean is applied on the mesh
    return new THREE.WireframeGeometry(plane);
  }, []);

  const base = useMemo(() => {
    const arr = geometry.attributes.position.array as Float32Array;
    return new Float32Array(arr);
  }, [geometry]);

  useFrame(({ clock }) => {
    const g = meshRef.current?.geometry as THREE.BufferGeometry | undefined;
    if (!g) return;
    const cfg = cfgRef.current;
    const pos = g.attributes.position.array as Float32Array;
    const t = clock.elapsedTime;
    const level = levelRef.current;
    const beat = beatRef.current;
    const spec = spectrumRef.current;
    const usableBins = Math.max(1, Math.floor(spec.length * 0.55));

    const scroll = t * cfg.scroll;
    const baseAmp = cfg.baseAmp + beat * 1.4;
    const audioAmp = cfg.audioAmp + level * 3.0;

    for (let i = 0; i < pos.length; i += 3) {
      const x = base[i];
      const z = base[i + 2];
      const depth = (z + PLANE_H / 2) / PLANE_H;
      const lateral = Math.abs(x) / (PLANE_W / 2);

      const nx = x * 0.17;
      const nz = z * 0.17 + scroll;
      let h =
        (noise2(nx, nz) * 1.0 +
          noise2(nx * 2.3, nz * 2.3) * 0.4 +
          noise2(nx * 4.7, nz * 4.7) * 0.18 -
          0.75) *
        baseAmp;

      const specPos = Math.min(0.999, depth * 0.85 + lateral * 0.12);
      const bin = Math.floor(specPos * (usableBins - 1));
      const s = spec[bin] || 0;
      h += s * s * audioAmp * (0.5 + depth * 0.9);

      pos[i + 1] = base[i + 1] + h;
    }
    g.attributes.position.needsUpdate = true;
    if (matRef.current) {
      matRef.current.opacity = 0.26 + level * 0.45 + beat * 0.2;
    }
  });

  return (
    <lineSegments
      ref={meshRef}
      geometry={geometry}
      position={[0, config.meshY, config.meshZ]}
      rotation={[config.tilt, 0, 0]}
    >
      <lineBasicMaterial ref={matRef} color={color} transparent opacity={0.3} />
    </lineSegments>
  );
}

function Rig({ cfgRef }: { cfgRef: React.MutableRefObject<TerrainConfig> }) {
  const { camera } = useThree();
  useFrame(() => {
    const cfg = cfgRef.current;
    const cam = camera as THREE.PerspectiveCamera;
    cam.position.set(cfg.camX, cfg.camY, cfg.camZ);
    if (cam.fov !== cfg.fov) {
      cam.fov = cfg.fov;
      cam.updateProjectionMatrix();
    }
    cam.lookAt(cfg.lookX, cfg.lookY, cfg.lookZ);
  });
  return null;
}

export function TerrainVisualizer() {
  const { theme } = useTheme();
  const lineColor = theme === "dark" ? "#d8d3c8" : "#4a453d";
  const { playing, toggle, levelRef, spectrumRef, beatRef } = useAudioPlayer();

  // tuning mode is opt-in via ?tune in the URL
  const [tuning, setTuning] = useState(false);
  const [config, setConfig] = useState<TerrainConfig>(DEFAULT_CONFIG);
  const cfgRef = useRef(config);
  cfgRef.current = config;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("tune")) return;
    setTuning(true);
    try {
      const saved = localStorage.getItem("terrainConfig");
      if (saved) setConfig({ ...DEFAULT_CONFIG, ...JSON.parse(saved) });
    } catch {
      /* ignore */
    }
  }, []);

  const update = (key: keyof TerrainConfig, value: number) => {
    setConfig((c) => {
      const next = { ...c, [key]: value };
      try {
        localStorage.setItem("terrainConfig", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  return (
    <div className="relative w-full">
      <div className="aspect-[16/11] w-full">
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          camera={{ fov: config.fov, near: 0.1, far: 100 }}
        >
          <Rig cfgRef={cfgRef} />
          <Terrain
            color={lineColor}
            levelRef={levelRef}
            spectrumRef={spectrumRef}
            beatRef={beatRef}
            cfgRef={cfgRef}
            config={config}
          />
        </Canvas>
      </div>

      {/* minimal overlay play — only shown when paused; controls live in the footer */}
      <button
        onClick={toggle}
        aria-label="Play"
        className={`group absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-amber transition-all duration-300 hover:scale-110 ${
          playing ? "pointer-events-none scale-90 opacity-0" : "pointer-events-auto opacity-100"
        }`}
      >
        <span className="absolute inset-0 rounded-full border border-amber/50 bg-black/20 backdrop-blur-sm transition-colors duration-200 group-hover:border-amber group-hover:bg-black/40" />
        <span className="relative">
          <svg width="18" height="18" viewBox="0 0 14 14" fill="currentColor">
            <path d="M2.5 1.3v11.4a1 1 0 0 0 1.53.85l9-5.7a1 1 0 0 0 0-1.7l-9-5.7A1 1 0 0 0 2.5 1.3Z" />
          </svg>
        </span>
      </button>

      {tuning && <TerrainControls config={config} update={update} onReset={() => setConfig(DEFAULT_CONFIG)} />}
    </div>
  );
}

const SLIDERS: { key: keyof TerrainConfig; label: string; min: number; max: number; step: number }[] = [
  { key: "tilt", label: "Tilt", min: -0.6, max: 0.6, step: 0.005 },
  { key: "camY", label: "Cam height", min: 0, max: 8, step: 0.05 },
  { key: "camZ", label: "Cam distance", min: 3, max: 16, step: 0.05 },
  { key: "camX", label: "Cam side", min: -6, max: 6, step: 0.05 },
  { key: "lookY", label: "Look height", min: -3, max: 3, step: 0.05 },
  { key: "lookZ", label: "Look depth", min: -12, max: 4, step: 0.05 },
  { key: "fov", label: "Zoom (FOV)", min: 20, max: 70, step: 1 },
  { key: "meshY", label: "Terrain Y", min: -4, max: 2, step: 0.05 },
  { key: "meshZ", label: "Terrain Z", min: -6, max: 4, step: 0.05 },
  { key: "baseAmp", label: "Idle height", min: 0, max: 3, step: 0.05 },
  { key: "audioAmp", label: "Audio height", min: 0, max: 10, step: 0.1 },
  { key: "scroll", label: "Scroll speed", min: 0, max: 1.5, step: 0.02 },
];

function TerrainControls({
  config,
  update,
  onReset,
}: {
  config: TerrainConfig;
  update: (key: keyof TerrainConfig, value: number) => void;
  onReset: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="pointer-events-auto absolute right-2 top-2 z-30 w-60 rounded-lg border border-line bg-paper/95 p-3 font-[family-name:var(--font-mono)] text-[10px] text-ink shadow-xl backdrop-blur-md">
      <div className="mb-2 flex items-center justify-between">
        <span className="uppercase tracking-[0.2em] text-muted">Terrain tuner</span>
        <button onClick={onReset} className="text-amber hover:text-ink">reset</button>
      </div>
      <div className="space-y-2">
        {SLIDERS.map((s) => (
          <label key={s.key} className="block">
            <div className="flex justify-between">
              <span className="text-muted">{s.label}</span>
              <span>{config[s.key].toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={config[s.key]}
              onChange={(e) => update(s.key, parseFloat(e.target.value))}
              className="w-full accent-amber"
            />
          </label>
        ))}
      </div>
      <button
        onClick={copy}
        className="mt-3 w-full rounded border border-amber py-1.5 text-amber uppercase tracking-widest hover:bg-amber hover:text-paper"
      >
        {copied ? "Copied!" : "Copy config"}
      </button>
    </div>
  );
}
