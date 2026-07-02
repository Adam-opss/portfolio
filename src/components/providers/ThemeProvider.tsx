"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "portfolio-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Start from the SSR default so the first client render matches the server
  // (no hydration mismatch). The stored preference is read after mount, and a
  // pre-paint script in <head> already applied the right class, so no flash.
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") setThemeState(stored);
    setMounted(true);
  }, []);

  // Apply to <html> only after mount (before that the pre-paint script wins),
  // and never write storage here — persistence happens on explicit action.
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme, mounted]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    window.localStorage.setItem(STORAGE_KEY, t);
  }, []);
  const toggleTheme = useCallback(
    () =>
      setThemeState((p) => {
        const next = p === "dark" ? "light" : "dark";
        window.localStorage.setItem(STORAGE_KEY, next);
        return next;
      }),
    [],
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
