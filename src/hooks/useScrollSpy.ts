"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently nearest the top of the viewport.
 * Used to highlight the active nav link.
 */
export function useScrollSpy(ids: string[], offset = 120): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const handler = () => {
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ids, offset]);

  return active;
}
