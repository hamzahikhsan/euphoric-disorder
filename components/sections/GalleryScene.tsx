"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scene 3 — "The Archive" (galery). Scatter asimetris kartu foto editorial +
 * label arsip forensik, di-reveal bertahap saat scroll (feel landonorris:
 * staggered reveal + parallax halus, easing sinematik). Surface: dark.
 *
 * ⚠️ Label = gaya arsip generik (bukan data faktual). Foto: IG euphoric.disorder.
 * TODO(mobile): scatter ini desktop-first; versi mobile (stack) menyusul.
 */
type Card = {
  src: string;
  w: number; // % dari stage
  top: number; // %
  left: number; // %
  rot: number;
  label: string;
  speed: number; // parallax
};

const CARDS: Card[] = [
  { src: "/img/gallery/ig-3.png", w: 19, top: 2, left: 3, rot: -2.5, label: "Exhibit / 01", speed: 1.3 },
  { src: "/img/gallery/ig-1.png", w: 25, top: 20, left: 55, rot: 1.5, label: "Field Note / 04", speed: 0.7 },
  { src: "/img/gallery/ig-2.png", w: 18, top: 33, left: 9, rot: 2, label: "Case / 07", speed: 1.6 },
  { src: "/img/gallery/ig-6.png", w: 17, top: 46, left: 33, rot: -1.5, label: "Subject / 09", speed: 1.0 },
  { src: "/img/gallery/ig-4.png", w: 16, top: 60, left: 61, rot: 2, label: "Evidence / 12", speed: 1.4 },
  { src: "/img/gallery/ig-5.png", w: 16, top: 72, left: 20, rot: -2, label: "Index / 15", speed: 1.1 },
];

export default function GalleryScene() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      cards.forEach((card) => {
        const speed = parseFloat(card.dataset.speed || "1");

        if (reduce) {
          gsap.set(card, { autoAlpha: 1, y: 0 });
          return;
        }

        // reveal saat masuk
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 70, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "top 62%",
              scrub: true,
            },
          }
        );

        // parallax halus sepanjang section
        gsap.fromTo(
          card,
          { yPercent: 0 },
          {
            yPercent: -8 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-scene="dark"
      className="relative overflow-hidden px-6 py-32"
      aria-label="Archive"
    >
      <div className="mx-auto max-w-content">
        <p className="label-mono text-fg-dim">The Archive — selected files</p>

        {/* stage scatter (desktop) */}
        <div className="relative mt-8 hidden h-[1180px] md:block">
          {/* caption + creativity */}
          <div
            data-card
            data-speed="0.9"
            className="absolute left-[30%] top-[6%] w-[26%]"
          >
            <p className="font-serif text-p1 italic leading-snug text-fg">
              Bukan soal dari mana kamu mulai — tapi bagaimana kamu terus mencetak.
            </p>
            <p className="mt-2 font-brush text-h1 text-accent">creativity</p>
          </div>

          {CARDS.map((c, i) => (
            <figure
              key={i}
              data-card
              data-speed={c.speed}
              className="absolute"
              style={{
                top: `${c.top}%`,
                left: `${c.left}%`,
                width: `${c.w}%`,
                transform: `rotate(${c.rot}deg)`,
              }}
            >
              <div className="overflow-hidden bg-forest-deep shadow-2xl">
                <Image
                  src={c.src}
                  alt=""
                  width={480}
                  height={600}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="label-mono mt-2 text-fg-dim">
                {c.label}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* fallback stack (mobile) */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:hidden">
          {CARDS.map((c, i) => (
            <figure key={i} className="overflow-hidden">
              <Image
                src={c.src}
                alt=""
                width={480}
                height={600}
                className="h-auto w-full"
              />
              <figcaption className="label-mono mt-1 text-fg-dim">{c.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
