"use client";

import { useEffect, useState } from "react";

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

  return (
    <div
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-[7px] lg:flex"
      aria-hidden
    >
      {Array.from({ length: TICKS }).map((_, i) => (
        <span
          key={i}
          className={`block rounded-full transition-all duration-200 ${
            i === active ? "h-[2px] w-6 bg-ink" : "h-px w-3 bg-line"
          }`}
        />
      ))}
    </div>
  );
}
