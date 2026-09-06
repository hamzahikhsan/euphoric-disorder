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
      <div className="pb-4 border-b border-bone/10">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-1.5 h-1.5 bg-lime inline-block" />
          <span className="text-[10px] font-mono text-lime uppercase tracking-[0.25em]">
            AUDIT TELEMETRI // FORENSIC LOG
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-bone">
          Log Investigasi & Aktivitas Admin
        </h1>
        <p className="text-bone-dim text-xs font-mono mt-1">
          Rekam jejak forensik seluruh operasi pembuatan, pengubahan, dan penghapusan data secara transparan.
        </p>
      </div>

      <ActivityLogViewer logs={logs} />
    </div>
  );
}
