import Link from "next/link";
import { projects } from "@/data/projects";
import { WorkRow } from "./components/WorkRow";
import { Reveal } from "./components/Reveal";

export const metadata = {
  title: "Ameet Mehta",
  description: "Design, code, sound. Twenty years of digital products, brands, and creative work.",
};

export default function Home() {
  const featured = projects.slice(0, 5);

  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="pt-24 pb-20 md:pt-40 md:pb-28">
        <Reveal>
          <h1 className="font-[family-name:var(--font-display)] text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            design,<br />code,<br />sound.
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-muted md:text-lg">
            Twenty years building digital products, brands, and creative work.
            Product designer. Consultant. Musician. Based in Los Angeles.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-5 font-[family-name:var(--font-mono)] text-xs text-muted">
            Accepting new projects &mdash;{" "}
            <a
              href="mailto:hello@ameetmehta.com?subject=Hi%2C%20let%27s%20work%20together"
              className="text-amber underline underline-offset-4 hover:text-ink transition-colors"
            >
              hello@ameetmehta.com
            </a>
          </p>
        </Reveal>
      </section>

      <section className="pb-32">
        <Reveal>
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-muted">
              Selected Work
            </h2>
            <Link
              href="/work"
              className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.15em] text-muted hover:text-amber transition-colors"
            >
              All work →
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="border-b border-line">
            {featured.map((project, i) => (
              <WorkRow key={project.slug} project={project} index={i} />
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
