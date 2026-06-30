"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Spotlight tint, defaults to accent blue. */
  glow?: string;
}

/**
 * Glassmorphic card with a cursor-following radial spotlight and a soft
 * glowing border on hover. Pure CSS variables - no re-render on mouse move.
 */
export function SpotlightCard({
  children,
  className,
  glow = "255,255,255",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      style={{ "--glow": glow } as React.CSSProperties}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-surface/70 backdrop-blur-md transition-colors duration-300 hover:border-accent-blue/40",
        className,
      )}
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), rgba(var(--glow),0.12), transparent 60%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
