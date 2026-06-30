"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/config/portfolio";
import { site } from "@/config/site";
import { getIcon } from "@/lib/icons";
import { GradientText } from "@/components/ui/GradientText";
import { Reveal } from "@/components/ui/Reveal";

export function Footer() {
  const year = new Date().getFullYear();
  const { person, social } = portfolio;

  return (
    <footer className="relative border-t border-border">
      {/* Big CTA */}
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 font-mono text-sm font-medium text-accent-blue">
            <span className="h-px w-8 bg-accent-blue/50" /> Let&apos;s connect
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <a
            href={`mailto:${person.email}`}
            className="group inline-flex flex-wrap items-center gap-x-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl"
          >
            Let&apos;s work <GradientText>together</GradientText>
            <ArrowUpRight className="h-9 w-9 text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground sm:h-14 sm:w-14" />
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted">
            <a
              href={`mailto:${person.email}`}
              className="transition hover:text-foreground"
            >
              {person.email}
            </a>
            <span>{person.location}</span>
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" />
              </span>
              {person.availability}
            </span>
          </div>
        </Reveal>
      </div>

      {/* Columns */}
      <div className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold text-foreground">
              <GradientText>{person.name}</GradientText>
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted">{person.tagline}</p>
          </div>

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
              Navigate
            </p>
            <ul className="grid grid-cols-2 gap-y-2 text-sm">
              {site.nav.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() =>
                      document
                        .getElementById(n.id)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-muted transition hover:text-foreground"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
              Connect
            </p>
            <div className="flex flex-wrap gap-2">
              {social.map((s) => {
                const Icon = getIcon(s.icon);
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface/60 text-muted transition hover:border-accent-blue/50 hover:text-accent-blue"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted sm:flex-row">
          <p>
            © {year} {person.name}. All rights reserved.
          </p>
          <p>
            Built with Next.js, Tailwind &amp; Framer Motion · Press{" "}
            <kbd className="rounded border border-border px-1">⌘K</kbd>
          </p>
        </div>
      </div>
    </footer>
  );
}
