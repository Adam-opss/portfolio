"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export interface HeadlineSegment {
  text: string;
  /** Render this segment in the accent colour. */
  accent?: boolean;
}

interface AnimatedHeadlineProps {
  segments: HeadlineSegment[];
  className?: string;
  delay?: number;
}

const container: Variants = {
  hidden: {},
  show: (delay: number) => ({
    transition: { staggerChildren: 0.035, delayChildren: delay },
  }),
};

const charV: Variants = {
  hidden: { y: "0.5em", opacity: 0, filter: "blur(6px)" },
  show: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Kinetic headline that reveals character-by-character with a soft blur/rise.
 * Words stay intact for wrapping; accent segments take the accent colour.
 * Falls back to static text when reduced motion is requested.
 */
export function AnimatedHeadline({
  segments,
  className,
  delay = 0.1,
}: AnimatedHeadlineProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <span className={className}>
        {segments.map((s, i) => (
          <span key={i} className={s.accent ? "text-accent-blue" : undefined}>
            {s.text}
          </span>
        ))}
      </span>
    );
  }

  // Build a flat list of words, tagging each with its segment accent flag.
  const words: { word: string; accent?: boolean }[] = [];
  segments.forEach((s) => {
    s.text.split(/(\s+)/).forEach((part) => {
      if (part.length === 0) return;
      words.push({ word: part, accent: s.accent });
    });
  });

  return (
    <motion.span
      className={cn("inline", className)}
      variants={container}
      custom={delay}
      initial="hidden"
      animate="show"
      aria-label={segments.map((s) => s.text).join("")}
    >
      {words.map((w, wi) => {
        if (w.word.trim() === "") return <span key={wi}> </span>;
        return (
          <span
            key={wi}
            className={cn(
              "inline-block whitespace-nowrap",
              w.accent && "text-accent-blue",
            )}
            aria-hidden
          >
            {w.word.split("").map((ch, ci) => (
              <motion.span
                key={ci}
                variants={charV}
                className="inline-block will-change-transform"
              >
                {ch}
              </motion.span>
            ))}
          </span>
        );
      })}
    </motion.span>
  );
}
