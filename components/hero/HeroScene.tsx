"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Home Hero — STORYBOARD Scene 1, tema "Editorial Archive" (versi diperkaya).
 * Struktur kokoh: masthead & footer in-flow (flex), <main> flex-1 di tengah.
 * Desktop = art-directed (wordmark bleed kiri, kaos 3D dominan kanan, overlap);
 * Mobile = kolom tunggal rapi (wordmark → kaos → stamp).
 *
 * Performa (BUILD-SPEC §4): fallback <Image> poster selalu render (LCP),
 * kanvas 3D lazy-load hanya bila WebGL & bukan reduced-motion, model 1k/2k.
 */

const ThreeShirt = dynamic(() => import("./ThreeShirt"), {
  ssr: false,
  loading: () => null,
});

const OUTLINE: React.CSSProperties = {
  WebkitTextStroke: "1.5px var(--text-primary)",
  color: "transparent",
};

function useHeroMode() {
  const [mode, setMode] = useState<"static" | "3d">("static");
  const [modelUrl, setModelUrl] = useState("/models/tshirt-1k.glb");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    setModelUrl(isDesktop ? "/models/tshirt-2k.glb" : "/models/tshirt-1k.glb");
    if (webgl && !reduced) setMode("3d");
  }, []);

  return { mode, modelUrl };
}

function Shirt({ mode, modelUrl }: { mode: "static" | "3d"; modelUrl: string }) {
  return (
    <>
      <Image
        src="/img/products/warondrugs-m3.png"
        alt="Kaos euphoric.disorder — seri #WarOnDrugs"
        fill
        priority
        sizes="(min-width: 768px) 42vw, 80vw"
        className={`object-contain transition-opacity duration-scene ease-out ${
          mode === "3d" ? "opacity-0" : "opacity-100"
        }`}
      />
      {mode === "3d" && (
        <div className="absolute inset-0">
          <ThreeShirt modelUrl={modelUrl} />
        </div>
      )}
    </>
  );
}

export default function HeroScene() {
  const { mode, modelUrl } = useHeroMode();

  return (
    <section
      aria-label="euphoric.disorder — hero"
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-bg-base"
    >
      {/* ── Masthead ── */}
      <header className="z-30 flex items-center justify-between border-b border-line px-6 py-4 md:px-8">
        <span className="font-display text-body font-semibold tracking-display">
          euphoric.disorder
        </span>
        <span className="label-mono hidden md:inline">An Archive of Disorder</span>
        <span className="label-mono text-text-secondary">Menu</span>
      </header>

      {/* ── Panggung utama ── */}
      <main className="relative flex flex-1 flex-col justify-center md:block">
        {/* Grid kolom arsip samar (desktop) */}
        <div
          aria-hidden
          className="archival-grid pointer-events-none absolute inset-0 hidden opacity-60 md:block"
        />

        {/* Label vertikal tepi kiri */}
        <span
          className="label-mono absolute left-3 top-1/2 z-30 hidden -translate-y-1/2 md:block"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          N° 001 — Subject File
        </span>

        {/* Kolom teks — desktop: tengah vertikal & di atas kaos; mobile: order-1 */}
        <div className="relative z-10 order-1 flex flex-col justify-center px-6 pt-10 md:h-full md:px-8 md:pt-0">
          <p className="label-mono mb-5 md:mb-8">
            <span className="text-accent">N° 001</span> — Index · Seri Aktif ·
            #WarOnDrugs
          </p>

          <h1
            className="font-display font-bold uppercase leading-[0.84] tracking-[-0.045em]"
            style={{ fontSize: "clamp(3rem, 12vw, 10.5rem)" }}
          >
            <span className="block text-text-primary">Euphoric</span>
            <span className="block" style={OUTLINE}>
              Disorder
            </span>
          </h1>

          <p className="mt-6 max-w-[40ch] font-body text-body-l text-text-secondary md:mt-8">
            Kami mengarsipkan kekacauan — lalu mencetaknya. Kejahatan sebagai
            bahan kajian; kaos sebagai medium.
          </p>

          <div className="mt-7 flex items-center gap-3">
            <span className="label-mono">
              {mode === "3d" ? "Seret untuk memutar" : "Mode statis"}
            </span>
            <span aria-hidden className="h-px w-10 bg-line-strong" />
            <span className="label-mono text-accent">↻</span>
          </div>
        </div>

        {/* Kaos 3D dominan — desktop: absolute kanan & overlap; mobile: order-2 */}
        <div className="pointer-events-auto relative z-20 order-2 mx-auto mt-8 h-[38svh] w-[80%] md:absolute md:right-[3%] md:top-1/2 md:mx-0 md:mt-0 md:h-[76%] md:w-[42%] md:-translate-y-1/2">
          <Shirt mode={mode} modelUrl={modelUrl} />
        </div>

        {/* Stamp metadata — mobile (order-3, in-flow) */}
        <div className="order-3 mx-6 mt-8 flex flex-col gap-1 border-t border-line pt-4 md:hidden">
          <span className="label-mono">Subject — #WarOnDrugs</span>
          <span className="label-mono">EST. ⚠️[tahun] · ⚠️[kota], ID</span>
          <span className="label-mono">Edisi Terbatas</span>
        </div>

        {/* Stamp metadata — desktop (absolute kanan-bawah) */}
        <div className="absolute bottom-6 right-6 z-30 hidden flex-col items-end gap-1 border-r border-line pr-3 text-right md:flex md:right-8">
          <span className="label-mono">Subject — #WarOnDrugs</span>
          <span className="label-mono">EST. ⚠️[tahun] · ⚠️[kota], ID</span>
          <span className="label-mono">Edisi Terbatas</span>
        </div>
      </main>

      {/* ── Footer hero: cue scroll ── */}
      <footer className="z-30 flex items-center justify-between border-t border-line px-6 py-4 md:px-8">
        <span className="label-mono hidden md:inline">
          Filed under: Human Nature
        </span>
        <span className="label-mono flex items-center gap-2">
          Geser ke bawah <span aria-hidden>↓</span>
        </span>
      </footer>
    </section>
  );
}
