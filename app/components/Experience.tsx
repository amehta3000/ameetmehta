"use client";

import { useState } from "react";
import { SectionHeading } from "./About";

const jobs = [
  {
    company: "Company Name",
    title: "Senior Software Engineer",
    range: "2022 to Present",
    bullets: [
      "Led development of core product features used by thousands of customers daily.",
      "Collaborated with cross-functional teams to define and ship new product capabilities.",
      "Improved system performance and reliability through architectural improvements.",
    ],
  },
  {
    company: "Previous Company",
    title: "Software Engineer",
    range: "2019 to 2022",
    bullets: [
      "Built and maintained full-stack features across web and mobile platforms.",
      "Worked closely with product and design to deliver high-quality user experiences.",
      "Mentored junior engineers and contributed to team best practices.",
    ],
  },
  {
    company: "Startup Inc.",
    title: "Software Engineer Intern",
    range: "2018 to 2019",
    bullets: [
      "Developed internal tooling and dashboards to streamline operations.",
      "Contributed to the main product codebase in both frontend and backend.",
    ],
  },
];

export default function Experience() {
  const [active, setActive] = useState(0);
  const job = jobs[active];

  return (
    <section id="experience" className="py-24 px-6 max-w-5xl mx-auto">
      <SectionHeading number="02" title="Where I've Worked" />
      <div className="mt-10 flex flex-col sm:flex-row gap-0 sm:gap-8">
        {/* Tab list */}
        <ul className="flex sm:flex-col overflow-x-auto sm:overflow-visible border-b sm:border-b-0 sm:border-l border-zinc-200 dark:border-zinc-800 shrink-0">
          {jobs.map((j, i) => (
            <li key={j.company}>
              <button
                onClick={() => setActive(i)}
                className={`px-5 py-3 text-sm font-mono whitespace-nowrap text-left w-full transition-colors ${
                  i === active
                    ? "text-zinc-900 dark:text-zinc-100 border-b-2 sm:border-b-0 sm:border-l-2 border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800/50"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/30"
                }`}
              >
                {j.company}
              </button>
            </li>
          ))}
        </ul>

        {/* Content */}
        <div className="pt-6 sm:pt-0 flex-1">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {job.title}{" "}
            <span className="text-zinc-400 dark:text-zinc-500">
              @ {job.company}
            </span>
          </h3>
          <p className="mt-1 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            {job.range}
          </p>
          <ul className="mt-4 space-y-3">
            {job.bullets.map((b, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
              >
                <span className="mt-1 shrink-0 text-zinc-400 dark:text-zinc-500">▹</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
