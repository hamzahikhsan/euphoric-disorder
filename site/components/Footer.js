"use client";
import { WA_GENERAL, SHOPEE_STORE, IG_URL, THREADS_URL } from "@/lib/products";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="mono" style={{color:"var(--pink)",marginBottom:18}}>CLOSED AT 02.00 — MOTIF: GABUT</div>
      <div className="slogan misreg">Every Shirt<br/>Has a Record.</div>
      <a className="btn ink" href={WA_GENERAL} target="_blank" rel="noopener noreferrer">Business Enquiries →</a>
      <div className="frow mono">
        <div>FOLLOW
          <a href={IG_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={THREADS_URL} target="_blank" rel="noopener noreferrer">Threads</a>
          <a href="#">TikTok</a>
        </div>
        <div style={{textAlign:"right"}}>SHOP
          <a href={SHOPEE_STORE} target="_blank" rel="noopener noreferrer">Shopee</a>
          <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
      <div className="mono" style={{marginTop:30,opacity:.6}}>© 2026 EUPHORIC DISORDER — ALL EVIDENCE RESERVED</div>
    </footer>
  );
}
