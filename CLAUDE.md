# CLAUDE.md — euphoric.disorder

Instruksi untuk Claude Code. **Baca ini + folder `docs/` sebelum menulis kode.**

## Apa ini
Website **profil bisnis** untuk brand streetwear/sablon **euphoric.disorder** (tema kriminologi: *comedy · criminologist · creativity*). Fase ini = situs profil (BUKAN ecommerce, tanpa checkout/akun/keranjang).

## Sumber kebenaran (baca urut ini)
1. `docs/01-PRD.md` — apa & flow (Home → Product Detail, requirement, non-goal).
2. `docs/02-BRAND-PROFILE.md` — identitas & voice brand.
3. `docs/03-DESIGN-SYSTEM.md` — tampilan: warna, tipografi, komponen, tokens, + **aturan Anti-AI-Slop**.

> `docs/04-BUILD-GUIDE.md` adalah panduan pribadi pemilik — **abaikan** saat coding.

## Aturan main
- **Rewrite bersih.** Buat app baru. JANGAN sentuh/gunakan folder arsip lama bila ada (`site/`, `web/`, `design-system/`, `editorial-archive/`, `prototype-home.html`, `PRD-euphoric-disorder.md`, `BLUEPRINT-v2*`, `RENCANA-*`).
- **Desain: profesional, modern, editorial, restrained.** Ikuti ketat bagian "Anti-AI Slop" di `03-DESIGN-SYSTEM.md`. TANPA gradien techy, glow neon, glassmorphism, atau layout generik. Satu aksen (cobalt), dipakai hemat.
- **Bangun bertahap & berhenti tiap fase:** scaffold → data/konten → halaman statis rapi → integrasi+SEO → motion halus → polish/deploy. Jangan kerjakan semua sekaligus.
- **Performa & a11y:** LCP < 2.5s mobile, CLS < 0.1, `next/image`, hormati `prefers-reduced-motion`.
- **Data belum lengkap** (harga, WA, link Shopee): placeholder jelas, jangan mengarang.

## Stack
Next.js (App Router, TypeScript) · Tailwind (via `styles/tokens.css`) · font Archivo/Inter/JetBrains Mono (next/font) · konten lokal di `content/` · deploy Vercel. Motion: CSS/Framer Motion secukupnya (tanpa 3D wajib).

## Langkah pertama
Kerjakan **Fase 1** saja: scaffold Next.js + Tailwind, buat `styles/tokens.css` dari `03-DESIGN-SYSTEM.md` lalu map ke Tailwind, pasang font, buat layout global (header + footer) dan route kosong (`/`, `/about`, `/product`, `/product/[slug]`, `/contact`). Lalu berhenti & tunjukkan hasil.
