import { site, waLink } from "@/content/site";

/**
 * Scene 5 — Footer. Slogan, link sosial/WA/Shopee, newsletter, metadata arsip.
 * CTA WhatsApp menonjol (cobalt). Area tenggelam (bg-sunken).
 */
const PAGES = [
  { label: "Index", href: "#" },
  { label: "About", href: "#" },
  { label: "Product", href: "#" },
  { label: "Contact", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg-sunken">
      <div className="mx-auto max-w-content px-6 py-16 md:px-8 md:py-24">
        {/* Slogan */}
        <p
          className="font-display font-bold uppercase leading-[0.9] tracking-display"
          style={{ fontSize: "clamp(1.75rem, 5vw, 3.5rem)" }}
        >
          An Archive of Disorder
        </p>

        <div className="mt-12 grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          {/* Navigasi */}
          <nav className="flex flex-col gap-3">
            <span className="label-mono mb-1">Index</span>
            {PAGES.map((p) => (
              <a
                key={p.label}
                href={p.href}
                className="font-body text-body text-text-secondary transition-colors duration-micro hover:text-text-primary"
              >
                {p.label}
              </a>
            ))}
          </nav>

          {/* Sosial */}
          <nav className="flex flex-col gap-3">
            <span className="label-mono mb-1">Kanal</span>
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-body text-text-secondary transition-colors duration-micro hover:text-text-primary"
              >
                {s.label}
              </a>
            ))}
          </nav>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-2">
            <span className="label-mono mb-3 block">Berlangganan berkas</span>
            <p className="mb-4 max-w-[40ch] font-body text-body text-text-secondary">
              Sesekali saja. Kabar rilis & edisi terbatas.
            </p>
            <form
              className="flex max-w-sm items-center gap-2"
              // ⚠️ Belum ada backend newsletter — placeholder.
            >
              <input
                type="email"
                required
                placeholder="email@kamu.id"
                aria-label="Email"
                className="min-w-0 flex-1 border border-line bg-transparent px-3 py-2 font-body text-body text-text-primary outline-none transition-colors duration-micro placeholder:text-text-tertiary focus:border-accent"
              />
              <button
                type="submit"
                className="border border-line-strong px-3 py-2 font-mono text-label uppercase tracking-label text-text-primary transition-colors duration-micro hover:border-accent hover:text-accent"
              >
                Kirim
              </button>
            </form>
          </div>
        </div>

        {/* CTA WhatsApp menonjol */}
        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <a
            href={waLink("Halo euphoric.disorder, saya mau tanya produk.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 bg-accent px-5 py-3 font-mono text-label uppercase tracking-label text-text-primary transition-colors duration-micro hover:bg-accent-hover"
          >
            Tanya via WhatsApp <span aria-hidden>→</span>
          </a>
          <p className="font-mono text-label uppercase tracking-label text-text-tertiary">
            © {new Date().getFullYear()} euphoric.disorder · ⚠️[kota], ID ·
            wa.me/⚠️
          </p>
        </div>
      </div>
    </footer>
  );
}
