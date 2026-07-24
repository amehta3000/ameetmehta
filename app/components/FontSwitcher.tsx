"use client";

import { useEffect, useState, useCallback } from "react";

// keep in sync with the display fonts declared in layout.tsx (--font-d0..d9)
const FONTS = [
  { name: "Bricolage Grotesque", var: "--font-d0" },
  { name: "Syne", var: "--font-d1" },
  { name: "Space Grotesk", var: "--font-d2" },
  { name: "Unbounded", var: "--font-d3" },
  { name: "Instrument Serif", var: "--font-d4" },
  { name: "Fraunces", var: "--font-d5" },
  { name: "DM Serif Display", var: "--font-d6" },
  { name: "Playfair Display", var: "--font-d7" },
  { name: "Anton", var: "--font-d8" },
  { name: "Sora", var: "--font-d9" },
];

export function FontSwitcher() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const apply = useCallback((i: number) => {
    const font = FONTS[i];
    document.documentElement.style.setProperty("--font-display", `var(${font.var})`);
    try {
      localStorage.setItem("displayFontIndex", String(i));
    } catch {
      /* ignore */
    }
  }, []);

  // restore saved choice on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("displayFontIndex");
      if (saved !== null) {
        const i = Math.max(0, Math.min(FONTS.length - 1, parseInt(saved)));
        setIndex(i);
        apply(i);
      }
    } catch {
      /* ignore */
    }
  }, [apply]);

  const move = useCallback(
    (dir: number) => {
      setIndex((prev) => {
        const next = (prev + dir + FONTS.length) % FONTS.length;
        apply(next);
        return next;
      });
    },
    [apply]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (!open) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        move(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        move(-1);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, move]);

  if (!open) return null;

  return (
    <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-amber/60 bg-paper/90 px-2 py-1 backdrop-blur-md">
      <button
        onClick={() => move(-1)}
        aria-label="Previous font"
        className="flex h-6 w-6 items-center justify-center rounded-full text-muted transition-colors hover:text-amber"
      >
        ‹
      </button>
      <div className="min-w-[150px] text-center">
        <span className="block font-[family-name:var(--font-mono)] text-[8px] uppercase tracking-[0.2em] text-amber">
          {index + 1}/{FONTS.length} · font
        </span>
        <span className="block truncate font-[family-name:var(--font-display)] text-sm font-semibold text-ink">
          {FONTS[index].name}
        </span>
      </div>
      <button
        onClick={() => move(1)}
        aria-label="Next font"
        className="flex h-6 w-6 items-center justify-center rounded-full text-muted transition-colors hover:text-amber"
      >
        ›
      </button>
    </div>
  );
}
