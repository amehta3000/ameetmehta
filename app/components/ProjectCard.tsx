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
      <article className="relative overflow-hidden rounded-sm border border-border bg-card p-6 transition-all duration-300 hover:border-accent hover:bg-card-hover">
        {/* Index number — Basic Agency style */}
        <span className="text-[10px] font-mono text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Thumbnail placeholder */}
        <div className="mt-4 aspect-[16/10] w-full rounded-sm bg-border/50" />

        <div className="mt-4">
          {project.client && (
            <p className="text-[11px] font-medium uppercase tracking-widest text-accent">
              {project.client}
            </p>
          )}
          {project.category && (
            <p className="text-[11px] font-medium uppercase tracking-widest text-accent">
              {project.category}
            </p>
          )}
          <h3 className="mt-1 text-lg font-semibold leading-tight tracking-tight group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
            {project.shortDescription}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-wider text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
