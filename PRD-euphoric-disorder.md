# PRD — Website euphoric.disorder

**Versi:** 1.0 · **Tanggal:** 5 Juli 2026
**Pemilik produk:** Hamzah · **Desain & build:** Claude
**Status:** Siap untuk fase desain (Claude Design → Claude Code)

---

## 1. Ringkasan

Website brand untuk **euphoric.disorder** — brand streetwear/sablon bertema **kriminologi (comedy · criminologist · creativity)**. Saat ini brand hanya hadir di Instagram (@euphoric.disorder, 959 followers, 47 post) dan berjualan lewat Shopee. Belum punya website.

Website ini bukan toko online penuh, melainkan **rumah brand + katalog interaktif** yang membangun keinginan, lalu mengarahkan transaksi ke **Shopee / WhatsApp**. Estetika: **Riso / Sablon** (cetak sablon: kertas, halftone, misregistrasi, overprint) — dipilih karena jujur pada produk brand (sablon) dan sulit terlihat "generik/AI".

**Konsep naratif:** *The Case Files* — setiap produk diperlakukan sebagai "berkas perkara / barang bukti".

---

## 2. Tujuan & Metrik Sukses

| Tujuan | Metrik |
|---|---|
| Bangun kredibilitas & identitas brand milik sendiri | Kunjungan berulang, durasi sesi, scroll-depth |
| Arahkan traffic ke pembelian | Klik "ke Shopee" & "WhatsApp" (event tracking) |
| Tampil beda & memorable (bukan generik) | Kualitatif: feedback audiens, share |
| Cepat & nyaman di HP | Core Web Vitals hijau (LCP < 2.5s, CLS < 0.1) |

**Non-goal (di luar cakupan v1):** checkout/pembayaran sendiri, akun user, keranjang, manajemen stok, blog CMS. (Bisa jadi fase berikutnya.)

---

## 3. Target Pengguna

1. **Kolektor streetwear humoris** (18–28, mobile-first, dari IG/TikTok) — mau desain unik + cerita di baliknya.
2. **Pemesan custom / komunitas** — butuh proses order jelas & contoh hasil.
3. **Pembeli dari marketplace** — datang cari produk, butuh kepercayaan (foto real, status stok).

---

## 4. Prinsip Desain (acuan wajib)

1. **Kertas dulu, layar belakangan** — basis newsprint, bukan dark-mode digital.
2. **Satu momen "wow"** — 3D kaos interaktif hanya di Home; halaman lain tenang.
3. **Ketidaksempurnaan disengaja** — misprint, elemen miring, cap, selotip.
4. **Tinta terbatas** — Ink + Pink + Blue; ungu lahir dari overprint pink×blue.
5. **Mobile-first & cepat** — fallback gambar untuk 3D di HP lemah.
6. **Suara deadpan-forensik** — copy bertema kriminologi, bukan bahasa iklan.

> Referensi teknis/nilai final: file **`design-system/euphoric-disorder-design-system-RISO.html`** + **`design-system/tokens-riso.css`**.

---

## 5. Sistem Desain (ringkas)

- **Warna:** Paper `#F1E7D2`, Ink `#161009`, Pink `#FF2E88`, Blue `#2436D8`, Overprint/Purple `#7A1F9E` (pink×blue), Acid `#E4EA1F` (jarang).
- **Font:** Anton (display), Archivo Black (heading), Inter (body), Space Mono (label/berkas). Semua Google Fonts.
- **Print FX:** halftone dots, misregistrasi (text-shadow pink+blue), hard-shadow (bukan glow), sudut tajam, garis koran, cap & selotip.
- **Grid:** 12 kolom, max 1180px, spacing 8pt.

---

## 6. Arsitektur Informasi / Sitemap

```
Home ("The Board")  ← satu-satunya halaman sangat interaktif
├── About Us
├── Product (katalog "Case Files")
│   └── Product Detail ("Case #XX") → tombol Shopee / WA
└── Contact
```

**Navbar (global):** logo (kiri) · tombol **WA Business** + tombol **menu** (kanan) → panel **slide-in dari atas** berisi Home / About Us / Product / Contact.

---

## 7. Requirement per Halaman

### 7.1 HOME (5 scene, scroll-driven)

**SCENE 0 — Splash / Welcome**
- Layar kertas kosong; **logo digambar oleh line-animation** (SVG stroke), lalu **zoom-in** → masuk Home.
- **Wajib:** durasi ≤ 2–3 detik, **skippable** (klik/tap), dan **tidak muncul lagi** pada kunjungan berikutnya (simpan flag). Hormati `prefers-reduced-motion`.

**SCENE 1 — Hero**
- **Kaos 3D di tengah**, bisa diputar dengan drag kursor/sentuh.
- **Headline besar di belakang** kaos (Anton, boleh misregistrasi).
- **Teks pendukung di sudut-sudut** (Space Mono, gaya catatan berkas: nomor kasus, tag).
- Navbar melayang.

**SCENE 2 — About (summary)**
- Saat scroll: kaos **ikut turun + rotate 360°**, berhenti di **KIRI**.
- **KANAN:** headline + deskripsi singkat about + **CTA** (mis. "Baca Berkas Lengkap →" ke About Us).

**SCENE 3 — Product Showcase**
- Kartu produk awal **menumpuk (stacked)**, saat scroll **menyebar melebar** (spread) jadi barisan "Case Card".
- Tiap kartu: foto (treatment fotokopi/halftone), nomor kasus, nama, harga, badge status. Klik → Product Detail.

**SCENE 4 — Footer**
- **Model 3D di tengah-bawah**; **slogan di atasnya**; teks kiri/kanan terhubung ke **social/halaman**; tombol ke **nomor bisnis (WA)** di bawah model.

### 7.2 ABOUT US
- Cerita brand (tema kriminologi/edukasi), nada deadpan. Layout editorial (teks besar + foto ditempel selotip). Tidak perlu 3D berat.

### 7.3 PRODUCT (katalog)
- Grid "Case Card" semua produk. Filter sederhana opsional (mis. Kaos / Hoodie). Data awal: lini **#WarOnDrugs Cotton Combed 24s** (M3, M7 Lego, M8, M14, S4) + **Candy Hoodie ED** (limited).

### 7.4 PRODUCT DETAIL ("Case #XX")
- Foto besar (bisa beberapa angle) + nomor kasus, bahan, harga, keterangan deadpan, status (OPEN/PO/LIMITED/SOLD).
- **CTA utama: "Amankan di Shopee →"** + **"Tanya via WhatsApp →"**. (Tanpa checkout sendiri.)

### 7.5 CONTACT
- Tombol WA, IG, Shopee, Threads, alamat/kota, jam operasional, FAQ singkat. Form opsional ("Lapor Kasus Baru" untuk custom order).

---

## 8. Data Produk (terkonfirmasi + ⚠️ perlu dilengkapi)

| # | Produk | Bahan | Harga | Status |
|---|---|---|---|---|
| 001 | Candy Hoodie ED (Limited) | Fleece | **Rp 350.000** | Pre-Order / Limited |
| 003 | Kaos #WarOnDrugs — M3 | Cotton Combed 24s | ⚠️ Rp — | ⚠️ |
| 007 | Kaos #WarOnDrugs — M7 "Lego" | Cotton Combed 24s | ⚠️ Rp — | ⚠️ |
| 008 | Kaos #WarOnDrugs — M8 | Cotton Combed 24s | ⚠️ Rp — | ⚠️ |
| 014 | Kaos #WarOnDrugs — M14 | Cotton Combed 24s | ⚠️ Rp — | ⚠️ |
| — | Kaos #WarOnDrugs — S4 | Cotton Combed 24s | ⚠️ Rp — | ⚠️ |

⚠️ **Perlu kamu isi:** harga tiap kaos, nomor WA Business, slogan toko, teks About, link Shopee per produk, kota/lokasi.

---

## 9. Aset (yang akan di-attach)

| Aset | Status | Catatan |
|---|---|---|
| Model 3D kaos | ✅ Sudah dioptimasi | `assets/models/tshirt-1k.glb` (1.8MB) / `tshirt-2k.glb` (2.1MB) |
| Logo | ✅ SVG ada | Perlu **versi outline 1-warna** untuk splash line-animation (bisa Claude buat) |
| Foto produk | ✅ 7 file | `Media/Gambar/…` — akan di-treatment fotokopi/halftone |
| Design system | ✅ | `design-system/*RISO.html` + `tokens-riso.css` |
| Render still kaos (fallback 3D) | ⚠️ Belum | Untuk HP lemah; bisa dibuat dari model |

---

## 10. Requirement Non-Fungsional

- **Performa:** LCP < 2.5s (mobile 4G), total transfer awal ringan; 3D lazy-load + fallback gambar; gambar WebP.
- **Responsif:** desktop 1440 & mobile 390 sebagai acuan; semua scene punya versi mobile.
- **Aksesibilitas:** kontras cukup, fokus keyboard, `prefers-reduced-motion`, alt text.
- **SEO:** meta, Open Graph (untuk share IG), sitemap, judul per halaman.
- **Browser:** Chrome, Safari, Firefox terbaru (desktop + mobile).
- **Analytics:** event klik Shopee/WA, scroll-depth (Vercel Analytics/Umami).

---

## 11. Tech (fase build — setelah desain)

- **Framework:** Next.js (App Router) + Tailwind + shadcn/ui (di-skin Riso).
- **3D:** React Three Fiber + drei (Draco loader) — hanya Home; fallback `<img>` di mobile lemah.
- **Motion:** GSAP + ScrollTrigger + Lenis (scroll-linked 3D & card spread); splash SVG stroke.
- **Konten:** data produk sebagai file lokal (JSON/MDX) — belum perlu CMS.
- **Deploy:** Vercel + domain + analytics.

---

## 12. Milestone

1. **Desain (Claude Design):** frame statis 5 scene + About/Product/Detail/Contact (desktop + mobile), pakai skin Riso. ← *berikutnya*
2. **Prototipe kode:** Hero + kaos 3D (validasi rasa gerak).
3. **Build statis:** semua halaman + navbar + slide-in + integrasi Shopee/WA.
4. **Lapisan interaktif:** splash, scroll-3D, card spread, micro-interaction.
5. **Optimasi & rilis:** performa, SEO, deploy.

---

## 13. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| 3D berat di HP | Model sudah 1.8MB; lazy-load + fallback gambar wajib |
| Splash mengganggu | ≤3s, skippable, sekali tampil |
| Data produk belum lengkap | Pakai placeholder ⚠️, ganti setelah kamu isi |
| Nama IG vs Shopee beda | Jelaskan/selaraskan di website & tombol yang benar |
| Copy jatuh generik | Wajib nada deadpan (lihat design system §Voice) |

---

## 14. Open Questions
1. Harga tiap kaos #WarOnDrugs?
2. Nomor WA Business & jam operasional?
3. Slogan resmi toko?
4. Toko Shopee `compaxgrup` = milik resmi? Link Shopee per produk?
5. Kota/lokasi produksi + apakah terima custom satuan?
```
```
