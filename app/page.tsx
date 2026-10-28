import { getProjectBySlug } from "@/data/projects";
import { Reveal } from "./components/Reveal";
import { TerrainVisualizerBand } from "./components/TerrainVisualizerBand";
import { Portfolio, type PortfolioItem } from "./components/Portfolio";

export const metadata = {
  title: "Ameet Mehta",
  description:
    "Design, code, sound. Creative technologist and artist. Professional product work and current experiments, in one place.",
};

// professional + creative work (detail pages), in presentation order
const WORK = [
  "ai-security-interfaces",
  "lightmetric-rideview",
  "employee-communications",
  "chnl",
  "xlr8r",
  "part-time-chiller",
  "sadubas",
  "topspin",
  "product-plan",
  "rbkcustom",
  "identity",
];

// curiosity pieces (some link out, some have detail pages)
const EXPERIMENTS: PortfolioItem[] = [
  {
    id: "space-rickshaw",
    title: "Space Rickshaw",
    meta: "Playable game",
    href: "/work/space-rickshaw",
    disciplines: ["design", "code"],
    experiment: true,
    cover: "",
  },
  {
    id: "maharani",
    title: "Maharani Project",
    meta: "Generative AI research",
    href: "https://amehta3000.github.io/maharani-project/",
    external: true,
    disciplines: ["code"],
    experiment: true,
    cover: "",
  },
  {
    id: "superflatpixel",
    title: "SuperFlatPixel",
    meta: "Image tool",
    href: "https://amehta3000.github.io/superflatpixel/",
    external: true,
    disciplines: ["code"],
    experiment: true,
    cover: "",
  },
  {
    id: "thegridlifeai",
    title: "TheGridLifeAI",
    meta: "Synthography",
    href: "https://www.instagram.com/thegridlifeai/",
    external: true,
    disciplines: ["design"],
    experiment: true,
    cover: "",
  },
  {
    id: "dbplayer",
    title: "DB Player",
    meta: "Dropbox music player",
    href: "https://dbplayer.app/",
    external: true,
    disciplines: ["code", "sound"],
    experiment: true,
    cover: "/assets/experiments/dbplayer.webp",
  },
];

const EXPERIMENT_SLUGS = new Set(["space-rickshaw"]);

function buildItems(): PortfolioItem[] {
  const work: PortfolioItem[] = WORK.map((slug) => {
    const p = getProjectBySlug(slug);
    if (!p) return null;
    return {
      id: slug,
      title: p.title,
      meta: p.subtitle,
      href: `/work/${slug}`,
      disciplines: p.disciplines,
      experiment: EXPERIMENT_SLUGS.has(slug),
      cover: p.cover,
    };
  }).filter(Boolean) as PortfolioItem[];

  return [...work, ...EXPERIMENTS];
}

export default function Home() {
  const items = buildItems();

  return (
    <div className="mx-auto max-w-7xl px-6">
      {/* ---------- Hook (above the fold) ---------- */}
      <section className="relative pt-24 pb-16 md:pt-40 md:pb-24">
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
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink md:text-xl">
              I design human interfaces for autonomous systems operating in complex, high-consequence environments.
            </p>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">
              Creative technologist and artist based in Los Angeles.
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

      {/* ---------- The list ---------- */}
      <section className="pb-28 pt-4">
        <Portfolio items={items} />
      </section>

      {/* ---------- Contact ---------- */}
      <section className="border-t border-line py-20 md:py-28">
        <Reveal>
          <h2 className="max-w-4xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-7xl">
            Hit me up.
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
