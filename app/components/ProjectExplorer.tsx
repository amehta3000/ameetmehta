"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Project, Discipline } from "@/data/projects";

type Filter = "all" | Discipline;
type Sort = "curated" | "newest" | "oldest";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "design", label: "Design" },
  { key: "code", label: "Code" },
  { key: "sound", label: "Sound" },
];

function startYear(year: string): number {
  const m = year.match(/\d{4}/);
  return m ? parseInt(m[0]) : 0;
}

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("curated");

  const list = useMemo(() => {
    let out = projects.filter((p) => filter === "all" || p.disciplines.includes(filter));
    if (sort === "newest") out = [...out].sort((a, b) => startYear(b.year) - startYear(a.year));
    if (sort === "oldest") out = [...out].sort((a, b) => startYear(a.year) - startYear(b.year));
    return out;
  }, [projects, filter, sort]);

  return (
    <div>
      {/* filter + sort bar */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
        <div className="flex flex-wrap gap-2">
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

        <div className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.15em]">
          <span className="text-muted/60">Sort</span>
          {(["curated", "newest", "oldest"] as Sort[]).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`transition-colors ${sort === s ? "text-amber" : "text-muted hover:text-ink"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* list */}
      <div className="border-t border-line">
        <AnimatePresence initial={false} mode="popLayout">
          {list.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Link
                href={`/work/${p.slug}`}
                className="group flex items-baseline justify-between gap-6 border-b border-line py-6 md:py-7"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-3">
                    <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-amber">
                      {p.subtitle}
                    </span>
                    <span className="hidden gap-2 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.15em] text-muted/60 sm:flex">
                      {p.disciplines.join(" · ")}
                    </span>
                  </div>
                  <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-amber md:text-3xl">
                    {p.title}
                  </h2>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted line-clamp-2">
                    {p.shortDescription}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="font-[family-name:var(--font-mono)] text-[11px] text-muted">{p.year}</span>
                  <span className="mt-2 block text-muted transition-colors group-hover:text-amber">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {list.length === 0 && (
        <p className="py-10 text-center font-[family-name:var(--font-mono)] text-xs text-muted">
          Nothing here yet.
        </p>
      )}
    </div>
  );
}
