"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";
import { useAudioPlayer } from "./AudioPlayerProvider";

// mesh depth resolution (rows); width is tunable via config.segments
const SEG_Z = 64;
const PLANE_W = 10;
const PLANE_D = 20;

// ---- tunable config (mirrors ptc-player's TerrainVisualizer controls) ----
export interface TerrainConfig {
  amplitude: number; // wave height from audio
  speed: number; // history scroll rate (rows/sec-ish)
  decay: number; // per-row falloff toward the back
  sineAmplitude: number; // ambient idle sine base
  segments: number; // mesh width resolution
  autoRotation: number; // camera yaw per frame
  cameraDistance: number;
  camPitch: number; // camera elevation (radians)
  camYaw: number; // camera azimuth start (radians)
}

export const DEFAULT_CONFIG: TerrainConfig = {
  amplitude: 4.3,
  speed: 17.5,
  decay: 0.97,
  sineAmplitude: 0.75,
  segments: 80,
  autoRotation: 0,
  cameraDistance: 5,
  camPitch: 0.75,
  camYaw: 0.993,
};

// live camera state, mutated by mouse/touch and the auto-rotation loop
export interface ViewState {
  yaw: number;
  pitch: number;
  distance: number;
  dragging: boolean;
  lastX: number;
  lastY: number;
}

// resample a spectrum array to a target length (linear interp)
function resample(data: Float32Array, target: number): number[] {
  const out = new Array(target);
  const ratio = data.length / target;
  for (let i = 0; i < target; i++) {
    const s = i * ratio;
    const lo = Math.floor(s);
    const hi = Math.min(lo + 1, data.length - 1);
    const f = s - lo;
    out[i] = data[lo] * (1 - f) + data[hi] * f;
  }
  return out;
}

// 3-pass neighbour smoothing for a cleaner ridge line
function smoothWave(data: number[], passes: number): number[] {
  let result = data;
  for (let p = 0; p < passes; p++) {
    const out = new Array(result.length);
    for (let i = 0; i < result.length; i++) {
      const prev = result[Math.max(0, i - 1)];
      const curr = result[i];
      const next = result[Math.min(result.length - 1, i + 1)];
      out[i] = prev * 0.25 + curr * 0.5 + next * 0.25;
    }
    result = out;
  }
  return result;
}

interface TerrainProps {
  color: string;
  segments: number;
  spectrumRef: React.MutableRefObject<Float32Array>;
  cfgRef: React.MutableRefObject<TerrainConfig>;
}

function Terrain({ color, segments, spectrumRef, cfgRef }: TerrainProps) {
  const segX = Math.max(8, Math.round(segments));

  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(PLANE_W, PLANE_D, segX - 1, SEG_Z - 1);
    g.rotateX(-Math.PI / 2);
    return g;
  }, [segX]);

  // rolling audio history: SEG_Z rows, newest at the front (index 0)
  const history = useRef<number[][]>([]);
  useMemo(() => {
    history.current = [];
    for (let i = 0; i < SEG_Z; i++) history.current.push(new Array(segX).fill(0));
  }, [segX]);
  const lastUpdate = useRef(0);

  useFrame(({ clock }) => {
    const cfg = cfgRef.current;
    const nowMs = clock.elapsedTime * 1000;
    const interval = 1000 / cfg.speed;

    // push a new audio frame onto the front of the history at a fixed cadence
    if (nowMs - lastUpdate.current >= interval) {
      lastUpdate.current = nowMs;
      history.current.pop();
      const spec = spectrumRef.current;
      // spread only the lower, energy-rich half of the spectrum across the full
      // width — the top bins are near-silent and would leave the edge flat
      const usable = Math.max(1, Math.floor(spec.length * 0.5));
      const raw = resample(spec.subarray(0, usable), segX).map((v) => v * cfg.amplitude);
      history.current.unshift(smoothWave(raw, 3));
    }

    const pos = geometry.attributes.position;
    const sineAmp = cfg.sineAmplitude;
    const time = clock.elapsedTime;

    for (let z = 0; z < SEG_Z; z++) {
      const decayFactor = Math.pow(cfg.decay, z);
      const zNorm = (z / (SEG_Z - 1)) * 2 - 1;
      const row = history.current[z];
      for (let x = 0; x < segX; x++) {
        const index = z * segX + x;
        const xNorm = (x / (segX - 1)) * 2 - 1;
        const waveHeight = (row?.[x] || 0) * decayFactor;
        const sineBase =
          sineAmp *
          (Math.sin(xNorm * Math.PI * 2 + time * 0.5) * 0.6 +
            Math.cos(zNorm * Math.PI * 1.5 + time * 0.3) * 0.4);
        pos.setY(index, waveHeight + sineBase);
      }
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh geometry={geometry} position={[0, 0, -PLANE_D / 2]}>
      <meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
    </mesh>
  );
}

function Rig({
  cfgRef,
  viewRef,
}: {
  cfgRef: React.MutableRefObject<TerrainConfig>;
  viewRef: React.MutableRefObject<ViewState>;
}) {
  const { camera } = useThree();
  useFrame(() => {
    const cfg = cfgRef.current;
    const v = viewRef.current;
    if (!v.dragging) v.yaw += cfg.autoRotation;
    const d = v.distance;
    camera.position.set(
      d * Math.sin(v.yaw) * Math.cos(v.pitch),
      d * Math.sin(v.pitch),
      d * Math.cos(v.yaw) * Math.cos(v.pitch)
    );
    camera.lookAt(0, 0, -5);
  });
  return null;
}

export function TerrainVisualizer() {
  const { theme } = useTheme();
  const lineColor = theme === "dark" ? "#d8d3c8" : "#4a453d";
  const { playing, toggle, spectrumRef } = useAudioPlayer();

  const [tuning, setTuning] = useState(false);
  const [config, setConfig] = useState<TerrainConfig>(DEFAULT_CONFIG);
  const cfgRef = useRef(config);
  cfgRef.current = config;

  // live, mouse-driven camera state (kept out of React state to avoid re-renders)
  const viewRef = useRef<ViewState>({
    yaw: DEFAULT_CONFIG.camYaw,
    pitch: DEFAULT_CONFIG.camPitch,
    distance: DEFAULT_CONFIG.cameraDistance,
    dragging: false,
    lastX: 0,
    lastY: 0,
  });
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("terrainConfig");
      if (saved) {
        const cfg = { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
        setConfig(cfg);
        viewRef.current.yaw = cfg.camYaw;
        viewRef.current.pitch = cfg.camPitch;
        viewRef.current.distance = cfg.cameraDistance;
      }
    } catch {
      /* ignore */
    }
  }, []);

  const update = (key: keyof TerrainConfig, value: number) => {
    // camera sliders also drive the live view
    if (key === "camPitch") viewRef.current.pitch = value;
    if (key === "cameraDistance") viewRef.current.distance = value;
    if (key === "camYaw") viewRef.current.yaw = value;
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

  // snapshot of the live (mouse-adjusted) camera for copy-config
  const liveView = () => ({
    camYaw: +viewRef.current.yaw.toFixed(3),
    camPitch: +viewRef.current.pitch.toFixed(3),
    cameraDistance: +viewRef.current.distance.toFixed(2),
  });

  // drag to rotate, wheel to zoom (mirrors ptc-player's controls)
  const onPointerDown = (e: React.PointerEvent) => {
    const v = viewRef.current;
    v.dragging = true;
    v.lastX = e.clientX;
    v.lastY = e.clientY;
    // capture the mouse so drags keep tracking off-element; do NOT capture
    // touch — that would block the browser's vertical scroll gesture
    if (e.pointerType === "mouse") {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const v = viewRef.current;
    if (!v.dragging) return;
    // on touch, only horizontal drags reach us (touch-action: pan-y) so pitch
    // is left to the vertical scroll; on mouse, both axes rotate.
    v.yaw += (e.clientX - v.lastX) * 0.005;
    if (e.pointerType === "mouse") {
      v.pitch += (e.clientY - v.lastY) * 0.005;
      v.pitch = Math.max(0.05, Math.min(1.45, v.pitch));
    }
    v.lastX = e.clientX;
    v.lastY = e.clientY;
  };
  const onPointerUp = () => {
    viewRef.current.dragging = false;
  };
  const onPointerCancel = () => {
    viewRef.current.dragging = false;
  };

  // non-passive wheel so we can prevent the page from scrolling while zooming
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const v = viewRef.current;
      v.distance = Math.max(5, Math.min(15, v.distance + e.deltaY * 0.01));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="relative w-full">
      <div
        ref={wrapRef}
        className="aspect-[16/11] w-full cursor-grab touch-pan-y active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          camera={{ fov: 75, near: 0.1, far: 1000 }}
        >
          <Rig cfgRef={cfgRef} viewRef={viewRef} />
          <Terrain
            color={lineColor}
            segments={config.segments}
            spectrumRef={spectrumRef}
            cfgRef={cfgRef}
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

      {/* tiny tuner toggle (default off) */}
      <button
        onClick={() => setTuning((t) => !t)}
        aria-label="Toggle terrain tuner"
        title="Tune terrain"
        className={`pointer-events-auto absolute bottom-2 right-2 z-30 hidden rounded-full border px-2.5 py-1 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.2em] transition-colors md:block ${
          tuning
            ? "border-amber bg-amber/10 text-amber"
            : "border-line/60 text-muted/60 hover:border-amber hover:text-amber"
        }`}
      >
        Tune
      </button>

      {tuning && (
        <TerrainControls
          config={config}
          update={update}
          liveView={liveView}
          onClose={() => setTuning(false)}
          onReset={() => {
            setConfig(DEFAULT_CONFIG);
            viewRef.current.yaw = DEFAULT_CONFIG.camYaw;
            viewRef.current.pitch = DEFAULT_CONFIG.camPitch;
            viewRef.current.distance = DEFAULT_CONFIG.cameraDistance;
          }}
        />
      )}
    </div>
  );
}

const SLIDERS: { key: keyof TerrainConfig; label: string; min: number; max: number; step: number }[] = [
  { key: "amplitude", label: "Wave amplitude", min: 0.5, max: 6, step: 0.1 },
  { key: "speed", label: "Wave speed", min: 1, max: 30, step: 0.5 },
  { key: "decay", label: "Wave decay", min: 0.85, max: 0.99, step: 0.005 },
  { key: "sineAmplitude", label: "Idle sine base", min: 0, max: 1.5, step: 0.05 },
  { key: "segments", label: "Segments", min: 32, max: 256, step: 16 },
  { key: "autoRotation", label: "Auto rotation", min: 0, max: 0.006, step: 0.0002 },
  { key: "cameraDistance", label: "Camera distance", min: 5, max: 15, step: 0.1 },
  { key: "camPitch", label: "Camera pitch", min: 0.1, max: 1.4, step: 0.01 },
];

function TerrainControls({
  config,
  update,
  liveView,
  onReset,
  onClose,
}: {
  config: TerrainConfig;
  update: (key: keyof TerrainConfig, value: number) => void;
  liveView: () => { camYaw: number; camPitch: number; cameraDistance: number };
  onReset: () => void;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    // merge the live mouse-adjusted camera into the exported config
    const out = { ...config, ...liveView() };
    navigator.clipboard?.writeText(JSON.stringify(out, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="pointer-events-auto absolute right-2 top-2 z-30 w-60 rounded-lg border border-line bg-paper/95 p-3 font-[family-name:var(--font-mono)] text-[10px] text-ink shadow-xl backdrop-blur-md">
      <div className="mb-2 flex items-center justify-between">
        <span className="uppercase tracking-[0.2em] text-muted">Terrain tuner</span>
        <div className="flex items-center gap-3">
          <button onClick={onReset} className="text-amber hover:text-ink">
            reset
          </button>
          <button
            onClick={onClose}
            aria-label="Close tuner"
            className="flex h-5 w-5 items-center justify-center rounded-full text-muted hover:bg-ink/10 hover:text-ink"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {SLIDERS.map((s) => (
          <label key={s.key} className="block">
            <div className="flex justify-between">
              <span className="text-muted">{s.label}</span>
              <span>{config[s.key].toFixed(s.step < 0.01 ? 4 : 2)}</span>
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
        className="mt-3 w-full rounded border border-amber py-1.5 uppercase tracking-widest text-amber hover:bg-amber hover:text-paper"
      >
        {copied ? "Copied!" : "Copy config"}
      </button>
    </div>
  );
}
