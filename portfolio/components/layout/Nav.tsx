"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { navSections, profile } from "@/data/content";
import { useCommandMenu } from "@/components/ui/CommandMenu";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { toggle: toggleCmdK } = useCommandMenu();
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMac(/Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent));
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navSections.map((s) => s.id);
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(id);
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/[0.06] bg-[rgba(7,8,12,0.72)] backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
        aria-label="Primary"
      >
        <a
          href="#hero"
          className="group inline-flex items-center gap-3"
          aria-label="Home"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] font-mono text-[0.72rem] tracking-tight text-[var(--color-text)] transition-colors group-hover:border-[var(--color-accent)]/40">
            {initials}
            <span className="absolute -inset-px rounded-lg bg-gradient-to-br from-[var(--color-accent)]/0 via-[var(--color-accent)]/0 to-[var(--color-accent)]/20 opacity-0 transition-opacity group-hover:opacity-100" />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-medium tracking-tight text-[var(--color-text)]">
              {profile.name}
            </span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
              {profile.shortRole}
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navSections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-sm font-medium tracking-tight transition-colors",
                active === s.id
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
              )}
            >
              {active === s.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/[0.05]"
                  transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                />
              )}
              <span className="relative">{s.label}</span>
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={toggleCmdK}
            aria-label="Open command palette"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-[var(--color-text-muted)] transition-all hover:border-[var(--color-accent)]/40 hover:bg-white/[0.05] hover:text-[var(--color-text)]"
          >
            <Command className="h-3.5 w-3.5" />
            <span className="font-mono uppercase tracking-[0.18em]">Search</span>
            <kbd className="ml-1 inline-flex h-5 items-center rounded border border-white/10 bg-white/[0.04] px-1.5 font-mono text-[0.65rem] text-[var(--color-text-muted)]">
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
          </button>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40 hover:bg-white/[0.05]"
          >
            Resume
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[var(--color-text)] md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/[0.06] bg-[rgba(7,8,12,0.95)] backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {navSections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                    active === s.id
                      ? "bg-white/[0.05] text-[var(--color-text)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                  )}
                >
                  {s.label}
                </a>
              ))}
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 text-base font-medium text-[var(--color-text)]"
              >
                Resume
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
