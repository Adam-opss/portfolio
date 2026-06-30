"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type Variant = "primary" | "secondary" | "ghost";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-blue text-on-accent shadow-glow hover:opacity-90",
  secondary:
    "border border-border bg-surface/70 text-foreground backdrop-blur hover:border-accent-blue/50",
  ghost: "text-muted hover:text-foreground",
};

/** Button/link that gently leans toward the cursor (magnetic micro-interaction). */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  external,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    x.set(mx * 0.3);
    y.set(my * 0.3);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 will-change-transform",
    variants[variant],
    className,
  );

  const sharedProps = {
    ref: ref as React.Ref<never>,
    style: { x: sx, y: sy },
    onMouseMove: onMove,
    onMouseLeave: reset,
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <motion.a
        {...sharedProps}
        href={href}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...sharedProps} onClick={onClick} className={classes}>
      {children}
    </motion.button>
  );
}
