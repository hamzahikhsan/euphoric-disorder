import ContactForm from "@/components/ContactForm";
import { WA_GENERAL, SHOPEE_STORE, IG_URL } from "@/lib/products";
import { SITE_URL } from "@/lib/site";
export const metadata = {
  title: "Contact — Hubungi & Custom Order",
  description: "Hubungi euphoric.disorder via WhatsApp (+62 856-1740-296), Instagram @euphoric.disorder, atau Shopee. Terima custom sablon & pertanyaan produk. Jam 09.00–02.00 WIB.",
  alternates: { canonical: `${SITE_URL}/contact` }
};
export default function Contact(){
  return (
    <main className="page"><div className="wrap">
      <span className="eyebrow">Lapor Kasus Baru</span>
      <h1 className="h1 misreg">Contact</h1>
      <div className="two" style={{marginTop:30}}>
        <div>
          <p className="lead">Punya request custom sablon atau pertanyaan? Kirim laporan atau langsung chat WhatsApp. Kami balas secepat penyidik yang rajin.</p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:24}}>
            <a className="btn pink" href={WA_GENERAL} target="_blank" rel="noopener noreferrer">Chat WhatsApp →</a>
            <a className="btn" href={SHOPEE_STORE} target="_blank" rel="noopener noreferrer">Kunjungi Shopee →</a>
          </div>
          <ContactForm/>
        </div>
        <div>
          <h2 className="h2">Kanal Resmi</h2>
          <p className="mono" style={{lineHeight:2}}>
            WHATSAPP — <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" style={{color:"var(--pink)"}}>+62 856-1740-296</a><br/>
            INSTAGRAM — <a href={IG_URL} target="_blank" rel="noopener noreferrer" style={{color:"var(--pink)"}}>@euphoric.disorder</a><br/>
            SHOPEE — <a href={SHOPEE_STORE} target="_blank" rel="noopener noreferrer" style={{color:"var(--pink)"}}>compaxgrup</a><br/>
            THREADS — euphoric.disorder<br/>
            JAM — 09.00–02.00 WIB
          </p>
        </div>
      </div>
    </div></main>
  );
}
