import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProjectBySlug, getProjectsByType } from "@/data/projects";

export function generateStaticParams() {
  return getProjectsByType("professional").map((p) => ({ slug: p.slug }));
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

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || project.type !== "professional") notFound();

  const allProfessional = getProjectsByType("professional");
  const currentIndex = allProfessional.findIndex((p) => p.slug === slug);
  const nextProject = allProfessional[(currentIndex + 1) % allProfessional.length];

  return (
    <div className="mx-auto max-w-4xl px-6">
      {/* Hero */}
      <section className="py-24 md:py-36">
        {project.client && (
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {project.client}
          </p>
        )}
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {project.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          {project.description}
        </p>
      </section>

      {/* Meta */}
      <div className="flex flex-wrap gap-6 border-t border-border py-6 text-xs uppercase tracking-wider text-muted">
        {project.role && <span>{project.role}</span>}
        {project.year && <span>{project.year}</span>}
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      {/* Hero image placeholder */}
      <div className="my-12 aspect-[16/9] w-full border border-border" />

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
          if (section.type === "image") {
            return (
              <div key={i} className="aspect-[16/9] w-full border border-border">
                {section.caption && (
                  <p className="mt-2 text-xs text-muted">{section.caption}</p>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Next project */}
      <div className="border-t border-border py-12">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Next Project</p>
        <Link
          href={`/work/${nextProject.slug}`}
          className="mt-2 block font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight transition-colors hover:text-accent"
        >
          {nextProject.title}
        </Link>
      </div>
    </div>
  );
}
