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
    <div className="space-y-1.5">
      <label className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider">
        {label}
      </label>

      <div className="min-h-[44px] p-2 bg-[#1A1B1E] border border-[#373A40] focus-within:border-[#CDFF00] flex flex-wrap gap-1.5 items-center transition-colors">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#25262B] border border-[#373A40] text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)]"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(idx)}
              className="text-[#909296] hover:text-[#FF6B6B] text-xs leading-none"
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
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[140px] bg-transparent border-none text-[#F1F3F5] text-xs font-[family-name:var(--font-space-mono)] placeholder:text-[#555] focus:outline-none"
        />
      </div>

      {helperText && (
        <p className="text-[10px] text-[#555] font-[family-name:var(--font-space-mono)]">
          {helperText}
        </p>
      )}
    </div>
  );
}
