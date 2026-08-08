"use client";

import { useEffect, useRef } from "react";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

interface Particles3DProps {
  /** Particle count on desktop; reduced automatically on mobile. */
  quantity?: number;
  className?: string;
}

/**
 * Interactive 3D particle field (Three.js). A depth-sorted cloud of points
 * wired into a faint network of lines, slowly auto-rotating and following the
 * pointer with parallax. Colour tracks the theme via the --particle CSS
 * variable. Three.js is imported dynamically so it never blocks first paint,
 * and the whole thing is skipped for reduced-motion users.
 */
export function Particles3D({ quantity = 700, className }: Particles3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (reduced) return;
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed || !containerRef.current) return;

      const count = isMobile ? Math.floor(quantity / 2.6) : quantity;
      const spreadX = 1500;
      const spreadY = 950;
      const spreadZ = 650;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        5000,
      );
      camera.position.z = 1000;

      const group = new THREE.Group();
      scene.add(group);

      // Point positions.
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 2 * spreadX;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2 * spreadY;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2 * spreadZ;
      }

      // Soft round sprite so points render as dots, not squares.
      const sprite = (() => {
        const c = document.createElement("canvas");
        c.width = c.height = 64;
        const g = c.getContext("2d")!;
        const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
        grd.addColorStop(0, "rgba(255,255,255,1)");
        grd.addColorStop(0.45, "rgba(255,255,255,0.55)");
        grd.addColorStop(1, "rgba(255,255,255,0)");
        g.fillStyle = grd;
        g.fillRect(0, 0, 64, 64);
        const tex = new THREE.CanvasTexture(c);
        return tex;
      })();

      const pointsGeo = new THREE.BufferGeometry();
      pointsGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      const pointsMat = new THREE.PointsMaterial({
        size: 9,
        map: sprite,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        sizeAttenuation: true,
        blending: THREE.NormalBlending,
      });
      const points = new THREE.Points(pointsGeo, pointsMat);
      group.add(points);

      // Fixed-topology network: connect nearby points once, then let the
      // whole group rotate together (cheap, no per-frame recomputation).
      const linePairs: number[] = [];
      const maxLines = isMobile ? 500 : 1500;
      const threshold = 210;
      const threshold2 = threshold * threshold;
      outer: for (let i = 0; i < count; i++) {
        const ax = positions[i * 3];
        const ay = positions[i * 3 + 1];
        const az = positions[i * 3 + 2];
        for (let j = i + 1; j < count; j++) {
          const dx = ax - positions[j * 3];
          const dy = ay - positions[j * 3 + 1];
          const dz = az - positions[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < threshold2) {
            linePairs.push(
              ax,
              ay,
              az,
              positions[j * 3],
              positions[j * 3 + 1],
              positions[j * 3 + 2],
            );
            if (linePairs.length / 6 >= maxLines) break outer;
          }
        }
      }
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(linePairs), 3),
      );
      const lineMat = new THREE.LineBasicMaterial({
        transparent: true,
        opacity: 0.13,
        depthWrite: false,
      });
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      group.add(lines);

      // Colour follows the theme (--particle is "r g b" channels).
      const applyColor = () => {
        const v = getComputedStyle(document.documentElement)
          .getPropertyValue("--particle")
          .trim();
        const parts = v.split(/[\s,]+/).map(Number);
        if (parts.length >= 3 && parts.every((n) => !Number.isNaN(n))) {
          const col = new THREE.Color(
            parts[0] / 255,
            parts[1] / 255,
            parts[2] / 255,
          );
          pointsMat.color.copy(col);
          lineMat.color.copy(col);
        }
      };
      applyColor();
      const themeObserver = new MutationObserver(applyColor);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      // Pointer parallax.
      const target = { x: 0, y: 0 };
      const current = { x: 0, y: 0 };
      const onMove = (e: MouseEvent) => {
        target.x = (e.clientX / window.innerWidth - 0.5) * 2;
        target.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMove);

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      let raf = 0;
      let autoY = 0;
      const render = () => {
        autoY += 0.0006;
        current.x += (target.x - current.x) * 0.045;
        current.y += (target.y - current.y) * 0.045;
        group.rotation.y = autoY + current.x * 0.4;
        group.rotation.x = current.y * 0.28;
        group.position.x = current.x * 60;
        group.position.y = -current.y * 40;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(render);
      };

      const onVisibility = () => {
        if (document.hidden) {
          cancelAnimationFrame(raf);
        } else {
          raf = requestAnimationFrame(render);
        }
      };
      document.addEventListener("visibilitychange", onVisibility);

      render();

      cleanup = () => {
        cancelAnimationFrame(raf);
        themeObserver.disconnect();
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
        pointsGeo.dispose();
        pointsMat.dispose();
        lineGeo.dispose();
        lineMat.dispose();
        sprite.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [quantity, reduced, isMobile]);

  if (reduced) return null;

  return <div ref={containerRef} aria-hidden className={className} />;
}
