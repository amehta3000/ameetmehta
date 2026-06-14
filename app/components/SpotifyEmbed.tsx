"use client";

import { useRef, useState, useEffect } from "react";

interface SpotifyEmbedProps {
  playlistId: string;
  title: string;
}

export function SpotifyEmbed({ playlistId, title }: SpotifyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="border border-line overflow-hidden"
      style={{ height: 352 }}
    >
      {loaded ? (
        <iframe
          src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title={title}
          style={{ display: "block" }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-line/10">
          <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-muted">
            Loading
          </span>
        </div>
      )}
    </div>
  );
}
