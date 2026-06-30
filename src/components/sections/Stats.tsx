"use client";

import { motion } from "framer-motion";
import { portfolio } from "@/config/portfolio";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { getIcon } from "@/lib/icons";

export function Stats() {
  const { stats } = portfolio;

  return (
    <section id="stats" className="relative scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/50 p-8 backdrop-blur-xl sm:p-12">
          {/* Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent-purple/20 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent-blue/20 blur-[100px]" />

          <div className="relative grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s, i) => {
              const Icon = getIcon(s.icon);
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="text-center"
                >
                  <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-2/60 text-accent-blue">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                    <AnimatedCounter
                      value={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                    />
                  </p>
                  <p className="mt-1 text-xs text-muted">{s.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
