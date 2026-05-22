import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const worksData: Record<string, { title: string; image: string; content: string[] }> = {
  "product-plan": {
    title: "ProductPlan Roadmaps",
    image: "/images/works/product-plan.svg",
    content: [
      "ProductPlan, a pioneer in agile project management workflows, engaged me as a UX designer to spearhead the design and user experience of their MVP product.",
      "Tasked with creating an intuitive roadmap for CEOs, I transformed feedback into a streamlined and impactful UI.",
    ],
  },
  identity: {
    title: "Identity + Branding",
    image: "/images/works/identity.svg",
    content: [
      "A collection of logo designs and branding projects created for various clients.",
      "Each project involved understanding the client's vision, market positioning, and translating that into a cohesive visual identity.",
    ],
  },
  weathersight: {
    title: "WeatherSight",
    image: "/images/works/weathersight.svg",
    content: [
      "Brought on board by WeatherSight to define a distinct brand identity and build an enticing landing page for precise long-term weather and climate data.",
      "The design focused on clarity and trust, essential qualities for a data-driven product.",
    ],
  },
  "employee-communications": {
    title: "Employee Communications",
    image: "/images/works/employee-communications.svg",
    content: [
      "For internal enterprise communications, send messages that drive action and make change happen in real time.",
      "Designed a platform that helps organizations communicate effectively with their teams at scale.",
    ],
  },
  chnl: {
    title: "CHNL",
    image: "/images/works/chnl.svg",
    content: [
      "In an era of digital noise, CHNL emerged as a tool for personalized, meaningful content and redefined how users interact with digital media.",
      "Led the UX strategy and design for this innovative content curation platform.",
    ],
  },
  topspin: {
    title: "Topspin Media Widgets",
    image: "/images/works/topspin.svg",
    content: [
      "Lead UX development for Topspin Media to create sustainable revenue streams for musicians and filmmakers.",
      "Designed embeddable widgets that enabled artists to sell directly to fans from any website.",
    ],
  },
  "cero-electric-cargo-bikes": {
    title: "Cero Electric Cargo Bikes",
    image: "/images/works/cero-electric-cargo-bikes.svg",
    content: [
      "Contract designer & developer for Cero Bikes, delivering a WooCommerce-powered digital storefront integrated with Klarna and Velofix.",
      "Created a seamless e-commerce experience that matched the quality and innovation of the product itself.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(worksData).map((slug) => ({ slug }));
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = worksData[slug];

  if (!work) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/professional"
        className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-8"
      >
        ← Back to Professional Work
      </Link>

      <h1 className="text-4xl font-bold tracking-tight mb-8">{work.title}</h1>

      <div className="aspect-[16/9] relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] mb-8">
        <Image
          src={work.image}
          alt={work.title}
          fill
          className="object-contain p-8"
        />
      </div>

      <div className="space-y-4">
        {work.content.map((paragraph, i) => (
          <p key={i} className="text-lg text-[var(--muted)] leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
