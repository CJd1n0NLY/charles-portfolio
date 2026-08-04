import Reveal from '@/components/Reveal';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 space-y-16">
      <Reveal>
        <section className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-ink">
            My Background
          </h1>
          <p className="text-ink-soft text-lg leading-relaxed">
            I recently graduated Cum Laude with a degree in Information Technology. I love turning complex problems into clean, working software, blending modern web development with solid, reliable engineering.
          </p>
        </section>
      </Reveal>

      <hr className="border-line" />

      <Reveal>
        <section className="grid gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-ink-soft">
              What I Do Best
            </h2>
            <ul className="space-y-2 text-sm text-ink-soft font-mono">
              <li>▪ Full-Stack Development: Building complete web apps from front to back (React, Next.js, Laravel).</li>
              <li>▪ Systems & Architecture: Designing secure and reliable databases (Java, PHP, MySQL).</li>
              <li>▪ API Integrations: Connecting third-party tools and services seamlessly.</li>
              <li>▪ Quality Assurance: Thorough manual QA testing to ensure everything runs smoothly and bug-free.</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-ink-soft">
              Education
            </h2>
            <div className="space-y-1">
              <h3 className="text-base font-display font-bold text-ink">
                Bachelor of Science in Information Technology
              </h3>
              <p className="text-xs font-mono text-ink-soft">
                University of Caloocan City
              </p>
              <p className="text-xs text-pass font-semibold uppercase tracking-wider mt-1">
                Cum Laude Honors
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <hr className="border-line" />

      <Reveal>
        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-ink">How I Work</h2>
          <p className="text-sm text-ink-soft leading-relaxed">
            I believe great software should be fast, easy to use, and built to last. Whether I'm automating a tedious workflow or building a team project from scratch, I focus on writing clean, maintainable code that solves real business problems—not just following the latest visual trends.
          </p>
          <div className="pt-4">
            <a
              href="/assets/resume.pdf"
              download
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-mono uppercase tracking-widest bg-card border border-line hover:border-ribbon-ink text-ink transition-colors duration-200 rounded-sm shadow-sm"
            >
              Download My CV
            </a>
          </div>
        </section>
      </Reveal>
    </div>
  );
}