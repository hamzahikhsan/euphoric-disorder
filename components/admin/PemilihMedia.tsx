"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { createSupabaseBrowser } from "@/lib/supabase/client";

interface PemilihMediaProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  bucket?: string;
  folder?: string;
}

export default function PemilihMedia({
  label,
  value,
  onChange,
  helperText,
  bucket = "product-images",
  folder = "uploads",
}: PemilihMediaProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      // Dynamic import image compression
      const imageCompression = (await import("browser-image-compression")).default;
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        fileType: "image/webp",
      });

      const supabase = createSupabaseBrowser();
      const cleanFileName = `${Date.now()}-${file.name.replace(/\.[^/.]+$/, "")}.webp`;
      const filePath = `${folder}/${cleanFileName}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, compressed, {
          cacheControl: "3600",
          upsert: true,
          contentType: "image/webp",
        });

      if (error) {
        throw new Error(error.message);
      }

      // Ambil public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(data.path);

      onChange(publicUrl);
    } catch (err) {
      setUploadError(
        `Upload gagal: ${(err as Error).message}. Anda tetap bisa mengetikkan URL/path gambar secara manual.`
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider">
        {label}
      </label>

      <div className="flex gap-4 items-start">
        {/* Thumbnail Preview */}
        <div className="relative w-20 h-24 bg-[#1A1B1E] border border-[#373A40] flex items-center justify-center flex-shrink-0 overflow-hidden group">
          {value ? (
            <>
              {value.startsWith("/") || value.startsWith("http") ? (
                <Image
                  src={value}
                  alt={label}
                  fill
                  className="object-cover"
                  unoptimized={value.startsWith("/")}
                />
              ) : (
                <div className="text-[10px] text-[#555] p-1 text-center font-[family-name:var(--font-space-mono)] break-all">
                  {value}
                </div>
              )}
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[#FF6B6B] text-xs font-bold transition-opacity font-[family-name:var(--font-space-mono)]"
              >
                Hapus
              </button>
            </>
          ) : (
            <span className="text-xl opacity-40">🖼️</span>
          )}
        </div>

        {/* Input & Upload Controls */}
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="URL gambar atau path lokal (contoh: /img/products/candy-hoodie.png)"
            className="w-full px-3 py-2 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] placeholder:text-[#555] focus:outline-none focus:border-[#CDFF00] transition-colors"
          />

          <div className="flex items-center gap-2">
            <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#25262B] border border-[#373A40] text-[#CDFF00] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider cursor-pointer hover:border-[#CDFF00] transition-colors">
              <span>{uploading ? "Mengompres & Upload..." : "📁 Upload Foto"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>

            {helperText && (
              <span className="text-[10px] text-[#555] font-[family-name:var(--font-space-mono)]">
                {helperText}
              </span>
            )}
          </div>

          {uploadError && (
            <p className="text-[10px] text-[#FF6B6B] font-[family-name:var(--font-space-mono)]">
              ⚠ {uploadError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
