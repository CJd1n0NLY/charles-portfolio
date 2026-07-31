import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Badge from '@/components/Badge';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });

  if (!project) notFound();

  const tags = project.techStack ? project.techStack.split(',') : [];

  return (
    <article className="max-w-3xl mx-auto px-6 py-24">
      <header className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <h1 className="text-4xl font-display font-bold text-ink">{project.title}</h1>
          <div className="self-start sm:self-auto">
            <Badge status={project.buildStatus} />
          </div>
        </div>
        <p className="text-lg text-ink-soft mb-8 leading-relaxed max-w-2xl">
          {project.tagline}
        </p>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs font-mono text-ink-soft">
            {tags.map(tag => (
              <span key={tag} className="px-2.5 py-1.5 bg-line/30 rounded-md">
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="bg-card border border-line rounded-xl p-8 md:p-12">
        <div className="flex flex-col gap-12">
          {project.problem && (
            <section>
              <h3 className="text-xl font-display font-bold text-ink mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-line inline-block" />
                The Problem
              </h3>
              {/* whitespace-pre-wrap ensures database line breaks render as real paragraphs */}
              <p className="text-ink-soft leading-relaxed whitespace-pre-wrap">
                {project.problem}
              </p>
            </section>
          )}
          
          {project.approach && (
            <section>
              <h3 className="text-xl font-display font-bold text-ink mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-line inline-block" />
                The Approach
              </h3>
              <p className="text-ink-soft leading-relaxed whitespace-pre-wrap">
                {project.approach}
              </p>
            </section>
          )}
          
          {project.outcome && (
            <section>
              <h3 className="text-xl font-display font-bold text-ink mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-line inline-block" />
                The Outcome
              </h3>
              <p className="text-ink-soft leading-relaxed whitespace-pre-wrap">
                {project.outcome}
              </p>
            </section>
          )}

          {!project.problem && !project.approach && !project.outcome && (
            <p className="text-ink-soft font-mono text-sm text-center py-8">
              $ documentation pending
            </p>
          )}
        </div>
      </div>
    </article>
  );
}