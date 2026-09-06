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
    onChange([...colors, { name: "Dark Olive Green", hex: "#2C3221" }]);
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
    <div className="space-y-3 font-mono">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-bone-dim text-xs uppercase tracking-wider">
            Palet Warna & Swatch Barang Bukti
          </label>
          <span className="text-[10px] text-bone-dim/60">
            Daftar opsi warna kain yang dapat dipilih pembeli di halaman produk.
          </span>
        </div>
        <button
          type="button"
          onClick={addColor}
          className="px-3 py-1.5 text-xs bg-forest border border-lime/40 text-lime uppercase hover:bg-lime hover:text-forest-deep font-bold transition-all"
        >
          + Tambah Warna
        </button>
      </div>

      {colors.length === 0 ? (
        <div className="p-6 bg-forest-deep border border-dashed border-bone/20 text-center text-xs text-bone-dim/60">
          Belum ada palet warna yang didaftarkan. Klik &quot;+ Tambah Warna&quot; untuk memulai.
        </div>
      ) : (
        <div className="space-y-2">
          {colors.map((c, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 bg-forest-deep border border-bone/20 hover:border-lime/30 transition-colors"
            >
              {/* Color picker circle */}
              <div
                className="relative w-8 h-8 rounded-none flex-shrink-0 border border-bone/30 overflow-hidden shadow-sm"
                style={{ backgroundColor: c.hex }}
              >
                <input
                  type="color"
                  value={c.hex}
                  onChange={(e) => updateColor(idx, "hex", e.target.value)}
                  className="absolute inset-[-8px] w-[200%] h-[200%] cursor-pointer opacity-0"
                />
              </div>

              {/* Hex text input */}
              <input
                type="text"
                value={c.hex}
                onChange={(e) => updateColor(idx, "hex", e.target.value)}
                placeholder="#000000"
                maxLength={7}
                className="w-24 px-2.5 py-1.5 bg-forest border border-bone/20 text-lime text-xs font-mono uppercase focus:outline-none focus:border-lime"
              />

              {/* Name input */}
              <input
                type="text"
                value={c.name}
                onChange={(e) => updateColor(idx, "name", e.target.value)}
                placeholder="Nama Varian (Contoh: Vintage Washed Black)"
                className="flex-1 px-3 py-1.5 bg-forest border border-bone/20 text-bone text-xs font-mono focus:outline-none focus:border-lime"
              />

              {/* Remove button */}
              <button
                type="button"
                onClick={() => removeColor(idx)}
                className="px-2 py-1 text-xs text-bone-dim hover:text-red-400 transition-colors"
                title="Hapus variasi warna"
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
