import { experience } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { MapPin } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          index="02"
          eyebrow="Experience"
          title="Where I've shipped."
          description="Production experience across enterprise applications, SaaS platforms, and real-time web solutions."
        />

        <div className="relative">
          {/* Timeline rail */}
          <div className="pointer-events-none absolute left-4 top-2 bottom-2 hidden w-px bg-gradient-to-b from-transparent via-white/10 to-transparent sm:block" />

          <ol className="space-y-10 sm:space-y-14">
            {experience.map((job, i) => (
              <li key={`${job.company}-${i}`} className="relative">
                <Reveal delay={i * 0.08}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-[40px,1fr] sm:gap-6">
                    {/* Marker */}
                    <div className="hidden sm:block">
                      <div className="relative mt-2 flex h-8 w-8 items-center justify-center">
                        <span className="absolute h-3 w-3 rounded-full bg-[var(--color-accent)] shadow-[0_0_18px_rgba(90,169,255,0.7)]" />
                        <span className="absolute h-8 w-8 rounded-full border border-[var(--color-accent)]/25" />
                      </div>
                    </div>

                    {/* Card */}
                    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent)]/20 hover:bg-white/[0.03] sm:p-8">
                      {/* hover sheen */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent" />
                      </div>

                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <div>
                          <h3 className="text-xl font-semibold tracking-tight text-[var(--color-text)] sm:text-[1.4rem]">
                            {job.role}
                          </h3>
                          <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">
                            <span className="text-[var(--color-accent-soft)]">{job.company}</span>
                            <span className="mx-2 text-[var(--color-text-dim)]">·</span>
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </span>
                            <span className="mx-2 text-[var(--color-text-dim)]">·</span>
                            <span>{job.type}</span>
                          </p>
                        </div>
                        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-text-dim)]">
                          {job.period}
                        </span>
                      </div>

                      <ul className="mt-5 space-y-2.5">
                        {job.bullets.map((b, j) => (
                          <li
                            key={j}
                            className="relative pl-5 text-[0.95rem] leading-relaxed text-[var(--color-text-muted)]"
                          >
                            <span className="absolute left-0 top-[0.65em] h-1 w-1 rounded-full bg-[var(--color-accent)]/60" />
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {job.stack.map((s) => (
                          <Badge key={s}>{s}</Badge>
                        ))}
                      </div>
                    </article>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
