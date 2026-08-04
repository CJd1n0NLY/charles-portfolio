'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

type GalleryImage = {
  id: string;
  url: string;
  altText: string;
  caption: string | null;
};

export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIndex, close, prev, next]);

  if (images.length === 0) return null;

  return (
    <section>
      <h3 className="text-xl font-display font-bold text-ink mb-4 flex items-center gap-2">
        <span className="w-4 h-px bg-line inline-block" />
        Screenshots
      </h3>

      {/* Filmstrip */}
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory -mx-2 px-2">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setOpenIndex(i)}
            className="shrink-0 w-64 snap-start group text-left"
            aria-label={`Open screenshot: ${img.altText}`}
          >
            {/* Browser-chrome frame, echoing the ProjectCard placeholder */}
            <div className="rounded-lg border border-line overflow-hidden bg-ink transition-transform group-hover:-translate-y-0.5">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-ink/90">
                <span className="w-2 h-2 rounded-full bg-paper/20" />
                <span className="w-2 h-2 rounded-full bg-paper/20" />
                <span className="w-2 h-2 rounded-full bg-paper/20" />
              </div>
              <div className="relative aspect-video bg-line/10">
                <Image
                  src={img.url}
                  alt={img.altText}
                  fill
                  sizes="(max-width: 640px) 80vw, 256px"
                  className="object-cover"
                />
              </div>
            </div>
            {img.caption && (
              <p className="mt-2 text-xs font-mono text-ink-soft line-clamp-2">
                {img.caption}
              </p>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[70] bg-ink/90 flex items-center justify-center px-4 py-12"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-6 right-6 text-paper/70 hover:text-paper font-mono text-sm"
          >
            [ esc ]
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
            className="absolute left-4 md:left-8 text-paper/60 hover:text-paper text-3xl font-mono px-2"
          >
            ‹
          </button>

          <div
            className="max-w-4xl w-full flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-paper/10">
              <Image
                src={images[openIndex].url}
                alt={images[openIndex].altText}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-contain bg-ink"
                priority
              />
            </div>
            <div className="flex items-center justify-between w-full font-mono text-xs text-paper/50">
              <span>{images[openIndex].caption || images[openIndex].altText}</span>
              <span>{openIndex + 1} / {images.length}</span>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
            className="absolute right-4 md:right-8 text-paper/60 hover:text-paper text-3xl font-mono px-2"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}