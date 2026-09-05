"use client";

import { useState } from "react";
import type { Database } from "@/lib/supabase/types";

type ActivityRow = Database["public"]["Tables"]["admin_activity_log"]["Row"];

interface ActivityLogViewerProps {
  logs: ActivityRow[];
}

export default function ActivityLogViewer({ logs }: ActivityLogViewerProps) {
  const [filterType, setFilterType] = useState("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = logs.filter((l) => {
    if (filterType === "ALL") return true;
    return l.entity_type === filterType;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-[#25262B] border border-[#373A40] p-4 flex items-center justify-between gap-4">
        <span className="text-xs text-[#909296] font-[family-name:var(--font-space-mono)]">
          Total Log Aktivitas: {logs.length} entri
        </span>

        <div className="flex items-center gap-2">
          <label className="text-xs text-[#909296] font-[family-name:var(--font-space-mono)]">
            Tipe Entitas:
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1.5 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
          >
            <option value="ALL">Semua Entitas</option>
            <option value="product">Produk</option>
            <option value="faq">FAQ</option>
            <option value="site_config">Pengaturan</option>
            <option value="message">Pesan</option>
          </select>
        </div>
      </div>

      {/* Log list */}
      <div className="bg-[#25262B] border border-[#373A40] divide-y divide-[#373A40]">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-[#555] text-xs font-[family-name:var(--font-space-mono)]">
            Belum ada catatan aktivitas yang cocok dengan filter.
          </div>
        ) : (
          filtered.map((log) => {
            const isExpanded = expandedId === log.id;
            return (
              <div key={log.id} className="p-4 hover:bg-[#2C2E33]/50 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-[#CDFF00]/15 text-[#CDFF00] border border-[#CDFF00]/30 text-[10px] font-bold uppercase font-[family-name:var(--font-space-mono)]">
                      {log.action}
                    </span>

                    <span className="text-xs font-bold text-[#F1F3F5] font-[family-name:var(--font-space-mono)]">
                      {log.entity_id || "(Tidak ada ID)"}
                    </span>

                    <span className="text-[10px] text-[#909296] font-[family-name:var(--font-space-mono)]">
                      [{log.entity_type}]
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-[#909296] font-[family-name:var(--font-space-mono)]">
                      {new Date(log.created_at).toLocaleString("id-ID", {
                        timeZone: "Asia/Jakarta",
                      })}
                    </span>

                    {log.changes && Object.keys(log.changes).length > 0 && (
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : log.id)}
                        className="text-[10px] text-[#CDFF00] hover:underline font-[family-name:var(--font-space-mono)] uppercase"
                      >
                        {isExpanded ? "Tutup Diff ▲" : "Lihat Diff ▼"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Diff view */}
                {isExpanded && log.changes && (
                  <div className="mt-3 p-3 bg-[#1A1B1E] border border-[#373A40] text-xs font-[family-name:var(--font-space-mono)] space-y-1">
                    <div className="text-[10px] text-[#909296] uppercase mb-1">
                      Perubahan Nilai:
                    </div>
                    {Object.entries(log.changes).map(([field, diff]) => (
                      <div key={field} className="grid grid-cols-3 gap-2 py-0.5 border-b border-[#373A40]/50">
                        <span className="text-[#CDFF00] font-bold">{field}</span>
                        <span className="text-[#FF6B6B] line-through">
                          {String(diff.lama ?? "null")}
                        </span>
                        <span className="text-[#51CF66]">
                          → {String(diff.baru ?? "null")}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
