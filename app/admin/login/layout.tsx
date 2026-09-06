import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Akses Markas Besar — euphoric.disorder",
  robots: { index: false, follow: false },
};

/**
 * Layout khusus admin login — mandiri tanpa sidebar/topbar.
 * Enforces data-surface="dark" dengan background forest-deep.
 */
export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-surface="dark" className="min-h-screen bg-forest-deep text-bone font-body selection:bg-lime selection:text-forest-deep">
      {children}
    </div>
  );
}
