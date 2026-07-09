import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  title: "euphoric.disorder — The Case Files",
  description: "Brand streetwear/sablon bertema kriminologi. Comedy · Criminologist · Creativity.",
  openGraph: { title: "euphoric.disorder", description: "Setiap kaos punya catatan kriminalnya sendiri." }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=Inter:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
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
