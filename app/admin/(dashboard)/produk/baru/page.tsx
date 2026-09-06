import Link from "next/link";
import FormProduk from "@/components/admin/FormProduk";

export const dynamic = "force-dynamic";

export default function ProdukBaruPage() {
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
            REGISTRASI ARSIP // NEW EVIDENCE DOSSIER
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-bone">
          Tambah Bukti Produk Baru
        </h1>
        <p className="text-bone-dim text-xs font-mono mt-1">
          Buka berkas perkara baru untuk artikel kaos atau apparel custom streetwear.
        </p>
      </div>

      <FormProduk />
    </div>
  );
}
