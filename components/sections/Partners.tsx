import BrandTicker from "./BrandTicker";

/**
 * Scene 6 — PARTNERS / COLLABORATION (surface: light).
 * Storyboard + referensi Figma (19044:228): brand kolaborator berjalan sebagai
 * TICKER wordmark (marquee loop, tidak terpengaruh scroll). Dua baris arah
 * berlawanan. Lihat catatan placeholder di BrandTicker.
 */
export default function Partners() {
  return (
    <section
      data-scene="light"
      className="relative overflow-hidden py-28"
      aria-label="Partners"
    >
      <div className="mx-auto mb-12 max-w-content px-6">
        <p className="label-mono text-fg-dim">Partners — collaboration</p>
        <p className="mt-3 max-w-lg font-body text-p1 leading-snug text-fg">
          Rilis bareng, proyek khusus, dan kerja lapangan — dikerjakan bersama
          kolaborator terpilih.
        </p>
      </div>

      {/* ticker brand (dua baris, arah berlawanan) */}
      <div className="flex flex-col gap-4 border-y border-fg/10 py-8 text-fg">
        <BrandTicker />
        <BrandTicker reverse className="text-fg-dim" />
      </div>
    </section>
  );
}
