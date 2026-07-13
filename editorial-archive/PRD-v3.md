# PRD v3 — Website euphoric.disorder (Profil Bisnis)

**Versi:** 3.0 · **Tanggal:** 9 Juli 2026 · **Pemilik:** Hamzah · **Build:** Claude Code
**Status:** Siap build (fase profil). Menggantikan PRD v1 (RISO/"Case Files") yang **usang**.

> ⚠️ Untuk Claude Code: abaikan `PRD-euphoric-disorder.md` lama dan folder `design-system/` lama (RISO). Sumber kebenaran sekarang = folder `editorial-archive/`.

---

## 1. Ringkasan

Website brand untuk **euphoric.disorder** — brand streetwear/sablon dengan tema kriminologi (*comedy · criminologist · creativity*). Saat ini hanya hadir di Instagram (@euphoric.disorder, 959 followers) & berjualan di Shopee.

Ini **bukan toko online** (fase 1). Ini **rumah brand + katalog** yang membangun kredibilitas & keinginan, lalu mengarahkan transaksi ke **Shopee / WhatsApp**.

**Tema desain:** "Editorial Archive" (dark) — profesional, editorial, tenang. Kriminologi hadir sebagai **subteks** (bahasa & kurasi: *Index, Subject, Archive*), **bukan** properti visual norak. Lihat `DESIGN-SYSTEM.md`.

---

## 2. Tujuan & Metrik

| Tujuan | Metrik |
|---|---|
| Bangun kredibilitas & identitas milik sendiri | Kunjungan berulang, durasi sesi, scroll-depth |
| Arahkan traffic ke pembelian | Klik "ke Shopee" & "WhatsApp" (event tracking) |
| Tampil beda & memorable | Feedback audiens, share |
| Visibilitas pencarian | **SEO kuat**: peringkat kata kunci brand, impresi Search Console |
| Cepat di HP | Core Web Vitals hijau (LCP < 2.5s, CLS < 0.1) |

**Non-goal (fase 1):** checkout/pembayaran, akun user, keranjang, manajemen stok, CMS. → Fase 2 (ecommerce), diputuskan nanti.

---

## 3. Target Pengguna

1. **Kolektor streetwear humoris** (18–28, mobile-first, dari IG/TikTok).
2. **Pemesan custom / komunitas**.
3. **Pembeli marketplace** yang butuh kepercayaan (foto real, status stok).

---

## 4. Arsitektur Informasi

```
Home ("Index")        ← satu-satunya halaman sangat interaktif (kaos 3D + scroll)
├── About
├── Product (katalog "Index")
│   └── Product Detail ("Subject #XX") → tombol Shopee / WhatsApp
└── Contact
```

**Navbar global:** logo (kiri) · tombol WhatsApp + tombol menu (kanan) → panel slide-in dari atas: Home / About / Product / Contact.

---

## 5. Requirement per Halaman

Detail gerak/animasi ada di `STORYBOARD.md`. Ringkas:

- **Home** — 5 scene scroll-driven: preloader → hero (kaos 3D + wordmark) → about-summary (kaos geser kiri) → product index (scroll horizontal + hover swap) → statement band → footer.
- **About** — editorial, reveal tenang, pull-quote, nada deadpan. Tanpa 3D berat.
- **Product** — grid "Index Card" semua produk, filter opsional (Kaos/Hoodie), hover image-swap.
- **Product Detail** — galeri besar + kolom info sticky (bahan, harga, status), CTA "Amankan di Shopee →" + "Tanya via WhatsApp →". Tanpa checkout.
- **Contact** — link WA/IG/Shopee/Threads, lokasi, jam, FAQ singkat, form opsional "Lapor Kasus Baru" (custom order).

---

## 6. Data Produk

| # | Produk | Bahan | Harga | Status |
|---|---|---|---|---|
| 001 | Candy Hoodie ED (Limited) | Fleece | Rp 350.000 | PO / Limited |
| 003 | Kaos #WarOnDrugs — M3 | Cotton Combed 24s | ⚠️ | ⚠️ |
| 007 | Kaos #WarOnDrugs — M7 "Lego" | Cotton Combed 24s | ⚠️ | ⚠️ |
| 008 | Kaos #WarOnDrugs — M8 | Cotton Combed 24s | ⚠️ | ⚠️ |
| 014 | Kaos #WarOnDrugs — M14 | Cotton Combed 24s | ⚠️ | ⚠️ |
| — | Kaos #WarOnDrugs — S4 | Cotton Combed 24s | ⚠️ | ⚠️ |

⚠️ **Perlu diisi Hamzah:** harga tiap kaos, nomor WA Business, slogan, teks About, link Shopee per produk, kota/lokasi. Sampai terisi, pakai placeholder yang jelas.

---

## 7. Non-Fungsional

- **Performa:** LCP < 2.5s (mobile 4G), 3D lazy-load + fallback gambar, WebP/AVIF.
- **Responsif:** desktop 1440 & mobile 390 acuan; semua scene punya versi mobile.
- **Aksesibilitas:** kontras cukup, fokus keyboard, `prefers-reduced-motion`, alt text.
- **SEO:** metadata + Open Graph per halaman, JSON-LD Product & LocalBusiness, sitemap, robots.
- **Analytics:** event klik Shopee/WA + scroll-depth (Vercel Analytics / Umami).

---

## 8. Open Questions (untuk Hamzah)
1. Harga tiap kaos #WarOnDrugs?
2. Nomor WA Business & jam operasional?
3. Slogan resmi toko?
4. Toko Shopee resmi = mana? Link Shopee per produk?
5. Kota/lokasi produksi + terima custom satuan?
