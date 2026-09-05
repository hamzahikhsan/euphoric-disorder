"use client";

import { useState } from "react";
import { saveSettings } from "@/app/actions/admin/settings";

interface SettingsFormProps {
  initialConfig: Record<string, string>;
}

export default function SettingsForm({ initialConfig }: SettingsFormProps) {
  const [config, setConfig] = useState<Record<string, string>>(initialConfig);
  const [activeTab, setActiveTab] = useState<"general" | "contact" | "social">("general");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

  const updateField = (key: string, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    const entries = Object.entries(config).map(([key, value]) => {
      let category = "general";
      if (
        [
          "address",
          "maps_url",
          "whatsapp_number",
          "whatsapp_base",
          "whatsapp_hours",
          "wa_general_message",
        ].includes(key)
      ) {
        category = "contact";
      } else if (["instagram", "threads", "shopee_url"].includes(key)) {
        category = "social";
      }
      return { key, value, category };
    });

    const res = await saveSettings(entries);
    setSaving(false);

    if (res.ok) {
      setMessage({ text: "✅ Konfigurasi berhasil disimpan!", ok: true });
    } else {
      setMessage({ text: `⚠ Gagal: ${res.error}`, ok: false });
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {message && (
        <div
          className={`p-4 text-xs font-[family-name:var(--font-space-mono)] border ${
            message.ok
              ? "bg-[#51CF66]/15 border-[#51CF66]/40 text-[#51CF66]"
              : "bg-[#FF6B6B]/15 border-[#FF6B6B]/40 text-[#FF6B6B]"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-[#373A40] text-xs font-[family-name:var(--font-space-mono)]">
        {[
          { id: "general", label: "🏢 Identitas & Umum" },
          { id: "contact", label: "📞 Kontak & Operasional" },
          { id: "social", label: "🌐 Media Sosial & Marketplace" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-3 border-b-2 font-bold uppercase transition-colors ${
              activeTab === tab.id
                ? "border-[#CDFF00] text-[#CDFF00] bg-[#25262B]"
                : "border-transparent text-[#909296] hover:text-[#F1F3F5]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="bg-[#25262B] border border-[#373A40] p-6 space-y-4">
        {activeTab === "general" && (
          <>
            <div>
              <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase mb-1">
                Nama Brand
              </label>
              <input
                type="text"
                value={config["name"] || ""}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase mb-1">
                Wordmark / Sub-header
              </label>
              <input
                type="text"
                value={config["wordmark"] || ""}
                onChange={(e) => updateField("wordmark", e.target.value)}
                className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase mb-1">
                Tagline Utama
              </label>
              <input
                type="text"
                value={config["tagline"] || ""}
                onChange={(e) => updateField("tagline", e.target.value)}
                className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase mb-1">
                Thesis / Filosofi Brand
              </label>
              <textarea
                rows={3}
                value={config["thesis"] || ""}
                onChange={(e) => updateField("thesis", e.target.value)}
                className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase mb-1">
                  Tahun Berdiri (EST)
                </label>
                <input
                  type="text"
                  value={config["est"] || ""}
                  onChange={(e) => updateField("est", e.target.value)}
                  className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase mb-1">
                  Kota Operasional
                </label>
                <input
                  type="text"
                  value={config["city"] || ""}
                  onChange={(e) => updateField("city", e.target.value)}
                  className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
                />
              </div>
            </div>
          </>
        )}

        {activeTab === "contact" && (
          <>
            <div>
              <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase mb-1">
                Alamat Lengkap Workshop
              </label>
              <textarea
                rows={2}
                value={config["address"] || ""}
                onChange={(e) => updateField("address", e.target.value)}
                className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase mb-1">
                URL Google Maps
              </label>
              <input
                type="url"
                value={config["maps_url"] || ""}
                onChange={(e) => updateField("maps_url", e.target.value)}
                className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase mb-1">
                  Nomor WhatsApp Tampilan
                </label>
                <input
                  type="text"
                  value={config["whatsapp_number"] || ""}
                  onChange={(e) => updateField("whatsapp_number", e.target.value)}
                  className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase mb-1">
                  Jam Operasional WhatsApp
                </label>
                <input
                  type="text"
                  value={config["whatsapp_hours"] || ""}
                  onChange={(e) => updateField("whatsapp_hours", e.target.value)}
                  className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase mb-1">
                Base URL WhatsApp (wa.me)
              </label>
              <input
                type="url"
                value={config["whatsapp_base"] || ""}
                onChange={(e) => updateField("whatsapp_base", e.target.value)}
                className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase mb-1">
                Pesan Default Klik WhatsApp
              </label>
              <input
                type="text"
                value={config["wa_general_message"] || ""}
                onChange={(e) => updateField("wa_general_message", e.target.value)}
                className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
              />
            </div>
          </>
        )}

        {activeTab === "social" && (
          <>
            <div>
              <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase mb-1">
                Akun Instagram URL
              </label>
              <input
                type="url"
                value={config["instagram"] || ""}
                onChange={(e) => updateField("instagram", e.target.value)}
                className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase mb-1">
                Akun Threads URL
              </label>
              <input
                type="url"
                value={config["threads"] || ""}
                onChange={(e) => updateField("threads", e.target.value)}
                className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase mb-1">
                Toko Shopee URL
              </label>
              <input
                type="url"
                value={config["shopee_url"] || ""}
                onChange={(e) => updateField("shopee_url", e.target.value)}
                className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
              />
            </div>
          </>
        )}

        <div className="pt-4 border-t border-[#373A40] flex justify-end">
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#CDFF00] text-[#1A1B1E] text-xs font-bold font-[family-name:var(--font-space-mono)] uppercase hover:bg-[#b8e600] transition-colors disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan Pengaturan"}
          </button>
        </div>
      </div>
    </div>
  );
}
