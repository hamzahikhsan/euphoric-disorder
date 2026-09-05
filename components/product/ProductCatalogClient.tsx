"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SmoothScroll from "@/components/system/SmoothScroll";
import SurfaceController from "@/components/system/SurfaceController";
import AnimatedPattern from "@/components/pattern/AnimatedPattern";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/sections/Footer";
import { products, type Product } from "@/content/products";
import { site, formatPrice, waLink } from "@/content/site";
import { StatusBadge } from "@/components/product/StatusBadge";

export default function ProductCatalogClient({
  initialProducts,
}: {
  initialProducts?: Product[];
} = {}) {
  const allProducts = initialProducts && initialProducts.length > 0 ? initialProducts : products;
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ["All", "War on Drugs", "Candy", "Custom Sablon", "Limited"];

  const filteredProducts = allProducts.filter((p) => {
    if (activeFilter === "All") return true;
    return p.filedUnder.some(
      (cat) => cat.toLowerCase() === activeFilter.toLowerCase()
    );
  });

  const candyHoodie = allProducts.find((p) => p.slug === "candy-hoodie-ed");

  return (
    <>
      <SmoothScroll />
      <SurfaceController />
      <AnimatedPattern />
      <Navbar />

      <main className="min-h-screen pt-24 pb-12">
        {/* SECTION 1: CATALOG HEADER & FILTER (LIGHT) */}
        <section data-scene="light" className="relative px-6 py-16">
          <div className="mx-auto max-w-content">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="label-mono rounded-sm bg-lime px-2.5 py-1 text-ink font-bold">
                  EVIDENCE LOCKER
                </span>
                <span className="label-mono text-fg-dim">INDEX 001–010</span>
              </div>

              <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tight text-fg">
                Case Files <span className="font-serif italic text-accent">Catalog</span>
              </h1>

              <p className="mt-2 max-w-xl font-body text-p2 text-fg-dim leading-relaxed">
                Daftar lengkap barang bukti, rilis resmi, dan layanan pembuatan apparel kustom. Pilih berkas perkara di bawah untuk melihat rincian bahan, estimasi biaya, dan opsi order.
              </p>
            </div>

            {/* FILTER TABS */}
            <div className="mt-10 flex flex-wrap items-center gap-3 border-b border-fg/15 pb-6">
              <span className="label-mono text-fg-dim mr-2">Filter Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`rounded-pill px-4 py-2 font-display text-body2 font-bold uppercase transition-all ${
                    activeFilter === cat
                      ? "bg-lime text-ink shadow-md"
                      : "border border-fg/20 text-fg hover:border-fg/40 hover:bg-fg/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
              <span className="ml-auto label-mono text-fg-dim">
                Showing {filteredProducts.length} Items
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 2: FEATURED RELEASE SPOTLIGHT (DARK) */}
        {candyHoodie && (
          <section data-scene="dark" className="relative px-6 py-20 my-8">
            <div className="mx-auto max-w-content">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center rounded-2xl border border-fg/15 bg-fg/5 p-8 lg:p-12 shadow-2xl">
                <div className="lg:col-span-6 relative aspect-square w-full max-w-md mx-auto">
                  <Image
                    src={candyHoodie.images.front}
                    alt={candyHoodie.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                  <span className="absolute top-4 left-4 label-mono rounded-sm bg-lime px-3 py-1 text-ink font-bold">
                    HOT RELEASE · SUBJECT {candyHoodie.subject}
                  </span>
                </div>

                <div className="lg:col-span-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <span className="label-mono text-accent">LIMITED PRE-ORDER</span>
                    <StatusBadge status={candyHoodie.status} />
                  </div>

                  <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3.5rem)] font-black uppercase text-fg leading-none">
                    {candyHoodie.name}
                  </h2>

                  <p className="mt-4 font-body text-p2 text-fg-dim leading-relaxed">
                    {candyHoodie.description}
                  </p>

                  <div className="mt-6 flex items-center gap-6 border-t border-fg/10 pt-4">
                    <div>
                      <span className="block font-mono text-caption text-fg-dim uppercase">Material</span>
                      <span className="font-display text-body1 font-bold text-fg">{candyHoodie.material}</span>
                    </div>
                    <div>
                      <span className="block font-mono text-caption text-fg-dim uppercase">Estimasi Harga</span>
                      <span className="font-display text-h3 font-bold text-accent">{formatPrice(candyHoodie.priceIDR)}</span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/product/${candyHoodie.slug}`}
                      className="rounded-pill bg-lime px-6 py-3 font-display text-body1 font-bold text-ink hover:scale-105 transition-transform"
                    >
                      Buka Berkas Perkara →
                    </Link>
                    <a
                      href={site.shopeeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-pill border border-fg/30 bg-fg/10 px-6 py-3 font-display text-body2 font-bold text-fg hover:bg-fg/20 transition-colors"
                    >
                      Shopee Store ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: FULL CATALOG GRID (LIGHT) */}
        <section data-scene="light" className="relative px-6 py-16">
          <div className="mx-auto max-w-content">
            <div className="mb-8">
              <span className="label-mono text-fg-dim">All Evidence Items &amp; Services</span>
              <h2 className="mt-1 font-display text-h2 font-black uppercase text-fg">
                Master <span className="font-serif italic text-accent">Grid</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((p) => {
                const hasBack = Boolean(p.images.back);
                const isService = p.filedUnder.includes("Custom Sablon") || p.filedUnder.includes("Service");

                return (
                  <Link
                    key={p.slug}
                    href={`/product/${p.slug}`}
                    className="group flex flex-col rounded-2xl border border-fg/15 bg-fg/5 text-fg overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-2xl hover:-translate-y-1"
                  >
                    {/* Header Card */}
                    <div className="flex items-center justify-between border-b border-fg/10 px-4 py-3 bg-fg/5">
                      <span className="font-mono text-caption uppercase tracking-wider text-accent font-bold">
                        Subject {p.subject} {isService ? "· SERVICE" : ""}
                      </span>
                      <StatusBadge status={p.status} />
                    </div>

                    {/* Image Container with Hover Swap */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-fg/5">
                      <Image
                        src={p.images.front}
                        alt={`${p.name} — kaos streetwear`}
                        fill
                        sizes="(min-width: 768px) 360px, 90vw"
                        className={`object-contain p-6 transition-all duration-500 ${
                          hasBack
                            ? "opacity-100 group-hover:opacity-0"
                            : "group-hover:scale-105"
                        }`}
                      />
                      {hasBack && (
                        <Image
                          src={p.images.back!}
                          alt={`${p.name} — detail belakang`}
                          fill
                          sizes="(min-width: 768px) 360px, 90vw"
                          className="object-contain p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                      )}
                    </div>

                    {/* Content Body */}
                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        <h3 className="font-display text-h3 font-extrabold uppercase text-fg group-hover:text-accent transition-colors">
                          {p.name}
                        </h3>
                        <p className="mt-1 font-body text-body2 text-fg-dim line-clamp-2">
                          {p.description}
                        </p>
                      </div>

                      <div className="mt-6 flex items-end justify-between border-t border-fg/10 pt-4">
                        <div>
                          <span className="block font-mono text-caption text-fg-dim uppercase">
                            Bahan: {p.material}
                          </span>
                          <span className="block font-mono text-caption text-accent uppercase">
                            Filed: {p.filedUnder.join(", ")}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="block font-mono text-caption text-fg-dim">
                            {isService ? "Start from" : ""}
                          </span>
                          <span className="font-display text-h4 font-bold text-accent">
                            {formatPrice(p.priceIDR)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4: ORDER & GUARANTEE BANNER (DARK) */}
        <section data-scene="dark" className="relative px-6 py-20 mt-12">
          <div className="mx-auto max-w-content text-center rounded-2xl border border-fg/15 bg-fg/5 p-12 shadow-2xl backdrop-blur-md">
            <span className="label-mono text-accent">Authentic Guarantee &amp; Custom Orders</span>
            <h2 className="mt-2 font-display text-[clamp(2rem,5vw,4.5rem)] font-black uppercase text-fg leading-none">
              Siap Memesan Atau <span className="font-serif italic text-accent">Bikin Custom Apparel?</span>
            </h2>
            <p className="mt-4 font-body text-p1 text-fg-dim max-w-lg mx-auto">
              Beli produk edisi terbatas di Shopee Store atau ajukan spesifikasi sablon custom untuk komunitas/brand Anda di WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={site.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-pill bg-lime px-8 py-4 font-display text-h4 font-bold text-ink transition-transform hover:scale-105 shadow-xl"
              >
                Buka Shopee Store ↗
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-pill border border-fg/30 bg-fg/10 px-8 py-4 font-display text-h4 font-bold text-fg hover:bg-fg/20 transition-colors"
              >
                Form Custom Order 📝
              </a>
            </div>
          </div>
        </section>

        {/* CASE DETAIL MODAL */}
        {selectedProduct && (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-ink/80 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-lime/40 bg-forest text-bone shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-paper/10 text-bone hover:bg-lime hover:text-ink transition-colors"
                aria-label="Tutup rincian"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Modal Image */}
                <div className="relative aspect-square w-full bg-forest-deep p-6">
                  <Image
                    src={selectedProduct.images.front}
                    alt={selectedProduct.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>

                {/* Modal Info */}
                <div className="flex flex-col justify-between p-6 md:p-8">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="label-mono text-accent">
                        Subject {selectedProduct.subject}
                      </span>
                      <StatusBadge status={selectedProduct.status} />
                    </div>

                    <h2 className="mt-3 font-display text-h2 font-black uppercase text-bone">
                      {selectedProduct.name}
                    </h2>

                    <p className="mt-4 font-body text-p2 text-bone-dim leading-relaxed">
                      {selectedProduct.description}
                    </p>

                    <div className="mt-6 space-y-2 border-t border-bone/10 pt-4 label-mono text-bone/70">
                      <div><strong className="text-bone">Material:</strong> {selectedProduct.material}</div>
                      <div><strong className="text-bone">Kategori:</strong> {selectedProduct.filedUnder.join(" · ")}</div>
                      <div>
                        <strong className="text-bone">Estimasi Harga:</strong>{" "}
                        <span className="text-lime text-h4 font-bold font-display ml-1">
                          {formatPrice(selectedProduct.priceIDR)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTAs (Tailored for Custom Sablon vs Regular Shop items) */}
                  <div className="mt-8 flex flex-col gap-3">
                    {/* Link ke Dedicated Detail Page */}
                    <Link
                      href={`/product/${selectedProduct.slug}`}
                      className="inline-flex items-center justify-center gap-2 rounded-pill border-2 border-lime bg-lime/15 px-6 py-3 font-display text-body2 font-extrabold text-lime hover:bg-lime hover:text-ink transition-all shadow-md"
                    >
                      📄 Buka Berkas Lengkap &amp; Size Guide →
                    </Link>

                    {selectedProduct.filedUnder.includes("Custom Sablon") ? (
                      <>
                        <a
                          href={waLink(`Halo Admin Euphoric Disorder, saya mau konsultasi & order: ${selectedProduct.name} (Subject ${selectedProduct.subject}). Spesifikasi pilihan bahan & desain saya:`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-pill bg-lime px-6 py-3.5 font-display text-body1 font-bold text-ink transition-transform hover:scale-[1.02] active:scale-95"
                        >
                          💬 Konsultasi &amp; Order via WhatsApp
                        </a>
                        <a
                          href="/contact"
                          className="inline-flex items-center justify-center gap-2 rounded-pill border border-bone/30 bg-forest-deep px-6 py-3 font-display text-body2 font-semibold text-bone hover:bg-bone/10 transition-colors"
                        >
                          📝 Isi Form Lapor Kasus / Custom Inquiry
                        </a>
                      </>
                    ) : (
                      <>
                        <a
                          href={selectedProduct.shopeeUrl || site.shopeeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-pill bg-lime px-6 py-3.5 font-display text-body1 font-bold text-ink transition-transform hover:scale-[1.02] active:scale-95"
                        >
                          🛒 Amankan di Shopee
                        </a>
                        <a
                          href={waLink(`Halo Euphoric Disorder, saya tertarik pesan: ${selectedProduct.name} (Subject ${selectedProduct.subject}).`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-pill border border-bone/30 bg-forest-deep px-6 py-3 font-display text-body2 font-semibold text-bone hover:bg-bone/10 transition-colors"
                        >
                          💬 Tanya Admin via WhatsApp
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
