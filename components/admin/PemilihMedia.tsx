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
    <div className="space-y-2 font-mono">
      <label className="block text-bone-dim text-xs uppercase tracking-wider">
        {label}
      </label>

      <div className="flex gap-4 items-start">
        {/* Thumbnail Preview with Forensic Scale Marks */}
        <div className="relative w-20 h-24 bg-forest-deep border border-bone/20 flex items-center justify-center flex-shrink-0 overflow-hidden group">
          {/* Scale Marks */}
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-lime/30 z-10 pointer-events-none flex flex-col justify-between py-1">
            <span className="w-full h-px bg-forest-deep" />
            <span className="w-full h-px bg-forest-deep" />
            <span className="w-full h-px bg-forest-deep" />
          </div>

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
                <div className="text-[10px] text-bone-dim p-1 text-center break-all">
                  {value}
                </div>
              )}
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute inset-0 bg-forest-deep/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 text-xs font-bold transition-opacity"
              >
                Hapus
              </button>
            </>
          ) : (
            <span className="text-[10px] text-bone-dim/40 text-center px-1">[KOSONG]</span>
          )}
        </div>

        {/* Input & Upload Controls */}
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="URL gambar atau path lokal (contoh: /img/products/candy-hoodie.png)"
            className="w-full px-3 py-2 bg-forest-deep border border-bone/20 text-bone text-xs placeholder:text-bone-dim/30 focus:outline-none focus:border-lime transition-colors"
          />

          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest border border-lime/40 text-lime text-xs uppercase tracking-wider cursor-pointer hover:bg-lime hover:text-forest-deep font-bold transition-all">
              <span>{uploading ? "Mengompres & Upload..." : "Upload Foto Bukti"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>

            {helperText && (
              <span className="text-[10px] text-bone-dim/60">
                {helperText}
              </span>
            )}
          </div>

          {uploadError && (
            <p className="text-[10px] text-red-400 bg-red-950/20 border border-red-500/30 p-2">
              ⚠️ {uploadError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
