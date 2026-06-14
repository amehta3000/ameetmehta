"use client";

import { useState } from "react";
import { getProjectsByType, getPersonalByCategory, type PersonalCategory } from "@/data/projects";
import { ProjectCard } from "../components/ProjectCard";

const categories: { label: string; value: PersonalCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Music", value: "music" },
  { label: "Art", value: "art" },
  { label: "Code", value: "code" },
];

export default function PlayPage() {
  const [active, setActive] = useState<PersonalCategory | "all">("all");

  const personal =
    active === "all"
      ? getProjectsByType("personal")
      : getPersonalByCategory(active);

  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="py-24 md:py-36">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Studio
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Music production, generative art, and intuition-driven code — made
          outside of client work, but informed by the same sensibility.
        </p>
      </section>

      {/* Filter buttons */}
      <div className="flex gap-3 border-b border-border pb-6">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActive(cat.value)}
            className={`px-3 py-1 font-mono text-[11px] uppercase tracking-widest border transition-colors duration-150 ${
              active === cat.value
                ? "border-accent text-accent"
                : "border-border text-muted hover:border-foreground hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <section className="py-12 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {personal.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
        {personal.length === 0 && (
          <p className="text-sm text-muted">Coming soon.</p>
        )}
      </section>
    </div>
  );
}
