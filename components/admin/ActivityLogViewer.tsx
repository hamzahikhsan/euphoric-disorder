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
    <div className="space-y-6">
      {/* Header Info & Filters */}
      <div className="bg-forest border border-bone/10 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 bg-lime" />
            <span className="text-[10px] font-mono text-lime uppercase tracking-widest">
              LOG AUDIT INVESTIGASI // RECORD
            </span>
          </div>
          <span className="text-xs text-bone-dim font-mono">
            Total Entri Aktivitas Terekam: <span className="text-bone font-bold">{logs.length}</span> kejadian
          </span>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-bone-dim font-mono uppercase tracking-wider">
            Filter Entitas:
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1.5 bg-forest-deep border border-bone/20 text-bone text-xs font-mono focus:border-lime focus:outline-none"
          >
            <option value="ALL">Semua Entitas</option>
            <option value="product">Produk</option>
            <option value="faq">FAQ</option>
            <option value="site_config">Pengaturan</option>
            <option value="message">Pesan Transmisi</option>
          </select>
        </div>
      </div>

      {/* Log Feed List */}
      <div className="bg-forest border border-bone/10 divide-y divide-bone/10">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-bone-dim text-xs font-mono">
            Tidak ada rekaman investigasi yang sesuai dengan kriteria filter.
          </div>
        ) : (
          filtered.map((log) => {
            const isExpanded = expandedId === log.id;
            const isInsert = log.action.toLowerCase().includes("tambah") || log.action.toLowerCase().includes("create");
            const isDelete = log.action.toLowerCase().includes("hapus") || log.action.toLowerCase().includes("delete");
            const badgeColor = isInsert
              ? "text-lime border-lime/30 bg-lime/10"
              : isDelete
              ? "text-red-400 border-red-500/30 bg-red-950/20"
              : "text-sky-300 border-sky-500/30 bg-sky-950/20";

            return (
              <div key={log.id} className="p-4 sm:p-5 hover:bg-forest-deep/60 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`px-2.5 py-0.5 border text-[10px] font-bold uppercase font-mono ${badgeColor}`}>
                      {log.action}
                    </span>

                    <span className="text-xs font-bold text-bone font-mono">
                      {log.entity_id || "(TANPA ID)"}
                    </span>

                    <span className="text-[10px] text-bone-dim/70 font-mono bg-forest-deep px-2 py-0.5 border border-bone/10 uppercase">
                      TYPE: {log.entity_type}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-[11px] text-bone-dim font-mono">
                      {new Date(log.created_at).toLocaleString("id-ID", {
                        timeZone: "Asia/Jakarta",
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>

                    {log.changes && Object.keys(log.changes).length > 0 && (
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : log.id)}
                        className="text-[10px] text-lime hover:underline font-mono uppercase tracking-wider flex items-center gap-1"
                      >
                        {isExpanded ? "Tutup Diff ▲" : "Lihat Diff ▼"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Diff View Box */}
                {isExpanded && log.changes && (
                  <div className="mt-4 p-4 bg-forest-deep border border-bone/15 text-xs font-mono space-y-2">
                    <div className="text-[10px] text-bone-dim uppercase tracking-wider mb-2 flex items-center gap-1.5 text-lime">
                      <span className="w-1.5 h-1.5 bg-lime" />
                      Inspeksi Rekaman Perubahan (Diff Telemetry):
                    </div>
                    {Object.entries(log.changes).map(([field, diff]) => (
                      <div key={field} className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1 border-b border-bone/10">
                        <span className="text-lime font-bold">{field}</span>
                        <span className="text-red-400/80 truncate">
                          Lama: {JSON.stringify((diff as { old?: unknown })?.old ?? "-")}
                        </span>
                        <span className="text-emerald-400 truncate">
                          Baru: {JSON.stringify((diff as { new?: unknown })?.new ?? "-")}
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
