import { Reveal } from "../components/Reveal";
import { asset } from "@/lib/asset";

export const metadata = {
  title: "About | Ameet Mehta",
  description: "Twenty years building digital products, brands, and music. Based in Los Angeles.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <section className="pt-24 pb-16 md:pt-36">
        <Reveal>
          <h1 className="font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
            About
          </h1>
        </Reveal>
      </section>

      <div className="pb-32 space-y-10">
        <Reveal>
          <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
            <div>
              <img
                src={asset("/assets/about/AmeetProfileRound.png")}
                alt="Ameet Mehta"
                className="w-32 h-32 rounded-full object-cover md:w-full md:h-auto md:rounded-none"
              />
            </div>
            <div className="space-y-6 text-base leading-relaxed text-muted">
              <p>
                I&apos;m Ameet. A well-marinated product builder based in Los
                Angeles. My 20+ year career in tech is driven by a love for
                design, technology, and music.
              </p>
              <p>
                With a rich background in bringing zero-to-one products to life
                as a co-founder, product head, engineering director, and principal
                designer, I&apos;m just as comfortable flying solo as I am leading
                a team toward a shared product vision.
              </p>
              <p>
                Right now I mostly consult with small and medium-sized businesses
                who need to move faster without hiring a full team: workflow
                analysis, product design, creative direction, sometimes all at
                once. If your problem doesn&apos;t fit a clean job description,
                that&apos;s usually a good sign we&apos;d work well together.
              </p>
              <p>
                Parallel to all of it, I make music across two contexts. As
                Part Time Chiller I work solo: DJing, producing beats, and
                curating sounds for people who take music seriously. As one
                half of SADUBAS, I collaborate with my longtime partner on
                South Asian-influenced electronic music and live audio-visual
                performance, working with musicians and filmmakers to expand
                the work beyond the two of us. Both practices feed each other
                and keep the rest of it honest.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-t border-line pt-10 grid gap-10 md:grid-cols-3">
            <div>
              <h2 className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-muted mb-4">
                Connect
              </h2>
              <ul className="space-y-2">
                {[
                  { label: "hello@ameetmehta.com", href: "mailto:hello@ameetmehta.com?subject=Hey%20Ameet" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/ameetmehta/" },
                  { label: "Instagram", href: "https://www.instagram.com/ameet3000/" },
                  { label: "Art — @ameet3000.art", href: "https://www.instagram.com/ameet3000.art/" },
                  { label: "Beats — SADUBAS", href: "https://www.instagram.com/sadubas/reels/" },
                ].map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("mailto") ? undefined : "_blank"}
                      rel={item.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                      className="text-sm text-ink underline underline-offset-4 hover:text-amber transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-muted mb-4">
                Consulting
              </h2>
              <ul className="space-y-1 text-sm text-muted">
                <li>Product design</li>
                <li>Workflow analysis</li>
                <li>Creative direction</li>
                <li>Design systems</li>
                <li>AI tools integration</li>
              </ul>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-muted mb-4">
                Studio
              </h2>
              <ul className="space-y-1 text-sm text-muted">
                <li>Part Time Chiller — solo DJ / producer</li>
                <li>SADUBAS — audio-visual act</li>
                <li>Generative art / synthography</li>
                <li>Three.js / p5.js</li>
                <li>Max for Live devices</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
