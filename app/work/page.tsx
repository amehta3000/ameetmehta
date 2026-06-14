import { getProjectsByType } from "@/data/projects";
import { ProjectCard } from "../components/ProjectCard";

export const metadata = {
  title: "Work | Ameet Mehta",
  description: "Professional portfolio: product design, branding, and digital experiences.",
};

export default function WorkPage() {
  const professional = getProjectsByType("professional");

  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="py-24 md:py-36">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Work
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Product design, branding, and digital experiences for startups
          finding their footing and established brands that need to move again.
        </p>
      </section>

      <section className="pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {professional.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
