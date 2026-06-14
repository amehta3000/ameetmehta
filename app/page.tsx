import { projects } from "@/data/projects";
import { ProjectCard } from "./components/ProjectCard";

export default function Home() {
  const selected = projects.slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Hero */}
      <section className="py-24 md:py-36">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-6">
          Creative Technologist · Consultant · Musician
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          I build things that work, and look like they mean it.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          Twenty years designing and shipping digital products across startups,
          enterprise software, and culture brands. Now I help small businesses
          move faster, and make music and art I can&apos;t stop thinking about.
        </p>
        <p className="mt-4 text-sm text-muted">
          Accepting new projects.{" "}
          <a
            href="mailto:hello@ameetmehta.com?subject=Hi%2C%20let%27s%20work%20together"
            className="text-accent underline underline-offset-4 hover:text-foreground transition-colors"
          >
            hello@ameetmehta.com
          </a>
        </p>
      </section>

      {/* How I Help */}
      <section className="pb-24 border-t border-border pt-16">
        <h2 className="font-[family-name:var(--font-display)] text-xs font-medium uppercase tracking-[0.2em] text-muted">
          How I Help
        </h2>
        <div className="mt-8 grid gap-px sm:grid-cols-2 lg:grid-cols-3 border border-border">
          <div className="border-border p-6 sm:border-r">
            <p className="font-mono text-[10px] text-accent mb-4">01</p>
            <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-wide mb-3">
              Workflow &amp; Digital Tools
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              You have a process that lives in spreadsheets, email threads, and
              tribal knowledge. I help you find the friction and build something
              that fits how you actually work.
            </p>
          </div>
          <div className="border-border p-6 lg:border-r">
            <p className="font-mono text-[10px] text-accent mb-4">02</p>
            <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-wide mb-3">
              Product Design &amp; Launch
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              Zero to one without the chaos. Research, prototyping, design
              systems, and product judgment from doing this across dozens of
              contexts. I work fast because I&apos;ve seen most of this before.
            </p>
          </div>
          <div className="p-6">
            <p className="font-mono text-[10px] text-accent mb-4">03</p>
            <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-wide mb-3">
              Creative Consulting
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              Brand identity, digital campaigns, editorial direction. I&apos;ve
              led creative for a 25-year music publication, launched a cargo bike
              brand, and designed commerce experiences for Reebok. When the brief
              is vague and the stakes are real, that range matters.
            </p>
          </div>
        </div>
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
