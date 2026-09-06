import MediaLibrary from "@/components/admin/MediaLibrary";

export const dynamic = "force-dynamic";

export default function MediaPage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-bone/10">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-1.5 h-1.5 bg-lime inline-block" />
          <span className="text-[10px] font-mono text-lime uppercase tracking-[0.25em]">
            EVIDENCE VAULT // ARSIP FOTO & MEDIA CDN
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-bone">
          Penyimpanan Bukti Visual & Media
        </h1>
        <p className="text-bone-dim text-xs font-mono mt-1">
          Aset foto katalog, mockup apparel, lookbook resolusi tinggi, dan file CDN Supabase Storage.
        </p>
      </div>

      <MediaLibrary />
    </div>
  );
}
