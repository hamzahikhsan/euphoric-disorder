"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Card Deck — rebuild perilaku component eksternal Framer "CardDeck" (marketplace,
 * source code aslinya diproteksi & tidak bisa diekstrak via API). Default di bawah
 * diambil dari nilai instance asli di project Framer "Generous-Fade":
 * spacing 120, rotationIntensity 12, arcIntensity 12, scaleDecay 0.06,
 * hoverScale 1.15, hoverLift 60, pushForce 130, cardWidth 254, cardHeight 360,
 * borderRadius 32, shadow 0.15, transition "smooth". Durasi transisi memakai
 * var(--dur-flip) sehingga otomatis nonaktif saat prefers-reduced-motion.
 */

export interface CardDeckImage {
  src: string;
  alt: string;
}

export interface CardDeckProps {
  images: CardDeckImage[];
  spacing?: number;
  rotationIntensity?: number;
  arcIntensity?: number;
  scaleDecay?: number;
  hoverScale?: number;
  hoverLift?: number;
  pushForce?: number;
  cardWidth?: number;
  cardHeight?: number;
  borderRadius?: number;
  shadow?: number;
  transition?: "smooth" | "bouncy";
  className?: string;
}

const EASE: Record<NonNullable<CardDeckProps["transition"]>, string> = {
  smooth: "var(--ease-out)",
  bouncy: "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

export function CardDeck({
  images,
  spacing = 120,
  rotationIntensity = 12,
  arcIntensity = 12,
  scaleDecay = 0.06,
  hoverScale = 1.15,
  hoverLift = 60,
  pushForce = 130,
  cardWidth = 254,
  cardHeight = 360,
  borderRadius = 32,
  shadow = 0.15,
  transition = "smooth",
  className = "",
}: CardDeckProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const center = (images.length - 1) / 2;
  const ease = EASE[transition];

  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{
        width: cardWidth + spacing * center * 2,
        height: cardHeight + hoverLift + arcIntensity * center,
      }}
    >
      {images.map((image, i) => {
        const offset = i - center;
        const isHovered = hovered === i;
        const distance = hovered === null ? 0 : i - hovered;
        const push =
          hovered === null || isHovered
            ? 0
            : Math.sign(distance) *
              pushForce *
              Math.max(0, 1 - (Math.abs(distance) - 1) * 0.5);

        const translateX = offset * spacing + push;
        const translateY =
          Math.abs(offset) * arcIntensity - (isHovered ? hoverLift : 0);
        const scale =
          (1 - Math.abs(offset) * scaleDecay) * (isHovered ? hoverScale : 1);
        const rotate = offset * rotationIntensity;
        const zIndex = isHovered
          ? images.length + 1
          : images.length - Math.abs(offset);

        return (
          <button
            key={image.src + i}
            type="button"
            aria-label={image.alt}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            className="absolute left-1/2 top-1/2 overflow-hidden border border-ink/10 bg-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            style={{
              width: cardWidth,
              height: cardHeight,
              borderRadius,
              zIndex,
              transform: `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale})`,
              transitionProperty: "transform",
              transitionDuration: "var(--dur-flip)",
              transitionTimingFunction: ease,
              boxShadow: `0 24px 48px -16px rgba(0,0,0,${shadow})`,
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={`${cardWidth}px`}
              className="object-cover"
            />
          </button>
        );
      })}
    </div>
  );
}
