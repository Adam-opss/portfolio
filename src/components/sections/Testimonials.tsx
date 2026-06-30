"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { portfolio } from "@/config/portfolio";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const { testimonials } = portfolio;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const count = testimonials.length;

  const paginate = useCallback(
    (d: number) => {
      setDir(d);
      setIndex((p) => (p + d + count) % count);
    },
    [count],
  );

  // Auto-advance.
  useEffect(() => {
    const t = setInterval(() => paginate(1), 6000);
    return () => clearInterval(t);
  }, [paginate]);

  const active = testimonials[index];

  return (
    <Section
      id="testimonials"
      eyebrow="Kind words"
      title="What people"
      titleAccent="say"
    >
      <div className="relative mx-auto max-w-3xl">
        <div className="relative min-h-[18rem] overflow-hidden rounded-3xl border border-border bg-surface/60 p-8 backdrop-blur-xl sm:p-12">
          <Quote className="absolute right-8 top-8 h-16 w-16 text-accent-blue/10" />

          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={active.id}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.4 }}
            >
              <blockquote className="font-display text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                “{active.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-blue font-display text-sm font-bold text-on-accent">
                  {active.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <span>
                  <p className="font-medium text-foreground">{active.name}</p>
                  <p className="text-sm text-muted">{active.title}</p>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-muted transition hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Go to testimonial ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index
                    ? "w-6 bg-accent-blue"
                    : "w-2 bg-border hover:bg-muted",
                )}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-muted transition hover:text-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Section>
  );
}
