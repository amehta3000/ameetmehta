import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProjectBySlug } from "@/data/projects";
import { Reveal } from "../../components/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Ameet Mehta`,
    description: project.shortDescription,
  };
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-36">
        <Reveal>
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-amber mb-4">
            {project.client ?? project.type}
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {project.shortDescription}
          </p>
        </Reveal>
      </section>

      {/* Sidebar metadata + overview */}
      <Reveal>
        <div className="grid gap-12 border-t border-line pt-10 pb-16 md:grid-cols-[200px_1fr]">
          <aside className="space-y-6 font-[family-name:var(--font-mono)] text-[11px]">
            {project.role && (
              <div>
                <p className="uppercase tracking-[0.15em] text-muted mb-1">Role</p>
                <p className="text-ink">{project.role}</p>
              </div>
            )}
            {project.year && (
              <div>
                <p className="uppercase tracking-[0.15em] text-muted mb-1">Year</p>
                <p className="text-ink">{project.year}</p>
              </div>
            )}
            {project.client && (
              <div>
                <p className="uppercase tracking-[0.15em] text-muted mb-1">Client</p>
                <p className="text-ink">{project.client}</p>
              </div>
            )}
            {project.tags.length > 0 && (
              <div>
                <p className="uppercase tracking-[0.15em] text-muted mb-1">Type</p>
                <p className="text-ink">{project.tags.join(", ")}</p>
              </div>
            )}
            {project.link && (
              <div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uppercase tracking-[0.15em] text-amber hover:text-ink transition-colors"
                >
                  Visit site ↗
                </a>
              </div>
            )}
          </aside>

          <div className="text-base leading-relaxed text-muted whitespace-pre-line">
            {project.overview}
          </div>
        </div>
      </Reveal>

      {/* Content blocks */}
      <div className="space-y-14 pb-32">
        {project.blocks.map((block, i) => {
          if (block.type === "prose") {
            return (
              <Reveal key={i} delay={0.05}>
                <p className="max-w-2xl text-base leading-relaxed text-muted">
                  {block.content}
                </p>
              </Reveal>
            );
          }

          if (block.type === "image" && block.src) {
            return (
              <Reveal key={i} delay={0.05}>
                <figure>
                  <img
                    src={block.src}
                    alt={block.alt ?? ""}
                    className="w-full border border-line"
                  />
                  {block.caption && (
                    <figcaption className="mt-3 font-[family-name:var(--font-mono)] text-[10px] text-muted">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            );
          }

          if (block.type === "grid" && block.images) {
            return (
              <Reveal key={i} delay={0.05}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {block.images.map((img, j) => (
                    <figure key={j}>
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full border border-line object-cover"
                      />
                      {img.caption && (
                        <figcaption className="mt-2 font-[family-name:var(--font-mono)] text-[10px] text-muted">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </Reveal>
            );
          }

          return null;
        })}
      </div>

      {/* Next project */}
      <Reveal>
        <div className="border-t border-line py-12">
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-muted">
            Next
          </p>
          <Link
            href={`/work/${nextProject.slug}`}
            className="mt-3 block font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight hover:text-amber transition-colors"
          >
            {nextProject.title} →
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
