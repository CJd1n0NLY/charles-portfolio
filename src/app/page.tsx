import { prisma } from "@/lib/prisma";
import TimelineScroll from "@/components/TimelineScroll";

export const revalidate = 0; 

export default async function HomePage() {
  const intros = await prisma.chapterIntro.findMany();
  const projects = await prisma.project.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { order: "asc" },
  });

  const chapters = ["ACADEMIC", "INTERNSHIP", "CAPSTONE", "PERSONAL"] as const;

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 w-full">
      {/* Hero Section */}
      <section className="mb-32 space-y-6">
        <span className="text-xs uppercase tracking-widest text-accent font-semibold block">Available for Opportunities</span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none max-w-3xl">
          Building high-performance digital architecture.
        </h1>
        <p className="text-muted text-lg md:text-xl max-w-2xl font-normal leading-relaxed">
          I design elegant full-stack solutions and optimize complex system models, transforming raw conceptual ideas into reliable, production-grade logic.
        </p>
      </section>

      {/* Narrative Continuous Timeline Container */}
      <TimelineScroll chapters={chapters} intros={intros} projects={projects} />
    </div>
  );
}