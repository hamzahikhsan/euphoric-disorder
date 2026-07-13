"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Smooth scroll (Lenis) + integrasi GSAP ScrollTrigger (canonical setup):
 * Lenis menggerakkan scroll, ScrollTrigger.update dipanggil tiap scroll, dan
 * lenis.raf didorong oleh gsap.ticker. Dasar untuk semua scene pin/scrub.
 * Hormati prefers-reduced-motion → Lenis mati (scroll native), scene pakai
 * fallback statis masing-masing.
 */
export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    // handle utk debugging/anchor scroll
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    (window as unknown as { __ST?: typeof ScrollTrigger }).__ST = ScrollTrigger;

    // Recalibrasi posisi trigger setelah layout settle (font/gambar async +
    // section tinggi). Tanpa ini, start/end bisa salah → reveal tak jalan.
    const refresh = () => ScrollTrigger.refresh();
    const t1 = setTimeout(refresh, 300);
    window.addEventListener("load", refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);

    return () => {
      clearTimeout(t1);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return null;
}
