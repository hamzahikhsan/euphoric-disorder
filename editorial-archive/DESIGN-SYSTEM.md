# Design System — euphoric.disorder

**Tema:** "Editorial Archive" (Dark) · **v3** · 9 Juli 2026
**Basis terkunci:** charcoal + bone + aksen cobalt (ditahan)

Prinsip inti: **profesional, editorial, tenang, dewasa.** Tema kriminologi tetap jadi inti brand, tapi hidup lewat *bahasa dan kurasi* — bukan properti visual (tanpa evidence tape, sirene, atau "BREAKING NEWS").

---

## 1. Prinsip Desain (acuan wajib)

1. **Gelap sebagai kanvas, bukan drama.** 80% layar = charcoal + bone. Cobalt hanya aksen.
2. **Satu momen "wow".** Kaos 3D interaktif hanya di Home; halaman lain tenang & editorial.
3. **Ruang kosong itu mewah.** Jarak lega > menjejalkan. Grid disiplin.
4. **Tipografi yang bicara, bukan berteriak.** Besar tapi tenang; kontras lewat skala, bukan warna.
5. **Kriminologi = subteks.** Kosakata arsip: *Index, Subject, Archive, Filed under* — bukan gimmick TKP.
6. **Cepat & mobile-first.** 3D lazy-load + fallback gambar. Core Web Vitals hijau.

---

## 2. Warna

| Peran | Token | Hex |
|---|---|---|
| Latar utama | `--bg-base` | `#0E0E10` |
| Surface/kartu | `--bg-raised` | `#17171A` |
| Area tenggelam (footer) | `--bg-sunken` | `#09090B` |
| Teks utama (bone) | `--text-primary` | `#EDE7D8` |
| Teks sekunder | `--text-secondary` | `#A8A399` |
| Label metadata | `--text-tertiary` | `#6E6A62` |
| **Aksen (link/CTA/aktif)** | `--accent` | `#2F5BFF` |
| Status OPEN / LIMITED / SOLD | `--status-*` | `#6FBF8B` / `#C8952E` / `#B4483C` |

**Disiplin warna:** cobalt hanya untuk *link, tombol utama, dan state aktif*. Jangan memenuhi layar. Status color hanya di badge produk.

---

## 3. Tipografi

| Peran | Font | Ukuran (token) | Catatan |
|---|---|---|---|
| Hero / statement | Archivo 700 | `--fs-display-xl` | tracking rapat, boleh uppercase |
| Judul section | Archivo 600 | `--fs-display-l` | |
| H2 / H3 | Archivo 600 | `--fs-h2` / `--fs-h3` | |
| Body | Inter 400 | `--fs-body` | line-height 1.6 |
| Label / indeks | Space Mono | `--fs-label` | uppercase, tracking `0.14em`, dipakai kecil & hemat |

Disiplin: **maks 2 keluarga display + 1 mono**. *Alternatif editorial:* Archivo boleh di-swap ke **Fraunces** (serif kontras tinggi) untuk mood majalah yang lebih mewah — uji dulu di Figma sebelum dikunci. Semua font gratis (Google Fonts).

---

## 4. Layout & Spacing

- Grid **12 kolom**, max-width **1240px**, gutter **24px**.
- Skala spacing **4pt**: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128.
- Radius minimal (editorial = tajam): tombol/input `2px`, kartu `4px`, blok besar `0`.
- Breakpoint acuan: **desktop 1440**, **mobile 390**.

---

## 5. Komponen inti (buat reusable di Figma & kode)

1. **Navbar** — logo (kiri) · tombol WhatsApp + tombol menu (kanan). Melayang, latar transparan → solid saat scroll.
2. **Menu slide-in** — overlay `--bg-overlay`, turun dari atas; item besar (Archivo): Home / About / Product / Contact + link sosial mono di bawah.
3. **Tombol** — *Primary* (fill cobalt, teks bone), *Ghost* (outline hairline), *WhatsApp* (ikon + label).
4. **Index Card (kartu produk)** — foto dengan **hover image-swap** (depan ↔ belakang/detail), nomor subjek (mono), nama, harga, badge status. Garis hairline, tanpa bayangan berat.
5. **Badge status** — OPEN / LIMITED / PO / SOLD, warna `--status-*`, teks mono kecil.
6. **Editorial block** — gambar + caption "lokasi, tahun / subjek" (mono) untuk scroll horizontal.
7. **Statement band** — satu baris manifesto besar (opsional Fraunces), full-bleed, parallax halus.
8. **Footer** — slogan, kaos kecil, link sosial + WhatsApp + Shopee, newsletter.

---

## 6. Motion (ringkas — detail per scene ada di STORYBOARD.md)

- **Easing:** reveal masuk = `--ease-out`; scroll-linked = `--ease-inout`.
- **Durasi:** micro 150ms (hover/tap) · standar 400ms (komponen) · scene 800ms (antar-adegan).
- **Aturan:** gerak sedikit, lambat, disengaja. Hormati `prefers-reduced-motion` (semua durasi → 0). Satu wow (3D), sisanya tenang.

---

## 7. Voice / Copywriting

Deadpan, editorial, terkendali. Kriminologi sebagai lensa intelektual, bukan lelucon murahan.

- Katalog = **Index**; produk = **Subject 003**; kategori = **Filed under: War on Drugs**.
- CTA: "Amankan di Shopee →", "Tanya via WhatsApp →", "Lihat berkas lengkap →".
- Hindari bahasa iklan generik ("Beli sekarang! Diskon gila!"). Nada: percaya diri, kering, sedikit ironis.

---

## 8. SEO & Performa (dibangun sejak awal, bukan belakangan)

- Next.js **SSG/SSR**, metadata + Open Graph per halaman, JSON-LD `Product` & `LocalBusiness`, sitemap + robots.
- Gambar WebP/AVIF, `next/image`, lazy-load 3D + fallback `<img>` still render kaos untuk HP lemah.
- Target: LCP < 2.5s (mobile 4G), CLS < 0.1. Animasi berat **tidak boleh** mengorbankan ini.
