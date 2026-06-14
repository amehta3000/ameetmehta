import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const href =
    project.type === "professional"
      ? `/work/${project.slug}`
      : `/play/${project.slug}`;

  return (
    <Link href={href} className="group block">
      <article className="border border-border p-6 transition-colors duration-200 hover:border-accent">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[10px] text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          {(project.client || project.category) && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
              {project.client ?? project.category}
            </span>
          )}
        </div>

        <div className="mt-4 aspect-[16/10] w-full border border-border" />

        <div className="mt-5">
          <h3 className="font-[family-name:var(--font-display)] text-base font-semibold leading-snug tracking-tight group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
            {project.shortDescription}
          </p>
        </div>

        {project.tags.length > 0 && (
          <div className="mt-4 font-mono text-[10px] uppercase tracking-wider text-muted">
            {project.tags.slice(0, 3).join(" · ")}
          </div>
        )}
      </article>
    </Link>
  );
}
