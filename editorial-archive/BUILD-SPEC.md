# BUILD-SPEC — euphoric.disorder (untuk Claude Code)

**v3 · 9 Juli 2026 · Fase: Website Profil (bukan ecommerce)**

Spek teknis untuk membangun situs dari nol. Baca bareng `PRD-v3.md`, `DESIGN-SYSTEM.md`, `tokens.css`, `STORYBOARD.md`, `ASSET-MANIFEST.md`.

---

## 1. Stack

- **Framework:** Next.js (App Router) + TypeScript.
- **Styling:** Tailwind CSS, di-drive oleh CSS variables dari `tokens.css` (jangan hardcode warna/ukuran — map token ke theme Tailwind).
- **3D:** React Three Fiber + drei, loader Draco/meshopt. **Hanya di Home hero.**
- **Motion:** GSAP + ScrollTrigger + Lenis (scroll-linked). Framer Motion opsional untuk reveal komponen.
- **Konten:** file lokal (TypeScript/JSON/MDX) di `content/` — belum ada CMS.
- **Deploy:** Vercel + Vercel Analytics.
- **Node:** LTS. Package manager: pnpm (atau npm bila lebih mudah).

> Rewrite bersih. **Jangan** pakai ulang folder `site/` atau `web/` yang lama — buat app baru (mis. `app-v3/` atau langsung root app baru), lalu arsipkan yang lama.

---

## 2. Struktur folder (target)

```
app/
  layout.tsx            # font, metadata global, providers
  page.tsx              # Home (5 scene)
  about/page.tsx
  product/page.tsx
  product/[slug]/page.tsx
  contact/page.tsx
  sitemap.ts
  robots.ts
components/
  nav/                  # Navbar, MenuSlideIn
  hero/                 # ThreeShirt (R3F), HeroScene
  product/              # IndexCard (hover swap), StatusBadge
  editorial/            # StatementBand, ImageCaption, Reveal
  footer/
lib/
  motion.ts             # easing/durasi dari token, helper ScrollTrigger
  analytics.ts          # event klik Shopee/WA
content/
  products.ts           # data produk (lihat schema §5)
  site.ts               # slogan, WA, sosial, lokasi
styles/
  tokens.css            # dari editorial-archive/ (copy)
  globals.css
public/
  models/               # tshirt-1k.glb (+ 2k)
  img/products/         # foto produk (WebP)
  logo.svg
```

---

## 3. Urutan build (WAJIB — statis dulu, gerak belakangan)

1. **Setup & fondasi** — scaffold, Tailwind + token mapping, font (Archivo/Inter/Space Mono via next/font), layout + metadata global.
2. **Halaman statis** — semua halaman + navbar + menu slide-in + konten dari `content/`. Rapi & responsif, **belum ada animasi**. Integrasi tombol WA & Shopee. **Lulus di sini dulu.**
3. **SEO** — metadata per halaman, JSON-LD, sitemap, robots, OG image.
4. **Prototipe rasa** — Home hero: kaos 3D bisa di-drag + fallback gambar. **Validasi rasa & performa sebelum lanjut.**
5. **Lapisan gerak** — reveal global → scroll-linked Home (kaos tengah→kiri→footer, product index horizontal, statement band) → micro-interaction. Ikuti `STORYBOARD.md`.
6. **Optimasi & rilis** — cek Core Web Vitals, lazy-load, fallback mobile, deploy Vercel.

---

## 4. Aturan performa & 3D (non-negotiable)

- Pakai **`public/models/tshirt-1k.glb` (1.8MB)** untuk mobile, 2k untuk desktop. **Jangan** pakai `oversized_t-shirt.glb` (37MB) — hanya arsip.
- 3D **lazy-load** (dynamic import, `ssr:false`) + **fallback `<img>`** still render kaos untuk HP lemah / `prefers-reduced-motion`.
- Gambar: `next/image`, format WebP/AVIF.
- Target: **LCP < 2.5s (mobile 4G), CLS < 0.1**. Animasi tidak boleh mengorbankan ini.
- Semua animasi hormati `prefers-reduced-motion` (token durasi sudah → 0).

---

## 5. Schema data produk (`content/products.ts`)

```ts
export type Product = {
  slug: string;            // "warondrugs-m3"
  subject: string;         // "003"  (nomor "Subject")
  name: string;            // "Kaos #WarOnDrugs — M3"
  material: string;        // "Cotton Combed 24s"
  priceIDR: number | null; // null = ⚠️ belum ada → tampil "Harga menyusul"
  status: "OPEN" | "PO" | "LIMITED" | "SOLD";
  filedUnder: string[];    // ["War on Drugs"]
  images: { front: string; back?: string; gallery?: string[] };
  description: string;     // nada deadpan
  shopeeUrl?: string;
};
```

Placeholder jelas untuk data yang belum ada (harga/link) — jangan mengarang angka.

---

## 6. Integrasi & tracking

- **WhatsApp:** `https://wa.me/<nomor>?text=<pesan terisi otomatis: "Halo, saya tanya Subject #XX...">`.
- **Shopee:** link per produk dari `content/products.ts`.
- Event analytics: `click_shopee`, `click_whatsapp`, `scroll_depth`. Helper di `lib/analytics.ts`.

---

## 7. Acceptance criteria (Definition of Done fase profil)

- [ ] Semua 5 halaman jalan, responsif (1440 & 390), konten dari `content/`.
- [ ] Navbar + menu slide-in berfungsi, fokus keyboard OK.
- [ ] Home: kaos 3D interaktif + fallback gambar; scroll scenes sesuai `STORYBOARD.md`.
- [ ] Product Detail: CTA Shopee & WA berfungsi + tracking.
- [ ] SEO: metadata + JSON-LD + sitemap + robots + OG per halaman.
- [ ] Core Web Vitals hijau di mobile.
- [ ] `prefers-reduced-motion` dihormati; alt text lengkap.
- [ ] Tema sesuai `DESIGN-SYSTEM.md` (dark editorial, cobalt hemat, tanpa unsur norak).
