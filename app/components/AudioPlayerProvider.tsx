"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { asset } from "@/lib/asset";

export interface Track {
  title: string;
  src: string;
}

export const TRACKS: Track[] = [
  { title: "Dive Into Dark", src: "/audio/DiveIntoDark_PTC.mp3" },
  { title: "Some Vibes", src: "/audio/SomeVibes_PTC.mp3" },
  { title: "Slow Burn", src: "/audio/SlowBurn_PTC.mp3" },
  { title: "Stranger Events", src: "/audio/StrangerEvents_PTC.mp3" },
];

interface AudioPlayerValue {
  tracks: Track[];
  current: number;
  playing: boolean;
  active: boolean; // has playback ever started (controls footer visibility)
  levelRef: React.MutableRefObject<number>;
  spectrumRef: React.MutableRefObject<Float32Array>;
  beatRef: React.MutableRefObject<number>;
  toggle: () => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  select: (i: number) => void;
}

const Ctx = createContext<AudioPlayerValue | undefined>(undefined);

export function useAudioPlayer() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  return v;
}

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const levelRef = useRef(0);
  // smoothed per-bin frequency magnitudes (0..1), used to map the spectrum
  // across the terrain. Sized to the analyser's bin count in ensureGraph.
  const spectrumRef = useRef<Float32Array>(new Float32Array(128));
  const bassPrevRef = useRef(0);
  const beatRef = useRef(0);
  const rafRef = useRef(0);

  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState(false);

  // per-frame spectrum sampling (idle-decays when paused)
  const tick = useCallback(() => {
    const analyser = analyserRef.current;
    const data = dataRef.current;
    const spec = spectrumRef.current;
    if (analyser && data) {
      analyser.getByteFrequencyData(data);

      // per-bin smoothing — fast attack, slower release keeps peaks lively
      let sum = 0;
      for (let i = 0; i < data.length && i < spec.length; i++) {
        const v = data[i] / 255;
        const prev = spec[i];
        // attack quickly, release gently
        spec[i] = v > prev ? prev + (v - prev) * 0.55 : prev + (v - prev) * 0.14;
        sum += v;
      }
      const avg = sum / data.length;
      levelRef.current += (avg - levelRef.current) * 0.2;

      // beat / transient detection from the bass bins
      let bass = 0;
      const bassN = Math.min(6, data.length);
      for (let i = 1; i <= bassN; i++) bass += data[i] / 255;
      bass /= bassN;
      const jump = bass - bassPrevRef.current;
      bassPrevRef.current = bass;
      if (jump > 0.06) beatRef.current = Math.min(1, beatRef.current + jump * 2.5);
      beatRef.current *= 0.86; // decay
    } else {
      levelRef.current += (0 - levelRef.current) * 0.05;
      for (let i = 0; i < spec.length; i++) spec[i] *= 0.9;
      beatRef.current *= 0.9;
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
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      const source = ctx.createMediaElementSource(audioRef.current);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024; // 512 frequency bins for spectrum mapping
      analyser.smoothingTimeConstant = 0.6;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      ctxRef.current = ctx;
      analyserRef.current = analyser;
      spectrumRef.current = new Float32Array(analyser.frequencyBinCount);
      dataRef.current = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));
    } catch {
      /* analyser unavailable — audio still plays through the element */
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
      setActive(true);
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

  const select = useCallback((i: number) => {
    setCurrent(((i % TRACKS.length) + TRACKS.length) % TRACKS.length);
  }, []);

  // when track changes, load and continue if we were playing
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const wasPlaying = playing;
    el.load();
    if (wasPlaying) el.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <Ctx.Provider
      value={{ tracks: TRACKS, current, playing, active, levelRef, spectrumRef, beatRef, toggle, play, pause, next, select }}
    >
      {children}
      <audio
        ref={audioRef}
        src={asset(TRACKS[current].src)}
        onEnded={next}
        preload="none"
      />
    </Ctx.Provider>
  );
}
