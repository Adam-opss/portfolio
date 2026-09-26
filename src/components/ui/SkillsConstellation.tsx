"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const PALETTE = [
  "#3b82f6", "#10b981", "#f59e0b", "#a855f7",
  "#ef4444", "#ec4899", "#06b6d4", "#eab308",
];

interface Tip {
  x: number;
  y: number;
  lines: string[];
}

/** Interactive 3D "constellation" of skills: category hubs on a sphere, each
 *  wired to its skills, sized by proficiency and coloured by category. Orbit to
 *  explore, hover a node for its level. Falls back silently if WebGL is absent. */
export function SkillsConstellation() {
  const { content, ui, lang } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);
  const skills = content.skills;

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
        if (disposed || !containerRef.current) return;

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
        const camera = new THREE.PerspectiveCamera(55, w / h, 1, 2000);
        camera.position.set(120, 70, 240);

        const group = new THREE.Group();
        scene.add(group);

        const disposables: { dispose: () => void }[] = [];
        const sphere = new THREE.SphereGeometry(1, 18, 18);
        disposables.push(sphere);

        const R = 92;
        const fib = (i: number, n: number, r: number) => {
          const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
          const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
          return new THREE.Vector3(
            r * Math.cos(theta) * Math.sin(phi),
            r * Math.sin(theta) * Math.sin(phi),
            r * Math.cos(phi),
          );
        };
        const jitter = (rad: number) =>
          new THREE.Vector3(
            (Math.random() - 0.5) * rad,
            (Math.random() - 0.5) * rad,
            (Math.random() - 0.5) * rad,
          );

        const pickable: InstanceType<typeof THREE.Object3D>[] = [];
        const linePts: number[] = [];

        skills.forEach((cat, ci) => {
          const color = PALETTE[ci % PALETTE.length];
          const hubPos = fib(ci, skills.length, R);

          // Hub node.
          const hubMat = new THREE.MeshBasicMaterial({ color });
          disposables.push(hubMat);
          const hub = new THREE.Mesh(sphere, hubMat);
          hub.position.copy(hubPos);
          hub.scale.setScalar(5.5);
          group.add(hub);
          linePts.push(0, 0, 0, hubPos.x, hubPos.y, hubPos.z);

          cat.skills.forEach((sk) => {
            const pos = hubPos
              .clone()
              .multiplyScalar(1.5)
              .add(jitter(46));
            const mat = new THREE.MeshBasicMaterial({ color });
            disposables.push(mat);
            const node = new THREE.Mesh(sphere, mat);
            node.position.copy(pos);
            node.scale.setScalar(2.2 + (sk.level / 100) * 3.6);
            node.userData = {
              lines: [
                sk.name,
                cat.label,
                `${ui.skills.proficiency[sk.proficiency]} · ${sk.level}%`,
              ],
            };
            group.add(node);
            pickable.push(node);
            linePts.push(hubPos.x, hubPos.y, hubPos.z, pos.x, pos.y, pos.z);
          });
        });

        // Central anchor node.
        const coreMat = new THREE.MeshBasicMaterial({ color: "#e5e7eb" });
        disposables.push(coreMat);
        const core = new THREE.Mesh(sphere, coreMat);
        core.scale.setScalar(3);
        group.add(core);

        // Connecting lines.
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute(
          "position",
          new THREE.BufferAttribute(new Float32Array(linePts), 3),
        );
        const lineMat = new THREE.LineBasicMaterial({
          color: "#8a8b93",
          transparent: true,
          opacity: 0.16,
        });
        disposables.push(lineGeo, lineMat);
        group.add(new THREE.LineSegments(lineGeo, lineMat));

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.enablePan = false;
        controls.minDistance = 130;
        controls.maxDistance = 460;
        controls.autoRotate = !reduced;
        controls.autoRotateSpeed = 0.6;

        // Hover picking.
        const ray = new THREE.Raycaster();
        const ndc = new THREE.Vector2();
        const onMove = (e: MouseEvent) => {
          const r = renderer.domElement.getBoundingClientRect();
          ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
          ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
          ray.setFromCamera(ndc, camera);
          const hit = ray.intersectObjects(pickable, false)[0];
          if (hit) {
            setTip({
              x: e.clientX - r.left,
              y: e.clientY - r.top,
              lines: (hit.object.userData as { lines: string[] }).lines,
            });
            renderer.domElement.style.cursor = "pointer";
          } else {
            setTip(null);
            renderer.domElement.style.cursor = "grab";
          }
        };
        const onLeave = () => setTip(null);
        renderer.domElement.addEventListener("mousemove", onMove);
        renderer.domElement.addEventListener("mouseleave", onLeave);

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
          renderer.domElement.removeEventListener("mousemove", onMove);
          renderer.domElement.removeEventListener("mouseleave", onLeave);
          controls.dispose();
          disposables.forEach((d) => d.dispose());
          renderer.dispose();
          if (renderer.domElement.parentNode === container)
            container.removeChild(renderer.domElement);
        };
      } catch {
        /* WebGL unavailable: the List view remains fully usable. */
      }
    })();

    return () => {
      disposed = true;
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, content]);

  return (
    <div>
      <div
        className="relative overflow-hidden rounded-3xl border border-border shadow-soft"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #12151d 0%, #0a0b10 70%)",
        }}
      >
        <div
          ref={containerRef}
          className="h-[400px] w-full touch-none sm:h-[480px]"
        />
        <span className="pointer-events-none absolute bottom-3 right-3 font-mono text-[11px] text-white/40">
          {lang === "sk"
            ? "Ťahaj pre otočenie · hover na uzol"
            : "Drag to rotate · hover a node"}
        </span>
        {tip && (
          <div
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded-lg border border-border bg-surface px-2.5 py-1.5 text-[11px] leading-relaxed shadow-soft"
            style={{ left: tip.x, top: tip.y }}
          >
            {tip.lines.map((l, i) => (
              <div
                key={i}
                className={i === 0 ? "font-medium text-foreground" : "text-muted"}
              >
                {l}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category legend */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 px-1">
        {skills.map((cat, i) => (
          <span key={cat.id} className="flex items-center gap-1.5 text-xs text-muted">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: PALETTE[i % PALETTE.length] }}
            />
            {cat.label}
          </span>
        ))}
      </div>
    </div>
  );
}
