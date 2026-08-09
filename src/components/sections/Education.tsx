"use client";

import { motion } from "framer-motion";
import { GraduationCap, Sparkle } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";

export function Education() {
  const { content, ui } = useLanguage();
  const { education } = content;

  return (
    <Section
      id="education"
      index={5}
      eyebrow={ui.education.eyebrow}
      title={ui.education.title}
      titleAccent={ui.education.titleAccent}
      description={ui.education.description}
    >
      <div className="relative mx-auto max-w-3xl">
        {/* Timeline spine */}
        <div className="absolute bottom-4 left-[18px] top-3 w-px bg-gradient-to-b from-border via-border to-transparent" />

        <div className="space-y-6">
          {education.map((item, i) => {
            const upcoming = item.status === "upcoming";
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className="relative pl-12"
              >
                {/* Node */}
                <span
                  className={cn(
                    "absolute left-0 top-2 flex h-9 w-9 items-center justify-center rounded-full border",
                    upcoming
                      ? "border-accent-blue/60 bg-accent-blue/15 text-accent-blue"
                      : "border-border bg-surface-2/60 text-accent-cyan",
                  )}
                >
                  {upcoming && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-blue/20" />
                  )}
                  <GraduationCap className="h-5 w-5" />
                </span>

                <SpotlightCard className="p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-muted">
                      {item.start} - {item.end}
                    </span>
                    {item.status && (
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                          upcoming
                            ? "bg-accent-blue/15 text-accent-blue"
                            : "bg-surface-2/60 text-muted",
                        )}
                      >
                        {upcoming ? ui.education.upcoming : ui.education.done}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {item.degree}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent-blue">
                    {item.school}
                  </p>
                  <p className="text-xs text-muted">{item.location}</p>

                  <p className="mt-4 text-justify text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>

                  {item.highlights && (
                    <ul className="mt-4 space-y-2">
                      {item.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-sm text-foreground/90"
                        >
                          <Sparkle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-cyan" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.courses && item.courses.length > 0 && (
                    <div className="mt-5 border-t border-border pt-4">
                      <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-muted">
                        {ui.education.coursework}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.courses.map((c) => (
                          <span
                            key={c}
                            className="rounded-md bg-surface-2/60 px-2 py-0.5 text-[11px] text-muted"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
