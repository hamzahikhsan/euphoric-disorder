"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { createSupabaseBrowser } from "@/lib/supabase/client";

interface MediaItem {
  name: string;
  url: string;
  size?: string;
  type?: string;
}

const STATIC_MEDIA: MediaItem[] = [
  { name: "candy-hoodie.png", url: "/img/products/candy-hoodie.png", size: "320 KB", type: "Katalog" },
  { name: "warondrugs-m3.png", url: "/img/products/warondrugs-m3.png", size: "280 KB", type: "Katalog" },
  { name: "warondrugs-m7.png", url: "/img/products/warondrugs-m7.png", size: "295 KB", type: "Katalog" },
  { name: "warondrugs-m8.png", url: "/img/products/warondrugs-m8.png", size: "260 KB", type: "Katalog" },
  { name: "warondrugs-m14.png", url: "/img/products/warondrugs-m14.png", size: "275 KB", type: "Katalog" },
  { name: "warondrugs-s4.png", url: "/img/products/warondrugs-s4.png", size: "310 KB", type: "Katalog" },
  { name: "warondrugs-s4b.png", url: "/img/products/warondrugs-s4b.png", size: "315 KB", type: "Katalog" },
  { name: "shirt-gray.png", url: "/img/shirt-gray.png", size: "240 KB", type: "Mockup" },
  { name: "shirt-green.png", url: "/img/shirt-green.png", size: "245 KB", type: "Mockup" },
  { name: "hero-tee.png", url: "/img/hero-tee.png", size: "450 KB", type: "Aset Web" },
];

export default function MediaLibrary() {
  const [items, setItems] = useState<MediaItem[]>(STATIC_MEDIA);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [selectedBucket, setSelectedBucket] = useState("product-images");

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const imageCompression = (await import("browser-image-compression")).default;
      const supabase = createSupabaseBrowser();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const compressed = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1600,
          useWebWorker: true,
          fileType: "image/webp",
        });

        const fileName = `${Date.now()}-${file.name.replace(/\.[^/.]+$/, "")}.webp`;
        const filePath = `library/${fileName}`;

        const { data, error } = await supabase.storage
          .from(selectedBucket)
          .upload(filePath, compressed, {
            cacheControl: "3600",
            upsert: true,
            contentType: "image/webp",
          });

        if (!error && data) {
          const {
            data: { publicUrl },
          } = supabase.storage.from(selectedBucket).getPublicUrl(data.path);

          setItems((prev) => [
            {
              name: fileName,
              url: publicUrl,
              size: `${Math.round(compressed.size / 1024)} KB`,
              type: "Supabase CDN",
            },
            ...prev,
          ]);
        }
      }
    } catch (err) {
      alert(`Upload gagal: ${(err as Error).message}`);
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Upload card */}
      <div className="bg-[#25262B] border border-[#373A40] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-[#F1F3F5] text-base font-bold font-[family-name:var(--font-nohemi)]">
              Unggah Media Baru
            </h2>
            <p className="text-[#909296] text-xs font-[family-name:var(--font-space-mono)] mt-1">
              Gambar akan otomatis dikompres ke format WebP sebelum diunggah ke CDN.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedBucket}
              onChange={(e) => setSelectedBucket(e.target.value)}
              className="px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:border-[#CDFF00] focus:outline-none"
            >
              <option value="product-images">product-images (5MB)</option>
              <option value="site-assets">site-assets (10MB)</option>
            </select>

            <label className="px-5 py-2.5 bg-[#CDFF00] text-[#1A1B1E] text-xs font-bold font-[family-name:var(--font-space-mono)] uppercase tracking-wider cursor-pointer hover:bg-[#b8e600] transition-colors">
              <span>{uploading ? "Mengompres & Upload..." : "📁 Pilih Gambar"}</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#25262B] border border-[#373A40] p-3 flex flex-col justify-between group hover:border-[#CDFF00] transition-colors"
          >
            {/* Thumbnail */}
            <div className="relative w-full aspect-square bg-[#1A1B1E] border border-[#373A40] overflow-hidden mb-3">
              <Image
                src={item.url}
                alt={item.name}
                fill
                className="object-contain p-2"
                unoptimized={item.url.startsWith("/")}
              />
            </div>

            {/* Info */}
            <div className="space-y-1 mb-3">
              <div
                className="text-[#F1F3F5] text-xs font-bold font-[family-name:var(--font-space-mono)] truncate"
                title={item.name}
              >
                {item.name}
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#909296] font-[family-name:var(--font-space-mono)]">
                <span>{item.type}</span>
                <span>{item.size}</span>
              </div>
            </div>

            {/* Copy button */}
            <button
              type="button"
              onClick={() => copyToClipboard(item.url)}
              className="w-full py-1.5 px-2 bg-[#1A1B1E] border border-[#373A40] hover:border-[#CDFF00] text-[#CDFF00] text-[10px] font-bold font-[family-name:var(--font-space-mono)] uppercase tracking-wider transition-colors"
            >
              {copiedUrl === item.url ? "✓ Tersalin!" : "Salin URL"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
