import Link from "next/link";
import { products } from "@/lib/products";
import { SITE_URL } from "@/lib/site";
export const metadata = {
  title: "Product — Katalog Kaos Sablon #WarOnDrugs",
  description: "Katalog lengkap euphoric.disorder: kaos distro #WarOnDrugs Cotton Combed 24s (M3, M7 Lego, M8, M14, S4) dan Candy Hoodie edisi terbatas. Klik untuk detail & order via Shopee/WhatsApp.",
  alternates: { canonical: `${SITE_URL}/product` },
  openGraph: { title: "Katalog — euphoric.disorder", description: "Semua barang bukti (produk) euphoric.disorder.", url: `${SITE_URL}/product` }
};
export default function Product(){
  const jsonld = {
    "@context":"https://schema.org","@type":"ItemList",
    itemListElement: products.map((p,i)=>({ "@type":"ListItem", position:i+1, name:p.name, url:`${SITE_URL}/product/${p.slug}` }))
  };
  return (
    <main className="page"><div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonld)}} />
      <span className="eyebrow">The Case Files</span>
      <h1 className="h1 misreg">Barang Bukti</h1>
      <p className="lead">Seluruh berkas perkara yang tersedia. Klik untuk membuka detail kasus dan amankan di Shopee atau WhatsApp.</p>
      <div className="grid-cards">
        {products.map((p)=>(
          <Link key={p.slug} href={`/product/${p.slug}`} className="pcard" aria-label={`${p.name} — ${p.price}`}>
            <div className="thumb"><img src={p.img} alt={`${p.name} — kaos sablon ${p.tag} ${p.material} euphoric.disorder`}/><div className="dots"></div><span className="no">CASE #{p.no}</span></div>
            <div className="pb"><h4>{p.name}</h4><div className="price">{p.price}</div><br/><span className={`badge ${p.badge}`}>{p.status}</span></div>
          </Link>
        ))}
      </div>
    </div></main>
  );
}
