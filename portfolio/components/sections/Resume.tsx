import { profile } from "@/data/content";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Download, FileText, ArrowUpRight } from "lucide-react";

export function Resume() {
  return (
    <section id="resume" className="relative scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.025] to-white/[0.005] p-7 sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(90,169,255,0.18),transparent_60%)] blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <FileText className="h-5 w-5 text-[var(--color-accent-soft)]" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-text)] sm:text-3xl">
                    Want the full résumé?
                  </h2>
                  <p className="mt-1.5 text-sm text-[var(--color-text-muted)] sm:text-base">
                    A one-page snapshot of experience, projects, and stack.
                    <span className="ml-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-text-dim)]">
                      Updated {profile.resumeUpdated}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <ButtonLink
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                >
                  Download PDF
                  <Download className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  size="md"
                >
                  View
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
