"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { useEffect, useState } from "react";
import { profile } from "@/data/content";
import { ButtonLink } from "@/components/ui/Button";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

function RotatingRoles() {
  const prefersReduced = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(
      () => setIdx((i) => (i + 1) % profile.roles.length),
      2400,
    );
    return () => clearInterval(id);
  }, [prefersReduced]);

  // Reserve enough width for the longest role so children (absolute) never clip.
  const longest = profile.roles.reduce(
    (a, b) => (a.length >= b.length ? a : b),
    "",
  );

  return (
    <span className="relative inline-block h-[1.7em] overflow-hidden align-bottom leading-[1.7]">
      {/* Invisible ghost reserves horizontal space for the longest role */}
      <span
        aria-hidden
        className="invisible whitespace-nowrap font-mono text-[0.95em] tracking-tight"
      >
        {longest}
      </span>
      {profile.roles.map((role, i) => (
        <motion.span
          key={role}
          aria-hidden={i !== idx}
          initial={false}
          animate={{
            y: i === idx ? "0%" : i < idx ? "-110%" : "110%",
            opacity: i === idx ? 1 : 0,
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-0 flex items-center whitespace-nowrap font-mono text-[0.95em] tracking-tight text-[var(--color-accent-soft)]"
        >
          {role}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const desktop = useIsDesktop();
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden pb-20 pt-28 sm:pt-32"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(90,169,255,0.18),transparent_50%)]" />
      </div>

      {/* Three.js canvas — desktop & motion-allowed only */}
      {desktop && !prefersReduced && (
        <div
          className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_40%,black_30%,transparent_75%)]"
          aria-hidden
        >
          <HeroCanvas />
        </div>
      )}

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 md:grid-cols-[1.4fr,1fr] md:gap-16">
        {/* Left: text */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)] backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for SDE roles
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--color-text)] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block">{profile.name.split(" ")[0]}</span>
            <span className="block bg-gradient-to-r from-white via-white to-[var(--color-accent-soft)] bg-clip-text text-transparent">
              {profile.name.split(" ").slice(1).join(" ")}.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 flex items-baseline gap-2 text-base text-[var(--color-text-muted)] sm:text-lg"
          >
            <span className="text-[var(--color-text-dim)]">~/</span>
            <RotatingRoles />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg"
          >
            Software Engineer focused on{" "}
            <span className="text-[var(--color-text)]">Angular applications</span>,{" "}
            <span className="text-[var(--color-text)]">enterprise platforms</span>, and{" "}
            <span className="text-[var(--color-text)]">Currently building production-grade products using Angular</span>. TypeScript, and modern web technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="#projects" variant="primary" size="lg">
              View work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </ButtonLink>
            <ButtonLink
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="lg"
            >
              Download resume
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </ButtonLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 flex items-center gap-5 text-[var(--color-text-dim)]"
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-[var(--color-text)]"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-[var(--color-text)]"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="transition-colors hover:text-[var(--color-text)]"
            >
              <Mail className="h-5 w-5" />
            </a>
            <span className="ml-1 inline-flex items-center gap-1.5 text-xs text-[var(--color-text-dim)]">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </span>
          </motion.div>
        </div>

        {/* Right: avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden aspect-square w-full max-w-[380px] md:block"
        >
          {/* Glow ring */}
          <div className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(90,169,255,0.25),transparent_60%)] blur-2xl" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--color-accent)]/40 via-transparent to-[var(--color-accent-soft)]/30 blur-md" />

          <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-[var(--color-surface-2)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
            <Image
              src={profile.avatarUrl}
              alt={`${profile.name} portrait`}
              fill
              priority
              sizes="(min-width: 768px) 380px, 0px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-black/40 via-transparent to-transparent mix-blend-multiply" />
            <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[var(--color-text-dim)] sm:flex"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em]">Scroll</span>
        <motion.span
          animate={
            prefersReduced
              ? undefined
              : { y: [0, 6, 0], opacity: [0.4, 1, 0.4] }
          }
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
