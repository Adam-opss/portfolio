"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Adds a subtle cursor-driven 3D tilt on hover. */
  tilt?: boolean;
}

const MAX_TILT = 6; // degrees

/**
 * Glassmorphic card with a cursor-following radial spotlight and a soft
 * glowing border on hover. Pure CSS variables - no re-render on mouse move.
 * The spotlight tint follows the theme (light on dark, dark on light).
 * With `tilt`, the whole card leans a few degrees toward the cursor.
 */
export function SpotlightCard({ children, className, tilt = false }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  const reduced = usePrefersReducedMotion();
  const doTilt = tilt && !reduced;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    el.style.setProperty("--mx", `${px}px`);
    el.style.setProperty("--my", `${py}px`);
    if (doTilt) {
      const rx = (0.5 - py / rect.height) * (MAX_TILT * 2);
      const ry = (px / rect.width - 0.5) * (MAX_TILT * 2);
      el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    }
  };

  const reset = () => {
    setOpacity(0);
    const el = ref.current;
    if (el && doTilt) el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={reset}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-surface/70 backdrop-blur-md transition-[transform,border-color,box-shadow] duration-300 ease-out hover:border-accent-blue/40",
        doTilt && "will-change-transform hover:shadow-soft",
        className,
      )}
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), rgb(var(--foreground) / 0.1), transparent 60%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
