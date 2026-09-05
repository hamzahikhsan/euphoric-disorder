import type { Metadata } from "next";
import ContactPageClient from "@/components/contact/ContactPageClient";
import { getPublicFaqs } from "@/lib/supabase/site";
import JsonLd from "@/components/seo/JsonLd";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Field Station — Kontak, Custom Inquiry & Markas Kemayoran",
  description:
    "Hubungi markas Euphoric Disorder di Kemayoran Jakarta Pusat. Form konsultasi pembuatan kaos custom sablon, pertanyaan produk, dan akses WhatsApp/Shopee resmi.",
  keywords: [
    "kontak euphoric disorder",
    "sablon custom kemayoran",
    "konveksi kaos jakarta pusat",
    "pesan custom sablon",
    "markas euphoric disorder",
    "field station",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Field Station — Kontak & Lapor Kasus | euphoric.disorder",
    description:
      "Saluran direct WhatsApp, Shopee Store, dan form inquiry custom apparel Euphoric Disorder di Kemayoran, Jakarta Pusat.",
    url: "/contact",
    type: "website",
    images: [
      {
        url: "/img/shirt-gray.png",
        width: 1200,
        height: 630,
        alt: "Field Station Euphoric Disorder Jakarta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Field Station — Kontak & Lapor Kasus | euphoric.disorder",
    description:
      "Hubungi Euphoric Disorder untuk konsultasi custom apparel & pertanyaan pesanan.",
    images: ["/img/shirt-gray.png"],
  },
};

export default async function ContactPage() {
  const faqs = await getPublicFaqs();

  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Contact & Field Station", url: "/contact" },
        ]}
      />
      <JsonLd type="faq" faqs={faqs} />
      <ContactPageClient faqs={faqs} />
    </>
  );
}
