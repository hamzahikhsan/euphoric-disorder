"use client";

import { useState } from "react";
import { saveFaq, toggleFaqVisibility, deleteFaq } from "@/app/actions/admin/faqs";
import type { Database } from "@/lib/supabase/types";

type FaqRow = Database["public"]["Tables"]["faqs"]["Row"];

interface FaqManagerProps {
  initialFaqs: FaqRow[];
}

export default function FaqManager({ initialFaqs }: FaqManagerProps) {
  const [faqs, setFaqs] = useState<FaqRow[]>(initialFaqs);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Form inputs
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sortOrder, setSortOrder] = useState(1);
  const [loading, setLoading] = useState(false);

  const startNew = () => {
    setIsNew(true);
    setEditingId(null);
    setQuestion("");
    setAnswer("");
    setSortOrder(faqs.length + 1);
  };

  const startEdit = (f: FaqRow) => {
    setIsNew(false);
    setEditingId(f.id);
    setQuestion(f.question);
    setAnswer(f.answer);
    setSortOrder(f.sort_order);
  };

  const cancelEdit = () => {
    setIsNew(false);
    setEditingId(null);
    setQuestion("");
    setAnswer("");
  };

  const handleSave = async () => {
    if (!question.trim() || !answer.trim()) {
      alert("Pertanyaan dan jawaban wajib diisi.");
      return;
    }

    setLoading(true);

    if (isNew) {
      const res = await saveFaq({
        question,
        answer,
        sort_order: sortOrder,
        is_visible: true,
      });

      if (res.ok && res.data) {
        setFaqs([...faqs, res.data]);
        cancelEdit();
      } else {
        alert(`Gagal menyimpan: ${res.error}`);
      }
    } else if (editingId) {
      const res = await saveFaq(
        {
          question,
          answer,
          sort_order: sortOrder,
        },
        editingId
      );

      if (res.ok && res.data) {
        setFaqs(faqs.map((f) => (f.id === editingId ? res.data! : f)));
        cancelEdit();
      } else {
        alert(`Gagal mengedit: ${res.error}`);
      }
    }

    setLoading(false);
  };

  const handleToggle = async (id: string, current: boolean) => {
    const next = !current;
    setFaqs(faqs.map((f) => (f.id === id ? { ...f, is_visible: next } : f)));
    await toggleFaqVisibility(id, next);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus item FAQ ini?")) return;
    setFaqs(faqs.filter((f) => f.id !== id));
    await deleteFaq(id);
  };

  return (
    <div className="space-y-6 font-mono">
      <div className="flex items-center justify-between">
        <p className="text-xs text-bone-dim">
          Total Intel FAQ: <strong className="text-lime">{faqs.length}</strong> butir pertanyaan
        </p>
        {!isNew && !editingId && (
          <button
            type="button"
            onClick={startNew}
            className="px-4 py-2 bg-lime text-forest-deep text-xs font-bold uppercase hover:bg-lime/90 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>+</span>
            <span>Tambah Intel FAQ</span>
          </button>
        )}
      </div>

      {/* FAQ Editor Form */}
      {(isNew || editingId) && (
        <div className="bg-forest border border-lime/40 p-6 sm:p-8 space-y-5 shadow-lg">
          <div className="flex items-center justify-between border-b border-bone/10 pb-3">
            <h2 className="text-bone text-base font-bold font-display">
              {isNew ? "Daftarkan Pertanyaan FAQ Baru" : "Modifikasi Intel FAQ"}
            </h2>
            <span className="text-lime text-[10px] uppercase">
              {isNew ? "[ENTRY BARU]" : `[ID: ${editingId}]`}
            </span>
          </div>

          <div>
            <label className="block text-bone-dim text-xs uppercase mb-1">
              Pertanyaan (Judul Kasus) *
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Contoh: Bagaimana prosedur kustom sablon apparel satuan atau batch?"
              className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-bone-dim text-xs uppercase mb-1">
              Jawaban Penjelasan Forensik *
            </label>
            <textarea
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Tuliskan jawaban yang detail, lugas, dan mengarahkan ke kanal pemesanan resmi..."
              className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none leading-relaxed"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs text-bone-dim uppercase">
              Urutan Tampil (Sort Order):
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-20 px-3 py-1.5 bg-forest-deep border border-bone/20 text-lime text-xs text-center font-bold"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-bone/10">
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 border border-bone/20 text-bone-dim hover:text-bone text-xs uppercase"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={handleSave}
              className="px-5 py-2 bg-lime text-forest-deep text-xs font-bold uppercase hover:bg-lime/90 transition-colors shadow-sm"
            >
              {loading ? "Menyimpan..." : "Simpan Intel FAQ"}
            </button>
          </div>
        </div>
      )}

      {/* FAQ Items Accordion Cards */}
      <div className="space-y-3">
        {faqs.length === 0 ? (
          <div className="p-12 bg-forest border border-bone/10 text-center text-bone-dim text-xs">
            Belum ada butir FAQ yang tersimpan.
          </div>
        ) : (
          faqs.map((item, idx) => (
            <div
              key={item.id}
              className={`p-5 bg-forest border transition-all ${
                item.is_visible ? "border-bone/15" : "border-bone/10 opacity-50 bg-forest-deep/40"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] text-lime font-bold">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-bone font-display tracking-tight">
                      {item.question}
                    </h3>
                  </div>
                  <p className="text-xs text-bone-dim leading-relaxed pl-6">
                    {item.answer}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 pt-0.5">
                  <button
                    type="button"
                    onClick={() => handleToggle(item.id, item.is_visible)}
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase border transition-all ${
                      item.is_visible
                        ? "bg-emerald-950/20 text-emerald-400 border-emerald-500/40"
                        : "bg-forest-deep text-bone-dim/60 border-bone/10"
                    }`}
                  >
                    {item.is_visible ? "TAYANG" : "DISEMBUNYIKAN"}
                  </button>

                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="px-3 py-1 text-[11px] bg-forest-deep border border-bone/20 text-bone hover:border-lime hover:text-lime uppercase transition-colors"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="px-2.5 py-1 text-[11px] border border-red-500/30 text-red-400 hover:bg-red-950/20 uppercase transition-colors"
                    title="Hapus FAQ"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
