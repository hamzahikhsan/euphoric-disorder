// Data produk euphoric.disorder — sunting di sini (harga "Rp —" = placeholder)
export const products = [
  { slug:"candy-hoodie-ed", no:"001", name:"Candy Hoodie ED", price:"Rp 350.000", material:"Fleece Premium", status:"Limited", badge:"lim",
    img:"/img/candy-hoodie.png", tag:"#WarOnDrugs",
    desc:"Barang bukti utama. Edisi terbatas sistem Pre-Order. Motif candy yang manis di permukaan, adiktif di baliknya.",
    shopee:"#", wa:"#" },
  { slug:"warondrugs-m3", no:"003", name:"#WarOnDrugs — M3", price:"Rp —", material:"Cotton Combed 24s", status:"Pre-Order", badge:"po",
    img:"/img/warondrugs-m3.png", tag:"#WarOnDrugs",
    desc:"Berkas M3. Sablon Cotton Combed 24s. Tersangka masih berkeliaran di Shopee.",
    shopee:"#", wa:"#" },
  { slug:"warondrugs-m7-lego", no:"007", name:"#WarOnDrugs — M7 Lego", price:"Rp —", material:"Cotton Combed 24s", status:"Sold Out", badge:"sold",
    img:"/img/warondrugs-m7.png", tag:"#WarOnDrugs",
    desc:"Berkas M7 seri Lego. Kasus ditutup — stok habis. Menunggu restock.",
    shopee:"#", wa:"#" },
  { slug:"warondrugs-m8", no:"008", name:"#WarOnDrugs — M8", price:"Rp —", material:"Cotton Combed 24s", status:"Pre-Order", badge:"po",
    img:"/img/warondrugs-m8.png", tag:"#WarOnDrugs",
    desc:"Berkas M8. Bukti visual perang terhadap kebosanan.",
    shopee:"#", wa:"#" },
  { slug:"warondrugs-m14", no:"014", name:"#WarOnDrugs — M14", price:"Rp —", material:"Cotton Combed 24s", status:"Pre-Order", badge:"po",
    img:"/img/warondrugs-m14.png", tag:"#WarOnDrugs",
    desc:"Berkas M14. Terakhir terlihat di warkop, pukul 02.00. Motif: gabut.",
    shopee:"#", wa:"#" },
  { slug:"warondrugs-s4", no:"S04", name:"#WarOnDrugs — S4", price:"Rp —", material:"Cotton Combed 24s", status:"Pre-Order", badge:"po",
    img:"/img/warondrugs-s4.png", tag:"#WarOnDrugs",
    desc:"Berkas S4. Sablon presisi, edisi jalanan.",
    shopee:"#", wa:"#" }
];
export const getProduct = (slug) => products.find(p => p.slug === slug);
export const WA_NUMBER = "#"; // TODO: isi wa.me/62xxxx
export const SHOPEE_URL = "#"; // TODO: isi link toko Shopee
