"use client";

/**
 * Pattern topografi (kontur) untuk latar section. Warna garis membaca
 * var(--pattern) → otomatis gelap saat surface terang & terang saat gelap
 * (storyboard: pattern berlawanan kontras dgn bg).
 *
 * CATATAN: ini versi prosedural/placeholder. Aset kontur final bisa di-export
 * dari Figma dan menggantikan SVG ini tanpa mengubah pemakaian.
 */
export default function TopoPattern({ className = "" }: { className?: string }) {
  // beberapa garis kontur bergelombang, di-offset vertikal
  const lines = Array.from({ length: 14 }, (_, i) => i);
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g stroke="var(--pattern)" strokeWidth="1.5">
          {lines.map((i) => {
            const y = 40 + i * 62;
            const amp = 26 + (i % 4) * 8;
            const d = `M -100 ${y} C 260 ${y - amp}, 520 ${y + amp}, 820 ${y} S 1360 ${y - amp}, 1640 ${y}`;
            return <path key={i} d={d} />;
          })}
        </g>
      </svg>
    </div>
  );
}
