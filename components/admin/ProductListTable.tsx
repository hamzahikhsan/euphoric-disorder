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
  if (idr == null) return "Rp —";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(idr);
}

const STATUS_BADGES: Record<string, { bg: string; border: string; text: string; label: string }> = {
  OPEN: { bg: "bg-emerald-950/20", border: "border-emerald-500/40", text: "text-emerald-400", label: "OPEN" },
  PO: { bg: "bg-amber-950/20", border: "border-amber-500/40", text: "text-amber-400", label: "PRE-ORDER" },
  LIMITED: { bg: "bg-orange-950/20", border: "border-orange-500/40", text: "text-orange-400", label: "LIMITED" },
  SOLD: { bg: "bg-red-950/20", border: "border-red-500/40", text: "text-red-400", label: "SOLD OUT" },
  ARCHIVED: { bg: "bg-forest-deep", border: "border-bone/20", text: "text-bone-dim", label: "ARCHIVED" },
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

    const matchesStatus = statusFilter === "ALL" || p.status === statusFilter;

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
      alert(`Gagal mengubah status publikasi: ${res.error}`);
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
      {/* Search & Filter Toolbar */}
      <div className="bg-forest border border-bone/10 p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Search Input */}
        <div className="w-full sm:w-80 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari artikel, kode kasus, atau SKU..."
            className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs font-mono placeholder:text-bone-dim/40 focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-bone-dim hover:text-bone text-xs font-mono"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1 bg-forest-deep p-1 border border-bone/10">
            {["ALL", "LIVE", "DRAFT"].map((pf) => (
              <button
                key={pf}
                onClick={() => setPublishFilter(pf)}
                className={`px-3 py-1 text-[11px] uppercase transition-all ${
                  publishFilter === pf
                    ? "bg-lime text-forest-deep font-bold shadow-sm"
                    : "text-bone-dim hover:text-bone"
                }`}
              >
                {pf === "ALL" ? "Semua" : pf}
              </button>
            ))}
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-forest-deep border border-bone/20 text-bone text-xs font-mono focus:border-lime focus:outline-none"
          >
            <option value="ALL">Semua Status Rilis</option>
            <option value="OPEN">OPEN (Tersedia)</option>
            <option value="PO">PRE-ORDER</option>
            <option value="LIMITED">LIMITED EDITION</option>
            <option value="SOLD">SOLD OUT</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </div>
      </div>

      {/* Forensic Evidence Table */}
      <div className="bg-forest border border-bone/10 overflow-x-auto">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead className="bg-forest-deep text-bone-dim border-b border-bone/10 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-3.5 px-4 w-20">Bukti Foto</th>
              <th className="py-3.5 px-4">Kode Kasus & Nama Artikel</th>
              <th className="py-3.5 px-4">Harga / Valuasi</th>
              <th className="py-3.5 px-4">Status Rilis</th>
              <th className="py-3.5 px-4">Siaran Publik</th>
              <th className="py-3.5 px-4 text-right">Aksi Investigasi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bone/10">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-12 text-center text-bone-dim text-xs">
                  Tidak ditemukan barang bukti produk yang cocok dengan parameter filter.
                </td>
              </tr>
            ) : (
              filtered.map((prod) => {
                const badge = STATUS_BADGES[prod.status] || STATUS_BADGES.OPEN;
                return (
                  <tr key={prod.slug} className="hover:bg-forest-deep/60 transition-colors group">
                    {/* Thumbnail with Forensic Ruler Scale Marks */}
                    <td className="py-3 px-4">
                      <div className="relative w-14 h-16 bg-forest-deep border border-bone/20 overflow-hidden flex-shrink-0 group-hover:border-lime/50 transition-colors">
                        {/* Millimeter photo scale border marks */}
                        <div className="absolute top-0 left-0 bottom-0 w-1 bg-lime/30 z-10 pointer-events-none flex flex-col justify-between py-1">
                          <span className="w-full h-px bg-forest-deep" />
                          <span className="w-full h-px bg-forest-deep" />
                          <span className="w-full h-px bg-forest-deep" />
                        </div>

                        {prod.image_front ? (
                          <Image
                            src={prod.image_front}
                            alt={prod.name}
                            fill
                            className="object-cover"
                            unoptimized={prod.image_front.startsWith("/")}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-bone-dim/40">
                            [NO IMG]
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Product Name & Case ID */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-bone text-sm font-display tracking-tight group-hover:text-lime transition-colors">
                        {prod.name}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-bone-dim mt-1">
                        <span className="text-lime font-bold font-mono">
                          {prod.case_id}
                        </span>
                        <span>•</span>
                        <span className="truncate max-w-[200px]">{prod.material || "Bahan belum diset"}</span>
                        <span>•</span>
                        <span className="text-bone-dim/60">{prod.filed_under}</span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-bone font-mono">
                        {formatPrice(prod.price_idr)}
                      </div>
                      {prod.original_price_idr && (
                        <div className="line-through text-bone-dim/50 text-[10px]">
                          {formatPrice(prod.original_price_idr)}
                        </div>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 text-[9px] font-bold uppercase border ${badge.bg} ${badge.border} ${badge.text}`}
                      >
                        {badge.label}
                      </span>
                    </td>

                    {/* Publish Switcher */}
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        disabled={actionLoading === prod.slug}
                        onClick={() => handleTogglePublish(prod.slug, prod.is_published)}
                        className={`px-2.5 py-1 text-[10px] font-bold uppercase border transition-all flex items-center gap-1.5 ${
                          prod.is_published
                            ? "bg-emerald-950/30 text-emerald-400 border-emerald-500/50 hover:bg-emerald-900/40"
                            : "bg-amber-950/30 text-amber-400 border-amber-500/50 hover:bg-amber-900/40"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${prod.is_published ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
                        <span>{prod.is_published ? "LIVE BROADCAST" : "DRAFT BERKAS"}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/product/${prod.slug}`}
                          target="_blank"
                          className="px-2.5 py-1 bg-forest-deep border border-bone/20 hover:border-lime hover:text-lime text-bone-dim text-[11px] transition-colors"
                          title="Lihat Halaman Publik"
                        >
                          ↗ Toko
                        </Link>

                        <Link
                          href={`/admin/produk/${prod.slug}/edit`}
                          className="px-3 py-1 bg-forest-deep border border-bone/20 hover:border-lime hover:text-lime text-bone text-[11px] font-bold uppercase transition-colors"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() => setDeletingSlug(prod.slug)}
                          className="px-2.5 py-1 border border-red-500/30 text-red-400 hover:bg-red-500/10 text-[11px] uppercase transition-colors"
                          title="Hapus Bukti"
                        >
                          Hapus
                        </button>
                      </div>
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
        <div className="fixed inset-0 z-50 bg-forest-deep/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-forest border border-red-500/50 p-6 sm:p-8 max-w-md w-full space-y-4 shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative">
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 bg-red-500" />
              KONFIRMASI PENGHAPUSAN BUKTI
            </div>

            <h3 className="text-xl font-bold text-bone font-display tracking-tight">
              Musnahkan Berkas Perkara?
            </h3>

            <p className="text-xs text-bone-dim font-mono leading-relaxed">
              Apakah Anda yakin ingin menghapus arsip produk{" "}
              <strong className="text-lime">{deletingSlug}</strong> dari basis data Supabase?
              Tindakan ini permanen dan tidak dapat dibatalkan.
            </p>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-bone/10">
              <button
                type="button"
                onClick={() => setDeletingSlug(null)}
                className="px-4 py-2 border border-bone/20 text-bone-dim hover:text-bone text-xs font-mono uppercase"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={actionLoading === deletingSlug}
                onClick={() => handleDelete(deletingSlug)}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold font-mono uppercase tracking-wider transition-colors shadow-lg"
              >
                {actionLoading === deletingSlug ? "Memusnahkan..." : "Ya, Hapus Bukti"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
