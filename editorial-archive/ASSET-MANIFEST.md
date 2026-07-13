# ASSET MANIFEST — euphoric.disorder

**v3 · 9 Juli 2026.** Daftar aset untuk build. Path relatif dari root project.

---

## ✅ Siap pakai

| Aset | Path | Ukuran | Catatan |
|---|---|---|---|
| Model 3D kaos (mobile) | `assets/models/tshirt-1k.glb` | 1.8 MB | **Pakai ini** untuk hero mobile |
| Model 3D kaos (desktop) | `assets/models/tshirt-2k.glb` | 2.1 MB | Desktop |
| Logo | `Media/Logo/logo euphoric.svg` | 87 KB | Untuk navbar + preloader (butuh path SVG untuk line-animation) |
| Foto Candy Hoodie | `assets/img/candy-hoodie.png` | 452 KB | → convert WebP |
| Foto #WarOnDrugs M3 | `assets/img/warondrugs-m3.png` | 124 KB | → WebP |
| Foto #WarOnDrugs M7 (Lego) | `assets/img/warondrugs-m7.png` | 98 KB | → WebP |
| Foto #WarOnDrugs M8 | `assets/img/warondrugs-m8.png` | 128 KB | → WebP |
| Foto #WarOnDrugs M14 | `assets/img/warondrugs-m14.png` | 279 KB | → WebP |
| Foto #WarOnDrugs S4 | `assets/img/warondrugs-s4.png` | 153 KB | → WebP |
| Foto #WarOnDrugs S4 (alt) | `assets/img/warondrugs-s4b.png` | 126 KB | angle kedua → hover-swap |

**Tugas build:** convert semua PNG → WebP/AVIF, taruh di `public/img/products/`. Copy model 1k/2k → `public/models/`.

---

## ⚠️ Perlu dibuat / dilengkapi

| Aset | Oleh | Catatan |
|---|---|---|
| **Render still kaos** (fallback 3D) | Claude Code / Higgsfield | 1 gambar hero kaos untuk HP lemah & reduced-motion |
| **Logo SVG 1-warna (outline)** | Claude Code | Untuk preloader line-animation (perlu single path) |
| **Foto back/detail** tiap produk | Hamzah | Untuk hover image-swap (baru S4 punya angle ke-2) |
| **OG image** per halaman | Claude Code | Share IG/WA |
| Hero visual / tekstur editorial (opsional) | Higgsfield (di Cowork) | Bila mau memperkaya mood |

---

## ⚠️ Data teks (dari Hamzah)

Harga tiap kaos · nomor WA Business + jam · slogan · teks About · link Shopee per produk · kota/lokasi + info custom.
Sampai terisi: pakai placeholder jelas ("Harga menyusul", `wa.me/PLACEHOLDER`).

---

## 🗄️ Arsip — JANGAN dipakai

| Item | Alasan |
|---|---|
| `oversized_t-shirt.glb` (37 MB) | Terlalu berat; sudah ada versi 1k/2k |
| `site/`, `web/` | App lama duplikat; rewrite bersih |
| `design-system/` (RISO + tokens lama) | Tema lama (RISO/Case Files), diganti `editorial-archive/` |
| `PRD-euphoric-disorder.md`, `BLUEPRINT-v2*`, `RENCANA-*` | Perencanaan lama; diganti `PRD-v3.md` + `BUILD-SPEC.md` |
| `prototype-home.html` (2.5 MB) | Prototipe lama |
