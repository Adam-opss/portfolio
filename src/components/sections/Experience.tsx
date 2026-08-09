"use client";

import { motion } from "framer-motion";
import { MapPin, CheckCircle2 } from "lucide-react";
import { type ExperienceItem } from "@/config/portfolio";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function parseDate(s: string): Date | null {
  if (s === "Present") return new Date();
  const [mon, yr] = s.split(" ");
  const m = MONTHS[mon];
  const y = parseInt(yr, 10);
  if (m === undefined || Number.isNaN(y)) return null;
  return new Date(y, m, 1);
}

/** Inclusive month span between two "MMM YYYY" strings ("Present" = now). */
function durationMonths(start: string, end: string): number | null {
  const a = parseDate(start);
  const b = parseDate(end);
  if (!a || !b) return null;
  const months =
    (b.getFullYear() - a.getFullYear()) * 12 +
    (b.getMonth() - a.getMonth()) +
    1;
  return months > 0 ? months : null;
}

export function Experience() {
  const { content, ui } = useLanguage();
  const { experience } = content;

  return (
    <Section
      id="experience"
      index={4}
      eyebrow={ui.experience.eyebrow}
      title={ui.experience.title}
      titleAccent={ui.experience.titleAccent}
      description={ui.experience.description}
    >
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute bottom-0 left-[19px] top-2 w-px bg-border md:left-[23px]" />

        <div className="space-y-4">
          {experience.map((item, i) => (
            <TimelineCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function TimelineCard({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
  const { ui } = useLanguage();
  const current = item.end === "Present";
  const months = durationMonths(item.start, item.end);
  const monogram = item.company.charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="relative pl-12 md:pl-16"
    >
      {/* Node */}
      <span className="absolute left-[11px] top-6 flex h-4 w-4 items-center justify-center md:left-[15px]">
        {current && (
          <span className="absolute h-4 w-4 rounded-full bg-accent-blue/30 animate-pulse-glow" />
        )}
        <span
          className={cn(
            "relative h-2.5 w-2.5 rounded-full",
            current ? "bg-accent-blue" : "bg-muted",
          )}
        />
      </span>

      <div
        className={cn(
          "rounded-2xl border bg-surface/60 p-5 backdrop-blur transition-colors",
          current ? "border-accent-blue/40" : "border-border",
        )}
      >
        <div className="flex items-start gap-4">
          {/* Company monogram */}
          <div
            className={cn(
              "hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border font-display text-lg font-semibold sm:flex",
              current
                ? "border-accent-blue/40 bg-accent-blue/10 text-accent-blue"
                : "border-border bg-surface-2/60 text-foreground",
            )}
          >
            {monogram}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3 className="font-display text-lg font-semibold text-foreground">
                {item.role}
              </h3>
              <span className="text-muted">·</span>
              <span className="font-medium text-accent-blue">
                {item.company}
              </span>
              {current && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-blue/15 px-2 py-0.5 text-[11px] font-medium text-accent-blue">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-blue opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-blue" />
                  </span>
                  {ui.experience.current}
                </span>
              )}
            </div>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
              <span className="rounded-full bg-surface-2/60 px-2 py-0.5 font-mono">
                {item.start} -{" "}
                {current ? ui.experience.present : item.end}
              </span>
              {months && (
                <span className="font-mono">
                  {months} {ui.experience.monthsShort}
                </span>
              )}
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {item.location}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-border pt-4">
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
      </div>
    </motion.div>
  );
}
