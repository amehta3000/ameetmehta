import Link from "next/link";
import { getProjectBySlug, type Project } from "@/data/projects";
import { Reveal } from "../components/Reveal";
import { TerrainVisualizerBand } from "../components/TerrainVisualizerBand";

export const metadata = {
  title: "Ameet Mehta",
  description:
    "Design, code, sound. A principal design leader who ships products, writes code, and makes music, working where AI meets human creativity.",
};

// curated narratives per act
const NOW = [
  {
    label: "Playable game",
    title: "Space Rickshaw",
    desc: "A C64-era arcade game rebuilt as a bajaj rickshaw odyssey across India. Vibe-coded with Claude in an afternoon.",
    href: "/work/space-rickshaw",
  },
  {
    label: "Generative art",
    title: "TheGridLifeAI",
    desc: "An ongoing generative art and synthography practice, exploring what taste looks like when the machine gets fast.",
    href: "https://www.instagram.com/thegridlifeai/",
    external: true,
  },
  {
    label: "Creative code",
    title: "This sound visualizer",
    desc: "The terrain above is a real-time, audio-reactive Three.js instrument, playing my own records. Press play.",
    href: "/work/part-time-chiller",
  },
];

const CAREER = ["ai-security-interfaces", "employee-communications", "chnl", "xlr8r"];
const PRACTICE = ["part-time-chiller", "sadubas"];

function ActLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-4">
      <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.3em] text-amber">
        Act {num}
      </span>
      <span className="h-px flex-1 bg-line" />
      <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-muted">
        {title}
      </span>
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={Math.min(index * 0.05, 0.2)}>
      <Link
        href={`/work/${project.slug}`}
        className="group flex items-baseline justify-between gap-6 border-b border-line py-6 md:py-7"
      >
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-3">
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-amber">
              {project.client ?? project.subtitle}
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.15em] text-muted/60">
              {project.disciplines.join(" · ")}
            </span>
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-amber md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted line-clamp-2">
            {project.shortDescription}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <span className="font-[family-name:var(--font-mono)] text-[11px] text-muted">{project.year}</span>
          <span className="mt-2 block text-muted transition-colors group-hover:text-amber">→</span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function Home2Page() {
  const career = CAREER.map(getProjectBySlug).filter(Boolean) as Project[];
  const practice = PRACTICE.map(getProjectBySlug).filter(Boolean) as Project[];

  return (
    <div className="mx-auto max-w-7xl px-6">
      {/* ---------- Opening ---------- */}
      <section className="relative pt-24 pb-14 md:pt-40 md:pb-20">
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-[58%] items-center md:flex">
          <div className="w-full">
            <TerrainVisualizerBand />
          </div>
        </div>

        <div className="relative z-10">
          <Reveal>
            <h1 className="font-[family-name:var(--font-display)] font-semibold leading-[1.0] tracking-tight text-[clamp(3.5rem,9vw,10rem)]">
              design,<br />code,<br />sound.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              Designing AI products, creative tools, and product systems where technology meets human creativity. Based in Los Angeles.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 font-[family-name:var(--font-mono)] text-xs text-muted">
              Say hi,{" "}
              <a
                href="mailto:hello@ameetmehta.com?subject=Hi%2C%20let%27s%20work%20together"
                className="text-amber underline underline-offset-4 hover:text-ink transition-colors"
              >
                hello@ameetmehta.com
              </a>
            </p>
          </Reveal>
        </div>

        <div className="mt-10 md:hidden">
          <TerrainVisualizerBand />
        </div>
      </section>

      {/* Who is this person — the thesis */}
      <section className="border-t border-line py-16 md:py-24">
        <Reveal>
          <p className="max-w-4xl font-[family-name:var(--font-display)] text-2xl font-medium leading-snug tracking-tight text-ink md:text-4xl">
            Plenty of principal design leaders can show you a Microsoft logo. Fewer can also show you the game they coded last weekend, the record they pressed, and the design system they scaled from six people to six hundred.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            I work at the seam between product rigor and creative instinct, where AI stops being a buzzword and starts being a material you can shape.
          </p>
        </Reveal>
      </section>

      {/* ---------- Act 1 — What I'm building now ---------- */}
      <section className="py-16 md:py-24">
        <ActLabel num="01" title="What I'm building now" />
        <Reveal>
          <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-6xl">
            I don&apos;t just talk about AI and creative tools.
            <span className="text-muted"> I build with them, in public, for the joy of it.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {NOW.map((item, i) => (
            <Reveal key={item.title} delay={Math.min(i * 0.08, 0.24)}>
              <Link
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-ink/[0.04] p-6 transition-colors hover:border-amber/60"
              >
                <div>
                  <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-amber">
                    {item.label}
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-amber">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
                <span className="mt-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.15em] text-muted transition-colors group-hover:text-amber">
                  {item.external ? "View ↗" : "Open →"}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Act 2 — How I got here ---------- */}
      <section className="py-16 md:py-24">
        <ActLabel num="02" title="How I got here" />
        <Reveal>
          <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-6xl">
            Two decades turning ambiguous technology
            <span className="text-muted"> into products people actually trust.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            From founding designer at an AI pioneer to principal leader at Microsoft, the same throughline: make the complex feel obvious, and build the teams and systems that keep it that way.
          </p>
        </Reveal>

        <div className="mt-12 border-t border-line">
          {career.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* ---------- Act 3 — Why I care ---------- */}
      <section className="py-16 md:py-24">
        <ActLabel num="03" title="Why I care" />
        <Reveal>
          <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-6xl">
            Craft, culture, and momentum.
            <span className="text-muted"> Music is how I keep my hands dirty and my taste sharp.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            I produce and DJ, perform audio-visual sets, and build interactive sound experiments. It is not a side quest, it is where I test what technology feels like when it is in service of people.
          </p>
        </Reveal>

        <div className="mt-12 border-t border-line">
          {practice.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* ---------- Act 4 — Let's build something ---------- */}
      <section className="border-t border-line py-20 md:py-32">
        <ActLabel num="04" title="Let's build something" />
        <Reveal>
          <h2 className="max-w-4xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-7xl">
            If you&apos;re building where AI meets human creativity, let&apos;s talk.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-[family-name:var(--font-mono)] text-sm">
            <a
              href="mailto:hello@ameetmehta.com?subject=Let%27s%20build%20something"
              className="text-amber underline underline-offset-4 hover:text-ink transition-colors"
            >
              hello@ameetmehta.com
            </a>
            <a href="https://www.linkedin.com/in/ameetmehta/" target="_blank" rel="noopener noreferrer" className="text-muted uppercase tracking-[0.15em] hover:text-amber transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/amehta3000" target="_blank" rel="noopener noreferrer" className="text-muted uppercase tracking-[0.15em] hover:text-amber transition-colors">
              GitHub
            </a>
            <a href="https://www.instagram.com/ameet3000/" target="_blank" rel="noopener noreferrer" className="text-muted uppercase tracking-[0.15em] hover:text-amber transition-colors">
              Instagram
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
