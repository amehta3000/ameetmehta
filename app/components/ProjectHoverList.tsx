"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { asset } from "@/lib/asset";

export interface HoverItem {
  slug: string;
  title: string;
  subtitle: string;
  client?: string;
  disciplines: string[];
  shortDescription: string;
  year: string;
  cover: string;
}

function Thumb({ item }: { item: HoverItem }) {
  const [err, setErr] = useState(false);
  return (
    <div className="h-44 w-72 overflow-hidden rounded-2xl border border-line bg-ink/20 shadow-2xl">
      {!err ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(item.cover)}
          alt=""
          onError={() => setErr(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-amber/25 via-ink/30 to-ink/60">
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink/90">
            {item.title}
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.2em] text-muted">
            {item.subtitle}
          </span>
        </div>
      )}
    </div>
  );
}

export function ProjectHoverList({ items }: { items: HoverItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [y, setY] = useState(0);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) setY(e.clientY - rect.top);
  };

  return (
    <div ref={ref} onMouseMove={onMove} className="relative border-t border-line">
      {/* cursor-tracking preview (desktop only) */}
      <div
        className="pointer-events-none absolute right-2 z-20 hidden transition-[opacity,transform] duration-200 ease-out lg:block"
        style={{
          top: y,
          transform: `translateY(-50%) scale(${active !== null ? 1 : 0.92})`,
          opacity: active !== null ? 1 : 0,
        }}
      >
        {active !== null && <Thumb key={active} item={items[active]} />}
      </div>

      {items.map((item, i) => (
        <Link
          key={item.slug}
          href={`/work/${item.slug}`}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
          className="group flex items-baseline justify-between gap-6 border-b border-line py-6 md:py-7"
        >
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-3">
              <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-amber">
                {item.client ?? item.subtitle}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.15em] text-muted/60">
                {item.disciplines.join(" · ")}
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-amber md:text-3xl">
              {item.title}
            </h3>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted line-clamp-2">
              {item.shortDescription}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <span className="font-[family-name:var(--font-mono)] text-[11px] text-muted">{item.year}</span>
            <span className="mt-2 block text-muted transition-colors group-hover:text-amber">→</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
