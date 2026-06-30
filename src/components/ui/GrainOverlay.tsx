/**
 * Full-screen film-grain texture. A fixed, non-interactive layer of fractal
 * noise at very low opacity - kills the "flat digital" look and adds an analog,
 * premium feel. Rendered above content but blended so it never hurts contrast.
 */
const noise =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/>
        <feColorMatrix type='saturate' values='0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`,
  );

export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[950] opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage: `url("${noise}")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
