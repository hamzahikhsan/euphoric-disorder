"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
 * Catatan: video brush "creativity.mp4" (opaque, lime-on-black) tidak dipakai
 * sebagai overlay karena mix-blend-screen tak reliabel (kotak hitam akibat
 * stacking context). Diganti teks brush + reveal wipe yg lebih robust. Kalau
 * mau brush-stroke persis, perlu WebM/HEVC beralpha — bisa menyusul.
 */

/**
 * Scene 2 — "CREATIVITY reveal" (storyboard). Section tinggi dengan panel yang
 * di-pin (sticky). Saat scroll:
 *  - kaos hero "zoom-out" (mengecil) → tinggal kaos tanpa tulisan,
 *  - teks "CREATIVITY" (video brush lime aslimu, mix-blend-screen) draw-on
 *    ter-scrub oleh scroll,
 *  - teks marquee berjalan terus di belakang (loop, lepas dari scroll).
 * Fallback prefers-reduced-motion: tampilkan state akhir statis.
 */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function CreativityScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const shirtRef = useRef<HTMLDivElement>(null);
  const creaRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    // marquee loop (independen scroll)
    let marqueeTween: gsap.core.Tween | null = null;
    if (marqueeRef.current && !reduce) {
      marqueeTween = gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 24,
        repeat: -1,
      });
    }

    if (reduce) {
      // state akhir statis
      gsap.set(shirtRef.current, { scale: 0.62 });
      gsap.set(creaRef.current, { autoAlpha: 1, clipPath: "inset(0 0% 0 0)" });
      return () => {
        marqueeTween?.kill();
      };
    }

    const st = ScrollTrigger.create({
      trigger: sceneRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        // kaos zoom-out: 1.15 → 0.6
        gsap.set(shirtRef.current, { scale: lerp(1.15, 0.6, p) });
        // CREATIVITY fade-in di p 0.12–0.5
        const a = gsap.utils.clamp(0, 1, (p - 0.12) / 0.38);
        // draw-on wipe kiri→kanan di p 0.15–0.8
        const vp = gsap.utils.clamp(0, 1, (p - 0.15) / 0.65);
        gsap.set(creaRef.current, {
          autoAlpha: a,
          clipPath: `inset(0 ${(100 - vp * 100).toFixed(1)}% 0 0)`,
        });
      },
    });

    return () => {
      marqueeTween?.kill();
      st.kill();
    };
  }, []);

  return (
    <section
      ref={sceneRef}
      data-scene="dark"
      className="relative h-[260vh]"
      aria-label="Creativity"
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {/* marquee di belakang */}
        <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap font-display text-[15vw] font-black uppercase leading-none tracking-tight text-fg opacity-[0.06]"
          >
            <span className="px-6">
              Euphoric · Disorder · Comedy · Criminologist · Creativity ·
            </span>
            <span className="px-6" aria-hidden>
              Euphoric · Disorder · Comedy · Criminologist · Creativity ·
            </span>
          </div>
        </div>

        {/* kaos zoom-out */}
        <div
          ref={shirtRef}
          className="pointer-events-none absolute z-10 w-[34%] min-w-[260px]"
        >
          <Image
            src="/img/shirt-gray.png"
            alt=""
            width={673}
            height={550}
            className="h-auto w-full drop-shadow-2xl"
          />
        </div>

        {/* CREATIVITY draw-on (teks brush lime, reveal wipe) */}
        <div
          ref={creaRef}
          className="pointer-events-none absolute z-20 w-full px-6 text-center opacity-0"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <span className="font-brush text-[clamp(3.5rem,13vw,12rem)] leading-none text-accent drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
            creativity
          </span>
        </div>
      </div>
    </section>
  );
}
