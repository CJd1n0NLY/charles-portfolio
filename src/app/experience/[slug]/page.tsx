import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  const job = await prisma.workExperience.findUnique({
    where: { slug },
  });

  if (!job) {
    return { title: "Experience Not Found" };
  }

  return {
    title: `${job.role} at ${job.company} | Charles's Portfolio`,
    description: job.tagline,
    openGraph: {
      title: `${job.role} at ${job.company}`,
      description: job.tagline || undefined,
      type: "article",
    },
  };
}

// In Next.js 15+, params in Server Components are Promises that must be awaited
export default async function ExperienceShowroom({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Fetch the work experience and its related contributions
  const job = await prisma.workExperience.findUnique({
    where: { slug },
    include: {
      contributions: {
        orderBy: { order: "asc" },
      },
    },
  });

  // 404 if the experience doesn't exist
  if (!job) {
    notFound();
  }

  // Format dates for display
  const formattedStartDate = new Date(job.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const formattedEndDate = job.endDate ? new Date(job.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present';

  return (
    <article className="max-w-3xl mx-auto px-6 py-20 w-full space-y-24">
      {/* Navigation */}
      <nav>
        <Link
          href="/"
          className="inline-flex items-center text-sm font-mono tracking-wider text-muted hover:text-accent transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          RETURN TO TIMELINE
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="space-y-8">
        <div className="space-y-4">
          <span className="text-xs font-mono tracking-widest text-accent uppercase block">
            EXPERIENCE REPORT
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-primary leading-tight">
            {job.role}
          </h1>
          <p className="text-xl text-muted leading-relaxed max-w-2xl">
            {job.company} {job.location && `— ${job.location}`}
          </p>
        </div>

        {/* Meta Data Chips */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-surface/50">
           <span className="px-3 py-1 text-xs font-mono text-muted bg-surface/50 border border-surface rounded-full">
              {formattedStartDate} - {formattedEndDate}
           </span>
           {job.supervisorName && (
             <span className="px-3 py-1 text-xs font-mono text-muted bg-surface/50 border border-surface rounded-full">
                Supervisor: {job.supervisorName}
             </span>
           )}
           {job.evaluationScore && (
             <span className="px-3 py-1 text-xs font-mono text-accent bg-surface/50 border border-surface rounded-full font-bold">
                Score: {job.evaluationScore}/100
             </span>
           )}
        </div>
      </header>

      {/* Main Content Body */}
      <div className="space-y-20 border-t border-surface pt-16">
        {job.context && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-primary">Organizational Context</h2>
            <div className="prose prose-invert prose-slate max-w-none text-muted leading-relaxed">
              {job.context}
            </div>
          </section>
        )}

        {job.roleProgression && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-primary">Role Progression</h2>
            <div className="prose prose-invert prose-slate max-w-none text-muted leading-relaxed whitespace-pre-wrap">
              {job.roleProgression}
            </div>
          </section>
        )}

        {/* Contributions Array */}
        {job.contributions.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-2xl font-bold tracking-tight text-primary">Key Contributions</h2>
            <div className="grid gap-6">
              {job.contributions.map((contrib, i) => (
                <div key={contrib.id} className="p-6 rounded-lg bg-surface/30 border border-surface/60">
                  <h3 className="text-lg font-bold text-primary mb-2">
                    <span className="text-accent mr-2 font-mono text-sm">{String(i + 1).padStart(2, '0')}.</span>
                    {contrib.title}
                  </h3>
                  <p className="text-muted leading-relaxed text-sm whitespace-pre-wrap">{contrib.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {job.outcome && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-primary">Outcome</h2>
            <div className="prose prose-invert prose-slate max-w-none text-muted leading-relaxed">
              {job.outcome}
            </div>
            
            {/* Direct Quote styling */}
            {job.evaluationQuote && (
              <blockquote className="mt-6 border-l-2 border-accent pl-6 italic text-muted py-2">
                {job.evaluationQuote}
              </blockquote>
            )}
          </section>
        )}
      </div>
    </article>
  );
}