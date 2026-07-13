import { Archivo, Inter, Space_Mono } from "next/font/google";

/**
 * Font brand via next/font (self-hosted, tanpa layout shift).
 * Masing-masing mengekspor CSS variable yang di-wiring ke token
 * --font-display / --font-body / --font-mono di styles/globals.css.
 */

// Display — Archivo (grotesk profesional). 400/600/700 sesuai DESIGN-SYSTEM.
export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

// Body — Inter.
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Label/indeks — Space Mono (dipakai kecil & hemat).
export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});
