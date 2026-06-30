"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { portfolio } from "@/config/portfolio";
import { Typewriter } from "@/components/ui/Typewriter";
import { AnimatedHeadline } from "@/components/ui/AnimatedHeadline";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getIcon } from "@/lib/icons";

export function Hero() {
  // Drive parallax from the page scroll position (the hero sits at the top),
  // which avoids Framer's target-measurement warning while keeping the effect.
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 120]);
  const opacity = useTransform(scrollY, [0, 560], [1, 0]);

  const { person, social } = portfolio;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-28"
    >
      {/* soft glow behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] h-[28rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/[0.06] blur-[120px]"
      />

      <motion.div
        style={{ y, opacity }}
        className="mx-auto w-full max-w-2xl"
      >
        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs text-muted backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" />
          </span>
          {person.availability}
        </motion.div>

        {/* Headline */}
        <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          <AnimatedHeadline
            segments={[
              { text: "Hi, I'm " },
              { text: person.firstName, accent: true },
            ]}
            delay={0.15}
          />
        </h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 font-display text-2xl font-medium text-muted sm:text-3xl"
        >
          <Typewriter words={person.roles} className="text-foreground" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 text-justify text-base leading-relaxed text-muted sm:text-lg"
        >
          {person.tagline} I work across machine learning, business intelligence,
          and data visualization, making messy datasets clear, and clear data
          actionable.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Projects
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton
            variant="secondary"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Mail className="h-4 w-4" />
            Get in touch
          </MagneticButton>
        </motion.div>

        {/* Socials + location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-9 flex items-center gap-4"
        >
          <div className="flex gap-2">
            {social.map((s) => {
              const Icon = getIcon(s.icon);
              return (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface/60 text-muted backdrop-blur transition hover:border-accent-blue/50 hover:text-accent-blue"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              );
            })}
          </div>
          <span className="hidden items-center gap-1.5 text-sm text-muted sm:flex">
            <MapPin className="h-3.5 w-3.5" />
            {person.location}
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-border p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1 rounded-full bg-accent-blue"
          />
        </div>
      </motion.div>
    </section>
  );
}
