import { site } from "@/content/site";
import { products } from "@/content/products";

interface JsonLdProps {
  type?: "organization" | "store" | "productCatalog" | "faq" | "breadcrumb";
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqs?: Array<{ q: string; a: string }>;
}

export default function JsonLd({ type = "organization", breadcrumbs, faqs }: JsonLdProps) {
  const siteUrl = "https://euphoric-disorder-eight.vercel.app";

  if (type === "organization" || type === "store") {
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "ClothingStore",
      name: site.name,
      alternateName: ["Euphoric Disorder", "Euphoric Disorder Apparel"],
      url: siteUrl,
      logo: `${siteUrl}/logo.svg`,
      image: `${siteUrl}/img/shirt-gray.png`,
      description: site.thesis,
      telephone: site.whatsappNumber,
      priceRange: "Rp 55.000 - Rp 350.000",
      currenciesAccepted: "IDR",
      paymentAccepted: "Transfer Bank, QRIS, ShopeePay",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "20:00",
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jalan Kran Raya No.4 RT.001/RW.09",
        addressLocality: "Gunung Sahari Selatan, Kemayoran",
        addressRegion: "DKI Jakarta",
        postalCode: "10610",
        addressCountry: "ID",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -6.1570954,
        longitude: 106.8455872,
      },
      sameAs: [
        site.instagram,
        site.threads,
        site.shopeeUrl,
        site.mapsUrl,
      ],
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
    );
  }

  if (type === "productCatalog") {
    const catalogSchema = {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      name: "Euphoric Disorder Streetwear & Custom Sablon",
      itemListElement: products.map((p) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: p.name,
          description: p.description,
          image: p.images.front.startsWith("http") ? p.images.front : `${siteUrl}${p.images.front}`,
          category: p.filedUnder.join(", "),
          sku: p.slug,
          offers: {
            "@type": "Offer",
            price: p.priceIDR ?? 55000,
            priceCurrency: "IDR",
            availability:
              p.status === "SOLD"
                ? "https://schema.org/OutOfStock"
                : p.status === "PO"
                ? "https://schema.org/PreOrder"
                : "https://schema.org/InStock",
          },
        },
      })),
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogSchema) }}
      />
    );
  }

  if (type === "breadcrumb" && breadcrumbs) {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: item.name,
        item: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
      })),
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    );
  }

  if (type === "faq" && faqs) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    );
  }

  return null;
}
