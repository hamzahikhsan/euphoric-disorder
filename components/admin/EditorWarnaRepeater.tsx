"use client";

export interface ColorItem {
  name: string;
  hex: string;
}

interface EditorWarnaRepeaterProps {
  colors: ColorItem[];
  onChange: (colors: ColorItem[]) => void;
}

export default function EditorWarnaRepeater({
  colors,
  onChange,
}: EditorWarnaRepeaterProps) {
  const addColor = () => {
    onChange([...colors, { name: "Warna Baru", hex: "#121212" }]);
  };

  const updateColor = (index: number, field: keyof ColorItem, value: string) => {
    const updated = [...colors];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeColor = (index: number) => {
    onChange(colors.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider">
          Variasi Warna Produk
        </label>
        <button
          type="button"
          onClick={addColor}
          className="px-2.5 py-1 text-[11px] bg-[#25262B] border border-[#373A40] text-[#CDFF00] font-[family-name:var(--font-space-mono)] uppercase hover:border-[#CDFF00] transition-colors"
        >
          + Tambah Warna
        </button>
      </div>

      {colors.length === 0 ? (
        <div className="p-4 bg-[#1A1B1E] border border-dashed border-[#373A40] text-center text-xs text-[#555] font-[family-name:var(--font-space-mono)]">
          Belum ada variasi warna. Klik &quot;+ Tambah Warna&quot; untuk menambahkan.
        </div>
      ) : (
        <div className="space-y-2">
          {colors.map((c, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 p-2 bg-[#1A1B1E] border border-[#373A40]"
            >
              {/* Color picker swatch */}
              <div className="relative w-8 h-8 flex-shrink-0 border border-[#373A40] overflow-hidden">
                <input
                  type="color"
                  value={c.hex}
                  onChange={(e) => updateColor(idx, "hex", e.target.value)}
                  className="absolute inset-[-8px] w-[200%] h-[200%] cursor-pointer border-0"
                />
              </div>

              {/* Hex text input */}
              <input
                type="text"
                value={c.hex}
                onChange={(e) => updateColor(idx, "hex", e.target.value)}
                placeholder="#000000"
                maxLength={7}
                className="w-24 px-2 py-1.5 bg-[#25262B] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] uppercase focus:outline-none focus:border-[#CDFF00]"
              />

              {/* Name input */}
              <input
                type="text"
                value={c.name}
                onChange={(e) => updateColor(idx, "name", e.target.value)}
                placeholder="Nama warna (contoh: Deep Pitch Black)"
                className="flex-1 px-3 py-1.5 bg-[#25262B] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] focus:outline-none focus:border-[#CDFF00]"
              />

              {/* Remove button */}
              <button
                type="button"
                onClick={() => removeColor(idx)}
                className="px-2 py-1 text-xs text-[#909296] hover:text-[#FF6B6B] transition-colors"
                title="Hapus varian warna"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
