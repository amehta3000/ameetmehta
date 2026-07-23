"use client";

import { useRef, useMemo, useEffect } from "react";
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

interface TerrainProps {
  color: string;
  levelRef: React.MutableRefObject<number>;
  spectrumRef: React.MutableRefObject<Float32Array>;
  beatRef: React.MutableRefObject<number>;
}

function Terrain({ color, levelRef, spectrumRef, beatRef }: TerrainProps) {
  const meshRef = useRef<THREE.LineSegments>(null);
  const matRef = useRef<THREE.LineBasicMaterial>(null);

  const geometry = useMemo(() => {
    const plane = new THREE.PlaneGeometry(PLANE_W, PLANE_H, SEG_X, SEG_Y);
    // lay the plane almost flat so the grid recedes into the distance
    plane.rotateX(-Math.PI / 2.08);
    return new THREE.WireframeGeometry(plane);
  }, []);

  const base = useMemo(() => {
    const arr = geometry.attributes.position.array as Float32Array;
    return new Float32Array(arr);
  }, [geometry]);

  useFrame(({ clock }) => {
    const g = meshRef.current?.geometry as THREE.BufferGeometry | undefined;
    if (!g) return;
    const pos = g.attributes.position.array as Float32Array;
    const t = clock.elapsedTime;
    const level = levelRef.current;
    const beat = beatRef.current;
    const spec = spectrumRef.current;
    // use only the lower ~55% of bins — that's where musical energy lives
    const usableBins = Math.max(1, Math.floor(spec.length * 0.55));

    const scroll = t * 0.4;
    // gentle organic base always present; audio adds the reactive height on top
    const baseAmp = 0.9 + beat * 1.4;
    const audioAmp = 3.6 + level * 3.0;

    for (let i = 0; i < pos.length; i += 3) {
      const x = base[i];
      const z = base[i + 2];
      const depth = (z + PLANE_H / 2) / PLANE_H; // 0 = front (near), 1 = back
      const lateral = Math.abs(x) / (PLANE_W / 2); // 0 center .. 1 edge

      // rolling noise floor so it breathes even when idle
      const nx = x * 0.17;
      const nz = z * 0.17 + scroll;
      let h =
        (noise2(nx, nz) * 1.0 +
          noise2(nx * 2.3, nz * 2.3) * 0.4 +
          noise2(nx * 4.7, nz * 4.7) * 0.18 -
          0.75) *
        baseAmp;

      // spectrum mapped across depth: bass at the front, treble toward the back.
      // lateral offset spreads neighbouring bins so ridges aren't perfectly flat.
      const specPos = Math.min(0.999, depth * 0.85 + lateral * 0.12);
      const bin = Math.floor(specPos * (usableBins - 1));
      const s = spec[bin] || 0;
      // square it so quiet noise stays low and peaks punch up
      h += s * s * audioAmp * (0.5 + depth * 0.9);

      pos[i + 1] = base[i + 1] + h;
    }
    g.attributes.position.needsUpdate = true;
    if (matRef.current) {
      matRef.current.opacity = 0.26 + level * 0.45 + beat * 0.2;
    }
  });

  return (
    <lineSegments ref={meshRef} geometry={geometry} position={[0, -0.9, -1]}>
      <lineBasicMaterial ref={matRef} color={color} transparent opacity={0.3} />
    </lineSegments>
  );
}

function Rig() {
  const { camera } = useThree();
  useEffect(() => {
    // low, close camera looking across the plane toward the peaks
    camera.position.set(0, 2.4, 7.6);
    camera.lookAt(0, 0.2, -5);
  }, [camera]);
  return null;
}

export function TerrainVisualizer() {
  const { theme } = useTheme();
  const lineColor = theme === "dark" ? "#d8d3c8" : "#4a453d";
  const { playing, toggle, levelRef, spectrumRef, beatRef } = useAudioPlayer();

  return (
    <div className="relative w-full">
      <div className="aspect-[16/11] w-full">
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          camera={{ fov: 42, near: 0.1, far: 100 }}
        >
          <Rig />
          <Terrain
            color={lineColor}
            levelRef={levelRef}
            spectrumRef={spectrumRef}
            beatRef={beatRef}
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
    </div>
  );
}
