import { visibleProjects } from "@/data/projects";
import { Reveal } from "../components/Reveal";
import { TerrainVisualizerBand } from "../components/TerrainVisualizerBand";
import { ProjectExplorer } from "../components/ProjectExplorer";

export const metadata = {
  title: "Ameet Mehta",
  description: "Design, code, sound. Everything in one place.",
};

export default function ExplorePage() {
  return (
    <div className="mx-auto max-w-7xl px-6">
      {/* Hero with terrain visualizer */}
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
            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              Designing AI products, creative tools, and product systems where technology meets human creativity. Based in Los Angeles.
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
        </div>

        <div className="mt-10 md:hidden">
          <TerrainVisualizerBand />
        </div>
      </section>

      {/* Everything, filterable */}
      <section className="pb-32">
        <Reveal>
          <h2 className="mb-6 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-muted">
            Everything
          </h2>
        </Reveal>
        <ProjectExplorer projects={visibleProjects} />
      </section>
    </div>
  );
}
