"use client";

import { useState, KeyboardEvent } from "react";

interface InputTagProps {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  helperText?: string;
}

export default function InputTag({
  label,
  tags,
  onChange,
  placeholder = "Ketik lalu tekan Enter atau koma...",
  helperText,
}: InputTagProps) {
  const [inputVal, setInputVal] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = inputVal.trim().replace(/^,|,$/g, "");
      if (val && !tags.includes(val)) {
        onChange([...tags, val]);
        setInputVal("");
      }
    } else if (e.key === "Backspace" && !inputVal && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="space-y-1.5 font-mono">
      <label className="block text-bone-dim text-xs uppercase tracking-wider">
        {label}
      </label>

      <div className="min-h-[44px] p-2 bg-forest-deep border border-bone/20 focus-within:border-lime focus-within:ring-1 focus-within:ring-lime flex flex-wrap gap-2 items-center transition-colors">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-forest border border-bone/20 text-lime text-xs font-mono group"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(idx)}
              className="text-bone-dim hover:text-red-400 text-sm leading-none transition-colors"
              title="Hapus tag"
            >
              ×
            </button>
          </span>
        ))}

        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : "Tambah lagi..."}
          className="flex-1 min-w-[140px] bg-transparent border-none text-bone text-xs font-mono placeholder:text-bone-dim/40 focus:outline-none"
        />
      </div>

      {helperText && (
        <p className="text-[10px] text-bone-dim/60">
          {helperText}
        </p>
      )}
    </div>
  );
}
