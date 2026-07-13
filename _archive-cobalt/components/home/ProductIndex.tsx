import { Section } from "@/components/editorial/Section";
import { IndexCard } from "@/components/product/IndexCard";
import { products } from "@/content/products";

/**
 * Scene 3 — Product Index. Strip horizontal editorial (scroll + snap) yang
 * jadi jalur "scroll horizontal" saat lapisan gerak ditambah. Sekarang statis
 * tapi sudah bisa di-scroll/swipe.
 */
export function ProductIndex() {
  return (
    <Section index="03" label="Index — Berkas Terbuka">
      <div className="flex flex-col gap-2 pt-10 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display text-display-l font-semibold leading-snug tracking-display">
          Index
        </h2>
        <p className="max-w-[46ch] font-body text-body text-text-secondary">
          Enam berkas. Sebagian edisi terbatas dan tidak dicetak ulang — begitu
          ditutup, kasusnya selesai.
        </p>
      </div>

      {/* Strip horizontal (snap). -mx untuk bleed tepi container. */}
      <div className="-mx-6 mt-10 overflow-x-auto pb-16 md:-mx-8 md:mt-12 md:pb-24">
        <ul className="flex snap-x snap-mandatory gap-4 px-6 md:gap-6 md:px-8">
          {products.map((p) => (
            <li
              key={p.slug}
              className="w-[72vw] shrink-0 snap-start sm:w-[52vw] md:w-[320px]"
            >
              <IndexCard product={p} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
