"use client";

import { useRef, useState, useMemo } from "react";
import Link from "next/link";

export interface PortfolioItem {
  id: string;
  title: string;
  meta: string;
  href: string;
  external?: boolean;
  disciplines: string[];
  experiment?: boolean;
  cover: string;
}

type Filter = "all" | "design" | "code" | "sound" | "experiments";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "design", label: "Design" },
  { key: "code", label: "Code" },
  { key: "sound", label: "Sound" },
  { key: "experiments", label: "Experiments" },
];

function Thumb({ item }: { item: PortfolioItem }) {
  const [err, setErr] = useState(false);
  const showImg = item.cover && !err;
  return (
    <div className="h-44 w-72 overflow-hidden rounded-2xl border border-line bg-ink/20 shadow-2xl">
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.cover}
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
            {item.meta}
          </span>
        </div>
      )}
    </div>
  );
}

export function Portfolio({ items }: { items: PortfolioItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [y, setY] = useState(0);

  const list = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "experiments") return items.filter((i) => i.experiment);
    return items.filter((i) => i.disciplines.includes(filter));
  }, [items, filter]);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) setY(e.clientY - rect.top);
  };

  const activeItem = list.find((i) => i.id === active) ?? null;

  return (
    <div>
      {/* filter chips */}
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-4 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.15em] transition-colors ${
              filter === f.key
                ? "border-amber bg-amber/10 text-amber"
                : "border-line text-muted hover:border-amber hover:text-amber"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* list with cursor-tracking preview */}
      <div ref={ref} onMouseMove={onMove} className="relative border-t border-line">
        <div
          className="pointer-events-none absolute right-2 z-20 hidden transition-[opacity,transform] duration-200 ease-out lg:block"
          style={{
            top: y,
            transform: `translateY(-50%) scale(${activeItem ? 1 : 0.92})`,
            opacity: activeItem ? 1 : 0,
          }}
        >
          {activeItem && <Thumb key={activeItem.id} item={activeItem} />}
        </div>

        {list.map((item, i) => {
          const inner = (
            <>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-amber">
                    {item.meta}
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.15em] text-muted/60">
                    {item.disciplines.join(" · ")}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-amber md:text-3xl">
                  {item.title}
                </h3>
              </div>
              <span className="shrink-0 text-muted transition-colors group-hover:text-amber">
                {item.external ? "↗" : "→"}
              </span>
            </>
          );

          const cls = `group flex items-baseline justify-between gap-6 py-6 md:py-7 ${
            i < list.length - 1 ? "border-b border-line" : ""
          }`;

          return item.external ? (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActive(item.id)}
              onMouseLeave={() => setActive((c) => (c === item.id ? null : c))}
              className={cls}
            >
              {inner}
            </a>
          ) : (
            <Link
              key={item.id}
              href={item.href}
              onMouseEnter={() => setActive(item.id)}
              onMouseLeave={() => setActive((c) => (c === item.id ? null : c))}
              className={cls}
            >
              {inner}
            </Link>
          );
        })}
      </div>

      {list.length === 0 && (
        <p className="py-10 text-center font-[family-name:var(--font-mono)] text-xs text-muted">
          Nothing here yet.
        </p>
      )}
    </div>
  );
}
