"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useAudioPlayer } from "./AudioPlayerProvider";

export function MiniPlayer() {
  const { tracks, current, playing, active, toggle, next } = useAudioPlayer();

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed inset-x-0 bottom-0 z-50"
        >
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3">
            <div className="flex flex-1 items-center gap-4 rounded-full border border-line bg-paper/80 px-3 py-2 backdrop-blur-md">
              <button
                onClick={toggle}
                aria-label={playing ? "Pause" : "Play"}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber text-amber transition-colors hover:bg-amber hover:text-paper"
              >
                {playing ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <rect x="2" y="1" width="3.5" height="12" rx="1" />
                    <rect x="8.5" y="1" width="3.5" height="12" rx="1" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M2.5 1.3v11.4a1 1 0 0 0 1.53.85l9-5.7a1 1 0 0 0 0-1.7l-9-5.7A1 1 0 0 0 2.5 1.3Z" />
                  </svg>
                )}
              </button>

              <button
                onClick={next}
                aria-label="Next track"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:text-amber"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3 2.2v11.6a.8.8 0 0 0 1.23.67l7.2-5.8a.8.8 0 0 0 0-1.34l-7.2-5.8A.8.8 0 0 0 3 2.2Z" />
                  <rect x="11.6" y="2" width="2.2" height="12" rx="1" />
                </svg>
              </button>

              <div className="min-w-0 flex-1">
                <p className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.2em] text-muted">
                  {playing ? "Now playing" : "Part Time Chiller"}
                </p>
                <p className="truncate font-[family-name:var(--font-display)] text-sm font-semibold text-ink">
                  {tracks[current].title}
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

          <style jsx>{`
            @keyframes eq {
              0%, 100% { transform: scaleY(0.4); }
              50% { transform: scaleY(1); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
