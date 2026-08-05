"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Determine if we should use the dark text / frosted background style.
  // We use it if we are scrolled down, NOT on the homepage, or the mobile
  // menu is open (so the toggle icon stays legible against the paper panel).
  const isDarkStyle = !isHome || isScrolled || isMenuOpen;

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

        {/* Brand — auto width on mobile so it never gets squeezed */}
        <div className="md:w-1/3 flex justify-start">
          <Link
            href="/"
            className={`font-display font-bold text-xl tracking-tight transition-colors duration-500 ${
              isDarkStyle ? "text-ink" : "text-paper"
            }`}
          >
            cjcp.dev
          </Link>
        </div>

        {/* Center Column: Navigation Links — desktop only, this is what was
            overflowing its w-1/3 box and colliding with the brand on narrow
            screens. Below md it moves into the dropdown panel instead. */}
        <div className="hidden md:flex md:w-1/3 justify-center gap-6 font-mono text-xs md:text-sm">
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

        {/* Right Column: CTA Button — desktop only, same reason as above */}
        <div className="hidden md:flex md:w-1/3 justify-end">
          <Link
            href="/contact"
            className={`group inline-flex items-center gap-1.5 px-4 py-1.5 border rounded transition-all duration-300 font-mono text-sm hover:-translate-y-0.5 ${
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

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className={`md:hidden -mr-2 p-2 rounded transition-colors duration-300 ${
            isDarkStyle ? "text-ink" : "text-paper"
          }`}
        >
          {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </nav>

      {/* Mobile dropdown panel */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out bg-paper ${
          isMenuOpen ? "max-h-80 opacity-100 border-t border-line" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-5 font-mono text-sm">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-ink-soft hover:text-ink transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 border border-line rounded text-ink hover:bg-ink/5 transition-colors"
          >
            Hire me <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </header>
  );
}