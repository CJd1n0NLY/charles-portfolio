import { prisma } from '@/lib/prisma';
import BootSequence from '@/components/BootSequence';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import ParticleCanvas from '@/components/ParticleCanvas';
import { 
  SiReact, 
  SiNextdotjs, 
  SiLaravel, 
  SiPhp, 
  SiTailwindcss, 
  SiGooglegemini, 
  SiMysql, 
  SiN8N,
  SiPostgresql,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiBootstrap,
  SiFlutter,
  SiVercel,
  SiNodedotjs,
  SiFigma
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

export default async function HomePage() {
  const [projects, chapters, experiences, education, settings] = await Promise.all([
    prisma.project.findMany({ where: { status: 'PUBLISHED' } }),
    prisma.chapterIntro.findMany(),
    prisma.workExperience.findMany({ orderBy: { startDate: 'desc' } }),
    prisma.education.findMany({ orderBy: { startYear: 'desc' } }),
    prisma.siteSettings.findFirst(),
  ]);

const techStack = [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "var(--color-ink)" },
    { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
    { name: "PHP", icon: SiPhp, color: "#777BB4" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "Java", icon: FaJava, color: "#F8981D" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
    { name: "Gemini API", icon: SiGooglegemini, color: "#8E75B2" },
    { name: "n8n Workflows", icon: SiN8N, color: "#FF6E67" },
    { name: "Flutter", icon: SiFlutter, color: "#02569B" },
    { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    { name: "Vercel", icon: SiVercel, color: "var(--color-ink)" },
    { name: "Roboflow", icon: null, color: "#6706CE" },
    { name: "Paymongo", icon: null, color: "var(--color-pass)" }, 
    { name: "YOLOv8", icon: null, color: "var(--color-pass)" },   
  ];
  
  const academicCount = projects.filter((p) => p.chapter === 'ACADEMIC').length;
  const personalShippedCount = projects.filter((p) => p.chapter === 'PERSONAL' && p.buildStatus === 'SHIPPED').length;

  const internshipExp = experiences.find((e) => e.company.includes('CCCI')) || experiences[0];
  const internString = internshipExp
    ? `${internshipExp.company.includes('CCCI') ? 'CCCI' : internshipExp.company}, ${new Date(internshipExp.startDate).getFullYear()}`
    : 'None logged';

  const renderProjectChapter = (key: string, title: string) => {
    const chapterProjects = projects.filter(p => p.chapter === key);
    const intro = chapters.find(c => c.chapter === key);

    return (
      <div key={key}>
        <Reveal>
          <div className="mb-8">
            <div className="text-pass font-mono text-sm mb-2">~/work/{key.toLowerCase()}</div>
            <h2 className="text-2xl font-display font-bold text-ink mb-2">{title}</h2>
            <p className="text-ink-soft">{intro?.narrative || 'Archived builds and ongoing modules.'}</p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          {chapterProjects.length === 0 ? (
            <div className="p-8 border border-line border-dashed rounded-xl text-center text-ink-soft font-mono text-sm">
              $ no builds logged in this suite
            </div>
          ) : (
            chapterProjects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.08}>
                <ProjectCard
                  title={project.title}
                  description={project.tagline}
                  badgeStatus={project.buildStatus}
                  tags={project.techStack ? project.techStack.split(',') : []}
                  visualLabel={`${project.slug}`}
                  heroImageUrl={project.heroImageUrl}
                  href={`/work/${project.slug}`}
                />
              </Reveal>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="pb-0">
      {/* Hero Section — Updated to match dark mockup */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center bg-ink text-paper overflow-hidden px-6">
        {/* Dark theme particle canvas */}
        <ParticleCanvas className="absolute inset-0 z-0" dotColor="rgba(255,255,255,0.15)" lineColor="255,255,255" />
        
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
          <span className="text-pass font-mono text-sm mb-6">
            $ postrado
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-paper leading-tight mb-6 tracking-tight">
            I bring your web projects to life,<br className="hidden md:block" /> from concept to launch.
          </h1>
          <p className="text-paper/70 text-lg md:text-xl mb-10 max-w-2xl">
            Based in the Philippines, I'm a full-stack developer who takes care of the entire process. I build secure, reliable systems and pair them with clean, intuitive interfaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a 
              href="#work" 
              className="group flex items-center gap-2 px-6 py-3 bg-paper text-ink rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(245,245,240,0.15)] active:translate-y-0"
            >
              View my work
              {/* Arrow that bounces down to indicate scrolling */}
              <span className="transition-transform duration-300 ease-out group-hover:translate-y-1">
                &darr;
              </span>
            </a>
            <a 
              href="/contact" 
              className="px-6 py-3 border border-paper/30 text-paper rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:border-pass hover:text-pass hover:bg-pass/10 active:translate-y-0"
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 flex flex-col items-center text-paper/40 font-mono text-xs gap-4 animate-pulse">
          <span>scroll</span>
          <div className="w-[1px] h-8 bg-paper/40"></div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="w-full border-y border-line bg-card py-6 overflow-hidden flex items-center">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 px-8 items-center font-mono text-sm text-ink-soft/60">
              {techStack.map((tech, index) => (
                <div 
                  key={index}
                  // Inject the dynamic color as a CSS variable
                  style={{ '--hover-color': tech.color } as React.CSSProperties}
                  // Tailwind applies the variable on hover to both the text and the icon
                  className="group flex items-center gap-3 transition-colors duration-300 cursor-default hover:text-[var(--hover-color)]"
                >
                  {tech.icon && (
                    <tech.icon className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  )}
                  <span className="tracking-wide">{tech.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Work Chapters */}
      <section id="work" className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-24">
        <ParticleCanvas className="absolute inset-0 -z-10" dotColor="rgba(17,17,17,0.35)" lineColor="22,101,52" />
        {renderProjectChapter('ACADEMIC', 'Classroom builds')}

        <div>
          <Reveal>
            <div className="mb-8">
              <div className="text-pass font-mono text-sm mb-2">~/work/internship</div>
              <h2 className="text-2xl font-display font-bold text-ink mb-2">Production experience</h2>
              <p className="text-ink-soft">Adapting to production environments and shipping real code.</p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            {experiences.length === 0 ? (
              <div className="p-8 border border-line border-dashed rounded-xl text-center text-ink-soft font-mono text-sm">
                $ no builds logged in this suite
              </div>
            ) : (
              experiences.map((exp, i) => (
                <Reveal key={exp.id} delay={i * 0.08}>
                  <ProjectCard
                    title={exp.role}
                    description={exp.company}
                    badgeStatus="SHIPPED"
                    badgeLabel={`${exp.company.includes('CCCI') ? 'CCCI' : exp.company} · ${new Date(exp.startDate).getFullYear()}`}
                    tags={[]}
                    visualLabel={`${exp.company.toLowerCase().replace(/[^a-z0-9]+/g, '-')} · internal tools`}
                    href={`/experience/${exp.slug}`}
                  />
                </Reveal>
              ))
            )}
          </div>
        </div>

        {renderProjectChapter('CAPSTONE', 'Capstone project')}
        {renderProjectChapter('PERSONAL', 'Self-directed work')}
      </section>

      {/* About / Timeline Panel */}
      <section className="bg-ink text-paper py-24 mt-12">
        <ParticleCanvas className="absolute inset-0 -z-10" dotColor="rgba(17,17,17,0.35)" lineColor="22,101,52" />
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
          <Reveal>
            <div>
              <div className="text-pass font-mono text-sm mb-2">~/about</div>
              <h2 className="text-3xl font-display font-bold mb-4">How I got here</h2>
              <p className="text-paper/70">
                I am driven by the creative process of taking an idea from concept to life. I build full-stack systems designed for maximum efficiency, frequently utilizing AI tools like the Gemini API and machine learning models—orchestrated through n8n workflows—to boost performance. For me, development is about pushing boundaries and shipping software that actually thinks and scales.
              </p>
            </div>
          </Reveal>
          <div className="flex flex-col">
            {experiences.map((exp, i) => (
              <Reveal key={exp.id} delay={i * 0.06}>
                <div className="grid grid-cols-[80px_1fr] gap-4 py-6 border-b border-paper/10 last:border-0">
                  <div className="font-mono text-sm text-pass">{new Date(exp.startDate).getFullYear()}</div>
                  <div>
                    <div className="font-bold font-display">{exp.role} at {exp.company}</div>
                    <div className="text-sm text-paper/60 mt-1">{exp.tagline || 'Experience details pending.'}</div>
                  </div>
                </div>
              </Reveal>
            ))}
            {education.map((edu, i) => (
              <Reveal key={edu.id} delay={(experiences.length + i) * 0.06}>
                <div className="grid grid-cols-[80px_1fr] gap-4 py-6 border-b border-paper/10 last:border-0">
                  <div className="font-mono text-sm text-paper/50">{edu.endYear}</div>
                  <div>
                    <div className="font-bold font-display">{edu.degree}</div>
                    <div className="text-sm text-paper/60 mt-1">{edu.school}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <Reveal>
        <section className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-24 text-center">
          <ParticleCanvas className="absolute inset-0 -z-10" dotColor="rgba(17,17,17,0.35)" lineColor="22,101,52" />
          <div className="text-pass font-mono text-sm mb-6">~/contact</div>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-ink mb-4">
            Have a project in mind?
          </h2>

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
        </section>
      </Reveal>
    </div>
  );
}