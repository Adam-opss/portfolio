"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Command, Languages, Sun, Moon } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useCommandPalette } from "@/components/providers/CommandPalette";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { uiStrings } from "@/config/i18n";
import { useLockBody } from "@/hooks/useLockBody";
import { cn } from "@/lib/utils";

// Section ids are language-independent, so a stable list is fine for scroll-spy.
const navIds = uiStrings.en.nav.map((n) => n.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy(navIds);
  const { toggle: togglePalette } = useCommandPalette();
  const { content, ui, lang, toggle: toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  useLockBody(menuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = content.person.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-[800] flex justify-center px-6 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full border px-5 py-2.5 transition-all duration-500",
          scrolled
            ? "border-border bg-surface/70 shadow-soft backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2"
          aria-label="Back to top"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-blue font-display text-sm font-bold text-on-accent shadow-glow transition group-hover:opacity-90">
            {initials}
          </span>
          <span className="hidden font-display text-sm font-semibold text-foreground sm:block">
            {content.person.name}
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {ui.nav.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => go(item.id)}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  active === item.id
                    ? "text-foreground"
                    : "text-muted hover:text-foreground",
                )}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-accent-blue/15"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePalette}
            aria-label="Open command palette"
            className="hidden items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted transition hover:text-foreground sm:flex"
          >
            <Command className="h-3.5 w-3.5" />
            <span>{ui.common.search}</span>
            <kbd className="rounded border border-border px-1 text-[10px]">⌘K</kbd>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/60 text-muted transition hover:text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            aria-label={ui.common.language}
            className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 text-xs font-medium text-muted transition hover:text-foreground"
          >
            <Languages className="h-3.5 w-3.5" />
            <span className="tabular-nums uppercase">
              {lang === "en" ? "SK" : "EN"}
            </span>
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/60 text-foreground lg:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-4 top-20 rounded-3xl border border-border bg-surface/90 p-4 shadow-soft backdrop-blur-xl lg:hidden"
          >
            <ul className="grid gap-1">
              {ui.nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <button
                    onClick={() => go(item.id)}
                    className={cn(
                      "w-full rounded-xl px-4 py-3 text-left text-sm transition",
                      active === item.id
                        ? "bg-accent-blue/15 text-foreground"
                        : "text-muted hover:bg-surface-2 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
