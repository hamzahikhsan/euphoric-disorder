import Image from "next/image";
import type { Product } from "@/content/products";
import { formatPrice } from "@/content/site";
import { StatusBadge } from "./StatusBadge";

/**
 * Index Card (kartu produk arsip) — DESIGN-SYSTEM §5.4.
 * Hover image-swap depan↔belakang (CSS-only) bila ada foto kedua; kalau
 * belum, hover memberi zoom halus + underline cobalt. Garis hairline,
 * tanpa bayangan berat.
 *
 * ⚠️ Link detail ("#") menunggu halaman product/[slug] dibangun.
 */
export function IndexCard({ product }: { product: Product }) {
  const { subject, name, material, priceIDR, status, filedUnder, images } =
    product;
  const hasBack = Boolean(images.back);

  return (
    <a
      href="#"
      className="group flex w-full flex-col border border-line bg-bg-raised transition-colors duration-micro ease-out hover:border-line-strong"
    >
      {/* Header kartu: nomor subjek + status */}
      <div className="flex items-center justify-between border-b border-line px-3 py-2">
        <span className="font-mono text-label uppercase tracking-label text-text-secondary">
          Subject {subject}
        </span>
        <StatusBadge status={status} />
      </div>

      {/* Foto dengan hover-swap */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={images.front}
          alt={`${name} — tampak depan`}
          fill
          sizes="(min-width: 768px) 320px, 70vw"
          className={`object-contain p-4 transition-all duration-std ease-out ${
            hasBack
              ? "opacity-100 group-hover:opacity-0"
              : "group-hover:scale-[1.04]"
          }`}
        />
        {hasBack && (
          <Image
            src={images.back!}
            alt={`${name} — tampak belakang`}
            fill
            sizes="(min-width: 768px) 320px, 70vw"
            className="object-contain p-4 opacity-0 transition-opacity duration-std ease-out group-hover:opacity-100"
          />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 border-t border-line px-3 py-3">
        <h3 className="font-display text-h3 font-semibold leading-snug">
          <span className="bg-gradient-to-r from-accent to-accent bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-std ease-out group-hover:bg-[length:100%_1px]">
            {name}
          </span>
        </h3>
        <span className="font-mono text-label uppercase tracking-label text-text-tertiary">
          Filed under: {filedUnder.join(" · ")}
        </span>
        <div className="mt-1 flex items-center justify-between">
          <span className="font-body text-body text-text-secondary">
            {material}
          </span>
          <span className="font-display text-body font-semibold text-text-primary">
            {formatPrice(priceIDR)}
          </span>
        </div>
      </div>
    </a>
  );
}
