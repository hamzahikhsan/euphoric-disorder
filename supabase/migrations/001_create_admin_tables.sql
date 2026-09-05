-- ═══════════════════════════════════════════════════════════════
-- MIGRASI DATABASE: Admin Panel euphoric.disorder
-- Jalankan SQL ini di Supabase SQL Editor (https://supabase.com/dashboard)
-- Project: aaiaochlzcaltkjbawqh
-- ═══════════════════════════════════════════════════════════════

-- 0. Utility function: auto-update timestamp
-- ═══════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- 1. Tabel PRODUCTS
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS products (
  id                 UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug               TEXT UNIQUE NOT NULL,
  subject            TEXT NOT NULL,
  case_id            TEXT NOT NULL,
  name               TEXT NOT NULL,
  tagline            TEXT,
  material           TEXT,
  price_idr          INTEGER,
  original_price_idr INTEGER,
  status             TEXT DEFAULT 'OPEN'
                     CHECK (status IN ('OPEN','PO','LIMITED','SOLD','ARCHIVED')),
  filed_under        TEXT[] DEFAULT '{}',

  description        TEXT,
  story              TEXT,

  fabric_gsm         INTEGER,
  fabric_composition TEXT,
  fabric_feel        TEXT,

  fit_silhouette     TEXT,
  print_technique    TEXT,
  print_location     TEXT[] DEFAULT '{}',

  image_front        TEXT,
  image_back         TEXT,
  image_details      TEXT[] DEFAULT '{}',
  image_lookbook     TEXT[] DEFAULT '{}',

  colors             JSONB DEFAULT '[]',
  sizes_available    TEXT[] DEFAULT '{}',
  size_chart         JSONB DEFAULT '[]',

  care_instructions  TEXT[] DEFAULT '{}',
  batch_info         TEXT,
  model_info         TEXT,
  shopee_url         TEXT,

  sort_order         INTEGER DEFAULT 0,
  is_published       BOOLEAN DEFAULT false,
  created_at         TIMESTAMPTZ DEFAULT now(),
  updated_at         TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_published ON products (is_published) WHERE is_published = true;
CREATE INDEX IF NOT EXISTS idx_products_slug ON products (slug);

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- 2. Tabel SITE_CONFIG
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS site_config (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  category   TEXT DEFAULT 'general',
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER trg_site_config_updated_at
  BEFORE UPDATE ON site_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

INSERT INTO site_config (key, value, category) VALUES
  ('name',               'euphoric.disorder',                                                                      'general'),
  ('wordmark',           'An Archive of Disorder',                                                                 'general'),
  ('tagline',            'Kami mengarsipkan kekacauan — lalu mencetaknya.',                                         'general'),
  ('thesis',             'Kejahatan sebagai bahan kajian. Kaos sebagai medium. Comedy · Criminologist · Creativity.','general'),
  ('est',                '2021',                                                                                   'general'),
  ('city',               'Jakarta Pusat',                                                                          'general'),
  ('address',            'Jalan Kran Raya No.4 RT.001/RW.09, Gunung Sahari Selatan, Kemayoran, Jakarta Pusat',     'contact'),
  ('maps_url',           'https://maps.google.com/?q=-6.1570954,106.8455872',                                      'contact'),
  ('whatsapp_number',    '+62 856-1740-296',                                                                       'contact'),
  ('whatsapp_base',      'https://wa.me/628561740296',                                                             'contact'),
  ('whatsapp_hours',     'Senin–Sabtu, 09:00–20:00 WIB',                                                           'contact'),
  ('wa_general_message', 'Halo Euphoric Disorder, saya mau tanya-tanya.',                                          'contact'),
  ('shopee_url',         'https://shopee.co.id/compaxgrup',                                                        'social'),
  ('instagram',          'https://instagram.com/euphoric.disorder',                                                'social'),
  ('threads',            'https://threads.net/@euphoric.disorder',                                                 'social')
ON CONFLICT (key) DO NOTHING;


-- 3. Tabel FAQS
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS faqs (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question    TEXT NOT NULL,
  answer      TEXT NOT NULL,
  sort_order  INTEGER DEFAULT 0,
  is_visible  BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER trg_faqs_updated_at
  BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

INSERT INTO faqs (question, answer, sort_order) VALUES
  ('Bagaimana cara memesan produk edisi Pre-Order (PO)?',
   'Pemesanan PO seperti Candy Hoodie ED dilakukan melalui WhatsApp Admin atau Shopee resmi kami. Batch PO diproses maksimum 14 hari kerja setelah konfirmasi pembayaran.',
   1),
  ('Apakah Euphoric Disorder menerima orderan custom / sablon komunitas?',
   'Ya! Kami membuka layanan pemesanan custom apparel untuk komunitas, event, atau brand kolektif dengan standar bahan katun 24s/fleece dan sablon tahan cuci. Gunakan Form Lapor Kasus di bawah ini.',
   2),
  ('Bagaimana cara perawatan produk sablon agar awet?',
   'Cuci dengan air dingin, hindari penggunaan pemutih keras, dan jangan menyetrika langsung di atas permukaan sablon. Balik baju saat menjemur.',
   3)
ON CONFLICT DO NOTHING;


-- 4. Tabel ADMIN_ACTIVITY_LOG
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS admin_activity_log (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action      TEXT NOT NULL,
  entity_type TEXT,
  entity_id   TEXT,
  changes     JSONB,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_activity_log_created ON admin_activity_log (created_at DESC);


-- 5. Modifikasi CONTACT_SUBMISSIONS (tabel existing)
-- ═══════════════════════════════════════════════════════════════
ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS status       TEXT DEFAULT 'unread'
                                        CHECK (status IN ('unread','read','responded','archived')),
  ADD COLUMN IF NOT EXISTS admin_notes  TEXT,
  ADD COLUMN IF NOT EXISTS responded_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions (status);


-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY POLICIES
-- ═══════════════════════════════════════════════════════════════

-- PRODUCTS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Publik: baca produk yang dipublikasikan"
  ON products FOR SELECT TO anon
  USING (is_published = true);

CREATE POLICY "Owner: baca semua produk"
  ON products FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Owner: tambah produk"
  ON products FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Owner: ubah produk"
  ON products FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Owner: hapus produk"
  ON products FOR DELETE TO authenticated
  USING (true);

-- SITE_CONFIG
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Publik: baca konfigurasi situs"
  ON site_config FOR SELECT USING (true);

CREATE POLICY "Owner: ubah konfigurasi situs"
  ON site_config FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- FAQS
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Publik: baca FAQ yang aktif"
  ON faqs FOR SELECT TO anon
  USING (is_visible = true);

CREATE POLICY "Owner: baca semua FAQ"
  ON faqs FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Owner: tambah FAQ"
  ON faqs FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Owner: ubah FAQ"
  ON faqs FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Owner: hapus FAQ"
  ON faqs FOR DELETE TO authenticated
  USING (true);

-- CONTACT_SUBMISSIONS (policy INSERT publik sudah ada)
CREATE POLICY "Owner: baca pesan pelanggan"
  ON contact_submissions FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Owner: update status pesan"
  ON contact_submissions FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- ADMIN_ACTIVITY_LOG
ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owner: akses log aktivitas"
  ON admin_activity_log FOR ALL TO authenticated
  USING (true) WITH CHECK (true);


-- ═══════════════════════════════════════════════════════════════
-- SUPABASE STORAGE BUCKETS
-- ═══════════════════════════════════════════════════════════════
-- Catatan: Bucket storage sebaiknya dibuat via Supabase Dashboard:
-- 1. Buat bucket "product-images" → Public → Max 5MB
-- 2. Buat bucket "site-assets" → Public → Max 10MB
--
-- Atau via SQL:
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('product-images', 'product-images', true, 5242880, ARRAY['image/webp','image/png','image/jpeg']),
  ('site-assets', 'site-assets', true, 10485760, ARRAY['image/webp','image/png','image/jpeg','image/svg+xml','video/mp4','model/gltf-binary'])
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: publik bisa baca, authenticated bisa upload/hapus
CREATE POLICY "Publik: baca gambar produk"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('product-images', 'site-assets'));

CREATE POLICY "Owner: upload gambar"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id IN ('product-images', 'site-assets'));

CREATE POLICY "Owner: ubah gambar"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id IN ('product-images', 'site-assets'));

CREATE POLICY "Owner: hapus gambar"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id IN ('product-images', 'site-assets'));
