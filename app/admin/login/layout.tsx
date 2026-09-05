import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel Admin — euphoric.disorder",
  robots: { index: false, follow: false },
};

/**
 * Layout khusus admin login — tanpa sidebar/topbar.
 * Menggunakan layout terpisah dari shell admin utama.
 */
export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
