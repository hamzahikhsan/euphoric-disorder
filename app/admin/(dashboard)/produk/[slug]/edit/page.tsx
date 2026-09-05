import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminProductBySlug } from "@/app/actions/admin/products";
import FormProduk from "@/components/admin/FormProduk";
import { getProduct as getFallbackProduct } from "@/content/products";
import type { Database } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];

export default async function EditProdukPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // Coba ambil dari Supabase
  const res = await getAdminProductBySlug(slug);

  let initialData: Partial<ProductRow> | null = null;

  if (res.ok && res.data) {
    initialData = res.data;
  } else {
    // Fallback ke data statis
    const fallback = getFallbackProduct(slug);
    if (fallback) {
      initialData = {
        slug: fallback.slug,
        subject: fallback.subject,
        case_id: fallback.caseId,
        name: fallback.name,
        tagline: fallback.tagline,
        material: fallback.material,
        price_idr: fallback.priceIDR,
        original_price_idr: fallback.originalPriceIDR ?? null,
        status: (fallback.status ?? "OPEN") as ProductRow["status"],
        filed_under: fallback.filedUnder,
        description: fallback.description,
        story: fallback.story,
        fabric_gsm: fallback.fabricSpecs?.gsm ?? null,
        fabric_composition: fallback.fabricSpecs?.composition ?? null,
        fabric_feel: fallback.fabricSpecs?.feel ?? null,
        fit_silhouette: fallback.fitSilhouette,
        print_technique: fallback.printTechnique,
        print_location: fallback.printLocation,
        image_front: fallback.images.front,
        image_back: fallback.images.back ?? null,
        image_details: fallback.images.detail ?? [],
        image_lookbook: fallback.images.lookbook ?? [],
        colors: fallback.colors,
        sizes_available: fallback.sizesAvailable,
        size_chart: fallback.sizeChart,
        care_instructions: fallback.careInstructions,
        batch_info: fallback.batchInfo,
        model_info: fallback.modelInfo ?? null,
        shopee_url: fallback.shopeeUrl ?? null,
        sort_order: 1,
        is_published: true,
      };
    }
  }

  if (!initialData) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/produk"
          className="text-xs text-[#909296] hover:text-[#CDFF00] font-[family-name:var(--font-space-mono)] uppercase tracking-wider"
        >
          ← Kembali ke Daftar Produk
        </Link>
      </div>

      <div>
        <h1 className="text-[#F1F3F5] text-2xl font-bold font-[family-name:var(--font-nohemi)]">
          Edit Berkas Perkara: <span className="text-[#CDFF00]">{initialData.name}</span>
        </h1>
        <p className="text-[#909296] text-sm font-[family-name:var(--font-space-mono)] mt-1">
          Kode Kasus: {initialData.case_id} · Slug: {slug}
        </p>
      </div>

      <FormProduk initialData={initialData} isEdit={true} />
    </div>
  );
}
