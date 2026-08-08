"use client";

import { useRef, useState, type ReactNode } from "react";

/** Theme-aware colours via CSS variables (resolve inside inline styles). */
export const FG = "rgb(var(--foreground))";
export const MUT = "rgb(var(--muted))";
export const BORDER = "rgb(var(--border))";
export const ACC = "rgb(var(--accent-blue))";

/** Fixed accents shared with the 3D cluster plot and the static charts. */
export const SEG_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
export const CLUSTER_COLORS: Record<number, string> = {
  [-1]: "#6b7280",
  0: "#9aa4b2",
  1: "#3b82f6",
  2: "#f59e0b",
  3: "#10b981",
  4: "#a855f7",
  5: "#ef4444",
  6: "#ec4899",
};

export interface TipState {
  x: number;
  y: number;
  lines: string[];
}

export function useTooltip() {
  const ref = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<TipState | null>(null);
  const show = (e: { clientX: number; clientY: number }, lines: string[]) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setTip({ x: e.clientX - r.left, y: e.clientY - r.top, lines });
  };
  const hide = () => setTip(null);
  return { ref, tip, show, hide };
}

export function Tooltip({ tip }: { tip: TipState | null }) {
  if (!tip) return null;
  return (
    <div
      className="pointer-events-none absolute z-20 max-w-[220px] -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded-lg border border-border bg-surface px-2.5 py-1.5 text-[11px] leading-relaxed shadow-soft"
      style={{ left: tip.x, top: tip.y }}
    >
      {tip.lines.map((l, i) => (
        <div
          key={i}
          className={i === 0 ? "font-medium text-foreground" : "text-muted"}
        >
          {l}
        </div>
      ))}
    </div>
  );
}

/** Consistent panel around every interactive chart. */
export function ChartPanel({
  children,
  refEl,
}: {
  children: ReactNode;
  refEl: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      ref={refEl}
      className="relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-4 shadow-soft backdrop-blur"
    >
      {children}
    </div>
  );
}
