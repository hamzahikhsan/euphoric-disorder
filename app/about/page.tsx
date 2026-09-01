import type { Metadata } from "next";
import Image from "next/image";
import SmoothScroll from "@/components/system/SmoothScroll";
import SurfaceController from "@/components/system/SurfaceController";
import AnimatedPattern from "@/components/pattern/AnimatedPattern";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "The Dossier — Tentang Kami & Filosofi Kriminologi",
  description:
    "An Archive of Disorder: kejahatan sebagai bahan kajian, kaos sebagai medium. Membedah filosofi 3 pilar (@Comedy, @Criminologist, @Creativity) dan sejarah brand sejak 2021.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "The Dossier — Tentang Kami | euphoric.disorder",
    description:
      "Arsip kriminologi dan streetwear: @Comedy, @Criminologist, @Creativity.",
    url: "/about",
    type: "article",
    images: [{ url: "/img/about-jakcloth.png", width: 1200, height: 630, alt: "Tentang Euphoric Disorder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Dossier — Tentang Kami | euphoric.disorder",
    description: "Membedah filosofi dan sejarah streetwear kriminologi euphoric.disorder.",
  },
};

const PILLARS = [
  {
    tag: "@COMEDY",
    title: "Deadpan Humor",
    desc: "Sindiran dingin dan komedi absurd yang ditorehkan di atas tekstur kain. Mengubah fenomena sosial yang mengganggu menjadi lelucon yang dipakai di dada.",
  },
  {
    tag: "@CRIMINOLOGIST",
    title: "Forensic Analysis",
    desc: "Setiap rilisan adalah pengamatan empiris terhadap adiksi, keadilan, dan bentuk-bentuk kejahatan di sekitar kita. Kami tidak merayakan kejahatan, kami mencatatnya.",
  },
  {
    tag: "@CREATIVITY",
    title: "Unapologetic Fashion",
    desc: "Sablon tahan cuci pada katun 24s dan fleece premium. Estetika Riso/Dossier dengan ketidaksempurnaan yang disengaja — misprint, stamp, dan garis forensik.",
  },
];

const TIMELINE = [
  {
    year: "2021",
    title: "Titik Mulai & JakCloth",
    desc: "Pertama kali turun ke lapangan dalam arena JakCloth. Dimulai dari eksperimen sablon skala kecil dengan motif kajian sosial.",
  },
  {
    year: "2023",
    title: "Seri #WarOnDrugs & Subject 001",
    desc: "Melahirkan motif ikonik #WarOnDrugs (M3, M7, M8, M14) dan edisi terbatas Candy Hoodie ED yang terjual habis dalam sistem PO.",
  },
  {
    year: "2026",
    title: "The Case Files Digital Archive",
    desc: "Peluncuran katalog digital interaktif sebagai tempat mengarsipkan seluruh barang bukti dan rilisan resmi euphoric.disorder.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "About Us", url: "/about" },
        ]}
      />
      <SmoothScroll />
      <SurfaceController />
      <AnimatedPattern />
      <Navbar />

      <main className="min-h-screen pt-24 pb-12">
        {/* HERO SECTION (LIGHT) */}
        <section
          data-scene="light"
          className="relative px-6 py-20 overflow-hidden"
        >
          <div className="mx-auto max-w-content">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="label-mono rounded-sm bg-lime px-2.5 py-1 text-ink font-bold">
                  CONFIDENTIAL DOSSIER
                </span>
                <span className="label-mono text-fg-dim">CASE FILE #000</span>
              </div>

              <h1 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-black uppercase leading-[0.88] tracking-tight text-fg">
                An Archive of <br />
                <span className="font-serif italic text-accent">Disorder</span>
              </h1>

              <p className="mt-4 max-w-2xl font-body text-p1 text-fg-dim leading-relaxed">
                {site.tagline} {site.thesis}
              </p>
            </div>

            {/* Editorial banner image with tape/stamp effect */}
            <div className="relative mt-12 overflow-hidden rounded-2xl border border-fg/15 bg-fg/5 p-2 shadow-2xl">
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl">
                <Image
                  src="/img/gallery/ig-1.png"
                  alt="Euphoric Disorder Studio Archive"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Stamp overlay */}
                <div className="absolute top-6 right-6 rotate-12 rounded-sm border-2 border-lime px-4 py-1.5 font-mono text-caption uppercase font-bold tracking-widest text-lime shadow-lg bg-ink/70 backdrop-blur-sm">
                  EVIDENCE VERIFIED
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BRAND MANIFESTO (DARK) */}
        <section
          data-scene="dark"
          className="relative px-6 py-28 my-8"
        >
          <div className="mx-auto max-w-content">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <p className="label-mono text-accent">Manifesto</p>
                <h2 className="mt-2 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-black uppercase leading-tight text-fg">
                  Mengapa <br />
                  <span className="font-serif italic text-accent">Kriminologi?</span>
                </h2>
                <p className="mt-6 font-body text-p2 text-fg-dim leading-relaxed">
                  Pasar dibanjiri pakaian tanpa makna. Kami memilih memposisikan toko ini tidak hanya sebagai bisnis pakaian, namun juga sebagai platform edukasi yang mendokumentasikan kejahatan, ketergantungan, dan keadilan sosial melalui humor yang jujur.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {PILLARS.map((p) => (
                  <div
                    key={p.tag}
                    className="flex flex-col justify-between rounded-xl border border-fg/15 bg-fg/5 p-6 transition-all duration-300 hover:border-accent"
                  >
                    <div>
                      <span className="label-mono text-accent">{p.tag}</span>
                      <h3 className="mt-3 font-display text-h4 font-bold text-fg">
                        {p.title}
                      </h3>
                      <p className="mt-3 font-body text-body2 text-fg-dim leading-snug">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TIMELINE SECTION (LIGHT) */}
        <section
          data-scene="light"
          className="relative px-6 py-24"
        >
          <div className="mx-auto max-w-content">
            <div className="mb-14">
              <p className="label-mono text-fg-dim">Record History</p>
              <h2 className="mt-2 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-black uppercase leading-tight text-fg">
                Chronology of <span className="font-serif italic text-accent">Events</span>
              </h2>
            </div>

            <div className="relative border-l-2 border-fg/20 pl-6 sm:pl-10 space-y-12 ml-2 sm:ml-4">
              {TIMELINE.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Bullet */}
                  <div className="absolute -left-[33px] sm:-left-[49px] top-1.5 h-4 w-4 rounded-full border-2 border-fg bg-bg group-hover:bg-accent transition-colors" />

                  <span className="font-mono text-caption uppercase text-accent font-bold bg-fg/10 px-2.5 py-1 rounded-sm">
                    {item.year}
                  </span>
                  <h3 className="mt-2 font-display text-h3 font-extrabold text-fg">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-2xl font-body text-p2 text-fg-dim leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA TO PRODUCTS (DARK) */}
        <section
          data-scene="dark"
          className="relative px-6 py-24"
        >
          <div className="mx-auto max-w-content text-center rounded-2xl border border-fg/15 bg-fg/5 p-12 shadow-2xl backdrop-blur-md">
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-black uppercase text-fg leading-none">
              Siap Memeriksa <span className="font-brush text-accent lowercase">Barang Bukti?</span>
            </h2>
            <p className="mt-4 font-body text-p1 text-fg-dim max-w-lg mx-auto">
              Lihat seluruh daftar kaos, hoodie, dan rilis terbatas kami di Evidence Locker.
            </p>
            <a
              href="/product"
              className="mt-8 inline-flex items-center gap-3 rounded-pill bg-lime px-8 py-4 font-display text-h4 font-bold text-ink transition-transform duration-micro hover:scale-105 shadow-xl"
            >
              Buka Evidence Locker →
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
