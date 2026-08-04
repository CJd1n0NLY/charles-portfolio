import Reveal from '@/components/Reveal';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 space-y-16">
      <Reveal>
        <section className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-ink">
            The Journey Architecture
          </h1>
          <p className="text-ink-soft text-lg leading-relaxed">
            Driven by engineering precision and functional utility, I graduated with Cum Laude honors in Information Technology. My background bridges robust full-stack software development with systematic engineering practices.
          </p>
        </section>
      </Reveal>

      <hr className="border-line" />

      <Reveal>
        <section className="grid gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-ink-soft">
              Core Competencies
            </h2>
            <ul className="space-y-2 text-sm text-ink-soft font-mono">
              <li>▪ Full-Stack Development (React, Next.js, Laravel)</li>
              <li>▪ Robust Systems & Architecture (Java, PHP, MySQL)</li>
              <li>▪ Specialized Technical Integrations & APIs</li>
              <li>▪ Rigorous Manual Quality Assurance Frameworks</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider text-ink-soft">
              Academic Credentials
            </h2>
            <div className="space-y-1">
              <h3 className="text-base font-display font-bold text-ink">
                Bachelor of Science in Information Technology
              </h3>
              <p className="text-xs font-mono text-ink-soft">
                University of Caloocan City — Section 4A
              </p>
              <p className="text-xs text-pass font-semibold uppercase tracking-wider mt-1">
                Cum Laude Academic Honors
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <hr className="border-line" />

      <Reveal>
        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-ink">Action-Oriented Implementation</h2>
          <p className="text-sm text-ink-soft leading-relaxed">
            My development philosophy focuses on eliminating structural waste, reducing application load sizes, and building intuitive interactive frameworks. Whether implementing automated workflows or coordinating complex team projects, I prioritize maintainable engineering over standard visual trends.
          </p>
          <div className="pt-4">
            <a
              href="/assets/resume.pdf"
              download
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-mono uppercase tracking-widest bg-card border border-line hover:border-ribbon-ink text-ink transition-colors duration-200 rounded-sm shadow-sm"
            >
              Download Engineering Resume
            </a>
          </div>
        </section>
      </Reveal>
    </div>
  );
}