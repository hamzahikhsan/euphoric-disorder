"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "@/app/actions/admin/auth";
import { useState, useEffect } from "react";

interface NavItem {
  label: string;
  href: string;
  code: string;
  icon: (active: boolean) => React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Beranda",
    href: "/admin",
    code: "HUD-01",
    icon: (active) => (
      <svg className={`w-4 h-4 ${active ? "text-lime" : "text-bone-dim"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    label: "Bukti Produk",
    href: "/admin/produk",
    code: "CAT-02",
    icon: (active) => (
      <svg className={`w-4 h-4 ${active ? "text-lime" : "text-bone-dim"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
      </svg>
    ),
  },
  {
    label: "Transmisi Pesan",
    href: "/admin/pesan",
    code: "MSG-03",
    icon: (active) => (
      <svg className={`w-4 h-4 ${active ? "text-lime" : "text-bone-dim"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <path d="M8 9h8" strokeLinecap="round" />
        <path d="M8 13h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Intel FAQ",
    href: "/admin/faq",
    code: "FAQ-04",
    icon: (active) => (
      <svg className={`w-4 h-4 ${active ? "text-lime" : "text-bone-dim"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" strokeLinecap="round" />
        <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    label: "Konfigurasi Markas",
    href: "/admin/pengaturan",
    code: "CFG-05",
    icon: (active) => (
      <svg className={`w-4 h-4 ${active ? "text-lime" : "text-bone-dim"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
  {
    label: "Arsip Media",
    href: "/admin/media",
    code: "MED-06",
    icon: (active) => (
      <svg className={`w-4 h-4 ${active ? "text-lime" : "text-bone-dim"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    label: "Log Investigasi",
    href: "/admin/aktivitas",
    code: "LOG-07",
    icon: (active) => (
      <svg className={`w-4 h-4 ${active ? "text-lime" : "text-bone-dim"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
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
  const [wibTime, setWibTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format WIB (UTC+7)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setWibTime(new Intl.DateTimeFormat("id-ID", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div
      data-surface="dark"
      className="min-h-screen bg-forest-deep text-bone flex flex-col lg:flex-row font-body selection:bg-lime selection:text-forest-deep"
    >
      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-forest-deep/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Forensic Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-forest border-r border-bone/10
          flex flex-col justify-between
          transform transition-transform duration-200 ease-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Top: Branding & Title */}
        <div>
          <div className="p-5 border-b border-bone/10 relative overflow-hidden">
            {/* Tactical Crosshair watermark */}
            <div className="absolute top-2 right-2 text-lime/20 font-mono text-[9px] select-none">
              + 6°09&apos;25&quot;S 106°50&apos;44&quot;E
            </div>

            <Link href="/admin" className="block group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-lime bg-forest-deep flex items-center justify-center flex-shrink-0 relative group-hover:border-lime transition-colors">
                  <span className="text-lime font-display font-bold text-base tracking-tighter">
                    ED
                  </span>
                  <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-lime" />
                </div>
                <div>
                  <div className="text-bone text-sm font-bold font-display tracking-tight leading-tight group-hover:text-lime transition-colors">
                    euphoric.disorder
                  </div>
                  <div className="text-lime text-[9px] font-mono uppercase tracking-[0.2em] flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse inline-block" />
                    MARKAS BESAR // HQ
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.2em] text-bone-dim/60">
              ARSIP & KONTROL // NAV
            </div>
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center justify-between px-3 py-2 text-xs transition-all duration-150
                    font-mono border-l-2
                    ${
                      active
                        ? "bg-lime/10 text-lime border-lime font-bold shadow-[inset_0_0_12px_rgba(205,255,0,0.05)]"
                        : "text-bone-dim hover:text-bone hover:bg-forest-deep/60 border-transparent"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    {item.icon(active)}
                    <span>{item.label}</span>
                  </div>
                  <span
                    className={`text-[9px] ${
                      active ? "text-lime/70" : "text-bone-dim/40"
                    }`}
                  >
                    {item.code}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Telemetry, Site Shortcut & Version */}
        <div className="p-4 border-t border-bone/10 space-y-3 bg-forest-deep/40">
          {/* Quick External Link to Public Store */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 bg-forest border border-bone/15 hover:border-lime/50 text-bone hover:text-lime text-xs font-mono transition-all duration-150 group"
          >
            <span className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-lime" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              Lihat Web Publik
            </span>
            <span className="text-bone-dim group-hover:text-lime text-xs">↗</span>
          </a>

          {/* Telemetry Status */}
          <div className="flex items-center justify-between text-[10px] font-mono text-bone-dim/70 pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shadow-[0_0_8px_#34d399]" />
              SUPABASE v2 · CONNECTED
            </span>
            <span className="text-lime font-mono">v1.2</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Tactical HUD Topbar */}
        <header className="h-14 bg-forest/90 backdrop-blur-md border-b border-bone/10 flex items-center justify-between px-4 sm:px-6 flex-shrink-0 sticky top-0 z-30">
          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-bone-dim hover:text-lime transition-colors p-1 border border-bone/10"
              aria-label="Toggle Menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Tactical Live Clock & Coordinates */}
            <div className="hidden sm:flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-bone-dim">
                <span className="text-lime">WIB</span>
                <span className="text-bone font-bold tracking-wider">{wibTime || "00:00:00"}</span>
              </span>
              <span className="text-bone-dim/40">•</span>
              <span className="text-bone-dim text-[11px] uppercase tracking-wider hidden md:inline">
                SECTOR: KMY-JKT // DOSSIER ACTIVE
              </span>
            </div>
          </div>

          {/* User Profile & Logout Action */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-bone text-xs font-mono font-bold tracking-tight">
                {userEmail}
              </div>
              <div className="text-lime text-[9px] font-mono tracking-wider">
                [AUTORITAS: OWNER]
              </div>
            </div>

            <form action={logoutAdmin}>
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-mono border border-bone/20 text-bone hover:text-red-400 hover:border-red-400/50 hover:bg-red-400/10 uppercase tracking-wider transition-all duration-150 flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Keluar</span>
              </button>
            </form>
          </div>
        </header>

        {/* Page Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
