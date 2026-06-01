export const metadata = {
  title: "About — Ameet Mehta",
  description: "Product designer, synthographer, beat maker, and eternal learner.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <section className="py-24 md:py-36">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          About
        </h1>
      </section>

      <div className="space-y-8 pb-24 text-base leading-relaxed text-muted">
        <p>
          Product Designer + Synthographer + Beat Maker + Eternal Learner.
        </p>
        <p>
          20+ years designing &amp; building internet experiences using empathy,
          rapid prototyping and systems thinking to bring zero-to-one products to
          life.
        </p>
        <p>
          Currently, I consult small to medium-sized businesses, providing user
          research, design, mentorship, and product strategy to help them achieve
          product-market fit.
        </p>
        <p>
          Outside of product work, I make music, generate art, and write
          vibe-coded programs — following intuition and aesthetic over strict
          engineering.
        </p>

        <div className="border-t border-border pt-8">
          <h2 className="font-[family-name:var(--font-display)] text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Connect
          </h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href="mailto:hello@ameetmehta.com?subject=Hey%20Ameet!%20Let%27s%20Connect"
                className="text-foreground underline underline-offset-4 hover:text-accent transition-colors"
              >
                hello@ameetmehta.com
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/ameetmehta/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/ameet3000/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 hover:text-accent transition-colors"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
