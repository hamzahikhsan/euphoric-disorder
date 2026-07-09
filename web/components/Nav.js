"use client";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const items = [["Home","/","01"],["About Us","/about","02"],["Product","/product","03"],["Contact","/contact","04"]];
  return (
    <>
      <nav className="nav">
        <Link href="/" className="logo misreg">EUPHORIC<small>DISORDER</small></Link>
        <div className="nav-right">
          <a className="btn pink" href="#" onClick={(e)=>e.preventDefault()}><span className="dot"></span> WA Business</a>
          <div className="menu-btn" onClick={()=>setOpen(true)} aria-label="Buka menu"><span></span><span></span><span></span></div>
        </div>
      </nav>
      <div id="menu" className={open ? "open" : ""}>
        <a className="btn mono close" href="#" onClick={(e)=>{e.preventDefault();setOpen(false);}}>Close ✕</a>
        {items.map(([label,href,n]) => (
          <Link key={href} className="ml" href={href} onClick={()=>setOpen(false)}>{label} <i>{n}</i></Link>
        ))}
      </div>
    </>
  );
}
