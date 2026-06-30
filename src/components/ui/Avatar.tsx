"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarProps {
  /** Image path (e.g. "/profile.jpg" placed in /public) or remote URL. */
  src?: string;
  name: string;
  alt?: string;
  className?: string;
  /** Keep the photo greyscale until hovered (matches the monochrome theme). */
  interactive?: boolean;
  /** Force greyscale with no hover reveal (e.g. in the hero where there is no
   *  group to hover). Wins over `interactive`. */
  mono?: boolean;
  /** object-position for the crop, e.g. "50% 25%" to favour the face. */
  objectPosition?: string;
  /** Custom node shown when there is no photo (defaults to a monogram). */
  fallback?: ReactNode;
}

/**
 * Profile photo with a graceful fallback. If `src` is empty or fails to load,
 * a tasteful monogram placeholder is shown instead - so the layout never
 * breaks before a real photo is added.
 */
export function Avatar({
  src,
  name,
  alt,
  className,
  interactive = true,
  mono = false,
  objectPosition,
  fallback,
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Catch images that already failed before the onError listener attached
  // (e.g. during SSR / hydration) - a broken img reports naturalWidth 0.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (src && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={imgRef}
        src={src}
        alt={alt ?? name}
        loading="lazy"
        onError={() => setFailed(true)}
        style={objectPosition ? { objectPosition } : undefined}
        className={cn(
          "h-full w-full object-cover",
          mono && "grayscale",
          !mono &&
            interactive &&
            "grayscale transition-[filter,transform] duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]",
          className,
        )}
      />
    );
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div
      title="Add a photo: drop profile.jpg into /public"
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-surface-2 to-surface",
        className,
      )}
    >
      {/* faint grid texture */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 45%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 45%, black, transparent 75%)",
        }}
      />
      {/* soft spotlight */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 38%, rgba(255,255,255,0.06), transparent 55%)",
        }}
      />
      <div className="relative flex flex-col items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface/70 shadow-soft">
          <UserRound className="h-7 w-7 text-muted" strokeWidth={1.5} />
        </span>
        <span className="font-display text-5xl font-bold tracking-tight text-foreground/85">
          {initials}
        </span>
      </div>
    </div>
  );
}
