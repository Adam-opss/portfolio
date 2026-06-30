"use client";

import { getIcon } from "@/lib/icons";

interface MarqueeProps {
  items: { name: string; icon: string }[];
}

/**
 * Infinite, edge-faded marquee of tech items. The track is duplicated and
 * translated -50% so the loop is seamless. Pauses on hover.
 */
export function Marquee({ items }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div
      className="group relative flex overflow-hidden border-y border-border py-5"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row.map((item, i) => {
          const Icon = getIcon(item.icon);
          return (
            <span
              key={i}
              className="flex items-center gap-2.5 text-muted transition-colors hover:text-foreground"
            >
              <Icon className="h-5 w-5" />
              <span className="whitespace-nowrap font-display text-lg font-medium">
                {item.name}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
