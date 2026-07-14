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

  est: "2021", // JakCloth participant since 2021
  city: "Jakarta Pusat",
  address:
    "Jalan Kran Raya No.4 RT.001/RW.09, Gunung Sahari Selatan, Kemayoran, Jakarta Pusat",
  mapsUrl: "https://maps.google.com/?q=-6.1570954,106.8455872",

  // Kontak / transaksi (fase profil → arahkan keluar). Sumber: docs/05-LINKS-CONTACT.md
  whatsappNumber: "+62 856-1740-296",
  whatsappBase: "https://wa.me/628561740296",
  whatsappHours: "Senin–Sabtu, 09:00–20:00 WIB",
  waGeneralMessage: "Halo Euphoric Disorder, saya mau tanya-tanya.",
  shopeeUrl: "https://shopee.co.id/compaxgrup",
  instagram: "https://instagram.com/euphoric.disorder",
  threads: "https://threads.net/@euphoric.disorder",

  // Sosial resmi yang aktif (brand belum punya TikTok/Facebook per doc)
  socials: [
    { label: "Instagram", href: "https://instagram.com/euphoric.disorder" },
    { label: "Threads", href: "https://threads.net/@euphoric.disorder" },
  ],

  // Navigasi internal
  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Product/Service", href: "/product" },
    { label: "Contact", href: "/contact" },
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
