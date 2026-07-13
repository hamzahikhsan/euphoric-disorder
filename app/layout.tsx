import type { Metadata, Viewport } from "next";
import { nohemi, ptSerif, spaceMono, permanentMarker } from "./fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://euphoricdisorder.example"), // ⚠️ ganti domain final nanti
  title: {
    default: "euphoric.disorder — Creativity of Fashion",
    template: "%s — euphoric.disorder",
  },
  description:
    "euphoric.disorder — streetwear/sablon bertema kriminologi: comedy, criminologist, creativity.",
  keywords: ["euphoric disorder", "streetwear", "kaos", "sablon", "creativity"],
  openGraph: {
    type: "website",
    siteName: "euphoric.disorder",
    title: "euphoric.disorder — Creativity of Fashion",
    description: "Streetwear bertema kriminologi: comedy, criminologist, creativity.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FCFCFA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      data-surface="light"
      className={`${nohemi.variable} ${ptSerif.variable} ${spaceMono.variable} ${permanentMarker.variable}`}
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
