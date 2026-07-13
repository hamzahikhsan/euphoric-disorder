# PRD — Website Profil euphoric.disorder

**Versi:** 1.0 (scope solo-dev) · **9 Juli 2026** · **Pemilik:** Hamzah · **Build:** mandiri via Claude Code (VS Code)

Dokumen ini mendefinisikan **apa** yang dibangun dan **flow**-nya, dari Home sampai Product Detail. Pendamping: `02-BRAND-PROFILE.md` (identitas brand), `03-DESIGN-SYSTEM.md` (tampilan), `04-BUILD-GUIDE.md` (cara build — untuk Hamzah).

> **Arah:** profesional, modern, bersih, restrained. **Bukan** situs "wow" berat (tanpa 3D wajib, tanpa scroll-storyboard rumit). Kualitas datang dari tipografi, ruang, konsistensi, dan konten nyata — bukan efek.

---

## 1. Ringkasan & Tujuan

Website profil untuk brand streetwear **euphoric.disorder**. **Bukan** toko online — ini rumah brand + katalog yang membangun kredibilitas dan mengarahkan transaksi ke **Shopee / WhatsApp**.

| Tujuan | Metrik |
|---|---|
| Kredibilitas & identitas milik sendiri | Kunjungan berulang, durasi sesi |
| Arahkan ke pembelian | Klik "Shopee" & "WhatsApp" (event) |
| Ditemukan di pencarian | SEO: impresi & posisi kata kunci brand |
| Cepat di HP | LCP < 2.5s, CLS < 0.1 |

**Non-goal (fase ini):** checkout, akun user, keranjang, pembayaran, CMS, 3D interaktif wajib. (Semua bisa jadi fase lanjutan.)

---

## 2. Target Pengguna

1. **Kolektor streetwear** (18–28, mobile-first, dari IG/TikTok) — cari desain unik + cerita.
2. **Pemesan custom / komunitas** — butuh proses order jelas.
3. **Pembeli marketplace** — butuh kepercayaan (foto real, status stok).

---

## 3. Sitemap & Arsitektur Informasi

```
/                 Home
/about            About
/product          Product (katalog)
/product/[slug]   Product Detail
/blog             Blog (index artikel)
/blog/[slug]      Artikel
/contact          Contact
```

**Navigasi global (semua halaman):**
- **Header:** logo (kiri) · menu (Home, About, Product, Blog, Contact) + tombol **WhatsApp** (kanan). Di mobile: hamburger → menu overlay.
- **Footer:** ringkas brand, link halaman, sosial (IG, Shopee, Threads), tombol WhatsApp, copyright.

---

## 4. Flow Utama (end-to-end)

**Flow konversi inti:**
```
Home → (lihat produk unggulan) → Product (katalog) → Product Detail
     → klik "Amankan di Shopee" ATAU "Tanya via WhatsApp" → keluar ke Shopee/WA
```

**Flow alternatif:**
- Home → About (baca cerita brand) → Product → Detail → CTA.
- Home → header → Contact → WhatsApp/marketplace.
- Masuk langsung dari Google ke Product Detail (SEO) → CTA.

Setiap halaman **selalu** punya jalan ke aksi (CTA WA/Shopee terlihat), sehingga pengunjung dari mana pun masuk tetap bisa konversi.

---

## 5. Requirement per Halaman

### 5.1 HOME `/`
Tujuan: kesan pertama kuat + arahkan ke katalog.

Section (urut):
1. **Hero** — nama/statement brand besar (tipografi), sub-kalimat singkat, 1 CTA primer ("Lihat Produk →"). Visual pendukung: foto produk berkualitas / gambar still kaos (bukan placeholder generik). *(3D opsional, bukan wajib.)*
2. **Intro brand singkat** — 2–3 kalimat "siapa kami" + CTA "Tentang kami →".
3. **Produk unggulan** — 3–6 kartu produk (grid), tiap kartu → Product Detail. Judul section "Index" / "Pilihan".
4. **Statement / nilai** — satu baris manifesto (comedy·criminologist·creativity) + foto editorial.
5. **CTA band** — ajakan ke katalog atau WhatsApp.
6. **Footer.**

Interaksi: reveal halus saat scroll, hover kartu. Tanpa efek berat.

### 5.2 ABOUT `/about`
Tujuan: bangun kepercayaan lewat cerita.
- Cerita brand (dari `02-BRAND-PROFILE.md`), nada deadpan-editorial.
- Filosofi (comedy·criminologist·creativity), foto editorial (ditata rapi, bukan galeri asal).
- CTA ke Product / WhatsApp.

### 5.3 PRODUCT (katalog) `/product`
Tujuan: jelajah semua produk.
- **Grid kartu produk** (responsif: 2 kolom mobile, 3–4 desktop).
- Kartu: foto, nama, harga (atau "Harga menyusul"), badge status (OPEN/PO/LIMITED/SOLD).
- **Filter opsional** sederhana (Semua / Kaos / Hoodie) — boleh ditunda.
- Hover: image-swap ke foto ke-2 bila tersedia + indikasi klik.
- Klik kartu → Product Detail.
- State kosong: pesan rapi bila kategori kosong.

### 5.4 PRODUCT DETAIL `/product/[slug]`
Tujuan: yakinkan + arahkan beli. **Halaman terpenting untuk konversi.**
- **Galeri gambar** (1 utama + thumbnail bila ada beberapa angle).
- **Kolom info** (sticky di desktop): nama, nomor "Subject", bahan, harga/status, deskripsi deadpan, kategori ("Filed under: …").
- **CTA utama (wajib, jelas):** `Amankan di Shopee →` + `Tanya via WhatsApp →`. Tanpa checkout sendiri.
- WhatsApp: link `wa.me` dengan pesan terisi otomatis (menyebut nama produk).
- **Produk terkait** (opsional): 3 kartu dari kategori sama.
- SEO: JSON-LD `Product` (nama, gambar, deskripsi; harga bila ada).

### 5.5 BLOG `/blog` & `/blog/[slug]`
Tujuan: **menaikkan SEO** lewat konten edukatif evergreen + membangun kredibilitas.
- **`/blog`** — index: grid kartu artikel (judul, ringkasan, tanggal, kategori), urut terbaru.
- **`/blog/[slug]`** — artikel dari `content/blog/` (markdown/MDX + frontmatter). Satu H1, heading semantik, gambar cover, daftar sumber, 1–2 internal link ke produk.
- SEO: metadata + Open Graph per artikel, JSON-LD `Article`/`BlogPosting`, artikel masuk `sitemap.ts`.
- Konten awal + panduan penulisan: lihat `docs/blog/` (4 artikel siap + `00-INDEX.md`).

### 5.6 CONTACT `/contact`
- Link/tombol: WhatsApp, Instagram, Shopee, Threads.
- Info: lokasi/kota, jam operasional, FAQ singkat.
- **Form opsional** "Lapor Kasus Baru" (custom order) — bila dibuat, kirim ke WhatsApp/email, bukan backend kompleks.

---

## 6. Model Data Produk

```ts
type Product = {
  slug: string;            // "warondrugs-m3"
  subject: string;         // "003"
  name: string;            // "Kaos #WarOnDrugs — M3"
  category: "kaos" | "hoodie";
  material: string;        // "Cotton Combed 24s"
  priceIDR: number | null; // null → tampil "Harga menyusul"
  status: "OPEN" | "PO" | "LIMITED" | "SOLD";
  filedUnder: string[];    // ["War on Drugs"]
  images: { front: string; back?: string; gallery?: string[] };
  description: string;
  shopeeUrl?: string;
};
```
Data disimpan lokal di `content/products.ts`. Placeholder jelas untuk yang belum ada — **jangan mengarang harga/link**.

---

## 7. Interaksi & Motion (restrained)

- Reveal masuk (fade + naik halus) saat elemen masuk viewport, sekali jalan.
- Hover: kartu produk (image-swap + underline), tombol, link.
- Header: transparan → solid saat scroll.
- Menu mobile: overlay sederhana.
- **Wajib:** hormati `prefers-reduced-motion` (matikan animasi). Tidak ada auto-play mengganggu.

---

## 8. SEO (dibangun sejak awal)
- `next/metadata` per halaman: title, description, Open Graph, Twitter card.
- JSON-LD: `LocalBusiness` (global) + `Product` (detail).
- `sitemap.ts` + `robots.ts`.
- Heading semantik (satu H1/halaman), alt text semua gambar, URL bersih.
- OG image per halaman (bisa dibuat belakangan).

---

## 9. Non-Fungsional
- **Performa:** LCP < 2.5s (mobile 4G), CLS < 0.1; `next/image` (WebP/AVIF), lazy-load di bawah fold.
- **Responsif:** acuan desktop 1440 & mobile 390; semua halaman punya versi mobile rapi.
- **Aksesibilitas:** kontras cukup, fokus keyboard, `prefers-reduced-motion`, label form.
- **Analytics:** event `click_shopee`, `click_whatsapp`, `scroll_depth` (Vercel Analytics/Umami).

---

## 10. Acceptance Criteria (Definition of Done)
- [ ] 5 halaman jalan, responsif (1440 & 390), konten dari `content/`.
- [ ] Header + menu mobile + tombol WhatsApp berfungsi di semua halaman.
- [ ] Katalog: grid + badge status + hover; klik → detail.
- [ ] Detail: galeri + info sticky + CTA Shopee & WA (dengan tracking).
- [ ] SEO: metadata + JSON-LD + sitemap + robots + OG.
- [ ] Core Web Vitals hijau di mobile; `prefers-reduced-motion` dihormati.
- [ ] Tampilan sesuai `03-DESIGN-SYSTEM.md`; tidak terlihat generik/AI-slop.

---

## 11. Open Questions (data dari Hamzah)
Harga tiap kaos #WarOnDrugs · nomor WA Business + jam · slogan resmi · teks About final · link Shopee resmi + per produk · kota/lokasi + info custom.
