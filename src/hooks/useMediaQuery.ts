"use client";

import { useEffect, useState } from "react";

/** Subscribe to a CSS media query and re-render on change. SSR-safe. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True when the user prefers reduced motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True on touch / small viewports - used to disable cursor + heavy effects. */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px)");
}
