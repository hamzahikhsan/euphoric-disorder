# Storyboard Animasi — euphoric.disorder (Website Profil)

**Tema:** Editorial Archive (Dark) · **v3** · 9 Juli 2026

Ini "kontrak" antara desain (Figma) dan kode. Format tiap baris:
**Trigger** → **Elemen** → **State awal → akhir** → **Easing/Durasi** → **Catatan (perf / reduced-motion)**.

> Prinsip: **satu wow** (kaos 3D di Home). Halaman lain = reveal editorial yang tenang. Semua gerak punya fallback statis bila `prefers-reduced-motion`.

---

## GLOBAL

| Trigger | Elemen | Awal → Akhir | Easing/Durasi | Catatan |
|---|---|---|---|---|
| Load pertama / sesi | **Preloader** | Wordmark tergaris tipis di charcoal → fade out | ease-out / ≤2s | Skippable (klik/tap). Simpan flag → tak muncul lagi di sesi sama. |
| Scroll > 40px | **Navbar** | Latar transparan → `--bg-base` + hairline bawah | ease-out / 300ms | — |
| Klik tombol menu | **Menu slide-in** | translateY(-100%) → 0, overlay fade | ease-inout / 400ms | Fokus trap; ESC menutup. Reduced-motion = fade saja. |
| Elemen masuk viewport | **Reveal umum** | opacity 0 + translateY(24px) → 1 / 0 | ease-out / 500ms, stagger 60ms | IntersectionObserver, sekali jalan. |

---

## HOME — scroll-driven (5 scene)

| # | Trigger | Elemen | Awal → Akhir | Easing/Durasi | Catatan |
|---|---|---|---|---|---|
| 1 | Masuk Home (idle) | **Kaos 3D** + wordmark raksasa di belakang | Kaos float halus ± drag untuk rotate; label mono di sudut (subjek/tahun) | idle loop / drag realtime | Fallback HP lemah: gambar still render kaos. |
| 2 | Scroll 0–25% | **Kaos 3D** | Tengah → drift + rotate ke **kiri**; kolom kanan (thesis + CTA About) reveal | ease-inout / scroll-linked | Scroll-linked (GSAP ScrollTrigger + Lenis). |
| 3 | Scroll 25–55% | **Product Index** (Index Card ×N) | Masuk sebagai **scroll horizontal editorial**; kartu lewat dengan caption mono | ease-inout / scroll-linked | Hover kartu = image-swap depan↔belakang. Mobile: swipe / snap. |
| 4 | Scroll 55–75% | **Statement band** | Satu baris manifesto besar, parallax halus (y) | ease-out / scroll-linked | Opsional font Fraunces. Ringan. |
| 5 | Scroll 75–100% | **Footer** | Kaos kecil kembali ke tengah-bawah; slogan di atas; link sosial/WA/Shopee reveal | ease-out / 500ms | CTA WhatsApp menonjol (cobalt). |

**Jalur kaos 3D:** tengah (S1) → kiri (S2) → mengecil & kembali tengah-bawah (S5). Ini "benang merah" gerak di Home.

---

## ABOUT — editorial, tanpa 3D berat

| Trigger | Elemen | Awal → Akhir | Easing/Durasi | Catatan |
|---|---|---|---|---|
| Masuk viewport | Judul + paragraf | Reveal masuk (opacity/translateY), stagger | ease-out / 500ms | Nada deadpan-kriminologi. |
| Scroll | Gambar editorial (ditempel grid) | Parallax halus + reveal | ease-inout | Caption mono "lokasi, tahun". |
| Scroll | Pull-quote / statement | Skala/opacity naik saat center | ease-out | Aksen cobalt pada 1 kata kunci. |

---

## PRODUCT (katalog / "Index")

| Trigger | Elemen | Awal → Akhir | Easing/Durasi | Catatan |
|---|---|---|---|---|
| Load | Grid Index Card | Stagger reveal masuk | ease-out / stagger 60ms | 12-col grid. |
| Hover kartu | Foto produk | Image-swap depan↔belakang + underline cobalt muncul | micro / 200ms | Touch: tap pertama = swap, kedua = buka detail. |
| Klik filter (opsional) | Grid | Re-layout (FLIP) | ease-inout / 400ms | Kaos / Hoodie. |

---

## PRODUCT DETAIL ("Subject #XX")

| Trigger | Elemen | Awal → Akhir | Easing/Durasi | Catatan |
|---|---|---|---|---|
| Load | Galeri besar + kolom info sticky | Reveal; info column sticky saat scroll | ease-out | Info: bahan, harga, status, deskripsi deadpan. |
| Hover gambar | Foto | Zoom halus (scale 1→1.04) | micro / 250ms | — |
| — | **CTA** | "Amankan di Shopee →" + "Tanya via WhatsApp →" | — | Event tracking klik. Tanpa checkout sendiri. |

---

## CONTACT

| Trigger | Elemen | Awal → Akhir | Easing/Durasi | Catatan |
|---|---|---|---|---|
| Masuk viewport | Link (WA/IG/Shopee/Threads) | Reveal stagger | ease-out / 400ms | — |
| Fokus input form (opsional) | Field "Lapor Kasus Baru" | Border hairline → cobalt | micro / 150ms | Untuk custom order. |

---

## Urutan build gerak (penting)

1. Bangun **versi statis** semua halaman dulu (rapi, cepat, SEO).
2. Baru tambah lapisan gerak: preloader → reveal global → scroll-linked Home (paling detail-heavy, terakhir).
3. Validasi "rasa" kaos 3D + scroll lewat **prototipe kode kecil** sebelum menyempurnakan semua scene.
