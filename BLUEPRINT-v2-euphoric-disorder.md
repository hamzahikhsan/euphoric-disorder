# BLUEPRINT v2 — Website euphoric.disorder

**Update:** Data brand sudah terverifikasi langsung dari Instagram. Konsep interaktifmu sudah aku pahami & aku rapikan. Berisi rekomendasi workflow, font, warna, dan langkah setup design system.
**Tanggal:** 5 Juli 2026

---

## 1. Data Brand — TERVERIFIKASI (bukan dummy lagi)

Aku berhasil baca profil Instagram mereka langsung. Ini data asli:

| Aspek | Data asli |
|---|---|
| Handle | `euphoric.disorder` (nama: **Euphoric Disorder**) |
| Kategori | Shopping & retail |
| Posts | **47 kiriman** |
| Followers | **959 pengikut** |
| Following | 6 |
| Bio | *"Our store is a business project as well as an educational platform showcasing works about various forms of crime."* `#comedy #criminologist #creativity` |
| Link | Shopee (via s.shopee.co.id) + Threads `euphoric.disorder` |
| Highlight | JakCloth (pernah ikut event JakCloth) |

**Produk yang terkonfirmasi dari caption:**
- **Hoodie "Candy" ED** — *limited edition*, sistem **Pre-Order (PO)**, batch 1 maks. 14 hari dari pembayaran, harga **Rp 350.000**, diskon 10% untuk beli 2 hoodie. Order via **nomor admin di bio** atau Shopee.
- Tema desain berulang: **war on drugs, adiksi/addiction, toxicity, keadilan (justice), criminology** — dibalut nada *deadpan* filosofis & komedik.

**Insight penting:** tema "kriminal/kriminologi" itu **bukan gimmick — itu inti brand-nya**. Mereka memposisikan diri sebagai *store + platform edukasi tentang bentuk-bentuk kejahatan*. Ini kabar bagus: konsep **"The Case Files"** yang aku usulkan sebelumnya benar-benar nyambung, bahkan bisa lebih tajam (motif *war on drugs / candy / addiction*).

> ⚠️ **Shopee tetap tidak bisa kubuka** — domain Shopee diblokir oleh lapisan keamanan browser tool, jadi aku belum bisa tarik daftar produk lengkap + harga + jumlah terjual dari sana. Yang bisa: kamu kirim screenshot etalase Shopee, atau kita pakai data dari IG + yang kamu tahu. Untuk **gambar produk**, download langsung dari IG/Shopee juga terbatas (butuh izin + Shopee terblokir) — paling praktis kamu kirim file foto produknya ke aku.

---

## 2. Konsepmu — aku tangkap seperti ini (mohon konfirmasi)

Aku pecah idemu jadi 5 "adegan" (scene) supaya jelas buat didesain & dikode. Kalau ada yang meleset, koreksi.

**SCENE 0 — Splash / Welcome**
Layar kosong (dark). Di tengah, **logo euphoric.disorder digambar dengan line-animation** (garis berjalan membentuk logo). Selesai menggambar → logo **zoom-in** menembus layar → transisi ke Home.

**SCENE 1 — Hero (Home)**
**Kaos 3D di tengah**, bisa **diputar pakai kursor** (drag). Di **belakang** kaos: **headline besar** (teks raksasa). Di **sudut-sudut** halaman: teks pendukung kecil (gaya "catatan berkas"). Navbar melayang di atas.

**SCENE 2 — About Us (scroll ke bawah)**
Saat scroll, **kaos 3D ikut turun sambil berputar 360°** dan **berhenti di sisi KIRI**. Di **KANAN**: headline + deskripsi singkat *about us* + **tombol CTA**.

**SCENE 3 — Product Showcase (scroll lagi)**
Kartu produk awalnya **menumpuk (stacked)**, makin di-scroll **menyebar melebar** (spread) jadi barisan kartu. (Referensi gaya kartu: yang kamu attach dari landonorris.com.)

**SCENE 4 — Footer**
**Model 3D di tengah-bawah**. Di **kiri & kanan**: teks yang terhubung ke **social media / halaman lain**. Di **bawah model**: tombol ke **nomor bisnis (WA)**. Di **atas model**: **slogan** toko.

**NAVBAR (global)**
Kiri: **logo**. Kanan: **tombol WA Business** + **tombol dropdown** yang saat diklik memunculkan **panel navigasi slide-in (turun dari atas)** berisi: **Home, About Us, Product, Contact**.

Halaman lain (About, Product, Contact) **tidak perlu se-interaktif Home** — cukup rapi & konsisten. (Referensi "toko/tenang": landonorris.store.)

✅ Kalau breakdown ini benar, ini **sangat bisa dibuat**. Catatan realistis ada di bawah.

---

## 3. Pertanyaan utamamu: "Bikin di Claude Design lalu pindah ke Claude Code?" — Jawaban tegas

**Ya, alur dua tahap itu tepat — TAPI kamu perlu paham pembagian tugas yang benar, supaya ekspektasimu tidak meleset.**

Ini prinsip yang harus kamu pegang:

> **Design tool (Claude Design / Figma) = tampilan diam (skin, layout, warna, tipografi, "keyframe").**
> **Code (Claude Code + framework) = gerak, 3D, scroll, logika.**

Design tool **tidak** bisa menghasilkan kaos 3D yang berputar, splash line-animation, atau kartu yang menyebar saat scroll. Itu semua **perilaku (motion/logic)** yang hanya hidup di kode. Jadi jangan berharap design tool "meng-ekspor" website interaktif jadi. Yang ia hasilkan adalah **cetak biru visual** yang akurat.

**Alur yang aku rekomendasikan:**

1. **Di Claude Design / Figma** — buat:
   - Design system (warna, font, spacing, komponen).
   - **Frame statis tiap scene** sebagai "keyframe": tampilan Splash, Hero (posisi kaos di tengah + headline), About (kaos kiri + teks kanan), Showcase (kartu tersebar), Footer. Plus versi **mobile** tiap frame.
   - Ini jadi "peta" yang akurat: ukuran, posisi, warna, teks — semuanya terkunci.
2. **Pindah ke Claude Code** — aku bangun ulang di framework (Next.js + React Three Fiber + GSAP), lalu **menambahkan nyawa**: 3D interaktif, scroll-linked animation, splash, transisi. Frame statis tadi jadi acuan presisi.

**Rekomendasi tambahan (penting):** untuk bagian yang gerakannya krusial (kaos 3D + scroll), sebaiknya kita **bikin prototipe kecil di KODE lebih awal** — 1 halaman Hero + kaos berputar — untuk **memvalidasi rasa**-nya sebelum semua frame didesain rapi. Alasannya: "rasa" interaksi tidak bisa dinilai dari gambar diam. Desain dulu semua → baru sadar gerakannya kurang pas = mahal. Jadi urutan idealku:

> Design system → **prototipe kode Hero+3D (cek rasa)** → desain frame lengkap → build penuh di kode.

**Soal "Claude Design"**: kalau yang kamu maksud fitur desain visual, ia paling kuat untuk **design system + layout statis**. Untuk hasil paling presisi & bisa di-*handoff*, aku sarankan pakai **Figma** (aku bisa bantu operasikan lewat integrasi Figma). Tapi apa pun tool desainnya, prinsip di atas tetap sama.

---

## 4. Rekomendasi Font

Brand ini = **kriminologi + streetwear + editorial + komedi deadpan**. Fontnya harus bisa "teriak" di headline besar, tapi juga terasa seperti **dokumen/berkas** di teks pendukung.

### 🅰️ Rekomendasi utama — "Hybrid Dossier" (paling pas)

| Peran | Font | Kenapa |
|---|---|---|
| **Headline raksasa** (hero, section title) | **Anton** atau **Archivo Black** (kondensasi tebal) | Punchy, loud, streetwear — cocok untuk teks besar di belakang kaos. |
| **Teks pendukung / label sudut** ("case file", nomor, tag) | **Space Mono** atau **JetBrains Mono** | Kesan mesin tik / berkas laporan / forensik. |
| **Body / paragraf** | **Inter** | Netral, sangat mudah dibaca di paragraf & mobile. |

### 🅱️ Alternatif — "Editorial Crime" (lebih elegan, mirip mood Lando)

| Peran | Font |
|---|---|
| Headline | **Fraunces** atau **Bodoni Moda** (serif kontras tinggi, dramatis) |
| Label/mono | **Space Mono** |
| Body | **Inter** |

### ⭐ Font "signature" opsional
**Redaction** (gratis, oleh Forest Young/Titmouse) — didesain seputar tema **sensor/redaksi dokumen**. Pakai untuk aksen kecil bertema "berkas rahasia" (mis. teks yang disensor lalu kebuka saat hover). Sangat memperkuat tema crime tanpa berlebihan.

**Saranku:** pakai **Rute A (Hybrid Dossier)** — paling nyambung dengan streetwear + dossier. Semua font di atas **gratis & legal** (Google Fonts / Fontshare). Aturan disiplin: **maksimal 2 keluarga font utama + 1 mono**. Lebih dari itu = mulai terasa berantakan.

---

## 5. Rekomendasi Warna

Logo mereka = **ledakan neon (magenta/ungu/biru elektrik) di atas gelap**. Jadi palet paling jujur ke brand = **dasar gelap + aksen neon**. Ini juga kebetulan sejalan dengan mood interaktif yang kamu suka (Lando: gelap + aksen menyala).

### 🎨 Palet utama — "NEON EVIDENCE" (rekomendasiku, setia ke logo)

| Peran | Warna | Hex |
|---|---|---|
| Background utama | Ink Black | `#0A0A0F` |
| Surface / kartu gelap | Charcoal | `#15151E` |
| Teks utama | Bone / paper | `#EDE7D8` |
| **Aksen 1 (utama)** | Electric Violet | `#8B3DFF` |
| **Aksen 2 (glow/hover)** | Neon Magenta | `#FF2D9B` |
| Aksen 3 (opsional, CTA) | Acid Lime | `#CDFF3E` |
| "Caution" (status sold/limited) | Signal Red | `#FF3B30` |

**Cara pakai (disiplin warna):**
- 80% layar = **Ink Black + Bone** (gelap & teks terang).
- Neon (violet→magenta) dipakai sebagai **glow** di 3D, hover, garis, dan splash line-animation — **bukan** memenuhi layar.
- **Acid Lime** hanya untuk **1 hal**: tombol CTA utama (biar benar-benar menonjol). Kalau kamu mau lebih setia ke logo, ganti CTA jadi Neon Magenta dan buang Acid Lime.
- Gradien neon (violet→magenta) boleh untuk **satu momen** (mis. saat kaos di-hover / splash), jangan di mana-mana.

### Alternatif — "ACID DOSSIER" (kalau mau lebih dekat ke rasa Lando)
Dasar **Dark Olive/Ink** `#12130D` + aksen **Acid Lime** `#CDFF00` + teks **Bone** `#EDE7D8`. Lebih "berkas militer / interogasi", sedikit menjauh dari warna logo.

**Saranku:** **NEON EVIDENCE**, karena tetap setia pada identitas logo neon mereka yang sudah dikenal 959 followers-nya.

---

## 6. Setup Design System di Claude Design — Langkah demi Langkah

Ini urutan setup yang benar (berlaku di Figma maupun tool desain sejenis). **Jangan langsung desain halaman** — bangun fondasi dulu, halaman jadi jauh lebih cepat & konsisten.

**Langkah 1 — Siapkan file & frame**
- Buat 2 ukuran acuan: **Desktop 1440px** dan **Mobile 390px**. Semua scene nanti dibuat di dua ukuran ini.

**Langkah 2 — Color Styles (token warna)**
- Masukkan semua warna §5 sebagai *color styles* bernama jelas: `bg/ink`, `surface/charcoal`, `text/bone`, `accent/violet`, `accent/magenta`, `accent/acid`, `status/red`. Selalu pakai style ini, jangan warna acak.

**Langkah 3 — Text Styles (skala tipografi)**
- Definisikan skala (contoh): `Display/H1` (Anton 96–140px), `H2` (Anton 56–72px), `H3` (Archivo Black 32px), `Body` (Inter 16–18px), `Label/Mono` (Space Mono 12–14px, uppercase, letter-spacing lebar). Simpan sebagai text styles.

**Langkah 4 — Grid & Spacing**
- Pakai **grid 12 kolom** (desktop) + **skala spacing 8pt** (4, 8, 16, 24, 40, 64...). Ini bikin jarak antar elemen konsisten.

**Langkah 5 — Komponen inti** (buat sebagai *component* agar reusable)
1. **Navbar**: logo (kiri) + tombol WA + tombol dropdown (kanan).
2. **Panel nav slide-in**: overlay gelap berisi Home / About Us / Product / Contact (teks besar).
3. **Tombol**: varian *Primary* (CTA), *Secondary*, *WA*.
4. **Kartu produk** ("case card"): foto, nama produk, harga, badge status (OPEN/LIMITED/SOLD).
5. **Badge/Stamp**: "EVIDENCE", "LIMITED", "PO".
6. **Footer block**.

**Langkah 6 — Susun frame tiap Scene (statis)**
- Rangkai komponen jadi 5 scene (§2), versi desktop + mobile. Ini "keyframe" untuk aku kode nanti. Tandai di mana **kaos 3D** berada di tiap scene (tengah → kiri → footer) supaya jelas jalur animasinya.

**Langkah 7 — Prototype transisi (opsional tapi membantu)**
- Sambungkan frame dengan panah + catatan singkat ("kaos rotate 360° saat scroll", "kartu spread"). Ini mengomunikasikan **niat gerak** ke tahap kode.

**Langkah 8 — Siapkan aset**
- **Logo sebagai SVG** (wajib, untuk splash line-animation — line-animation butuh path SVG).
- **1 gambar still kaos** (render dari model 3D) sebagai **fallback** untuk HP yang tak kuat render 3D.

---

## 7. Rencana Build — Langkah demi Langkah

**FASE 0 — Aset & Keputusan** *(di sisimu)*
- Kirim/kumpulkan: **logo vektor (SVG)**, foto produk, slogan, nomor WA, teks about, daftar produk + harga.
- Kunci pilihan: **font (Rute A/B)** & **palet (Neon Evidence / Acid Dossier)**.
- **Optimasi model 3D** (lihat §8) — dari 36MB jadi ~1–3MB.

**FASE 1 — Design System (Claude Design/Figma)** → §6 langkah 1–5.

**FASE 2 — Prototipe rasa (Kode, cepat)**
- Aku bangun 1 halaman Hero: kaos 3D bisa di-drag + headline. Tujuan: cek "rasa" & performa sebelum lanjut.

**FASE 3 — Desain frame lengkap (Claude Design/Figma)** → §6 langkah 6–8 (semua scene, desktop + mobile).

**FASE 4 — Build penuh (Claude Code, Next.js)**
- Struktur situs + navbar + panel slide-in + halaman About/Product/Contact (statis rapi).
- Integrasi tombol WA & Shopee.

**FASE 5 — Lapisan interaktif (Kode)**
- Splash line-animation (SVG) → zoom transisi.
- Scroll-linked 3D (GSAP ScrollTrigger + Lenis): kaos tengah → kiri (About) → footer.
- Kartu showcase stacked → spread.
- Micro-interaction bertema (stamp EVIDENCE, sensor hover).

**FASE 6 — Optimasi & Rilis**
- Kompres 3D & gambar, lazy-load, fallback mobile, cek Core Web Vitals, SEO dasar, deploy (Vercel) + domain + analytics.

**Estimasi kasar total: ~4–6 minggu**, tergantung kecepatan Fase 0 & 1.

---

## 8. Catatan Teknis Penting (bagian penasihat — jangan dilewati)

1. **Model 3D 36MB = BAHAYA.** Ini terlalu berat ~15–30×. Wajib dikompres sebelum dipakai: **Draco/meshopt geometry compression + resize tekstur (mis. 4K→1K) + format KTX2/WebP**. Target **≤ 2–3MB**. Tool: `gltf-transform` atau `gltfpack`. Kalau tidak, situs berat & mobile menderita. (Aku bisa bantu optimasi filenya di sini.)
2. **Splash screen jangan menghukum pengunjung.** Line-animation logo maksimal **~2–3 detik**, dan **skippable** (klik untuk lompat). Yang datang kedua kali sebaiknya tidak dipaksa nonton lagi (simpan flag di browser). Splash yang lama = orang kabur.
3. **Mobile-first.** 959 followers-mu mayoritas buka via HP. 3D + scroll berat harus punya **fallback**: di HP lemah, tampilkan **gambar still kaos** (bukan 3D live). Non-negotiable.
4. **Scroll-linked animation itu detail-heavy.** Efek "kaos ikut scroll & rotate" dan "kartu spread" butuh tuning presisi. Sebaiknya dibangun **setelah** versi statis jalan — jangan campur di awal.
5. **Konsistensi nama & data.** Pastikan hubungan Instagram ↔ Shopee jelas di website (nama toko Shopee, tombol yang benar) supaya tidak membingungkan pembeli.
6. **Copywriting = setengah nyawa brand ini.** Nada deadpan-kriminologi mereka (lihat caption IG) itu aset. Website harus menirukan suara itu, bukan bahasa marketing generik.

---

## 9. Keputusan yang aku butuhkan darimu (biar lanjut)

1. **Font**: Rute A (Hybrid Dossier) atau B (Editorial Crime)?
2. **Warna**: Neon Evidence atau Acid Dossier?
3. Breakdown 5-scene di §2 sudah benar?
4. Mau aku mulai dari **(a) optimasi model 3D 36MB** dulu, **(b) prototipe kode Hero+3D** biar kamu rasakan geraknya, atau **(c) setup design system** dulu?
5. Kirim **logo SVG** + **foto produk** kalau ada (kunci untuk splash & showcase).

---

*Begitu kamu jawab §9 (terutama font, warna, dan logo SVG), aku bisa langsung eksekusi — entah optimasi 3D, prototipe Hero, atau menyiapkan design system.*
