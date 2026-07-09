// ===== Kontak & link global =====
export const WA_NUMBER = "628561740296"; // +62 856-1740-296
export const waLink = (text) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
export const WA_GENERAL = waLink(
  "Halo euphoric.disorder! Saya mau tanya-tanya soal produk & custom sablon. 🕵️"
);
export const SHOPEE_STORE = "https://shopee.co.id/compaxgrup";
export const IG_URL = "https://www.instagram.com/euphoric.disorder/";
export const THREADS_URL = "https://www.threads.net/@euphoric.disorder";

// ===== Data produk =====
export const products = [
  { slug:"candy-hoodie-ed", no:"001", name:"Candy Hoodie ED", price:"Rp 350.000", material:"Fleece Premium", status:"Limited", badge:"lim",
    img:"/img/candy-hoodie.png", tag:"#WarOnDrugs",
    desc:"Barang bukti utama. Edisi terbatas sistem Pre-Order. Motif candy yang manis di permukaan, adiktif di baliknya. Hoodie fleece premium free box.",
    shopee:'https://shopee.co.id/(100-Original)-Candy-Hoodie-Premium-Limitid-Edition-Free-Box-Pria-Dan-Wanita-i.683195313.53510601027?extraParams=%7B"display_model_id"%3A325928482218%2C"model_selection_logic"%3A3%7D' },
  { slug:"warondrugs-m3", no:"003", name:"#WarOnDrugs — M3", price:"Rp —", material:"Cotton Combed 24s", status:"Pre-Order", badge:"po",
    img:"/img/warondrugs-m3.png", tag:"#WarOnDrugs",
    desc:"Berkas M3. Kaos distro dewasa sablon Cotton Combed 24s. Tersangka masih berkeliaran di Shopee.",
    shopee:'https://shopee.co.id/Kaos-Distro-Dewasa-M3-WarOnDrugs-Cotton-Combed-24s-i.683195313.25787773345?extraParams=%7B"display_model_id"%3A223398009711%2C"model_selection_logic"%3A3%7D' },
  { slug:"warondrugs-m7-lego", no:"007", name:"#WarOnDrugs — M7 Lego", price:"Rp —", material:"Cotton Combed 24s", status:"Pre-Order", badge:"po",
    img:"/img/warondrugs-m7.png", tag:"#WarOnDrugs",
    desc:"Berkas M7 seri Lego. Kaos distro dewasa Cotton Combed 24s dengan motif blok warna.",
    shopee:'https://shopee.co.id/Kaos-Distro-Dewasa-M7-WarOnDrugs-Lego-Cotton-Combed-24s-i.683195313.28165647458?extraParams=%7B"display_model_id"%3A246885415050%2C"model_selection_logic"%3A3%7D' },
  { slug:"warondrugs-m8", no:"008", name:"#WarOnDrugs — M8", price:"Rp —", material:"Cotton Combed 24s", status:"Pre-Order", badge:"po",
    img:"/img/warondrugs-m8.png", tag:"#WarOnDrugs",
    desc:"Berkas M8. Kaos distro dewasa Cotton Combed 24s — bukti visual perang terhadap kebosanan.",
    shopee:'https://shopee.co.id/Kaos-Distro-Dewasa-M8-WarOnDrugs-Cotton-Combed-24s-i.683195313.28216065360?extraParams=%7B"display_model_id"%3A251915970026%2C"model_selection_logic"%3A3%7D' },
  { slug:"warondrugs-m14", no:"014", name:"#WarOnDrugs — M14", price:"Rp —", material:"Cotton Combed 24s", status:"Pre-Order", badge:"po",
    img:"/img/warondrugs-m14.png", tag:"#WarOnDrugs",
    desc:"Berkas M14 by Euphoric Disorder. Kaos distro dewasa Cotton Combed 24s. Terakhir terlihat di warkop, pukul 02.00. Motif: gabut.",
    shopee:'https://shopee.co.id/Euphoric-Disorder-Kaos-Distro-Dewasa-M14-WarOnDrugs-Cotton-Combed-24s-i.683195313.48455523020?extraParams=%7B"display_model_id"%3A390499624075%2C"model_selection_logic"%3A3%7D' },
  { slug:"warondrugs-s4", no:"S04", name:"#WarOnDrugs — S4", price:"Rp —", material:"Cotton Combed 24s", status:"Pre-Order", badge:"po",
    img:"/img/warondrugs-s4.png", tag:"#WarOnDrugs",
    desc:"Berkas S4. Kaos distro dewasa Cotton Combed 24s, sablon presisi edisi jalanan.",
    shopee:'https://shopee.co.id/Kaos-Distro-Dewasa-S4-WarOnDrugs-Cotton-Combed-24s-i.683195313.41427048302?extraParams=%7B"display_model_id"%3A350260001070%2C"model_selection_logic"%3A3%7D' }
];
export const getProduct = (slug) => products.find(p => p.slug === slug);
export const productWa = (p) =>
  waLink(`Halo euphoric.disorder! Saya tertarik dengan Barang Bukti #${p.no} — ${p.name} (${p.price}). Apakah masih tersedia? 🧾`);
