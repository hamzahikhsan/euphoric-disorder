"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

/**
 * Navbar + OPEN MENU overlay (Figma node 19050:696).
 * - Tombol kanan (hamburger) → toggle. Saat open, jadi X dan overlay full-screen
 *   (forest) meluncur turun menutupi 1 layar dengan animasi smooth.
 * - Item menu: hover → #D2FF00 @80% opacity; aktif (route sekarang) → #D2FF00
 *   @100% + glow/blur shadow warna sama.
 * - Berisi kolase foto, logo JAKCLOTH AWARD, dan tautan sosial.
 * Kontras wordmark/tombol saat closed ikut var(--nav-fg) (surface global).
 */
const MENU = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Product/Service", href: "/product" },
  { label: "Contact", href: "/contact" },
];
const COLLAGE = [
  { src: "/img/gallery/ig-2.png", pt: true },
  { src: "/img/gallery/ig-5.png", pt: true },
  { src: "/img/gallery/ig-1.png", pt: false },
  { src: "/img/gallery/ig-3.png", pt: false },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // kunci scroll + Escape saat open
  useEffect(() => {
    if (!open) return;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* HEADER (selalu di atas overlay) */}
      <header className="fixed inset-x-0 top-0 z-nav">
        <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-5">
          <a
            href="#top"
            aria-label="euphoric.disorder — beranda"
            className={`font-display transition-colors duration-flip ${open ? "text-bone" : "text-nav-fg"}`}
          >
            <span className="block text-[12px] font-extrabold uppercase leading-[1.02] tracking-tight">
              Euphoric
              <br />
              Disorder
            </span>
          </a>

          <div className="flex items-center gap-3">
            <a
              href={site.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-pill bg-lime px-4 py-2 font-display text-body2 font-semibold text-ink transition-transform duration-micro hover:scale-[1.03]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 9h18l-1.5 11.5A1.5 1.5 0 0 1 18 22H6a1.5 1.5 0 0 1-1.5-1.5L3 9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M8 9a4 4 0 1 1 8 0" stroke="currentColor" strokeWidth="2" />
              </svg>
              Store
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Tutup menu" : "Buka menu"}
              aria-expanded={open}
              className={`grid h-11 w-11 place-items-center rounded-sm border transition-colors duration-flip ${
                open
                  ? "border-bone/40 bg-paper text-ink"
                  : "border-nav-fg/40 text-nav-fg hover:bg-nav-fg/10"
              }`}
            >
              {open ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* OVERLAY MENU */}
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-0 z-[90] overflow-y-auto bg-forest transition-[transform,opacity] duration-500 ease-out ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <div className="mx-auto flex min-h-full max-w-content items-center px-6 py-24">
          <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* kolase foto */}
            <div className="hidden grid-cols-2 gap-4 lg:grid">
              {[0, 1].map((col) => (
                <div key={col} className={`flex flex-col gap-4 ${col === 0 ? "pt-16" : ""}`}>
                  {COLLAGE.filter((_, i) => i % 2 === col).map((c, i) => (
                    <div
                      key={i}
                      className={`overflow-hidden rounded-md transition-all duration-700 ${
                        open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                      }`}
                      style={{ transitionDelay: open ? `${150 + i * 120}ms` : "0ms" }}
                    >
                      <Image src={c.src} alt="" width={420} height={520} className="h-auto w-full" />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* menu + jakcloth + sosial */}
            <div className="flex flex-col items-center gap-8 text-center lg:items-end lg:text-right">
              <nav aria-label="Menu utama" className="flex flex-col items-center gap-1 lg:items-end">
                {MENU.map((m, i) => {
                  const active = isActive(m.href);
                  return (
                    <a
                      key={m.href}
                      href={m.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
                      className={`font-display text-[clamp(2.25rem,5vw,4.25rem)] font-black uppercase leading-[1.05] tracking-tight transition-all duration-500 ${
                        open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      } ${
                        active
                          ? "text-[#D2FF00] [text-shadow:0_0_28px_rgba(210,255,0,0.75)]"
                          : "text-bone hover:text-[#D2FF00]/80"
                      }`}
                    >
                      {m.label}
                    </a>
                  );
                })}
              </nav>

              {/* jakcloth award */}
              <div
                className={`flex flex-col items-center gap-2 transition-all duration-700 lg:items-end ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: open ? "420ms" : "0ms" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/jakcloth-award.svg" alt="JakCloth Award" width={120} height={45} className="h-11 w-auto" />
                <p className="label-mono text-center text-bone/70 lg:text-right">
                  JakCloth Participant
                  <br />
                  Since 2021
                </p>
              </div>

              {/* sosial */}
              <div
                className={`flex flex-col items-center gap-2 transition-all duration-700 lg:items-end ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: open ? "500ms" : "0ms" }}
              >
                <p className="font-serif text-p1 italic text-bone">Follow us on social media</p>
                <ul className="flex items-center gap-5 label-mono text-bone/70">
                  {site.socials.map((s, i) => (
                    <li key={s.label} className="flex items-center gap-5">
                      {i > 0 && <span aria-hidden>·</span>}
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-[#D2FF00]"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
