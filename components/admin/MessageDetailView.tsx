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
    if (!confirm("Hapus berkas transmisi ini secara permanen?")) return;
    const res = await deleteMessage(message.id);
    if (res.ok) {
      router.push("/admin/pesan");
      router.refresh();
    }
  };

  const isPhone = /^\+?[0-9\s-]{8,15}$/.test(message.contact.trim());
  const waUrl = isPhone
    ? `https://wa.me/${cleanWhatsAppNumber(message.contact)}?text=${encodeURIComponent(
        `Halo ${message.name}, menindaklanjuti pesan Anda ke Markas euphoric.disorder terkait "${message.subject || "Inquiry Anda"}":\n\n`
      )}`
    : null;

  return (
    <div className="space-y-6 max-w-4xl font-mono">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/pesan"
          className="text-xs text-bone-dim hover:text-lime uppercase tracking-wider transition-colors flex items-center gap-1.5"
        >
          <span>←</span>
          <span>Kembali ke Kotak Masuk</span>
        </Link>

        <button
          type="button"
          onClick={handleDelete}
          className="px-3 py-1.5 border border-red-500/40 text-red-400 hover:bg-red-950/20 text-xs uppercase tracking-wider transition-colors"
        >
          Hapus Transmisi
        </button>
      </div>

      {/* Main Dossier Card */}
      <div className="bg-forest border border-bone/15 p-6 sm:p-8 space-y-6">
        {/* Header section */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-bone/10 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 bg-lime inline-block" />
              <span className="text-[10px] text-lime uppercase tracking-widest">
                TRANSMISSION DOSSIER // BERKAS INQUIRY
              </span>
            </div>
            <h1 className="text-2xl font-bold text-bone font-display tracking-tight">
              {message.name}
            </h1>
            <p className="text-xs text-bone-dim mt-1">
              Kontak: <strong className="text-lime">{message.contact}</strong> • Sumber: <span className="text-bone">{message.source}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs text-bone-dim uppercase">
              Status Berkas:
            </label>
            <select
              value={message.status}
              onChange={(e) => handleStatusChange(e.target.value as MessageRow["status"])}
              className="px-3 py-1.5 bg-forest-deep border border-bone/20 text-bone text-xs font-bold uppercase focus:border-lime focus:outline-none"
            >
              <option value="unread">Belum Dibaca</option>
              <option value="read">Dibaca</option>
              <option value="responded">Sudah Dibalas</option>
              <option value="archived">Arsip</option>
            </select>
          </div>
        </div>

        {/* Message body content */}
        <div className="space-y-3">
          {message.subject && (
            <div className="text-sm text-lime font-bold">
              Subjek: {message.subject}
            </div>
          )}

          <div className="p-5 bg-forest-deep border border-bone/15 text-sm text-bone leading-relaxed whitespace-pre-wrap">
            {message.message}
          </div>

          <p className="text-[11px] text-bone-dim/60">
            Diterima pada sistem: {new Date(message.created_at).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })} WIB
          </p>
        </div>

        {/* Direct WhatsApp Response Dispatch Station */}
        {waUrl && (
          <div className="p-5 bg-forest-deep border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-emerald-400 font-display">
                Disposisi Cepat ke WhatsApp
              </p>
              <p className="text-xs text-bone-dim mt-0.5">
                Nomor kontak pemesan terverifikasi: <strong className="text-bone">{message.contact}</strong>
              </p>
            </div>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleStatusChange("responded")}
              className="px-5 py-2.5 bg-emerald-500 text-forest-deep text-xs font-bold uppercase hover:bg-emerald-400 transition-colors shadow-md flex items-center gap-2"
            >
              <span>Disposisi & Balas WhatsApp</span>
              <span>↗</span>
            </a>
          </div>
        )}

        {/* Internal Admin Case Notes */}
        <div className="space-y-3 pt-4 border-t border-bone/10">
          <div className="flex items-center justify-between">
            <label className="text-xs text-bone-dim uppercase tracking-wider">
              Catatan Internal Investigasi Markas
            </label>
            {notesSuccess && (
              <span className="text-[11px] text-lime">
                ✓ Catatan berhasil disimpan ke basis data!
              </span>
            )}
          </div>
          <textarea
            rows={3}
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Tuliskan catatan tindak lanjut pesanan, riwayat konfirmasi ukuran, atau instruksi khusus..."
            className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none leading-relaxed"
          />
          <div className="flex justify-end">
            <button
              type="button"
              disabled={savingNotes}
              onClick={handleSaveNotes}
              className="px-4 py-2 bg-forest border border-lime/40 text-lime hover:bg-lime hover:text-forest-deep font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
            >
              {savingNotes ? "Menyimpan..." : "Simpan Catatan Internal"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
