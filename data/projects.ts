export type ProjectType = "professional" | "personal";
export type PersonalCategory = "music" | "art" | "code";

export interface ProjectSection {
  type: "text" | "image" | "video" | "embed";
  content: string; // text content, image URL, video URL, or embed URL
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  client?: string;
  description: string;
  shortDescription: string;
  type: ProjectType;
  category?: PersonalCategory;
  tags: string[];
  year?: string;
  role?: string;
  thumbnail?: string;
  heroImage?: string;
  sections: ProjectSection[];
  externalUrl?: string;
}

export const projects: Project[] = [
  // Professional
  {
    slug: "employee-communications",
    title: "Employee Communications",
    client: "Moveworks.ai",
    description:
      "Send messages that drive action and make corporate change happen in real time. Designed an enterprise communications platform that transforms how organizations connect with employees.",
    shortDescription: "Send messages that drive action and make corporate change happen in real time.",
    type: "professional",
    tags: ["Product Design", "Enterprise", "AI"],
    year: "2023",
    role: "Product Designer",
    sections: [
      { type: "text", content: "Designed the end-to-end employee communications experience for Moveworks' AI platform, enabling HR and IT teams to send targeted, actionable messages across the organization." },
      { type: "text", content: "The system leverages AI to personalize delivery timing and channel, dramatically improving engagement rates over traditional corporate communications tools." },
    ],
  },
  {
    slug: "weathersight",
    title: "Extreme Climate Website Rebrand",
    client: "Weathersight",
    description:
      "The platform for discovering and contextualizing global weather trends. A complete rebrand bringing clarity to complex climate data.",
    shortDescription: "The platform for discovering and contextualizing global weather trends.",
    type: "professional",
    tags: ["Branding", "Web Design", "Data Visualization"],
    year: "2022",
    role: "Design Lead",
    sections: [
      { type: "text", content: "Led the complete rebrand of Weathersight, transforming a data-heavy climate platform into an accessible, visually compelling experience that contextualizes extreme weather events for general audiences." },
    ],
  },
  {
    slug: "xlr8r",
    title: "Accelerating Music & Culture",
    client: "XLR8R",
    description:
      "Rebrand and relaunch of 25+ year subculture magazine. Modernizing a beloved music and culture publication for the digital era.",
    shortDescription: "Rebrand and relaunch of 25+ year subculture magazine.",
    type: "professional",
    tags: ["Branding", "Editorial", "Music"],
    year: "2021",
    role: "Creative Director",
    sections: [
      { type: "text", content: "Rebranded and relaunched XLR8R, a 25+ year electronic music and culture publication, creating a modern digital experience while honoring its subcultural roots." },
    ],
  },
  {
    slug: "chnl",
    title: "Curate What You Love",
    client: "CHNL",
    description:
      "Automatically filter social noise with the content you desire in beautiful collaborative channels.",
    shortDescription: "Automatically filter social noise with the content you desire.",
    type: "professional",
    tags: ["Product Design", "Social", "Mobile"],
    year: "2020",
    role: "Product Designer",
    sections: [
      { type: "text", content: "Designed CHNL, a content curation platform that cuts through social media noise by automatically filtering and organizing content into beautiful, shareable channels." },
    ],
  },
  {
    slug: "product-plan",
    title: "Beautiful Product Roadmaps",
    client: "ProductPlan",
    description:
      "Build executive product plans for strategic decisions and delivery, all in one platform.",
    shortDescription: "Build executive product plans for strategic decisions and delivery.",
    type: "professional",
    tags: ["Product Design", "SaaS", "Enterprise"],
    year: "2019",
    role: "Senior Product Designer",
    sections: [
      { type: "text", content: "Redesigned ProductPlan's roadmapping tool to support executive-level strategic planning alongside detailed delivery tracking, creating a unified platform for product teams." },
    ],
  },
  {
    slug: "topspin",
    title: "Direct to Fan Music Marketing",
    client: "Topspin Media",
    description:
      "Highly customizable sales and audience building marketing tools for artists and management.",
    shortDescription: "Customizable sales and audience building tools for artists.",
    type: "professional",
    tags: ["Product Design", "Music", "E-commerce"],
    year: "2014",
    role: "Product Designer",
    sections: [
      { type: "text", content: "Designed direct-to-fan marketing and commerce tools at Topspin Media, empowering artists and labels to build audiences and sell music, merch, and experiences directly to fans." },
    ],
  },
  {
    slug: "cero-electric-cargo-bikes",
    title: "Electric Cargo Bikes Launch",
    client: "Cero",
    description: "Enjoy driving again. Launch campaign and digital experience for an electric cargo bike brand.",
    shortDescription: "Enjoy driving again.",
    type: "professional",
    tags: ["Branding", "Web Design", "Launch"],
    year: "2020",
    role: "Design Lead",
    sections: [
      { type: "text", content: "Created the brand identity and launch digital experience for Cero, an electric cargo bike company making urban transportation joyful and sustainable." },
    ],
  },
  {
    slug: "rbkcustom",
    title: "RbkCustom by Reebok",
    client: "Reebok",
    description: "Customize your Reeboks and unleash your sole expression.",
    shortDescription: "Customize your Reeboks and unleash your sole expression.",
    type: "professional",
    tags: ["E-commerce", "Customization", "Web App"],
    year: "2012",
    role: "UX Designer",
    sections: [
      { type: "text", content: "Designed Reebok's shoe customization platform, enabling customers to express their creativity through personalized colorways, materials, and details on classic Reebok silhouettes." },
    ],
  },
  {
    slug: "identity",
    title: "Identity + Branding",
    client: "Multiple",
    description: "Small collection of logos, business cards, and graphics.",
    shortDescription: "Collection of logos, business cards, and graphics.",
    type: "professional",
    tags: ["Branding", "Identity", "Graphic Design"],
    sections: [
      { type: "text", content: "A curated collection of identity and branding work across multiple clients, including logos, business cards, and graphic design systems." },
    ],
  },

  // Personal
  {
    slug: "beat-explorations",
    title: "Beat Explorations",
    description: "Electronic music production exploring texture, rhythm, and space.",
    shortDescription: "Electronic beats exploring texture, rhythm, and space.",
    type: "personal",
    category: "music",
    tags: ["Beats", "Electronic", "Production"],
    externalUrl: "https://www.instagram.com/sadubas/reels/",
    sections: [
      { type: "text", content: "Ongoing exploration of electronic music production — blending organic textures with synthesized rhythms." },
    ],
  },
  {
    slug: "generative-sketches",
    title: "Generative Sketches",
    description: "AI-assisted and hand-drawn visual explorations.",
    shortDescription: "AI-assisted and hand-drawn visual explorations.",
    type: "personal",
    category: "art",
    tags: ["AI Art", "Generative", "Sketches"],
    externalUrl: "https://www.instagram.com/ameet3000.art/",
    sections: [
      { type: "text", content: "A collection of generative and AI-assisted visual experiments, blending computation with hand-drawn sensibility." },
    ],
  },
  {
    slug: "vibe-coded-experiments",
    title: "Vibe Coded Experiments",
    description: "Playful programs built through intuition-driven development.",
    shortDescription: "Playful programs built through intuition-driven development.",
    type: "personal",
    category: "code",
    tags: ["Creative Coding", "Experiments", "Web"],
    sections: [
      { type: "text", content: "A collection of small, expressive programs built through vibe coding — following intuition and aesthetic over strict engineering." },
    ],
  },
];

export function getProjectsByType(type: ProjectType) {
  return projects.filter((p) => p.type === type);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getPersonalByCategory(category: PersonalCategory) {
  return projects.filter((p) => p.type === "personal" && p.category === category);
}
