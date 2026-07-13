"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scene 4 — OUR PROFILE / OUR PRODUCT (surface: light).
 * Figma: dua kaos raksasa bleeding (gray kiri, green kanan) + dua kolom teks.
 * Storyboard: grup KIRI (kaos+teks+button) slide-in dari kiri, grup KANAN
 * slide-in dari kanan saat masuk. Easing sinematik (landonorris feel).
 */
export default function ProfileProduct() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // bleed hanya untuk kaos (bukan teks) — xPercent di-own gsap agar tak
      // bentrok dgn transform tailwind.
      gsap.set('[data-bleed="left"]', { xPercent: -32 });
      gsap.set('[data-bleed="right"]', { xPercent: 32 });

      if (reduce) {
        gsap.set("[data-side]", { autoAlpha: 1, x: 0 });
        return;
      }
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 68%" },
      });
      tl.from(
        '[data-side="left"]',
        { x: -140, autoAlpha: 0, duration: 1.1, ease: "power3.out" },
        0
      ).from(
        '[data-side="right"]',
        { x: 140, autoAlpha: 0, duration: 1.1, ease: "power3.out" },
        0.08
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      data-scene="light"
      className="relative flex min-h-[100svh] items-center overflow-hidden py-28"
      aria-label="Our Profile / Our Product"
    >
      {/* kaos bleeding — tinggi sama + center vertikal (my-auto) → sejajar */}
      <div
        data-side="left"
        data-bleed="left"
        className="pointer-events-none absolute bottom-0 left-0 top-0 my-auto h-[60svh] w-auto"
      >
        <Image
          src="/img/shirt-gray.png"
          alt=""
          width={701}
          height={648}
          className="h-full w-auto object-contain"
        />
      </div>
      <div
        data-side="right"
        data-bleed="right"
        className="pointer-events-none absolute bottom-0 right-0 top-0 my-auto h-[60svh] w-auto"
      >
        <Image
          src="/img/shirt-green.png"
          alt=""
          width={326}
          height={588}
          className="h-full w-auto object-contain"
        />
      </div>

      {/* dua kolom teks */}
      <div className="relative mx-auto grid w-full max-w-[720px] grid-cols-2 gap-10 px-6">
        {/* OUR PROFILE */}
        <div data-side="left" className="text-right">
          <div className="relative inline-block text-left">
            <span className="block font-serif text-h3 leading-none text-fg">Our</span>
            <span
              aria-hidden
              className="pointer-events-none absolute -top-2 left-2 -rotate-6 font-brush text-h2 text-accent"
            >
              our
            </span>
            <h2 className="font-display text-h1 font-black uppercase leading-[0.9] tracking-tight text-fg">
              Profile
            </h2>
          </div>
          <p className="mt-3 font-body text-p2 leading-snug text-fg-dim">
            Aktivitas, acara, dan riwayat brand kami yang paling baru.
          </p>
          <a
            href="/about"
            aria-label="Lihat profil"
            className="mt-4 inline-grid h-12 w-12 place-items-center rounded-lg bg-lime text-ink transition-transform duration-micro hover:scale-105"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M11 5 4 12l7 7M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* OUR PRODUCT */}
        <div data-side="right" className="text-left">
          <div className="relative inline-block">
            <span className="block font-serif text-h3 leading-none text-fg">Our</span>
            <h2 className="font-display text-h1 font-black uppercase leading-[0.9] tracking-tight text-fg">
              Product
            </h2>
          </div>
          <p className="mt-3 font-body text-p2 leading-snug text-fg-dim">
            Galeri produk, desain, dan rilis kami — selengkapnya.
          </p>
          <a
            href="/product"
            aria-label="Lihat produk"
            className="mt-4 inline-grid h-12 w-12 place-items-center rounded-lg bg-lime text-ink transition-transform duration-micro hover:scale-105"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M13 5l7 7-7 7M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
