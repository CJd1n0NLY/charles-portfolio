export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 space-y-16">
      <section className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">The Journey Architecture</h1>
        <p className="text-muted text-lg leading-relaxed">
          Driven by engineering precision and functional utility, I graduated with Cum Laude honors in Information Technology. My background bridges robust full-stack software development with systematic engineering practices.
        </p>
      </section>

      <hr className="border-surface" />

      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-wider text-muted">Core Competencies</h2>
          <ul className="space-y-2 text-sm text-muted/90 font-mono">
            <li>▪ Full-Stack Development (React, Next.js, Laravel)</li>
            <li>▪ Robust Systems & Architecture (Java, PHP, MySQL)</li>
            <li>▪ Specialized Technical Integrations & APIs</li>
            <li>▪ Rigorous Manual Quality Assurance Frameworks</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-bold uppercase tracking-wider text-muted">Academic Credentials</h2>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-primary">Bachelor of Science in Information Technology</h3>
            <p className="text-xs font-mono text-muted">University of Caloocan City — Section 4A</p>
            <p className="text-xs text-accent font-semibold uppercase tracking-wider mt-1">Cum Laude Academic Honors</p>
          </div>
        </div>
      </section>

      <hr className="border-surface" />

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Action-Oriented Implementation</h2>
        <p className="text-sm text-muted leading-relaxed">
          My development philosophy focuses on eliminating structural waste, reducing application load sizes, and building intuitive interactive frameworks. Whether implementing automated workflows or coordinating complex team projects, I prioritize maintainable engineering over standard visual trends.
        </p>
        <div className="pt-4">
          <a
            href="/assets/resume.pdf"
            download
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-mono uppercase tracking-widest bg-surface border border-surface hover:border-accent text-primary transition-colors duration-200 rounded"
          >
            Download Engineering Resume
          </a>
        </div>
      </section>
    </div>
  );
}