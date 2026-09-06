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
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-bone/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 bg-lime inline-block" />
            <span className="text-[10px] font-mono text-lime uppercase tracking-[0.25em]">
              EVIDENCE LOCKER // KATALOG BUKTI APPAREL
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-bone">
            Daftar Bukti Produk
          </h1>
          <p className="text-bone-dim text-xs font-mono mt-1">
            Kelola arsip berkas perkara artikel, spesifikasi bahan, matriks ukuran, dan publikasi toko.
          </p>
        </div>

        <Link
          href="/admin/produk/baru"
          className="px-5 py-2.5 bg-lime text-forest-deep text-xs font-bold font-mono uppercase tracking-wider hover:bg-lime/90 active:scale-[0.98] transition-all flex items-center gap-2 shadow-[0_2px_12px_rgba(205,255,0,0.15)] flex-shrink-0"
        >
          <span className="text-sm leading-none">+</span>
          <span>Daftarkan Bukti Baru</span>
        </Link>
      </div>

      {/* Product List Table Component */}
      <ProductListTable initialProducts={productsList} />
    </div>
  );
}
