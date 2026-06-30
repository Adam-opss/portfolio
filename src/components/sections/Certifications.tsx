"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { portfolio } from "@/config/portfolio";
import { Section } from "@/components/ui/Section";
import { getIcon } from "@/lib/icons";

export function Certifications() {
  const { certifications } = portfolio;

  return (
    <Section
      id="certifications"
      eyebrow="Credentials"
      title="Certifications &"
      titleAccent="courses"
      description="Continuous learning across data analytics, ML, and cloud."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
        {certifications.map((cert, i) => {
          const Icon = getIcon(cert.icon);
          return (
            <motion.a
              key={cert.id}
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur transition-colors hover:border-accent-purple/40"
            >
              {/* Badge */}
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                <span className="absolute inset-0 rounded-2xl bg-accent-blue opacity-15 blur-md transition-opacity group-hover:opacity-30" />
                <span className="relative flex h-full w-full items-center justify-center rounded-2xl border border-border bg-surface-2/60 text-accent-purple">
                  <Icon className="h-7 w-7" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-display font-semibold leading-snug text-foreground">
                  {cert.name}
                </p>
                <p className="mt-1 text-sm text-accent-blue">{cert.issuer}</p>
                <p className="mt-0.5 font-mono text-xs text-muted">{cert.date}</p>
              </div>

              <ExternalLink className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent-purple" />

              {/* Shimmer */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </motion.a>
          );
        })}
      </div>
    </Section>
  );
}
