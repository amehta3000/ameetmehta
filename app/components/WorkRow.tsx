"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project, ArtifactType } from "@/data/projects";
import { asset } from "@/lib/asset";

const typeLabel: Record<ArtifactType, string> = {
  software: "software",
  product: "product",
  identity: "identity",
  sound: "sound",
  image: "image",
};

export function WorkRow({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative border-t border-line">
      <Link
        href={`/work/${project.slug}`}
        className="group flex items-center gap-5 py-7 md:gap-10 md:py-9"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="font-[family-name:var(--font-mono)] text-[10px] text-muted/50 shrink-0 w-6 select-none tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          <h2 className="font-[family-name:var(--font-display)] font-semibold tracking-tight leading-snug group-hover:text-amber transition-colors duration-200 text-[clamp(1.5rem,3vw,3.5rem)]">
            {project.title}
          </h2>
          <p className="mt-1 font-[family-name:var(--font-mono)] text-[11px] text-muted">
            {project.client ?? project.role}
          </p>
        </div>

        <div className="shrink-0 text-right hidden sm:block mr-4">
          <span className="block font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.15em] text-amber">
            {typeLabel[project.type]}
          </span>
          <span className="block font-[family-name:var(--font-mono)] text-[10px] text-muted mt-0.5">
            {project.year}
          </span>
        </div>

        <span className="shrink-0 text-muted group-hover:text-amber group-hover:translate-x-1 transition-all duration-200">
          →
        </span>
      </Link>

      <AnimatePresence>
        {hovered && project.cover && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="absolute right-16 top-1/2 -translate-y-1/2 w-52 h-32 overflow-hidden border border-line z-20 pointer-events-none hidden md:block"
          >
            <img
              src={asset(project.cover)}
              alt=""
              aria-hidden
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
