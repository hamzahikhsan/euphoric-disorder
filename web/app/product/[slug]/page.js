import Link from "next/link";
import { products, getProduct } from "@/lib/products";
export function generateStaticParams(){ return products.map(p=>({slug:p.slug})); }
export function generateMetadata({ params }){ const p=getProduct(params.slug); return { title: p ? `${p.name} — euphoric.disorder` : "Case not found" }; }
export default function Detail({ params }){
  const p = getProduct(params.slug);
  if(!p) return (<main className="page"><div className="wrap"><h1 className="h1">Case Not Found</h1><Link className="btn" href="/product">← Kembali ke Arsip</Link></div></main>);
  return (
    <main className="page"><div className="wrap">
      <Link className="mono" href="/product">← KEMBALI KE ARSIP</Link>
      <div className="detail" style={{marginTop:20}}>
        <div className="media"><img src={p.img} alt={p.name}/><div className="dots"></div></div>
        <div>
          <span className="mono" style={{color:"var(--pink)"}}>CASE #{p.no} — STATUS: {p.status.toUpperCase()}</span>
          <h1 className="h2 misreg" style={{margin:"10px 0 16px"}}>{p.name}</h1>
          <p className="lead">{p.desc}</p>
          <div className="meta">
            <div><span>HARGA</span><span>{p.price}</span></div>
            <div><span>BAHAN</span><span>{p.material}</span></div>
            <div><span>MOTIF</span><span>{p.tag}</span></div>
            <div><span>STATUS</span><span>{p.status}</span></div>
          </div>
          <div className="cta">
            <a className="btn pink" href={p.shopee} target="_blank" rel="noreferrer">Amankan di Shopee →</a>
            <a className="btn" href={p.wa} target="_blank" rel="noreferrer">Tanya via WhatsApp →</a>
          </div>
        </div>
      </div>
    </div></main>
  );
}
