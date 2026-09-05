"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "@/app/actions/admin/auth";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Beranda", href: "/admin", icon: "📊" },
  { label: "Produk", href: "/admin/produk", icon: "📋" },
  { label: "Pesan", href: "/admin/pesan", icon: "📨" },
  { label: "FAQ", href: "/admin/faq", icon: "❓" },
  { label: "Pengaturan", href: "/admin/pengaturan", icon: "⚙️" },
  { label: "Media", href: "/admin/media", icon: "🖼️" },
  { label: "Aktivitas", href: "/admin/aktivitas", icon: "📝" },
];

export default function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#1A1B1E] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-[#25262B] border-r border-[#373A40]
          flex flex-col
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="p-5 border-b border-[#373A40]">
          <Link href="/admin" className="block">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 border-2 border-[#CDFF00] flex items-center justify-center flex-shrink-0">
                <span className="text-[#CDFF00] font-bold text-sm font-[family-name:var(--font-nohemi)]">
                  ED
                </span>
              </div>
              <div>
                <div className="text-[#F1F3F5] text-sm font-bold font-[family-name:var(--font-nohemi)] leading-tight">
                  euphoric.disorder
                </div>
                <div className="text-[#909296] text-[9px] font-[family-name:var(--font-space-mono)] uppercase tracking-[0.15em]">
                  Markas Besar
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-150
                font-[family-name:var(--font-space-mono)]
                ${
                  isActive(item.href)
                    ? "bg-[#CDFF00]/10 text-[#CDFF00] border-l-2 border-[#CDFF00]"
                    : "text-[#909296] hover:text-[#F1F3F5] hover:bg-[#2C2E33] border-l-2 border-transparent"
                }
              `}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#373A40]">
          <div className="text-[#555] text-[9px] font-[family-name:var(--font-space-mono)] uppercase tracking-wider">
            Admin v1.0 · Supabase ✅
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-14 bg-[#25262B] border-b border-[#373A40] flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-[#909296] hover:text-[#F1F3F5] transition-colors p-1"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Breadcrumb / page title placeholder */}
          <div className="hidden lg:block" />

          {/* User info & logout */}
          <div className="flex items-center gap-4">
            <span className="text-[#909296] text-xs font-[family-name:var(--font-space-mono)] hidden sm:block">
              {userEmail}
            </span>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="px-3 py-1.5 text-xs border border-[#373A40] text-[#909296] hover:text-[#FF6B6B] hover:border-[#FF6B6B]/50
                           font-[family-name:var(--font-space-mono)] uppercase tracking-wider transition-all duration-150"
              >
                Keluar
              </button>
            </form>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
