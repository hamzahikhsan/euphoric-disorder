import type { Metadata, Viewport } from "next";
import { archivo, inter, spaceMono } from "./fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://euphoricdisorder.example"), // ⚠️ ganti domain final nanti
  title: {
    default: "euphoric.disorder — An Archive of Disorder",
    template: "%s — euphoric.disorder",
  },
  description:
    "euphoric.disorder — arsip streetwear bertema kriminologi. Desain edisi terbatas yang mengkaji kekacauan manusia; comedy, criminologist, creativity.",
  keywords: ["euphoric disorder", "streetwear", "kaos distro", "criminology", "War on Drugs"],
  openGraph: {
    type: "website",
    siteName: "euphoric.disorder",
    title: "euphoric.disorder — An Archive of Disorder",
    description:
      "Arsip streetwear bertema kriminologi. Edisi terbatas; comedy, criminologist, creativity.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0E0E10",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${archivo.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body className="bg-bg-base font-body text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
