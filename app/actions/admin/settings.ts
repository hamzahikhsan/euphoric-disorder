"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAction, getCurrentUser } from "./auth";
import type { Database } from "@/lib/supabase/types";

type SiteConfigRow = Database["public"]["Tables"]["site_config"]["Row"];

export interface ActionResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

/**
 * Mengambil seluruh konfigurasi situs.
 */
export async function getAdminSettings(): Promise<ActionResponse<SiteConfigRow[]>> {
  try {
    const supabase = createSupabaseAction();
    const { data, error } = await supabase.from("site_config").select("*");

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data: data || [] };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/**
 * Menyimpan konfigurasi situs secara batch.
 */
export async function saveSettings(
  entries: { key: string; value: string; category?: string }[]
): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { ok: false, error: "Akses ditolak. Silakan login." };
    }

    const supabase = createSupabaseAction();

    for (const item of entries) {
      const { error } = await supabase
        .from("site_config")
        .upsert(item, { onConflict: "key" });

      if (error) {
        return { ok: false, error: `Gagal menyimpan ${item.key}: ${error.message}` };
      }
    }

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/product");
    revalidatePath("/contact");
    revalidatePath("/admin/pengaturan");

    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}
