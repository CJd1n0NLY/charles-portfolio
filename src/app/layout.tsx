import { Space_Grotesk, IBM_Plex_Mono, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

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
    <html lang="en" className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} ${inter.variable} scroll-smooth`}>
      <body className="antialiased relative min-h-screen flex flex-col">
        <div className="pointer-events-none fixed inset-0 z-50 opacity-20 bg-[url('/grain.png')]" />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ScrollToTop />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--color-ink)',
              color: 'var(--color-paper)',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
            },
            success: {
              iconTheme: {
                primary: 'var(--color-pass)',
                secondary: 'var(--color-ink)',
              },
            },
            error: {
              iconTheme: {
                primary: 'var(--color-ribbon-ink)',
                secondary: 'var(--color-ink)',
              },
            },
          }}
        />
      </body>
    </html>
  );
}