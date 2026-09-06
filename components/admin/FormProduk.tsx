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
      setErrorMsg("Slug URL wajib diisi.");
      return;
    }
    if (!priceIdr || Number(priceIdr) <= 0) {
      setErrorMsg("Harga produk valid wajib diisi.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const payload = {
      id: initialData?.id,
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
      price_idr: Number(priceIdr),
      original_price_idr: originalPriceIdr === "" ? null : Number(originalPriceIdr),
      colors,
      sizes_available: sizesAvailable,
      size_chart: sizeChart,
      image_front: imageFront,
      image_back: imageBack || null,
      image_details: imageDetails,
      image_lookbook: initialData?.image_lookbook || [],
      care_instructions: careInstructions,
      batch_info: batchInfo,
      model_info: modelInfo || null,
      shopee_url: shopeeUrl || null,
      sort_order: Number(sortOrder) || 1,
      is_published: publishStatus,
    };

    const res = await saveProduct(payload, isEdit);

    setLoading(false);

    if (res.ok) {
      setSuccessMsg(
        isEdit
          ? "Berkas perkara berhasil diperbarui!"
          : "Berkas perkara baru berhasil didaftarkan!"
      );
      setTimeout(() => {
        router.push("/admin/produk");
        router.refresh();
      }, 800);
    } else {
      setErrorMsg(`Gagal menyimpan: ${res.error}`);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl font-mono">
      {/* Sticky Action Topbar */}
      <div className="sticky top-16 z-20 bg-forest/95 backdrop-blur-md border border-bone/15 p-4 flex flex-wrap items-center justify-between gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/produk"
            className="text-xs text-bone-dim hover:text-lime uppercase tracking-wider transition-colors"
          >
            ← Kembali
          </Link>
          <span className="text-bone-dim/40">•</span>
          <span className="text-xs font-bold text-bone font-display">
            {isEdit ? `Edit: ${initialData?.name || slug}` : "Registrasi Bukti Baru"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit(false)}
            className="px-4 py-2 border border-bone/20 text-bone hover:border-lime hover:text-lime text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan Draft"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit(true)}
            className="px-5 py-2 bg-lime text-forest-deep text-xs font-bold uppercase tracking-wider hover:bg-lime/90 active:scale-[0.98] transition-all disabled:opacity-50 shadow-[0_2px_12px_rgba(205,255,0,0.2)]"
          >
            {loading ? "Menyimpan..." : "Siarkan (Live) ↗"}
          </button>
        </div>
      </div>

      {/* Alert Messages */}
      {errorMsg && (
        <div className="p-4 bg-red-950/40 border border-red-500/50 text-red-400 text-xs flex items-center gap-3">
          <span className="text-base">⚠️</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-lime/10 border border-lime/50 text-lime text-xs flex items-center gap-3">
          <span className="text-base">✓</span>
          <span>{successMsg}</span>
        </div>
      )}

      {/* 1. IDENTITAS BERKAS PERKARA */}
      <section className="bg-forest border border-bone/15 p-6 sm:p-8 space-y-5">
        <div className="border-b border-bone/10 pb-4 flex items-center justify-between">
          <h2 className="text-bone text-base sm:text-lg font-bold font-display flex items-center gap-2">
            <span className="text-lime">01.</span> Identitas Berkas Perkara
          </h2>
          <span className="text-[10px] text-bone-dim uppercase tracking-wider">
            Data Utama
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-bone-dim text-xs uppercase tracking-wider mb-1">
              Nama Produk / Artikel *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Contoh: Kaos #WarOnDrugs — M15"
              className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-bone-dim text-xs uppercase tracking-wider mb-1">
              Slug URL (Unik) *
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="warondrugs-m15"
              className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-bone-dim text-xs uppercase tracking-wider mb-1">
              Nomor Subjek
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="015"
              className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-bone-dim text-xs uppercase tracking-wider mb-1">
              Kode Arsip Kasus (Case ID)
            </label>
            <input
              type="text"
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              placeholder="ED-CASE-015"
              className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-lime text-xs font-bold focus:border-lime focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-bone-dim text-xs uppercase tracking-wider mb-1">
            Tagline / Slogan Ringkas
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Satu kalimat tajam perihal latar belakang karya..."
            className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-bone-dim text-xs uppercase tracking-wider mb-1">
              Status Ketersediaan Rilis
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProductRow["status"])}
              className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
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
              label="Kategori / Klasifikasi Kasus"
              tags={filedUnder}
              onChange={setFiledUnder}
              placeholder="War on Drugs, Boxy T-Shirt..."
            />
          </div>
        </div>
      </section>

      {/* 2. NARASI & CERITA FORENSIK */}
      <section className="bg-forest border border-bone/15 p-6 sm:p-8 space-y-5">
        <div className="border-b border-bone/10 pb-4 flex items-center justify-between">
          <h2 className="text-bone text-base sm:text-lg font-bold font-display flex items-center gap-2">
            <span className="text-lime">02.</span> Narasi & Deskripsi Forensik
          </h2>
          <span className="text-[10px] text-bone-dim uppercase tracking-wider">
            Storytelling
          </span>
        </div>

        <div>
          <label className="block text-bone-dim text-xs uppercase tracking-wider mb-1">
            Ringkasan Singkat (Untuk Kartu Katalog)
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsi singkat 1-2 kalimat untuk preview katalog..."
            className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-bone-dim text-xs uppercase tracking-wider mb-1">
            Cerita Forensik Mendalam (Halaman Detail Artikel)
          </label>
          <textarea
            rows={6}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Narasi latar belakang, filosofi kejahatan sebagai bahan kajian, kritik sosial, dan detail visual..."
            className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none leading-relaxed"
          />
        </div>
      </section>

      {/* 3. SPESIFIKASI BAHAN & SABLON */}
      <section className="bg-forest border border-bone/15 p-6 sm:p-8 space-y-5">
        <div className="border-b border-bone/10 pb-4 flex items-center justify-between">
          <h2 className="text-bone text-base sm:text-lg font-bold font-display flex items-center gap-2">
            <span className="text-lime">03.</span> Spesifikasi Bahan & Sablon
          </h2>
          <span className="text-[10px] text-bone-dim uppercase tracking-wider">
            Kualitas Fisik
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-bone-dim text-xs uppercase tracking-wider mb-1">
              Bahan Utama Kain
            </label>
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="Cotton Combed 24s"
              className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-bone-dim text-xs uppercase tracking-wider mb-1">
              Gramasi (GSM)
            </label>
            <input
              type="number"
              value={fabricGsm}
              onChange={(e) => setFabricGsm(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="185"
              className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-bone-dim text-xs uppercase tracking-wider mb-1">
              Siluet Potongan
            </label>
            <input
              type="text"
              value={fitSilhouette}
              onChange={(e) => setFitSilhouette(e.target.value)}
              placeholder="Boxy Oversized Fit"
              className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-bone-dim text-xs uppercase tracking-wider mb-1">
              Komposisi Kain
            </label>
            <input
              type="text"
              value={fabricComposition}
              onChange={(e) => setFabricComposition(e.target.value)}
              placeholder="100% Ring Spun Combed Cotton"
              className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-bone-dim text-xs uppercase tracking-wider mb-1">
              Karakter Handfeel
            </label>
            <input
              type="text"
              value={fabricFeel}
              onChange={(e) => setFabricFeel(e.target.value)}
              placeholder="Halus, jatuh tegap, sejuk."
              className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-bone-dim text-xs uppercase tracking-wider mb-1">
              Teknik Sablon
            </label>
            <input
              type="text"
              value={printTechnique}
              onChange={(e) => setPrintTechnique(e.target.value)}
              placeholder="Plastisol Screen Printing"
              className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
            />
          </div>

          <div>
            <InputTag
              label="Titik Penempatan Sablon"
              tags={printLocation}
              onChange={setPrintLocation}
              placeholder="Dada Depan, Punggung..."
            />
          </div>
        </div>
      </section>

      {/* 4. HARGA, VARIASI WARNA & UKURAN */}
      <section className="bg-forest border border-bone/15 p-6 sm:p-8 space-y-6">
        <div className="border-b border-bone/10 pb-4 flex items-center justify-between">
          <h2 className="text-bone text-base sm:text-lg font-bold font-display flex items-center gap-2">
            <span className="text-lime">04.</span> Harga & Variasi Produk
          </h2>
          <span className="text-[10px] text-bone-dim uppercase tracking-wider">
            Katalog & Fitting
          </span>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-bone-dim text-xs uppercase tracking-wider mb-1">
              Harga Jual (IDR) *
            </label>
            <input
              type="number"
              required
              value={priceIdr}
              onChange={(e) => setPriceIdr(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="145000"
              className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-lime text-sm font-bold focus:border-lime focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-bone-dim text-xs uppercase tracking-wider mb-1">
              Harga Coret Diskon (Opsional)
            </label>
            <input
              type="number"
              value={originalPriceIdr}
              onChange={(e) =>
                setOriginalPriceIdr(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="185000"
              className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-sm focus:border-lime focus:outline-none"
            />
          </div>
        </div>

        {/* Sizes Available */}
        <div>
          <label className="block text-bone-dim text-xs uppercase tracking-wider mb-2">
            Pilihan Ukuran Tersedia
          </label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_SIZES.map((sz) => {
              const active = sizesAvailable.includes(sz);
              return (
                <button
                  key={sz}
                  type="button"
                  onClick={() => handleSizeToggle(sz)}
                  className={`w-12 h-10 border text-xs font-bold transition-all ${
                    active
                      ? "bg-lime text-forest-deep border-lime shadow-sm"
                      : "bg-forest-deep text-bone-dim border-bone/20 hover:text-bone hover:border-lime/50"
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </div>

        {/* Color Repeater Component */}
        <div className="pt-2 border-t border-bone/10">
          <EditorWarnaRepeater colors={colors} onChange={setColors} />
        </div>

        {/* Size Chart Matrix */}
        <div className="pt-2 border-t border-bone/10">
          <EditorTabelUkuran sizeChart={sizeChart} onChange={setSizeChart} />
        </div>
      </section>

      {/* 5. BUKTI FOTO VISUAL */}
      <section className="bg-forest border border-bone/15 p-6 sm:p-8 space-y-6">
        <div className="border-b border-bone/10 pb-4 flex items-center justify-between">
          <h2 className="text-bone text-base sm:text-lg font-bold font-display flex items-center gap-2">
            <span className="text-lime">05.</span> Galeri Bukti Foto Visual
          </h2>
          <span className="text-[10px] text-bone-dim uppercase tracking-wider">
            Media Storage
          </span>
        </div>

        <PemilihMedia
          label="Foto Bukti Utama (Tampak Depan) *"
          value={imageFront}
          onChange={setImageFront}
          helperText="Rekomendasi rasio 4:5 atau 1:1, format WebP."
        />

        <PemilihMedia
          label="Foto Bukti Tampak Belakang (Opsional)"
          value={imageBack}
          onChange={setImageBack}
          helperText="Menampilkan detail sablon atau jahitan punggung."
        />

        <InputTag
          label="Foto Bukti Tambahan / Detail Close-up (URL)"
          tags={imageDetails}
          onChange={setImageDetails}
          placeholder="Tempel URL gambar detail lalu tekan Enter..."
          helperText="Foto tekstur sablon, label woven, hangtag, atau fitting."
        />
      </section>

      {/* 6. INFORMASI DISTRIBUSI & MODEL */}
      <section className="bg-forest border border-bone/15 p-6 sm:p-8 space-y-5">
        <div className="border-b border-bone/10 pb-4 flex items-center justify-between">
          <h2 className="text-bone text-base sm:text-lg font-bold font-display flex items-center gap-2">
            <span className="text-lime">06.</span> Atribut Distribusi & Model
          </h2>
          <span className="text-[10px] text-bone-dim uppercase tracking-wider">
            Metadata
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-bone-dim text-xs uppercase tracking-wider mb-1">
              Informasi Model Fitting
            </label>
            <input
              type="text"
              value={modelInfo}
              onChange={(e) => setModelInfo(e.target.value)}
              placeholder="Contoh: Model pria 178 cm / 72 kg mengenakan Size L"
              className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-bone-dim text-xs uppercase tracking-wider mb-1">
              Status Batch / Rilis
            </label>
            <input
              type="text"
              value={batchInfo}
              onChange={(e) => setBatchInfo(e.target.value)}
              placeholder="Katalog Reguler — Ready Stock Kemayoran"
              className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-bone-dim text-xs uppercase tracking-wider mb-1">
              Tautan Marketplace Shopee
            </label>
            <input
              type="text"
              value={shopeeUrl}
              onChange={(e) => setShopeeUrl(e.target.value)}
              placeholder="https://shopee.co.id/compaxgrup/..."
              className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-bone-dim text-xs uppercase tracking-wider mb-1">
              Urutan Tampil (Sort Order)
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value) || 1)}
              placeholder="1"
              className="w-full px-3.5 py-2.5 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
            />
          </div>
        </div>

        <InputTag
          label="Petunjuk Perawatan Apparel"
          tags={careInstructions}
          onChange={setCareInstructions}
          placeholder="Ketik instruksi cuci lalu tekan Enter..."
        />
      </section>

      {/* Bottom Save Station */}
      <div className="p-6 bg-forest border border-bone/15 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs text-bone-dim block">
            Status Berkas: <strong className="text-bone">{isPublished ? "SIARAN AKTIF (LIVE)" : "DRAFT TERTUTUP"}</strong>
          </span>
          <span className="text-[10px] text-bone-dim/60">
            Pastikan seluruh data spesifikasi teknis dan gambar telah diverifikasi.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit(false)}
            className="px-5 py-2.5 border border-bone/20 text-bone hover:border-lime hover:text-lime text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan Draft"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit(true)}
            className="px-6 py-2.5 bg-lime text-forest-deep text-xs font-bold uppercase tracking-wider hover:bg-lime/90 active:scale-[0.98] transition-all disabled:opacity-50 shadow-[0_4px_16px_rgba(205,255,0,0.2)]"
          >
            {loading ? "Menyimpan..." : "Siarkan ke Publik (Live) ↗"}
          </button>
        </div>
      </div>
    </div>
  );
}
