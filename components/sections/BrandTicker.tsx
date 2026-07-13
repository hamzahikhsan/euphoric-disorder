/**
 * Marquee wordmark brand kolaborator (loop, tak terpengaruh scroll) — meniru
 * gaya ticker logo di Figma (node 19044:228).
 *
 * ⚠️ Nama brand = placeholder dari template Figma (Google/Uber/Hilton/TUMI/…);
 * ini BUKAN partner resmi euphoric.disorder. Ganti `BRANDS` dengan kolaborator
 * asli (mis. CODM LABS) saat sudah ada. Wordmark dirender sebagai teks bergaya
 * (bukan logo trademark).
 */
const BRANDS = [
  "CODM LABS",
  "Quadrant",
  "TUMI",
  "Hilton",
  "Uber",
  "Lavart",
  "Bell",
  "Pure Electric",
  "Google",
];

export default function BrandTicker({
  reverse = false,
  className = "",
}: {
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex select-none overflow-hidden ${className}`}>
      <div className={`ed-marquee ${reverse ? "ed-marquee-rev" : ""}`}>
        {[0, 1].map((grp) => (
          <div
            key={grp}
            className="flex shrink-0 items-center"
            aria-hidden={grp === 1}
          >
            {BRANDS.map((b, i) => (
              <span
                key={i}
                className="whitespace-nowrap px-10 font-display text-h4 font-bold uppercase tracking-wide"
              >
                {b}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
