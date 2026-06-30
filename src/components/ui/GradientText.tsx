import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Emphasised inline text. Kept as a named component so call sites don't change,
 * but renders a single solid accent colour (no gradient) for a clean,
 * professional look.
 */
export function GradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn("text-accent-blue", className)}>{children}</span>;
}
