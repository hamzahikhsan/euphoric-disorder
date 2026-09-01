import Image from "next/image";
import BrandTicker from "./BrandTicker";
import { site, waLink } from "@/content/site";

/**
 * Scene 8 — FOOTER (mengikuti Figma node 19038:15428).
 * Frame LIME membungkus CARD hijau gelap rounded: slogan (serif+sans+brush),
 * kolom PAGE (nav+Store) kiri, SOCIAL MEDIA kanan, kaos tengah + pill
 * "See in our product", lalu ticker brand kolaborator di dasar card.
 * Bottom bar gelap: copyright + Privacy/Policy.
 */
const NAV = [
  { label: "Home", href: "#top" },
  { label: "About", href: "/about" },
  { label: "Product", href: "/product" },
  { label: "Contact", href: "/contact" },
];
const SOCIAL = site.socials;

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-scene="light" aria-label="Footer">
      {/* frame lime */}
      <div className="bg-lime px-3 pb-3 pt-3 md:px-5 md:pt-5">
        {/* card hijau */}
        <div className="relative overflow-hidden rounded-[2rem] bg-forest px-6 py-14 md:px-12 md:py-16">
          {/* slogan */}
          <div className="relative text-center">
            <span className="pointer-events-none absolute left-[38%] -top-4 -translate-x-1/2 -rotate-6 font-brush text-h2 text-lime md:-top-6">
              creativity
            </span>
            <h2 className="font-black uppercase leading-[0.92] tracking-tight text-[clamp(2.25rem,7vw,5.5rem)]">
              <span className="font-display text-bone">Always </span>
              <span className="font-serif text-lime">Bringing</span>
              <br />
              <span className="font-display text-bone">The </span>
              <span className="font-serif text-lime">Fight</span>
            </h2>
          </div>

          {/* kolom: PAGE | kaos+pill | SOCIAL */}
          <div className="mt-10 grid grid-cols-1 items-center gap-10 md:grid-cols-3">
            {/* PAGE */}
            <nav aria-label="Footer navigation" className="order-2 md:order-1">
              <p className="label-mono text-bone/45">Page</p>
              <ul className="mt-3 flex flex-col gap-1">
                {NAV.map((n) => (
                  <li key={n.label}>
                    <a
                      href={n.href}
                      className="inline-flex min-h-[44px] items-center font-display text-h3 font-black uppercase leading-tight text-bone transition-colors hover:text-lime"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={site.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-[44px] items-center font-display text-h4 font-bold text-lime transition-opacity hover:opacity-80"
              >
                Store
              </a>
            </nav>

            {/* kaos + pill */}
            <div className="relative order-1 mx-auto w-full max-w-[360px] md:order-2">
              <Image
                src="/img/shirt-gray.png"
                alt="Kaos euphoric.disorder"
                width={701}
                height={648}
                className="h-auto w-full"
              />
              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2">
                <a
                  href="/product"
                  className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-pill bg-lime px-4 py-3 font-display text-body2 font-bold text-ink transition-transform duration-micro hover:scale-[1.03] active:scale-95"
                >
                  See in our product
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4 17c6-1 8-5 8-9m0 0-3 3m3-3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href={waLink(site.waGeneralMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tanya via WhatsApp"
                  className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-pill border border-bone/40 bg-forest/60 px-4 py-3 font-display text-body2 font-bold text-bone backdrop-blur-sm transition-colors duration-micro hover:bg-bone/10 active:scale-95"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.9.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3A2.8 2.8 0 0 0 6 8.3c0 1.7 1.2 3.3 1.4 3.5s2.4 3.7 5.8 5.1c2 .9 2.4.7 2.9.7s1.4-.6 1.6-1.1.2-1 .1-1.1-.2-.2-.5-.3Z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* SOCIAL */}
            <div className="order-3 text-left md:text-right">
              <p className="label-mono text-bone/45">Social Media</p>
              <ul className="mt-3 flex flex-col gap-1 md:items-end">
                {SOCIAL.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex min-h-[44px] items-center font-display text-h3 font-black uppercase leading-tight text-bone transition-colors hover:text-lime"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ticker brand kolaborator */}
          <BrandTicker className="mt-12 border-t border-bone/10 pt-6 text-bone/55" />
        </div>
      </div>

      {/* bottom bar */}
      <div className="bg-forest-deep">
        <div className="mx-auto flex max-w-content flex-col gap-2 px-6 py-4 label-mono text-bone/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} EUPHORIC DISORDER. All rights reserved</span>
          <span className="flex gap-6">
            <a href="#" className="transition-colors hover:text-bone">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-bone">
              Policy
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
