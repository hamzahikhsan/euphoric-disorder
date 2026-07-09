import Link from "next/link";
import { products, getProduct, productWa } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams(){ return products.map(p=>({slug:p.slug})); }
export function generateMetadata({ params }){
  const p = getProduct(params.slug);
  if(!p) return { title: "Case Not Found — euphoric.disorder" };
  const title = `${p.name} — ${p.tag} ${p.material} | euphoric.disorder`;
  const description = `${p.desc} Harga ${p.price}. ${p.status}. Beli kaos sablon euphoric.disorder di Shopee atau order via WhatsApp.`;
  return {
    title, description,
    alternates: { canonical: `${SITE_URL}/product/${p.slug}` },
    openGraph: { title, description, url: `${SITE_URL}/product/${p.slug}`, images: [{ url: p.img }], type: "website" },
    twitter: { card: "summary_large_image", title, description, images: [p.img] }
  };
}

export default function Detail({ params }){
  const p = getProduct(params.slug);
  if(!p) return (<main className="page"><div className="wrap"><h1 className="h1">Case Not Found</h1><Link className="btn" href="/product">← Kembali ke Arsip</Link></div></main>);
  const jsonld = {
    "@context":"https://schema.org","@type":"Product",
    name:p.name, image:`${SITE_URL}${p.img}`, description:p.desc, sku:`ED-${p.no}`,
    brand:{ "@type":"Brand", name:"euphoric.disorder" },
    material:p.material,
    offers:{ "@type":"Offer", priceCurrency:"IDR", availability: p.status==="Sold Out"?"https://schema.org/OutOfStock":"https://schema.org/InStock", url:p.shopee }
  };
  return (
    <main className="page"><div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonld)}} />
      <Link className="mono" href="/product">← KEMBALI KE ARSIP</Link>
      <div className="detail" style={{marginTop:20}}>
        <div className="media"><img src={p.img} alt={`${p.name} — kaos sablon ${p.tag} bahan ${p.material} dari euphoric.disorder`}/><div className="dots"></div></div>
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
            <a className="btn pink" href={p.shopee} target="_blank" rel="noopener noreferrer">Amankan di Shopee →</a>
            <a className="btn" href={productWa(p)} target="_blank" rel="noopener noreferrer">Tanya via WhatsApp →</a>
          </div>
        </div>
      </div>
    </div></main>
  );
}
