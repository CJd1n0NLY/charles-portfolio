import { prisma } from "@/lib/prisma";
import Link from "next/link";
import BootSequence from "../components/BootSequence"; 
import Navbar from "@/components/Navbar";

export default async function HomePage() {
  // Parallel real-time data fetching
  const [
    allProjects,
    intros,
    internships, // Removed take: 1 so it can list multiple roles in the suite
    education,
    settings
  ] = await Promise.all([
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.chapterIntro.findMany(),
    prisma.workExperience.findMany({ orderBy: { startDate: "desc" } }),
    prisma.education.findMany({ orderBy: { endYear: "desc" }, take: 1 }),
    prisma.siteSettings.findUnique({ where: { id: "global" } })
  ]);

  const publishedProjects = allProjects.filter(p => p.status === "PUBLISHED");
  const academicCount = allProjects.filter(p => p.chapter === "ACADEMIC").length;
  const personalShippedCount = allProjects.filter(p => p.chapter === "PERSONAL" && p.buildStatus === "SHIPPED").length;
  
  // Keep the boot sequence targeting the most recent internship
  const latestInternship = internships[0];
  const internString = latestInternship 
    ? `${latestInternship.company}, ${latestInternship.startDate.toISOString().split('T')[0]} - ${latestInternship.endDate ? latestInternship.endDate.toISOString().split('T')[0] : 'Present'}`
    : "No internships logged.";

  const chapters = [
    { key: "ACADEMIC", path: "~/career/academic/" },
    { key: "INTERNSHIP", path: "~/career/internship/" },
    { key: "CAPSTONE", path: "~/career/capstone/" },
    { key: "PERSONAL", path: "~/career/personal/" },
  ];

  return (
    <main className="max-w-5xl mx-auto px-6 py-20 space-y-24">
      <Navbar />
      {/* Boot Sequence & Hero */}
      <section className="space-y-12 border-b border-line pb-20">
        <div className="bg-ink text-[#A8A79E] font-mono text-sm p-6 rounded-sm shadow-inner overflow-hidden relative">
          <div className="flex gap-2 mb-4">
             <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
             <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
             <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <BootSequence 
            academicCount={academicCount} 
            internString={internString} 
            personalShippedCount={personalShippedCount} 
          />
        </div>

        <div className="flex flex-col md:flex-row items-start gap-12 pt-8">
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl md:text-6xl font-display font-semibold tracking-tight text-ink">
              Building high-performance digital architecture.
            </h1>
            <p className="text-lg text-ink-soft leading-relaxed max-w-2xl font-body">
              I design elegant full-stack solutions and optimize complex system models, transforming raw conceptual ideas into reliable, production-grade logic.
            </p>
            
            {/* Stat Bar */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 border-t border-line mt-8">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-ink-soft mb-1 uppercase tracking-wider">Total Builds</span>
                <span className="font-display text-2xl font-semibold">{publishedProjects.length}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-ink-soft mb-1 uppercase tracking-wider">Career Suites</span>
                <span className="font-display text-2xl font-semibold">{chapters.length}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-ink-soft mb-1 uppercase tracking-wider">Internships</span>
                <span className="font-display text-2xl font-semibold">{internships.length}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-ink-soft mb-1 uppercase tracking-wider">Graduation</span>
                <span className="font-display text-2xl font-semibold">{education[0]?.endYear || "----"}</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/4 aspect-square bg-card border border-line flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 shrink-0">
            {settings?.heroPortraitUrl ? (
              <img src={settings.heroPortraitUrl} alt="Charles" className="w-full h-full object-cover" />
            ) : (
              <div className="w-[80%] h-[80%] border border-dashed border-line flex items-center justify-center">
                <span className="font-mono text-ink-soft text-[10px] tracking-widest uppercase">Null_Ref</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Test Suites (Chapters) */}
      <div className="space-y-24">
        {chapters.map(({ key, path }) => {
          const suiteProjects = publishedProjects.filter((p) => p.chapter === key);
          const draftProjects = allProjects.filter((p) => p.chapter === key && p.status === "DRAFT");
          const intro = intros.find((i) => i.chapter === key);
          
          return (
            <section key={key} className="space-y-6">
              <header className="space-y-2">
                <h2 className="font-mono text-sm font-medium text-ribbon">{path}</h2>
                <p className="text-ink-soft font-body text-sm max-w-2xl">{intro?.narrative}</p>
              </header>

              <div className="flex flex-col border-t border-line">
                {/* INTERCEPT THE INTERNSHIP KEY */}
                {key === "INTERNSHIP" ? (
                  internships.length === 0 ? (
                    <div className="py-6 font-mono text-sm text-ink-soft/60">
                      <div>// no internships logged in this suite</div>
                    </div>
                  ) : (
                    internships.map((exp) => (
                      <Link href={`/experience/${exp.slug}`} key={exp.id} className="group block border-b border-line">
                        <article className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-4 group-hover:-translate-y-0.5 group-hover:border-ribbon transition-transform cursor-pointer">
                          <div className="space-y-1">
                            <h3 className="font-display text-xl font-medium text-ink group-hover:text-ribbon transition-colors">
                              {exp.role} <span className="text-ink-soft">@ {exp.company}</span>
                            </h3>
                            <p className="font-body text-sm text-ink-soft">{exp.tagline}</p>
                          </div>
                          
                          <div className="shrink-0">
                            <span className="px-2.5 py-1 text-[10px] font-mono font-medium tracking-wide uppercase bg-card border border-line text-ink-soft rounded-sm">
                              {new Date(exp.startDate).getFullYear()}
                            </span>
                          </div>
                        </article>
                      </Link>
                    ))
                  )
                ) : (
                  /* STANDARD PROJECT RENDERING */
                  suiteProjects.length === 0 ? (
                    <div className="py-6 font-mono text-sm text-ink-soft/60">
                      {draftProjects.length > 0 
                        ? draftProjects.map(d => <div key={d.id}>// build pending: {d.title}</div>)
                        : <div>// no builds logged in this suite</div>
                      }
                    </div>
                  ) : (
                    suiteProjects.map((project) => (
                      <Link href={`/work/${project.slug}`} key={project.id} className="group block border-b border-line">
                        <article className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-4 group-hover:-translate-y-0.5 group-hover:border-ribbon transition-transform cursor-pointer">
                          <div className="space-y-1">
                            <h3 className="font-display text-xl font-medium text-ink group-hover:text-ribbon transition-colors">
                              {project.title}
                            </h3>
                            <p className="font-body text-sm text-ink-soft">{project.tagline}</p>
                          </div>
                          
                          <div className="shrink-0">
                            {project.buildStatus === "SHIPPED" && (
                              <span className="px-2.5 py-1 text-[10px] font-mono font-medium tracking-wide uppercase bg-[var(--color-pass-bg)] text-[var(--color-pass)] rounded-sm">Shipped</span>
                            )}
                            {project.buildStatus === "IN_PROGRESS" && (
                              <span className="px-2.5 py-1 text-[10px] font-mono font-medium tracking-wide uppercase bg-[var(--color-pending-bg)] text-[var(--color-pending)] rounded-sm">In Progress</span>
                            )}
                            {project.buildStatus === "ARCHIVED" && (
                              <span className="px-2.5 py-1 text-[10px] font-mono font-medium tracking-wide uppercase bg-card border border-line text-ink-soft rounded-sm">Archived</span>
                            )}
                          </div>
                        </article>
                      </Link>
                    ))
                  )
                )}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}