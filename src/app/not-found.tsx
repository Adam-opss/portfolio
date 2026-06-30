"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Compass } from "lucide-react";
import { GradientText } from "@/components/ui/GradientText";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-display text-[8rem] font-black leading-none tracking-tighter sm:text-[12rem]">
          <GradientText>404</GradientText>
        </p>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl"
      >
        This page drifted off the grid.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-3 max-w-md text-muted"
      >
        The link you followed may be broken, or the page may have been moved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full bg-accent-blue px-6 py-3 text-sm font-medium text-on-accent shadow-glow transition hover:opacity-90"
        >
          <Home className="h-4 w-4" /> Back home
        </Link>
        <Link
          href="/#projects"
          className="flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm text-foreground transition hover:border-accent-blue/50"
        >
          <Compass className="h-4 w-4" /> Explore projects
        </Link>
      </motion.div>
    </div>
  );
}
