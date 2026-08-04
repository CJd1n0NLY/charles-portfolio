import Link from 'next/link';
import Image from 'next/image';
import Badge from './Badge';

type ProjectCardProps = {
  title: string;
  description: string;
  badgeStatus: 'SHIPPED' | 'IN_PROGRESS' | 'ARCHIVED' | string;
  badgeLabel?: string;
  tags: string[];
  visualLabel: string;
  heroImageUrl?: string | null;
  href: string;
};

export default function ProjectCard({
  title,
  description,
  badgeStatus,
  badgeLabel,
  tags,
  visualLabel,
  heroImageUrl,
  href,
}: ProjectCardProps) {
  return (
    <Link 
      href={href}
      className="flex flex-col md:flex-row border border-line rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 bg-card group"
    >
      {/* Visual Pane (Left) */}
      <div className="bg-ink flex-shrink-0 md:w-1/3 p-4 flex flex-col items-center justify-center relative min-h-[160px] overflow-hidden">
        <div className="absolute top-4 left-4 flex gap-1.5 z-10">
          <div className="w-2.5 h-2.5 rounded-full bg-ink-soft/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-ink-soft/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-ink-soft/40" />
        </div>

        {heroImageUrl ? (
          <>
            <Image
              src={heroImageUrl}
              alt={`${title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
            />
            {/* Keep the browser-chrome label readable over a real screenshot */}
            <span className="absolute bottom-3 left-4 font-mono text-xs text-paper/80 bg-ink/70 px-2 py-1 rounded backdrop-blur-sm">
              {visualLabel}
            </span>
          </>
        ) : (
          <span className="font-mono text-xs text-paper/60 group-hover:text-paper/90 transition-colors">
            {visualLabel}
          </span>
        )}
      </div>

      {/* Content Pane (Right) */}
      <div className="p-6 flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-lg font-bold text-ink font-display">{title}</h3>
          <Badge status={badgeStatus} label={badgeLabel} />
        </div>
        <p className="mt-2 text-sm text-ink-soft max-w-2xl">{description}</p>
        
        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs font-mono text-ink-soft/80">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}