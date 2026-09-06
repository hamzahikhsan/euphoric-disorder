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
    <div className="space-y-3 font-mono">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <label className="block text-bone-dim text-xs uppercase tracking-wider">
            Matriks Spesifikasi Ukuran (Size Chart cm)
          </label>
          <span className="text-[10px] text-bone-dim/60">
            Panduan dimensi fisik apparel untuk referensi fitting pembeli.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-bone-dim/60 uppercase">
            Preset:
          </span>
          <button
            type="button"
            onClick={() => applyPreset(TSHIRT_PRESET)}
            className="px-2.5 py-1 text-[10px] bg-forest-deep border border-bone/20 text-bone-dim hover:text-lime hover:border-lime transition-colors"
          >
            Kaos Boxy (S-XXL)
          </button>
          <button
            type="button"
            onClick={() => applyPreset(HOODIE_PRESET)}
            className="px-2.5 py-1 text-[10px] bg-forest-deep border border-bone/20 text-bone-dim hover:text-lime hover:border-lime transition-colors"
          >
            Hoodie Boxy (S-XXL)
          </button>
          <button
            type="button"
            onClick={addRow}
            className="px-2.5 py-1 text-[10px] bg-forest border border-lime/40 text-lime hover:bg-lime hover:text-forest-deep font-bold transition-all"
          >
            + Tambah Baris
          </button>
        </div>
      </div>

      {sizeChart.length === 0 ? (
        <div className="p-6 bg-forest-deep border border-dashed border-bone/20 text-center text-xs text-bone-dim/60">
          Matriks ukuran belum diatur. Gunakan tombol preset di atas untuk konfigurasi instan.
        </div>
      ) : (
        <div className="overflow-x-auto border border-bone/15">
          <table className="w-full text-left text-xs">
            <thead className="bg-forest-deep text-bone-dim border-b border-bone/15 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Size Tag</th>
                <th className="py-2.5 px-3">Lebar Dada (cm)</th>
                <th className="py-2.5 px-3">Panjang Badan (cm)</th>
                <th className="py-2.5 px-3">Panjang Lengan (cm)</th>
                <th className="py-2.5 px-2 text-center w-10">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bone/10 bg-forest">
              {sizeChart.map((row, idx) => (
                <tr key={idx} className="hover:bg-forest-deep/60 transition-colors">
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={row.size}
                      onChange={(e) => updateRow(idx, "size", e.target.value)}
                      className="w-16 px-2 py-1 bg-forest-deep border border-bone/20 text-lime text-xs font-bold text-center focus:border-lime focus:outline-none"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="number"
                      value={row.chest}
                      onChange={(e) => updateRow(idx, "chest", e.target.value)}
                      className="w-20 px-2 py-1 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="number"
                      value={row.length}
                      onChange={(e) => updateRow(idx, "length", e.target.value)}
                      className="w-20 px-2 py-1 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
                    />
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="number"
                      value={row.sleeve}
                      onChange={(e) => updateRow(idx, "sleeve", e.target.value)}
                      className="w-20 px-2 py-1 bg-forest-deep border border-bone/20 text-bone text-xs focus:border-lime focus:outline-none"
                    />
                  </td>
                  <td className="py-2 px-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeRow(idx)}
                      className="text-bone-dim hover:text-red-400 transition-colors text-xs p-1"
                      title="Hapus baris ukuran"
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
