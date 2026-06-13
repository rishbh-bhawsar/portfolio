"use client";

import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Copy,
  FileDown,
  Home as HomeIcon,
  Mail,
  Search,
  User,
  Briefcase,
  FolderGit2,
  Boxes,
  AtSign,
} from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { profile, navSections } from "@/data/content";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

type CommandMenuCtx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  toggle: () => void;
};

const Ctx = createContext<CommandMenuCtx | null>(null);

export function useCommandMenu() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCommandMenu must be used inside CommandMenuProvider");
  return ctx;
}

const sectionIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  about: User,
  experience: Briefcase,
  projects: FolderGit2,
  skills: Boxes,
  contact: AtSign,
};

export function CommandMenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  const goTo = (id: string) => {
    close();
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.location.hash = id;
    });
  };

  const openExternal = (url: string) => {
    close();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copyEmail = async () => {
    close();
    try {
      await navigator.clipboard.writeText(profile.email);
      toast.success("Email copied to clipboard");
    } catch {
      toast.error("Couldn't copy — please copy manually");
    }
  };

  return (
    <Ctx.Provider value={{ open, setOpen, toggle }}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[10vh] sm:pt-[18vh]"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 4 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[rgba(15,18,24,0.92)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl"
            >
              <Command
                label="Command palette"
                className="flex flex-col"
                loop
              >
                <div className="flex items-center gap-3 border-b border-white/[0.06] px-4">
                  <Search className="h-4 w-4 shrink-0 text-[var(--color-text-dim)]" />
                  <Command.Input
                    autoFocus
                    placeholder="Jump to a section, copy email, open links…"
                    className="flex-1 bg-transparent py-4 text-[0.95rem] text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] focus:outline-none"
                  />
                  <kbd className="hidden rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[0.65rem] text-[var(--color-text-muted)] sm:inline-block">
                    Esc
                  </kbd>
                </div>

                <Command.List className="max-h-[60vh] overflow-y-auto p-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.6rem] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.22em] [&_[cmdk-group-heading]]:text-[var(--color-text-dim)]">
                  <Command.Empty className="px-3 py-8 text-center text-sm text-[var(--color-text-muted)]">
                    No matches.
                  </Command.Empty>

                  <Command.Group heading="Navigate">
                    <Item
                      icon={HomeIcon}
                      label="Top of page"
                      hint="Hero"
                      onSelect={() => goTo("hero")}
                    />
                    {navSections.map((s) => {
                      const Icon = sectionIcon[s.id] ?? User;
                      return (
                        <Item
                          key={s.id}
                          icon={Icon}
                          label={s.label}
                          hint={`#${s.id}`}
                          onSelect={() => goTo(s.id)}
                        />
                      );
                    })}
                  </Command.Group>

                  <Command.Group heading="Links">
                    <Item
                      icon={FileDown}
                      label="Download résumé"
                      hint="PDF"
                      onSelect={() => openExternal(profile.resumeUrl)}
                    />
                    <Item
                      icon={GithubIcon}
                      label="Open GitHub"
                      hint="@RishbhBhawsar"
                      onSelect={() => openExternal(profile.github)}
                    />
                    <Item
                      icon={LinkedinIcon}
                      label="Open LinkedIn"
                      hint="/in/rishbh-bhawsar"
                      onSelect={() => openExternal(profile.linkedin)}
                    />
                  </Command.Group>

                  <Command.Group heading="Actions">
                    <Item
                      icon={Copy}
                      label="Copy email"
                      hint={profile.email}
                      onSelect={copyEmail}
                    />
                    <Item
                      icon={Mail}
                      label="Send email"
                      hint="Compose"
                      onSelect={() => openExternal(`mailto:${profile.email}`)}
                    />
                  </Command.Group>
                </Command.List>

                <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-text-dim)]">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Kbd>↑</Kbd>
                      <Kbd>↓</Kbd>
                      navigate
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Kbd>↵</Kbd>
                      select
                    </span>
                  </div>
                  <span>{profile.name}</span>
                </div>
              </Command>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-4 min-w-4 items-center justify-center rounded border border-white/10 bg-white/[0.04] px-1 text-[0.6rem] text-[var(--color-text-muted)]">
      {children}
    </kbd>
  );
}

type ItemProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  hint?: string;
  onSelect: () => void;
};

function Item({ icon: Icon, label, hint, onSelect }: ItemProps) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--color-text-muted)] transition-colors aria-selected:bg-white/[0.06] aria-selected:text-[var(--color-text)] data-[selected=true]:bg-white/[0.06] data-[selected=true]:text-[var(--color-text)]"
    >
      <Icon className="h-4 w-4 shrink-0 text-[var(--color-text-dim)] group-aria-selected:text-[var(--color-accent-soft)]" />
      <span className="flex-1 truncate">{label}</span>
      {hint && (
        <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-text-dim)] sm:inline-block">
          {hint}
        </span>
      )}
      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[var(--color-text-dim)] opacity-0 transition-opacity group-aria-selected:opacity-100" />
    </Command.Item>
  );
}
