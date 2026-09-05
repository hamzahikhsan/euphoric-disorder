"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InputTag from "./InputTag";
import EditorWarnaRepeater, { ColorItem } from "./EditorWarnaRepeater";
import EditorTabelUkuran, { SizeItem } from "./EditorTabelUkuran";
import PemilihMedia from "./PemilihMedia";
import { saveProduct } from "@/app/actions/admin/products";
import type { Database } from "@/lib/supabase/types";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];

interface FormProdukProps {
  initialData?: Partial<ProductRow>;
  isEdit?: boolean;
}

const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL", "XXXL"];
const STATUS_OPTIONS = [
  { value: "OPEN", label: "OPEN — Siap Dipesan" },
  { value: "PO", label: "PO — Pre-Order Terjadwal" },
  { value: "LIMITED", label: "LIMITED — Stok Terbatas" },
  { value: "SOLD", label: "SOLD — Habis Terjual" },
  { value: "ARCHIVED", label: "ARCHIVED — Diarsipkan" },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function FormProduk({ initialData, isEdit = false }: FormProdukProps) {
  const router = useRouter();

  // Form State
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [subject, setSubject] = useState(initialData?.subject || "001");
  const [caseId, setCaseId] = useState(initialData?.case_id || "ED-CASE-001");
  const [tagline, setTagline] = useState(initialData?.tagline || "");
  const [status, setStatus] = useState<ProductRow["status"]>(initialData?.status || "OPEN");
  const [filedUnder, setFiledUnder] = useState<string[]>(initialData?.filed_under || ["War on Drugs", "T-Shirt"]);

  const [description, setDescription] = useState(initialData?.description || "");
  const [story, setStory] = useState(initialData?.story || "");

  const [material, setMaterial] = useState(initialData?.material || "Cotton Combed 24s");
  const [fabricGsm, setFabricGsm] = useState<number | "">(initialData?.fabric_gsm || 185);
  const [fabricComposition, setFabricComposition] = useState(initialData?.fabric_composition || "100% Cotton Combed");
  const [fabricFeel, setFabricFeel] = useState(initialData?.fabric_feel || "Halus, sejuk, menyerap keringat.");
  const [fitSilhouette, setFitSilhouette] = useState(initialData?.fit_silhouette || "Boxy Oversized Fit");
  const [printTechnique, setPrintTechnique] = useState(initialData?.print_technique || "Plastisol Screen Printing");
  const [printLocation, setPrintLocation] = useState<string[]>(initialData?.print_location || ["Dada Depan"]);

  const [priceIdr, setPriceIdr] = useState<number | "">(initialData?.price_idr || 145000);
  const [originalPriceIdr, setOriginalPriceIdr] = useState<number | "">(initialData?.original_price_idr || "");
  const [colors, setColors] = useState<ColorItem[]>(initialData?.colors || [{ name: "Pitch Black", hex: "#121212" }]);
  const [sizesAvailable, setSizesAvailable] = useState<string[]>(
    initialData?.sizes_available || ["S", "M", "L", "XL", "XXL"]
  );
  const [sizeChart, setSizeChart] = useState<SizeItem[]>(
    initialData?.size_chart || [
      { size: "S", chest: 52, length: 69, sleeve: 23 },
      { size: "M", chest: 55, length: 72, sleeve: 24 },
      { size: "L", chest: 58, length: 75, sleeve: 25 },
      { size: "XL", chest: 61, length: 78, sleeve: 26 },
      { size: "XXL", chest: 64, length: 80, sleeve: 27 },
    ]
  );

  const [imageFront, setImageFront] = useState(initialData?.image_front || "/img/products/candy-hoodie.png");
  const [imageBack, setImageBack] = useState(initialData?.image_back || "");
  const [imageDetails, setImageDetails] = useState<string[]>(initialData?.image_details || []);

  const [careInstructions, setCareInstructions] = useState<string[]>(
    initialData?.care_instructions || [
      "Cuci menggunakan air dingin dengan deterjen lembut.",
      "Balik pakaian saat mencuci dan menjemur.",
      "Hindari pemutih klorin keras.",
      "Jangan setrika langsung di atas sablon.",
    ]
  );
  const [batchInfo, setBatchInfo] = useState(initialData?.batch_info || "Katalog Reguler — Ready Stock");
  const [modelInfo, setModelInfo] = useState(initialData?.model_info || "Model pria 178 cm / 72 kg mengenakan Size L");
  const [shopeeUrl, setShopeeUrl] = useState(initialData?.shopee_url || "https://shopee.co.id/compaxgrup");

  const [sortOrder, setSortOrder] = useState<number>(initialData?.sort_order ?? 1);
  const [isPublished, setIsPublished] = useState<boolean>(initialData?.is_published ?? true);

  // Submitting state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Auto-generate slug and caseId on name change for new products
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEdit) {
      setSlug(slugify(val));
    }
  };

  const handleSizeToggle = (sz: string) => {
    if (sizesAvailable.includes(sz)) {
      setSizesAvailable(sizesAvailable.filter((s) => s !== sz));
    } else {
      setSizesAvailable([...sizesAvailable, sz]);
    }
  };

  const handleSubmit = async (publishStatus: boolean) => {
    if (!name.trim()) {
      setErrorMsg("Nama produk wajib diisi.");
      return;
    }
    if (!slug.trim()) {
      setErrorMsg("Slug produk wajib diisi.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const payload = {
      name,
      slug,
      subject,
      case_id: caseId,
      tagline,
      status,
      filed_under: filedUnder,
      description,
      story,
      material,
      fabric_gsm: fabricGsm === "" ? null : Number(fabricGsm),
      fabric_composition: fabricComposition,
      fabric_feel: fabricFeel,
      fit_silhouette: fitSilhouette,
      print_technique: printTechnique,
      print_location: printLocation,
      price_idr: priceIdr === "" ? null : Number(priceIdr),
      original_price_idr: originalPriceIdr === "" ? null : Number(originalPriceIdr),
      colors,
      sizes_available: sizesAvailable,
      size_chart: sizeChart,
      image_front: imageFront,
      image_back: imageBack || null,
      image_details: imageDetails,
      care_instructions: careInstructions,
      batch_info: batchInfo,
      model_info: modelInfo,
      shopee_url: shopeeUrl,
      sort_order: Number(sortOrder),
      is_published: publishStatus,
    };

    const res = await saveProduct(payload, isEdit);

    setLoading(false);
    if (!res.ok) {
      setErrorMsg(res.error || "Gagal menyimpan produk.");
    } else {
      setSuccessMsg(
        publishStatus
          ? "✅ Berkas perkara berhasil dipublikasikan!"
          : "✅ Berkas perkara tersimpan sebagai DRAFT!"
      );
      setTimeout(() => {
        router.push("/admin/produk");
        router.refresh();
      }, 1000);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-8 max-w-4xl pb-16">
      {/* Top Banner Alert */}
      {errorMsg && (
        <div className="p-4 bg-[#FF6B6B]/15 border border-[#FF6B6B]/40 text-[#FF6B6B] text-sm font-[family-name:var(--font-space-mono)]">
          ⚠ {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="p-4 bg-[#51CF66]/15 border border-[#51CF66]/40 text-[#51CF66] text-sm font-[family-name:var(--font-space-mono)]">
          {successMsg}
        </div>
      )}

      {/* 1. IDENTITAS BERKAS */}
      <section className="bg-[#25262B] border border-[#373A40] p-6 space-y-4">
        <div className="border-b border-[#373A40] pb-3 flex items-center justify-between">
          <h2 className="text-[#F1F3F5] text-base font-bold font-[family-name:var(--font-nohemi)] flex items-center gap-2">
            <span className="text-[#CDFF00]">01.</span> Identitas Berkas Perkara
          </h2>
          <span className="text-[10px] text-[#909296] font-[family-name:var(--font-space-mono)] uppercase">
            Data Utama
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-1">
              Nama Produk *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Contoh: Kaos #WarOnDrugs — M15"
              className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-1">
              Slug URL *
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="warondrugs-m15"
              className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-1">
              Nomor Subjek
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="015"
              className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-1">
              Kode Arsip Kasus
            </label>
            <input
              type="text"
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              placeholder="ED-CASE-015"
              className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-1">
            Tagline / Slogan Ringkas
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Satu kalimat tajam perihal produk..."
            className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-1">
              Status Ketersediaan
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProductRow["status"])}
              className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <InputTag
              label="Kategori / Label Berkas"
              tags={filedUnder}
              onChange={setFiledUnder}
              placeholder="Ketik tag lalu tekan enter..."
            />
          </div>
        </div>
      </section>

      {/* 2. NARASI & DESKRIPSI */}
      <section className="bg-[#25262B] border border-[#373A40] p-6 space-y-4">
        <div className="border-b border-[#373A40] pb-3 flex items-center justify-between">
          <h2 className="text-[#F1F3F5] text-base font-bold font-[family-name:var(--font-nohemi)] flex items-center gap-2">
            <span className="text-[#CDFF00]">02.</span> Narasi & Deskripsi
          </h2>
          <span className="text-[10px] text-[#909296] font-[family-name:var(--font-space-mono)] uppercase">
            Storytelling Forensik
          </span>
        </div>

        <div>
          <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-1">
            Ringkasan Singkat (Untuk Kartu Katalog)
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsi singkat 1-2 kalimat untuk preview katalog..."
            className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-1">
            Cerita Forensik Mendalam (Halaman Detail)
          </label>
          <textarea
            rows={5}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Narasi latar belakang, filosofi desain, kritik sosial..."
            className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none leading-relaxed"
          />
        </div>
      </section>

      {/* 3. SPESIFIKASI TEKNIS */}
      <section className="bg-[#25262B] border border-[#373A40] p-6 space-y-4">
        <div className="border-b border-[#373A40] pb-3 flex items-center justify-between">
          <h2 className="text-[#F1F3F5] text-base font-bold font-[family-name:var(--font-nohemi)] flex items-center gap-2">
            <span className="text-[#CDFF00]">03.</span> Spesifikasi Bahan & Sablon
          </h2>
          <span className="text-[10px] text-[#909296] font-[family-name:var(--font-space-mono)] uppercase">
            Spesifikasi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-1">
              Bahan Utama
            </label>
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="Cotton Combed 24s"
              className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-1">
              Gramasi (GSM)
            </label>
            <input
              type="number"
              value={fabricGsm}
              onChange={(e) => setFabricGsm(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="185"
              className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-1">
              Siluet Potongan
            </label>
            <input
              type="text"
              value={fitSilhouette}
              onChange={(e) => setFitSilhouette(e.target.value)}
              placeholder="Boxy Oversized Fit"
              className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-1">
              Komposisi Kain
            </label>
            <input
              type="text"
              value={fabricComposition}
              onChange={(e) => setFabricComposition(e.target.value)}
              placeholder="100% Ring Spun Combed Cotton"
              className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-1">
              Karakter Handfeel
            </label>
            <input
              type="text"
              value={fabricFeel}
              onChange={(e) => setFabricFeel(e.target.value)}
              placeholder="Halus, jatuh tegap, adem."
              className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-1">
              Teknik Sablon
            </label>
            <input
              type="text"
              value={printTechnique}
              onChange={(e) => setPrintTechnique(e.target.value)}
              placeholder="Plastisol Screen Printing / DTF"
              className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
            />
          </div>

          <div>
            <InputTag
              label="Titik Sablon"
              tags={printLocation}
              onChange={setPrintLocation}
              placeholder="Dada, Punggung, Lengan..."
            />
          </div>
        </div>
      </section>

      {/* 4. HARGA & VARIASI */}
      <section className="bg-[#25262B] border border-[#373A40] p-6 space-y-6">
        <div className="border-b border-[#373A40] pb-3 flex items-center justify-between">
          <h2 className="text-[#F1F3F5] text-base font-bold font-[family-name:var(--font-nohemi)] flex items-center gap-2">
            <span className="text-[#CDFF00]">04.</span> Harga & Variasi
          </h2>
          <span className="text-[10px] text-[#909296] font-[family-name:var(--font-space-mono)] uppercase">
            Penetapan Harga & Ukuran
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-1">
              Harga Jual (IDR)
            </label>
            <input
              type="number"
              value={priceIdr}
              onChange={(e) => setPriceIdr(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="145000 (kosongkan = Harga Menyusul)"
              className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#CDFF00] text-sm font-bold font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-1">
              Harga Coret Sebelum Diskon (Opsional)
            </label>
            <input
              type="number"
              value={originalPriceIdr}
              onChange={(e) => setOriginalPriceIdr(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="175000"
              className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#909296] text-sm font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
            />
          </div>
        </div>

        {/* Variasi Warna */}
        <EditorWarnaRepeater colors={colors} onChange={setColors} />

        {/* Ukuran Tersedia */}
        <div>
          <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-2">
            Ukuran Tersedia (Checklist)
          </label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_SIZES.map((sz) => {
              const active = sizesAvailable.includes(sz);
              return (
                <button
                  type="button"
                  key={sz}
                  onClick={() => handleSizeToggle(sz)}
                  className={`px-3 py-1.5 text-xs font-bold font-[family-name:var(--font-space-mono)] border transition-all ${
                    active
                      ? "bg-[#CDFF00] text-[#1A1B1E] border-[#CDFF00]"
                      : "bg-[#1A1B1E] text-[#909296] border-[#373A40] hover:border-[#F1F3F5]"
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tabel Panduan Ukuran */}
        <EditorTabelUkuran sizeChart={sizeChart} onChange={setSizeChart} />
      </section>

      {/* 5. MEDIA & FOTO */}
      <section className="bg-[#25262B] border border-[#373A40] p-6 space-y-4">
        <div className="border-b border-[#373A40] pb-3 flex items-center justify-between">
          <h2 className="text-[#F1F3F5] text-base font-bold font-[family-name:var(--font-nohemi)] flex items-center gap-2">
            <span className="text-[#CDFF00]">05.</span> Foto & Media
          </h2>
          <span className="text-[10px] text-[#909296] font-[family-name:var(--font-space-mono)] uppercase">
            Kamera Forensik
          </span>
        </div>

        <PemilihMedia
          label="Foto Depan (Tampak Utama) *"
          value={imageFront}
          onChange={setImageFront}
          helperText="Format WebP / PNG / JPG. Maks 5MB."
        />

        <PemilihMedia
          label="Foto Belakang (Opsional)"
          value={imageBack}
          onChange={setImageBack}
          helperText="Tampilan punggung baju jika ada."
        />

        <div>
          <InputTag
            label="Foto Galeri Detail Tambahan (Daftar URL)"
            tags={imageDetails}
            onChange={setImageDetails}
            placeholder="Tempel URL foto detail lalu tekan enter..."
          />
        </div>
      </section>

      {/* 6. INFO TAMBAHAN & TAUTAN */}
      <section className="bg-[#25262B] border border-[#373A40] p-6 space-y-4">
        <div className="border-b border-[#373A40] pb-3 flex items-center justify-between">
          <h2 className="text-[#F1F3F5] text-base font-bold font-[family-name:var(--font-nohemi)] flex items-center gap-2">
            <span className="text-[#CDFF00]">06.</span> Info Tambahan & Tautan
          </h2>
          <span className="text-[10px] text-[#909296] font-[family-name:var(--font-space-mono)] uppercase">
            Metadata
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-1">
              Info Batch Produksi
            </label>
            <input
              type="text"
              value={batchInfo}
              onChange={(e) => setBatchInfo(e.target.value)}
              placeholder="Batch 01 — Limited 50 pcs"
              className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-1">
              Info Model / Fitting
            </label>
            <input
              type="text"
              value={modelInfo}
              onChange={(e) => setModelInfo(e.target.value)}
              placeholder="Model 178 cm / 72 kg mengenakan L"
              className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-1">
            Tautan Shopee Resmi
          </label>
          <input
            type="url"
            value={shopeeUrl}
            onChange={(e) => setShopeeUrl(e.target.value)}
            placeholder="https://shopee.co.id/compaxgrup"
            className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
          />
        </div>

        <div>
          <InputTag
            label="Instruksi Perawatan (Care Instructions)"
            tags={careInstructions}
            onChange={setCareInstructions}
            placeholder="Tambah instruksi perawatan..."
          />
        </div>
      </section>

      {/* 7. KONTROL PUBLIKASI & AKSI SIMPAN */}
      <section className="bg-[#25262B] border border-[#373A40] p-6 space-y-4">
        <div className="border-b border-[#373A40] pb-3 flex items-center justify-between">
          <h2 className="text-[#F1F3F5] text-base font-bold font-[family-name:var(--font-nohemi)] flex items-center gap-2">
            <span className="text-[#CDFF00]">07.</span> Kontrol Publikasi
          </h2>
          <span className="text-[10px] text-[#909296] font-[family-name:var(--font-space-mono)] uppercase">
            Status Tayang
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#1A1B1E] border border-[#373A40]">
          <div>
            <div className="text-sm font-bold text-[#F1F3F5] font-[family-name:var(--font-nohemi)]">
              Status Berkas:{" "}
              {isPublished ? (
                <span className="text-[#51CF66]">🟢 LIVE (Dipublikasikan ke Web)</span>
              ) : (
                <span className="text-[#FFD43B]">🟡 DRAFT (Hanya terlihat di Admin)</span>
              )}
            </div>
            <p className="text-[#909296] text-[11px] font-[family-name:var(--font-space-mono)] mt-0.5">
              Draft tidak akan terlihat oleh publik di halaman katalog.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-[#909296] font-[family-name:var(--font-space-mono)]">
              Urutan Tampil:
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-16 px-2 py-1 bg-[#25262B] border border-[#373A40] text-[#F1F3F5] text-xs text-center font-bold font-[family-name:var(--font-space-mono)]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#373A40]">
          <Link
            href="/admin/produk"
            className="px-4 py-2.5 border border-[#373A40] text-[#909296] hover:text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider transition-colors"
          >
            ← Batal / Kembali
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setIsPublished(false);
                handleSubmit(false);
              }}
              className="px-5 py-2.5 border border-[#FFD43B]/60 text-[#FFD43B] hover:bg-[#FFD43B]/10 text-xs font-bold font-[family-name:var(--font-space-mono)] uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Simpan Sebagai Draft"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setIsPublished(true);
                handleSubmit(true);
              }}
              className="px-6 py-2.5 bg-[#CDFF00] text-[#1A1B1E] hover:bg-[#b8e600] text-xs font-bold font-[family-name:var(--font-space-mono)] uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Publikasikan Sekarang"}
            </button>
          </div>
        </div>
      </section>
    </form>
  );
}
