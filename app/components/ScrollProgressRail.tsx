"use client";

import { useCallback, useEffect, useState } from "react";

const TICKS = 22;

export function ScrollProgressRail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setActive(Math.round(Math.min(1, Math.max(0, p)) * (TICKS - 1)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const jumpTo = useCallback((i: number) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const y = (i / (TICKS - 1)) * max;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  return (
    <div
      className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end lg:flex"
      aria-label="Scroll position"
    >
      {Array.from({ length: TICKS }).map((_, i) => (
        <button
          key={i}
          onClick={() => jumpTo(i)}
          aria-label={`Scroll to ${Math.round((i / (TICKS - 1)) * 100)}%`}
          className="group flex h-[9px] items-center justify-end pl-4 pr-1"
        >
          <span
            className={`block rounded-full transition-all duration-200 group-hover:bg-amber ${
              i === active
                ? "h-[2px] w-6 bg-ink group-hover:w-7"
                : "h-px w-3 bg-line group-hover:w-5"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
