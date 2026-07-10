"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";

type Project = {
  id: string;
  slug: string;
  chapter: string;
  title: string;
  tagline: string;
};

type ChapterIntro = {
  chapter: string;
  heading: string;
  narrative: string;
};

export default function TimelineScroll({
  chapters,
  intros,
  projects,
}: {
  chapters: readonly string[];
  intros: ChapterIntro[];
  projects: Project[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Observes the scroll position relative to the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <div ref={containerRef} className="relative border-l border-surface pl-8 md:pl-12 space-y-32">
      {/* Animated Thread */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[1px] bg-accent origin-top -ml-[1px] z-10"
        style={{ scaleY: shouldReduceMotion ? 1 : scrollYProgress }} 
      />

      {chapters.map((chapKey) => {
        const intro = intros.find((i) => i.chapter === chapKey);
        const chapProjects = projects.filter((p) => p.chapter === chapKey);

        return (
          <motion.div
            key={chapKey}
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" }}
            className="relative group"
          >
            {/* Timeline Bullet Indicator - Lights up when in center view */}
            <motion.div 
              className="absolute -left-[37px] md:-left-[53px] top-1.5 w-3 h-3 rounded-full bg-canvas border border-muted z-20"
              whileInView={{ borderColor: "var(--color-accent)", backgroundColor: "var(--color-accent)" }}
              viewport={{ once: false, margin: "-50% 0px -50% 0px" }}
              transition={{ duration: 0.3 }}
            />
            
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-wider text-muted/60 uppercase block">
                {chapKey} CHAPTER
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-primary">
                {intro?.heading || chapKey}
              </h2>
              <p className="text-muted max-w-xl text-base leading-relaxed">
                {intro?.narrative || "Chapter context details to be updated."}
              </p>

              {/* Chapter Project Showcase Grid */}
              <div className="grid gap-4 pt-4 mt-2">
                {chapProjects.length === 0 ? (
                  <p className="text-xs font-mono text-muted/40 italic">
                    No published items in this chapter yet.
                  </p>
                ) : (
                  chapProjects.map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <Link
                        href={`/work/${project.slug}`}
                        className="block p-6 rounded-lg bg-surface/40 border border-surface/80 hover:border-accent/40 transition-all duration-300 hover:translate-x-1"
                      >
                        <h3 className="text-xl font-bold tracking-tight text-primary group-hover:text-accent mb-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted line-clamp-2">
                          {project.tagline}
                        </p>
                      </Link>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}