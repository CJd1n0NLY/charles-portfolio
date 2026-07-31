import { Space_Grotesk, IBM_Plex_Mono, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import RouteProgress from '@/components/RouteProgress';
import { ReactNode } from 'react';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'cjcp.dev',
  description: 'Portfolio of Charles Jacob C. Postrado',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} ${inter.variable}`}>
      <body className="antialiased relative min-h-screen">
        <div className="pointer-events-none fixed inset-0 z-50 opacity-20 bg-[url('/grain.png')]" />
        <RouteProgress />
        <Navbar />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        {/* Toast Provider would go here */}
      </body>
    </html>
  );
}