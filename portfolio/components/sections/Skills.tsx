import { skills, achievements } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Trophy } from "lucide-react";

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          index="04"
          eyebrow="Stack"
          title="Tools I reach for."
          description="The languages, frameworks, and infrastructure I've shipped to production — grouped by what they actually do."
        />

        <Stagger
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.04}
        >
          {skills.map((group) => (
            <StaggerItem
              key={group.category}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5 transition-colors duration-300 hover:border-[var(--color-accent)]/20 hover:bg-white/[0.025]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(90,169,255,0.08),transparent_60%)]" />
              </div>

              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-accent-soft)]">
                    {group.category}
                  </h3>
                  <span className="font-mono text-[0.65rem] text-[var(--color-text-dim)]">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <span
                        className="group/chip inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-xs text-[var(--color-text)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40 hover:bg-white/[0.05]"
                        title={item.note ? `${item.name} — ${item.note}` : item.name}
                      >
                        {item.name}
                        {item.note && (
                          <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--color-text-dim)] transition-colors group-hover/chip:text-[var(--color-accent-soft)]">
                            {item.note}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Achievements strip */}
        <Reveal delay={0.1} className="mt-12">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Trophy className="h-3.5 w-3.5 text-[var(--color-accent-soft)]" />
              <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-accent-soft)]">
                Recognition
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {achievements.map((a) => {
                const content = (
                  <div className="group flex flex-col gap-1">
                    <span className="text-sm font-medium text-[var(--color-text)]">
                      {a.label}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-text)]">
                      {a.detail}
                    </span>
                  </div>
                );
                return a.href ? (
                  <a
                    key={a.label}
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 -m-2 transition-colors hover:bg-white/[0.02]"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={a.label} className="p-2 -m-2">
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
