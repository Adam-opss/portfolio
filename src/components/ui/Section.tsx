import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { GradientText } from "./GradientText";

interface SectionProps {
  id: string;
  /** Editorial section index, shown as a zero-padded number (e.g. "02"). */
  index?: number;
  eyebrow?: string;
  title?: ReactNode;
  titleAccent?: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

/** Standard section shell with a consistent editorial heading block. */
export function Section({
  id,
  index,
  eyebrow,
  title,
  titleAccent,
  description,
  children,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-24 sm:py-32", className)}
    >
      <div className={cn("mx-auto w-full max-w-6xl px-6", containerClassName)}>
        {(eyebrow || title) && (
          <div className="mb-14">
            {(index != null || eyebrow) && (
              <Reveal>
                <div className="mb-5 flex items-center gap-4">
                  {index != null && (
                    <span className="font-mono text-sm font-medium text-accent-blue">
                      {String(index).padStart(2, "0")}
                    </span>
                  )}
                  {eyebrow && (
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                      {eyebrow}
                    </span>
                  )}
                  <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                </div>
              </Reveal>
            )}
            <div className="max-w-2xl">
              {title && (
                <Reveal delay={0.05}>
                  <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                    {title}{" "}
                    {titleAccent && <GradientText>{titleAccent}</GradientText>}
                  </h2>
                </Reveal>
              )}
              {description && (
                <Reveal delay={0.1}>
                  <p className="mt-4 text-justify text-base leading-relaxed text-muted sm:text-lg">
                    {description}
                  </p>
                </Reveal>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
