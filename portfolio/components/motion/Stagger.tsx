"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
};

export function Stagger({
  children,
  className,
  stagger = 0.07,
  delayChildren = 0,
}: StaggerProps) {
  const prefersReduced = useReducedMotion();
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReduced ? 0 : stagger,
        delayChildren: prefersReduced ? 0 : delayChildren,
      },
    },
  };
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "span" | "article";
};

export function StaggerItem({
  children,
  className,
  y = 14,
  as = "div",
}: StaggerItemProps) {
  const prefersReduced = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const MotionComponent = motion[as] as typeof motion.div;
  return (
    <MotionComponent className={cn(className)} variants={variants}>
      {children}
    </MotionComponent>
  );
}
