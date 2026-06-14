import { projects } from "@/data/projects";
import { ProjectCard } from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";

export const metadata = {
  title: "Work | Ameet Mehta",
  description: "Product design, branding, and digital experiences across twenty years.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="pt-24 pb-16 md:pt-36">
        <Reveal>
          <h1 className="font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
            Work
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-lg text-base text-muted leading-relaxed">
            Product design, branding, and digital experiences across startups,
            enterprise software, and culture brands.
          </p>
        </Reveal>
      </section>

      <section className="pb-32">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i * 0.05, 0.25)}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
