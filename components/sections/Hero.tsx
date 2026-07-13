import Image from "next/image";

/**
 * Scene 1 — Hero (surface terang). Komposisi Figma: wordmark EUPHORIC/DISORDER
 * mengapit kaos, "creativity of fashion" (serif+sans), @CRIME·@COMEDY·@CREATIVITY.
 * Subteks forensik (Space Mono) menghidupkan brand voice kriminologi.
 * BG transparan → animation pattern global tembus di belakang.
 */
export default function Hero() {
  return (
    <section
      id="top"
      data-scene="light"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      <div className="relative mx-auto w-full max-w-content px-6 pt-24">
        {/* label berkas kiri-atas */}
        <p className="label-mono absolute left-6 top-20 text-fg-dim">
          Case File — Est. 2023 / Index 001
        </p>

        {/* Wordmark + kaos */}
        <div className="relative">
          <h1 className="font-display text-display font-black uppercase leading-[0.82] tracking-tight text-fg">
            <span className="block">Euphoric</span>
            <span className="block pl-[26%]">Disorder</span>
          </h1>

          {/* Kaos center-overlap */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[36%] min-w-[280px] -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/img/shirt-gray.png"
              alt="Kaos oversized euphoric.disorder"
              width={701}
              height={648}
              priority
              className="h-auto w-full drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Baris bawah: tagline (serif+sans) + handles (serif+sans) */}
        <div className="mt-12 flex items-end justify-between">
          <p className="leading-[0.95] text-fg">
            <span className="block font-serif text-h1 italic">Creativity</span>
            <span className="block font-display text-h2 font-extrabold uppercase tracking-tight">
              of Fashion
            </span>
          </p>

          <ul className="text-right leading-[0.95] text-fg">
            <li className="font-serif text-h2 italic">@Crime</li>
            <li className="font-display text-h2 font-extrabold uppercase tracking-tight">
              @Comedy
            </li>
            <li className="font-display text-h2 font-extrabold uppercase tracking-tight">
              @Creativity
            </li>
          </ul>
        </div>
      </div>

      {/* hint scroll */}
      <div className="label-mono absolute bottom-6 left-1/2 -translate-x-1/2 text-fg-dim">
        Scroll ↓
      </div>
    </section>
  );
}
