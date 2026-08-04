import React from 'react';
import Reveal from '@/components/Reveal';

export default function ContactPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <Reveal>
        <div className="flex flex-col items-center">
          <div className="text-pass font-mono text-sm mb-6">~/contact</div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-ink mb-4">
            Have a project in mind?
          </h1>
          
          <p className="text-lg text-ink-soft mb-10 max-w-md mx-auto">
            I&apos;m currently taking on freelance and contract work. Tell me what you&apos;re building.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="mailto:charlespostrado14@gmail.com"
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-ink text-paper rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/20 active:translate-y-0"
            >
              Email me
              {/* Arrow that shifts right to prompt action */}
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/charles-jacob-postrado-096844360/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-transparent border border-line text-ink rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:border-pass hover:text-pass hover:bg-pass/5 hover:shadow-sm active:translate-y-0"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}