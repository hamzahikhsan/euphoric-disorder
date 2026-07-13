/**
 * Scene 4 — Statement band. Satu baris manifesto besar, full-bleed, tenang
 * (parallax halus ditambah di lapisan gerak). Aksen cobalt pada 1 frasa.
 */
export function StatementBand() {
  return (
    <section
      aria-label="Statement"
      className="border-t border-line bg-bg-sunken"
    >
      <div className="mx-auto max-w-content px-6 py-24 md:px-8 md:py-40">
        <p className="font-mono text-label uppercase tracking-label text-text-tertiary">
          Filed under: Human Nature
        </p>
        <p
          className="mt-6 font-display font-bold uppercase leading-[0.95] tracking-display"
          style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
        >
          Kejahatan sebagai bahan kajian.{" "}
          <span className="text-accent">Kaos</span> sebagai medium.
        </p>
      </div>
    </section>
  );
}
