"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Briefcase, MapPin, CheckCircle2 } from "lucide-react";
import { portfolio, type ExperienceItem } from "@/config/portfolio";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export function Experience() {
  const { experience } = portfolio;
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null);

  return (
    <Section
      id="experience"
      index={4}
      eyebrow="Career"
      title="Work"
      titleAccent="experience"
      description="Where I've applied data and automation to real-world problems."
    >
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute bottom-0 left-[19px] top-2 w-px bg-border md:left-[23px]" />

        <div className="space-y-4">
          {experience.map((item, i) => (
            <TimelineCard
              key={item.id}
              item={item}
              index={i}
              open={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

function TimelineCard({
  item,
  index,
  open,
  onToggle,
}: {
  item: ExperienceItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="relative pl-12 md:pl-16"
    >
      {/* Node */}
      <span className="absolute left-[11px] top-5 flex h-4 w-4 items-center justify-center md:left-[15px]">
        <span className="absolute h-4 w-4 rounded-full bg-accent-blue/30 animate-pulse-glow" />
        <span className="relative h-2.5 w-2.5 rounded-full bg-accent-blue" />
      </span>

      <div
        className={cn(
          "overflow-hidden rounded-2xl border bg-surface/60 backdrop-blur transition-colors",
          open ? "border-accent-blue/40" : "border-border hover:border-accent-blue/25",
        )}
      >
        <button
          onClick={onToggle}
          className="flex w-full items-center gap-4 p-5 text-left"
        >
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2/60 text-accent-blue sm:flex">
            <Briefcase className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-x-2">
              <h3 className="font-display text-lg font-semibold text-foreground">
                {item.role}
              </h3>
              <span className="text-muted">·</span>
              <span className="font-medium text-accent-blue">{item.company}</span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
              <span className="rounded-full bg-surface-2/60 px-2 py-0.5 font-mono">
                {item.start} - {item.end}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {item.location}
              </span>
            </div>
          </div>
          <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-muted">
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="border-t border-border px-5 pb-5 pt-4">
                <p className="text-justify text-sm text-muted">{item.summary}</p>
                <ul className="mt-4 space-y-2">
                  {item.achievements.map((a) => (
                    <li
                      key={a}
                      className="flex items-start gap-2 text-sm text-foreground/90"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                      {a}
                    </li>
                  ))}
                </ul>
                {item.tech && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-surface-2/60 px-2 py-0.5 text-[11px] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
