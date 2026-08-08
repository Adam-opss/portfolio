"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

interface ClusterPoint {
  x: number;
  y: number;
  z: number;
  c: number;
}
interface ClusterData {
  explainedVariance: number[];
  total: number;
  counts: Record<string, number>;
  points: ClusterPoint[];
}

/** Colour per DBSCAN cluster: the normal mass and noise stay grey, the six
 *  suspicious micro-clusters pop in colour so the story reads at a glance. */
const COLORS: Record<number, string> = {
  [-1]: "#6b7280",
  0: "#9aa4b2",
  1: "#3b82f6",
  2: "#f59e0b",
  3: "#10b981",
  4: "#a855f7",
  5: "#ef4444",
  6: "#ec4899",
};

const NAMES: Record<"en" | "sk", Record<number, string>> = {
  en: {
    [-1]: "Noise",
    0: "Normal behaviour",
    1: "Financial dominance",
    2: "Cover bidding",
    3: "Preferred winner",
    4: "Price fixing",
    5: "Bid rotation",
    6: "Bid suppression",
  },
  sk: {
    [-1]: "Šum",
    0: "Normálne správanie",
    1: "Finančná dominancia",
    2: "Krycie ponuky",
    3: "Preferovaný víťaz",
    4: "Cenová fixácia",
    5: "Rotácia víťazov",
    6: "Potlačenie ponúk",
  },
};

const ORDER = [0, -1, 1, 2, 3, 4, 5, 6];

export function ThesisClusters3D() {
  const { lang } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [meta, setMeta] = useState<ClusterData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      try {
        const THREE = await import("three");
        const { OrbitControls } = await import(
          "three/examples/jsm/controls/OrbitControls.js"
        );
        const res = await fetch("/thesis/dbscan-3d.json");
        if (!res.ok) throw new Error("data");
        const data: ClusterData = await res.json();
        if (disposed || !containerRef.current) return;
        setMeta(data);

        const w = container.clientWidth;
        const h = container.clientHeight;

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setSize(w, h);
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, w / h, 1, 2000);
        camera.position.set(150, 90, 230);

        // Soft round sprite for dots.
        const sprite = (() => {
          const c = document.createElement("canvas");
          c.width = c.height = 64;
          const g = c.getContext("2d")!;
          const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
          grd.addColorStop(0, "rgba(255,255,255,1)");
          grd.addColorStop(0.45, "rgba(255,255,255,0.6)");
          grd.addColorStop(1, "rgba(255,255,255,0)");
          g.fillStyle = grd;
          g.fillRect(0, 0, 64, 64);
          return new THREE.CanvasTexture(c);
        })();

        const disposables: { dispose: () => void }[] = [sprite];

        // One Points object per cluster (8 draw calls, trivial).
        const byCluster = new Map<number, ClusterPoint[]>();
        for (const p of data.points) {
          const arr = byCluster.get(p.c) ?? [];
          arr.push(p);
          byCluster.set(p.c, arr);
        }
        byCluster.forEach((pts, c) => {
          const suspicious = c > 0;
          const positions = new Float32Array(pts.length * 3);
          pts.forEach((p, i) => {
            positions[i * 3] = p.x;
            positions[i * 3 + 1] = p.y;
            positions[i * 3 + 2] = p.z;
          });
          const geo = new THREE.BufferGeometry();
          geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
          const mat = new THREE.PointsMaterial({
            size: suspicious ? 6.5 : c === -1 ? 3 : 3.4,
            map: sprite,
            color: new THREE.Color(COLORS[c] ?? "#9aa4b2"),
            transparent: true,
            opacity: suspicious ? 1 : c === -1 ? 0.5 : 0.75,
            depthWrite: false,
            sizeAttenuation: true,
          });
          disposables.push(geo, mat);
          scene.add(new THREE.Points(geo, mat));
        });

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.enablePan = false;
        controls.minDistance = 130;
        controls.maxDistance = 480;
        controls.autoRotate = !reduced;
        controls.autoRotateSpeed = 0.55;
        controls.target.set(0, 0, 0);

        let raf = 0;
        const render = () => {
          controls.update();
          renderer.render(scene, camera);
          raf = requestAnimationFrame(render);
        };

        const onResize = () => {
          const nw = container.clientWidth;
          const nh = container.clientHeight;
          camera.aspect = nw / nh;
          camera.updateProjectionMatrix();
          renderer.setSize(nw, nh);
        };
        window.addEventListener("resize", onResize);

        const onVisibility = () => {
          if (document.hidden) cancelAnimationFrame(raf);
          else raf = requestAnimationFrame(render);
        };
        document.addEventListener("visibilitychange", onVisibility);

        render();

        cleanup = () => {
          cancelAnimationFrame(raf);
          window.removeEventListener("resize", onResize);
          document.removeEventListener("visibilitychange", onVisibility);
          controls.dispose();
          disposables.forEach((d) => d.dispose());
          renderer.dispose();
          if (renderer.domElement.parentNode === container)
            container.removeChild(renderer.domElement);
        };
      } catch {
        if (!disposed) setFailed(true);
      }
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [reduced]);

  const t = {
    hint:
      lang === "sk"
        ? "Ťahaj pre otočenie · koliesko približuje"
        : "Drag to rotate · scroll to zoom",
    variance:
      lang === "sk" ? "% rozptylu v 3 osiach" : "% of variance across 3 axes",
  };

  // Fallback to the static chart if WebGL/data fails.
  if (failed) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-white p-3 shadow-soft">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/thesis/dbscan-clusters.png"
          alt="DBSCAN clusters"
          loading="lazy"
          className="w-full rounded-lg"
        />
      </div>
    );
  }

  const varSum = meta
    ? Math.round(meta.explainedVariance.reduce((a, b) => a + b, 0))
    : null;

  return (
    <div>
      <div
        className="relative overflow-hidden rounded-2xl border border-border shadow-soft"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #12151d 0%, #0a0b10 70%)",
        }}
      >
        <div
          ref={containerRef}
          className="h-[380px] w-full touch-none sm:h-[460px]"
        />
        {varSum !== null && (
          <span className="pointer-events-none absolute left-3 top-3 font-mono text-[11px] text-white/45">
            PC1 · PC2 · PC3 — {varSum}
            {t.variance}
          </span>
        )}
        <span className="pointer-events-none absolute bottom-3 right-3 font-mono text-[11px] text-white/40">
          {t.hint}
        </span>
      </div>

      {/* Legend */}
      {meta && (
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 px-1">
          {ORDER.map((c) => (
            <span key={c} className="flex items-center gap-1.5 text-xs text-muted">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: COLORS[c] }}
              />
              {NAMES[lang][c]}{" "}
              <span className="text-muted/60">({meta.counts[String(c)]})</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
