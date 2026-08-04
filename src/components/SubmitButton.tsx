"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  label?: string;
  pendingLabel?: string;
  variant?: "primary" | "ghost";
  className?: string;
};

export default function SubmitButton({
  label = "Commit Build",
  pendingLabel = "Committing...",
  variant = "primary",
  className = "",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  if (variant === "ghost") {
    return (
      <button
        type="submit"
        disabled={pending}
        className={`text-ink-soft hover:text-ribbon font-mono text-xs cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1.5 ${className}`}
      >
        {pending && (
          <span className="w-2.5 h-2.5 border-2 border-ink-soft/40 border-t-ink-soft rounded-full animate-spin" />
        )}
        {pending ? pendingLabel : label}
      </button>
    );
  }

  return (
    <button
      type="submit"
      disabled={pending}
      className={`bg-ribbon hover:bg-ribbon-ink text-card px-8 py-3 font-medium transition-colors cursor-pointer rounded-sm disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 ${className}`}
    >
      {pending && (
        <span className="w-3.5 h-3.5 border-2 border-card/40 border-t-card rounded-full animate-spin" />
      )}
      {pending ? pendingLabel : label}
    </button>
  );
}