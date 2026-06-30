"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { portfolio } from "@/config/portfolio";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Badge";
import { Marquee } from "@/components/ui/Marquee";
import { getIcon } from "@/lib/icons";

export function TechStack() {
  const { techStack } = portfolio;

  const categories = useMemo(() => {
    const set = new Set(techStack.map((t) => t.category));
    return ["All", ...Array.from(set)];
  }, [techStack]);

  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All"
      ? techStack
      : techStack.filter((t) => t.category === filter);

  return (
    <Section
      id="stack"
      index={6}
      eyebrow="Toolbox"
      title="Tech"
      titleAccent="stack"
      description="The languages, frameworks, and platforms I reach for."
    >
      <div className="mb-10">
        <Marquee items={techStack} />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <Tag key={c} active={filter === c} onClick={() => setFilter(c)}>
            {c}
          </Tag>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, delay: (i % 10) * 0.02 }}
                whileHover={{ y: -5 }}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur transition-colors hover:border-accent-blue/40"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2/60 text-accent-blue transition-transform duration-300 group-hover:scale-110 group-hover:text-accent-cyan">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-sm font-medium text-foreground">
                  {item.name}
                </span>
                <span className="text-[10px] uppercase tracking-wide text-muted">
                  {item.category}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
