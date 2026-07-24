"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  positioning: string;
  points: string[];
}

const experience: ExperienceItem[] = [
  {
    role: "Principal Product Design Manager",
    company: "Microsoft, Security Platform",
    period: "2023 — Present",
    positioning: "Design Leader",
    points: [
      "Lead a multidisciplinary team of product designers, researchers, and content designers shaping the platform layer for Microsoft's AI-powered security products.",
      "Set experience strategy for agent-assisted workflows that help organizations understand and improve their security posture, bringing together data, recommendations, automation, and human judgment.",
      "Drive AI-native interaction models, including generative and composable interfaces, adaptive workspaces, and trustworthy human-in-the-loop controls, from concept through prototyping and product alignment.",
      "Partner across product, engineering, design, and research leadership to unify fragmented capabilities into coherent end-to-end journeys, coaching designers and raising the bar for craft and systems thinking.",
    ],
  },
  {
    role: "Founding Principal Product Designer",
    company: "Moveworks, acquired by ServiceNow",
    period: "2017 — 2022",
    positioning: "AI Pioneer",
    points: [
      "First design hire at an enterprise AI pioneer. Helped grow the company from 6 to 650 employees and established the product design foundation from pre-product through global scale.",
      "Shaped the NLU-powered conversational AI platform and core assistant experiences that resolved IT, HR, and finance needs for Fortune 500 and Global 2000 companies.",
      "Led Employee Communications from 0 to 100+ enterprise customers, more than $7M ARR, and a 65% attach rate.",
      "Established conversational UX standards and a universal chat design system, turning ambiguous AI capabilities into simple, trusted user experiences.",
    ],
  },
  {
    role: "Head of Product & Design",
    company: "XLR8R Media",
    period: "2015 — 2017",
    positioning: "Builder",
    points: [
      "Led product, design, engineering, and growth for an influential electronic music publication and community reaching roughly 900K monthly visitors.",
      "Rebuilt the digital platform and introduced new monetization, including self-serve events and ticketing, contributing to 15% annual revenue growth.",
      "Connected editorial, community, events, and commerce into a coherent product experience for artists and fans.",
    ],
  },
  {
    role: "Co-Founder, Head of Product & Design",
    company: "CHNL",
    period: "2011 — 2015",
    positioning: "Builder",
    points: [
      "Co-founded CHNL and led product vision, experience design, brand, and early product development for a mobile media concept.",
      "Developed the product strategy and prototypes while building the team, partnerships, and narrative needed to test and advance the concept.",
    ],
  },
  {
    role: "Senior UX Designer / Developer",
    company: "Topspin Media",
    period: "2008 — 2011",
    positioning: "Builder",
    points: [
      "Designed and built direct-to-fan tools enabling artists and labels to sell music, merchandise, tickets, and fan experiences.",
      "Created embeddable commerce and content experiences used across artist sites, bringing product design, front-end engineering, and music-industry needs together.",
    ],
  },
  {
    role: "Director of Engineering Services / Senior UX Developer",
    company: "Fluid",
    period: "2005 — 2008",
    positioning: "Builder",
    points: [
      "Led UX engineering and delivery for major digital commerce brands, managing multidisciplinary work across design, technology, and client leadership.",
    ],
  },
  {
    role: "Founder / Product & Design Consultant",
    company: "Red Rickshaw",
    period: "2002 — 2017",
    positioning: "Builder",
    points: [
      "Built digital products and brand experiences for startups and cultural organizations, bridging product strategy, experience design, and front-end development.",
    ],
  },
];

export function ExperienceAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {experience.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-line">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-start justify-between gap-6 py-7 text-left"
            >
              <div className="flex-1">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-amber">
                    {item.positioning}
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-muted">
                    {item.period}
                  </span>
                </div>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl md:text-2xl font-semibold tracking-tight text-ink group-hover:text-amber transition-colors duration-200">
                  {item.role}
                </h3>
                <p className="mt-1 text-base text-muted">{item.company}</p>
              </div>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
                className="mt-1 shrink-0 text-2xl leading-none text-muted group-hover:text-amber transition-colors duration-200"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="max-w-2xl space-y-3 pb-8 pl-0 text-base leading-relaxed text-muted">
                    {item.points.map((point, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
