import { Reveal } from "../components/Reveal";
import { SpotifyEmbed } from "../components/SpotifyEmbed";
import { asset } from "@/lib/asset";

export const metadata = {
  title: "Chiller | Ameet Mehta",
  description:
    "Part Time Chiller — Ameet Mehta as solo DJ and music producer. Playlists, beats, and sound. Also one half of SADUBAS, an audio-visual performance act.",
};

const playlists = [
  {
    id: "0iMNNrtl1m6B54PyGlygy2",
    title: "Sunday Vibes",
    description:
      "The one that started it all. Built for slow mornings and focused afternoons — no filler, no bad energy.",
  },
  {
    id: "6MYB8Zxzbi2w6zZGIovB5S",
    title: "Track IDs",
    description:
      "A deeper cut. The records I keep coming back to across years of digging — a more holistic read of where my taste actually lives.",
  },
];

const sadubas = [
  {
    src: "/assets/identity/Sadubas-The_Ascent_cover_2000_trishul.png",
    alt: "SADUBAS — The Ascent",
  },
  {
    src: "/assets/identity/Railways_cover_202212.jpg",
    alt: "SADUBAS — Railways",
  },
  {
    src: "/assets/identity/sadubas_logo.png",
    alt: "SADUBAS logo",
  },
];

const ART_STUB_COUNT = 6;

export default function ChillerPage() {
  return (
    <div className="mx-auto max-w-6xl px-6">

      {/* Hero */}
      <section className="pt-24 pb-20 md:pt-40 md:pb-28">
        <Reveal>
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-amber mb-5">
            Solo DJ + Producer
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Part Time<br />Chiller
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-muted md:text-lg">
            My solo alias as a DJ and music producer. Curation, original beats, and South Asian-influenced electronics — for people who take sound seriously but also know when to let go.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <a
            href="https://parttimechiller.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-widest border border-amber text-amber px-4 py-2 hover:bg-amber hover:text-paper transition-colors duration-150"
          >
            Visit parttimechiller.com ↗
          </a>
        </Reveal>
      </section>

      {/* Playlists */}
      <section className="border-t border-line pt-16 pb-24">
        <Reveal>
          <h2 className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-muted mb-12">
            Sounds
          </h2>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-2">
          {playlists.map((playlist, i) => (
            <Reveal key={playlist.id} delay={i * 0.1}>
              <div>
                <p className="font-[family-name:var(--font-display)] text-lg font-semibold mb-1">
                  {playlist.title}
                </p>
                <p className="text-sm text-muted mb-5 leading-relaxed">
                  {playlist.description}
                </p>
                <SpotifyEmbed playlistId={playlist.id} title={playlist.title} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SADUBAS */}
      <section className="border-t border-line pt-16 pb-24">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight mb-2">
                SADUBAS
              </h2>
              <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.15em] text-amber">
                Audio-visual performance
              </p>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-muted">
              <p>
                SADUBAS is an audio-visual performance act I co-founded with my collaborator and longtime friend. Together we make South Asian-influenced electronic music and live visuals — sitting somewhere between house, ambient, and whatever comes next.
              </p>
              <p>
                We collaborate with musicians and filmmakers to expand the work beyond the two of us: live sets, beat tapes, short film scores, and visual installations. The through-line is always rhythm, texture, and the spaces between notes.
              </p>
              <div className="flex flex-wrap gap-5">
                <a
                  href="https://sadubas.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-widest text-amber hover:text-ink transition-colors"
                >
                  sadubas.com ↗
                </a>
                <a
                  href="https://www.instagram.com/sadubas/reels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-widest text-muted hover:text-ink transition-colors"
                >
                  Instagram ↗
                </a>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {sadubas.map((img) => (
              <div
                key={img.src}
                className="aspect-square overflow-hidden border border-line"
              >
                <img
                  src={asset(img.src)}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Visual — stubbed */}
      <section className="border-t border-line pt-16 pb-32">
        <Reveal>
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-muted">
              Visual
            </h2>
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-muted">
              Coming soon
            </span>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: ART_STUB_COUNT }).map((_, i) => (
            <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
              <div className="aspect-square border border-line bg-line/10" />
            </Reveal>
          ))}
        </div>
      </section>

    </div>
  );
}
