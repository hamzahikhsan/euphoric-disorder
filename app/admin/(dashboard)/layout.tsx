import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/actions/admin/auth";
import AdminShell from "@/components/admin/AdminShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Panel Admin — euphoric.disorder",
    template: "%s — Admin euphoric.disorder",
  },
  robots: { index: false, follow: false },
};

/**
 * Layout admin utama — membungkus semua halaman /admin/* (kecuali /admin/login).
 * Mengecek sesi dan menampilkan shell (sidebar + topbar).
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // Double-check: jika entah bagaimana middleware terlewat
  if (!user) {
    redirect("/admin/login");
  }

  return <AdminShell userEmail={user.email || "Admin"}>{children}</AdminShell>;
}
