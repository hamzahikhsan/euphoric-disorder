# PANDUAN SERAH TERIMA PROYEK (HANDOFF GUIDE)
**Website & Admin Panel euphoric.disorder**

Dokumen ini adalah panduan resmi serah terima teknis dan operasional untuk klien / tim pengelola brand **euphoric.disorder**. Dokumen ini mencakup alur setup ulang dari nol (clone repo, setup database Supabase, storage, autentikasi admin, dan deployment Vercel) hingga cara mengakses dan mengoperasikan Admin Console ("Markas Besar").

---

## 1. Arsitektur Teknis Sistem

Sistem website ini dibangun menggunakan arsitektur modern berbasis monorepo tunggal:

| Komponen | Layanan / Teknologi | Deskripsi |
|---|---|---|
| **Frontend & Admin** | Next.js 14 (App Router) + Tailwind CSS | Website publik (`/`, `/product`, `/about`, `/contact`) dan Admin Console (`/admin`) dalam satu codebase. |
| **Database & BaaS** | Supabase (PostgreSQL) | Menyimpan katalog produk, pesan kontak masuk, FAQ, konfigurasi situs, dan log audit investigasi. |
| **Media Storage** | Supabase Storage | Penyimpanan CDN foto produk (`product-images`) dan aset grafis website (`site-assets`). |
| **Autentikasi** | Supabase Auth (Cookie-based SSR) | Proteksi rute `/admin` dengan sesi aman single-owner. |
| **Hosting & CI/CD** | Vercel | Otomatis membangun (*auto-build*) dan menerbitkan setiap kali ada perubahan pada cabang `master`. |

---

## 2. Cara Mengakses Admin Panel di Vercel (Saat Ini)

Admin panel telah di-commit ke GitHub dan siap diakses di Vercel:

1. **Pastikan Environment Variables di Vercel Aktif**:
   Buka **[Vercel Dashboard](https://vercel.com/)** → Pilih project `euphoric-disorder` → **Settings** → **Environment Variables**.  
   Pastikan 2 variabel ini terdaftar untuk lingkungan *Production* & *Preview*:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://<project-id>.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJh...`
   - `NEXT_PUBLIC_SITE_URL` = `https://euphoric-disorder-eight.vercel.app` *(atau domain kustom)*

2. **Buka Halaman Admin**:
   Akses di browser:  
   👉 **`https://euphoric-disorder-eight.vercel.app/admin`**  
   *(Jika belum login, sistem otomatis mengarahkan ke `/admin/login`)*

3. **Masuk Menggunakan Akun Admin**:
   Gunakan email dan kata sandi admin yang telah didaftarkan pada menu **Supabase Dashboard → Authentication → Users**.

---

## 3. Alur Handoff Bersih (Clean Slate Setup untuk Klien Baru)

Jika klien ingin meng-clone repository ini dan membuat deployment serta database baru secara mandiri dari nol, berikut adalah langkah demi langkahnya:

```
[1. Clone Repo] ---> [2. Buat Supabase Baru] ---> [3. Jalankan SQL] ---> [4. Setup Storage & Auth] ---> [5. Deploy ke Vercel]
```

### Langkah 1: Clone Repository ke GitHub Klien
Klien dapat meng-clone repository atau menduplikasinya ke akun GitHub miliknya:
```bash
git clone https://github.com/hamzahikhsan/euphoric-disorder.git
cd euphoric-disorder
npm install
```

---

### Langkah 2: Buat Project Baru di Supabase
1. Buka **[Supabase](https://supabase.com/)** dan buat akun (cukup paket gratis / Free Tier).
2. Klik **New Project**, beri nama (contoh: `euphoric-disorder-db`), pilih region terdekat (**Singapore**).
3. Simpan **Database Password** di tempat yang aman.
4. Setelah project selesai dibuat, buka menu **Project Settings → API**:
   - Salin **Project URL**
   - Salin **Project API Keys (`anon` / `public`)**

---

### Langkah 3: Eksekusi File Migrasi SQL
Buka menu **SQL Editor** pada dashboard Supabase klien, lalu jalankan dua file SQL berikut secara berurutan:

1. **Jalankan Migrasi Skema Tabel (`001_create_admin_tables.sql`)**:
   - Salin seluruh isi file [supabase/migrations/001_create_admin_tables.sql](file:///c:/Users/USER/Downloads/euphoric.disorder%20website/euphoric.disorder/supabase/migrations/001_create_admin_tables.sql)
   - Tempel ke SQL Editor Supabase lalu klik tombol **RUN**.
   - *Fungsi*: Membuat tabel `products`, `contact_submissions`, `faqs`, `site_config`, `admin_activity_log`, kebijakan RLS, dan triggers otomatis.

2. **Jalankan Seed Data Produk Awal (`002_seed_products.sql`)**:
   - Salin seluruh isi file [supabase/migrations/002_seed_products.sql](file:///c:/Users/USER/Downloads/euphoric.disorder%20website/euphoric.disorder/supabase/migrations/002_seed_products.sql)
   - Tempel ke SQL Editor Supabase lalu klik tombol **RUN**.
   - *Fungsi*: Memasukkan 8 produk streetwear awal dan 15 baris konfigurasi default situs ke dalam database.

---

### Langkah 4: Setup Supabase Storage (Penyimpanan Foto)
1. Buka menu **Storage** di Supabase → Klik **New bucket**.
2. Buat bucket pertama:
   - Name: **`product-images`**
   - Centang opsi **Public bucket** *(wajib agar foto bisa dilihat pengunjung website)*.
   - Klik **Create bucket**.
3. Buat bucket kedua:
   - Name: **`site-assets`**
   - Centang opsi **Public bucket**.
   - Klik **Create bucket**.

---

### Langkah 5: Buat Akun Pengguna Admin (Owner)
1. Buka menu **Authentication** di Supabase → Pilih tab **Users**.
2. Klik tombol **Add user** → Pilih **Create user**.
3. Masukkan:
   - **Email**: email login klien (contoh: `owner@euphoric.disorder` atau email pribadi klien).
   - **Password**: kata sandi yang kuat.
   - Centang opsi **Auto Confirm User?** *(agar akun langsung aktif tanpa perlu verifikasi link email)*.
4. Klik **Create user**.

---

### Langkah 6: Deployment ke Vercel Klien
1. Buka **[Vercel](https://vercel.com/)** dan login menggunakan akun GitHub klien.
2. Klik tombol **Add New...** → **Project**.
3. Pilih repository `euphoric-disorder` yang sudah di-clone.
4. Pada bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_SUPABASE_URL` = URL Supabase baru dari Langkah 2.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Anon Key Supabase baru dari Langkah 2.
   - `NEXT_PUBLIC_SITE_URL` = Domain Vercel baru / Domain Kustom.
5. Klik tombol **Deploy**.
6. Website publik dan Admin Console akan live dalam waktu 1-2 menit!

---

## 4. Panduan Pengoperasian Admin Console untuk Klien

Admin panel dirancang intuitif dalam Bahasa Indonesia penuh:

### A. Mengelola Katalog Produk (`/admin/produk`)
- **Menambah Produk**: Klik **+ Tambah Bukti Produk** → Isi nama kaos, harga, deskripsi filosofi, pilih spesifikasi kain (Cotton Combed 24s), teknik sablon, matriks ukuran Boxy Oversized (S-XXL), unggah foto produk, lalu klik **Siarkan ke Publik (Live)**.
- **Mengedit / Menghapus**: Klik tombol **Edit** pada baris produk yang ingin diubah. Klik **Hapus** untuk memusnahkan arsip.
- **Ubah Status Cepat**: Klik tombol switch `LIVE BROADCAST` / `DRAFT BERKAS` langsung di tabel tanpa perlu membuka form.

### B. Menanggapi Pesan Pelanggan (`/admin/pesan`)
- Pesan yang dikirim pengunjung dari formulir `/contact` otomatis muncul di sini.
- Terdapat tombol **"WA Dispatch ↗"**: Klik tombol ini untuk langsung membuka WhatsApp ke nomor pelanggan dengan template balasan resmi dari brand yang terisi otomatis.

### C. Mengubah Kontak & Jam Operasional Toko (`/admin/pengaturan`)
- Klien dapat memperbarui nomor WhatsApp hotline, alamat fisik toko di Kemayoran, tautan Google Maps, jam operasional, dan tautan toko Shopee tanpa menyentuh kode program.

### D. Mengelola Tanya Jawab (`/admin/faq`)
- Menambah pertanyaan seputar PO, kustom sablon apparel, atau jadwal pengiriman barang yang langsung tayang di bagian bawah halaman kontak website.

---

## 5. Checklist Serah Terima (Handoff Sign-off)

- [ ] **Source Code**: Akses repositori GitHub diberikan / di-transfer ke akun klien.
- [ ] **Database & Storage**: Proyek Supabase sudah aktif dan akun klien terdaftar sebagai Admin.
- [ ] **Hosting**: Proyek Vercel terhubung ke domain resmi klien.
- [ ] **Pengujian Login**: Klien berhasil login ke `/admin` dan melihat Command HUD.
- [ ] **Pengujian Formulir**: Pesan uji coba berhasil dikirim dari `/contact` dan masuk ke `/admin/pesan`.
- [ ] **Kerahasiaan Kredensial**: File `.env.local` dan password database tersimpan aman di pihak klien.
