"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scene 5 — CREATIVITY / PART OF OUTFIT (surface: dark/olive).
 * Figma: banner editorial + heading + grid kartu kaos "WarOnDrugs 24s".
 * Kartu di-reveal staggered saat scroll (feel landonorris).
 *
 * Data produk = lini #WarOnDrugs Cotton Combed 24s dari PRD (M3, M7 "Lego",
 * M8, M14, S4). Harga ⚠️ belum ada → tidak ditampilkan (tidak mengarang).
 * TODO(asset): banner pakai foto IG sementara — ganti dgn foto studio Figma
 * bila tersedia.
 */
const TEES = [
  { code: "M3", note: "24s" },
  { code: "M7", note: "Lego · 24s" },
  { code: "M8", note: "24s" },
  { code: "M14", note: "24s" },
  { code: "S4", note: "24s" },
];

export default function PartOfOutfit() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-tee]");
      if (reduce) {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.from(cards, {
        autoAlpha: 0,
        y: 60,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: "[data-grid]", start: "top 80%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      data-scene="dark"
      className="relative overflow-hidden"
      aria-label="Part of Outfit"
    >
      {/* banner editorial (sementara — ganti dgn foto studio Figma) */}
      <div className="relative h-[62vh] w-full overflow-hidden">
        <Image
          src="/img/gallery/ig-1.png"
          alt="euphoric.disorder — editorial"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="mx-auto max-w-content px-6 py-24">
        {/* heading */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-brush text-h2 leading-none text-accent">creativity</p>
            <h2 className="mt-1 font-display text-h1 font-black uppercase leading-none tracking-tight text-fg">
              Part of Outfit
            </h2>
          </div>
          <p className="max-w-md font-body text-p2 leading-snug text-fg-dim">
            Tiap potong adalah barang bukti — cetak sablon, kapas 24s, dan
            kejahilan yang dirancang untuk dipakai tiap hari.
          </p>
        </div>

        {/* grid kaos */}
        <div
          data-grid
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {TEES.map((t) => (
            <figure
              key={t.code}
              data-tee
              className="group relative rounded-xl border border-fg/10 bg-forest-deep/60 p-4 transition-colors hover:border-accent/40"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/img/shirt-gray.png"
                  alt={`Kaos #WarOnDrugs ${t.code}`}
                  width={701}
                  height={648}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="label-mono mt-2 flex items-center justify-between text-fg-dim">
                <span className="text-fg">WarOnDrugs {t.code}</span>
                <span className="text-accent">{t.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
