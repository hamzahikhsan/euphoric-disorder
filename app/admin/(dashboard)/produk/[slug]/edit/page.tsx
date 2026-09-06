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
      <div className="pb-4 border-b border-bone/10">
        <div className="flex items-center gap-2 mb-2">
          <Link
            href="/admin/produk"
            className="text-xs text-bone-dim hover:text-lime font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <span>←</span>
            <span>Kembali ke Evidence Locker</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-1.5 h-1.5 bg-lime inline-block" />
          <span className="text-[10px] font-mono text-lime uppercase tracking-[0.25em]">
            MODIFIKASI ARSIP // EDIT EVIDENCE DOSSIER
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-bone">
          Edit Berkas: <span className="text-lime">{initialData.name}</span>
        </h1>
        <p className="text-bone-dim text-xs font-mono mt-1">
          Nomor Kasus: <span className="text-lime font-bold">{initialData.case_id}</span> • Slug: {slug}
        </p>
      </div>

      <FormProduk initialData={initialData} isEdit={true} />
    </div>
  );
}
