# Rencana Website — euphoric.disorder

**Jenis dokumen:** Analisis bisnis + arah kreatif + rencana pembangunan
**Disusun oleh:** Claude (UI/UX + Developer advisor)
**Tanggal:** 5 Juli 2026
**Status data:** Sebagian *dummy* (ditandai ⚠️) — mohon dikoreksi setelah kamu cek langsung

---

## 0. Baca ini dulu — kejujuran soal data

Aku **belum berhasil menarik data mentah** dari sumbermu. Alasannya teknis, bukan malas:

- **Instagram** (`euphoric.disorder`) sekarang login-gated dan di-render pakai JavaScript. Tanpa ekstensi browser yang tersambung ke sesi ini, aku tidak bisa membaca jumlah follower, caption, atau daftar postingan.
- **Shopee** (`compaxgrup`) juga full-JavaScript dan menolak permintaan tanpa browser sungguhan ("Please enable JavaScript").

Jadi semua angka bisnis di bawah ini adalah **placeholder** yang aku beri tanda ⚠️ **DUMMY**. Struktur analisisnya benar; tinggal kamu isi angka aslinya. Kalau kamu mau aku tarik data betulan, ada dua cara cepat:

1. Sambungkan ekstensi **Claude in Chrome**, lalu minta aku "buka profil IG & Shopee-nya" — aku baca langsung.
2. Atau kirim ke aku: screenshot profil IG (bio + highlight + 12 post teratas) dan screenshot etalase Shopee (produk + harga + jumlah terjual + rating).

> **Catatan penting soal identitas toko.** Link Shopee yang kamu kasih mengarah ke toko bernama **`compaxgrup`**, sementara Instagram-nya **`euphoric.disorder`**. Ini dua nama berbeda. Sebelum lanjut, aku perlu kamu pastikan: apakah `compaxgrup` memang toko Shopee resmi milik euphoric.disorder, atau itu supplier/reseller/afiliasi? Ini menentukan apakah website mengarahkan orang ke Shopee `compaxgrup` atau tidak. **Jangan sampai kita kirim traffic ke toko yang ternyata bukan milik mereka.**

---

## 1. Ringkasan Eksekutif

euphoric.disorder adalah brand sablon/kaos yang identitasnya dibangun lewat tag `#comedy #criminologist #creativity` — kombinasi yang jarang dan justru jadi kekuatan. Mereka **belum punya website**, jadi seluruh kepercayaan brand saat ini menumpuk di Instagram dan checkout numpang di Shopee. Peluang terbesarnya bukan "punya toko online" (Shopee sudah menangani itu), melainkan **punya rumah brand yang mengontrol first impression** — tempat cerita, humor, dan estetika "berkas kriminal" hidup tanpa dibatasi template marketplace.

Rekomendasi arahku: bangun **situs katalog eksperimental** (bukan e-commerce penuh) yang mengubah setiap desain kaos menjadi "berkas kasus" (*case file*), dengan satu **momen 3D fokus** (bukan 3D di mana-mana), lalu arahkan pembelian ke Shopee/WhatsApp. Stack: **Next.js + React Three Fiber (terbatas) + GSAP/Lenis + Tailwind**. Dibangun bertahap dalam 5 fase.

---

## 2. Analisis Bisnis

### 2.1 Profil Brand (sinyal nyata + asumsi)

| Aspek | Temuan | Sumber |
|---|---|---|
| Nama brand | euphoric.disorder | IG handle (nyata) |
| Kategori | Sablon / clothing / kaos custom | Brief kamu (nyata) |
| Positioning tema | Comedy × Criminologist × Creativity | Tag IG yang kamu sebut (nyata) |
| Toko Shopee | `compaxgrup` — perlu konfirmasi kepemilikan | Link kamu (ambigu) |
| Follower IG | ⚠️ DUMMY: ~8.500 | belum terverifikasi |
| Jumlah desain/produk | ⚠️ DUMMY: ~24 desain | belum terverifikasi |
| Rentang harga | ⚠️ DUMMY: Rp 85.000–150.000 | belum terverifikasi |
| Lokasi produksi | ⚠️ DUMMY: (kota belum diketahui) | belum terverifikasi |
| Kontak/CS | ⚠️ DUMMY: WhatsApp admin | belum terverifikasi |

### 2.2 Produk & Harga (⚠️ SELURUH TABEL DUMMY — untuk diganti)

| Produk | Bahan | Harga | Terjual (Shopee) | Rating |
|---|---|---|---|---|
| Kaos "Exhibit A" | Cotton Combed 24s | Rp 95.000 | ⚠️ 120 | ⚠️ 4.9 |
| Kaos "Cold Case" | Cotton Combed 30s | Rp 89.000 | ⚠️ 87 | ⚠️ 4.8 |
| Hoodie "Suspect No.7" | Fleece | Rp 199.000 | ⚠️ 41 | ⚠️ 5.0 |
| Custom sablon satuan | DTF / Plastisol | ⚠️ mulai Rp 75.000 | — | — |

> Aku sengaja isi nama produk dengan gaya "berkas kasus" supaya kamu bisa langsung merasakan nada brand-nya. Ganti dengan produk asli.

### 2.3 Segmen Audiens (hipotesis untuk divalidasi)

| Segmen | Karakteristik | Kebutuhan | Perkiraan ukuran |
|---|---|---|---|
| **Kolektor streetwear humoris** | 18–28 th, aktif IG/TikTok, suka desain nyeleneh & referensi pop | Desain unik, cerita di balik desain, edisi terbatas | ⚠️ ~50% |
| **Pemesan custom / komunitas** | Kelompok, event, UMKM lain butuh sablon satuan/grosir | Proses order jelas, contoh hasil, estimasi harga cepat | ⚠️ ~30% |
| **Impulse marketplace buyer** | Datang dari Shopee, cari murah + rating bagus | Kepercayaan (rating, foto real), checkout cepat | ⚠️ ~20% |

### 2.4 Funnel Saat Ini vs. Peran Website

Sekarang: **IG (discovery) → DM/link bio → Shopee (checkout)**. Titik bocornya ada di tengah — profil IG tidak bisa menceritakan brand secara mendalam, dan begitu orang mendarat di Shopee, semua estetika hilang tertelan template oranye marketplace.

Website mengisi celah itu sebagai **lapisan "pertimbangan & percaya"**: IG menangkap perhatian → **Website meyakinkan & membangun keinginan** → Shopee/WA menutup transaksi.

### 2.5 SWOT Singkat

- **Strength:** identitas tema yang kuat & tidak generik; sudah punya audiens IG; sudah ada infrastruktur jualan (Shopee).
- **Weakness:** tidak ada aset brand milik sendiri (semua "menyewa" di platform orang); nama IG vs Shopee tidak konsisten; data internal belum rapi.
- **Opportunity:** jadi brand streetwear lokal dengan *lore*/cerita — sesuatu yang tidak bisa ditiru marketplace; email/WA list untuk drop terbatas.
- **Threat:** brand sablon lokal sangat ramai & mudah ditiru desainnya; ketergantungan pada algoritma IG.

### 2.6 ✅ Data yang aku butuhkan dari kamu (checklist)

Isi ini dan kualitas seluruh website naik drastis:

1. Konfirmasi hubungan **euphoric.disorder ↔ compaxgrup** (milik sendiri / supplier / afiliasi).
2. Follower & engagement rata-rata IG.
3. Daftar produk asli: nama, foto, bahan, harga, link Shopee per produk.
4. Nomor WhatsApp CS + jam operasional.
5. Kota/lokasi produksi + apakah melayani custom satuan atau minimum order.
6. Cerita brand: siapa foundernya, kenapa nama "euphoric.disorder", kenapa tema kriminolog?
7. Aset visual yang sudah ada: logo, foto produk, foto model, font yang dipakai.
8. Kompetitor yang kamu anggap saingan/panutan (2–3 nama).

---

## 3. Arah Kreatif — dan cara menghindari "AI slop"

### 3.1 Konsep Besar: **"THE CASE FILES"** (Berkas Perkara)

Tema `criminologist + comedy + creativity` diterjemahkan menjadi satu metafora yang konsisten di seluruh situs: **setiap desain kaos adalah sebuah kasus** yang sedang "diselidiki".

- Halaman produk = **berkas perkara**: ada "nomor kasus", "barang bukti" (foto detail sablon), "keterangan saksi" (review pembeli), "status: OPEN/CLOSED (sold out)".
- Navigasi bergaya **papan investigasi** (cork board + benang merah) — tapi versi bersih, bukan norak.
- **Comedy** masuk lewat *copywriting deadpan*: keterangan forensik yang serius tapi absurd ("Tersangka terakhir terlihat mengenakan kaos ini di warkop, pukul 02.00. Motif: gabut.").
- Motif visual: pita garis polisi (caution tape) tipis sebagai pembatas, cap "EVIDENCE", sidik jari, teks ter-*redact* (sensor hitam) yang kalau di-hover kebuka.
- Interaksi tanda tangan: **momen 3D** = satu kaos "barang bukti utama" yang bisa diputar 360° di atas meja interogasi.

Kenapa konsep ini kuat: ia mengubah katalog biasa jadi **pengalaman bernarasi**, memberi alasan orang scroll sampai bawah, dan — penting — **tidak bisa diproduksi oleh generator template**. Ini benteng anti-slop-mu.

> Konsep ini sebuah usulan, bukan harga mati. Kalau kamu punya lore lain (misal foundernya memang anak kriminologi), kita pertajam ke sana.

### 3.2 Delapan aturan konkret supaya hasil TIDAK terasa AI/generik

"AI slop" itu bukan soal alat, tapi soal keputusan yang malas. Ini yang membedakan:

1. **Buang layout template SaaS.** Hindari pola klise: hero tengah + 3 kartu fitur + gradient ungu-biru + ikon garis. Itu bahasa visual "startup generik". Brand-mu bahasa visualnya "arsip kepolisian yang iseng".
2. **Pakai grid yang berani, bukan simetris sempurna.** Editorial/asymmetric layout, teks besar-besar (typography sebagai gambar), elemen yang sengaja "miring" seperti foto ditempel.
3. **Foto asli > stok/AI.** Foto produk sungguhan dengan pencahayaan konsisten mengalahkan render AI. Kalau perlu render, jangan render yang "terlalu sempurna licin".
4. **Copywriting punya suara.** Tulisan deadpan-komedik tadi adalah *moat*-mu. Jangan pakai kalimat pemasaran generik ("Kualitas terbaik dengan harga terjangkau"). Itu bunuh diri brand.
5. **Detail buatan tangan (handmade touches).** Tekstur kertas, noda kopi, cap karet, coretan spidol, font mesin tik. Ketidaksempurnaan yang disengaja = terasa manusia.
6. **Micro-interaction yang punya karakter**, bukan sekadar fade-in. Contoh: hover produk → stempel "EVIDENCE" jatuh dengan bunyi *thunk*; sensor hitam kebuka pas di-hover.
7. **Batasi palet & font, lalu konsisten total.** 2 font + 1 warna aksen. Konsistensi bikin brand terasa disengaja, bukan diacak mesin.
8. **Satu momen "wow" saja, sisanya bersih.** Jangan semua elemen bergerak. Kalau semua teriak, tidak ada yang kedengaran. Simpan 3D & animasi berat untuk **satu** titik fokus.

### 3.3 Palet & Tipografi (usulan awal)

- **Warna:** dasar kertas manila/off-white `#EDE6D6`, tinta hitam pekat `#141414`, satu aksen merah "garis polisi" `#C8102E`. Opsional kuning caution tape `#F2C200` sebagai aksen sekunder.
- **Font judul:** mesin tik / kondensasi tebal (mis. *Archivo*, *Anton*, atau *Redaction* — font ini literally bertema dokumen sensor, cocok banget).
- **Font teks:** monospace untuk kesan "laporan" (mis. *JetBrains Mono* / *Space Mono*) dipadu satu sans bersih (*Inter*) untuk keterbacaan panjang.
- Sumber font gratis & legal: Google Fonts, Fontshare.

---

## 4. Design System — dari mana diambil?

**Saran tegas: jangan "meng-ekstrak design system dari satu website lalu meniru".** Selain rawan plagiat & pelanggaran hak cipta, hasilnya akan terasa jiplakan dan justru melemahkan keunikan brand-mu. Yang benar adalah **membangun design system sendiri di atas fondasi teruji**, lalu memberinya "kulit" bertema Case Files.

Pendekatan yang aku rekomendasikan:

1. **Fondasi komponen:** pakai **shadcn/ui** (komponen React tanpa gaya bawaan yang mengikat, di atas Radix primitives). Ini memberi aksesibilitas & struktur benar, tapi 100% bisa kamu skin sesuai tema. Ini standar industri sekarang dan bukan "template jadi".
2. **Design tokens sendiri:** definisikan warna, spacing, radius, tipografi sebagai variabel (via Tailwind config). Inilah "design system"-mu yang sesungguhnya.
3. **Referensi inspirasi (untuk *mood*, BUKAN untuk dijiplak):** Awwwards, Godly (godly.website), Siteinspire, Land-book — lihat kategori editorial/streetwear/brutalist. Ambil *prinsip* (kontras, ritme, kejutan), bukan salin layout.
4. **Kelola aset di Figma:** buat 1 file Figma berisi style guide (warna, font, komponen kunci) sebelum ngoding. Aku bisa bantu susun strukturnya.

Jadi jawabannya: **design system dibangun sendiri di atas shadcn/ui + Tailwind tokens**, diberi identitas Case Files. Bukan diambil utuh dari web lain.

---

## 5. Rekomendasi Tech Stack (beserta alasan)

Karena **aku yang membangun**, situsnya **katalog + arahkan ke Shopee/WA** (tanpa checkout sendiri), dan kamu mau **eksperimental**, ini stack yang aku pilih:

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Framework | **Next.js (App Router)** | SEO bagus (penting buat ditemukan Google), rendering cepat, ekosistem React terbesar, gampang deploy. |
| Styling | **Tailwind CSS + shadcn/ui** | Cepat, konsisten, tokens rapi, komponen aksesibel yang bisa di-skin. |
| Animasi | **GSAP + Lenis (smooth scroll)** + **Framer Motion** | GSAP+ScrollTrigger untuk scroll-storytelling; Lenis untuk smooth scroll; Framer Motion untuk micro-interaction komponen. |
| 3D (terbatas) | **React Three Fiber + drei** | Hanya untuk SATU momen 3D (lihat §6). |
| Konten produk | **File data lokal (MDX/JSON)** dulu | Produkmu sedikit & jarang berubah — belum butuh CMS/database. Nanti bisa naik ke Sanity/Supabase. |
| Deploy | **Vercel** | Gratis untuk mulai, cepat, cocok dengan Next.js. |
| Analytics | **Vercel Analytics / Umami** | Ringan & hormat privasi. |

**Kenapa bukan no-code (Framer/Webflow)?** Untuk level "berani & eksperimental" dengan 3D interaktif + kontrol penuh atas micro-interaction, kode memberi kebebasan yang tidak dibatasi. Karena aku yang bangun, beban teknisnya di aku, bukan kamu.

**Kenapa bukan e-commerce penuh (Shopify)?** Kamu sudah punya Shopee. Membangun checkout sendiri = tanggung jawab pembayaran, ongkir, retur — kompleksitas besar tanpa manfaat sepadan di tahap ini. Katalog + redirect jauh lebih ramping.

---

## 6. Perlu model 3D untuk animasi interaktif? — Jawaban tegas

**Ya, tapi hanya SATU, dan dengan disiplin ketat.** Ini bagian di mana aku mendorong balik keinginan "3D eksperimental"-mu.

**Kenapa hati-hati:** mayoritas pembeli sablon di Indonesia buka via **HP kelas menengah dengan koneksi seluler**. 3D berat (model besar, banyak objek) bisa bikin situs berat, boros baterai, dan **menurunkan skor SEO (Core Web Vitals)** — artinya lebih susah ditemukan di Google. 3D di mana-mana = wow 5 detik, frustrasi setelahnya.

**Cara pakai 3D yang benar (rekomendasiku):**

- **Satu "barang bukti utama"**: model kaos 3D yang bisa diputar 360° di hero atau di satu halaman produk unggulan. Model dioptimasi (`.glb` terkompresi, draco), *lazy-load* (baru dimuat saat terlihat), dan **ada fallback gambar untuk HP lemah**.
- Sisanya cukup **2D + motion** (GSAP/Framer) yang jauh lebih ringan tapi tetap terasa hidup.

**Butuh bikin model 3D dari nol?** Belum tentu. Opsi termurah: pakai **model kaos gratis** (mis. dari Sketchfab berlisensi CC, atau primitive di Blender) lalu tempel tekstur desainmu sebagai material. Kalau nanti kamu mau kaos-nya benar-benar mirip produk, baru kita modelkan khusus di Blender. Untuk fase awal, **satu model kaos generik + tekstur** sudah cukup meyakinkan. (Blender tersedia di environment ini kalau kita butuh bikin/optimasi model.)

---

## 7. Wireframe & Sitemap — apakah perlu wireframe dulu?

**Ya, wajib — tapi cukup *low-fidelity* (kerangka kotak-kotak), bukan desain detail.** Urutannya: **sitemap → wireframe low-fi → design system → baru UI hi-fi → kode.** Melompati wireframe = revisi mahal di belakang.

### 7.1 Sitemap

```
euphoric.disorder (Home / "The Board")
├── The Case Files (Katalog produk)
│   └── Case #XX (Halaman produk → tombol ke Shopee/WA)
├── Custom Order ("Lapor Kasus Baru" — form brief sablon)
├── The Story (Tentang brand / lore)
├── Evidence (Galeri hasil / testimoni / UGC)
└── Contact (WA, IG, alamat, FAQ)
```

### 7.2 Wireframe low-fi Home ("The Board")

```
┌───────────────────────────────────────────────┐
│  [LOGO]            CASES  CUSTOM  STORY  ▨WA    │  ← nav ala label arsip
├───────────────────────────────────────────────┤
│                                                 │
│   EUPHORIC.DISORDER            ┌─────────────┐  │
│   "Setiap kaos punya           │   [3D KAOS  │  │ ← momen 3D tunggal
│    catatan kriminal."          │   diputar]  │  │
│   ▸ BUKA BERKAS                └─────────────┘  │
│   (caution-tape divider) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
├───────────────────────────────────────────────┤
│  CASE FILES (grid asimetris, kartu = map arsip) │
│  ┌────┐  ┌────┐  ┌────┐                          │
│  │#01 │  │#02 │  │#03 │  hover → stempel EVIDENCE│
│  └────┘  └────┘  └────┘                          │
├───────────────────────────────────────────────┤
│  THE STORY (teks besar + foto ditempel miring)  │
├───────────────────────────────────────────────┤
│  KETERANGAN SAKSI (testimoni bergaya BAP)       │
├───────────────────────────────────────────────┤
│  FOOTER: WA • IG • Shopee • "CLOSED AT 02.00"   │
└───────────────────────────────────────────────┘
```

### 7.3 Wireframe low-fi Halaman Produk ("Case #XX")

```
┌───────────────────────────────────────────────┐
│  ← KEMBALI KE PAPAN            CASE #07  [OPEN] │
├──────────────────────┬────────────────────────┤
│  [FOTO/3D BARANG      │  NAMA: "Cold Case"      │
│   BUKTI UTAMA]        │  BAHAN: Combed 30s      │
│  ┌────┬────┬────┐     │  HARGA: Rp 89.000       │
│  │thmb│thmb│thmb│     │  KETERANGAN (deadpan):  │
│  └────┴────┴────┘     │  "Tersangka..."         │
│                       │  ▸ AMANKAN DI SHOPEE →   │
│                       │  ▸ TANYA VIA WHATSAPP →  │
├──────────────────────┴────────────────────────┤
│  BARANG BUKTI TAMBAHAN (detail sablon close-up) │
│  KETERANGAN SAKSI (review pembeli)              │
│  BERKAS TERKAIT (produk lain)                   │
└───────────────────────────────────────────────┘
```

Alat wireframe: **Figma** (gratis). Aku bisa bantu susun wireframe & UI hi-fi di Figma sebelum ngoding — tinggal bilang.

---

## 8. Rencana Langkah-demi-Langkah (5 Fase)

### FASE 0 — Fondasi & Data *(sebelum desain apa pun)*
1. Kamu lengkapi **checklist data §2.6** (paling krusial).
2. Konfirmasi hubungan euphoric.disorder ↔ compaxgrup.
3. Kumpulkan aset: logo, foto produk, foto model.
4. Kunci **cerita brand & tone of voice** (biar copywriting konsisten).
**Output:** 1 folder aset + 1 dokumen brand brief. **Estimasi: 2–4 hari (di sisimu).**

### FASE 1 — Struktur & Design System
1. Finalisasi **sitemap** & **wireframe low-fi** (§7).
2. Bangun **design tokens** (warna, font, spacing) + style guide di Figma.
3. Tentukan komponen inti (nav, kartu berkas, tombol, footer).
**Output:** Figma style guide + wireframe disetujui. **Estimasi: 3–5 hari.**

### FASE 2 — Desain Hi-Fi (1–2 halaman kunci)
1. Desain penuh **Home** + **1 halaman produk** sebagai patokan rasa.
2. Uji nada visual: sudah "Case Files" & anti-generik? Revisi.
**Output:** 2 layar hi-fi. **Estimasi: 4–6 hari.**

### FASE 3 — Bangun Situs (aku yang kerjakan)
1. Setup Next.js + Tailwind + shadcn/ui + struktur data produk.
2. Bangun halaman statis dulu (Home, Katalog, Produk, Story, Contact) — **belum ada 3D/animasi berat**, fokus konten & responsif mobile.
3. Integrasi tombol ke Shopee/WA.
**Output:** situs fungsional & responsif. **Estimasi: 1–1,5 minggu.**

### FASE 4 — Lapisan Eksperimental
1. Tambah **smooth scroll (Lenis)** + **scroll-storytelling (GSAP)**.
2. Tambah **micro-interactions** bertema (stempel EVIDENCE, sensor hover, dll).
3. Tambah **satu momen 3D** (kaos putar 360°) dengan lazy-load + fallback gambar.
**Output:** situs dengan karakter penuh. **Estimasi: 1 minggu.**

### FASE 5 — Poles, Uji, Rilis
1. Optimasi performa (Core Web Vitals), kompres gambar/3D, uji di HP asli.
2. SEO dasar (meta, sitemap, Open Graph), aksesibilitas, uji lintas browser.
3. Deploy ke Vercel + sambungkan domain + pasang analytics.
**Output:** website live. **Estimasi: 3–5 hari.**

> **Total kasar: ~4–6 minggu** dengan alur sehat, sangat tergantung kecepatan Fase 0 di sisimu.

---

## 9. Setup & Tools yang perlu disiapkan

- **Domain**: beli (mis. `.com`/`.id`/`.store`) — usulan cek: `euphoricdisorder.com`.
- **Akun**: GitHub (simpan kode), Vercel (deploy), Figma (desain).
- **Font**: unduh dari Google Fonts / Fontshare (legal & gratis).
- **Model 3D**: satu `.glb` kaos (Sketchfab CC atau Blender), dioptimasi Draco.
- **Aset foto**: foto produk resolusi tinggi, latar konsisten.
- **WhatsApp Business** + link `wa.me` untuk tombol CTA.

*(Aku tidak akan membeli domain / membuat akun / bertransaksi atas namamu — langkah itu kamu lakukan sendiri; aku siapkan semua yang lain.)*

---

## 10. Risiko & Saran Tegas (bagian penasihat)

1. **Konsistensi nama brand.** IG `euphoric.disorder` vs Shopee `compaxgrup` membingungkan pembeli & melemahkan kepercayaan. Selesaikan ini dulu — idealnya nama Shopee diselaraskan atau minimal dijelaskan di website.
2. **Jangan korbankan mobile demi 3D.** Ini pasar mobile-first. Kalau harus memilih antara "keren di desktop" dan "cepat di HP", **pilih cepat di HP**. 3D tetap ada, tapi terkurung & ber-fallback.
3. **Copywriting adalah 50% dari brand ini.** Situs secantik apa pun akan terasa generik kalau teksnya template. Alokasikan waktu serius untuk nada deadpan-komedik. Kalau mau, aku bantu tulis.
4. **Mulai kecil, rilis, iterasi.** Jangan tunggu "sempurna dengan semua 3D" baru rilis. Fase 3 (situs bersih) sudah layak tayang; eksperimen menyusul.
5. **Hak cipta desain.** Karena temanya pop-culture/komedi, hati-hati desain yang meniru karakter/merek berlisensi — bisa jadi masalah hukum & kena takedown.
6. **Ukur.** Pasang analytics sejak hari pertama supaya keputusan desain berikutnya berbasis data, bukan tebakan.

---

## 11. Pertanyaan lanjutan untukmu

1. Konfirmasi: **compaxgrup itu toko resmi euphoric.disorder atau bukan?**
2. Mau aku **tarik data asli** IG/Shopee (via Chrome extension) atau kamu kirim screenshot?
3. Setuju dengan konsep **"The Case Files"**, atau ada lore lain yang lebih tepat?
4. Mau aku lanjut ke **wireframe/UI hi-fi di Figma**, atau langsung **prototype kode Home** biar kamu lihat rasanya?
5. Domain sudah punya atau belum?

---

*Dokumen ini kerangka kerja. Angka ⚠️ DUMMY tinggal diganti, dan begitu §2.6 terisi, aku bisa langsung lanjut ke wireframe atau prototipe kode.*
