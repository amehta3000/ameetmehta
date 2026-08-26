import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectIndexList({ projects }: { projects: Project[] }) {
  return (
    <div className="border-t border-line">
      {projects.map((p, i) => (
        <Link
          key={p.slug}
          href={`/work/${p.slug}`}
          className={`group flex items-baseline justify-between gap-6 py-4 ${
            i < projects.length - 1 ? "border-b border-line" : ""
          }`}
        >
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-amber md:text-2xl">
              {p.title}
            </h3>
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.15em] text-muted/60">
              {p.subtitle}
            </span>
          </div>
          <span className="shrink-0 text-muted transition-colors group-hover:text-amber">→</span>
        </Link>
      ))}
    </div>
  );
}
