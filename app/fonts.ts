import localFont from "next/font/local";
import { Space_Mono } from "next/font/google";

/**
 * Font brand — self-hosted (file dari user) via next/font/local.
 *  - display + body → Nohemi (grotesk geometris; wordmark & teks)
 *  - serif          → PT Serif (OUR PROFILE / OUR PRODUCT)
 *  - brush          → Permanent Marker (CREATIVITY / CODM LABS)
 *  - mono/label     → Space Mono (Google; label berkas gaya forensik)
 */

export const nohemi = localFont({
  src: [
    { path: "./fonts/Nohemi-Regular.woff", weight: "400", style: "normal" },
    { path: "./fonts/Nohemi-Medium.woff", weight: "500", style: "normal" },
    { path: "./fonts/Nohemi-SemiBold.woff", weight: "600", style: "normal" },
    { path: "./fonts/Nohemi-Bold.woff", weight: "700", style: "normal" },
    { path: "./fonts/Nohemi-ExtraBold.woff", weight: "800", style: "normal" },
    { path: "./fonts/Nohemi-Black.woff", weight: "900", style: "normal" },
  ],
  variable: "--font-nohemi",
  display: "swap",
});

export const ptSerif = localFont({
  src: [
    { path: "./fonts/PTSerif-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/PTSerif-Italic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/PTSerif-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-pt-serif",
  display: "swap",
});

export const permanentMarker = localFont({
  src: [
    { path: "./fonts/PermanentMarker-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--font-permanent-marker",
  display: "swap",
});

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});
