"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  // Check if we are on the homepage
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we should use the dark text / frosted background style.
  // We use it if we are scrolled down OR if we are NOT on the homepage.
  const isDarkStyle = !isHome || isScrolled;

  const navItems = [
    { name: "~/work", href: "/#work" },
    { name: "~/about", href: "/about" },
    { name: "~/contact", href: "/contact" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ${
        isDarkStyle 
          ? "bg-paper/95 backdrop-blur-md border-b border-line py-4 shadow-sm" 
          : "bg-transparent py-8"
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        
        {/* Left Column: Brand */}
        <div className="w-1/3 flex justify-start">
          <Link 
            href="/" 
            className={`font-display font-bold text-xl tracking-tight transition-colors duration-500 ${
              isDarkStyle ? "text-ink" : "text-paper"
            }`}
          >
            cjcp.dev
          </Link>
        </div>
        
        {/* Center Column: Navigation Links */}
        <div className="w-1/3 flex justify-center gap-6 font-mono text-xs md:text-sm">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`relative group py-1 transition-colors duration-300 ${
                isDarkStyle 
                  ? "text-ink-soft hover:text-ink" 
                  : "text-paper/70 hover:text-pass"
              }`}
            >
              {item.name}
              
              <span 
                className={`absolute left-0 bottom-0 w-full h-[1px] transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                  isDarkStyle ? "bg-ink" : "bg-pass"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Right Column: CTA Button */}
        <div className="w-1/3 flex justify-end">
          <Link 
            href="/contact" 
            className={`group hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 border rounded transition-all duration-300 font-mono text-sm hover:-translate-y-0.5 ${
              isDarkStyle 
                ? "border-line hover:border-ink/30 text-ink hover:bg-ink/5" 
                : "border-paper/30 hover:border-pass text-paper hover:text-pass hover:bg-pass/5"
            }`}
          >
            Hire me 
            <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>

      </nav>
    </header>
  );
}