import React from 'react';

export default function ContactPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="text-pass font-mono text-sm mb-6">~/contact</div>
      
      <h1 className="text-4xl md:text-5xl font-display font-bold text-ink mb-4">
        Have a project in mind?
      </h1>
      
      <p className="text-lg text-ink-soft mb-10 max-w-md mx-auto">
        I&apos;m currently taking on freelance and contract work. Tell me what you&apos;re building.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <a 
          href="mailto:contact@cjcp.dev" 
          className="w-full sm:w-auto px-6 py-3 bg-ink text-paper rounded-lg font-medium hover:bg-ink/90 transition-colors"
        >
          Email me
        </a>
        {/* Adapted "View résumé" from the mockup design to the required LinkedIn link requirement */}
        <a 
          href="https://linkedin.com/in/cjcp" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3 bg-transparent border border-line text-ink rounded-lg font-medium hover:bg-line/30 transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}