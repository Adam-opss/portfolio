"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Subtle custom cursor: a small dot that tracks instantly and a larger ring
 * that lags via spring physics. Grows on hover over interactive elements.
 * Disabled on touch devices and when reduced motion is requested.
 */
export function CursorProvider() {
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (isMobile || reduced) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement;
      setHovering(
        Boolean(
          target.closest(
            "a, button, [role='button'], input, textarea, [data-cursor='hover']",
          ),
        ),
      );
      const labelled = target.closest<HTMLElement>("[data-cursor-label]");
      setLabel(labelled?.dataset.cursorLabel ?? null);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [isMobile, reduced, x, y]);

  if (isMobile || reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}
    >
      {/* Lagging ring (hidden when a label pill is shown) */}
      <motion.div
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border border-accent-blue/70 mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: label ? 0 : hovering ? 1.8 : 1,
          opacity: label ? 0 : hovering ? 0.9 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      {/* Instant dot */}
      <motion.div
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent-cyan"
        style={{ x, y }}
        animate={{ scale: hovering || label ? 0 : 1 }}
      />
      {/* Contextual label pill */}
      <motion.div
        className="absolute -ml-8 -mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-accent-blue text-[11px] font-medium uppercase tracking-wide text-on-accent"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: label ? 1 : 0, opacity: label ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
      >
        {label}
      </motion.div>
    </div>
  );
}
