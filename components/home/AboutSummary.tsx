import Image from "next/image";
import { Section } from "@/components/editorial/Section";

/**
 * Scene 2 — About summary (tenang, editorial).
 * Desktop: gambar kaos di kiri (nanti "geser kiri" saat scroll), teks + CTA
 * di kanan. Nada deadpan-kurator.
 */
export function AboutSummary() {
  return (
    <Section index="02" label="About — Catatan Kurator">
      <div className="grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-12 md:gap-12 md:py-24">
        {/* Gambar */}
        <div className="order-2 md:order-1 md:col-span-5">
          <div className="relative aspect-[4/5] w-full border border-line bg-bg-raised">
            <Image
              src="/img/products/candy-hoodie.png"
              alt="Candy Hoodie ED — euphoric.disorder"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-contain p-6"
            />
          </div>
          <p className="mt-3 font-mono text-label uppercase tracking-label text-text-tertiary">
            Exhibit — Candy Hoodie · ⚠️[kota], ⚠️[tahun]
          </p>
        </div>

        {/* Teks */}
        <div className="order-1 md:order-2 md:col-span-6 md:col-start-7">
          <h2 className="font-display text-display-l font-semibold leading-snug tracking-display">
            Bukan sekadar label.{" "}
            <span className="text-text-secondary">Sebuah arsip kecil.</span>
          </h2>
          <p className="mt-6 max-w-[52ch] font-body text-body-l text-text-secondary">
            euphoric.disorder memperlakukan diri sebagai tempat berbagai bentuk
            kekacauan manusia dikumpulkan, diberi nomor, lalu dicetak ke atas
            katun. Nama kami adalah lelucon yang serius:{" "}
            <span className="text-text-primary">euphoria</span>, rasa senang yang
            berlebihan, dan <span className="text-text-primary">disorder</span>,
            gangguan.
          </p>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 border-b border-accent pb-1 font-mono text-label uppercase tracking-label text-accent transition-colors duration-micro hover:text-accent-hover"
          >
            Baca catatan lengkap <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </Section>
  );
}
