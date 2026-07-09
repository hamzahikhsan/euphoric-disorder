# Prompt untuk Claude Design — UI euphoric.disorder

Cara pakai: buka Claude Design → **attach dulu** aset ini di chat yang sama:
1. `design-system/euphoric-disorder-design-system-RISO.html` (acuan visual utama)
2. `design-system/tokens-riso.css`
3. `PRD-euphoric-disorder.md`
4. Logo SVG (`logo euphoric.svg`)
5. Model 3D (`tshirt-1k.glb`) — sebagai referensi bentuk kaos
6. Foto produk dari `Media/Gambar/`

Lalu **paste prompt di bawah**. (Ada 2 versi: A = generate seluruh situs sekaligus; B = per-layar untuk iterasi lebih terkontrol. Untuk waktu terbatas, pakai A dulu.)

---

## ▶️ VERSI A — Prompt utama (paste apa adanya)

```
Kamu adalah senior product designer. Desainkan UI website untuk brand streetwear/sablon
"euphoric.disorder" (tema: kriminologi — comedy · criminologist · creativity). Aku sudah
melampirkan design system, tokens, PRD, logo, model 3D kaos, dan foto produk. IKUTI design
system yang dilampirkan secara ketat — jangan bikin gaya baru.

## ARAH VISUAL (WAJIB) — "Riso / Sablon"
Estetika cetak sablon/risograph di atas KERTAS, BUKAN dark-mode digital:
- Basis kertas newsprint #F1E7D2, tinta Ink #161009, Pink #FF2E88, Blue #2436D8.
- Ungu (warna logo) HANYA lahir dari overprint pink×blue (multiply) #7A1F9E — jangan gradient digital.
- Efek cetak: halftone dots, MISREGISTRASI (headline punya ghost pink+biru offset 2–3px),
  hard-shadow offset (BUKAN glow blur), sudut TAJAM (radius 0), garis tebal ala koran, cap & selotip miring.
- Font: Anton (headline UPPERCASE), Archivo Black (sub-heading), Inter (body), Space Mono (label/berkas UPPERCASE).
- Tekstur grain kertas halus di seluruh layar.

## HINDARI (anti-generik/AI)
Jangan: dark background + neon glow, gradient ungu-biru mulus, kartu ber-rounded lembut,
drop-shadow blur, layout SaaS (hero tengah + 3 kartu fitur + ikon garis), copy marketing generik.

## KONSEP
"THE CASE FILES" — tiap produk = berkas perkara/barang bukti. Nomor kasus, status OPEN/PO/LIMITED/SOLD,
keterangan bernada forensik-deadpan.

## DELIVERABLE
Desain FRAME STATIS (hi-fi) untuk DESKTOP (1440px) dan MOBILE (390px) untuk halaman berikut.
Untuk area animasi/3D, tampilkan sebagai state statis + beri anotasi teks kecil soal geraknya
(karena animasi dibuat nanti di tahap kode).

### 1) HOME (buat sebagai beberapa frame bertumpuk = potongan scroll)
- SPLASH: layar kertas, logo di tengah (pakai logo terlampir) dengan anotasi "line-animation lalu zoom-in". Skippable.
- HERO: kaos 3D di TENGAH (pakai render/foto kaos terlampir sebagai placeholder, beri label "3D — bisa diputar"),
  HEADLINE BESAR di belakang kaos (contoh: "ALWAYS BRINGING THE FIGHT" — misregistrasi), teks pendukung Space Mono di sudut-sudut (nomor kasus, tag #WarOnDrugs). Navbar melayang.
- ABOUT SUMMARY: kaos di KIRI (anotasi "rotate 360° saat scroll"), KANAN = headline + deskripsi singkat + tombol CTA "Baca Berkas Lengkap →".
- SHOWCASE: kartu produk "Case Card" (anotasi "stacked → menyebar saat scroll"). Pakai foto produk terlampir, treatment fotokopi/halftone.
- FOOTER: kaos 3D di tengah-bawah, slogan di atasnya, teks kiri/kanan (social + halaman), tombol "Business Enquiries / WA" di bawah model.

### 2) NAVBAR + PANEL SLIDE-IN
Navbar: logo kiri; kanan = tombol "WA Business" + tombol menu (garis 3). Menu diklik → panel slide-in
dari atas berisi Home / About Us / Product / Contact (Anton besar + nomor 01–04 Space Mono).

### 3) ABOUT US — editorial, teks besar + foto ditempel selotip. Nada deadpan kriminologi.

### 4) PRODUCT (katalog) — grid "Case Card" semua produk (#WarOnDrugs M3/M7/M8/M14/S4 + Candy Hoodie ED).

### 5) PRODUCT DETAIL "Case #XX" — foto besar + nomor kasus, bahan, harga, keterangan deadpan, status,
CTA "Amankan di Shopee →" + "Tanya via WhatsApp →". (Tidak ada checkout sendiri.)

### 6) CONTACT — WA/IG/Shopee/Threads, kota, jam, FAQ singkat, form opsional "Lapor Kasus Baru".

## KOMPONEN (pakai dari design system): buttons (blok tinta padat, hard-shadow, sudut tajam),
badges Limited/Pre-Order/Sold, stamps (Evidence/Classified/Exhibit A), form fields, case card, footer.

## COPYWRITING — nada deadpan-forensik, Bahasa Indonesia santai-cerdas. Contoh:
"Barang bukti #014. Cotton Combed 24s. Status: masih buron di Shopee." Hindari hard-sell & emoji berlebihan.

## DATA
Produk: Candy Hoodie ED (Rp 350.000, Limited), Kaos #WarOnDrugs Cotton Combed 24s (harga pakai placeholder "Rp —").
Untuk teks yang belum ada (slogan, about, WA), pakai placeholder yang jelas ditandai [ISI].

Mulai dari HOME desktop, lalu mobile, lalu halaman lain. Konsisten dengan design system di semua frame.
```

---

## ▶️ VERSI B — Prompt per-layar (untuk iterasi terkontrol)

Kalau hasil Versi A terlalu ramai/meleset, kerjakan satu layar per prompt. Template:

```
Pakai design system Riso/Sablon yang dilampirkan (kertas, tinta Ink/Pink/Blue, halftone,
misregistrasi, hard-shadow, sudut tajam, font Anton/Archivo Black/Inter/Space Mono).
Desain HANYA [NAMA LAYAR], versi [DESKTOP 1440 / MOBILE 390].
Isi & tata letak: [salin bagian layar itu dari PRD §7].
Anotasi gerak (statis + catatan): [jelaskan animasinya].
Jangan pakai dark-neon/gradient/rounded-glow. Copy nada deadpan-forensik.
```

Contoh isian `[NAMA LAYAR]`: "HOME — Hero", "HOME — Showcase", "Product Detail", dst.

---

## Tips agar hasilnya tidak melenceng
1. **Selalu attach `...RISO.html`** di tiap chat — itu jangkar visualnya.
2. Kalau Claude Design mulai "membersihkan" jadi rapi-digital, ingatkan: *"pertahankan tekstur cetak: halftone, misregistrasi, hard-shadow, sudut tajam — jangan glow/gradient."*
3. Untuk 3D & animasi: cukup **frame statis + anotasi**. Gerak sungguhan dibuat saat pindah ke kode.
4. Simpan tiap frame yang oke sebelum minta variasi baru.

> Setelah frame desain jadi, langkah berikutnya: pindah ke Claude Code — aku rebuild di Next.js + React Three Fiber + GSAP, memakai `tokens-riso.css` dan model 3D yang sudah dioptimasi.
