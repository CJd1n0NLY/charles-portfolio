import { prisma } from '@/lib/prisma';
import BootSequence from '@/components/BootSequence';
import ProjectCard from '@/components/ProjectCard';

export default async function HomePage() {
  const [projects, chapters, experiences, education, settings] = await Promise.all([
    prisma.project.findMany({ where: { status: 'PUBLISHED' } }),
    prisma.chapterIntro.findMany(),
    prisma.workExperience.findMany({ orderBy: { startDate: 'desc' } }),
    prisma.education.findMany({ orderBy: { startYear: 'desc' } }),
    prisma.siteSettings.findFirst(),
  ]);

  // Calculate props for the BootSequence component based on database records
  const academicCount = projects.filter((p) => p.chapter === 'ACADEMIC').length;
  const personalShippedCount = projects.filter((p) => p.chapter === 'PERSONAL' && p.buildStatus === 'SHIPPED').length;
  
  // Format the internship string (e.g., "CCCI, 2025") from the first experience or specifically CCCI
  const internshipExp = experiences.find((e) => e.company.includes('CCCI')) || experiences[0];
  const internString = internshipExp 
    ? `${internshipExp.company.includes('CCCI') ? 'CCCI' : internshipExp.company}, ${new Date(internshipExp.startDate).getFullYear()}`
    : 'None logged';

  // Helper function to keep the project mapping DRY
  const renderProjectChapter = (key: string, title: string) => {
    const chapterProjects = projects.filter(p => p.chapter === key);
    const intro = chapters.find(c => c.chapter === key);
    
    return (
      <div key={key}>
        <div className="mb-8">
          <div className="text-pass font-mono text-sm mb-2">~/work/{key.toLowerCase()}</div>
          <h2 className="text-2xl font-display font-bold text-ink mb-2">{title}</h2>
          <p className="text-ink-soft">{intro?.narrative || 'Archived builds and ongoing modules.'}</p>
        </div>

        <div className="flex flex-col gap-6">
          {chapterProjects.length === 0 ? (
            <div className="p-8 border border-line border-dashed rounded-xl text-center text-ink-soft font-mono text-sm">
              $ no builds logged in this suite
            </div>
          ) : (
            chapterProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.tagline}
                badgeStatus={project.buildStatus}
                tags={project.techStack ? project.techStack.split(',') : []}
                visualLabel={`${project.slug}.app`}
                href={`/work/${project.slug}`}
              />
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="pb-0">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block px-2 py-1 bg-ribbon text-ribbon-ink font-mono text-xs rounded mb-6">
            Open for freelance work
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-ink leading-tight mb-4">
            I turn client briefs into shipped, working software.
          </h1>
          <p className="text-ink-soft mb-8">
            Full-stack developer based in the Philippines. I design and build web systems end to end — from database schema to the interface a real user touches.
          </p>
          <div className="flex gap-4 mb-12">
            <a href="#work" className="px-5 py-2.5 bg-ink text-paper rounded-lg font-medium hover:bg-ink/90 transition-colors">
              View my work
            </a>
            <a href="/contact" className="px-5 py-2.5 border border-line text-ink rounded-lg font-medium hover:bg-line/50 transition-colors">
              Get in touch
            </a>
          </div>
          
          <div className="grid grid-cols-3 gap-4 font-mono text-sm border-t border-line pt-6">
            <div>
              <div className="text-2xl font-bold text-ink font-display">{projects.length}</div>
              <div className="text-ink-soft text-xs mt-1">projects built</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-ink font-display">{experiences.length}</div>
              <div className="text-ink-soft text-xs mt-1">industry roles</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-ink font-display">2026</div>
              <div className="text-ink-soft text-xs mt-1">graduating</div>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <BootSequence 
            academicCount={academicCount}
            internString={internString}
            personalShippedCount={personalShippedCount}
          />
        </div>
      </section>

      {/* Work Chapters */}
      <section id="work" className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-24">
        {renderProjectChapter('ACADEMIC', 'Classroom builds')}

        {/* INTERNSHIP Section - Now mapped directly to WorkExperience */}
        <div>
          <div className="mb-8">
            <div className="text-pass font-mono text-sm mb-2">~/work/internship</div>
            <h2 className="text-2xl font-display font-bold text-ink mb-2">Production experience</h2>
            <p className="text-ink-soft">Adapting to production environments and shipping real code.</p>
          </div>

          <div className="flex flex-col gap-6">
            {experiences.length === 0 ? (
              <div className="p-8 border border-line border-dashed rounded-xl text-center text-ink-soft font-mono text-sm">
                $ no builds logged in this suite
              </div>
            ) : (
              experiences.map((exp) => (
                <ProjectCard
                  key={exp.id}
                  title={exp.role}
                  description={exp.company}
                  badgeStatus="SHIPPED"
                  badgeLabel={`${exp.company.includes('CCCI') ? 'CCCI' : exp.company} · ${new Date(exp.startDate).getFullYear()}`}
                  tags={[]} 
                  visualLabel={`${exp.company.toLowerCase().replace(/[^a-z0-9]+/g, '-')} · internal tools`}
                  href={`/experience/${exp.slug}`}
                />
              ))
            )}
          </div>
        </div>

        {renderProjectChapter('CAPSTONE', 'Capstone projects')}
        {renderProjectChapter('PERSONAL', 'Self-directed work')}
      </section>

      {/* About / Timeline Panel */}
      <section className="bg-ink text-paper py-24 mt-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
          <div>
            <div className="text-pass font-mono text-sm mb-2">~/about</div>
            <h2 className="text-3xl font-display font-bold mb-4">How I got here</h2>
            <p className="text-paper/70">
              I studied full-stack development the way most engineers do — by shipping things that broke, then fixing them. What stuck with me is finishing: taking a system past the demo, into something someone actually depends on.
            </p>
          </div>
          <div className="flex flex-col">
            {experiences.map((exp) => (
              <div key={exp.id} className="grid grid-cols-[80px_1fr] gap-4 py-6 border-b border-paper/10 last:border-0">
                <div className="font-mono text-sm text-pass">{new Date(exp.startDate).getFullYear()}</div>
                <div>
                  <div className="font-bold font-display">{exp.role} at {exp.company}</div>
                  <div className="text-sm text-paper/60 mt-1">{exp.tagline || 'Experience details pending.'}</div>
                </div>
              </div>
            ))}
            {education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-[80px_1fr] gap-4 py-6 border-b border-paper/10 last:border-0">
                <div className="font-mono text-sm text-paper/50">{edu.endYear}</div>
                <div>
                  <div className="font-bold font-display">{edu.degree}</div>
                  <div className="text-sm text-paper/60 mt-1">{edu.school}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="text-pass font-mono text-sm mb-6">~/contact</div>
        
        <h2 className="text-4xl md:text-5xl font-display font-bold text-ink mb-4">
          Have a project in mind?
        </h2>
        
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
          <a 
            href="https://linkedin.com/in/cjcp" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-transparent border border-line text-ink rounded-lg font-medium hover:bg-line/30 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}