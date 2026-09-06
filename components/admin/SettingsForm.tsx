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
      setMessage({ text: "✓ Konfigurasi markas berhasil disimpan ke basis data!", ok: true });
    } else {
      setMessage({ text: `⚠️ Gagal menyimpan: ${res.error}`, ok: false });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl font-mono">
      {message && (
        <div
          className={`p-4 text-xs font-mono border flex items-center gap-2.5 ${
            message.ok
              ? "bg-lime/10 border-lime/50 text-lime"
              : "bg-red-950/30 border-red-500/40 text-red-400"
          }`}
        >
          <span>{message.text}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-bone/15 text-xs">
        {[
          { id: "general", label: "01. Identitas Brand" },
          { id: "contact", label: "02. Kontak & Hotline WhatsApp" },
          { id: "social", label: "03. Kanal Sosial & Marketplace" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-5 py-3 border-b-2 font-bold uppercase transition-all ${
              activeTab === tab.id
                ? "border-lime text-lime bg-forest"
                : "border-transparent text-bone-dim hover:text-bone"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents Card */}
      <div className="bg-forest border border-bone/15 p-6 sm:p-8 space-y-5">
        {activeTab === "general" && (
          <>
            <div>
              <label className="block text-bone-dim text-xs uppercase mb-1">
                Nama Brand
              </label>
              <input
                type="text"
                value={config["name"] || ""}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-bone-dim text-xs uppercase mb-1">
                Wordmark / Sub-header
              </label>
              <input
                type="text"
                value={config["wordmark"] || ""}
                onChange={(e) => updateField("wordmark", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-bone-dim text-xs uppercase mb-1">
                Tagline Utama
              </label>
              <input
                type="text"
                value={config["tagline"] || ""}
                onChange={(e) => updateField("tagline", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-bone-dim text-xs uppercase mb-1">
                Thesis / Filosofi Utama Brand
              </label>
              <textarea
                rows={3}
                value={config["thesis"] || ""}
                onChange={(e) => updateField("thesis", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-bone-dim text-xs uppercase mb-1">
                  Tahun Berdiri (EST)
                </label>
                <input
                  type="text"
                  value={config["est"] || ""}
                  onChange={(e) => updateField("est", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-bone-dim text-xs uppercase mb-1">
                  Kota Operasional
                </label>
                <input
                  type="text"
                  value={config["city"] || ""}
                  onChange={(e) => updateField("city", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
                />
              </div>
            </div>
          </>
        )}

        {activeTab === "contact" && (
          <>
            <div>
              <label className="block text-bone-dim text-xs uppercase mb-1">
                Alamat Lengkap Workshop / Markas
              </label>
              <textarea
                rows={2}
                value={config["address"] || ""}
                onChange={(e) => updateField("address", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-bone-dim text-xs uppercase mb-1">
                Tautan Titik Lokasi Google Maps
              </label>
              <input
                type="url"
                value={config["maps_url"] || ""}
                onChange={(e) => updateField("maps_url", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-bone-dim text-xs uppercase mb-1">
                  Nomor WhatsApp Tampilan
                </label>
                <input
                  type="text"
                  value={config["whatsapp_number"] || ""}
                  onChange={(e) => updateField("whatsapp_number", e.target.value)}
                  placeholder="+62 856-1740-296"
                  className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-lime text-xs font-bold focus:border-lime focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-bone-dim text-xs uppercase mb-1">
                  Jam Operasional Layanan
                </label>
                <input
                  type="text"
                  value={config["whatsapp_hours"] || ""}
                  onChange={(e) => updateField("whatsapp_hours", e.target.value)}
                  placeholder="Senin - Sabtu: 09:00 - 20:00 WIB"
                  className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-bone-dim text-xs uppercase mb-1">
                Base URL WhatsApp (wa.me)
              </label>
              <input
                type="url"
                value={config["whatsapp_base"] || ""}
                onChange={(e) => updateField("whatsapp_base", e.target.value)}
                placeholder="https://wa.me/628561740296"
                className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-bone-dim text-xs uppercase mb-1">
                Pesan Default Greeting WhatsApp
              </label>
              <input
                type="text"
                value={config["wa_general_message"] || ""}
                onChange={(e) => updateField("wa_general_message", e.target.value)}
                placeholder="Halo Euphoric Disorder, saya ingin konsultasi..."
                className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
              />
            </div>
          </>
        )}

        {activeTab === "social" && (
          <>
            <div>
              <label className="block text-bone-dim text-xs uppercase mb-1">
                Akun Instagram URL
              </label>
              <input
                type="url"
                value={config["instagram"] || ""}
                onChange={(e) => updateField("instagram", e.target.value)}
                placeholder="https://instagram.com/euphoric.disorder"
                className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-bone-dim text-xs uppercase mb-1">
                Akun Threads URL
              </label>
              <input
                type="url"
                value={config["threads"] || ""}
                onChange={(e) => updateField("threads", e.target.value)}
                placeholder="https://threads.net/@euphoric.disorder"
                className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-bone-dim text-xs uppercase mb-1">
                Toko Resmi Shopee URL
              </label>
              <input
                type="url"
                value={config["shopee_url"] || ""}
                onChange={(e) => updateField("shopee_url", e.target.value)}
                placeholder="https://shopee.co.id/compaxgrup"
                className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
              />
            </div>
          </>
        )}

        {/* Save button */}
        <div className="pt-4 border-t border-bone/10 flex justify-end">
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="px-6 py-2.5 bg-lime text-forest-deep text-xs font-bold uppercase hover:bg-lime/90 active:scale-[0.98] transition-all disabled:opacity-50 shadow-[0_4px_16px_rgba(205,255,0,0.2)]"
          >
            {saving ? "Menyimpan..." : "Simpan Konfigurasi Markas"}
          </button>
        </div>
      </div>
    </div>
  );
}
