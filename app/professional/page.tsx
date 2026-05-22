import Image from "next/image";
import Link from "next/link";

const works = [
  {
    slug: "product-plan",
    title: "ProductPlan Roadmaps",
    image: "/images/works/product-plan.svg",
    description:
      "ProductPlan engaged me as a UX designer to spearhead the design and user experience of their MVP product, transforming feedback into a streamlined roadmap experience for CEOs.",
  },
  {
    slug: "identity",
    title: "Identity + Branding",
    image: "/images/works/identity.svg",
    description: "Logos and print, fresh off the press.",
  },
  {
    slug: "weathersight",
    title: "WeatherSight",
    image: "/images/works/weathersight.svg",
    description:
      "Brought on board by WeatherSight to define a distinct brand identity and build an enticing landing page for precise long-term weather and climate data.",
  },
  {
    slug: "employee-communications",
    title: "Employee Communications",
    image: "/images/works/employee-communications.svg",
    description:
      "For internal enterprise communications, send messages that drive action and make change happen in real time.",
  },
  {
    slug: "chnl",
    title: "CHNL",
    image: "/images/works/chnl.svg",
    description:
      "In an era of digital noise, CHNL emerged as a tool for personalized, meaningful content and redefined how users interact with digital media.",
  },
  {
    slug: "topspin",
    title: "Topspin Media Widgets",
    image: "/images/works/topspin.svg",
    description:
      "Lead UX development for Topspin Media to create sustainable revenue streams for musicians and filmmakers.",
  },
  {
    slug: "cero-electric-cargo-bikes",
    title: "Cero Electric Cargo Bikes",
    image: "/images/works/cero-electric-cargo-bikes.svg",
    description:
      "Contract designer & developer for Cero Bikes, delivering a WooCommerce-powered digital storefront integrated with Klarna and Velofix.",
  },
];

export default function ProfessionalPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Professional Work</h1>
      <p className="text-lg text-[var(--muted)] mb-12 max-w-2xl">
        Selected projects from 20+ years of product design, UX strategy, and branding.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((work) => (
          <Link
            key={work.slug}
            href={`/professional/${work.slug}`}
            className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--card-hover)] overflow-hidden transition-all hover:scale-[1.02]"
          >
            <div className="aspect-[4/3] relative bg-[var(--border)]">
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-cover p-4"
              />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--accent)] transition-colors">
                {work.title}
              </h3>
              <p className="text-sm text-[var(--muted)] line-clamp-3">
                {work.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
