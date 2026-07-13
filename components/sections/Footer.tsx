import Image from "next/image";
import BrandTicker from "./BrandTicker";

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
const SOCIAL = [
  { label: "TikTok", href: "#" },
  { label: "Instagram", href: "https://instagram.com/euphoric.disorder" },
  { label: "Facebook", href: "#" },
];

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
              creatifity
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
                href="#"
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
              <a
                href="/product"
                className="absolute bottom-2 left-1/2 inline-flex min-h-[44px] -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-pill bg-lime px-5 py-3 font-display text-body1 font-bold text-ink transition-transform duration-micro hover:scale-[1.03] active:scale-95"
              >
                See in our product
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 17c6-1 8-5 8-9m0 0-3 3m3-3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
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
