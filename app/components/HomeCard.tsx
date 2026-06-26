"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project, ArtifactType } from "@/data/projects";

function TypeIcon({ type }: { type: ArtifactType }) {
  switch (type) {
    case "software":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4l4 5-4 5M7 4L3 9l4 5" />
        </svg>
      );
    case "product":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <circle cx="9" cy="9" r="6.5" />
          <circle cx="9" cy="9" r="2" />
        </svg>
      );
    case "identity":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="9,2 11.5,7 17,7.5 13,11.5 14.5,17 9,14 3.5,17 5,11.5 1,7.5 6.5,7" />
        </svg>
      );
    case "sound":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <circle cx="5" cy="13" r="2.5" />
          <path d="M7.5 13V5l8-2v8" />
          <circle cx="13" cy="11" r="2.5" />
        </svg>
      );
    case "image":
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="14" height="12" rx="1.5" />
          <path d="M2 12l4-4 3 3 2-2 5 5" />
          <circle cx="6" cy="7" r="1.2" />
        </svg>
      );
  }
}

interface HomeCardProps {
  project: Project;
  wide?: boolean;
}

export function HomeCard({ project, wide = false }: HomeCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className="block h-full">
      <motion.article
        className="group relative h-full min-h-[180px] rounded-2xl border border-line/40 bg-ink/[0.06] p-5 flex flex-col justify-between cursor-pointer"
        whileHover={{ scale: 1.015, backgroundColor: "color-mix(in srgb, var(--ink) 10%, transparent)" }}
        transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="flex items-start justify-between gap-4">
          <span className="font-[family-name:var(--font-mono)] text-[10px] text-muted">
            {project.subtitle}
          </span>
          <span className="text-muted/60 group-hover:text-amber transition-colors duration-200 shrink-0">
            <TypeIcon type={project.type} />
          </span>
        </div>

        <div className="mt-8">
          <h2 className={`font-[family-name:var(--font-display)] font-semibold leading-tight tracking-tight text-ink group-hover:text-amber transition-colors duration-200 ${wide ? "text-[clamp(1.4rem,2.5vw,2rem)]" : "text-[clamp(1.1rem,1.8vw,1.5rem)]"}`}>
            {project.title}
          </h2>
          <p className="mt-1.5 text-sm text-muted leading-relaxed line-clamp-2">
            {project.shortDescription}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
