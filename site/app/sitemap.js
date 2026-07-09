import { products } from "@/lib/products";
import { SITE_URL } from "@/lib/site";
export default function sitemap(){
  const now = new Date();
  const routes = ["","/about","/product","/contact"].map((r)=>({ url:`${SITE_URL}${r}`, lastModified:now, changeFrequency:"weekly", priority: r===""?1:0.8 }));
  const prod = products.map((p)=>({ url:`${SITE_URL}/product/${p.slug}`, lastModified:now, changeFrequency:"weekly", priority:0.7 }));
  return [...routes, ...prod];
}
