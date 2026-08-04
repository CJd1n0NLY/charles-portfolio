import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-line/50 bg-paper py-12 mt-24">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Side: Brand and Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="font-display font-bold text-ink text-lg tracking-tight hover:text-pass transition-colors">
            cjcp.dev
          </Link>
          <span className="font-mono text-xs text-ink-soft">
            &copy; {new Date().getFullYear()} Charles Jacob C. Postrado. All rights reserved.
          </span>
        </div>
        
        {/* Right Side: Quick Links */}
        <div className="flex gap-6 font-mono text-sm text-ink-soft">
          <a 
            href="https://github.com/CJd1n0NLY" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-ink transition-colors hover:underline underline-offset-4"
          >
            github
          </a>
          <a 
            href="https://www.linkedin.com/in/charles-jacob-postrado-096844360/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-ink transition-colors hover:underline underline-offset-4"
          >
            linkedin
          </a>
          <a 
            href="mailto:charlespostrado14@gmail.com" 
            className="hover:text-ink transition-colors hover:underline underline-offset-4"
          >
            email
          </a>
        </div>
      </div>
    </footer>
  );
}