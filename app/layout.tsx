import type { Metadata, Viewport } from "next";
import { nohemi, ptSerif, spaceMono, permanentMarker } from "./fonts";
import JsonLd from "@/components/seo/JsonLd";
import "@/styles/globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://euphoric-disorder-eight.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "euphoric.disorder — Creativity of Fashion | Streetwear Kriminologi & Custom Sablon",
    template: "%s — euphoric.disorder",
  },
  description:
    "Brand streetwear independen asal Jakarta bertema kriminologi: Comedy, Criminologist, Creativity. Menyediakan koleksi kaos oversized, hoodie, dan jasa custom sablon apparel satuan/batch.",
  keywords: [
    "euphoric disorder",
    "streetwear jakarta",
    "kaos oversized",
    "custom sablon",
    "sablon kaos satuan",
    "konveksi streetwear",
    "clothing brand kriminologi",
    "plastisol",
    "cotton combed 24s",
    "kemayoran streetwear",
    "creativity of fashion",
  ],
  authors: [{ name: "Euphoric Disorder", url: siteUrl }],
  creator: "Euphoric Disorder",
  publisher: "Euphoric Disorder",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "euphoric.disorder",
    title: "euphoric.disorder — Creativity of Fashion",
    description:
      "Kejahatan sebagai bahan kajian. Kaos sebagai medium. Comedy · Criminologist · Creativity.",
    images: [
      {
        url: "/img/shirt-gray.png",
        width: 1200,
        height: 630,
        alt: "Euphoric Disorder Streetwear & Custom Apparel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "euphoric.disorder — Creativity of Fashion",
    description:
      "Streetwear bertema kriminologi & jasa custom sablon clothing berkualitas di Jakarta.",
    images: ["/img/shirt-gray.png"],
    creator: "@euphoric.disorder",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FCFCFA" },
    { media: "(prefers-color-scheme: dark)", color: "#2C3221" },
  ],
  width: "device-width",
  initialScale: 1,
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
      <head>
        <JsonLd type="organization" />
      </head>
      <body className="font-body antialiased selection:bg-accent selection:text-forest-deep">
        {children}
      </body>
    </html>
  );
}
