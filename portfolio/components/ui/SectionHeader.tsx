import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  index?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = "left",
  index,
}: Props) {
  return (
    <div
      className={cn(
        "mb-10 sm:mb-14",
        align === "center" && "text-center",
        className,
      )}
    >
      <Reveal>
        <div
          className={cn(
            "mb-4 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent-soft)]",
            align === "center" && "justify-center",
          )}
        >
          {index ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/[0.06] px-2 py-0.5 text-[0.65rem] text-[var(--color-accent-soft)]">
              <span className="text-[var(--color-text-dim)]">/</span>
              {index}
            </span>
          ) : (
            <span className="h-px w-6 bg-[var(--color-accent)]/60" />
          )}
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-[var(--color-text)] sm:text-4xl md:text-[2.75rem] md:leading-[1.05]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
