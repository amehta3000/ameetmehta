import { Reveal } from "../components/Reveal";
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
            <div className="space-y-6 text-base leading-relaxed text-muted">
              <p>
                I&apos;m Ameet. A well-marinated creative technologist based in
                Los Angeles.
              </p>
              <p>
                I build things for artists, brands, and enterprises, whatever
                the problem calls for. Design, code, product strategy, creative
                direction. Right now most of my energy is at Microsoft, where
                I&apos;m helping organizations defend themselves against
                nation-state threats using AI agents. It&apos;s some of the most
                high-stakes, technically interesting work I&apos;ve done, and
                I&apos;m into it.
              </p>
              <p>
                I also consult, selectively, with founders and small teams who
                need to move fast without hiring a whole org around it. If your
                problem doesn&apos;t fit a clean job description, that&apos;s
                usually a good sign we&apos;d work well together.
              </p>
              <p>
                Music runs parallel to all of it. As Part Time Chiller I DJ and
                produce, mostly for myself and whoever else happens to be in the
                room at the right moment. As one half of SADUBAS, I make South
                Asian-influenced electronic music and perform live audio-visual
                sets with my longtime collaborator, pulling in musicians and
                filmmakers along the way.
              </p>
              <p>
                If any of this sounds interesting, professionally or creatively,
                hit me up.
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
                  { label: "Art: @ameet3000.art", href: "https://www.instagram.com/ameet3000.art/" },
                  { label: "Beats: SADUBAS", href: "https://www.instagram.com/sadubas/reels/" },
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
                <li>Part Time Chiller, solo DJ / producer</li>
                <li>SADUBAS, audio-visual act</li>
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
