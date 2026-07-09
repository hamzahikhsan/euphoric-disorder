"use client";
import { useState } from "react";
import { waLink } from "@/lib/products";

export default function ContactForm(){
  const [f, setF] = useState({ nama:"", kontak:"", detail:"" });
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const msg =
      `Halo euphoric.disorder! 🕵️ Lapor kasus baru:\n` +
      `• Nama: ${f.nama || "-"}\n` +
      `• Kontak: ${f.kontak || "-"}\n` +
      `• Detail: ${f.detail || "-"}`;
    window.open(waLink(msg), "_blank", "noopener");
  };
  return (
    <form onSubmit={submit}>
      <div className="field"><label>Nama Pelapor</label><input value={f.nama} onChange={on("nama")} placeholder="Nama kamu"/></div>
      <div className="field"><label>Kontak (WA / Email)</label><input value={f.kontak} onChange={on("kontak")} placeholder="08xxxx / email"/></div>
      <div className="field"><label>Detail Kasus</label><textarea rows="4" value={f.detail} onChange={on("detail")} placeholder="Request sablon / pertanyaanmu"></textarea></div>
      <button className="btn pink" type="submit">Kirim via WhatsApp →</button>
    </form>
  );
}
