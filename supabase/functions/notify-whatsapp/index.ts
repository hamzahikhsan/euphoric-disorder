// supabase/functions/notify-whatsapp/index.ts
// Supabase Edge Function: Forward Contact Submissions to WhatsApp
// Docs: https://supabase.com/docs/guides/functions

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const FONNTE_TOKEN = Deno.env.get("FONNTE_TOKEN");
const CALLMEBOT_API_KEY = Deno.env.get("CALLMEBOT_API_KEY");
const OWNER_WA = Deno.env.get("OWNER_WHATSAPP") || "628561740296";

serve(async (req: Request) => {
  try {
    const payload = await req.json();
    const record = payload.record;

    if (!record) {
      return new Response(JSON.stringify({ error: "No record found" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const timeStr = new Date(record.created_at).toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
    });

    const messageText = `📨 *PESAN BARU — euphoric.disorder*
────────────────────────────
👤 *Nama*: ${record.name}
📞 *Kontak*: ${record.contact}
📋 *Subjek*: ${record.subject || "(Tanpa Subjek)"}

💬 *Pesan*:
${record.message}

🕐 *Waktu*: ${timeStr} WIB
────────────────────────────
Buka panel admin untuk merespons:
https://euphoric-disorder-eight.vercel.app/admin/pesan/${record.id}`;

    // Opsi 1: Fonnte API
    if (FONNTE_TOKEN) {
      const res = await fetch("https://api.fonnte.com/send", {
        method: "POST",
        headers: {
          Authorization: FONNTE_TOKEN,
        },
        body: new URLSearchParams({
          target: OWNER_WA,
          message: messageText,
        }),
      });
      const data = await res.json();
      return new Response(JSON.stringify({ provider: "fonnte", result: data }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Opsi 2: CallMeBot API (Alternatif Gratis)
    if (CALLMEBOT_API_KEY) {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${OWNER_WA}&text=${encodeURIComponent(
        messageText
      )}&apikey=${CALLMEBOT_API_KEY}`;
      const res = await fetch(url);
      const text = await res.text();
      return new Response(JSON.stringify({ provider: "callmebot", result: text }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Jika belum ada token WA, log ke console
    console.log("Notifikasi WhatsApp dibuat (simulasi - belum ada token):", messageText);
    return new Response(
      JSON.stringify({ status: "logged", message: "Token WhatsApp belum diset di Supabase secrets." }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
