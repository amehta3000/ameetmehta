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
          Play
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Music, art, and vibe-coded experiments — creative work outside the product world.
        </p>
      </section>

      {/* Filter tabs */}
      <div className="flex gap-4 border-b border-border pb-4">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActive(cat.value)}
            className={`text-xs uppercase tracking-wider transition-colors ${
              active === cat.value ? "text-accent" : "text-muted hover:text-foreground"
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
