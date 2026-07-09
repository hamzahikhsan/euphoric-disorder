import ContactForm from "@/components/ContactForm";
export const metadata = { title: "Contact — euphoric.disorder" };
export default function Contact(){
  return (
    <main className="page"><div className="wrap">
      <span className="eyebrow">Lapor Kasus Baru</span>
      <h1 className="h1 misreg">Contact</h1>
      <div className="two" style={{marginTop:30}}>
        <div>
          <p className="lead">Punya request custom sablon atau pertanyaan? Kirim laporan. Kami balas secepat penyidik yang rajin.</p>
          <ContactForm/>
        </div>
        <div>
          <h2 className="h2">Kanal Resmi</h2>
          <p className="mono" style={{lineHeight:2}}>
            WHATSAPP — [ISI NOMOR]<br/>
            INSTAGRAM — @euphoric.disorder<br/>
            SHOPEE — [ISI LINK]<br/>
            THREADS — euphoric.disorder<br/>
            JAM — 09.00–02.00 WIB
          </p>
        </div>
      </div>
    </div></main>
  );
}
