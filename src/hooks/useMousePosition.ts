"use client";

import { useEffect, useState } from "react";

export interface MousePosition {
  x: number;
  y: number;
}

/** Tracks the global pointer position (client coordinates). */
export function useMousePosition(): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return pos;
}
