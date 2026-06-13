import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "accent" | "success";
};

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  const tones: Record<string, string> = {
    default:
      "border-white/10 bg-white/[0.03] text-[var(--color-text-muted)]",
    accent:
      "border-[var(--color-accent)]/30 bg-[var(--color-accent)]/[0.08] text-[var(--color-accent-soft)]",
    success:
      "border-emerald-400/30 bg-emerald-400/[0.07] text-emerald-300",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.72rem] font-medium tracking-tight transition-colors",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
