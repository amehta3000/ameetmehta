import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Ameet Mehta",
  description:
    "Product designer, synthographer, beat maker, and eternal learner. 20+ years designing & building internet experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full dark ${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-body)] antialiased">
        <ThemeProvider>
          <Nav />
          <main className="flex-1 pt-14">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
