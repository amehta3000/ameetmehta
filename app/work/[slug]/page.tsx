import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, visibleProjects, getProjectBySlug, type Block } from "@/data/projects";
import { Reveal } from "../../components/Reveal";
import { SpaceRickshawEmbed } from "../../components/SpaceRickshawEmbed";
import { SpotifyEmbed } from "../../components/SpotifyEmbed";
import { asset } from "@/lib/asset";

// group runs of consecutive spotify blocks so they can render side by side
function groupBlocks(blocks: Block[]): Block[][] {
  const groups: Block[][] = [];
  for (const block of blocks) {
    const last = groups[groups.length - 1];
    if (block.type === "spotify" && last && last[0].type === "spotify") {
      last.push(block);
    } else {
      groups.push([block]);
    }
  }
  return groups;
}

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

  // cycle prev/next through visible projects only (fall back to the full list)
  const nav = visibleProjects.some((p) => p.slug === slug) ? visibleProjects : projects;
  const currentIndex = nav.findIndex((p) => p.slug === slug);
  const nextProject = nav[(currentIndex + 1) % nav.length];
  const prevProject = nav[(currentIndex - 1 + nav.length) % nav.length];

  return (
    <div className="mx-auto max-w-7xl px-6">
      {/* Top nav: back + prev/next */}
      <div className="flex items-center justify-between gap-4 pt-20 md:pt-24">
        <Link
          href="/explore"
          className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.15em] text-muted transition-colors hover:text-amber"
        >
          ← All
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href={`/work/${prevProject.slug}`}
            className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.15em] text-muted transition-colors hover:text-amber"
          >
            ← Prev
          </Link>
          <span className="text-line">|</span>
          <Link
            href={`/work/${nextProject.slug}`}
            className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.15em] text-muted transition-colors hover:text-amber"
          >
            Next →
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-10 pb-16 md:pt-14">
        <Reveal>
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-amber mb-4">
            {project.client ?? project.type}
          </p>
          <h1 className="font-[family-name:var(--font-display)] font-semibold leading-[1.05] tracking-tight text-[clamp(2rem,5.5vw,5.5rem)]">
            {project.title}
          </h1>
        </Reveal>
      </section>

      {/* Overview (left) + metadata (right) */}
      <Reveal>
        <div className="grid gap-12 border-t border-line pt-10 pb-16 md:grid-cols-[1fr_200px]">
          <div className="text-lg leading-relaxed text-muted whitespace-pre-line">
            {project.overview}
          </div>

          <aside className="space-y-6 font-[family-name:var(--font-mono)] text-[11px] md:text-right">
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
        </div>
      </Reveal>

      {/* Content blocks (consecutive spotify blocks render side by side) */}
      <div className="space-y-14 pb-32">
        {groupBlocks(project.blocks).map((group, gi) => {
          if (group.length > 1 && group.every((b) => b.type === "spotify")) {
            return (
              <Reveal key={`sg-${gi}`} delay={0.05}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {group.map((block, j) =>
                    block.playlistId ? (
                      <div key={j}>
                        {block.title && (
                          <p className="mb-3 font-[family-name:var(--font-display)] text-lg font-semibold text-ink">
                            {block.title}
                          </p>
                        )}
                        <SpotifyEmbed playlistId={block.playlistId} title={block.title ?? "Playlist"} />
                      </div>
                    ) : null
                  )}
                </div>
              </Reveal>
            );
          }
          const block = group[0];
          const i = gi;
          if (block.type === "prose") {
            return (
              <Reveal key={i} delay={0.05}>
                <p className="max-w-2xl text-lg leading-relaxed text-muted">
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
                    src={asset(block.src)}
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
                        src={asset(img.src)}
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

          if (block.type === "video" && block.url) {
            return (
              <Reveal key={i} delay={0.05}>
                <div className="aspect-video w-full overflow-hidden border border-line">
                  <iframe
                    src={block.url}
                    title={block.title ?? "Video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </Reveal>
            );
          }

          if (block.type === "spotify" && block.playlistId) {
            return (
              <Reveal key={i} delay={0.05}>
                {block.title && (
                  <p className="mb-3 font-[family-name:var(--font-display)] text-lg font-semibold text-ink">
                    {block.title}
                  </p>
                )}
                <SpotifyEmbed playlistId={block.playlistId} title={block.title ?? "Playlist"} />
              </Reveal>
            );
          }

          if (block.type === "game") {
            return (
              <Reveal key={i} delay={0.05}>
                <SpaceRickshawEmbed />
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
