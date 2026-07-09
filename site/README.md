# euphoric.disorder — Website (Next.js)

Website brand euphoric.disorder. Skin **Riso / Sablon**, konsep **The Case Files**.
Sudah **build-verified** (Next.js 14, semua 13 halaman ter-generate tanpa error).

## Menjalankan

```bash
cd site
npm install
npm run dev
```
Buka http://localhost:3000

Build produksi:
```bash
npm run build && npm start
```

## Stack
- **Next.js 14** (App Router, JavaScript)
- **three.js** — kaos 3D interaktif di Home (drag + scroll choreography), model di `public/models/tshirt-1k.glb` (1.8 MB, sudah dioptimasi)
- **Lenis** — smooth scroll (`components/SmoothScroll.js`)
- CSS token Riso di `app/globals.css` (identik dengan `design-system/tokens-riso.css`)

## Struktur
```
app/
  page.js              Home — splash, hero 3D + glitch, about, showcase (card fan), footer
  about/page.js        About (editorial)
  product/page.js      Katalog "Case Files"
  product/[slug]/page.js  Detail produk (CTA Shopee/WA)
  contact/page.js      Contact + form
  layout.js            Nav + Footer global + SmoothScroll
  globals.css          Semua style (Riso)
components/            Nav (slide-in menu), Footer, SmoothScroll, ContactForm
lib/products.js        DATA PRODUK — sunting di sini
public/img, public/models
```

## Yang perlu kamu isi (placeholder)
Semua di **`lib/products.js`** dan beberapa komponen:
- Harga kaos #WarOnDrugs (sekarang `"Rp —"`).
- `WA_NUMBER` & `SHOPEE_URL` (link toko).
- `shopee` / `wa` per produk (sekarang `"#"`).
- Nomor WA & jam di `app/contact/page.js`.
- Tombol "WA Business" di `components/Nav.js` & social links di `components/Footer.js`.

## Catatan
- **Model kaos** masih model polos. Ganti file `public/models/tshirt-1k.glb` dengan kaos ber-desain asli saat siap (nama file sama = otomatis kepakai).
- **Splash** pakai wordmark teks; ganti ke logo SVG asli nanti.
- Halaman selain Home sengaja tenang (tanpa 3D berat) demi performa mobile.
- Ada folder lama `../web/` (scaffold TypeScript setengah jadi) yang bisa kamu hapus — pakai `site/` ini.
- Deploy: push ke GitHub → import ke Vercel (zero config).

---

## Deploy ke Vercel (dari komputermu — paling andal)

Akun Vercel "Hamzah's projects" sudah ada. Cara tercepat (tanpa GitHub):

```powershell
cd "C:\Users\USER\Downloads\euphoric.disorder website\euphoric.disorder\site"
npm install
npx vercel login      # pilih email kamu, verifikasi
npx vercel --prod     # scope: Hamzah's projects -> buat project baru -> deploy
```
Vercel akan meng-upload semua file termasuk model 3D & foto, build, dan kasih URL live.

### Setelah deploy
- **Masih bisa diubah kapan saja**: edit file lalu jalankan lagi `npx vercel --prod` (atau pakai GitHub di bawah agar auto-deploy tiap push).
- Set environment variable **`NEXT_PUBLIC_SITE_URL`** = domain final kamu (mis. https://euphoricdisorder.vercel.app) di dashboard Vercel → Settings → Environment Variables, supaya canonical/OG/sitemap SEO pakai domain benar. Lalu redeploy.

## (Opsional) Push ke GitHub untuk auto-deploy
Hapus dulu folder `site\.git` yang rusak (terbentuk otomatis), lalu:
```powershell
git init
git add .
git commit -m "init euphoric.disorder website"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```
Lalu import repo di https://vercel.com/new → tiap `git push` akan auto-deploy.
