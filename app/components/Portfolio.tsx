"use client";

import { useState, useMemo } from "react";
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
    <div className="h-full w-full overflow-hidden rounded-md border border-line bg-ink/20 shadow-2xl">
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.cover}
          alt=""
          onError={() => setErr(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-amber/25 via-ink/30 to-ink/60 p-6 text-center">
          <span className="font-[family-name:var(--font-body)] text-xl font-semibold text-ink/90">
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
  const [active, setActive] = useState<string | null>(null);
  const [shown, setShown] = useState<PortfolioItem | null>(null);

  const list = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "experiments") return items.filter((i) => i.experiment);
    return items.filter((i) => i.disciplines.includes(filter));
  }, [items, filter]);

  const enter = (item: PortfolioItem) => {
    setActive(item.id);
    setShown(item);
  };
  const leave = (id: string) => setActive((c) => (c === id ? null : c));

  return (
    <div>
      {/* filter menu — sticky under the header nav */}
      <div className="sticky top-14 z-30 -mx-6 mb-4 bg-paper/90 px-6 py-3 backdrop-blur-sm">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full border px-3.5 py-1 font-[family-name:var(--font-mono)] text-[10px] font-normal uppercase tracking-[0.12em] transition-colors ${
                filter === f.key
                  ? "border-amber bg-amber/10 text-amber"
                  : "border-line text-muted hover:border-amber hover:text-amber"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* big square preview, fixed in one place on the right */}
      <div
        className="pointer-events-none fixed right-8 top-1/2 z-20 hidden h-[min(38vw,440px)] w-[min(38vw,440px)] -translate-y-1/2 transition-opacity duration-200 ease-out lg:block"
        style={{ opacity: active ? 1 : 0 }}
      >
        {shown && <Thumb item={shown} />}
      </div>

      {/* list */}
      <div>
        {list.map((item) => {
          const inner = (
            <>
              <div className="flex min-w-0 items-center">
                <span className="max-w-0 overflow-hidden whitespace-nowrap font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-muted opacity-0 transition-all duration-300 ease-out group-hover:mr-4 group-hover:max-w-[22rem] group-hover:opacity-100">
                  {item.meta}
                </span>
                <h3 className="truncate font-[family-name:var(--font-body)] text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-amber md:text-4xl">
                  {item.title}
                </h3>
              </div>
              <span className="shrink-0 text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {item.external ? "↗" : "→"}
              </span>
            </>
          );

          const cls =
            "group relative flex items-center justify-between gap-4 -mx-4 rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-ink/[0.05]";

          return item.external ? (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => enter(item)}
              onMouseLeave={() => leave(item.id)}
              className={cls}
            >
              {inner}
            </a>
          ) : (
            <Link
              key={item.id}
              href={item.href}
              onMouseEnter={() => enter(item)}
              onMouseLeave={() => leave(item.id)}
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
