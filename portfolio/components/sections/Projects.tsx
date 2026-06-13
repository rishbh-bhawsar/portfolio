"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import type { MouseEvent } from "react";
import { projects, type Project } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

function ProjectCard({ project }: { project: Project }) {
  const prefersReduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    x.set(px);
    y.set(py);
    const rx = ((py - rect.height / 2) / rect.height) * -4;
    const ry = ((px - rect.width / 2) / rect.width) * 4;
    rotateX.set(rx);
    rotateY.set(ry);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const overlay = useMotionTemplate`radial-gradient(360px circle at ${x}px ${y}px, rgba(90,169,255,0.12), transparent 60%)`;

  return (
    <StaggerItem>
      <motion.article
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
        className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 transition-colors duration-300 will-change-transform hover:border-[var(--color-accent)]/25 sm:p-7"
      >
        {/* Mouse spotlight */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: overlay }}
        />
        {/* Top sheen line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex h-full flex-col">
          <div className="flex items-baseline justify-between gap-3">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold tracking-tight text-[var(--color-text)] sm:text-[1.35rem]">
                {project.title}
              </h3>
              {project.highlight && (
                <Badge tone="accent">{project.highlight}</Badge>
              )}
            </div>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-text-dim)]">
              {project.period}
            </span>
          </div>

          <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--color-text-muted)]">
            {project.problem}
          </p>

          <div className="mt-5">
            <div className="mb-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-text-dim)]">
              Architecture
            </div>
            <ul className="space-y-1.5">
              {project.architecture.map((a, i) => (
                <li
                  key={i}
                  className="relative pl-4 text-sm leading-relaxed text-[var(--color-text-muted)]"
                >
                  <span className="absolute left-0 top-[0.55em] h-1 w-1 rounded-full bg-[var(--color-accent)]/60" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 pt-4">
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-[var(--color-text)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40"
            >
              {/* <GithubIcon className="h-3.5 w-3.5" /> */}
              <Globe className="h-3.5 w-3.5" />
              Website
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-[var(--color-text)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40"
              >
                Live
                <ArrowUpRight className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </StaggerItem>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          index="03"
          eyebrow="Selected Work"
          title="Things I've designed and built."
          description="Production-grade web applications built for real users and real business needs. Each project highlights frontend architecture, performance optimization, scalable design, and the engineering decisions that made it successful."
        />

        <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
