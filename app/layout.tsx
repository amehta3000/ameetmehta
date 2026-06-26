import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { SceneWrapper } from "./components/SceneWrapper";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

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
      className={`h-full dark ${fraunces.variable} ${instrumentSans.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-body)] antialiased bg-paper text-ink">
        <ThemeProvider>
          <SceneWrapper />
          <Nav />
          <main className="flex-1 pt-14 relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
