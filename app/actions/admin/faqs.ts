"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAction, getCurrentUser } from "./auth";
import type { Database } from "@/lib/supabase/types";

type FaqRow = Database["public"]["Tables"]["faqs"]["Row"];
type FaqInsert = Database["public"]["Tables"]["faqs"]["Insert"];
type FaqUpdate = Database["public"]["Tables"]["faqs"]["Update"];

export interface ActionResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

/**
 * Mengambil semua FAQ untuk admin (termasuk yang disembunyikan).
 */
export async function getAdminFaqs(): Promise<ActionResponse<FaqRow[]>> {
  try {
    const supabase = createSupabaseAction();
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data: data || [] };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/**
 * Menyimpan FAQ (Insert atau Update).
 */
export async function saveFaq(
  faq: FaqInsert | FaqUpdate,
  id?: string
): Promise<ActionResponse<FaqRow>> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { ok: false, error: "Akses ditolak. Silakan login." };
    }

    const supabase = createSupabaseAction();

    if (id) {
      const { data, error } = await supabase
        .from("faqs")
        .update(faq as FaqUpdate)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        return { ok: false, error: error.message };
      }

      revalidatePath("/contact");
      revalidatePath("/admin/faq");
      return { ok: true, data };
    } else {
      const { data, error } = await supabase
        .from("faqs")
        .insert(faq as FaqInsert)
        .select()
        .single();

      if (error) {
        return { ok: false, error: error.message };
      }

      revalidatePath("/contact");
      revalidatePath("/admin/faq");
      return { ok: true, data };
    }
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/**
 * Mengubah visibilitas FAQ (sembunyikan / tampilkan).
 */
export async function toggleFaqVisibility(
  id: string,
  isVisible: boolean
): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { ok: false, error: "Akses ditolak. Silakan login." };
    }

    const supabase = createSupabaseAction();
    const { error } = await supabase
      .from("faqs")
      .update({ is_visible: isVisible })
      .eq("id", id);

    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePath("/contact");
    revalidatePath("/admin/faq");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/**
 * Menghapus FAQ secara permanen.
 */
export async function deleteFaq(id: string): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { ok: false, error: "Akses ditolak. Silakan login." };
    }

    const supabase = createSupabaseAction();
    const { error } = await supabase.from("faqs").delete().eq("id", id);

    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePath("/contact");
    revalidatePath("/admin/faq");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}
