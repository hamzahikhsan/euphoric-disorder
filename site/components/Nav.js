"use client";
import Link from "next/link";
import { useState } from "react";
import { WA_GENERAL } from "@/lib/products";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const items = [["Home","/","01"],["About Us","/about","02"],["Product","/product","03"],["Contact","/contact","04"]];
  return (
    <>
      <nav className="nav">
        <Link href="/" className="logo misreg" aria-label="euphoric.disorder — beranda">EUPHORIC<small>DISORDER</small></Link>
        <div className="nav-right">
          <a className="btn pink" href={WA_GENERAL} target="_blank" rel="noopener noreferrer" aria-label="Hubungi euphoric.disorder via WhatsApp"><span className="dot"></span> WA Business</a>
          <button className="menu-btn" onClick={()=>setOpen(true)} aria-label="Buka menu navigasi"><span></span><span></span><span></span></button>
        </div>
      </nav>
      <div id="menu" className={open ? "open" : ""}>
        <a className="btn mono close" href="#" onClick={(e)=>{e.preventDefault();setOpen(false);}} aria-label="Tutup menu">Close ✕</a>
        {items.map(([label,href,n]) => (
          <Link key={href} className="ml" href={href} onClick={()=>setOpen(false)}>{label} <i>{n}</i></Link>
        ))}
      </div>
    </>
  );
}
