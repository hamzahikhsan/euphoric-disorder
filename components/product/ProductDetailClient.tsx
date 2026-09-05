"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SmoothScroll from "@/components/system/SmoothScroll";
import SurfaceController from "@/components/system/SurfaceController";
import AnimatedPattern from "@/components/pattern/AnimatedPattern";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/sections/Footer";
import { formatPrice, waLink, site } from "@/content/site";
import { StatusBadge } from "@/components/product/StatusBadge";
import type { Product } from "@/content/products";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  // Available images array
  const allImages = [
    { label: "Depan", src: product.images.front },
    ...(product.images.back ? [{ label: "Belakang", src: product.images.back }] : []),
    ...(product.images.detail?.map((src, i) => ({ label: `Detail ${i + 1}`, src })) || []),
  ];

  const [activeImage, setActiveImage] = useState(allImages[0]?.src || product.images.front);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Default");
  const [selectedSize, setSelectedSize] = useState(product.sizesAvailable[0] || "L");
  const [activeTab, setActiveTab] = useState<"story" | "specs" | "sizeChart" | "care">("story");
  const [showSizeModal, setShowSizeModal] = useState(false);

  const isService = product.filedUnder.includes("Custom Sablon") || product.filedUnder.includes("Service");

  // Dynamic WhatsApp order message with selected variations
  const waOrderText = isService
    ? `Halo Admin Euphoric Disorder, saya mau konsultasi layanan: ${product.name} (${product.caseId}). Rincian proyek custom saya:`
    : `Halo Admin Euphoric Disorder, saya mau order:\nProduk: ${product.name} (${product.caseId})\nUkuran: ${selectedSize}\nWarna: ${selectedColor}\nHarga: ${formatPrice(product.priceIDR)}\nMohon info ketersediaan stok & pengirimannya. Terima kasih!`;

  return (
    <>
      <SmoothScroll />
      <SurfaceController />
      <AnimatedPattern />
      <Navbar />

      <main className="min-h-screen pt-24 pb-16">
        {/* BREADCRUMB & CASE HEADER (LIGHT) */}
        <section data-scene="light" className="relative px-6 pt-8 pb-4">
          <div className="mx-auto max-w-content">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 label-mono text-fg-dim text-caption flex-wrap">
              <Link href="/" className="hover:text-fg transition-colors">HOME</Link>
              <span>/</span>
              <Link href="/product" className="hover:text-fg transition-colors">EVIDENCE LOCKER</Link>
              <span>/</span>
              <span className="text-accent font-bold">SUBJECT {product.subject} — {product.name}</span>
            </nav>
          </div>
        </section>

        {/* MAIN PRODUCT HERO GRID (LIGHT) */}
        <section data-scene="light" className="relative px-6 py-8">
          <div className="mx-auto max-w-content">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
              
              {/* LEFT COLUMN: EVIDENCE PHOTO VIEWER */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {/* Main Large Viewer */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-fg/15 bg-fg/5 shadow-2xl flex items-center justify-center p-6 sm:p-10 group">
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="label-mono rounded-sm bg-lime px-3 py-1 text-ink font-bold shadow-sm">
                      {product.caseId}
                    </span>
                    <StatusBadge status={product.status} />
                  </div>

                  <span className="absolute bottom-4 right-4 z-10 label-mono text-fg-dim/40 text-[10px] uppercase tracking-widest pointer-events-none">
                    EVIDENCE RECORD · ARCHIVE
                  </span>

                  <Image
                    src={activeImage}
                    alt={`${product.name} — ${product.tagline}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 640px, 90vw"
                    className="object-contain p-4 sm:p-8 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Multi-angle Thumbnail Switcher */}
                {allImages.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImage(img.src)}
                        className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                          activeImage === img.src
                            ? "border-accent shadow-md scale-105 bg-fg/10"
                            : "border-fg/15 bg-fg/5 hover:border-fg/40 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img.src}
                          alt={img.label}
                          fill
                          sizes="80px"
                          className="object-contain p-2"
                        />
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 label-mono text-[9px] bg-ink/80 text-bone px-1 rounded">
                          {img.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: DOSSIER SPECS & PURCHASE ACTIONS */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="label-mono text-accent font-bold">
                      SUBJECT {product.subject} {isService ? "· CUSTOM SERVICE" : "· EVIDENCE FILE"}
                    </span>
                  </div>

                  <h1 className="mt-2 font-display text-[clamp(2.2rem,4vw,3.5rem)] font-black uppercase text-fg leading-[0.95] tracking-tight">
                    {product.name}
                  </h1>

                  {product.tagline && (
                    <p className="mt-2 font-serif italic text-accent text-h3 leading-snug">
                      "{product.tagline}"
                    </p>
                  )}

                  {/* PRICE BLOCK */}
                  <div className="mt-6 flex items-baseline gap-4 border-b border-fg/10 pb-6">
                    <span className="font-display text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-accent leading-none">
                      {formatPrice(product.priceIDR)}
                    </span>
                    {product.originalPriceIDR && (
                      <span className="font-display text-h3 text-fg-dim line-through decoration-fg-dim/60">
                        {formatPrice(product.originalPriceIDR)}
                      </span>
                    )}
                    <span className="label-mono text-fg-dim ml-auto text-caption">
                      {product.batchInfo}
                    </span>
                  </div>

                  <p className="mt-6 font-body text-p1 text-fg-dim leading-relaxed">
                    {product.description}
                  </p>

                  {/* COLOR SELECTOR */}
                  {product.colors.length > 0 && (
                    <div className="mt-8 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="label-mono text-fg font-bold uppercase text-caption">
                          Pilihan Warna: <span className="text-accent">{selectedColor}</span>
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {product.colors.map((c) => (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => setSelectedColor(c.name)}
                            className={`flex items-center gap-2 rounded-pill px-4 py-2 border transition-all ${
                              selectedColor === c.name
                                ? "border-accent bg-fg/10 text-fg shadow-sm scale-105"
                                : "border-fg/20 bg-fg/5 text-fg-dim hover:border-fg/40"
                            }`}
                          >
                            <span
                              className="h-3.5 w-3.5 rounded-full border border-bone/40 shadow-inner"
                              style={{ backgroundColor: c.hex }}
                            />
                            <span className="font-display text-body2 font-semibold">{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SIZE SELECTOR & SIZE CHART TRIGGER */}
                  {product.sizesAvailable.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="label-mono text-fg font-bold uppercase text-caption">
                          Ukuran: <span className="text-accent">{selectedSize}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowSizeModal(true)}
                          className="label-mono text-accent hover:underline flex items-center gap-1 text-caption"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M2 12h20M7 12v-4M12 12v-6M17 12v-4" />
                          </svg>
                          Panduan Ukuran (Size Guide)
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2.5">
                        {product.sizesAvailable.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`h-11 min-w-[48px] px-3.5 rounded-lg font-display text-body1 font-bold transition-all ${
                              selectedSize === size
                                ? "bg-lime text-ink shadow-md scale-105"
                                : "border border-fg/20 bg-fg/5 text-fg hover:border-fg/40 hover:bg-fg/10"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>

                      {product.modelInfo && (
                        <p className="font-mono text-caption text-fg-dim mt-2">
                          ℹ️ {product.modelInfo}
                        </p>
                      )}
                    </div>
                  )}

                  {/* PRIMARY CTAS (SHOPEE + WHATSAPP) */}
                  <div className="mt-8 flex flex-col gap-3">
                    {/* Shopee Direct */}
                    {product.shopeeUrl && !isService && (
                      <a
                        href={product.shopeeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-pill bg-lime py-4 px-8 font-display text-h4 font-bold text-ink transition-all hover:scale-[1.02] active:scale-95 shadow-xl"
                      >
                        <span>🛒 Amankan Stok di Shopee Official</span>
                        <span className="text-lg">↗</span>
                      </a>
                    )}

                    {/* WhatsApp Personalized Order */}
                    <a
                      href={waLink(waOrderText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 rounded-pill py-4 px-8 font-display text-h4 font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg ${
                        isService
                          ? "bg-lime text-ink"
                          : "border-2 border-accent bg-fg/5 text-fg hover:bg-fg/10"
                      }`}
                    >
                      <span>💬 {isService ? "Konsultasi & Order via WhatsApp" : "Order / Tanya Admin via WhatsApp"}</span>
                      <span>→</span>
                    </a>

                    {/* Custom Order Secondary */}
                    {!isService && (
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 rounded-pill border border-fg/20 py-3 px-6 font-display text-body2 font-semibold text-fg-dim hover:text-fg hover:bg-fg/5 transition-colors"
                      >
                        <span>📝 Ingin Bikin Desain Ini Untuk Komunitas/Custom?</span>
                      </Link>
                    )}
                  </div>

                  {/* TRUST BADGES FORENSIK */}
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-fg/10 pt-6">
                    <div className="flex items-center gap-2.5">
                      <span className="text-accent text-lg">🛡️</span>
                      <span className="font-mono text-caption text-fg-dim leading-tight">100% Original Authentic Artwork</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-accent text-lg">🧵</span>
                      <span className="font-mono text-caption text-fg-dim leading-tight">Standar Katun Murni &amp; Sablon Tahan Cuci</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-accent text-lg">📦</span>
                      <span className="font-mono text-caption text-fg-dim leading-tight">Pengiriman Cepat Seluruh Indonesia</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEEP FORENSIC DOSSIER SECTION (DARK) */}
        <section data-scene="dark" className="relative px-6 py-20 my-12">
          <div className="mx-auto max-w-content">
            <div className="rounded-2xl border border-fg/15 bg-fg/5 p-8 md:p-12 shadow-2xl backdrop-blur-md">
              <span className="label-mono text-accent">FORENSIC INVESTIGATION FILE</span>
              <h2 className="mt-1 font-display text-[clamp(2rem,4vw,3.5rem)] font-black uppercase text-fg">
                Bedah Perkara: <span className="font-serif italic text-accent">{product.name}</span>
              </h2>

              {/* TABS NAVIGATION */}
              <div className="mt-8 flex flex-wrap gap-2 border-b border-fg/10 pb-4">
                {[
                  { id: "story", label: "📂 Latar Belakang & Narasi" },
                  { id: "specs", label: "🔬 Spesifikasi Bahan & Sablon" },
                  { id: "sizeChart", label: "📏 Tabel Ukuran (Size Chart)" },
                  { id: "care", label: "🧼 Instruksi Perawatan" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`rounded-pill px-5 py-2.5 font-display text-body2 font-bold transition-all ${
                      activeTab === tab.id
                        ? "bg-lime text-ink shadow-md"
                        : "border border-fg/20 text-fg-dim hover:text-fg hover:bg-fg/10"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB 1: STORY & NARRATIVE */}
              {activeTab === "story" && (
                <div className="mt-8 max-w-3xl space-y-4">
                  <h3 className="font-display text-h3 font-extrabold uppercase text-fg">
                    Filosofi Motif &amp; Kritik Sosial
                  </h3>
                  <p className="font-body text-p1 text-fg-dim leading-relaxed whitespace-pre-line">
                    {product.story}
                  </p>
                  <div className="mt-6 p-4 rounded-xl border border-accent/20 bg-accent/5">
                    <p className="font-mono text-caption text-accent">
                      Catatan Penyidik: "Kami tidak merayakan kekacauan — kami mencatatnya, menelitinya, dan mencetaknya ke atas tekstur kain agar dapat direnungkan bersama."
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: SPECS & ENGINEERING */}
              {activeTab === "specs" && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-display text-h3 font-extrabold uppercase text-fg">
                      Karakteristik Kain
                    </h3>
                    <ul className="space-y-2.5 font-body text-p2 text-fg-dim">
                      <li><strong className="text-fg">Bahan Utama:</strong> {product.material}</li>
                      <li><strong className="text-fg">Ketebalan / Gramasi:</strong> ~{product.fabricSpecs.gsm} GSM</li>
                      <li><strong className="text-fg">Komposisi:</strong> {product.fabricSpecs.composition}</li>
                      <li><strong className="text-fg">Tekstur &amp; Feel:</strong> {product.fabricSpecs.feel}</li>
                      <li><strong className="text-fg">Potongan Siluet:</strong> {product.fitSilhouette}</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-display text-h3 font-extrabold uppercase text-fg">
                      Teknik Cetak &amp; Sablon
                    </h3>
                    <ul className="space-y-2.5 font-body text-p2 text-fg-dim">
                      <li><strong className="text-fg">Teknik Sablon:</strong> {product.printTechnique}</li>
                      <li><strong className="text-fg">Titik Penempatan:</strong> {product.printLocation.join(" · ")}</li>
                      <li><strong className="text-fg">Daya Tahan Cuci:</strong> Tahan hingga puluhan kali pencucian tanpa retak.</li>
                      <li><strong className="text-fg">Nomor Berkas:</strong> {product.caseId}</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 3: SIZE CHART */}
              {activeTab === "sizeChart" && (
                <div className="mt-8 space-y-6">
                  <h3 className="font-display text-h3 font-extrabold uppercase text-fg">
                    Tabel Ukuran Presisi (Satuan Centimeter)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse font-body text-body2">
                      <thead>
                        <tr className="border-b border-fg/20 font-display text-caption uppercase text-accent">
                          <th className="py-3 px-4">Size</th>
                          <th className="py-3 px-4">Lebar Dada (Chest)</th>
                          <th className="py-3 px-4">Panjang Badan (Length)</th>
                          <th className="py-3 px-4">Panjang Lengan (Sleeve)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-fg/10 text-fg">
                        {product.sizeChart.map((row) => (
                          <tr key={row.size} className="hover:bg-fg/5">
                            <td className="py-3 px-4 font-bold font-display text-accent">{row.size}</td>
                            <td className="py-3 px-4">{row.chest} cm</td>
                            <td className="py-3 px-4">{row.length} cm</td>
                            <td className="py-3 px-4">{row.sleeve} cm</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="font-mono text-caption text-fg-dim">
                    * Toleransi ukuran jahitan manual ± 1–2 cm. Potongan bergaya streetwear loose/boxy.
                  </p>
                </div>
              )}

              {/* TAB 4: GARMENT CARE */}
              {activeTab === "care" && (
                <div className="mt-8 max-w-2xl space-y-4">
                  <h3 className="font-display text-h3 font-extrabold uppercase text-fg">
                    Prosedur Perawatan Pakaian
                  </h3>
                  <ul className="space-y-3 font-body text-p2 text-fg-dim">
                    {product.careInstructions.map((inst, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="font-mono text-accent font-bold">0{i + 1}.</span>
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* RELATED EVIDENCE ITEMS (LIGHT) */}
        {relatedProducts.length > 0 && (
          <section data-scene="light" className="relative px-6 py-16">
            <div className="mx-auto max-w-content">
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <span className="label-mono text-fg-dim">EVIDENCE COMPANIONS</span>
                  <h2 className="mt-1 font-display text-h2 font-black uppercase text-fg">
                    Barang Bukti <span className="font-serif italic text-accent">Terkait</span>
                  </h2>
                </div>
                <Link
                  href="/product"
                  className="font-display text-body1 font-bold text-accent hover:underline hidden sm:block"
                >
                  Lihat Semua Berkas →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/product/${rel.slug}`}
                    className="group rounded-2xl border border-fg/15 bg-fg/5 p-4 transition-all hover:border-accent hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-fg/5">
                      <Image
                        src={rel.images.front}
                        alt={rel.name}
                        fill
                        sizes="(min-width: 768px) 280px, 90vw"
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="label-mono text-accent text-caption">Subject {rel.subject}</span>
                      <span className="font-display font-bold text-fg text-body1">{formatPrice(rel.priceIDR)}</span>
                    </div>
                    <h3 className="mt-1 font-display text-h4 font-bold text-fg group-hover:text-accent transition-colors">
                      {rel.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* SIZE GUIDE MODAL */}
      {showSizeModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-ink/80 backdrop-blur-md"
          onClick={() => setShowSizeModal(false)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-lime/40 bg-forest text-bone p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowSizeModal(false)}
              className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full bg-paper/10 text-bone hover:bg-lime hover:text-ink transition-colors"
            >
              ✕
            </button>

            <span className="label-mono text-accent">SIZE GUIDE SPECIFICATIONS</span>
            <h3 className="mt-1 font-display text-h3 font-black uppercase text-bone">
              Panduan Ukuran ({product.fitSilhouette})
            </h3>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left border-collapse font-body text-body2">
                <thead>
                  <tr className="border-b border-bone/20 font-display text-caption uppercase text-lime">
                    <th className="py-2.5 px-3">Size</th>
                    <th className="py-2.5 px-3">Lebar Dada</th>
                    <th className="py-2.5 px-3">Panjang</th>
                    <th className="py-2.5 px-3">Lengan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bone/10 text-bone">
                  {product.sizeChart.map((row) => (
                    <tr key={row.size}>
                      <td className="py-2.5 px-3 font-bold text-lime">{row.size}</td>
                      <td className="py-2.5 px-3">{row.chest} cm</td>
                      <td className="py-2.5 px-3">{row.length} cm</td>
                      <td className="py-2.5 px-3">{row.sleeve} cm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 font-mono text-caption text-bone-dim">
              Tips: Ukur lebar dada dari kaos favorit Anda dari ketiak kiri ke ketiak kanan dalam posisi mendatar.
            </p>

            <button
              type="button"
              onClick={() => setShowSizeModal(false)}
              className="mt-6 w-full rounded-pill bg-lime py-3 font-display text-body1 font-bold text-ink hover:scale-[1.01] transition-transform"
            >
              Tutup Panduan
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
