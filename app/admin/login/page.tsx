"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAdmin, type AuthState } from "@/app/actions/admin/auth";
import { useState } from "react";
import Link from "next/link";

function TombolMasuk() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3.5 px-6 bg-lime text-forest-deep font-bold uppercase tracking-widest
                 hover:bg-lime/90 active:scale-[0.99] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed
                 font-mono text-xs flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(205,255,0,0.2)]"
    >
      {pending ? (
        <>
          <svg className="animate-spin h-4 w-4 text-forest-deep" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>MEMVERIFIKASI OTORISASI...</span>
        </>
      ) : (
        <>
          <span>BUKA ARSIP MARKAS</span>
          <span className="font-display font-bold">→</span>
        </>
      )}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState<AuthState, FormData>(loginAdmin, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-forest-deep flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Topographic / Forensic Grid Watermark */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#CDFF00 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-lime/5 blur-3xl pointer-events-none -top-20 -left-20" />
      <div className="absolute w-96 h-96 rounded-full bg-forest/40 blur-3xl pointer-events-none -bottom-20 -right-20" />

      <div className="relative w-full max-w-md z-10">
        {/* Top telemetry banner */}
        <div className="flex items-center justify-between text-[10px] font-mono text-bone-dim/60 mb-3 px-1">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse inline-block" />
            KLASIFIKASI: TERTUTUP // LEVEL 1
          </span>
          <span>ED-SYS-AUTH</span>
        </div>

        {/* Dossier Card Container */}
        <div className="bg-forest border border-lime/30 p-8 sm:p-10 relative shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {/* Tactical Corner Crosshairs */}
          <div className="absolute top-2 left-2 text-lime/40 font-mono text-[10px] select-none">+</div>
          <div className="absolute top-2 right-2 text-lime/40 font-mono text-[10px] select-none">+</div>
          <div className="absolute bottom-2 left-2 text-lime/40 font-mono text-[10px] select-none">+</div>
          <div className="absolute bottom-2 right-2 text-lime/40 font-mono text-[10px] select-none">+</div>

          {/* Header Monogram & Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 border border-lime bg-forest-deep mb-4 relative shadow-[0_0_15px_rgba(205,255,0,0.15)]">
              <span className="text-lime font-display font-bold text-2xl tracking-tighter">ED</span>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-lime" />
            </div>

            <h1 className="text-bone text-2xl font-bold font-display tracking-tight">
              euphoric.disorder
            </h1>
            <div className="inline-block mt-2 px-2.5 py-0.5 border border-bone/15 bg-forest-deep/60">
              <p className="text-lime text-[10px] font-mono uppercase tracking-[0.25em]">
                MARKAS BESAR // KONTROL INVESTIGASI
              </p>
            </div>
          </div>

          {/* Error Banner */}
          {state?.error && (
            <div className="mb-6 p-3.5 bg-red-950/40 border border-red-500/50 text-red-400 text-xs font-mono flex items-start gap-2.5">
              <span className="text-sm leading-none mt-0.5">⚠️</span>
              <div>
                <span className="font-bold uppercase tracking-wider block mb-0.5">[AKSES DITOLAK]</span>
                {state.error}
              </div>
            </div>
          )}

          {/* Credentials Form */}
          <form action={formAction} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-bone-dim text-[11px] font-mono uppercase tracking-wider mb-2 flex items-center justify-between"
              >
                <span>Identitas Operator (Email)</span>
                <span className="text-lime/60 text-[9px]">[WAJIB]</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                autoFocus
                placeholder="owner@euphoric.disorder"
                className="w-full px-4 py-3 bg-forest-deep border border-bone/20 text-bone
                           font-mono text-xs placeholder:text-bone-dim/30
                           focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime
                           transition-colors"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-bone-dim text-[11px] font-mono uppercase tracking-wider mb-2 flex items-center justify-between"
              >
                <span>Kunci Otorisasi (Kata Sandi)</span>
                <span className="text-lime/60 text-[9px]">[ENCRYPTED]</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 pr-16 bg-forest-deep border border-bone/20 text-bone
                             font-mono text-xs placeholder:text-bone-dim/30
                             focus:outline-none focus:border-lime focus:ring-1 focus:ring-lime
                             transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-bone-dim/60 hover:text-lime text-[10px] font-mono uppercase tracking-wider py-1 px-1.5 border border-bone/10 transition-colors"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <div className="pt-3">
              <TombolMasuk />
            </div>
          </form>

          {/* Footer Card Info */}
          <div className="mt-8 pt-5 border-t border-bone/10 flex items-center justify-between text-[10px] font-mono text-bone-dim/50">
            <span>SECURE TERMINAL</span>
            <Link href="/" className="hover:text-lime transition-colors">
              Kembali ke Toko Publik ↗
            </Link>
          </div>
        </div>

        {/* Global Bottom Coordinates */}
        <div className="text-center mt-6 text-[10px] font-mono text-bone-dim/40 tracking-widest uppercase">
          JAKARTA // 6°09&apos;25.5&quot;S 106°50&apos;44.1&quot;E · ALL RIGHTS RESERVED
        </div>
      </div>
    </div>
  );
}
