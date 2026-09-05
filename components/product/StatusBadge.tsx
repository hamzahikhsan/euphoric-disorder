import type { ProductStatus } from "@/content/products";

/**
 * Badge status produk (mono kecil). null = belum dipastikan → "Status ⚠️".
 * Warna hanya di badge (disiplin warna DESIGN-SYSTEM §2).
 */
const MAP: Record<ProductStatus, { label: string; color: string }> = {
  OPEN: { label: "Open", color: "text-status-open border-status-open" },
  PO: { label: "Pre-Order", color: "text-status-limited border-status-limited" },
  LIMITED: { label: "Limited", color: "text-status-limited border-status-limited" },
  SOLD: { label: "Sold Out", color: "text-status-sold border-status-sold" },
  ARCHIVED: { label: "Arsip", color: "text-text-tertiary border-line" },
};

export function StatusBadge({ status }: { status: ProductStatus | null }) {
  const s = status
    ? MAP[status]
    : { label: "Status ⚠️", color: "text-text-tertiary border-line" };
  return (
    <span
      className={`inline-block border px-2 py-1 font-mono text-label uppercase tracking-label ${s.color}`}
    >
      {s.label}
    </span>
  );
}
