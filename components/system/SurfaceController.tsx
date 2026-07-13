"use client";

import { useEffect } from "react";

/**
 * Satu sumber "surface" untuk seluruh home page. Pada tiap scroll (throttle rAF)
 * mencari section [data-scene="light|dark"] yang menutupi GARIS REFERENSI di
 * ~12% tinggi viewport, lalu men-set data-surface di <html>. Token
 * --bg/--fg/--nav-fg + AnimatedPattern semuanya ikut flip bersama (storyboard).
 *
 * Pendekatan scroll-based (bukan IntersectionObserver band tipis) supaya tahan
 * terhadap lompatan/scroll cepat — tidak ada crossing yang terlewat.
 */
export default function SurfaceController() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scene]")
    );
    if (!sections.length) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.12;
      let current: string | null = null;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) {
          current = s.getAttribute("data-scene");
        }
      }
      if (current && document.documentElement.dataset.surface !== current) {
        document.documentElement.dataset.surface = current;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
