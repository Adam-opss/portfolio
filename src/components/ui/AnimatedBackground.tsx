import { Particles } from "./Particles";

/**
 * Ambient page background: layered gradient blobs, a faint grid, and a global
 * particle field. Fixed behind all content so the moving dots are visible in
 * every section while you scroll - one viewport-sized canvas keeps it cheap.
 */
export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base wash */}
      <div className="absolute inset-0 bg-bg" />

      {/* Gradient blobs */}
      <div className="absolute -left-40 top-[-10%] h-[42rem] w-[42rem] rounded-full bg-accent-blue/[0.08] blur-[140px] animate-float-slow" />
      <div className="absolute right-[-15%] top-[20%] h-[38rem] w-[38rem] rounded-full bg-accent-blue/[0.06] blur-[150px] animate-float" />
      <div className="absolute bottom-[-10%] left-[30%] h-[34rem] w-[34rem] rounded-full bg-accent-blue/[0.05] blur-[140px] animate-float-slow" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* Global moving particle field */}
      <Particles className="absolute inset-0 h-full w-full" quantity={90} />

      {/* Vignette to deepen edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.5))]" />
    </div>
  );
}
