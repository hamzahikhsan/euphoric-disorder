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
    if (!confirm("Apakah Anda yakin ingin menghapus FAQ ini?")) return;
    setFaqs(faqs.filter((f) => f.id !== id));
    await deleteFaq(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#909296] font-[family-name:var(--font-space-mono)]">
          Total FAQ: {faqs.length} pertanyaan
        </p>
        {!isNew && !editingId && (
          <button
            type="button"
            onClick={startNew}
            className="px-4 py-2 bg-[#CDFF00] text-[#1A1B1E] text-xs font-bold font-[family-name:var(--font-space-mono)] uppercase hover:bg-[#b8e600] transition-colors"
          >
            + Tambah FAQ
          </button>
        )}
      </div>

      {/* Editor Box */}
      {(isNew || editingId) && (
        <div className="bg-[#25262B] border border-[#CDFF00]/50 p-6 space-y-4">
          <h2 className="text-[#F1F3F5] text-base font-bold font-[family-name:var(--font-nohemi)]">
            {isNew ? "Tambah FAQ Baru" : "Edit FAQ"}
          </h2>

          <div>
            <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase mb-1">
              Pertanyaan
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Contoh: Bagaimana cara memesan produk edisi Pre-Order (PO)?"
              className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase mb-1">
              Jawaban Lengkap
            </label>
            <textarea
              rows={3}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Tuliskan jawaban yang ramah dan informatif..."
              className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none leading-relaxed"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs text-[#909296] font-[family-name:var(--font-space-mono)]">
              Urutan Tampil:
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-16 px-2 py-1 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs text-center font-[family-name:var(--font-space-mono)]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 border border-[#373A40] text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={handleSave}
              className="px-5 py-2 bg-[#CDFF00] text-[#1A1B1E] text-xs font-bold font-[family-name:var(--font-space-mono)] uppercase hover:bg-[#b8e600]"
            >
              {loading ? "Menyimpan..." : "Simpan FAQ"}
            </button>
          </div>
        </div>
      )}

      {/* FAQ List */}
      <div className="space-y-3">
        {faqs.length === 0 ? (
          <div className="p-8 bg-[#25262B] border border-[#373A40] text-center text-[#555] text-sm font-[family-name:var(--font-space-mono)]">
            Belum ada data FAQ.
          </div>
        ) : (
          faqs.map((item, idx) => (
            <div
              key={item.id}
              className={`p-4 bg-[#25262B] border transition-all ${
                item.is_visible ? "border-[#373A40]" : "border-[#373A40] opacity-50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#CDFF00] font-bold font-[family-name:var(--font-space-mono)]">
                      #{idx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-[#F1F3F5] font-[family-name:var(--font-nohemi)]">
                      {item.question}
                    </h3>
                  </div>
                  <p className="text-xs text-[#909296] font-[family-name:var(--font-space-mono)] leading-relaxed">
                    {item.answer}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggle(item.id, item.is_visible)}
                    className={`px-2 py-1 text-[10px] font-bold uppercase font-[family-name:var(--font-space-mono)] ${
                      item.is_visible
                        ? "bg-[#51CF66]/20 text-[#51CF66] border border-[#51CF66]/40"
                        : "bg-[#868E96]/20 text-[#868E96] border border-[#868E96]/40"
                    }`}
                  >
                    {item.is_visible ? "Tampil" : "Hidden"}
                  </button>

                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="px-2 py-1 text-[10px] bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] hover:border-[#CDFF00] font-[family-name:var(--font-space-mono)]"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="px-2 py-1 text-[10px] border border-[#FF6B6B]/30 text-[#FF6B6B] hover:bg-[#FF6B6B]/15 font-[family-name:var(--font-space-mono)]"
                  >
                    Hapus
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
