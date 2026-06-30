"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  className?: string;
}

/** Cycles through `words` with a typing + deleting effect and a blinking caret. */
export function Typewriter({
  words,
  typingSpeed = 75,
  deletingSpeed = 40,
  pause = 1500,
  className,
}: TypewriterProps) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) {
      setText(words[0] ?? "");
      return;
    }
    const current = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting
              ? current.slice(0, prev.length - 1)
              : current.slice(0, prev.length + 1),
          );
        },
        deleting ? deletingSpeed : typingSpeed,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pause, reduced]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block w-[2px] -translate-y-[2px] bg-accent-cyan align-middle animate-blink">
        &nbsp;
      </span>
    </span>
  );
}
