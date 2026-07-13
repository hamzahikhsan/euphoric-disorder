# Design System — euphoric.disorder

**v1 (profesional & modern) · 9 Juli 2026**

Sistem desain untuk website profil. Arah: **modern, bersih, editorial, dewasa.** Warna gelap sebagai basis, satu aksen, tipografi kuat, ruang lega. Tema kriminologi = subteks lewat bahasa, bukan properti visual.

---

## 0. Aturan Anti-"AI Slop" (baca dulu — ini yang membedakan hasil bagus vs generik)

**JANGAN:**
- Gradien ungu-biru "techy", glow neon berlebihan, glassmorphism, bayangan tebal di mana-mana.
- Semua rata tengah + hero raksasa berisi tagline kosong tanpa isi.
- Emoji sebagai ikon, ikon acak yang tak konsisten, stok foto generik.
- Border-radius besar di semua elemen (pill-everything), banyak warna aksen sekaligus.
- Spacing suka-suka, ukuran font acak, "lorem ipsum" yang dibiarkan.

**LAKUKAN:**
- Satu warna aksen saja, dipakai hemat. Kontras lewat **skala tipografi & ruang**, bukan warna.
- Grid & spacing konsisten (skala 4pt). Sudut tajam / radius kecil = terlihat editorial & sengaja.
- Konten **nyata** (nama produk, harga, cerita) sejak awal — bukan placeholder generik.
- Foto produk yang dikurasi & konsisten treatment-nya. Ruang kosong = disengaja, bukan kekosongan.
- Detail: alignment presisi, hierarki jelas, hover/focus state yang halus.

---

## 1. Prinsip

1. **Restraint.** Sedikit elemen, dieksekusi rapi. Ragu = buang.
2. **Tipografi memimpin.** Hierarki dibangun dari ukuran & berat huruf, bukan hiasan.
3. **Ruang itu fitur.** Whitespace (di sini: dark-space) lega & konsisten.
4. **Satu aksen.** Cobalt hanya untuk aksi & state aktif.
5. **Gerak secukupnya.** Reveal & hover halus; hormati `prefers-reduced-motion`.
6. **Cepat & mobile-first.** Performa bagian dari desain.

---

## 2. Warna

Basis gelap, teks bone, satu aksen cobalt. Status color hanya untuk badge.

| Peran | Nama | Hex |
|---|---|---|
| Latar utama | bg | `#0E0E10` |
| Surface/kartu | surface | `#17171A` |
| Surface hover | surface-2 | `#1E1E22` |
| Latar tenggelam (footer) | sunken | `#09090B` |
| Teks utama | text | `#EDE7D8` |
| Teks sekunder | text-muted | `#A8A399` |
| Teks tersier/label | text-dim | `#6E6A62` |
| **Aksen (link/CTA/aktif)** | accent | `#2F5BFF` |
| Aksen hover | accent-hover | `#4A72FF` |
| Garis/hairline | line | `rgba(237,231,216,0.12)` |
| Status OPEN | ok | `#6FBF8B` |
| Status LIMITED/PO | warn | `#C8952E` |
| Status SOLD | sold | `#B4483C` |

Rasio: ~85% layar bg+text, aksen < 10%. Cek kontras teks ≥ 4.5:1.

---

## 3. Tipografi

Semua gratis via Google Fonts (`next/font`).

| Peran | Font | Ukuran | Catatan |
|---|---|---|---|
| Display / hero | **Archivo** 700 | `clamp(2.5rem, 6vw, 5rem)` | tracking `-0.02em` |
| Judul section | Archivo 600 | `clamp(1.75rem, 3vw, 2.75rem)` | |
| H3 / kartu | Archivo 600 | `1.25rem` | |
| Body | **Inter** 400 | `1rem` / lh `1.6` | |
| Body besar (intro) | Inter 400 | `1.125rem` | |
| Label / metadata | **JetBrains Mono** | `0.75rem` | UPPERCASE, tracking `0.12em`, hemat |

Disiplin: **2 keluarga + 1 mono.** Mono hanya untuk label kecil (nomor Subject, kategori), jangan untuk paragraf.

---

## 4. Spacing, Grid, Radius

- **Spacing (4pt):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128.
- **Container:** max-width `1200px`, padding samping `24px` (mobile `16px`).
- **Grid:** 12 kolom desktop / 4 kolom mobile; gutter `24px`.
- **Kartu produk:** 2 kolom (mobile) → 3–4 (desktop).
- **Radius:** `2px` (tombol/input), `4px` (kartu), `0` (blok besar). Tidak ada pill.
- **Border:** hairline `1px solid line`. Bayangan: minimal / tidak ada (editorial = flat).

---

## 5. Komponen (dengan state)

- **Header** — logo kiri; nav + tombol WhatsApp kanan. Transparan di atas → `bg` + hairline saat scroll. Mobile: hamburger → overlay `sunken`, item besar.
- **Tombol**
  - *Primary:* fill `accent`, teks `bg`, hover `accent-hover`.
  - *Ghost:* transparan, border `line`, teks `text`; hover border `text-muted`.
  - *WhatsApp:* ghost + ikon; teks "Tanya via WhatsApp".
- **Product Card** — surface, hairline; foto (rasio 4:5), nama, harga/"Harga menyusul", badge status. Hover: `surface-2` + image-swap ke foto ke-2 (bila ada) + underline `accent` pada nama.
- **Status Badge** — mono kecil; warna sesuai status.
- **Gallery (detail)** — 1 gambar utama + thumbnail; klik/hover ganti utama; zoom halus opsional.
- **Info panel (detail)** — sticky di desktop; nama, Subject, bahan, harga, status, deskripsi, kategori, CTA.
- **Section header** — label mono kecil di atas + judul Archivo (mis. `INDEX` / "Pilihan").
- **Footer** — `sunken`; ringkas brand, kolom link, sosial, tombol WhatsApp, copyright.
- **Form (contact, opsional)** — input `surface`, border `line`, focus border `accent`; label jelas.

---

## 6. Motion

- **Easing:** masuk `cubic-bezier(0.22,1,0.36,1)`; umum `ease-out`.
- **Durasi:** hover `150ms` · komponen `300–400ms` · reveal `500ms`.
- **Pola:** reveal (opacity 0 + translateY 16–24px → normal) saat masuk viewport, stagger 60ms, sekali jalan. Hover state halus. Header shrink saat scroll.
- **Wajib:** `@media (prefers-reduced-motion: reduce)` → matikan translate/opacity animasi.
- Tidak ada carousel auto-play, parallax berat, atau loader lama.

---

## 7. Imagery

- Foto produk: treatment konsisten (background, crop, pencahayaan seragam). Rasio kartu **4:5**.
- Hindari stok foto generik. Kalau butuh visual pendukung, buat yang terkurasi (bisa generate bergaya brand, lalu diseragamkan).
- Semua gambar: `next/image`, WebP/AVIF, `alt` deskriptif.

---

## 8. Tokens siap pakai (copy ke `styles/tokens.css`, map ke Tailwind)

```css
:root {
  --bg:#0E0E10; --surface:#17171A; --surface-2:#1E1E22; --sunken:#09090B;
  --text:#EDE7D8; --text-muted:#A8A399; --text-dim:#6E6A62;
  --accent:#2F5BFF; --accent-hover:#4A72FF;
  --line:rgba(237,231,216,0.12);
  --ok:#6FBF8B; --warn:#C8952E; --sold:#B4483C;

  --font-display:"Archivo",sans-serif;
  --font-body:"Inter",system-ui,sans-serif;
  --font-mono:"JetBrains Mono",ui-monospace,monospace;

  --maxw:1200px; --radius:4px; --radius-sm:2px;
  --ease:cubic-bezier(0.22,1,0.36,1);
  --dur-fast:150ms; --dur:350ms; --dur-slow:500ms;
}
@media (prefers-reduced-motion: reduce){
  :root{ --dur-fast:0ms; --dur:0ms; --dur-slow:0ms; }
}
```

---

## 9. Voice (ringkas)
Deadpan, editorial, kering, percaya diri. Kosakata arsip: *Index, Subject, Filed under*. Hindari bahasa iklan & tanda seru beruntun. Detail & contoh: `02-BRAND-PROFILE.md`.
