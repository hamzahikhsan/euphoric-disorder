"use client";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="mono" style={{color:"var(--pink)",marginBottom:18}}>CLOSED AT 02.00 — MOTIF: GABUT</div>
      <div className="slogan misreg">Every Shirt<br/>Has a Record.</div>
      <a className="btn ink" href="#" onClick={(e)=>e.preventDefault()}>Business Enquiries →</a>
      <div className="frow mono">
        <div>FOLLOW<a href="#">Instagram</a><a href="#">Threads</a><a href="#">TikTok</a></div>
        <div style={{textAlign:"right"}}>SHOP<a href="#">Shopee</a><a href="#">WhatsApp</a></div>
      </div>
      <div className="mono" style={{marginTop:30,opacity:.6}}>© 2026 EUPHORIC DISORDER — ALL EVIDENCE RESERVED</div>
    </footer>
  );
}
