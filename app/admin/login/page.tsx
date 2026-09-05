"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAdmin, type AuthState } from "@/app/actions/admin/auth";
import { useState } from "react";

function TombolMasuk() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-6 bg-[#CDFF00] text-[#1A1B1E] font-bold uppercase tracking-widest
                 hover:bg-[#b8e600] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                 font-[family-name:var(--font-space-mono)] text-sm"
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Memverifikasi...
        </span>
      ) : (
        "Masuk ke Markas"
      )}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState<AuthState, FormData>(loginAdmin, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#1A1B1E] flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23CDFF00' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative w-full max-w-md">
        {/* Logo & branding */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 border-2 border-[#CDFF00] flex items-center justify-center mx-auto">
              <span className="text-[#CDFF00] font-bold text-2xl font-[family-name:var(--font-nohemi)]">ED</span>
            </div>
          </div>
          <h1 className="text-[#F1F3F5] text-2xl font-bold font-[family-name:var(--font-nohemi)] tracking-tight">
            euphoric.disorder
          </h1>
          <p className="text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-[0.3em] mt-2">
            Markas Besar Administrasi
          </p>
        </div>

        {/* Form card */}
        <div className="bg-[#25262B] border border-[#373A40] p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-[#CDFF00]" />
              <span className="text-[#909296] text-[10px] font-[family-name:var(--font-space-mono)] uppercase tracking-[0.2em]">
                Akses Terbatas
              </span>
            </div>
            <h2 className="text-[#F1F3F5] text-lg font-[family-name:var(--font-nohemi)]">
              Masuk ke Panel Admin
            </h2>
          </div>

          {/* Error message */}
          {state?.error && (
            <div className="mb-4 p-3 bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 text-[#FF6B6B] text-sm font-[family-name:var(--font-space-mono)]">
              ⚠ {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                autoFocus
                placeholder="admin@euphoric.disorder"
                className="w-full px-4 py-3 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5]
                           font-[family-name:var(--font-space-mono)] text-sm
                           placeholder:text-[#555] focus:outline-none focus:border-[#CDFF00]
                           transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-[#909296] text-xs font-[family-name:var(--font-space-mono)] uppercase tracking-wider mb-2"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 bg-[#1A1B1E] border border-[#373A40] text-[#F1F3F5]
                             font-[family-name:var(--font-space-mono)] text-sm
                             placeholder:text-[#555] focus:outline-none focus:border-[#CDFF00]
                             transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#909296] hover:text-[#CDFF00] transition-colors text-xs font-[family-name:var(--font-space-mono)]"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <TombolMasuk />
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[#555] text-[10px] font-[family-name:var(--font-space-mono)] mt-6 uppercase tracking-wider">
          © {new Date().getFullYear()} euphoric.disorder · Panel Admin v1.0
        </p>
      </div>
    </div>
  );
}
