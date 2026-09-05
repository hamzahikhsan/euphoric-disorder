import { createClient } from "@supabase/supabase-js";
import { products as fallbackProducts, getProduct as getFallbackProduct, type Product } from "@/content/products";
import type { Database } from "./types";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];

function mapRowToProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    subject: row.subject,
    caseId: row.case_id,
    name: row.name,
    tagline: row.tagline || "",
    material: row.material || "",
    priceIDR: row.price_idr,
    originalPriceIDR: row.original_price_idr,
    status: row.status,
    filedUnder: row.filed_under || [],
    images: {
      front: row.image_front || "/img/products/candy-hoodie.png",
      back: row.image_back || undefined,
      detail: row.image_details || [],
      lookbook: row.image_lookbook || [],
    },
    description: row.description || "",
    story: row.story || "",
    fabricSpecs: {
      gsm: row.fabric_gsm || 185,
      composition: row.fabric_composition || "100% Cotton Combed",
      feel: row.fabric_feel || "Halus & adem.",
    },
    fitSilhouette: row.fit_silhouette || "Boxy Oversized Fit",
    printTechnique: row.print_technique || "Plastisol Screen Printing",
    printLocation: row.print_location || [],
    colors: row.colors || [],
    sizesAvailable: row.sizes_available || [],
    sizeChart: row.size_chart || [],
    careInstructions: row.care_instructions || [],
    batchInfo: row.batch_info || "",
    modelInfo: row.model_info || undefined,
    shopeeUrl: row.shopee_url || undefined,
  };
}

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient<Database>(url, key);
}

/**
 * Mengambil seluruh produk yang berstatus publikasi (is_published = true).
 * Otomatis fallback ke file statis jika Supabase belum dimigrasikan / offline.
 */
export async function getPublicProducts(): Promise<Product[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return fallbackProducts;

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackProducts;
    }

    return data.map(mapRowToProduct);
  } catch {
    return fallbackProducts;
  }
}

/**
 * Mengambil satu produk berdasarkan slug yang berstatus publikasi.
 */
export async function getPublicProduct(slug: string): Promise<Product | undefined> {
  const supabase = getSupabaseClient();
  if (!supabase) return getFallbackProduct(slug);

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (error || !data) {
      return getFallbackProduct(slug);
    }

    return mapRowToProduct(data);
  } catch {
    return getFallbackProduct(slug);
  }
}
