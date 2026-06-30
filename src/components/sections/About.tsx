"use client";

import { motion } from "framer-motion";
import { portfolio } from "@/config/portfolio";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText } from "@/components/ui/GradientText";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Avatar } from "@/components/ui/Avatar";
import { getIcon } from "@/lib/icons";

export function About() {
  const { person, stats } = portfolio;
  const highlightStats = stats.slice(0, 4);

  return (
    <Section id="about">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        {/* Text column */}
        <div className="space-y-6">
          {/* Heading */}
          <div>
            <Reveal>
              <div className="mb-5 flex items-center gap-4">
                <span className="font-mono text-sm font-medium text-accent-blue">
                  01
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                  About me
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                A bit about <GradientText>who I am</GradientText>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                Data-driven, design-minded, and relentlessly curious.
              </p>
            </Reveal>
          </div>

          {person.bio.map((para, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="text-justify text-base leading-relaxed text-muted sm:text-lg">
                {para}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.25}>
            <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
              {highlightStats.map((s, i) => {
                const Icon = getIcon(s.icon);
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Icon className="mb-2 h-5 w-5 text-accent-blue" />
                    <p className="font-display text-2xl font-bold text-foreground">
                      <AnimatedCounter
                        value={s.value}
                        prefix={s.prefix}
                        suffix={s.suffix}
                      />
                    </p>
                    <p className="text-xs text-muted">{s.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={0.3}>
            <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
              {[
                ["Location", person.location],
                ["Email", person.email],
                ["Availability", person.availability],
              ].map(([label, value]) => (
                <div key={label} className="bg-surface/60 p-4">
                  <dt className="text-xs uppercase tracking-widest text-muted">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Focus tags */}
          <Reveal delay={0.35}>
            <div className="flex flex-wrap gap-2">
              {["AI", "BI", "ML", "Data Viz", "Automation"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-surface-2/60 px-3 py-1 text-xs text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Portrait - direct grid item so it stretches to the text height */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="group relative min-h-[26rem] self-stretch overflow-hidden rounded-3xl border border-border"
        >
          <div className="absolute inset-0">
            <Avatar
              src={person.avatar}
              name={person.name}
              alt={person.name}
              objectPosition="50% 22%"
            />
          </div>
          {/* corner ticks for a "framed" feel */}
          <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-foreground/40" />
          <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-foreground/40" />
          <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-foreground/40" />
          <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-foreground/40" />
          {/* name overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/95 via-bg/40 to-transparent p-5">
            <p className="font-display text-xl font-semibold text-foreground">
              {person.name}
            </p>
            <p className="text-sm text-muted">{person.title}</p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
