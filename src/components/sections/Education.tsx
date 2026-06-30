"use client";

import { motion } from "framer-motion";
import { GraduationCap, Sparkle } from "lucide-react";
import { portfolio } from "@/config/portfolio";
import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function Education() {
  const { education } = portfolio;

  return (
    <Section
      id="education"
      index={5}
      eyebrow="Academics"
      title="Education &"
      titleAccent="learning"
      description="My academic foundation in data, mathematics, and computer science."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {education.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, duration: 0.55 }}
            className="h-full"
          >
            <SpotlightCard className="h-full p-6" glow="255,255,255">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2/60 text-accent-cyan">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-surface-2/60 px-3 py-1 font-mono text-xs text-muted">
                  {item.start} - {item.end}
                </span>
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
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
