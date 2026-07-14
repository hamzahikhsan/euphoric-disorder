"use server";

import { createSupabaseServer } from "@/lib/supabase/server";

export type ContactState = {
  ok: boolean;
  error?: string;
} | null;

/**
 * Server Action: simpan kiriman form kontak ("Lapor Kasus Baru") ke Supabase.
 * Validasi minimal + honeypot anti-bot. Insert lewat anon key (dilindungi RLS).
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // honeypot: bot biasanya mengisi field tersembunyi ini
  if (String(formData.get("company") || "").trim()) return { ok: true };

  const name = String(formData.get("name") || "").trim();
  const contact = String(formData.get("contact") || "").trim();
  const subjectRaw = String(formData.get("subject") || "").trim();
  const subject = subjectRaw ? subjectRaw.slice(0, 160) : null;
  const message = String(formData.get("message") || "").trim();

  if (!name || !contact || !message) {
    return { ok: false, error: "Nama, kontak, dan pesan wajib diisi." };
  }
  if (name.length > 120 || contact.length > 200 || message.length > 4000) {
    return { ok: false, error: "Input terlalu panjang." };
  }

  try {
    const supabase = createSupabaseServer();
    const { error } = await supabase
      .from("contact_submissions")
      .insert({ name, contact, subject, message, source: "website-contact" });
    if (error) {
      return {
        ok: false,
        error: "Gagal mengirim. Coba lagi, atau hubungi kami via WhatsApp.",
      };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Terjadi kesalahan. Coba lagi nanti." };
  }
}
