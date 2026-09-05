import { createSupabaseAction } from "@/app/actions/admin/auth";
import ActivityLogViewer from "@/components/admin/ActivityLogViewer";
import type { Database } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

type ActivityRow = Database["public"]["Tables"]["admin_activity_log"]["Row"];

export default async function AktivitasPage() {
  let logs: ActivityRow[] = [];

  try {
    const supabase = createSupabaseAction();
    const { data } = await supabase
      .from("admin_activity_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (data) {
      logs = data;
    }
  } catch {
    // Tabel belum siap
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[#F1F3F5] text-2xl font-bold font-[family-name:var(--font-nohemi)]">
          Log Aktivitas Admin
        </h1>
        <p className="text-[#909296] text-sm font-[family-name:var(--font-space-mono)] mt-1">
          Rekam jejak forensik seluruh operasi pembuatan, pengubahan, dan penghapusan data.
        </p>
      </div>

      <ActivityLogViewer logs={logs} />
    </div>
  );
}
