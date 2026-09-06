# PROJECT MEMORY & AI AGENT CONTEXT TRANSFER
**euphoric.disorder — Memory Log, Kronologi Proyek & Konteks untuk AI Agent Selanjutnya**

> **DOKUMEN INI DITUJUKAN KHUSUS UNTUK AI CODING ASSISTANT (Claude, Cursor, Copilot, ChatGPT, Antigravity, dsb.)**  
> Jika Anda adalah AI Agent baru yang membaca repositori ini untuk melanjutkan pekerjaan dari klien, **BACA DOKUMEN INI TERLEBIH DAHULU**. Dokumen ini merangkum seluruh sejarah keputusan desain, arsitektur yang sudah dibangun, *gotchas/bugs* yang pernah diselesaikan, dan aturan baku (*golden rules*) agar Anda tidak merusak sistem yang sudah berjalan.

---

## 1. Identitas Brand & Inti Proyek (Core Essence)

- **Nama Brand**: `euphoric.disorder`
- **Slogan / Pilar**: *"Comedy · Criminologist · Creativity"* — *"Kejahatan sebagai bahan kajian. Kaos sebagai medium."*
- **Karakter Visual**: Streetwear Jakarta independen, *forensic crime investigation archive*, brutalist luxury, gelap-zaitun (*dark olive*), aksen neon kuning-hijau (*crime scene tape*), tipografi dokumen arsip berkas perkara.
- **Bahasa Interface Admin**: **Bahasa Indonesia penuh** (*bukan bahasa Inggris generik*). Menggunakan istilah taktis: "Markas Besar", "Berkas Perkara", "Barang Bukti", "Transmisi Pesan", "Siaran Aktif", "Disposisi WhatsApp".

---

## 2. Kronologi Pengembangan & Milestone Historis

Berikut adalah catatan lengkap apa saja yang telah dikerjakan dari awal hingga status saat ini:

### Milestone 1: Fondasi Frontend Publik & Model 3D
- Membangun landing page publik (`app/page.tsx`), halaman produk (`app/product/`), tentang kami (`app/about/`), dan kontak (`app/contact/`).
- Mengintegrasikan **Three.js & React Three Fiber** untuk merender model 3D kaos Boxy Oversized interaktif (`public/oversized_t-shirt.glb`).
- Mengimplementasikan sistem **Surface Flipping** (`[data-surface="light|dark"]`) yang terhubung dengan **Lenis Smooth Scroll** sehingga warna background otomatis bertransisi mulus saat scroll.
- Menyusun data statis awal di folder `content/` (`products.ts`, `site.ts`, `faqs.ts`) sebagai sumber kebenaran awal sebelum database dibuat.

### Milestone 2: Transformasi ke Dynamic Database (Supabase)
- Klien membutuhkan Admin Panel agar tidak perlu mengubah kode (*no-code content management*) setiap kali ingin menambah kaos, mengubah harga, atau mengedit kontak toko.
- Merancang dan mengeksekusi 2 file migrasi SQL:
  - `supabase/migrations/001_create_admin_tables.sql`: Membuat tabel `products`, `contact_submissions`, `faqs`, `site_config`, `admin_activity_log`, RLS, dan triggers audit.
  - `supabase/migrations/002_seed_products.sql`: Mengisi 8 produk streetwear awal dan 15 konfigurasi toko.
- Membangun **Server Actions** di `app/actions/admin/` menggunakan `@supabase/ssr` (berbasis cookie HTTP-only yang aman).
- Memproteksi rute `/admin/*` menggunakan `middleware.ts` (mengalihkan user ke `/admin/login` jika belum ada sesi Supabase Auth yang valid).

### Milestone 3: Insiden Cache Dev Server & Penyelidikan UI (PENTING!)
- **Masalah**: User membuka `http://localhost:3000/admin` dan melihat tampilan HTML mentah (*raw unstyled text*, background putih, hyperlink biru tanpa CSS Tailwind).
- **Akar Masalah (Root Cause)**: Perintah `npm run build` dijalankan di terminal saat dev server `next dev` sedang berjalan di background. Proses build membersihkan folder `.next/`, sehingga webpack dev server kehilangan referensi chunk CSS (`layout.css` menghasilkan HTTP 404).
- **Solusi**: Mematikan proses background yang bentrok, membersihkan cache `.next/`, dan me-restart dev server secara bersih. CSS pipeline kembali aktif normal.
- **Pelajaran untuk AI Selanjutnya**: **JANGAN PERNAH** menjalankan `npm run build` bersamaan saat dev server sedang aktif di folder yang sama, karena akan merusak cache kompilasi Next.js App Router.

### Milestone 4: Perombakan Total UI Admin ("Markas Besar // Forensic Crime Dossier")
- Scaffold awal admin panel sebelumnya hanya berupa wireframe abu-abu generik SaaS (`#1A1B1E`, `#25262B`) dengan emoji HP standar (`📊`, `📋`, `📨`).
- Dilakukan perombakan total pada **24 file frontend admin** agar selaras 100% dengan Brand Design System:
  1. **Enforce Dark Surface**: Seluruh layout admin mengunci `data-surface="dark"`, menggunakan `--forest-deep` (`#21261A`) sebagai kanvas utama dan `--forest` (`#2C3221`) untuk kartu berkas.
  2. **Forensic Aesthetics**: Menambahkan reticle crosshair `+`, border aksen `--lime` (`#CDFF00`), watermark koordinat Kemayoran `6°09'25"S 106°50'44"E`, dan **skala penggaris milimeter forensik** pada thumbnail barang bukti produk.
  3. **Tactical Topbar HUD**: Menambahkan jam digital real-time **WIB (Asia/Jakarta)** yang berdetak setiap detik.
  4. **WhatsApp Quick Dispatch**: Menambahkan tombol disposisi instan di kotak masuk pesan (`/admin/pesan`) yang otomatis memformat salam investigasi resmi ke WhatsApp pemesan.
  5. **Editor Spesifikasi Lengkap**: Form produk mencakup preset ukuran Boxy Oversized (S-XXL), repeater swatch warna hex, dan kompresor WebP otomatis client-side sebelum diunggah ke storage.

### Milestone 5: Penyiapan Paket Serah Terima Klien (Handoff Kit)
- Menyusun panduan serah terima lengkap di `HANDOFF.md`.
- Memperbarui template environment variable di `.env.example`.
- Memverifikasi build dengan `npx tsc --noEmit` (**0 errors**).
- Mengunggah seluruh revisi ke repositori GitHub `master` ([commit `f4fe4ab`]).
- Memvalidasi deployment Vercel live: `https://euphoric-disorder-eight.vercel.app/admin` (**HTTP 200 OK**).
- Membimbing user menyelesaikan isu konfigurasi Vercel: variabel yang diawali `NEXT_PUBLIC_` wajib bertipe **Config / Plaintext** di Vercel, bukan *Secret*.

---

## 3. Aturan Baku yang Wajib Ditaati (Golden Rules for Future AI)

Jika Anda diminta menambah fitur atau mengubah kode di proyek ini, patuhi 6 aturan mutlak berikut:

### Aturan 1: Wajib Memakai Design Tokens Resmi (DILARANG Menggunakan Warna Abu-Abu Netral)
Jangan pernah menggunakan class Tailwind abu-abu biasa seperti `bg-gray-800`, `bg-slate-900`, atau `text-gray-400`. Proyek ini memiliki palet warna kurasi khusus di [styles/tokens.css](file:///c:/Users/USER/Downloads/euphoric.disorder%20website/euphoric.disorder/styles/tokens.css):
- Gunakan `bg-forest-deep` (`#21261A`) untuk kanvas dasar gelap.
- Gunakan `bg-forest` (`#2C3221`) untuk container kartu.
- Gunakan `text-bone` (`#EDEBDD`) untuk teks utama di atas gelap.
- Gunakan `text-bone-dim` (`#B8B8A6`) untuk teks sekunder / metadata.
- Gunakan `text-lime` / `bg-lime` (`#CDFF00`) untuk aksen tombol utama, status aktif, dan border fokus.
- Gunakan utility semantik `bg-bg`, `text-fg`, `border-bone/15`, dan `text-accent`.

### Aturan 2: Pertahankan Hirarki Tipografi Resmi
- Heading & Wordmark: `font-display` (Nohemi).
- Kode Berkas, SKU, Telemetri, Ukuran, Jam WIB: `font-mono` (Space Mono).
- Editorial Tagline & Quote: `font-serif` (PT Serif).
- Stempel Dokumen Forensik: `font-brush` (Permanent Marker).

### Aturan 3: Jangan Hapus Sistem Dual-Layer Fallback
Fungsi fetcher publik di `lib/supabase/products.ts` dan `lib/supabase/site.ts` dirancang dengan *try-catch graceful fallback*. Jika database Supabase offline, tidak ada koneksi, atau belum dimigrasi, fungsi ini otomatis membaca file statis di `content/products.ts`. **JANGAN HAPUS** mekanisme fallback ini agar website publik tidak pernah me-render halaman error 500.

### Aturan 4: Autentikasi & Mutasi Melalui Server Actions
- Seluruh penulisan database (Create, Update, Delete) **wajib** melalui Server Actions di `app/actions/admin/`.
- Jangan pernah mengekspos `SUPABASE_SERVICE_ROLE_KEY` ke sisi client (browser).
- Akses route `/admin/*` selalu dijaga oleh `middleware.ts`. Jika Anda membuat sub-rute baru di dalam `/admin/`, pastikan rute tersebut masuk ke dalam matcher middleware (default: `/admin/:path*`).

### Aturan 5: No Generic Emojis in Admin UI
Hindari menaruh emoji HP berwarna-warni (`📊`, `📋`, `📁`, `⚙️`) di dalam antarmuka admin. Gunakan ikon vektor taktis inline SVG minimalis (stroke 1.5px / 1.75px) dengan warna `text-bone-dim` atau `text-lime` agar suasana *Forensic Dossier* tetap terjaga.

### Aturan 6: Penanganan Media Gambar
Ketika mengunggah foto produk baru dari browser, selalu lewatkan melalui utilitas `browser-image-compression` untuk mengubah format menjadi WebP dengan resolusi maksimal 1600px dan ukuran < 1MB. Ini krusial agar kuota Supabase Storage klien hemat dan kecepatan load website tetap instan.

---

## 4. Status Terkini File dan Fitur (Ready State)

| Fitur / Halaman | Status | Keterangan |
|---|---|---|
| **Website Publik (`/`, `/product`, `/about`, `/contact`)** | ✅ Live & Stable | Three.js 3D t-shirt aktif, responsif mobile/desktop, SEO meta tag lengkap. |
| **Terminal Login Admin (`/admin/login`)** | ✅ Live & Stable | Autentikasi Supabase Auth, proteksi bruteforce, toggle password monospace. |
| **Command HUD Dashboard (`/admin`)** | ✅ Live & Stable | Statistik produk, siaran live, pesan masuk, log audit, jam real-time WIB. |
| **Katalog Bukti Produk (`/admin/produk`)** | ✅ Live & Stable | Filter rilis, pencarian instan, toggle Live/Draft optimistik, skala foto milimeter. |
| **Formulir Dossier Produk (`/admin/produk/baru` & `edit`)** | ✅ Live & Stable | 6 section terstruktur, preset Boxy S-XXL, color repeater, upload WebP otomatis. |
| **Kotak Transmisi Pesan (`/admin/pesan`)** | ✅ Live & Stable | Status unread/read/responded, tombol 1-klik WA Dispatch, ekspor data ke CSV. |
| **Manajemen FAQ (`/admin/faq`)** | ✅ Live & Stable | Tambah/edit/hapus FAQ, toggle visibilitas instan. |
| **Konfigurasi Markas (`/admin/pengaturan`)** | ✅ Live & Stable | Edit nomor WA, jam buka Kemayoran, teks sambutan, alamat GPS, tautan Shopee. |
| **Vault Media (`/admin/media`)** | ✅ Live & Stable | Supabase Storage manager, kompresi client-side WebP, tombol salin URL bukti. |
| **Log Investigasi (`/admin/aktivitas`)** | ✅ Live & Stable | Riwayat audit aksi admin lengkap dengan diff perubahan data. |

---

## 5. Rencana Pengembangan Lanjutan yang Direkomendasikan (Next Roadmap)

Jika klien meminta pengembangan fitur baru di masa mendatang, berikut adalah fitur yang paling logis untuk ditambahkan:

1. **Notifikasi WhatsApp Otomatis ke Owner saat Ada Pesan Masuk**:
   - Menggunakan Supabase Database Webhook pada tabel `contact_submissions` (event `INSERT`).
   - Memicu Supabase Edge Function yang menembak API gateway WhatsApp (seperti Fonnte atau Waha) ke nomor HP owner (`+628561740296`).
2. **Kustomisasi Grafis Sablon pada Model 3D (3D Real-time Customizer)**:
   - Memungkinkan pembeli mengunggah logo/desain mereka sendiri di halaman `/contact` atau halaman kustom, lalu desain tersebut diproyeksikan sebagai tekstur dinamis pada model 3D `oversized_t-shirt.glb` menggunakan Three.js canvas.
3. **Direct Checkout Payment Gateway (Midtrans / Xendit)**:
   - Saat ini pesanan diarahkan ke Shopee atau WhatsApp. Jika brand ingin checkout langsung di website dengan QRIS/Transfer Bank otomatis, integrasikan Midtrans Snap API pada rute `/checkout`.
