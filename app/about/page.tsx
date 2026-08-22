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
                I&apos;m a well-marinated product design leader based in Los
                Angeles. I design, I build, and I make music, and the
                interesting problems tend to live where those overlap.
              </p>
              <p>
                For more than 20 years I&apos;ve turned emerging technology into
                products people trust. Lately that means agentic AI at
                Microsoft, where I lead UX for security systems: composable
                design systems, multi-agent frameworks, and the
                human-in-the-loop controls that keep people in charge when the
                stakes are high. Before that, early enterprise AI at Moveworks,
                plus a long run across music platforms and independent media.
              </p>
              <p>
                The way I work is systems thinking made tangible. I bring
                product vision, technical fluency, and taste to ambitious ideas
                still taking shape, and I&apos;d rather build the prototype than
                argue about the slide.
              </p>
              <p>
                Music keeps me honest. I produce and DJ as Part Time Chiller and
                perform with Sadubas, which keeps me close to real audiences and
                reminds me the best work gets felt before it gets explained.
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
