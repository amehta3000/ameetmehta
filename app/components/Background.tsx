"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 160;

function Particles({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, phases } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const phases = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) - 4;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, phases };
  }, []);

  const basePositions = useMemo(() => new Float32Array(positions), [positions]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const geo = ref.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phase = phases[i];
      pos[i * 3] = basePositions[i * 3] + Math.sin(t * 0.18 + phase) * 0.3;
      pos[i * 3 + 1] = basePositions[i * 3 + 1] + Math.cos(t * 0.13 + phase) * 0.3;
      pos[i * 3 + 2] = basePositions[i * 3 + 2] + Math.sin(t * 0.1 + phase * 0.7) * 0.2;
    }
    geo.attributes.position.needsUpdate = true;
    ref.current.rotation.y = t * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color={isDark ? "#f59e0b" : "#94a3b8"}
        transparent
        opacity={isDark ? 0.22 : 0.15}
        sizeAttenuation
      />
    </points>
  );
}

export default function Background() {
  const [isDark, setIsDark] = useState(true);
  const [narrowViewport, setNarrowViewport] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => setIsDark(root.classList.contains("dark"));
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    const mq = window.matchMedia("(max-width: 768px)");
    setNarrowViewport(mq.matches);
    const handleResize = (e: MediaQueryListEvent) => setNarrowViewport(e.matches);
    mq.addEventListener("change", handleResize);

    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(rmq.matches);

    return () => {
      observer.disconnect();
      mq.removeEventListener("change", handleResize);
    };
  }, []);

  if (narrowViewport || reducedMotion) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Particles isDark={isDark} />
      </Canvas>
    </div>
  );
}
