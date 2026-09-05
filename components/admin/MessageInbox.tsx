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
    if (!confirm("Hapus pesan ini secara permanen?")) return;
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
    link.setAttribute("download", `pesan-pelanggan-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Search & Tabs */}
      <div className="bg-[#25262B] border border-[#373A40] p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari nama, kontak, subjek pesan..."
          className="w-full sm:w-72 px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
        />

        {/* Status tabs */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-[family-name:var(--font-space-mono)]">
          {[
            { id: "ALL", label: "Semua" },
            { id: "unread", label: "Belum Dibaca" },
            { id: "responded", label: "Sudah Dibalas" },
            { id: "archived", label: "Arsip" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 py-1.5 border uppercase transition-colors ${
                activeTab === tab.id
                  ? "bg-[#CDFF00] text-[#1A1B1E] border-[#CDFF00] font-bold"
                  : "bg-[#1A1B1E] text-[#909296] border-[#373A40] hover:text-[#F1F3F5]"
              }`}
            >
              {tab.label}
            </button>
          ))}

          <button
            type="button"
            onClick={exportCSV}
            className="px-3 py-1.5 border border-[#373A40] text-[#CDFF00] hover:border-[#CDFF00] font-bold uppercase transition-colors ml-2"
          >
            📥 Ekspor CSV
          </button>
        </div>
      </div>

      {/* Message List Table */}
      <div className="bg-[#25262B] border border-[#373A40] overflow-x-auto">
        <table className="w-full text-left text-xs font-[family-name:var(--font-space-mono)]">
          <thead className="bg-[#1A1B1E] text-[#909296] border-b border-[#373A40] uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-3 px-4">Pengirim & Kontak</th>
              <th className="py-3 px-4">Subjek & Pesan</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Waktu</th>
              <th className="py-3 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#373A40]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[#555]">
                  Tidak ada pesan pada filter ini.
                </td>
              </tr>
            ) : (
              filtered.map((m) => {
                const isPhone = /^\+?[0-9\s-]{8,15}$/.test(m.contact.trim());
                const waUrl = isPhone
                  ? `https://wa.me/${cleanWhatsAppNumber(m.contact)}?text=${encodeURIComponent(
                      `Halo ${m.name}, terima kasih telah menghubungi Euphoric Disorder mengenai pesan Anda: "${m.subject || "Pertanyaan"}"`
                    )}`
                  : null;

                return (
                  <tr
                    key={m.id}
                    className={`hover:bg-[#2C2E33]/60 transition-colors ${
                      m.status === "unread" ? "bg-[#CDFF00]/5 font-bold" : ""
                    }`}
                  >
                    {/* Sender */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {m.status === "unread" && (
                          <span className="w-2 h-2 rounded-full bg-[#CDFF00] flex-shrink-0" />
                        )}
                        <span className="text-[#F1F3F5]">{m.name}</span>
                      </div>
                      <div className="text-[11px] text-[#909296] font-normal mt-0.5">
                        {m.contact}
                      </div>
                    </td>

                    {/* Content */}
                    <td className="py-3 px-4 max-w-xs sm:max-w-md">
                      {m.subject && (
                        <div className="text-[#CDFF00] text-xs mb-0.5 font-bold">
                          {m.subject}
                        </div>
                      )}
                      <p className="text-[#909296] text-xs truncate font-normal">
                        {m.message}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <select
                        value={m.status}
                        onChange={(e) =>
                          handleStatusChange(m.id, e.target.value as MessageRow["status"])
                        }
                        className={`px-2 py-1 text-[10px] uppercase font-bold bg-[#1A1B1E] border focus:outline-none ${
                          m.status === "unread"
                            ? "text-[#FF6B6B] border-[#FF6B6B]/40"
                            : m.status === "responded"
                            ? "text-[#51CF66] border-[#51CF66]/40"
                            : m.status === "archived"
                            ? "text-[#868E96] border-[#868E96]/40"
                            : "text-[#74C0FC] border-[#74C0FC]/40"
                        }`}
                      >
                        <option value="unread">Belum Dibaca</option>
                        <option value="read">Dibaca</option>
                        <option value="responded">Sudah Dibalas</option>
                        <option value="archived">Arsip</option>
                      </select>
                    </td>

                    {/* Time */}
                    <td className="py-3 px-4 text-[#909296] text-[11px] font-normal whitespace-nowrap">
                      {new Date(m.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                      {waUrl && (
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-2.5 py-1 bg-[#51CF66]/20 border border-[#51CF66]/50 text-[#51CF66] text-[10px] font-bold uppercase hover:bg-[#51CF66]/30 transition-colors"
                          title="Balas ke WhatsApp pelanggan"
                        >
                          💬 WA
                        </a>
                      )}

                      <Link
                        href={`/admin/pesan/${m.id}`}
                        className="inline-block px-2.5 py-1 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-[10px] uppercase hover:border-[#CDFF00] hover:text-[#CDFF00] transition-colors"
                      >
                        Detail
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(m.id)}
                        className="px-2 py-1 text-[#FF6B6B] hover:bg-[#FF6B6B]/15 text-[11px] transition-colors"
                        title="Hapus"
                      >
                        🗑️
                      </button>
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
