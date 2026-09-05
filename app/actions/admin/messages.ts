"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAction, getCurrentUser } from "./auth";
import type { Database } from "@/lib/supabase/types";

type MessageRow = Database["public"]["Tables"]["contact_submissions"]["Row"];

type MessageStatus = Database["public"]["Tables"]["contact_submissions"]["Row"]["status"];

export interface ActionResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

/**
 * Mengambil daftar pesan dari pelanggan.
 */
export async function getAdminMessages(
  statusFilter?: MessageStatus | "ALL"
): Promise<ActionResponse<MessageRow[]>> {
  try {
    const supabase = createSupabaseAction();
    let query = supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (statusFilter && statusFilter !== "ALL") {
      query = query.eq("status", statusFilter as MessageStatus);
    }

    const { data, error } = await query;

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data: data || [] };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/**
 * Mengambil satu pesan berdasarkan ID.
 */
export async function getAdminMessageById(
  id: string
): Promise<ActionResponse<MessageRow>> {
  try {
    const supabase = createSupabaseAction();
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return { ok: false, error: error.message };
    }

    // Tandai otomatis sebagai read jika sebelumnya unread
    if (data.status === "unread") {
      await supabase
        .from("contact_submissions")
        .update({ status: "read" })
        .eq("id", id);
      data.status = "read";
      revalidatePath("/admin/pesan");
      revalidatePath("/admin");
    }

    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

type MessageUpdate = Database["public"]["Tables"]["contact_submissions"]["Update"];

/**
 * Mengubah status pesan (read, responded, archived) dan catatan admin.
 */
export async function updateMessageStatus(
  id: string,
  status: "unread" | "read" | "responded" | "archived",
  adminNotes?: string
): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { ok: false, error: "Akses ditolak. Silakan login." };
    }

    const supabase = createSupabaseAction();
    const updatePayload: MessageUpdate = { status };

    if (adminNotes !== undefined) {
      updatePayload.admin_notes = adminNotes;
    }

    if (status === "responded") {
      updatePayload.responded_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from("contact_submissions")
      .update(updatePayload)
      .eq("id", id);

    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePath("/admin/pesan");
    revalidatePath(`/admin/pesan/${id}`);
    revalidatePath("/admin");

    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/**
 * Menghapus pesan pelanggan.
 */
export async function deleteMessage(id: string): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { ok: false, error: "Akses ditolak. Silakan login." };
    }

    const supabase = createSupabaseAction();
    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id);

    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePath("/admin/pesan");
    revalidatePath("/admin");

    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}
