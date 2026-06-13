import { profile } from "@/data/content";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
            {profile.location}
          </span>
          <span className="text-sm text-[var(--color-text-muted)]">
            © {year} {profile.name}. Built with Next.js, Tailwind, Framer Motion & Three.js.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-[var(--color-text-muted)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40 hover:text-[var(--color-text)]"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-[var(--color-text-muted)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40 hover:text-[var(--color-text)]"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-[var(--color-text-muted)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40 hover:text-[var(--color-text)]"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
