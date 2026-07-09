import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { IG_URL, SHOPEE_STORE } from "@/lib/products";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "euphoric.disorder — Kaos Sablon Streetwear #WarOnDrugs | The Case Files",
    template: "%s | euphoric.disorder"
  },
  description:
    "euphoric.disorder — brand sablon & kaos distro streetwear bertema kriminologi (comedy · criminologist · creativity). Koleksi #WarOnDrugs Cotton Combed 24s & Candy Hoodie edisi terbatas. Order via Shopee atau WhatsApp.",
  keywords: ["euphoric disorder","euphoric.disorder","sablon kaos","kaos distro","streetwear indonesia","kaos WarOnDrugs","candy hoodie","kriminologi","clothing brand","cotton combed 24s","custom sablon"],
  applicationName: SITE_NAME,
  authors: [{ name: "euphoric.disorder" }],
  creator: "euphoric.disorder",
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "website", locale: "id_ID", url: SITE_URL, siteName: SITE_NAME,
    title: "euphoric.disorder — The Case Files",
    description: "Setiap kaos punya catatan kriminalnya sendiri. Brand sablon streetwear bertema kriminologi.",
    images: [{ url: "/img/candy-hoodie.png", width: 800, height: 800, alt: "euphoric.disorder — Candy Hoodie" }]
  },
  twitter: { card: "summary_large_image", title: "euphoric.disorder — The Case Files", description: "Brand sablon streetwear bertema kriminologi. #WarOnDrugs.", images: ["/img/candy-hoodie.png"] },
  category: "shopping"
};

export default function RootLayout({ children }) {
  const org = {
    "@context":"https://schema.org","@type":"Store",
    name:"euphoric.disorder", url:SITE_URL, image:`${SITE_URL}/img/candy-hoodie.png`,
    description:"Brand sablon & kaos distro streetwear bertema kriminologi.",
    sameAs:[IG_URL, SHOPEE_STORE, "https://www.threads.net/@euphoric.disorder"]
  };
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=Inter:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(org)}} />
      </head>
      <body>
        <SmoothScroll>
          <Nav />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
