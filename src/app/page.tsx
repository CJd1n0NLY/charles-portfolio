import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HomePage() {
  const intros = await prisma.chapterIntro.findMany();
  const projects = await prisma.project.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { order: "asc" },
  });

  const chapters = ["ACADEMIC", "INTERNSHIP", "CAPSTONE", "PERSONAL"];

  return (
    <main className="max-w-6xl mx-auto px-6 py-32 space-y-40">
      {/* Redesigned Hero with Portrait Space */}
      <section className="flex flex-col md:flex-row items-start gap-12 border-b border-surface pb-20">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-7xl font-display leading-tight">
            Building high-performance digital architecture.
          </h1>
          <p className="text-xl text-muted leading-relaxed max-w-2xl">
            I design elegant full-stack solutions and optimize complex system models, transforming raw conceptual ideas into reliable, production-grade logic.
          </p>
        </div>
        {/* Space for future SiteSettings.heroPortraitUrl injection */}
        <div className="w-full md:w-1/3 aspect-[3/4] bg-surface/30 border border-surface rounded-sm flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
           <span className="font-mono text-muted text-xs tracking-widest">[ PORTRAIT PENDING ]</span>
        </div>
      </section>

      {/* The Asymmetric Logbook Layout (Replaces Dotted Line) */}
      <div className="space-y-32">
        {chapters.map((chapKey, index) => {
          const chapProjects = projects.filter((p) => p.chapter === chapKey);
          const intro = intros.find((i) => i.chapter === chapKey);
          
          return (
            <section key={chapKey} className="flex flex-col md:flex-row gap-8 items-start relative">
              {/* Sticky Marginalia Sidebar */}
              <div className="md:w-1/4 md:sticky md:top-24 pt-2 shrink-0">
                <span className="font-mono text-accent text-xs tracking-widest block mb-4">
                  {String(index + 1).padStart(3, '0')} // INDEX
                </span>
                <h2 className="font-display text-3xl text-primary">{chapKey}</h2>
                <p className="text-muted text-sm mt-3 leading-relaxed pr-4">{intro?.narrative}</p>
              </div>

              {/* Offset Content Column */}
              <div className="md:w-3/4 space-y-8 md:border-l border-surface pt-6 md:pt-0 md:pl-12 w-full">
                {chapProjects.length === 0 ? (
                  <div className="font-mono text-sm text-muted/40 italic p-6 border border-dashed border-surface/50">
                    [ Log entry pending. ]
                  </div>
                ) : (
                  chapProjects.map((project) => (
                    <Link href={`/work/${project.slug}`} key={project.id} className="block group">
                      <article className="p-8 border border-surface bg-canvas hover:bg-surface/20 transition-colors cursor-pointer rounded-sm">
                        <h3 className="font-display text-2xl text-primary group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted mt-2 leading-relaxed">{project.tagline}</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                           {project.techStack?.split(',').slice(0,3).map(tech => (
                              <span key={tech} className="font-mono text-[10px] uppercase text-muted bg-surface/50 px-2 py-1">{tech.trim()}</span>
                           ))}
                        </div>
                      </article>
                    </Link>
                  ))
                )}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}