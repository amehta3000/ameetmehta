import { Reveal } from "../components/Reveal";
import { ExperienceAccordion } from "../components/ExperienceAccordion";
import { asset } from "@/lib/asset";

export const metadata = {
  title: "About | Ameet Mehta",
  description: "Twenty years building digital products, brands, and music. Based in Los Angeles.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <section className="pt-24 pb-16 md:pt-36">
        <Reveal>
          <h1 className="font-[family-name:var(--font-display)] font-semibold tracking-tight text-[clamp(2.5rem,7vw,7rem)]">
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
            <div className="space-y-6 text-lg leading-relaxed text-muted">
              <p>Hey there. I&apos;m Ameet.</p>
              <p>
                I&apos;m a well-marinated product design leader, builder, and
                musician based in Los Angeles.
              </p>
              <p>
                For more than 20 years, I&apos;ve worked at the intersection of
                design, technology, and culture. I&apos;ve led teams, built
                zero-to-one products, and helped turn emerging technology into
                experiences people can understand and enjoy. My path has moved
                across engineering, product, and design, from music platforms
                and independent media to early enterprise AI at Moveworks and
                AI-native products at Microsoft.
              </p>
              <p>
                Music is a core part of how I think and create. I produce and DJ
                as Part Time Chiller, perform with Sadubas, and build visual and
                generative experiments around sound. That work keeps me close to
                the creators, audiences, and communities these products are
                meant to serve.
              </p>
              <p>
                I&apos;m most energized by teams exploring how AI can expand
                human creativity. I bring product vision, systems thinking,
                technical fluency, taste, and a collaborative leadership style
                to ambitious ideas that are still taking shape.
              </p>
              <p>
                Mostly, I want to make thoughtful things with good people and
                keep the vibes intact.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-t border-line pt-12">
            <h2 className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-muted mb-8">
              Experience
            </h2>
            <ExperienceAccordion />
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
                  { label: "GitHub", href: "https://github.com/amehta3000" },
                  { label: "Instagram", href: "https://www.instagram.com/ameet3000/" },
                  { label: "Art: @ameet3000.art", href: "https://www.instagram.com/ameet3000.art/" },
                  { label: "Beats: SADUBAS", href: "https://www.instagram.com/sadubas/reels/" },
                ].map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("mailto") ? undefined : "_blank"}
                      rel={item.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                      className="text-base text-ink underline underline-offset-4 hover:text-amber transition-colors"
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
              <ul className="space-y-1 text-base text-muted">
                <li>Product design</li>
                <li>Workflow analysis</li>
                <li>Creative direction</li>
                <li>System design</li>
                <li>AI tools integration</li>
              </ul>
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-muted mb-4">
                Studio
              </h2>
              <ul className="space-y-1 text-base text-muted">
                <li>
                  <a
                    href="https://parttimechiller.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-amber transition-colors"
                  >
                    Part Time Chiller, solo DJ / producer
                  </a>
                </li>
                <li>
                  <a
                    href="https://sadubas.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-amber transition-colors"
                  >
                    SADUBAS, audio-visual act
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/thegridlifeai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-amber transition-colors"
                  >
                    TheGridLifeAI, gen art / synthography
                  </a>
                </li>
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
