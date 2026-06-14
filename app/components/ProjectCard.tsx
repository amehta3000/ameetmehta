import Link from "next/link";
import type { Project, ArtifactType } from "@/data/projects";

const typeLabels: Record<ArtifactType, string> = {
  software: "software",
  product: "product",
  identity: "identity",
  sound: "sound",
  image: "image",
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <article>
        <div className="relative overflow-hidden aspect-[4/3] bg-line/30 border border-line">
          {project.cover ? (
            <img
              src={project.cover}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full" />
          )}
          <div className="absolute top-3 right-3">
            <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.15em] bg-paper/90 text-amber px-2 py-1">
              {typeLabels[project.type]}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-[family-name:var(--font-display)] text-base font-semibold leading-snug tracking-tight group-hover:text-amber transition-colors duration-200">
              {project.title}
            </h3>
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-muted shrink-0">
              {project.year}
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted line-clamp-2">
            {project.shortDescription}
          </p>
        </div>
      </article>
    </Link>
  );
}
