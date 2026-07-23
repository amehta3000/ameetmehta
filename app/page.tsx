import Link from "next/link";
import { projects } from "@/data/projects";
import { HomeCard } from "./components/HomeCard";
import { Reveal } from "./components/Reveal";
import { TerrainVisualizerBand } from "./components/TerrainVisualizerBand";

export const metadata = {
  title: "Ameet Mehta",
  description: "Design, code, sound. Twenty years of digital products, brands, and creative work.",
};

export default function Home() {
  const sorted = projects;

  return (
    <div className="mx-auto max-w-7xl px-6">
      <section className="pt-24 pb-16 md:pt-40 md:pb-20">
        <Reveal>
          <h1 className="font-[family-name:var(--font-display)] font-semibold leading-[1.0] tracking-tight text-[clamp(3.5rem,9vw,10rem)]">
            design,<br />code,<br />sound.
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-muted md:text-lg">
            Creative technologist, product design leader, musician, and curator of finely made things. Based in Los Angeles.
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted md:text-lg">
            I shape complex ideas into products, prototypes, systems, and small worlds.
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
      </section>

      <section className="pb-24">
        <Reveal>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-muted">
              Sound
            </h2>
            <Link
              href="/chiller"
              className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.15em] text-muted hover:text-amber transition-colors"
            >
              More sound →
            </Link>
          </div>
          <TerrainVisualizerBand />
        </Reveal>
      </section>

      <section className="pb-32">
        <Reveal>
          <div className="flex items-baseline justify-between mb-5">
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

        {/* Mixed grid: alternates [2/3 wide + 1/3 narrow] and [1/3 narrow + 2/3 wide] */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {sorted.slice(0, 6).map((project, i) => {
            const pairIndex = Math.floor(i / 2);
            const posInPair = i % 2;
            const isEvenPair = pairIndex % 2 === 0;
            const wide =
              (isEvenPair && posInPair === 0) ||
              (!isEvenPair && posInPair === 1);
            return (
              <Reveal
                key={project.slug}
                delay={Math.min(i * 0.06, 0.25)}
                className={wide ? "col-span-2" : "col-span-1"}
              >
                <HomeCard project={project} wide={wide} />
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
