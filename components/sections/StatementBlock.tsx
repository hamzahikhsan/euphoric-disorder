"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scene 2b — blok statement besar (posisi "DISORDER ADWDHI…" di Figma).
 * Copy Figma masih lorem → diganti statement brand DRAFT (voice deadpan-
 * forensik). ⚠️ TODO(copy): konfirmasi teks final dgn user.
 * Kata beraksen memakai lime; sisanya cream. Reveal per-baris saat masuk.
 */
export default function StatementBlock() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !ref.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const lines = ref.current.querySelectorAll("[data-line]");
    const anim = gsap.fromTo(
      lines,
      { yPercent: 55, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "top 42%",
          scrub: true,
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <section
      data-scene="dark"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 py-32"
    >
      <div
        ref={ref}
        className="mx-auto max-w-content font-display text-[clamp(2.25rem,6vw,5.25rem)] font-black uppercase leading-[1.02] tracking-tight"
      >
        <p data-line className="text-fg">
          <span className="text-accent">Disorder</span> bukan cacat.
        </p>
        <p data-line className="text-fg">
          Ia <span className="text-accent">barang bukti</span>.
        </p>
        <p data-line className="text-fg">
          Tiap sablon satu <span className="text-accent">berkas perkara</span> —
        </p>
        <p data-line className="text-fg">
          comedy, criminology, &amp; <span className="text-accent">creativity</span>
        </p>
        <p data-line className="text-fg">
          yang ditekan ke katun.
        </p>
      </div>
    </section>
  );
}
