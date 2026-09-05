"use client";

export interface SizeItem {
  size: string;
  chest: number;
  length: number;
  sleeve: number;
}

const TSHIRT_PRESET: SizeItem[] = [
  { size: "S", chest: 52, length: 69, sleeve: 23 },
  { size: "M", chest: 55, length: 72, sleeve: 24 },
  { size: "L", chest: 58, length: 75, sleeve: 25 },
  { size: "XL", chest: 61, length: 78, sleeve: 26 },
  { size: "XXL", chest: 64, length: 80, sleeve: 27 },
];

const HOODIE_PRESET: SizeItem[] = [
  { size: "S", chest: 56, length: 68, sleeve: 60 },
  { size: "M", chest: 59, length: 71, sleeve: 62 },
  { size: "L", chest: 62, length: 74, sleeve: 64 },
  { size: "XL", chest: 65, length: 77, sleeve: 66 },
  { size: "XXL", chest: 68, length: 79, sleeve: 67 },
];

interface EditorTabelUkuranProps {
  sizeChart: SizeItem[];
  onChange: (chart: SizeItem[]) => void;
}

export default function EditorTabelUkuran({
  sizeChart,
  onChange,
}: EditorTabelUkuranProps) {
  const addRow = () => {
    onChange([...sizeChart, { size: "NEW", chest: 50, length: 70, sleeve: 22 }]);
  };

  const updateRow = (index: number, field: keyof SizeItem, value: string | number) => {
    const updated = [...sizeChart];
    updated[index] = {
      ...updated[index],
      [field]: field === "size" ? String(value) : Number(value) || 0,
    };
    onChange(updated);
  };

  const removeRow = (index: number) => {
    onChange(sizeChart.filter((_, i) => i !== index));
  };

  const applyPreset = (preset: SizeItem[]) => {
    onChange(preset);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider">
          Panduan Ukuran (Size Chart cm)
        </label>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#555] font-[family-name:var(--font-space-mono)]">
            Preset:
          </span>
          <button
            type="button"
            onClick={() => applyPreset(TSHIRT_PRESET)}
            className="px-2 py-0.5 text-[10px] bg-[#1A1B1E] border border-[#373A40] text-[#909296] hover:text-[#CDFF00] hover:border-[#CDFF00] transition-colors font-[family-name:var(--font-space-mono)]"
          >
            Kaos Boxy
          </button>
          <button
            type="button"
            onClick={() => applyPreset(HOODIE_PRESET)}
            className="px-2 py-0.5 text-[10px] bg-[#1A1B1E] border border-[#373A40] text-[#909296] hover:text-[#CDFF00] hover:border-[#CDFF00] transition-colors font-[family-name:var(--font-space-mono)]"
          >
            Hoodie Fleece
          </button>
          <button
            type="button"
            onClick={addRow}
            className="px-2 py-0.5 text-[10px] bg-[#25262B] border border-[#373A40] text-[#CDFF00] font-[family-name:var(--font-space-mono)] hover:border-[#CDFF00] transition-colors"
          >
            + Baris
          </button>
        </div>
      </div>

      {sizeChart.length === 0 ? (
        <div className="p-4 bg-[#1A1B1E] border border-dashed border-[#373A40] text-center text-xs text-[#555] font-[family-name:var(--font-space-mono)]">
          Ukuran belum diatur. Gunakan tombol preset di atas atau tambah baris baru.
        </div>
      ) : (
        <div className="overflow-x-auto border border-[#373A40]">
          <table className="w-full text-left text-xs font-[family-name:var(--font-space-mono)]">
            <thead className="bg-[#1A1B1E] text-[#909296] border-b border-[#373A40] uppercase text-[10px]">
              <tr>
                <th className="py-2 px-3">Size</th>
                <th className="py-2 px-3">Lebar Dada (cm)</th>
                <th className="py-2 px-3">Panjang (cm)</th>
                <th className="py-2 px-3">Lengan (cm)</th>
                <th className="py-2 px-2 text-center w-10">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#373A40] bg-[#25262B]">
              {sizeChart.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#2C2E33]/50">
                  <td className="py-1.5 px-3">
                    <input
                      type="text"
                      value={row.size}
                      onChange={(e) => updateRow(idx, "size", e.target.value)}
                      className="w-16 px-2 py-1 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs font-bold text-center focus:border-[#CDFF00] focus:outline-none"
                    />
                  </td>
                  <td className="py-1.5 px-3">
                    <input
                      type="number"
                      value={row.chest}
                      onChange={(e) => updateRow(idx, "chest", e.target.value)}
                      className="w-20 px-2 py-1 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs focus:border-[#CDFF00] focus:outline-none"
                    />
                  </td>
                  <td className="py-1.5 px-3">
                    <input
                      type="number"
                      value={row.length}
                      onChange={(e) => updateRow(idx, "length", e.target.value)}
                      className="w-20 px-2 py-1 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs focus:border-[#CDFF00] focus:outline-none"
                    />
                  </td>
                  <td className="py-1.5 px-3">
                    <input
                      type="number"
                      value={row.sleeve}
                      onChange={(e) => updateRow(idx, "sleeve", e.target.value)}
                      className="w-20 px-2 py-1 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5] text-xs focus:border-[#CDFF00] focus:outline-none"
                    />
                  </td>
                  <td className="py-1.5 px-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeRow(idx)}
                      className="text-[#909296] hover:text-[#FF6B6B] transition-colors text-xs"
                      title="Hapus baris"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
