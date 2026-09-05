/**
 * Script Migrasi: content/*.ts → Supabase Database
 *
 * Penggunaan:
 *   npx tsx scripts/migrate-to-supabase.ts
 *
 * Atau dengan Service Role Key:
 *   SUPABASE_SERVICE_ROLE_KEY=your_key npx tsx scripts/migrate-to-supabase.ts
 */

import { createClient } from "@supabase/supabase-js";
import { products } from "../content/products";
import { site } from "../content/site";
import { FAQS } from "../content/faqs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://aaiaochlzcaltkjbawqh.supabase.co";
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_czcXEK21JzCsjjLr36O6Hw_C1lglsO5";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function migrate() {
  console.log("🚀 Memulai migrasi data ke Supabase...");
  console.log(`📡 URL: ${SUPABASE_URL}`);

  // 1. Migrasi Site Config
  console.log("\n📦 [1/3] Memigrasikan Konfigurasi Situs...");
  const siteConfigEntries: { key: string; value: string; category: string }[] = [
    { key: "name", value: site.name, category: "general" },
    { key: "wordmark", value: site.wordmark, category: "general" },
    { key: "tagline", value: site.tagline, category: "general" },
    { key: "thesis", value: site.thesis, category: "general" },
    { key: "est", value: site.est, category: "general" },
    { key: "city", value: site.city, category: "general" },
    { key: "address", value: site.address, category: "contact" },
    { key: "maps_url", value: site.mapsUrl, category: "contact" },
    { key: "whatsapp_number", value: site.whatsappNumber, category: "contact" },
    { key: "whatsapp_base", value: site.whatsappBase, category: "contact" },
    { key: "whatsapp_hours", value: site.whatsappHours, category: "contact" },
    { key: "wa_general_message", value: site.waGeneralMessage, category: "contact" },
    { key: "shopee_url", value: site.shopeeUrl, category: "social" },
    { key: "instagram", value: site.instagram, category: "social" },
    { key: "threads", value: site.threads, category: "social" },
  ];

  for (const item of siteConfigEntries) {
    const { error } = await supabase
      .from("site_config")
      .upsert(item, { onConflict: "key" });
    if (error) {
      console.warn(`  ⚠ Gagal simpan ${item.key}:`, error.message);
    } else {
      console.log(`  ✓ ${item.key}`);
    }
  }

  // 2. Migrasi FAQs
  console.log("\n📦 [2/3] Memigrasikan FAQ...");
  for (let i = 0; i < FAQS.length; i++) {
    const faq = FAQS[i];
    const { error } = await supabase.from("faqs").upsert(
      {
        question: faq.q,
        answer: faq.a,
        sort_order: i + 1,
        is_visible: true,
      },
      { onConflict: "question" }
    );
    if (error) {
      console.warn(`  ⚠ Gagal simpan FAQ #${i + 1}:`, error.message);
    } else {
      console.log(`  ✓ FAQ #${i + 1}: "${faq.q.substring(0, 30)}..."`);
    }
  }

  // 3. Migrasi Produk
  console.log("\n📦 [3/3] Memigrasikan Produk...");
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const payload = {
      slug: p.slug,
      subject: p.subject,
      case_id: p.caseId,
      name: p.name,
      tagline: p.tagline,
      material: p.material,
      price_idr: p.priceIDR,
      original_price_idr: p.originalPriceIDR || null,
      status: p.status || "OPEN",
      filed_under: p.filedUnder || [],
      description: p.description,
      story: p.story,
      fabric_gsm: p.fabricSpecs?.gsm || null,
      fabric_composition: p.fabricSpecs?.composition || null,
      fabric_feel: p.fabricSpecs?.feel || null,
      fit_silhouette: p.fitSilhouette || null,
      print_technique: p.printTechnique || null,
      print_location: p.printLocation || [],
      image_front: p.images.front,
      image_back: p.images.back || null,
      image_details: p.images.detail || [],
      image_lookbook: p.images.lookbook || [],
      colors: p.colors || [],
      sizes_available: p.sizesAvailable || [],
      size_chart: p.sizeChart || [],
      care_instructions: p.careInstructions || [],
      batch_info: p.batchInfo || null,
      model_info: p.modelInfo || null,
      shopee_url: p.shopeeUrl || null,
      sort_order: i + 1,
      is_published: true,
    };

    const { error } = await supabase
      .from("products")
      .upsert(payload, { onConflict: "slug" });

    if (error) {
      console.warn(`  ⚠ Gagal simpan produk ${p.slug}:`, error.message);
    } else {
      console.log(`  ✓ [${p.caseId}] ${p.name}`);
    }
  }

  console.log("\n✨ Migrasi data selesai!");
}

migrate().catch((err) => {
  console.error("❌ Error saat migrasi:", err);
  process.exit(1);
});
