"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CardDeck } from "@/components/product/CardDeck";

/**
 * Scene 7 — LOOK OUT / OUR SOCIAL MEDIA (surface: light).
 * Figma: kartu postingan sosial berserakan/menumpuk (fanned deck). Kartu =
 * postingan IG euphoric.disorder. Deck desktop pakai CardDeck (rebuild dari
 * component Framer eksternal "CardDeck") — hover pada satu kartu mengangkat +
 * membesarkannya dan mendorong kartu tetangga menjauh. Reveal saat scroll
 * diterapkan pada wrapper deck (bukan per-kartu) supaya tidak bentrok dengan
 * transform internal CardDeck. Selaras skill ui-ux-pro-max: alt bermakna,
 * hover/active state, reduced-motion, lazy-load (next/image default).
 *
 * ⚠️ Foto = 6 postingan IG yang sama dgn Archive (aset terbatas). Tautan TikTok/
 * Facebook = placeholder (# ) sampai URL asli diberikan. IG @euphoric.disorder.
 */
const IMAGES = [
  { src: "/img/gallery/ig-1.png", alt: "Postingan Instagram euphoric.disorder" },
  { src: "/img/gallery/ig-2.png", alt: "Postingan Instagram euphoric.disorder" },
  { src: "/img/gallery/ig-6.png", alt: "Postingan Instagram euphoric.disorder" },
  { src: "/img/gallery/ig-3.png", alt: "Postingan Instagram euphoric.disorder" },
  { src: "/img/gallery/ig-4.png", alt: "Postingan Instagram euphoric.disorder" },
  { src: "/img/gallery/ig-5.png", alt: "Postingan Instagram euphoric.disorder" },
];

export default function SocialAlbum() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const deck = el.querySelector("[data-deck]");
      if (!deck) return;
      if (reduce) {
        gsap.set(deck, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.from(deck, {
        autoAlpha: 0,
        y: 60,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: deck, start: "top 78%" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      data-scene="light"
      className="relative overflow-hidden px-6 py-28"
      aria-label="Social Media"
    >
      <div className="mx-auto max-w-content text-center">
        <p className="label-mono text-fg-dim">▼ Look out</p>
        <h2 className="mt-2 font-display text-h1 font-black uppercase leading-none tracking-tight text-fg">
          Our <span className="font-brush lowercase text-accent">social</span> media
        </h2>
      </div>

      {/* fanned deck (desktop) */}
      <div data-deck className="mx-auto mt-10 hidden justify-center md:flex">
        <CardDeck
          images={IMAGES}
          cardWidth={190}
          cardHeight={260}
          spacing={80}
          hoverLift={45}
          pushForce={95}
          borderRadius={24}
        />
      </div>

      {/* stack (mobile) */}
      <div className="mx-auto mt-8 grid max-w-content grid-cols-2 gap-3 md:hidden">
        {IMAGES.map((c, i) => (
          <figure key={i} className="overflow-hidden rounded-md border border-ink/10">
            <Image
              src={c.src}
              alt={c.alt}
              width={420}
              height={520}
              className="h-auto w-full"
            />
          </figure>
        ))}
      </div>

      {/* CTA sosial */}
      <div className="mx-auto mt-12 flex max-w-content flex-col items-center gap-4">
        <a
          href="https://instagram.com/euphoric.disorder"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center rounded-pill bg-lime px-6 py-3 font-display text-h4 font-bold text-ink transition-transform duration-micro hover:scale-[1.03] active:scale-95"
        >
          @euphoric.disorder
        </a>
        <ul className="flex items-center gap-6 label-mono text-fg-dim">
          <li>
            <a href="https://instagram.com/euphoric.disorder" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">
              Instagram
            </a>
          </li>
          <li aria-hidden>·</li>
          <li>
            <a href="#" className="transition-colors hover:text-fg">TikTok</a>
          </li>
          <li aria-hidden>·</li>
          <li>
            <a href="#" className="transition-colors hover:text-fg">Facebook</a>
          </li>
        </ul>
      </div>
    </section>
  );
}
