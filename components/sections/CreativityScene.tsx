"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TShirtViewer = dynamic(() => import("@/components/hero/TShirtViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  ),
});

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function CreativityScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const shirtRef = useRef<HTMLDivElement>(null);
  const creaRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    // Initial positioning for shirt container
    if (shirtRef.current) {
      gsap.set(shirtRef.current, {
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: reduce ? 0.7 : 1.1,
        transformOrigin: "center center",
      });
    }

    // Marquee continuous loop
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
        // Kaos zoom-out: 1.1 -> 0.65
        if (shirtRef.current) {
          gsap.set(shirtRef.current, { scale: lerp(1.1, 0.65, p) });
        }
        // CREATIVITY fade-in di p 0.12–0.5
        const a = gsap.utils.clamp(0, 1, (p - 0.12) / 0.38);
        // Draw-on wipe kiri→kanan di p 0.15–0.8
        const vp = gsap.utils.clamp(0, 1, (p - 0.15) / 0.65);
        if (creaRef.current) {
          gsap.set(creaRef.current, {
            autoAlpha: a,
            clipPath: `inset(0 ${(100 - vp * 100).toFixed(1)}% 0 0)`,
          });
        }
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
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
        {/* Marquee di belakang */}
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

        {/* Kaos 3D interaktif — centered & drag to rotate */}
        <div
          ref={shirtRef}
          className="absolute left-1/2 top-1/2 z-10 aspect-square w-[48vw] max-w-[600px] min-w-[320px] -translate-x-1/2 -translate-y-1/2"
        >
          <TShirtViewer className="h-full w-full" />
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
