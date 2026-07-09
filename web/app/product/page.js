import Link from "next/link";
import { products } from "@/lib/products";
export const metadata = { title: "Product — euphoric.disorder" };
export default function Product(){
  return (
    <main className="page"><div className="wrap">
      <span className="eyebrow">The Case Files</span>
      <h1 className="h1 misreg">Barang Bukti</h1>
      <p className="lead">Seluruh berkas perkara yang tersedia. Klik untuk membuka detail kasus.</p>
      <div className="grid-cards">
        {products.map((p)=>(
          <Link key={p.slug} href={`/product/${p.slug}`} className="pcard">
            <div className="thumb"><img src={p.img} alt={p.name}/><div className="dots"></div><span className="no">CASE #{p.no}</span></div>
            <div className="pb"><h4>{p.name}</h4><div className="price">{p.price}</div><br/><span className={`badge ${p.badge}`}>{p.status}</span></div>
          </Link>
        ))}
      </div>
    </div></main>
  );
}
