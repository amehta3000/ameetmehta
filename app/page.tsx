import Link from "next/link";
import { getProjectBySlug, type Project } from "@/data/projects";
import { Reveal } from "./components/Reveal";
import { TerrainVisualizerBand } from "./components/TerrainVisualizerBand";
import { ProjectHoverList, type HoverItem } from "./components/ProjectHoverList";

function toHoverItems(projects: Project[]): HoverItem[] {
  return projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    client: p.client,
    disciplines: p.disciplines,
    shortDescription: p.shortDescription,
    year: p.year,
    cover: p.cover,
  }));
}

export const metadata = {
  title: "Ameet Mehta",
  description:
    "Design, code, sound. A principal design leader who ships products, writes code, and makes music, working where AI meets human creativity.",
};

// curated narratives per act
const NOW = [
  {
    label: "Reactive audio-visual",
    title: "Part Time Chiller",
    desc: "A reactive audio-visual beat tape. The terrain up top is a real-time Three.js instrument running my own records, part of the parttimechiller.com player. Hit play.",
    href: "https://parttimechiller.com",
    external: true,
  },
  {
    label: "Generative AI research",
    title: "Maharani Project",
    desc: "An experiment probing bias in generative AI models, and what it takes to get them to see South Asian women clearly.",
    href: "https://amehta3000.github.io/maharani-project/",
    external: true,
  },
  {
    label: "Image tool",
    title: "SuperFlatPixel",
    desc: "A browser-based image pixelizer. A small, sharp tool for turning any photo into clean, flat pixel art.",
    href: "https://amehta3000.github.io/superflatpixel/",
    external: true,
  },
  {
    label: "Synthography",
    title: "TheGridLifeAI",
    desc: "An early synthographer's exploration of indofuturism. Part sketchbook, part argument that taste still matters when the tools get fast.",
    href: "https://www.instagram.com/thegridlifeai/",
    external: true,
  },
  {
    label: "Playable game",
    title: "Space Rickshaw",
    desc: "A C64-era arcade game turned into a bajaj rickshaw run across India. Vibe-coded with Claude in an afternoon, mostly to see if I could.",
    href: "/work/space-rickshaw",
  },
];

const CAREER = ["ai-security-interfaces", "lightmetric-rideview", "employee-communications", "chnl", "xlr8r"];
const PRACTICE = ["part-time-chiller", "sadubas"];

function SectionLabel({ title }: { title: string }) {
  return (
    <p className="mb-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.25em] text-amber">
      {title}
    </p>
  );
}

export default function Home() {
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
              Creative technologist and artist. Los Angeles.
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
            I design, I code, and I make music. The interesting problems tend to live in the space between them.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Most of my career has been making complicated technology feel obvious. Lately that means figuring out where AI genuinely belongs, and where it&apos;s just noise.
          </p>
        </Reveal>
      </section>

      {/* ---------- Act 1 — What I'm building now ---------- */}
      <section className="py-16 md:py-24">
        <SectionLabel title="What I'm building now" />
        <Reveal>
          <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-6xl">
            The best way to understand a tool is to build something with it.
            <span className="text-muted"> So I do.</span>
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
        <SectionLabel title="How I got here" />
        <Reveal>
          <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-6xl">
            The path here.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Music platforms and independent media, then enterprise AI at Moveworks, now security systems at Microsoft.
          </p>
        </Reveal>

        <div className="mt-12">
          <ProjectHoverList items={toHoverItems(career)} />
        </div>
      </section>

      {/* ---------- Act 3 — Why I care ---------- */}
      <section className="py-16 md:py-24">
        <SectionLabel title="Art & sound" />
        <Reveal>
          <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-6xl">
            Music keeps my taste honest.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Part Time Chiller, Sadubas, and generative work. Same curiosity as the day job, fewer stakeholders.
          </p>
        </Reveal>

        <div className="mt-12">
          <ProjectHoverList items={toHoverItems(practice)} />
        </div>
      </section>

      {/* ---------- Act 4 — Let's build something ---------- */}
      <section className="border-t border-line py-20 md:py-32">
        <SectionLabel title="Let's build something" />
        <Reveal>
          <h2 className="max-w-4xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-7xl">
            If you&apos;re building something real, let&apos;s talk.
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
