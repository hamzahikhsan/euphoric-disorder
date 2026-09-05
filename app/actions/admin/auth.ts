"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Database } from "@/lib/supabase/types";

/**
 * Membuat Supabase client untuk Server Actions / Route Handlers.
 * Menggunakan cookie-based session via @supabase/ssr.
 */
function createSupabaseAction() {
  const cookieStore = cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Bisa gagal jika dipanggil dari Server Component
          }
        },
      },
    }
  );
}

export type AuthState = {
  ok: boolean;
  error?: string;
} | null;

/**
 * Server Action: Login admin via email + kata sandi.
 */
export async function loginAdmin(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (!email || !password) {
    return { ok: false, error: "Email dan kata sandi wajib diisi." };
  }

  const supabase = createSupabaseAction();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (error.message.includes("Invalid login")) {
      return { ok: false, error: "Email atau kata sandi salah." };
    }
    return { ok: false, error: "Gagal masuk. Coba lagi nanti." };
  }

  redirect("/admin");
}

/**
 * Server Action: Logout admin — hapus sesi.
 */
export async function logoutAdmin(): Promise<void> {
  const supabase = createSupabaseAction();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/**
 * Helper: Dapatkan user saat ini. Null jika tidak ada sesi.
 */
export async function getCurrentUser() {
  const supabase = createSupabaseAction();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Helper: Buat Supabase client untuk server actions admin lainnya.
 * Export agar bisa digunakan di actions/admin/products.ts, dll.
 */
export { createSupabaseAction };
