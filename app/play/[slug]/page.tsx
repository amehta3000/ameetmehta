import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProjectBySlug, getProjectsByType } from "@/data/projects";

export function generateStaticParams() {
  return getProjectsByType("personal").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Ameet Mehta`,
    description: project.shortDescription,
  };
}

export default async function PlayDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || project.type !== "personal") notFound();

  const allPersonal = getProjectsByType("personal");
  const currentIndex = allPersonal.findIndex((p) => p.slug === slug);
  const nextProject = allPersonal[(currentIndex + 1) % allPersonal.length];

  return (
    <div className="mx-auto max-w-4xl px-6">
      {/* Hero */}
      <section className="py-24 md:py-36">
        {project.category && (
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {project.category}
          </p>
        )}
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {project.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          {project.description}
        </p>
        {project.externalUrl && (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-accent underline underline-offset-4 hover:text-foreground transition-colors"
          >
            View externally →
          </a>
        )}
      </section>

      {/* Meta */}
      <div className="flex flex-wrap gap-6 border-t border-border py-6 text-xs uppercase tracking-wider text-muted">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      {/* Content placeholder */}
      <div className="my-12 aspect-[16/9] w-full rounded-sm bg-border/50" />

      {/* Body sections */}
      <div className="space-y-12 pb-24">
        {project.sections.map((section, i) => {
          if (section.type === "text") {
            return (
              <p key={i} className="text-base leading-relaxed text-muted">
                {section.content}
              </p>
            );
          }
          return null;
        })}
      </div>

      {/* Next project */}
      <div className="border-t border-border py-12">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Next Project</p>
        <Link
          href={`/play/${nextProject.slug}`}
          className="mt-2 block font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight transition-colors hover:text-accent"
        >
          {nextProject.title}
        </Link>
      </div>
    </div>
  );
}
