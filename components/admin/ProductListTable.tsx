"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { togglePublishProduct, deleteProduct } from "@/app/actions/admin/products";
import type { Database } from "@/lib/supabase/types";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];

interface ProductListTableProps {
  initialProducts: ProductRow[];
}

function formatPrice(idr: number | null): string {
  if (idr == null) return "Harga Menyusul";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(idr);
}

const STATUS_BADGES: Record<string, { bg: string; text: string; label: string }> = {
  OPEN: { bg: "bg-[#51CF66]/15", text: "text-[#51CF66]", label: "OPEN" },
  PO: { bg: "bg-[#FFD43B]/15", text: "text-[#FFD43B]", label: "PO" },
  LIMITED: { bg: "bg-[#FF922B]/15", text: "text-[#FF922B]", label: "LIMITED" },
  SOLD: { bg: "bg-[#FF6B6B]/15", text: "text-[#FF6B6B]", label: "SOLD" },
  ARCHIVED: { bg: "bg-[#868E96]/15", text: "text-[#868E96]", label: "ARCHIVED" },
};

export default function ProductListTable({ initialProducts }: ProductListTableProps) {
  const [products, setProducts] = useState<ProductRow[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [publishFilter, setPublishFilter] = useState("ALL");
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Filter products
  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.case_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || p.status === statusFilter;

    const matchesPublish =
      publishFilter === "ALL" ||
      (publishFilter === "LIVE" && p.is_published) ||
      (publishFilter === "DRAFT" && !p.is_published);

    return matchesSearch && matchesStatus && matchesPublish;
  });

  const handleTogglePublish = async (slug: string, currentStatus: boolean) => {
    setActionLoading(slug);
    const newStatus = !currentStatus;

    // Optimistic update
    setProducts((prev) =>
      prev.map((item) =>
        item.slug === slug ? { ...item, is_published: newStatus } : item
      )
    );

    const res = await togglePublishProduct(slug, newStatus);
    setActionLoading(null);

    if (!res.ok) {
      // Revert if error
      setProducts((prev) =>
        prev.map((item) =>
          item.slug === slug ? { ...item, is_published: currentStatus } : item
        )
      );
      alert(`Gagal mengubah status: ${res.error}`);
    }
  };

  const handleDelete = async (slug: string) => {
    setActionLoading(slug);
    const res = await deleteProduct(slug);
    setActionLoading(null);
    setDeletingSlug(null);

    if (res.ok) {
      setProducts((prev) => prev.filter((item) => item.slug !== slug));
    } else {
      alert(`Gagal menghapus produk: ${res.error}`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <div className="bg-[#25262B] border border-[#373A40] p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama, berkas, atau slug..."
            className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] placeholder:text-[#555] focus:outline-none focus:border-[#CDFF00]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-[family-name:var(--font-space-mono)]">
          <span className="text-[#909296] text-[10px] uppercase tracking-wider">
            Publikasi:
          </span>
          {["ALL", "LIVE", "DRAFT"].map((pf) => (
            <button
              key={pf}
              onClick={() => setPublishFilter(pf)}
              className={`px-2.5 py-1 text-[11px] border transition-colors ${
                publishFilter === pf
                  ? "bg-[#CDFF00] text-[#1A1B1E] border-[#CDFF00] font-bold"
                  : "bg-[#1A1B1E] text-[#909296] border-[#373A40] hover:text-[#F1F3F5]"
              }`}
            >
              {pf === "ALL" ? "Semua" : pf}
            </button>
          ))}

          <span className="text-[#909296] text-[10px] uppercase tracking-wider ml-2">
            Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs focus:border-[#CDFF00] focus:outline-none"
          >
            <option value="ALL">Semua Status</option>
            <option value="OPEN">OPEN</option>
            <option value="PO">PO</option>
            <option value="LIMITED">LIMITED</option>
            <option value="SOLD">SOLD</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#25262B] border border-[#373A40] overflow-x-auto">
        <table className="w-full text-left text-xs font-[family-name:var(--font-space-mono)]">
          <thead className="bg-[#1A1B1E] text-[#909296] border-b border-[#373A40] uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-3 px-4 w-16">Foto</th>
              <th className="py-3 px-4">Nama Produk / Berkas</th>
              <th className="py-3 px-4">Harga</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Tayang</th>
              <th className="py-3 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#373A40]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-[#555]">
                  Tidak ada produk yang cocok dengan pencarian / filter.
                </td>
              </tr>
            ) : (
              filtered.map((prod) => {
                const badge = STATUS_BADGES[prod.status] || STATUS_BADGES.OPEN;
                return (
                  <tr key={prod.slug} className="hover:bg-[#2C2E33]/60 transition-colors">
                    {/* Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="relative w-12 h-14 bg-[#1A1B1E] border border-[#373A40] overflow-hidden flex-shrink-0">
                        {prod.image_front ? (
                          <Image
                            src={prod.image_front}
                            alt={prod.name}
                            fill
                            className="object-cover"
                            unoptimized={prod.image_front.startsWith("/")}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs opacity-40">
                            👕
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Info */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#F1F3F5] text-sm font-[family-name:var(--font-nohemi)]">
                        {prod.name}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-[#909296] mt-0.5">
                        <span className="text-[#CDFF00] font-bold">
                          {prod.case_id}
                        </span>
                        <span>·</span>
                        <span>{prod.material || "Bahan belum diset"}</span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#F1F3F5]">
                        {formatPrice(prod.price_idr)}
                      </div>
                      {prod.original_price_idr && (
                        <div className="line-through text-[#909296] text-[10px]">
                          {formatPrice(prod.original_price_idr)}
                        </div>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase ${badge.bg} ${badge.text}`}
                      >
                        {badge.label}
                      </span>
                    </td>

                    {/* Publish Toggle */}
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        disabled={actionLoading === prod.slug}
                        onClick={() => handleTogglePublish(prod.slug, prod.is_published)}
                        className={`px-2.5 py-1 text-[10px] font-bold uppercase transition-all ${
                          prod.is_published
                            ? "bg-[#51CF66]/20 text-[#51CF66] border border-[#51CF66]/50 hover:bg-[#51CF66]/30"
                            : "bg-[#FFD43B]/20 text-[#FFD43B] border border-[#FFD43B]/50 hover:bg-[#FFD43B]/30"
                        }`}
                      >
                        {prod.is_published ? "🟢 LIVE" : "🟡 DRAFT"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right space-x-2">
                      <Link
                        href={`/product/${prod.slug}`}
                        target="_blank"
                        className="inline-block p-1 text-[#909296] hover:text-[#CDFF00] transition-colors"
                        title="Lihat di Web Publik"
                      >
                        ↗ Web
                      </Link>

                      <Link
                        href={`/admin/produk/${prod.slug}/edit`}
                        className="inline-block px-2.5 py-1 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] hover:border-[#CDFF00] hover:text-[#CDFF00] text-[11px] font-bold uppercase transition-colors"
                      >
                        ✏️ Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() => setDeletingSlug(prod.slug)}
                        className="px-2.5 py-1 border border-[#FF6B6B]/30 text-[#FF6B6B] hover:bg-[#FF6B6B]/15 text-[11px] uppercase transition-colors"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingSlug && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-[#25262B] border border-[#FF6B6B]/50 p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-[#FF6B6B] font-[family-name:var(--font-nohemi)]">
              Konfirmasi Penghapusan
            </h3>
            <p className="text-xs text-[#F1F3F5] font-[family-name:var(--font-space-mono)] leading-relaxed">
              Apakah Anda yakin ingin menghapus berkas produk{" "}
              <strong className="text-[#CDFF00]">{deletingSlug}</strong>?
              Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingSlug(null)}
                className="px-4 py-2 border border-[#373A40] text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={actionLoading === deletingSlug}
                onClick={() => handleDelete(deletingSlug)}
                className="px-4 py-2 bg-[#FF6B6B] text-white text-xs font-bold font-[family-name:var(--font-space-mono)] uppercase"
              >
                {actionLoading === deletingSlug ? "Menghapus..." : "Ya, Hapus Produk"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
