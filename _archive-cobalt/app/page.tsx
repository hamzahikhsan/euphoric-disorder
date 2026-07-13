import type { Metadata } from "next";
import HeroScene from "@/components/hero/HeroScene";
import { AboutSummary } from "@/components/home/AboutSummary";
import { ProductIndex } from "@/components/home/ProductIndex";
import { StatementBand } from "@/components/home/StatementBand";
import { SiteFooter } from "@/components/footer/SiteFooter";

export const metadata: Metadata = {
  title: "An Archive of Disorder",
  description:
    "euphoric.disorder — arsip streetwear bertema kriminologi. Desain edisi terbatas yang mengkaji kekacauan manusia; comedy, criminologist, creativity.",
};

/**
 * Home — 5 scene (STORYBOARD). Versi STATIS (rapi + SEO);
 * lapisan gerak scroll (preloader, scroll-linked kaos, parallax) menyusul
 * sesuai urutan BUILD-SPEC §3.
 */
export default function HomePage() {
  return (
    <>
      <HeroScene /> {/* Scene 1 */}
      <main>
        <AboutSummary /> {/* Scene 2 */}
        <ProductIndex /> {/* Scene 3 */}
        <StatementBand /> {/* Scene 4 */}
      </main>
      <SiteFooter /> {/* Scene 5 */}
    </>
  );
}
