import { projects } from "@/data/projects";
import { ProjectCard } from "./components/ProjectCard";

export default function Home() {
  const selected = projects.slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Hero */}
      <section className="py-24 md:py-36">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          20+ years designing &amp; building internet experiences
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          Using empathy, rapid prototyping and systems thinking to bring
          zero-to-one products to life.
        </p>
        <p className="mt-4 text-sm text-accent">
          Currently accepting new projects —{" "}
          <a
            href="mailto:hello@ameetmehta.com?subject=Hi%2C%20let%27s%20chat%20about%20products"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Let&apos;s chat
          </a>
        </p>
      </section>

      {/* Selected Works */}
      <section className="pb-24">
        <h2 className="font-[family-name:var(--font-display)] text-xs font-medium uppercase tracking-[0.2em] text-muted">
          Selected Works
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {selected.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
