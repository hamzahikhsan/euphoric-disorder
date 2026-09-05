import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/content/products";
import { getPublicProduct, getPublicProducts } from "@/lib/supabase/products";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import JsonLd from "@/components/seo/JsonLd";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const allProducts = await getPublicProducts();
  return allProducts.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getPublicProduct(params.slug);
  if (!product) return {};

  const title = `${product.name} (${product.caseId}) — Evidence Locker`;
  const description = `${product.tagline ? `"${product.tagline}" ` : ""}${product.description} Material: ${product.material}.`;
  const canonicalUrl = `/product/${product.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} | euphoric.disorder`,
      description,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: product.images.front,
          width: 1000,
          height: 1000,
          alt: `${product.name} — euphoric.disorder`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | euphoric.disorder`,
      description,
      images: [product.images.front],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getPublicProduct(params.slug);

  if (!product) {
    notFound();
  }

  // Get up to 3 related products from the same or other categories
  const relatedProducts = products
    .filter((p) => p.slug !== product.slug)
    .filter((p) => p.filedUnder.some((cat) => product.filedUnder.includes(cat)))
    .slice(0, 3);

  // If less than 3, fill from remaining catalog
  if (relatedProducts.length < 3) {
    const remaining = products.filter(
      (p) => p.slug !== product.slug && !relatedProducts.some((r) => r.slug === p.slug)
    );
    relatedProducts.push(...remaining.slice(0, 3 - relatedProducts.length));
  }

  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Evidence Locker", url: "/product" },
          { name: product.name, url: `/product/${product.slug}` },
        ]}
      />
      <JsonLd type="product" product={product} />
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
