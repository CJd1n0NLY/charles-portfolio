"use client";

import { useState } from "react";

// Tailwind needs the full class name present in source to generate it —
// dynamic strings like `line-clamp-${lines}` get purged, so map to static ones.
const CLAMP_CLASSES: Record<number, string> = {
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
  8: "line-clamp-8",
};

export default function ExpandableText({
  text,
  lines = 6,
  className = "",
}: {
  text: string;
  /** How many lines to show on mobile before truncating. Desktop is always unclamped. */
  lines?: number;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const clampClass = CLAMP_CLASSES[lines] ?? "line-clamp-6";

  return (
    <div>
      <p
        className={`text-ink-soft leading-relaxed whitespace-pre-wrap ${className} ${
          expanded ? "" : `${clampClass} md:line-clamp-none`
        }`}
      >
        {text}
      </p>
      {/* md:hidden — desktop has enough room that this never needs to trigger */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="md:hidden mt-2 text-xs font-mono font-semibold text-pass hover:underline"
      >
        {expanded ? "Show less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}