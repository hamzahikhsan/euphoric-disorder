import Link from "next/link";
import { createSupabaseAction } from "@/app/actions/admin/auth";

export const dynamic = "force-dynamic";

async function getStats() {
  const supabase = createSupabaseAction();

  const [productsRes, publishedRes, messagesRes, unreadRes] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "unread"),
  ]);

  return {
    totalProduk: productsRes.count ?? 0,
    produkLive: publishedRes.count ?? 0,
    totalPesan: messagesRes.count ?? 0,
    pesanBelumDibaca: unreadRes.count ?? 0,
  };
}

async function getRecentMessages() {
  const supabase = createSupabaseAction();
  const { data } = await supabase
    .from("contact_submissions")
    .select("id, name, contact, subject, message, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
}

async function getRecentActivity() {
  const supabase = createSupabaseAction();
  const { data } = await supabase
    .from("admin_activity_log")
    .select("id, action, entity_type, entity_id, created_at")
    .order("created_at", { ascending: false })
    .limit(8);
  return data ?? [];
}

export default async function AdminDashboardPage() {
  let stats = { totalProduk: 0, produkLive: 0, totalPesan: 0, pesanBelumDibaca: 0 };
  let recentMessages: Awaited<ReturnType<typeof getRecentMessages>> = [];
  let recentActivity: Awaited<ReturnType<typeof getRecentActivity>> = [];

  try {
    [stats, recentMessages, recentActivity] = await Promise.all([
      getStats(),
      getRecentMessages(),
      getRecentActivity(),
    ]);
  } catch {
    // Tabel mungkin belum dibuat — fallback ke default
  }

  const STAT_CARDS = [
    {
      code: "CAT-01",
      label: "TOTAL BUKTI PRODUK",
      value: stats.totalProduk,
      sub: "Katalog Terdaftar",
      accent: "text-lime",
      borderColor: "border-lime/30",
    },
    {
      code: "LIV-02",
      label: "SIARAN AKTIF (LIVE)",
      value: stats.produkLive,
      sub: "Tayang di Web Publik",
      accent: "text-emerald-400",
      borderColor: "border-emerald-500/30",
    },
    {
      code: "TRX-03",
      label: "TRANSMISI MASUK",
      value: stats.totalPesan,
      sub: "Total Pesan Kontak",
      accent: "text-sky-400",
      borderColor: "border-sky-500/30",
    },
    {
      code: "REQ-04",
      label: "PERLU DISPOSISI",
      value: stats.pesanBelumDibaca,
      sub: "Pesan Belum Dibaca",
      accent: "text-red-400",
      borderColor: stats.pesanBelumDibaca > 0 ? "border-red-500/60 bg-red-950/20" : "border-bone/10",
      pulse: stats.pesanBelumDibaca > 0,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-bone/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-lime inline-block" />
            <span className="text-[10px] font-mono text-lime uppercase tracking-[0.25em]">
              PUSAT KOMANDO // RINGKASAN INVESTIGASI
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-bone">
            Markas Besar euphoric.disorder
          </h1>
          <p className="text-bone-dim text-xs font-mono mt-1">
            Status operasional penuh. Seluruh data disinkronkan secara aman dengan Supabase DB.
          </p>
        </div>

        {/* Tactical Badge Info */}
        <div className="flex items-center gap-2 font-mono text-[10px] text-bone-dim bg-forest border border-bone/10 px-3 py-2">
          <span className="text-lime">HQ LOCATION:</span>
          <span>KEMAYORAN, JAKARTA PUSAT</span>
        </div>
      </div>

      {/* Telemetry Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => (
          <div
            key={card.code}
            className={`bg-forest border ${card.borderColor} p-5 relative overflow-hidden group hover:border-lime/50 transition-all duration-200`}
          >
            {/* Corner Crosshair */}
            <div className="absolute top-2 right-2 text-[10px] font-mono text-bone-dim/30 select-none">
              + {card.code}
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-bone-dim tracking-wider uppercase">
                {card.label}
              </span>
              {card.pulse && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
              )}
            </div>

            <div className={`text-4xl font-bold font-display ${card.accent} tracking-tight mb-1`}>
              {String(card.value).padStart(2, "0")}
            </div>

            <div className="text-[11px] font-mono text-bone-dim/70">
              {card.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Tactical Action Station */}
      <div className="p-4 bg-forest border border-bone/10 flex flex-wrap items-center justify-between gap-3">
        <div className="text-[11px] font-mono text-bone-dim flex items-center gap-2">
          <span className="text-lime">AKSI CEPAT:</span>
          <span>Tindakan cepat markas</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/produk/baru"
            className="px-4 py-2 bg-lime text-forest-deep text-xs font-bold
                       font-mono uppercase tracking-wider hover:bg-lime/90 active:scale-[0.98] transition-all
                       flex items-center gap-1.5 shadow-[0_2px_12px_rgba(205,255,0,0.15)]"
          >
            <span className="text-base leading-none font-normal">+</span>
            <span>Tambah Bukti Produk</span>
          </Link>

          <Link
            href="/admin/pesan"
            className="px-4 py-2 bg-forest-deep border border-bone/20 text-bone text-xs
                       font-mono uppercase tracking-wider hover:border-lime hover:text-lime transition-all
                       flex items-center gap-2"
          >
            <span>Kotak Transmisi</span>
            {stats.pesanBelumDibaca > 0 && (
              <span className="px-1.5 py-0.2 bg-red-500 text-white text-[10px] font-bold">
                {stats.pesanBelumDibaca} BARU
              </span>
            )}
          </Link>

          <Link
            href="/admin/media"
            className="px-4 py-2 bg-forest-deep border border-bone/20 text-bone text-xs
                       font-mono uppercase tracking-wider hover:border-lime hover:text-lime transition-all"
          >
            Vault Media
          </Link>

          <Link
            href="/admin/pengaturan"
            className="px-4 py-2 bg-forest-deep border border-bone/20 text-bone text-xs
                       font-mono uppercase tracking-wider hover:border-lime hover:text-lime transition-all"
          >
            Konfigurasi Markas
          </Link>
        </div>
      </div>

      {/* Two Column Grid: Recent Messages & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Recent Messages */}
        <div className="bg-forest border border-bone/10 flex flex-col">
          <div className="p-4 border-b border-bone/10 flex items-center justify-between bg-forest-deep/30">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <h2 className="text-sm font-bold font-display tracking-tight text-bone">
                Transmisi Masuk Terkini
              </h2>
            </div>
            <Link
              href="/admin/pesan"
              className="text-lime text-[11px] font-mono uppercase tracking-wider hover:underline flex items-center gap-1"
            >
              Lihat Semua Transmisi <span>→</span>
            </Link>
          </div>

          <div className="divide-y divide-bone/10 flex-1">
            {recentMessages.length === 0 ? (
              <div className="p-8 text-center text-bone-dim text-xs font-mono">
                Belum ada transmisi pesan masuk dari formulir kontak.
              </div>
            ) : (
              recentMessages.map((msg) => (
                <Link
                  key={msg.id}
                  href={`/admin/pesan/${msg.id}`}
                  className="block p-4 hover:bg-forest-deep/60 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-bone group-hover:text-lime transition-colors">
                        {msg.name}
                      </span>
                      {msg.status === "unread" ? (
                        <span className="px-1.5 py-0.5 bg-lime/10 border border-lime text-lime text-[9px] font-mono uppercase font-bold">
                          BARU
                        </span>
                      ) : (
                        <span className="text-bone-dim/50 text-[9px] font-mono">
                          DIBACA
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-bone-dim/60">
                      {new Date(msg.created_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        timeZone: "Asia/Jakarta",
                      })}
                    </span>
                  </div>

                  <p className="text-bone-dim text-xs font-mono line-clamp-1">
                    {msg.subject ? `[${msg.subject}] ` : ""}
                    {msg.message}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Activity Audit Feed */}
        <div className="bg-forest border border-bone/10 flex flex-col">
          <div className="p-4 border-b border-bone/10 flex items-center justify-between bg-forest-deep/30">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" />
              <h2 className="text-sm font-bold font-display tracking-tight text-bone">
                Log Audit Investigasi
              </h2>
            </div>
            <Link
              href="/admin/aktivitas"
              className="text-lime text-[11px] font-mono uppercase tracking-wider hover:underline flex items-center gap-1"
            >
              Lihat Log Lengkap <span>→</span>
            </Link>
          </div>

          <div className="divide-y divide-bone/10 flex-1">
            {recentActivity.length === 0 ? (
              <div className="p-8 text-center text-bone-dim text-xs font-mono">
                Belum ada rekaman aktivitas administrasi.
              </div>
            ) : (
              recentActivity.map((act) => {
                const isInsert = act.action.toLowerCase().includes("tambah") || act.action.toLowerCase().includes("create");
                const isDelete = act.action.toLowerCase().includes("hapus") || act.action.toLowerCase().includes("delete");
                const badgeColor = isInsert
                  ? "text-lime border-lime/30 bg-lime/10"
                  : isDelete
                  ? "text-red-400 border-red-500/30 bg-red-950/20"
                  : "text-sky-300 border-sky-500/30 bg-sky-950/20";

                return (
                  <div key={act.id} className="p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`px-2 py-0.5 border text-[9px] font-mono uppercase font-bold flex-shrink-0 ${badgeColor}`}>
                        {act.action}
                      </span>
                      <div className="min-w-0">
                        <p className="text-bone text-xs font-mono truncate">
                          {act.entity_type}: <span className="text-lime">{act.entity_id}</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-bone-dim/60 flex-shrink-0">
                      {new Date(act.created_at).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "Asia/Jakarta",
                      })}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
