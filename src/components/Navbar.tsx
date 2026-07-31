import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <header className="w-full">
      <nav className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
        
        {/* Left Column: Brand */}
        <div className="w-1/3 flex justify-start">
          <Link href="/" className="font-display font-bold text-ink text-xl tracking-tight">
            cjcp.dev
          </Link>
        </div>
        
        {/* Center Column: Navigation Links */}
        <div className="w-1/3 flex justify-center gap-4 md:gap-6 font-mono text-xs md:text-sm text-ink-soft">
          <Link href="/#work" className="hover:text-ink transition-colors">
            ~/work
          </Link>
          <Link href="/about" className="hover:text-ink transition-colors">
            ~/about
          </Link>
          <Link href="/contact" className="hover:text-ink transition-colors">
            ~/contact
          </Link>
        </div>

        {/* Right Column: CTA Button */}
        <div className="w-1/3 flex justify-end">
          <Link 
            href="/contact" 
            className="hidden sm:inline-flex px-4 py-1.5 border border-line rounded hover:bg-line/30 transition-colors font-mono text-sm text-ink"
          >
            Hire me &rarr;
          </Link>
        </div>

      </nav>
    </header>
  );
}