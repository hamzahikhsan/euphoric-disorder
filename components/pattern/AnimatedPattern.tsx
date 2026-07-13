"use client";

import { useEffect, useRef } from "react";

/**
 * SATU animation pattern (gelombang topografi) untuk KESELURUHAN home page.
 * Di-port dari Claude Design "Wave Background" (canvas), lalu disesuaikan:
 *  - warna garis ikut SURFACE GLOBAL kita (data-surface di <html>), bukan
 *    prefers-color-scheme. Light → garis ink; dark → garis bone.
 *  - crossfade warna garis (themeMix) di-ease agar sinkron dgn transisi BG.
 *  - canvas TRANSPARAN (bg tetap var(--bg) di body) → transisi kontras mulus.
 *  - hormati prefers-reduced-motion (gambar 1 frame statis, tanpa loop).
 */
const LIGHT_RGB = [40, 44, 32]; // --ink
const DARK_RGB = [237, 235, 221]; // --bone

export default function AnimatedPattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0;
    let H = 0;
    const resize = () => {
      W = canvas.width = Math.floor(window.innerWidth * dpr);
      H = canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    // target/eased mix antara light(0) & dark(1) berdasar surface global
    const readDark = () =>
      document.documentElement.dataset.surface === "dark" ? 1 : 0;
    let target = readDark();
    let mix = target;
    const mo = new MutationObserver(() => {
      target = readDark();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-surface"],
    });

    const density = 20;
    const start = performance.now();
    let raf = 0;

    const drawFrame = (now: number) => {
      // ease mix menuju target (~0.6s)
      mix += (target - mix) * 0.06;
      const r = Math.round(LIGHT_RGB[0] + (DARK_RGB[0] - LIGHT_RGB[0]) * mix);
      const g = Math.round(LIGHT_RGB[1] + (DARK_RGB[1] - LIGHT_RGB[1]) * mix);
      const b = Math.round(LIGHT_RGB[2] + (DARK_RGB[2] - LIGHT_RGB[2]) * mix);
      const baseAlpha = 0.14 + 0.03 * mix;
      const rgb = `${r},${g},${b}`;

      const t = reduce ? 0 : ((now - start) / 1000) * 0.85;

      ctx.clearRect(0, 0, W, H);
      const step = 9 * dpr;
      for (let i = 0; i < density; i++) {
        const p = i / (density - 1);
        const drift = Math.sin(t * 0.18 + i * 0.6) * (H * 0.012);
        const baseY = p * H * 1.04 - H * 0.02 + drift;
        const amp = H * 0.055 * (0.45 + 0.55 * Math.sin(p * Math.PI));
        ctx.beginPath();
        for (let x = 0; x <= W; x += step) {
          const xf = x / W;
          const y =
            baseY +
            Math.sin(xf * 6.2832 * 1.4 + t * 0.42 + i * 0.5) * amp +
            Math.sin(xf * 6.2832 * 3.1 + t * 0.27 + i * 0.9) * amp * 0.38 +
            Math.sin(xf * 6.2832 * 0.7 - t * 0.19 + i * 0.3) * amp * 0.55;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const fade = 0.55 + 0.45 * Math.sin(p * Math.PI);
        ctx.strokeStyle = `rgba(${rgb},${(baseAlpha * fade).toFixed(3)})`;
        ctx.lineWidth = 1.15 * dpr;
        ctx.stroke();
      }
    };

    if (reduce) {
      // gambar sekali; redraw saat surface/resize berubah
      const once = () => drawFrame(performance.now());
      once();
      const mo2 = new MutationObserver(() => {
        mix = target; // langsung
        once();
      });
      mo2.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-surface"],
      });
      window.addEventListener("resize", once);
      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("resize", once);
        mo.disconnect();
        mo2.disconnect();
      };
    }

    const loop = (now: number) => {
      drawFrame(now);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      mo.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 block h-full w-full"
    />
  );
}
