import type { Metadata } from "next";
import ProductCatalogClient from "@/components/product/ProductCatalogClient";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Evidence Locker — Katalog Kaos Streetwear & Custom Sablon",
  description:
    "Katalog berkas perkara Euphoric Disorder: koleksi kaos oversized #WarOnDrugs, Candy Hoodie ED, dan layanan jasa custom sablon clothing satuan/batch di Jakarta.",
  keywords: [
    "katalog kaos streetwear",
    "custom sablon jakarta",
    "kaos oversized kriminologi",
    "sablon plastisol satuan",
    "sablon dtf",
    "cotton combed 16s",
    "cotton combed 24s",
    "candy hoodie ed",
    "euphoric disorder catalog",
  ],
  alternates: {
    canonical: "/product",
  },
  openGraph: {
    title: "Evidence Locker — Katalog Kaos & Custom Sablon | euphoric.disorder",
    description:
      "Daftar lengkap rilisan barang bukti & layanan pembuatan apparel custom Euphoric Disorder.",
    url: "/product",
    type: "website",
    images: [
      {
        url: "/img/candy-hoodie-front.png",
        width: 1200,
        height: 630,
        alt: "Katalog Euphoric Disorder Streetwear & Custom Sablon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evidence Locker — Katalog Kaos & Custom Sablon | euphoric.disorder",
    description:
      "Koleksi kaos kriminologi & layanan custom sablon apparel di Jakarta Pusat.",
    images: ["/img/candy-hoodie-front.png"],
  },
};

export default function ProductCatalogPage() {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Product & Service", url: "/product" },
        ]}
      />
      <JsonLd type="productCatalog" />
      <ProductCatalogClient />
    </>
  );
}
