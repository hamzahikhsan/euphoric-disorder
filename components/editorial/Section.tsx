import type { ReactNode } from "react";

/**
 * Shell section editorial: hairline atas + "running header" arsip
 * (index bernomor beraksen cobalt + label + kop kanan). Dipakai ulang
 * di seluruh scene agar densitas & bahasa arsip konsisten (anti-flat).
 */
export function Section({
  id,
  index,
  label,
  kicker = "euphoric.disorder",
  children,
  className = "",
}: {
  id?: string;
  index: string;
  label: string;
  kicker?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative border-t border-line ${className}`}>
      <div className="mx-auto max-w-content px-6 md:px-8">
        <div className="flex items-center justify-between py-4">
          <span className="label-mono">
            <span className="text-accent">{index}</span> — {label}
          </span>
          <span className="label-mono hidden md:inline">{kicker}</span>
        </div>
        {children}
      </div>
    </section>
  );
}
