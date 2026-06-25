const skills = [
  "TypeScript", "JavaScript", "React", "Next.js",
  "Node.js", "Python", "SQL", "PostgreSQL",
  "AWS", "Docker", "Git", "REST APIs",
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto">
      <SectionHeading number="01" title="About Me" />
      <div className="mt-10 grid sm:grid-cols-3 gap-12">
        <div className="sm:col-span-2 space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            Hello! I&apos;m Ameet, a software engineer based in the US. I enjoy
            creating things that live on the internet, whether that&apos;s
            websites, applications, or anything in between.
          </p>
          <p>
            I&apos;m passionate about building products that are both functional
            and beautiful. I care deeply about the details: clean code, good
            UX, and systems that scale.
          </p>
          <p>
            When I&apos;m not at my computer, you&apos;ll find me exploring new
            technologies, reading, or spending time outdoors.
          </p>
          <p className="pt-2 text-zinc-700 dark:text-zinc-300 font-medium">
            Technologies I&apos;ve been working with recently:
          </p>
          <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
            {skills.map((s) => (
              <li
                key={s}
                className="flex items-center gap-2 text-sm font-mono text-zinc-600 dark:text-zinc-400"
              >
                <span className="text-zinc-400 dark:text-zinc-500">▹</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center sm:justify-end">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56">
            <div className="w-full h-full rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-5xl font-bold text-zinc-300 dark:text-zinc-600">
              AM
            </div>
            <div className="absolute inset-0 rounded-xl border-2 border-zinc-300 dark:border-zinc-600 translate-x-3 translate-y-3 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-sm text-zinc-400 dark:text-zinc-500">
        {number}.
      </span>
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}
