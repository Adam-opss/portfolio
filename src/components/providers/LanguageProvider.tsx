"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { portfolio, type PortfolioConfig } from "@/config/portfolio";
import { portfolioSk } from "@/config/portfolio.sk";
import { uiStrings, type Locale, type UIStrings } from "@/config/i18n";

interface LanguageContextValue {
  lang: Locale;
  setLang: (l: Locale) => void;
  toggle: () => void;
  content: PortfolioConfig;
  ui: UIStrings;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "portfolio-lang";

const configs: Record<Locale, PortfolioConfig> = {
  en: portfolio,
  sk: portfolioSk,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  // English is the default (international recruiters); overridden from storage.
  const [lang, setLangState] = useState<Locale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === "en" || stored === "sk") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((l: Locale) => setLangState(l), []);
  const toggle = useCallback(
    () => setLangState((p) => (p === "en" ? "sk" : "en")),
    [],
  );

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, toggle, content: configs[lang], ui: uiStrings[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
