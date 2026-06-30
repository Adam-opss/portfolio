import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small pill used for tech chips and tags. */
export function Tag({
  children,
  active,
  onClick,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const Comp = onClick ? "button" : "span";
  return (
    <Comp
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-300",
        active
          ? "border-accent-blue/50 bg-accent-blue/15 text-foreground shadow-glow"
          : "border-border bg-surface/60 text-muted hover:border-accent-blue/40 hover:text-foreground",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
