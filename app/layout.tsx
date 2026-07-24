import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Syne,
  Space_Grotesk,
  Unbounded,
  Instrument_Serif,
  Fraunces,
  DM_Serif_Display,
  Playfair_Display,
  Anton,
  Sora,
  Instrument_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import { AudioPlayerProvider } from "./components/AudioPlayerProvider";
import { MiniPlayer } from "./components/MiniPlayer";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { SceneWrapper } from "./components/SceneWrapper";
import "./globals.css";

// ---- display font options (cycled by the Ctrl+D switcher) ----
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], display: "swap", variable: "--font-d0" });
const syne = Syne({ subsets: ["latin"], display: "swap", variable: "--font-d1" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-d2" });
const unbounded = Unbounded({ subsets: ["latin"], display: "swap", variable: "--font-d3" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: ["400"], display: "swap", variable: "--font-d4" });
const fraunces = Fraunces({ subsets: ["latin"], display: "swap", variable: "--font-d5" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: ["400"], display: "swap", variable: "--font-d6" });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--font-d7" });
const anton = Anton({ subsets: ["latin"], weight: ["400"], display: "swap", variable: "--font-d8" });
const sora = Sora({ subsets: ["latin"], display: "swap", variable: "--font-d9" });

const displayFonts = [
  bricolage,
  syne,
  spaceGrotesk,
  unbounded,
  instrumentSerif,
  fraunces,
  dmSerif,
  playfair,
  anton,
  sora,
];

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Ameet Mehta",
  description:
    "Creative technologist, product design leader, musician, and curator of finely made things. Based in Los Angeles.",
  openGraph: {
    title: "Ameet Mehta",
    description:
      "Creative technologist, product design leader, musician, and curator of finely made things. Based in Los Angeles.",
    url: "https://ameetmehta.com",
    siteName: "Ameet Mehta",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ameet Mehta",
    description:
      "Creative technologist, product design leader, musician, and curator of finely made things. Based in Los Angeles.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full dark ${displayFonts.map((f) => f.variable).join(" ")} ${instrumentSans.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-body)] antialiased bg-paper text-ink">
        <ThemeProvider>
          <AudioPlayerProvider>
            <SceneWrapper />
            <Nav />
            <main className="flex-1 pt-14 relative z-10">{children}</main>
            <Footer />
            <MiniPlayer />
          </AudioPlayerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
