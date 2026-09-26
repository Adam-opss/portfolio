"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type Skill } from "@/config/portfolio";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function Skills() {
  const { content, ui } = useLanguage();
  const { skills } = content;
  const n = skills.length;
  const [index, setIndex] = useState(0);
  const clamp = (i: number) => Math.max(0, Math.min(n - 1, i));
  const go = (i: number) => setIndex(clamp(i));

  return (
    <Section
      id="skills"
      index={2}
      eyebrow={ui.skills.eyebrow}
      title={ui.skills.title}
      titleAccent={ui.skills.titleAccent}
      description={ui.skills.description}
    >
      {/* Category chips */}
      <div className="mb-8 flex flex-wrap gap-2">
        {skills.map((cat, i) => {
          const Icon = getIcon(cat.icon);
          const isActive = i === index;
          return (
            <button
              key={cat.id}
              onClick={() => setIndex(i)}
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

      {/* Draggable carousel */}
      <div className="relative">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          style={{ touchAction: "pan-y" }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60 || info.velocity.x < -450) go(index + 1);
            else if (info.offset.x > 60 || info.velocity.x > 450) go(index - 1);
          }}
          className="cursor-grab active:cursor-grabbing"
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                width: `${n * 100}%`,
                transform: `translateX(-${(index * 100) / n}%)`,
              }}
            >
              {skills.map((cat) => (
                <div
                  key={cat.id}
                  className="shrink-0 px-0.5"
                  style={{ width: `${100 / n}%` }}
                >
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cat.skills.map((skill) => (
                      <SkillCard
                        key={skill.name}
                        skill={skill}
                        label={ui.skills.proficiency[skill.proficiency]}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Arrows */}
        <button
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Previous category"
          className="absolute -left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/80 text-foreground shadow-soft backdrop-blur transition hover:border-accent-blue/50 disabled:pointer-events-none disabled:opacity-30 md:-left-5 md:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => go(index + 1)}
          disabled={index === n - 1}
          aria-label="Next category"
          className="absolute -right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/80 text-foreground shadow-soft backdrop-blur transition hover:border-accent-blue/50 disabled:pointer-events-none disabled:opacity-30 md:-right-5 md:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Progress dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {skills.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => setIndex(i)}
            aria-label={cat.label}
            className={cn(
              "h-2 rounded-full transition-all",
              i === index
                ? "w-6 bg-accent-blue"
                : "w-2 bg-surface-2 hover:bg-muted",
            )}
          />
        ))}
      </div>
    </Section>
  );
}

function SkillCard({ skill, label }: { skill: Skill; label: string }) {
  const Icon = getIcon(skill.icon);
  return (
    <SpotlightCard className="h-full p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2/60 text-accent-blue transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5" />
        </div>
        <span className="rounded-full bg-surface-2/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
          {label}
        </span>
      </div>
      <p className="font-medium text-foreground">{skill.name}</p>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="h-full rounded-full bg-accent-blue"
        />
      </div>
      <p className="mt-1.5 text-right text-[11px] text-muted">{skill.level}%</p>
    </SpotlightCard>
  );
}
