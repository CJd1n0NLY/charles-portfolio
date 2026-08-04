import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const experience = await prisma.workExperience.findUnique({ where: { slug } });

  if (!experience) notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-24">
      <header className="mb-12">
        <h1 className="text-4xl font-display font-bold text-ink mb-2">{experience.role}</h1>
        <p className="text-xl text-ink-soft mb-6">{experience.company}</p>

        <div className="font-mono text-sm text-ink-soft px-3 py-1.5 bg-line/30 rounded-md inline-block">
          {new Date(experience.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })} —
          {experience.endDate ? new Date(experience.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : ' Present'}
        </div>
      </header>

      <div className="bg-card border border-line rounded-xl p-8 md:p-12">
        <div className="flex flex-col gap-12">
           {experience.context && (
            <Reveal>
              <section>
                <h3 className="text-xl font-display font-bold text-ink mb-4 flex items-center gap-2">
                  <span className="w-4 h-px bg-line inline-block" />
                  Context
                </h3>
                <p className="text-ink-soft leading-relaxed whitespace-pre-wrap">
                  {experience.context}
                </p>
              </section>
            </Reveal>
          )}

          {experience.roleProgression && (
            <Reveal>
              <section>
                <h3 className="text-xl font-display font-bold text-ink mb-4 flex items-center gap-2">
                  <span className="w-4 h-px bg-line inline-block" />
                  Role & Progression
                </h3>
                <p className="text-ink-soft leading-relaxed whitespace-pre-wrap">
                  {experience.roleProgression}
                </p>
              </section>
            </Reveal>
          )}

          {experience.outcome && (
            <Reveal>
              <section>
                <h3 className="text-xl font-display font-bold text-ink mb-4 flex items-center gap-2">
                  <span className="w-4 h-px bg-line inline-block" />
                  Outcome
                </h3>
                <p className="text-ink-soft leading-relaxed whitespace-pre-wrap">
                  {experience.outcome}
                </p>
              </section>
            </Reveal>
          )}

          {!experience.context && !experience.roleProgression && !experience.outcome && (
            <p className="text-ink-soft font-mono text-sm text-center py-8">
              $ details pending
            </p>
          )}
        </div>
      </div>
    </article>
  );
}