"use client";
export default function ContactForm(){
  return (
    <form onSubmit={(e)=>e.preventDefault()}>
      <div className="field"><label>Nama Pelapor</label><input placeholder="Nama kamu"/></div>
      <div className="field"><label>Kontak (WA / Email)</label><input placeholder="08xxxx / email"/></div>
      <div className="field"><label>Detail Kasus</label><textarea rows="4" placeholder="Ceritakan request sablon / pertanyaanmu"></textarea></div>
      <button className="btn pink" type="submit">Kirim Laporan →</button>
    </form>
  );
}
