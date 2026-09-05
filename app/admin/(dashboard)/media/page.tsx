import MediaLibrary from "@/components/admin/MediaLibrary";

export const dynamic = "force-dynamic";

export default function MediaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[#F1F3F5] text-2xl font-bold font-[family-name:var(--font-nohemi)]">
          Perpustakaan Media
        </h1>
        <p className="text-[#909296] text-sm font-[family-name:var(--font-space-mono)] mt-1">
          Kelola aset foto produk, grafis sablon, dan file CDN Supabase Storage.
        </p>
      </div>

      <MediaLibrary />
    </div>
  );
}
