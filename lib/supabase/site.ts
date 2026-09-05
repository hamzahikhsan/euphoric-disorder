import { createClient } from "@supabase/supabase-js";
import { FAQS as fallbackFaqs, type FAQItem } from "@/content/faqs";
import { site as fallbackSite } from "@/content/site";
import type { Database } from "./types";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient<Database>(url, key);
}

/**
 * Mengambil daftar FAQ aktif untuk halaman publik.
 * Otomatis fallback ke content/faqs.ts jika Supabase belum siap.
 */
export async function getPublicFaqs(): Promise<FAQItem[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return fallbackFaqs;

  try {
    const { data, error } = await supabase
      .from("faqs")
      .select("question, answer")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackFaqs;
    }

    return data.map((item) => ({
      q: item.question,
      a: item.answer,
    }));
  } catch {
    return fallbackFaqs;
  }
}

export type SiteConfig = typeof fallbackSite;

/**
 * Mengambil konfigurasi situs dinamis dengan fallback ke content/site.ts.
 */
export async function getPublicSiteConfig(): Promise<Record<string, string>> {
  const defaults: Record<string, string> = {
    name: fallbackSite.name,
    wordmark: fallbackSite.wordmark,
    tagline: fallbackSite.tagline,
    thesis: fallbackSite.thesis,
    est: fallbackSite.est,
    city: fallbackSite.city,
    address: fallbackSite.address,
    maps_url: fallbackSite.mapsUrl,
    whatsapp_number: fallbackSite.whatsappNumber,
    whatsapp_base: fallbackSite.whatsappBase,
    whatsapp_hours: fallbackSite.whatsappHours,
    wa_general_message: fallbackSite.waGeneralMessage,
    shopee_url: fallbackSite.shopeeUrl,
    instagram: fallbackSite.instagram,
    threads: fallbackSite.threads,
  };

  const supabase = getSupabaseClient();
  if (!supabase) return defaults;

  try {
    const { data, error } = await supabase.from("site_config").select("key, value");
    if (error || !data || data.length === 0) {
      return defaults;
    }

    for (const item of data) {
      defaults[item.key] = item.value;
    }
    return defaults;
  } catch {
    return defaults;
  }
}
