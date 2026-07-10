import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project || project.status !== "PUBLISHED") {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Charles's Portfolio`,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      type: "article",
      /* We will use a fallback image if the project doesn't have a hero image yet */
      images: project.heroImageUrl ? [project.heroImageUrl] : [],
    },
  };
}

// In Next.js 15+, params in Server Components are Promises that must be awaited
export default async function ProjectShowroom({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Fetch the project and its related data
  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      challenges: {
        orderBy: { order: "asc" },
      },
      gallery: {
        orderBy: { order: "asc" },
      },
    },
  });

  // 404 if the project doesn't exist or isn't published
  if (!project || project.status !== "PUBLISHED") {
    notFound();
  }

  // Parse the comma-separated tech stack string back into an array
  const stack = project.techStack
    ? project.techStack.split(",").map((s) => s.trim())
    : [];

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
            {project.chapter} CHAPTER
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-primary leading-tight">
            {project.title}
          </h1>
          <p className="text-xl text-muted leading-relaxed max-w-2xl">
            {project.tagline}
          </p>
        </div>

        {/* Action Links */}
        {(project.liveUrl || project.repoUrl) && (
          <div className="flex flex-wrap gap-4 pt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 bg-primary text-canvas text-sm font-semibold rounded hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Live System
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 bg-surface border border-surface hover:border-muted text-primary text-sm font-semibold rounded transition-colors"
              >
                <FaGithub className="w-4 h-4 mr-2" />
                Source Code
              </a>
            )}
          </div>
        )}

        {/* Tech Stack Chips */}
        {stack.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-6">
            {stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono text-muted bg-surface/50 border border-surface rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Main Content Body */}
      <div className="space-y-20 border-t border-surface pt-16">
        {project.problem && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-primary">The Problem Space</h2>
            <div className="prose prose-invert prose-slate max-w-none text-muted leading-relaxed">
              {project.problem}
            </div>
          </section>
        )}

        {project.approach && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-primary">Engineering Approach</h2>
            <div className="prose prose-invert prose-slate max-w-none text-muted leading-relaxed">
              {project.approach}
            </div>
          </section>
        )}

        {/* Challenges Array */}
        {project.challenges.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-2xl font-bold tracking-tight text-primary">Critical Challenges Resolved</h2>
            <div className="grid gap-6">
              {project.challenges.map((challenge) => (
                <div key={challenge.id} className="p-6 rounded-lg bg-surface/30 border border-surface/60">
                  <h3 className="text-lg font-bold text-primary mb-2">{challenge.title}</h3>
                  <p className="text-muted leading-relaxed text-sm">{challenge.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {project.outcome && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-primary">Outcome & Next Steps</h2>
            <div className="prose prose-invert prose-slate max-w-none text-muted leading-relaxed">
              {project.outcome}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}