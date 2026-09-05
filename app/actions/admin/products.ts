"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAction, getCurrentUser } from "./auth";
import type { Database } from "@/lib/supabase/types";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

export interface ActionResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

/**
 * Log aktivitas admin ke tabel admin_activity_log
 */
async function logActivity(
  action: string,
  entityId: string,
  changes?: Record<string, { lama: unknown; baru: unknown }>
) {
  try {
    const user = await getCurrentUser();
    const supabase = createSupabaseAction();
    await supabase.from("admin_activity_log").insert({
      user_id: user?.id ?? null,
      action,
      entity_type: "product",
      entity_id: entityId,
      changes: changes ?? null,
    });
  } catch (err) {
    console.error("Gagal mencatat log aktivitas:", err);
  }
}

/**
 * Mengambil semua produk untuk tampilan admin (termasuk draft).
 */
export async function getAdminProducts(): Promise<ActionResponse<ProductRow[]>> {
  try {
    const supabase = createSupabaseAction();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data: data || [] };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/**
 * Mengambil satu produk berdasarkan slug.
 */
export async function getAdminProductBySlug(
  slug: string
): Promise<ActionResponse<ProductRow>> {
  try {
    const supabase = createSupabaseAction();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/**
 * Menyimpan produk (Buat Baru atau Update).
 */
export async function saveProduct(
  formData: ProductInsert | ProductUpdate,
  isEdit = false
): Promise<ActionResponse<ProductRow>> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { ok: false, error: "Akses ditolak. Silakan login kembali." };
    }

    const supabase = createSupabaseAction();

    if (isEdit && formData.slug) {
      // Ambil data lama untuk audit diff
      const { data: oldData } = await supabase
        .from("products")
        .select("*")
        .eq("slug", formData.slug)
        .single();

      const { data, error } = await supabase
        .from("products")
        .update(formData as ProductUpdate)
        .eq("slug", formData.slug)
        .select()
        .single();

      if (error) {
        return { ok: false, error: error.message };
      }

      await logActivity("product.update", formData.slug, {
        status: { lama: oldData?.status, baru: formData.status },
        is_published: { lama: oldData?.is_published, baru: formData.is_published },
        price_idr: { lama: oldData?.price_idr, baru: formData.price_idr },
      });

      revalidatePath("/product");
      revalidatePath(`/product/${formData.slug}`);
      revalidatePath("/admin/produk");
      revalidatePath("/admin");

      return { ok: true, data };
    } else {
      // Buat Baru
      const { data, error } = await supabase
        .from("products")
        .insert(formData as ProductInsert)
        .select()
        .single();

      if (error) {
        return { ok: false, error: error.message };
      }

      await logActivity("product.create", (formData as ProductInsert).slug, {
        name: { lama: null, baru: formData.name },
        is_published: { lama: null, baru: formData.is_published },
      });

      revalidatePath("/product");
      revalidatePath("/admin/produk");
      revalidatePath("/admin");

      return { ok: true, data };
    }
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/**
 * Mengubah status publikasi (Draft <-> Live).
 */
export async function togglePublishProduct(
  slug: string,
  isPublished: boolean
): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { ok: false, error: "Akses ditolak. Silakan login kembali." };
    }

    const supabase = createSupabaseAction();
    const { error } = await supabase
      .from("products")
      .update({ is_published: isPublished })
      .eq("slug", slug);

    if (error) {
      return { ok: false, error: error.message };
    }

    await logActivity(
      isPublished ? "product.publish" : "product.unpublish",
      slug,
      { is_published: { lama: !isPublished, baru: isPublished } }
    );

    revalidatePath("/product");
    revalidatePath(`/product/${slug}`);
    revalidatePath("/admin/produk");
    revalidatePath("/admin");

    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/**
 * Menghapus produk secara permanen.
 */
export async function deleteProduct(slug: string): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { ok: false, error: "Akses ditolak. Silakan login kembali." };
    }

    const supabase = createSupabaseAction();
    const { error } = await supabase.from("products").delete().eq("slug", slug);

    if (error) {
      return { ok: false, error: error.message };
    }

    await logActivity("product.delete", slug);

    revalidatePath("/product");
    revalidatePath(`/product/${slug}`);
    revalidatePath("/admin/produk");
    revalidatePath("/admin");

    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}
