"use client";

import { useState } from "react";
import Link from "next/link";
import { updateMessageStatus, deleteMessage } from "@/app/actions/admin/messages";
import type { Database } from "@/lib/supabase/types";

type MessageRow = Database["public"]["Tables"]["contact_submissions"]["Row"];

interface MessageInboxProps {
  initialMessages: MessageRow[];
}

function cleanWhatsAppNumber(phone: string): string {
  let cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1);
  } else if (!cleaned.startsWith("62")) {
    cleaned = "62" + cleaned;
  }
  return cleaned;
}

export default function MessageInbox({ initialMessages }: MessageInboxProps) {
  const [messages, setMessages] = useState<MessageRow[]>(initialMessages);
  const [activeTab, setActiveTab] = useState<"ALL" | "unread" | "responded" | "archived">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = messages.filter((m) => {
    const matchesTab = activeTab === "ALL" || m.status === activeTab;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.subject && m.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleStatusChange = async (id: string, newStatus: MessageRow["status"]) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
    );
    await updateMessageStatus(id, newStatus);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus berkas transmisi ini secara permanen?")) return;
    setMessages((prev) => prev.filter((m) => m.id !== id));
    await deleteMessage(id);
  };

  const exportCSV = () => {
    const headers = ["Nama", "Kontak", "Subjek", "Pesan", "Status", "Waktu"];
    const rows = filtered.map((m) => [
      `"${m.name.replace(/"/g, '""')}"`,
      `"${m.contact.replace(/"/g, '""')}"`,
      `"${(m.subject || "").replace(/"/g, '""')}"`,
      `"${m.message.replace(/"/g, '""')}"`,
      `"${m.status}"`,
      `"${new Date(m.created_at).toLocaleString("id-ID")}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `euphoric-transmissions-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 font-mono">
      {/* Search & Tabs Bar */}
      <div className="bg-forest border border-bone/10 p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Search Input */}
        <div className="w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pengirim, kontak, atau subjek..."
            className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs placeholder:text-bone-dim/40 focus:border-lime focus:outline-none transition-colors"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {[
            { id: "ALL", label: "Semua" },
            { id: "unread", label: "Belum Dibaca" },
            { id: "responded", label: "Sudah Dibalas" },
            { id: "archived", label: "Arsip" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 py-1.5 uppercase transition-all ${
                activeTab === tab.id
                  ? "bg-lime text-forest-deep font-bold shadow-sm"
                  : "bg-forest-deep text-bone-dim border border-bone/10 hover:text-bone hover:border-lime/40"
              }`}
            >
              {tab.label}
            </button>
          ))}

          <button
            type="button"
            onClick={exportCSV}
            className="px-3.5 py-1.5 border border-bone/20 text-lime hover:border-lime text-xs font-bold uppercase transition-colors ml-auto sm:ml-2 flex items-center gap-1.5"
          >
            <span>↓</span>
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* Transmissions Table */}
      <div className="bg-forest border border-bone/10 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-forest-deep text-bone-dim border-b border-bone/10 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Pengirim & Kontak</th>
              <th className="py-3.5 px-4">Subjek & Transmisi Pesan</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Waktu Terima</th>
              <th className="py-3.5 px-4 text-right">Disposisi Cepat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bone/10">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-12 text-center text-bone-dim text-xs">
                  Tidak ada transmisi pesan pada filter yang dipilih.
                </td>
              </tr>
            ) : (
              filtered.map((m) => {
                const isPhone = /^\+?[0-9\s-]{8,15}$/.test(m.contact.trim());
                const waUrl = isPhone
                  ? `https://wa.me/${cleanWhatsAppNumber(m.contact)}?text=${encodeURIComponent(
                      `Halo ${m.name}, terima kasih telah menghubungi Markas euphoric.disorder perihal pesan Anda: "${m.subject || "Inquiry"}"`
                    )}`
                  : null;

                return (
                  <tr
                    key={m.id}
                    className={`hover:bg-forest-deep/60 transition-colors ${
                      m.status === "unread" ? "bg-lime/[0.03]" : ""
                    }`}
                  >
                    {/* Sender */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {m.status === "unread" && (
                          <span className="w-2 h-2 rounded-full bg-lime animate-pulse flex-shrink-0" />
                        )}
                        <span className={`font-display text-sm ${m.status === "unread" ? "text-bone font-bold" : "text-bone-dim"}`}>
                          {m.name}
                        </span>
                      </div>
                      <div className="text-[11px] text-bone-dim/60 mt-0.5">
                        {m.contact}
                      </div>
                    </td>

                    {/* Content */}
                    <td className="py-3.5 px-4 max-w-xs sm:max-w-md">
                      {m.subject && (
                        <div className="text-lime text-xs mb-0.5 font-bold">
                          [{m.subject}]
                        </div>
                      )}
                      <p className="text-bone-dim text-xs line-clamp-2">
                        {m.message}
                      </p>
                    </td>

                    {/* Status dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={m.status}
                        onChange={(e) =>
                          handleStatusChange(m.id, e.target.value as MessageRow["status"])
                        }
                        className={`px-2.5 py-1 text-[10px] uppercase font-bold bg-forest-deep border focus:outline-none ${
                          m.status === "unread"
                            ? "text-red-400 border-red-500/40 bg-red-950/20"
                            : m.status === "responded"
                            ? "text-emerald-400 border-emerald-500/40 bg-emerald-950/20"
                            : m.status === "archived"
                            ? "text-bone-dim/60 border-bone/10"
                            : "text-sky-300 border-sky-500/40 bg-sky-950/20"
                        }`}
                      >
                        <option value="unread">Belum Dibaca</option>
                        <option value="read">Dibaca</option>
                        <option value="responded">Sudah Dibalas</option>
                        <option value="archived">Arsip</option>
                      </select>
                    </td>

                    {/* Time */}
                    <td className="py-3.5 px-4 text-bone-dim/60 text-[11px] whitespace-nowrap">
                      {new Date(m.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        timeZone: "Asia/Jakarta",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        {waUrl && (
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleStatusChange(m.id, "responded")}
                            className="px-2.5 py-1 bg-emerald-950/30 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase hover:bg-emerald-900/40 transition-colors"
                            title="Disposisi ke WhatsApp"
                          >
                            WA Dispatch ↗
                          </a>
                        )}

                        <Link
                          href={`/admin/pesan/${m.id}`}
                          className="px-2.5 py-1 bg-forest-deep border border-bone/20 text-bone hover:border-lime hover:text-lime text-[10px] uppercase transition-colors"
                        >
                          Detail
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(m.id)}
                          className="px-2 py-1 text-red-400 hover:bg-red-950/30 border border-transparent hover:border-red-500/30 text-[11px] transition-colors"
                          title="Musnahkan Transmisi"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
