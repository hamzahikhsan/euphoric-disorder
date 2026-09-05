import Link from "next/link";
import { getAdminProducts } from "@/app/actions/admin/products";
import ProductListTable from "@/components/admin/ProductListTable";
import { products as fallbackProducts } from "@/content/products";
import type { Database } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];

export default async function ProdukPage() {
  const res = await getAdminProducts();

  let productsList: ProductRow[] = [];

  if (res.ok && res.data && res.data.length > 0) {
    productsList = res.data;
  } else {
    // Graceful fallback to static data if database not yet migrated
    productsList = fallbackProducts.map((p, idx) => ({
      id: `fallback-${p.slug}`,
      slug: p.slug,
      subject: p.subject,
      case_id: p.caseId,
      name: p.name,
      tagline: p.tagline,
      material: p.material,
      price_idr: p.priceIDR,
      original_price_idr: p.originalPriceIDR ?? null,
      status: (p.status ?? "OPEN") as ProductRow["status"],
      filed_under: p.filedUnder,
      description: p.description,
      story: p.story,
      fabric_gsm: p.fabricSpecs?.gsm ?? null,
      fabric_composition: p.fabricSpecs?.composition ?? null,
      fabric_feel: p.fabricSpecs?.feel ?? null,
      fit_silhouette: p.fitSilhouette,
      print_technique: p.printTechnique,
      print_location: p.printLocation,
      image_front: p.images.front,
      image_back: p.images.back ?? null,
      image_details: p.images.detail ?? [],
      image_lookbook: p.images.lookbook ?? [],
      colors: p.colors,
      sizes_available: p.sizesAvailable,
      size_chart: p.sizeChart,
      care_instructions: p.careInstructions,
      batch_info: p.batchInfo,
      model_info: p.modelInfo ?? null,
      shopee_url: p.shopeeUrl ?? null,
      sort_order: idx + 1,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[#F1F3F5] text-2xl font-bold font-[family-name:var(--font-nohemi)]">
            Daftar Produk
          </h1>
          <p className="text-[#909296] text-sm font-[family-name:var(--font-space-mono)] mt-1">
            Kelola katalog berkas perkara, harga, stok, dan kontrol publikasi.
          </p>
        </div>

        <Link
          href="/admin/produk/baru"
          className="px-5 py-2.5 bg-[#CDFF00] text-[#1A1B1E] text-xs font-bold font-[family-name:var(--font-space-mono)] uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
        >
          ➕ Tambah Produk Baru
        </Link>
      </div>

      {/* Product List Table Component */}
      <ProductListTable initialProducts={productsList} />
    </div>
  );
}
