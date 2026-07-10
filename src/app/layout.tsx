import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Charles | Developer Portfolio",
  description: "Narrative-driven portfolio of a full-stack engineer focused on high-performance applications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-canvas text-primary font-body antialiased min-h-screen flex flex-col selection:bg-accent selection:text-primary">
        <header className="sticky top-0 z-40 w-full border-b border-surface/40 bg-canvas/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-display font-bold text-lg tracking-tighter hover:text-muted transition-colors">
              CJCP
            </Link>
            <nav className="flex items-center gap-8 text-sm font-medium tracking-wide">
              <Link href="/" className="hover:text-muted transition-colors">Story</Link>
              <Link href="/about" className="hover:text-muted transition-colors">About</Link>
              <Link href="/contact" className="hover:text-muted transition-colors">Contact</Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow flex flex-col">
          {children}
        </main>

        <footer className="border-t border-surface/60 bg-surface/20 py-8 mt-auto">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
            <p>&copy; {new Date().getFullYear()} Charles Jacob C. Postrado. All rights reserved.</p>
            <p className="font-display uppercase tracking-widest text-[10px]">Built for Performance</p>
          </div>
        </footer>
      </body>
    </html>
  );
}