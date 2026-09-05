/**
 * Data produk & layanan — Sumber tunggal katalog Euphoric Disorder.
 * Skema diperluas untuk mendukung Dedicated Detail Page (/product/[slug])
 * dan kesiapan integrasi Headless CMS / Admin Panel Supabase.
 */

export type ProductStatus = "OPEN" | "PO" | "LIMITED" | "SOLD" | "ARCHIVED";

export interface SizeMeasurement {
  size: string;
  chest: number; // Lebar dada dalam cm
  length: number; // Panjang badan dalam cm
  sleeve: number; // Panjang lengan dalam cm
}

export interface FabricSpec {
  gsm: number;
  composition: string;
  feel: string;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  slug: string;
  subject: string; // nomor berkas "001", "003", dll.
  caseId: string; // kode arsip forensik resmi e.g. "ED-CASE-001"
  name: string;
  tagline: string;
  material: string;
  priceIDR: number | null; // null → "Harga menyusul"
  originalPriceIDR?: number | null;
  status: ProductStatus | null;
  filedUnder: string[];
  images: {
    front: string;
    back?: string;
    detail?: string[];
    lookbook?: string[];
    gallery?: string[];
  };
  description: string; // ringkasan singkat untuk kartu
  story: string; // narasi mendalam / filosofi kriminologi
  fabricSpecs: FabricSpec;
  fitSilhouette: string;
  printTechnique: string;
  printLocation: string[];
  colors: ColorOption[];
  sizesAvailable: string[];
  sizeChart: SizeMeasurement[];
  careInstructions: string[];
  batchInfo: string;
  modelInfo?: string;
  shopeeUrl?: string;
}

const TSHIRT_SIZE_CHART: SizeMeasurement[] = [
  { size: "S", chest: 52, length: 69, sleeve: 23 },
  { size: "M", chest: 55, length: 72, sleeve: 24 },
  { size: "L", chest: 58, length: 75, sleeve: 25 },
  { size: "XL", chest: 61, length: 78, sleeve: 26 },
  { size: "XXL", chest: 64, length: 80, sleeve: 27 },
];

const HOODIE_SIZE_CHART: SizeMeasurement[] = [
  { size: "S", chest: 56, length: 68, sleeve: 60 },
  { size: "M", chest: 59, length: 71, sleeve: 62 },
  { size: "L", chest: 62, length: 74, sleeve: 64 },
  { size: "XL", chest: 65, length: 77, sleeve: 66 },
  { size: "XXL", chest: 68, length: 79, sleeve: 67 },
];

const STANDARD_CARE_INSTRUCTIONS = [
  "Cuci menggunakan air dingin (suhu ruang) dengan deterjen lembut.",
  "Balik pakaian (inside-out) saat mencuci dan menjemur agar pigmen sablon awet.",
  "Hindari penggunaan pemutih berbahan klorin keras.",
  "Jangan menyetrika langsung pada permukaan sablon — setrika dari sisi dalam dengan suhu sedang.",
  "Keringkan dengan cara diangin-anginkan alami, hindari mesin pengering berputar tinggi.",
];

export const products: Product[] = [
  {
    slug: "candy-hoodie-ed",
    subject: "001",
    caseId: "ED-CASE-001",
    name: "Candy Hoodie ED",
    tagline: "Manis di permukaan, racun di dalam.",
    material: "Cotton Fleece Premium 330 GSM",
    priceIDR: 350000,
    originalPriceIDR: 420000,
    status: "LIMITED",
    filedUnder: ["Candy", "Limited", "Hoodie"],
    images: {
      front: "/img/products/candy-hoodie.png",
      detail: ["/img/products/candy-hoodie.png"],
    },
    description:
      "Subject 001. Hoodie fleece 330 GSM edisi terbatas. Pola all-over pill/candy yang membedah ilusi kenikmatan instan dan adiksi modern.",
    story:
      "Subject 001 merupakan manifesto visual pertama Euphoric Disorder. Mengambil metafora butiran permen berwarna-warni yang tampak menggoda di kejauhan, namun ketika diamati secara forensik, tiap butir merupakan kapsul kimia sintetis. Ini adalah sindiran terhadap adiksi modern—di mana masyarakat menenggak ilusi manis untuk melupakan kekacauan realitas. Diproduksi dengan bahan katun fleece seberat 330 GSM berstruktur tebal dengan pola drop-shoulder yang tegap di badan.",
    fabricSpecs: {
      gsm: 330,
      composition: "80% Cotton Fleece, 20% Polyester Anti-Shrink",
      feel: "Tebal berbobot, bagian dalam brushed fleece lembut dan hangat.",
    },
    fitSilhouette: "Boxy Relaxed Drop-Shoulder Hoodie",
    printTechnique: "All-Over Digital Reactive High-Definition Print",
    printLocation: ["Seluruh Badan & Lengan (All-Over)", "Hood Lining"],
    colors: [
      { name: "Charcoal Black Base", hex: "#1A1A1A" },
      { name: "Cream White Base", hex: "#F3EFE0" },
    ],
    sizesAvailable: ["S", "M", "L", "XL", "XXL"],
    sizeChart: HOODIE_SIZE_CHART,
    careInstructions: STANDARD_CARE_INSTRUCTIONS,
    batchInfo: "Batch 01 — Limited Run (50 Pieces Only)",
    modelInfo: "Model pria 178 cm / 72 kg mengenakan Size L",
    shopeeUrl: "https://shopee.co.id/compaxgrup",
  },
  {
    slug: "warondrugs-m3",
    subject: "003",
    caseId: "ED-CASE-003",
    name: "Kaos #WarOnDrugs — M3",
    tagline: "Sebuah pengamatan empiris, bukan perayaan.",
    material: "Cotton Combed 24s",
    priceIDR: 145000,
    originalPriceIDR: 175000,
    status: "OPEN",
    filedUnder: ["War on Drugs", "T-Shirt"],
    images: {
      front: "/img/products/warondrugs-m3.png",
    },
    description:
      "Subject 003. Katun combed 24s bersablon plastisol micro-cured. Pembuka seri ikonik #WarOnDrugs dengan cetakan tipografi RLX.",
    story:
      "Seri #WarOnDrugs lahir dari arsip catatan kasus narkotika jalanan di ibu kota. Seri M3 menyoroti paradoks kata 'RLX' (Relax) yang sering disalahartikan sebagai jalan pintas kimiawi. Cetakan sablon di dada kiri diperlakukan layaknya cap barang bukti laboratorium, sementara punggung mencetak kutipan reflektif 'Flying is not always in the sky'. Kami mendokumentasikan gejala sosial ini ke atas medium katun 24s yang nyaman dipakai sehari-hari.",
    fabricSpecs: {
      gsm: 185,
      composition: "100% Ring Spun Combed Cotton",
      feel: "Halus, adem di iklim tropis, daya serap keringat maksimal.",
    },
    fitSilhouette: "Boxy Casual Streetwear Fit",
    printTechnique: "Plastisol Screen Printing with Matte Finish",
    printLocation: ["Dada Kiri (Tipografi RLX)", "Punggung Tengah (Case Artwork)"],
    colors: [
      { name: "Deep Pitch Black", hex: "#121212" },
    ],
    sizesAvailable: ["S", "M", "L", "XL", "XXL"],
    sizeChart: TSHIRT_SIZE_CHART,
    careInstructions: STANDARD_CARE_INSTRUCTIONS,
    batchInfo: "Katalog Reguler — Ready Stock & PO Terjadwal",
    modelInfo: "Model pria 175 cm / 68 kg mengenakan Size M",
    shopeeUrl: "https://shopee.co.id/compaxgrup",
  },
  {
    slug: "warondrugs-m7-lego",
    subject: "007",
    caseId: "ED-CASE-007",
    name: 'Kaos #WarOnDrugs — M7 "Lego"',
    tagline: "Dibangun dari kepingan, hancur dalam hitungan detik.",
    material: "Cotton Combed 24s",
    priceIDR: 150000,
    originalPriceIDR: 180000,
    status: "OPEN",
    filedUnder: ["War on Drugs", "T-Shirt"],
    images: {
      front: "/img/products/warondrugs-m7.png",
    },
    description:
      "Subject 007. Seri #WarOnDrugs varian 'Lego'. Metafora kepingan kebiasaan adiktif yang tersusun balok demi balok.",
    story:
      "Subject 007 mengabstraksikan kebiasaan adiktif sebagai balok-balok mainan Lego. Sekilas terlihat kekanak-kanakan dan tidak berbahaya, namun setiap balok yang tertumpuk membangun penjara psikologis bagi korbannya. Dicetak dengan teknik sablon multi-layer plastisol untuk menghasilkan tekstur balok yang tegas dengan separasi warna tajam.",
    fabricSpecs: {
      gsm: 185,
      composition: "100% Combed Cotton 24s",
      feel: "Lembut, tidak menerawang, tidak kaku.",
    },
    fitSilhouette: "Classic Boxy Oversize",
    printTechnique: "Manual Multi-Pass Plastisol Ink",
    printLocation: ["Dada Depan Penuh (Graphic Lego)", "Lengan Kanan (Emblem Seri)"],
    colors: [
      { name: "Carbon Black", hex: "#171717" },
    ],
    sizesAvailable: ["S", "M", "L", "XL", "XXL"],
    sizeChart: TSHIRT_SIZE_CHART,
    careInstructions: STANDARD_CARE_INSTRUCTIONS,
    batchInfo: "Arsip Berkas Perkara 2023",
    modelInfo: "Model 180 cm / 75 kg mengenakan Size L",
    shopeeUrl: "https://shopee.co.id/compaxgrup",
  },
  {
    slug: "warondrugs-m8",
    subject: "008",
    caseId: "ED-CASE-008",
    name: "Kaos #WarOnDrugs — M8",
    tagline: "Kajian dingin yang dipakai tepat di dada.",
    material: "Cotton Combed 24s",
    priceIDR: 145000,
    originalPriceIDR: null,
    status: "OPEN",
    filedUnder: ["War on Drugs", "T-Shirt"],
    images: {
      front: "/img/products/warondrugs-m8.png",
    },
    description:
      "Subject 008. Potret grafis investigasi forensik terhadap distribusi substansi terlarang di lanskap urban.",
    story:
      "Subject 008 menghadirkan estetika dokumen berkas perkara rahasia. Menggunakan komposisi tipografi bergaya stempel forensik dan koordinat peta TKP. Desain ini mengajak pemakainya untuk tidak bersikap naif terhadap realitas jalanan kota metropolitan.",
    fabricSpecs: {
      gsm: 185,
      composition: "100% Cotton Combed 24s Premium",
      feel: "Sejuk dan tahan lama meski dicuci berulang.",
    },
    fitSilhouette: "Drop-Shoulder Boxy Fit",
    printTechnique: "Plastisol Ink dengan Finishing Doff",
    printLocation: ["Dada Tengah (Case File Emblem)"],
    colors: [
      { name: "Washed Black", hex: "#1C1C1C" },
    ],
    sizesAvailable: ["S", "M", "L", "XL", "XXL"],
    sizeChart: TSHIRT_SIZE_CHART,
    careInstructions: STANDARD_CARE_INSTRUCTIONS,
    batchInfo: "Serial Drop — Stock Terbatas",
    modelInfo: "Model 174 cm / 65 kg mengenakan Size M",
    shopeeUrl: "https://shopee.co.id/compaxgrup",
  },
  {
    slug: "warondrugs-m14",
    subject: "014",
    caseId: "ED-CASE-014",
    name: "Kaos #WarOnDrugs — M14",
    tagline: "Nomor besar, pertanyaan yang lebih besar.",
    material: "Cotton Combed 24s",
    priceIDR: 145000,
    originalPriceIDR: null,
    status: "OPEN",
    filedUnder: ["War on Drugs", "T-Shirt"],
    images: {
      front: "/img/products/warondrugs-m14.png",
    },
    description:
      "Subject 014. Tipografi angka kasus besar bergaris tepi forensik dengan cap stempel 'EVIDENCE CONFIDENTIAL'.",
    story:
      "Subject 014 merekam skala masif dari kasus-kasus yang tak pernah benar-benar selesai. Menampilkan tipografi monolitik '14' yang diisi dengan barcode dan stempel merah investigasi. Dirancang untuk siluet streetwear santai dengan jahitan rantai pundak ekstra kokoh.",
    fabricSpecs: {
      gsm: 185,
      composition: "100% Cotton Combed 24s",
      feel: "Karakter katun murni yang menyerap keringat dengan baik.",
    },
    fitSilhouette: "Boxy Oversized Fit",
    printTechnique: "Discharge & Plastisol Hybrid Print",
    printLocation: ["Dada Depan", "Tengkuk Leher"],
    colors: [
      { name: "Deep Black", hex: "#111111" },
    ],
    sizesAvailable: ["S", "M", "L", "XL", "XXL"],
    sizeChart: TSHIRT_SIZE_CHART,
    careInstructions: STANDARD_CARE_INSTRUCTIONS,
    batchInfo: "Serial Drop — Ready Stock",
    modelInfo: "Model 177 cm / 70 kg mengenakan Size L",
    shopeeUrl: "https://shopee.co.id/compaxgrup",
  },
  {
    slug: "warondrugs-s4",
    subject: "S4",
    caseId: "ED-CASE-S04",
    name: "Kaos #WarOnDrugs — S4",
    tagline: "Bukti yang bisa dibalik, dua sudut pandang perkara.",
    material: "Cotton Combed 24s",
    priceIDR: 155000,
    originalPriceIDR: 185000,
    status: "OPEN",
    filedUnder: ["War on Drugs", "T-Shirt", "Limited"],
    images: {
      front: "/img/products/warondrugs-s4.png",
      back: "/img/products/warondrugs-s4b.png",
      detail: ["/img/products/warondrugs-s4.png", "/img/products/warondrugs-s4b.png"],
    },
    description:
      "Subject S4. Rilisan dua sisi (depan & belakang) yang menarasikan kronologi penangkapan dan bukti laboratoris.",
    story:
      "Subject S4 adalah salah satu berkas paling detail dalam arsip Euphoric Disorder. Bagian depan mencatat kode perkara forensik, sedangkan bagian belakang memuat cetakan visual berukuran penuh yang menguraikan diagram kronologi kejadian. Seperti semua bukti yang sah di mata hukum, pakaian ini menuntut untuk diamati dari dua sisi yang berbeda.",
    fabricSpecs: {
      gsm: 190,
      composition: "100% Combed Cotton 24s Heavy Treatment",
      feel: "Permukaan halus, gramasi tegap, tidak mudah kusut.",
    },
    fitSilhouette: "Streetwear Boxy Fit — Drop Shoulder",
    printTechnique: "Dual-Sided High Density Plastisol",
    printLocation: ["Dada Depan (Logo Berkas)", "Punggung Penuh (Diagram Kasus S4)"],
    colors: [
      { name: "Black Charcoal", hex: "#141414" },
    ],
    sizesAvailable: ["S", "M", "L", "XL", "XXL"],
    sizeChart: TSHIRT_SIZE_CHART,
    careInstructions: STANDARD_CARE_INSTRUCTIONS,
    batchInfo: "Edisi Khusus Dua Sisi",
    modelInfo: "Model 178 cm / 72 kg mengenakan Size L",
    shopeeUrl: "https://shopee.co.id/compaxgrup",
  },
  {
    slug: "custom-sablon-batch",
    subject: "009",
    caseId: "ED-SERV-009",
    name: "Custom Sablon & Apparel — Batch Production",
    tagline: "Konveksi & sablon berstandar distro untuk komunitas dan brand Anda.",
    material: "Combed 24s / 16s Heavyweight / Fleece 330gsm",
    priceIDR: 55000,
    originalPriceIDR: 65000,
    status: "OPEN",
    filedUnder: ["Custom Sablon", "Service"],
    images: {
      front: "/img/shirt-gray.png",
      back: "/img/shirt-green.png",
      detail: ["/img/shirt-gray.png", "/img/shirt-green.png"],
    },
    description:
      "Subject 009. Layanan pembuatan kaos & apparel kustom skala komunitas atau brand kolektif (min. 12 pcs). Pilihan bahan Combed 24s, 16s Heavyweight (235 GSM), hingga Fleece 330gsm dengan sablon Plastisol / Discharge.",
    story:
      "Euphoric Disorder tidak hanya merilis artikel koleksi sendiri, tetapi juga membuka fasilitas produksi untuk brand independen, komunitas otomotif/musik, dan instansi kreatif. Kami memastikan standar bahan katun combed terbaik (dari 24s standar harian hingga 16s Heavyweight 235 GSM berpola boxy), jahitan rantai tiga jarum, serta racikan tinta sablon tahan cuci berstandar ekspor.",
    fabricSpecs: {
      gsm: 235,
      composition: "Pilihan: Combed 24s (180 GSM), 16s Heavy (235 GSM), Fleece (330 GSM)",
      feel: "Dapat disesuaikan dengan kebutuhan proyek Anda.",
    },
    fitSilhouette: "Pilihan: Regular Fit, Boxy Cut, Oversized Drop-Shoulder",
    printTechnique: "Plastisol Manual, Discharge Cabut Warna, HD 3D Rubber, atau DTF Digital",
    printLocation: ["Dada", "Punggung", "Lengan Kiri/Kanan", "Label Kerah Kustom"],
    colors: [
      { name: "Hitam Pekat", hex: "#111111" },
      { name: "Putih Tulang / Bone", hex: "#EDEBDD" },
      { name: "Forest Green", hex: "#2C3221" },
      { name: "Custom Panton Color", hex: "#7A7A7A" },
    ],
    sizesAvailable: ["S", "M", "L", "XL", "XXL", "XXXL"],
    sizeChart: TSHIRT_SIZE_CHART,
    careInstructions: STANDARD_CARE_INSTRUCTIONS,
    batchInfo: "Minimum Pemesanan: 12 pcs / Batch (Pengerjaan 7-14 hari kerja)",
    modelInfo: "Sampel dapat dibuat terlebih dahulu sebelum produksi massal",
    shopeeUrl: "https://shopee.co.id/compaxgrup",
  },
  {
    slug: "custom-sablon-satuan",
    subject: "010",
    caseId: "ED-SERV-010",
    name: "Custom Sablon Satuan & Sample Build",
    tagline: "Realisasikan 1 potong desain impian Anda tanpa batasan minimum.",
    material: "Cotton Combed 24s / 30s",
    priceIDR: 75000,
    originalPriceIDR: 90000,
    status: "OPEN",
    filedUnder: ["Custom Sablon", "Service"],
    images: {
      front: "/img/hero-tee.png",
      detail: ["/img/hero-tee.png"],
    },
    description:
      "Subject 010. Cetak sampel produk atau kaos custom satuan tanpa minimal order (1 pcs pun dilayani). Menggunakan cetak DTF presisi tinggi / Plastisol HD dengan detail warna tajam.",
    story:
      "Bagi Anda yang membutuhkan sampel purwarupa (prototype) sebelum produksi massal, hadiah personal, atau kaos rilisan khusus 1 of 1, layanan Subject 010 dirancang untuk Anda. Tanpa minimal order, kami memproses desain Anda menggunakan cetak digital Direct-to-Film (DTF) resolusi tinggi yang merekat kuat pada serat katun 24s murni.",
    fabricSpecs: {
      gsm: 185,
      composition: "100% Cotton Combed 24s Soft-Treated",
      feel: "Nyaman, adem, dan menyerap keringat.",
    },
    fitSilhouette: "Standard & Boxy Fit",
    printTechnique: "Direct Transfer Film (DTF) HD & High Precision Curing",
    printLocation: ["Area Cetak A3 / A4 Bebas (Depan & Belakang)"],
    colors: [
      { name: "Solid Black", hex: "#151515" },
      { name: "Pure White", hex: "#FFFFFF" },
    ],
    sizesAvailable: ["S", "M", "L", "XL", "XXL"],
    sizeChart: TSHIRT_SIZE_CHART,
    careInstructions: STANDARD_CARE_INSTRUCTIONS,
    batchInfo: "Satuan (1-11 pcs) — Proses Cepat 2-4 Hari",
    modelInfo: "Cocok untuk tes desain dan sampel portofolio",
    shopeeUrl: "https://shopee.co.id/compaxgrup",
  },
];

export const getProduct = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);
