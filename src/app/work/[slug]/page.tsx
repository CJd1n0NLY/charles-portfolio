import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Badge from '@/components/Badge';
import ProjectGallery from '@/components/ProjectGallery';
import Reveal from '@/components/Reveal';
import ExpandableText from '@/components/ExpandableText';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      gallery: { orderBy: { order: 'asc' } },
      challenges: { orderBy: { order: 'asc' } },
    },
  });

  if (!project) notFound();

  const tags = project.techStack ? project.techStack.split(',') : [];

  return (
    <article className="max-w-3xl mx-auto px-6 py-24">
      {/* Header renders immediately — it's the first thing on the page, no need to gate it behind scroll */}
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
            <Reveal>
              <section>
                <h3 className="text-xl font-display font-bold text-ink mb-4 flex items-center gap-2">
                  <span className="w-4 h-px bg-line inline-block" />
                  The Problem
                </h3>
                <ExpandableText text={project.problem} lines={6} />
              </section>
            </Reveal>
          )}

          {project.approach && (
            <Reveal>
              <section>
                <h3 className="text-xl font-display font-bold text-ink mb-4 flex items-center gap-2">
                  <span className="w-4 h-px bg-line inline-block" />
                  The Approach
                </h3>
                <ExpandableText text={project.approach} lines={6} />
              </section>
            </Reveal>
          )}

          {project.outcome && (
            <Reveal>
              <section>
                <h3 className="text-xl font-display font-bold text-ink mb-4 flex items-center gap-2">
                  <span className="w-4 h-px bg-line inline-block" />
                  The Outcome
                </h3>
                <ExpandableText text={project.outcome} lines={6} />
              </section>
            </Reveal>
          )}

          {project.challenges.length > 0 && (
            <Reveal>
              <section>
                <h3 className="text-xl font-display font-bold text-ink mb-4 flex items-center gap-2">
                  <span className="w-4 h-px bg-line inline-block" />
                  Critical Challenges
                </h3>
                <div className="flex flex-col gap-6">
                  {project.challenges.map((challenge, i) => (
                    <Reveal key={challenge.id} delay={i * 0.08} y={12}>
                      <div className="border-l-2 border-line pl-5">
                        <h4 className="font-mono text-sm font-semibold text-ink mb-1.5">
                          {challenge.title}
                        </h4>
                        <ExpandableText text={challenge.description} lines={4} className="text-sm" />
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>
            </Reveal>
          )}

          <Reveal>
            <ProjectGallery images={project.gallery} />
          </Reveal>

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