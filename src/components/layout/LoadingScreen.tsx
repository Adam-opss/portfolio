"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { portfolio } from "@/config/portfolio";

/**
 * Brand loading screen shown on first paint. Counts to 100, then reveals the
 * page. Uses session storage so it only appears once per browser session.
 */
export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("loaded")) {
      setDone(true);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("loaded", "1");
        setTimeout(() => setDone(true), 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const initials = portfolio.person.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-bg"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative mb-8 flex h-24 w-24 items-center justify-center"
          >
            <span className="absolute inset-0 rounded-2xl bg-accent-blue opacity-20 blur-xl animate-pulse-glow" />
            <span className="relative flex h-full w-full items-center justify-center rounded-2xl border border-border bg-surface font-display text-2xl font-bold text-foreground">
              {initials}
            </span>
            <span className="absolute inset-[-6px] rounded-[1.25rem] border border-accent-blue/40 animate-spin-slow" />
          </motion.div>

          <div className="h-px w-48 overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full bg-accent-blue"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 font-mono text-xs tracking-widest text-muted">
            {progress.toString().padStart(3, "0")}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
