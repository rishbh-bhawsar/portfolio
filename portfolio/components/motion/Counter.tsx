"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  motion,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Parsed = {
  prefix: string;
  number: number;
  decimals: number;
  suffix: string;
};

/**
 * Parses strings like "1+", "8+", "50K", "400+", "99.5%" into
 * { prefix, number, decimals, suffix } so the numeric portion can animate.
 */
function parseValue(value: string): Parsed {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", number: 0, decimals: 0, suffix: value };
  const [, prefix, raw, suffix] = match;
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  return {
    prefix,
    number: parseFloat(raw),
    decimals,
    suffix,
  };
}

type Props = {
  value: string;
  className?: string;
  duration?: number;
};

export function Counter({ value, className, duration = 1.4 }: Props) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const { prefix, number, decimals, suffix } = parseValue(value);

  const motionNumber = useMotionValue(prefersReduced ? number : 0);
  const display = useTransform(motionNumber, (latest) =>
    latest.toFixed(decimals),
  );

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      motionNumber.set(number);
      return;
    }
    const controls = animate(motionNumber, number, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, number, motionNumber, duration, prefersReduced]);

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-baseline tabular-nums",
        className,
      )}
      aria-label={value}
    >
      {prefix && <span>{prefix}</span>}
      <motion.span>{display}</motion.span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
