"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { asset } from "@/lib/asset";
import { useTheme } from "./ThemeProvider";

// ---- tracks ----
const TRACKS = [
  { title: "Dive Into Dark", src: "/audio/DiveIntoDark_PTC.mp3" },
  { title: "Some Vibes", src: "/audio/SomeVibes_PTC.mp3" },
  { title: "Slow Burn", src: "/audio/SlowBurn_PTC.mp3" },
  { title: "Stranger Events", src: "/audio/StrangerEvents_PTC.mp3" },
];

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

function Terrain({ color, levelRef }: { color: string; levelRef: React.MutableRefObject<number> }) {
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
    // ease audio level toward target for smooth response
    const level = levelRef.current;
    const amp = 1.1 + level * 4.2;
    const scroll = t * 0.45;
    for (let i = 0; i < pos.length; i += 3) {
      const x = base[i];
      const z = base[i + 2];
      const nx = x * 0.18;
      const nz = z * 0.18 + scroll;
      let h =
        noise2(nx, nz) * 1.0 +
        noise2(nx * 2.3, nz * 2.3) * 0.4 +
        noise2(nx * 4.7, nz * 4.7) * 0.18;
      h = (h - 0.75) * amp;
      // ridge emphasis toward the back
      const depth = (z + PLANE_H / 2) / PLANE_H;
      pos[i + 1] = base[i + 1] + h * (0.4 + depth * 1.2);
    }
    g.attributes.position.needsUpdate = true;
    if (matRef.current) {
      matRef.current.opacity = 0.28 + level * 0.5;
    }
  });

  return (
    <lineSegments ref={meshRef} geometry={geometry} position={[0, -0.9, -1]}>
      <lineBasicMaterial ref={matRef} color={color} transparent opacity={0.32} />
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

  const levelRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const rafRef = useRef<number>(0);

  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const expanded = playing || hovered;

  // drive levelRef from the analyser each frame; idle-drift when paused
  const tick = useCallback(() => {
    const analyser = analyserRef.current;
    const data = dataRef.current;
    if (analyser && data) {
      analyser.getByteFrequencyData(data);
      // bias toward low/mid where the energy lives
      let sum = 0;
      const n = Math.floor(data.length * 0.6);
      for (let i = 0; i < n; i++) sum += data[i];
      const avg = sum / n / 255; // 0..1
      // smooth
      levelRef.current += (avg - levelRef.current) * 0.15;
    } else {
      levelRef.current += (0 - levelRef.current) * 0.05;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  const ensureGraph = useCallback(() => {
    if (ctxRef.current || !audioRef.current) return;
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const source = ctx.createMediaElementSource(audioRef.current);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      ctxRef.current = ctx;
      analyserRef.current = analyser;
      dataRef.current = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));
    } catch {
      /* analyser unavailable — audio still plays through the element directly */
    }
  }, []);

  const play = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return;
    ensureGraph();
    try {
      if (ctxRef.current?.state === "suspended") await ctxRef.current.resume();
    } catch {
      /* ignore */
    }
    try {
      await el.play();
      setPlaying(true);
    } catch (err) {
      console.error("Playback failed", err);
      setPlaying(false);
    }
  }, [ensureGraph]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) pause();
    else play();
  }, [playing, play, pause]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % TRACKS.length);
  }, []);

  // when track changes, load and (if we were playing) continue
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const wasPlaying = playing;
    el.load();
    if (wasPlaying) {
      el.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <div className="relative w-full">
      <div className="aspect-[16/11] w-full">
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          camera={{ fov: 42, near: 0.1, far: 100 }}
        >
          <Rig />
          <Terrain color={lineColor} levelRef={levelRef} />
        </Canvas>
      </div>

      {/* hidden audio element */}
      <audio
        ref={audioRef}
        src={asset(TRACKS[current].src)}
        onEnded={next}
        preload="none"
      />

      {/* mini player — minimal button that expands on hover / while playing */}
      <div
        className="pointer-events-auto absolute bottom-3 right-3"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={`flex items-center rounded-full transition-all duration-300 ease-out ${
            expanded
              ? "border border-line bg-paper/70 py-1.5 pl-1.5 pr-1 backdrop-blur-md"
              : "border border-transparent"
          }`}
        >
          <button
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-amber transition-colors ${
              expanded ? "hover:text-ink" : "bg-black/30 backdrop-blur-sm hover:bg-black/50"
            }`}
          >
            {playing ? (
              <svg width="15" height="15" viewBox="0 0 14 14" fill="currentColor">
                <rect x="2" y="1" width="3.5" height="12" rx="1" />
                <rect x="8.5" y="1" width="3.5" height="12" rx="1" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 14 14" fill="currentColor">
                <path d="M2.5 1.3v11.4a1 1 0 0 0 1.53.85l9-5.7a1 1 0 0 0 0-1.7l-9-5.7A1 1 0 0 0 2.5 1.3Z" />
              </svg>
            )}
          </button>

          {/* revealed content */}
          <div
            className={`flex items-center gap-3 overflow-hidden whitespace-nowrap transition-all duration-300 ease-out ${
              expanded ? "ml-1 max-w-[280px] opacity-100" : "ml-0 max-w-0 opacity-0"
            }`}
          >
            <button
              onClick={next}
              aria-label="Next track"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:text-amber"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M3 2.2v11.6a.8.8 0 0 0 1.23.67l7.2-5.8a.8.8 0 0 0 0-1.34l-7.2-5.8A.8.8 0 0 0 3 2.2Z" />
                <rect x="11.6" y="2" width="2.2" height="12" rx="1" />
              </svg>
            </button>

            <div className="min-w-0">
              <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.2em] text-muted">
                {playing ? "Now playing" : "Part Time Chiller"}
              </p>
              <p className="truncate font-[family-name:var(--font-display)] text-sm font-semibold text-ink">
                {TRACKS[current].title}
              </p>
            </div>

            <div className="flex items-end gap-[3px] pr-2" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-full bg-amber/70"
                  style={{
                    height: 14,
                    animation: playing ? `eq 0.9s ease-in-out ${i * 0.12}s infinite` : "none",
                    opacity: playing ? 1 : 0.35,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes eq {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
