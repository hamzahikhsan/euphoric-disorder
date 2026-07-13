/**
 * Konten situs global — slogan, sosial, kontak.
 * ⚠️ = butuh fakta asli dari Hamzah; sampai terisi pakai placeholder jelas.
 */

export const site = {
  name: "euphoric.disorder",
  wordmark: "An Archive of Disorder",
  tagline: "Kami mengarsipkan kekacauan — lalu mencetaknya.",
  thesis:
    "Kejahatan sebagai bahan kajian. Kaos sebagai medium. Comedy · Criminologist · Creativity.",

  // ⚠️ Placeholder — belum dipastikan Hamzah
  est: "⚠️[tahun]",
  city: "⚠️[kota]",

  // Kontak / transaksi (fase profil → arahkan keluar)
  whatsappNumber: "PLACEHOLDER", // ⚠️ nomor WA Business
  whatsappBase: "https://wa.me/PLACEHOLDER",
  shopeeUrl: "https://shopee.co.id/PLACEHOLDER", // ⚠️ toko resmi
  instagram: "https://instagram.com/euphoric.disorder",
  threads: "https://threads.net/@euphoric.disorder",

  socials: [
    { label: "Instagram", href: "https://instagram.com/euphoric.disorder" },
    { label: "Shopee", href: "https://shopee.co.id/PLACEHOLDER" },
    { label: "WhatsApp", href: "https://wa.me/PLACEHOLDER" },
    { label: "Threads", href: "https://threads.net/@euphoric.disorder" },
  ],
} as const;

/** Bangun link WhatsApp dengan pesan terisi otomatis. */
export function waLink(message: string): string {
  return `${site.whatsappBase}?text=${encodeURIComponent(message)}`;
}

/** Format harga IDR; null → placeholder jujur. */
export function formatPrice(idr: number | null): string {
  if (idr == null) return "Harga menyusul";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(idr);
}
