import { about } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Counter } from "@/components/motion/Counter";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          index="01"
          eyebrow="About"
          title="Engineer first. Frontend by craft."
          description="A glimpse of how I think, what I build, and the kind of problems I enjoy solving."
        />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr,1fr] md:gap-16">
          <div className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-pretty text-base leading-relaxed text-[var(--color-text-muted)] sm:text-[1.05rem] sm:leading-[1.75]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Stagger className="grid grid-cols-2 gap-3">
            {about.highlights.map((h) => (
              <StaggerItem
                key={h.label}
                className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent)]/25 hover:bg-white/[0.035]"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(90,169,255,0.12),transparent_60%)]" />
                </div>
                <div className="relative">
                  <Counter
                    value={h.value}
                    className="font-mono text-2xl font-semibold tracking-tight text-[var(--color-text)] sm:text-3xl"
                  />
                  <div className="mt-1 text-xs leading-snug text-[var(--color-text-muted)]">
                    {h.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
