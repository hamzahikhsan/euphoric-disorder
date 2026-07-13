# Build Guide — euphoric.disorder (untuk Hamzah)

**Panduan pribadi. JANGAN di-attach ke Claude Code.** Ini peta langkahmu + prompt siap-paste tiap fase.

Tiga dokumen yang **di-attach** ke Claude Code: `01-PRD.md`, `02-BRAND-PROFILE.md`, `03-DESIGN-SYSTEM.md`.

---

## 0. Setup awal (sekali)

1. Buka folder proyek `euphoric.disorder` di **VS Code**.
2. Pastikan ekstensi **Claude Code** aktif & login.
3. Rapikan arsip lama supaya tidak mengganggu (opsional tapi disarankan): pindahkan `site/`, `web/`, `design-system/`, `prototype-home.html`, `PRD-euphoric-disorder.md`, `BLUEPRINT-v2*`, `RENCANA-*`, dan folder `editorial-archive/` (versi ambisius lama) ke satu folder `_archive/`. Sisakan `docs/` + `assets/` + `Media/`.
4. Node LTS terpasang. Package manager: **pnpm** (atau npm).

**Prinsip kerja:** satu fase = satu percakapan/perintah. Selesai → cek → commit → lanjut. Jangan minta semua sekaligus (itu sumber "berantakan").

---

## 1. Master prompt (kickoff — paste pertama)

```
Aku membangun website PROFIL untuk brand streetwear "euphoric.disorder" (bukan toko online).
Baca dulu dokumen ini sepenuhnya sebelum menulis kode: docs/01-PRD.md, docs/02-BRAND-PROFILE.md, docs/03-DESIGN-SYSTEM.md.

Aturan:
- Ini rewrite bersih. Jangan sentuh folder lama/arsip. Buat app baru.
- Desain: profesional, modern, editorial, restrained. WAJIB ikuti bagian "Anti-AI Slop" di 03-DESIGN-SYSTEM.md. Jangan pakai gradien techy, glow, glassmorphism, atau layout generik.
- Bangun bertahap. Untuk sekarang, HANYA lakukan Fase 1 di bawah, lalu berhenti dan tunjukkan hasilnya. Jangan lanjut tanpa aku minta.

FASE 1 — Scaffold & fondasi:
1. Next.js (App Router + TypeScript) + Tailwind CSS + pnpm.
2. Buat styles/tokens.css dari blok token di 03-DESIGN-SYSTEM.md, lalu map ke konfigurasi Tailwind (warna, font, radius) — jangan hardcode.
3. Pasang font Archivo, Inter, JetBrains Mono via next/font.
4. Layout global: container, header (logo + nav + tombol WhatsApp) dan footer — masih statis, konten placeholder dari 01-PRD.
5. Buat halaman kosong ber-route: /, /about, /product, /product/[slug], /contact.

Setelah selesai: jalankan dev server, pastikan build sukses, dan ringkas apa yang kamu buat.
```

---

## 2. Fase berikutnya (paste satu per satu, setelah fase sebelumnya OK)

**FASE 2 — Data & konten**
```
Lanjut Fase 2. Buat content/products.ts dan content/site.ts sesuai schema di 01-PRD.md §6.
Isi dengan data produk nyata dari 02-BRAND-PROFILE.md (Candy Hoodie + seri #WarOnDrugs M3/M7/M8/M14/S4).
Untuk data yang belum ada (harga sebagian kaos, nomor WA, link Shopee), pakai placeholder yang jelas — jangan mengarang. Pakai foto dari folder assets/img (convert ke WebP, taruh di public/img/products).
```

**FASE 3 — Halaman statis (rapi, belum animasi)**
```
Lanjut Fase 3. Bangun semua halaman sesuai 01-PRD.md §5, tampilan sesuai 03-DESIGN-SYSTEM.md:
Home (hero, intro, produk unggulan, statement, CTA band, footer), About, Product (grid kartu + badge status), Product Detail (galeri + info sticky + CTA Shopee & WhatsApp), Contact.
Fokus: layout presisi, tipografi, spacing konsisten, responsif (390 & 1440). BELUM ada animasi. Tunjukkan tiap halaman.
```

**FASE 4 — Integrasi & SEO**
```
Lanjut Fase 4.
1. Tombol WhatsApp pakai wa.me dengan pesan terisi otomatis (sebut nama produk). Link Shopee dari content.
2. Event tracking: click_shopee, click_whatsapp, scroll_depth (siapkan lib/analytics.ts).
3. SEO: metadata per halaman (title, description, Open Graph), JSON-LD LocalBusiness (global) + Product (detail), sitemap.ts, robots.ts, alt text.
```

**FASE 5 — Motion (restrained)**
```
Lanjut Fase 5. Tambah animasi sesuai 03-DESIGN-SYSTEM.md §6:
reveal saat masuk viewport (stagger halus), hover kartu (image-swap + underline), header shrink saat scroll, menu mobile.
WAJIB hormati prefers-reduced-motion. Jangan berlebihan — halus & cepat.
```

**FASE 6 — Polish & deploy**
```
Lanjut Fase 6. Optimasi: next/image untuk semua gambar (WebP/AVIF), lazy-load di bawah fold, cek Core Web Vitals (LCP < 2.5s mobile, CLS < 0.1), aksesibilitas (fokus keyboard, kontras).
Lalu siapkan deploy ke Vercel (README singkat langkah deploy).
```

---

## 3. Guardrail — menjaga Claude Code tetap di jalur

- Kalau hasil mulai generik/norak: **"Cek ulang bagian Anti-AI Slop di 03-DESIGN-SYSTEM.md, perbaiki."**
- Kalau melebar dari scope: **"Itu di luar fase ini. Fokus [fase X] saja."**
- Kalau menyimpang tema: **"Kembali ke 01-PRD.md dan 02-BRAND-PROFILE.md."**
- Selalu minta dia **berhenti di akhir tiap fase** dan tunjukkan hasil sebelum lanjut.
- **Commit git tiap fase selesai** (mis. `git commit -m "fase 3: halaman statis"`) — biar mudah mundur bila ada yang rusak.

---

## 4. Checklist review anti-slop (kamu, tiap fase)

- [ ] Tidak ada gradien ungu-biru/glow/glassmorphism yang tidak diminta.
- [ ] Hanya satu warna aksen (cobalt), dipakai hemat.
- [ ] Spacing & alignment konsisten (skala 4pt), tidak ada elemen "mengambang" asal.
- [ ] Tipografi: hierarki jelas, bukan semua rata tengah.
- [ ] Konten nyata, bukan lorem ipsum / placeholder generik.
- [ ] Hover & focus state ada dan halus.
- [ ] Rapi di mobile 390, bukan cuma desktop.

---

## 5. Kapan balik ke Cowork (chat ini)

- Butuh **aset visual** (render fallback/hero kaos, tekstur, OG image) → generate di sini (Higgsfield), taruh ke `public/`.
- Butuh **copywriting** tambahan bernada brand → minta di sini.
- Mau **review desain** hasil Claude Code → kirim screenshot ke sini untuk kritik jujur.

---

## 6. Data yang harus kamu siapkan (biar tidak nyangkut)

Harga tiap kaos #WarOnDrugs · nomor WA Business + jam · slogan resmi · teks About final · link Shopee resmi + per produk · kota/lokasi + info custom. Makin cepat terisi, makin sedikit placeholder.
