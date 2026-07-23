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
  const rafRef = useRef(0);

  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState(false);

  // per-frame amplitude sampling (idle-decays when paused)
  const tick = useCallback(() => {
    const analyser = analyserRef.current;
    const data = dataRef.current;
    if (analyser && data) {
      analyser.getByteFrequencyData(data);
      let sum = 0;
      const n = Math.floor(data.length * 0.6);
      for (let i = 0; i < n; i++) sum += data[i];
      const avg = sum / n / 255;
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
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
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
      value={{ tracks: TRACKS, current, playing, active, levelRef, toggle, play, pause, next, select }}
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
