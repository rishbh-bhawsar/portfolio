"use client";

import { profile } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Mail, MapPin, Copy, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { toast } from "sonner";

type Channel = {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  copyable?: boolean;
};

export function Contact() {
  const channels: Channel[] = [
    {
      id: "email",
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: Mail,
      copyable: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "/in/rishbh-bhawsar",
      href: profile.linkedin,
      icon: LinkedinIcon,
    },
    {
      id: "github",
      label: "GitHub",
      value: "@RishbhBhawsar",
      href: profile.github,
      icon: GithubIcon,
    },
  ];

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Couldn't copy — please copy manually");
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          index="05"
          eyebrow="Contact"
          title="Let's build something."
          description="Open to Angular, Frontend, and Full Stack roles, contract opportunities, and innovative product development. The fastest way to reach me is email."
        />

        <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {channels.map((c) => {
            const Icon = c.icon;
            return (
              <StaggerItem key={c.id}>
                <a
                  href={c.href}
                  target={c.id === "email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent)]/25 hover:bg-white/[0.03] sm:p-6"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(90,169,255,0.1),transparent_60%)]" />
                  </div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                      <Icon className="h-4 w-4 text-[var(--color-accent-soft)]" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[var(--color-text-dim)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-text)]" />
                  </div>
                  <div className="relative">
                    <div className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
                      {c.label}
                    </div>
                    <div className="mt-1 break-all text-sm font-medium text-[var(--color-text)] sm:text-[0.95rem]">
                      {c.value}
                    </div>
                  </div>
                  {c.copyable && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        copy(c.value);
                      }}
                      className="relative mt-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[0.7rem] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-text)]"
                      aria-label="Copy email"
                    >
                      <Copy className="h-3 w-3" />
                      Copy
                    </button>
                  )}
                </a>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-[var(--color-text-dim)]">
          <MapPin className="h-3.5 w-3.5" />
          Based in {profile.location}
        </div>
      </div>
    </section>
  );
}
