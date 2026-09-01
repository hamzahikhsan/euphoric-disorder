/**
 * Data produk — sumber lokal (belum ada CMS).
 * Schema mengacu BUILD-SPEC §5. Nilai yang belum dipastikan Hamzah
 * (harga, status, link Shopee) DITANDAI null / placeholder — jangan dikarang.
 */

export type ProductStatus = "OPEN" | "PO" | "LIMITED" | "SOLD";

export type Product = {
  slug: string;
  subject: string; // nomor "Subject" (mono). "—" bila belum ada.
  name: string;
  material: string;
  priceIDR: number | null; // null → tampil "Harga menyusul"
  status: ProductStatus | null; // null → badge "Status ⚠️" (belum dipastikan)
  filedUnder: string[];
  images: { front: string; back?: string; gallery?: string[] };
  description: string; // nada deadpan
  shopeeUrl?: string; // ⚠️ belum ada per-produk
};

export const products: Product[] = [
  {
    slug: "candy-hoodie-ed",
    subject: "001",
    name: "Candy Hoodie ED",
    material: "Fleece",
    priceIDR: 350000,
    status: "LIMITED",
    filedUnder: ["Candy", "Limited"],
    images: { front: "/img/products/candy-hoodie.png" },
    description:
      "Subject 001. Hoodie fleece, edisi terbatas. Manis di permukaan, tidak selalu di dalam — persis seperti namanya.",
  },
  {
    slug: "warondrugs-m3",
    subject: "003",
    name: "Kaos #WarOnDrugs — M3",
    material: "Cotton Combed 24s",
    priceIDR: null,
    status: null,
    filedUnder: ["War on Drugs"],
    images: { front: "/img/products/warondrugs-m3.png" },
    description:
      "Subject 003. Katun combed 24s, sablon tahan cuci. Bagian dari seri #WarOnDrugs — sebuah pengamatan, bukan perayaan.",
  },
  {
    slug: "warondrugs-m7-lego",
    subject: "007",
    name: 'Kaos #WarOnDrugs — M7 "Lego"',
    material: "Cotton Combed 24s",
    priceIDR: null,
    status: null,
    filedUnder: ["War on Drugs"],
    images: { front: "/img/products/warondrugs-m7.png" },
    description:
      "Subject 007. Seri #WarOnDrugs, varian 'Lego'. Katun combed 24s. Dibangun dari kepingan, seperti kebiasaan.",
  },
  {
    slug: "warondrugs-m8",
    subject: "008",
    name: "Kaos #WarOnDrugs — M8",
    material: "Cotton Combed 24s",
    priceIDR: null,
    status: null,
    filedUnder: ["War on Drugs"],
    images: { front: "/img/products/warondrugs-m8.png" },
    description:
      "Subject 008. Katun combed 24s, sablon. Kajian dingin yang dipakai di dada.",
  },
  {
    slug: "warondrugs-m14",
    subject: "014",
    name: "Kaos #WarOnDrugs — M14",
    material: "Cotton Combed 24s",
    priceIDR: null,
    status: null,
    filedUnder: ["War on Drugs"],
    images: { front: "/img/products/warondrugs-m14.png" },
    description:
      "Subject 014. Katun combed 24s. Nomor besar, pertanyaan yang lebih besar.",
  },
  {
    slug: "warondrugs-s4",
    subject: "S4",
    name: "Kaos #WarOnDrugs — S4",
    material: "Cotton Combed 24s",
    priceIDR: null,
    status: null,
    filedUnder: ["War on Drugs"],
    images: {
      front: "/img/products/warondrugs-s4.png",
      back: "/img/products/warondrugs-s4b.png", // satu-satunya yang punya angle kedua (hover-swap)
    },
    description:
      "Subject S4. Katun combed 24s, dua sisi. Bukti yang bisa dibalik.",
  },
  {
    slug: "custom-sablon-batch",
    subject: "009",
    name: "Custom Sablon & Apparel — Batch Production",
    material: "Combed 24s / 16s Heavyweight / Fleece 330gsm",
    priceIDR: 55000,
    status: "OPEN",
    filedUnder: ["Custom Sablon", "Service"],
    images: {
      front: "/img/shirt-gray.png",
      back: "/img/shirt-green.png",
    },
    description:
      "Subject 009. Layanan pembuatan kaos & apparel kustom skala komunitas atau brand kolektif (min. 12 pcs). Pilihan bahan Combed 24s, 16s Heavyweight (235 GSM), hingga Fleece 330gsm dengan sablon Plastisol / Discharge tahan lama.",
  },
  {
    slug: "custom-sablon-satuan",
    subject: "010",
    name: "Custom Sablon Satuan & Sample Build",
    material: "Cotton Combed 24s / 30s",
    priceIDR: 75000,
    status: "OPEN",
    filedUnder: ["Custom Sablon", "Service"],
    images: {
      front: "/img/hero-tee.png",
    },
    description:
      "Subject 010. Cetak sampel produk atau kaos custom tanpa minimal order (1 pcs pun dilayani). Menggunakan cetak DTF presisi tinggi / Plastisol HD dengan detail warna tajam.",
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
