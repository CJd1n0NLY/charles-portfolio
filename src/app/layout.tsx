import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", weight: ["500", "600", "700"] });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-ibm-plex-mono", weight: ["400", "500"] });
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-ibm-plex-sans", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Charles | Build Report",
  description: "Continuous CI/test report and career portfolio.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${plexMono.variable} ${plexSans.variable} antialiased`}>
        <div className="grain-overlay" />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--color-card)',
              color: 'var(--color-ink)',
              border: '1px solid var(--color-line)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
            },
          }} 
        />
        {children}
      </body>
    </html>
  );
}