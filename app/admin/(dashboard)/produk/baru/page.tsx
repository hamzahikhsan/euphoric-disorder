import Link from "next/link";
import FormProduk from "@/components/admin/FormProduk";

export const dynamic = "force-dynamic";

export default function ProdukBaruPage() {
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
          Tambah Produk Baru
        </h1>
        <p className="text-[#909296] text-sm font-[family-name:var(--font-space-mono)] mt-1">
          Buka berkas perkara baru untuk artikel kaos atau apparel custom.
        </p>
      </div>

      <FormProduk />
    </div>
  );
}
