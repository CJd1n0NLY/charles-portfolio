"use client";

import { useFormStatus } from "react-dom";

export default function ToggleStatusButton({ status }: { status: string }) {
  const { pending } = useFormStatus();
  const isPublished = status === "PUBLISHED";

  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-3 py-1.5 text-[10px] font-mono font-semibold tracking-wide uppercase rounded-sm transition-colors cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed ${
        isPublished
          ? "bg-[var(--color-pass-bg)] text-[var(--color-pass)] border border-[var(--color-pass-bg)] hover:bg-[var(--color-pass)] hover:text-white"
          : "bg-paper text-ink-soft border border-line hover:text-ink hover:border-ink-soft"
      }`}
    >
      {pending && (
        <span className="w-2.5 h-2.5 border-2 border-current/40 border-t-current rounded-full animate-spin" />
      )}
      {pending ? "UPDATING..." : `VISIBILITY: ${status}`}
    </button>
  );
}