"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateMessageStatus, deleteMessage } from "@/app/actions/admin/messages";
import type { Database } from "@/lib/supabase/types";

type MessageRow = Database["public"]["Tables"]["contact_submissions"]["Row"];

interface MessageDetailViewProps {
  message: MessageRow;
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

export default function MessageDetailView({ message: initialMsg }: MessageDetailViewProps) {
  const router = useRouter();
  const [message, setMessage] = useState<MessageRow>(initialMsg);
  const [adminNotes, setAdminNotes] = useState(initialMsg.admin_notes || "");
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesSuccess, setNotesSuccess] = useState(false);

  const handleStatusChange = async (newStatus: MessageRow["status"]) => {
    setMessage({ ...message, status: newStatus });
    await updateMessageStatus(message.id, newStatus, adminNotes);
  };

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    setNotesSuccess(false);
    const res = await updateMessageStatus(message.id, message.status, adminNotes);
    setSavingNotes(false);
    if (res.ok) {
      setNotesSuccess(true);
      setTimeout(() => setNotesSuccess(false), 2000);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Hapus pesan ini secara permanen?")) return;
    const res = await deleteMessage(message.id);
    if (res.ok) {
      router.push("/admin/pesan");
      router.refresh();
    }
  };

  const isPhone = /^\+?[0-9\s-]{8,15}$/.test(message.contact.trim());
  const waUrl = isPhone
    ? `https://wa.me/${cleanWhatsAppNumber(message.contact)}?text=${encodeURIComponent(
        `Halo ${message.name}, menindaklanjuti pesan Anda ke Euphoric Disorder terkait "${message.subject || "Pertanyaan Anda"}":`
      )}`
    : null;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/pesan"
          className="text-xs text-[#909296] hover:text-[#CDFF00] font-[family-name:var(--font-space-mono)] uppercase tracking-wider"
        >
          ← Kembali ke Kotak Masuk
        </Link>

        <button
          type="button"
          onClick={handleDelete}
          className="px-3 py-1.5 border border-[#FF6B6B]/40 text-[#FF6B6B] hover:bg-[#FF6B6B]/15 text-xs font-[family-name:var(--font-space-mono)] uppercase transition-colors"
        >
          🗑️ Hapus Pesan
        </button>
      </div>

      {/* Main card */}
      <div className="bg-[#25262B] border border-[#373A40] p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#373A40] pb-4">
          <div>
            <span className="text-[10px] text-[#CDFF00] font-[family-name:var(--font-space-mono)] uppercase tracking-widest">
              BERKAS LAPORAN KASUS
            </span>
            <h1 className="text-xl font-bold text-[#F1F3F5] font-[family-name:var(--font-nohemi)] mt-0.5">
              {message.name}
            </h1>
            <p className="text-xs text-[#909296] font-[family-name:var(--font-space-mono)] mt-1">
              Kontak: <strong className="text-[#F1F3F5]">{message.contact}</strong> · Sumber: {message.source}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs text-[#909296] font-[family-name:var(--font-space-mono)]">
              Status:
            </label>
            <select
              value={message.status}
              onChange={(e) => handleStatusChange(e.target.value as MessageRow["status"])}
              className="px-3 py-1.5 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-bold uppercase focus:border-[#CDFF00] focus:outline-none"
            >
              <option value="unread">Belum Dibaca</option>
              <option value="read">Dibaca</option>
              <option value="responded">Sudah Dibalas</option>
              <option value="archived">Arsip</option>
            </select>
          </div>
        </div>

        {/* Message body */}
        <div className="space-y-2">
          {message.subject && (
            <div className="text-xs text-[#CDFF00] font-bold font-[family-name:var(--font-space-mono)]">
              Subjek: {message.subject}
            </div>
          )}
          <div className="p-4 bg-[#1A1B1E] border border-[#373A40] text-sm text-[#F1F3F5] font-[family-name:var(--font-space-mono)] leading-relaxed whitespace-pre-wrap">
            {message.message}
          </div>
          <p className="text-[11px] text-[#555] font-[family-name:var(--font-space-mono)]">
            Diterima pada: {new Date(message.created_at).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })} WIB
          </p>
        </div>

        {/* Quick action: WhatsApp */}
        {waUrl && (
          <div className="p-4 bg-[#51CF66]/10 border border-[#51CF66]/30 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-[#51CF66] font-[family-name:var(--font-nohemi)]">
                Balas Langsung via WhatsApp
              </p>
              <p className="text-[11px] text-[#909296] font-[family-name:var(--font-space-mono)]">
                Nomor pelanggan terdeteksi: {message.contact}
              </p>
            </div>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleStatusChange("responded")}
              className="px-4 py-2 bg-[#51CF66] text-[#1A1B1E] text-xs font-bold uppercase font-[family-name:var(--font-space-mono)] hover:bg-[#40c057] transition-colors"
            >
              💬 Buka WhatsApp & Balas
            </a>
          </div>
        )}

        {/* Admin Notes */}
        <div className="space-y-3 pt-2 border-t border-[#373A40]">
          <div className="flex items-center justify-between">
            <label className="text-xs text-[#909296] font-[family-name:var(--font-space-mono)] uppercase tracking-wider">
              Catatan Internal Admin
            </label>
            {notesSuccess && (
              <span className="text-[11px] text-[#51CF66] font-[family-name:var(--font-space-mono)]">
                ✓ Tersimpan!
              </span>
            )}
          </div>
          <textarea
            rows={3}
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Tuliskan catatan tindak lanjut pesanan atau riwayat komunikasi pelanggan di sini..."
            className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none leading-relaxed"
          />
          <div className="flex justify-end">
            <button
              type="button"
              disabled={savingNotes}
              onClick={handleSaveNotes}
              className="px-4 py-1.5 bg-[#25262B] border border-[#373A40] text-[#CDFF00] hover:border-[#CDFF00] text-xs font-[family-name:var(--font-space-mono)] uppercase transition-colors"
            >
              {savingNotes ? "Menyimpan..." : "Simpan Catatan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
