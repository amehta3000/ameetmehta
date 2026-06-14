export const metadata = {
  title: "About — Ameet Mehta",
  description:
    "Creative technologist with 20+ years in product design, branding, and digital experiences. Currently consulting SMBs and pursuing a parallel creative practice in music, generative art, and code.",
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
          I&apos;m a creative technologist. For twenty years I&apos;ve designed
          and built digital products across every part of the stack — research,
          systems design, visual craft, and code. That breadth isn&apos;t a
          detour. It&apos;s how I work.
        </p>
        <p>
          I&apos;ve led product design at an AI enterprise company, run creative
          direction for a 25-year subculture magazine, launched consumer brands
          from scratch, and designed commerce experiences for Reebok. The common
          thread is getting complex things to feel simple, and making simple
          things feel considered.
        </p>
        <p>
          Right now I mostly work with small and medium-sized businesses who need
          to move faster without hiring a full team — workflow analysis, product
          design, creative direction, sometimes all at once. If your problem
          doesn&apos;t fit a clean job description, that&apos;s usually a good
          sign we&apos;d work well together.
        </p>
        <p>
          Outside of client work, I make beats, generate art, and write programs
          that follow intuition more than architecture. It&apos;s a studio
          practice — work done for its own sake, on its own schedule, that keeps
          the whole thing honest.
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
