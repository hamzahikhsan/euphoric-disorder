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
    .limit(10);
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
    // Tabel mungkin belum dibuat — tampilkan dashboard kosong
  }

  const STAT_CARDS = [
    { label: "Total Produk", value: stats.totalProduk, icon: "📋", color: "#CDFF00" },
    { label: "Produk Live", value: stats.produkLive, icon: "🟢", color: "#51CF66" },
    { label: "Total Pesan", value: stats.totalPesan, icon: "📨", color: "#74C0FC" },
    { label: "Belum Dibaca", value: stats.pesanBelumDibaca, icon: "🔴", color: "#FF6B6B" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[#F1F3F5] text-2xl font-bold font-[family-name:var(--font-nohemi)]">
          Beranda
        </h1>
        <p className="text-[#909296] text-sm font-[family-name:var(--font-space-mono)] mt-1">
          Selamat datang di Markas Besar euphoric.disorder.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STAT_CARDS.map((card) => (
          <div key={card.label} className="bg-[#25262B] border border-[#373A40] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg">{card.icon}</span>
              <span
                className="text-2xl font-bold font-[family-name:var(--font-nohemi)]"
                style={{ color: card.color }}
              >
                {card.value}
              </span>
            </div>
            <p className="text-[#909296] text-[10px] font-[family-name:var(--font-space-mono)] uppercase tracking-wider">
              {card.label}
            </p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-2">
        <Link
          href="/admin/produk/baru"
          className="px-4 py-2 bg-[#CDFF00] text-[#1A1B1E] text-xs font-bold
                     font-[family-name:var(--font-space-mono)] uppercase tracking-wider
                     hover:bg-[#b8e600] transition-colors"
        >
          ➕ Tambah Produk
        </Link>
        <Link
          href="/admin/pesan"
          className="px-4 py-2 border border-[#373A40] text-[#F1F3F5] text-xs
                     font-[family-name:var(--font-space-mono)] uppercase tracking-wider
                     hover:border-[#CDFF00] hover:text-[#CDFF00] transition-colors"
        >
          📨 Buka Kotak Masuk
          {stats.pesanBelumDibaca > 0 && (
            <span className="ml-2 px-1.5 py-0.5 bg-[#FF6B6B] text-white text-[9px] font-bold">
              {stats.pesanBelumDibaca}
            </span>
          )}
        </Link>
        <Link
          href="/admin/pengaturan"
          className="px-4 py-2 border border-[#373A40] text-[#F1F3F5] text-xs
                     font-[family-name:var(--font-space-mono)] uppercase tracking-wider
                     hover:border-[#CDFF00] hover:text-[#CDFF00] transition-colors"
        >
          ⚙️ Pengaturan
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Recent messages */}
        <div className="bg-[#25262B] border border-[#373A40]">
          <div className="p-4 border-b border-[#373A40] flex items-center justify-between">
            <h2 className="text-[#F1F3F5] text-sm font-bold font-[family-name:var(--font-nohemi)]">
              Pesan Terbaru
            </h2>
            <Link
              href="/admin/pesan"
              className="text-[#CDFF00] text-[10px] font-[family-name:var(--font-space-mono)] uppercase tracking-wider hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="divide-y divide-[#373A40]">
            {recentMessages.length === 0 ? (
              <div className="p-4 text-center text-[#555] text-sm font-[family-name:var(--font-space-mono)]">
                Belum ada pesan masuk.
                <br />
                <span className="text-[10px]">Jalankan migrasi SQL terlebih dahulu.</span>
              </div>
            ) : (
              recentMessages.map((msg) => (
                <Link
                  key={msg.id}
                  href={`/admin/pesan/${msg.id}`}
                  className="block p-3 hover:bg-[#2C2E33] transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-[family-name:var(--font-space-mono)] font-bold ${msg.status === "unread" ? "text-[#F1F3F5]" : "text-[#909296]"}`}>
                      {msg.name}
                    </span>
                    {msg.status === "unread" && (
                      <span className="w-2 h-2 bg-[#CDFF00] rounded-full flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-[#909296] text-[11px] font-[family-name:var(--font-space-mono)] truncate">
                    {msg.message}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-[#25262B] border border-[#373A40]">
          <div className="p-4 border-b border-[#373A40] flex items-center justify-between">
            <h2 className="text-[#F1F3F5] text-sm font-bold font-[family-name:var(--font-nohemi)]">
              Aktivitas Terkini
            </h2>
            <Link
              href="/admin/aktivitas"
              className="text-[#CDFF00] text-[10px] font-[family-name:var(--font-space-mono)] uppercase tracking-wider hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="divide-y divide-[#373A40]">
            {recentActivity.length === 0 ? (
              <div className="p-4 text-center text-[#555] text-sm font-[family-name:var(--font-space-mono)]">
                Belum ada aktivitas tercatat.
              </div>
            ) : (
              recentActivity.map((act) => (
                <div key={act.id} className="p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#555] font-[family-name:var(--font-space-mono)]">
                      {new Date(act.created_at).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}
                    </span>
                  </div>
                  <p className="text-[#909296] text-xs font-[family-name:var(--font-space-mono)] mt-0.5">
                    {act.action} → <span className="text-[#F1F3F5]">{act.entity_id}</span>
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
