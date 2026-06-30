"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { portfolio } from "@/config/portfolio";
import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function Skills() {
  const { skills } = portfolio;
  const [activeId, setActiveId] = useState(skills[0]?.id ?? "");
  const active = skills.find((c) => c.id === activeId) ?? skills[0];

  return (
    <Section
      id="skills"
      index={2}
      eyebrow="Capabilities"
      title="Skills &"
      titleAccent="expertise"
      description="A focused toolkit spanning the full analytics lifecycle, from raw data to deployed insight."
    >
      {/* Category tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        {skills.map((cat) => {
          const Icon = getIcon(cat.icon);
          const isActive = cat.id === activeId;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className={cn(
                "relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-accent-blue/40 text-foreground"
                  : "border-border text-muted hover:text-foreground",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="skill-tab"
                  className="absolute inset-0 -z-10 rounded-full bg-accent-blue/15"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Icon className="h-4 w-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Skill grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {active.skills.map((skill, i) => {
            const Icon = getIcon(skill.icon);
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <SpotlightCard className="h-full p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2/60 text-accent-blue transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-surface-2/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
                      {skill.proficiency}
                    </span>
                  </div>
                  <p className="font-medium text-foreground">{skill.name}</p>

                  {/* Proficiency bar */}
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      className="h-full rounded-full bg-accent-blue"
                    />
                  </div>
                  <p className="mt-1.5 text-right text-[11px] text-muted">
                    {skill.level}%
                  </p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
