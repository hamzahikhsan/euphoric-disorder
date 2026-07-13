import type { Metadata } from "next";
import SmoothScroll from "@/components/system/SmoothScroll";
import SurfaceController from "@/components/system/SurfaceController";
import AnimatedPattern from "@/components/pattern/AnimatedPattern";
import Splash from "@/components/splash/Splash";
import Navbar from "@/components/nav/Navbar";
import Hero from "@/components/sections/Hero";
import CreativityScene from "@/components/sections/CreativityScene";
import StatementBlock from "@/components/sections/StatementBlock";
import GalleryScene from "@/components/sections/GalleryScene";
import ProfileProduct from "@/components/sections/ProfileProduct";
import PartOfOutfit from "@/components/sections/PartOfOutfit";
import Partners from "@/components/sections/Partners";
import SocialAlbum from "@/components/sections/SocialAlbum";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Creativity of Fashion",
};

/**
 * Home — mengikuti Figma "READY DESIGN".
 * Global: 1 animation pattern (AnimatedPattern) + 1 surface controller untuk
 * seluruh halaman. Section hanya menandai data-scene="light|dark".
 * Sudah jadi: Splash → Hero. Menyusul: scene 2–9.
 */
export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <SurfaceController />
      <AnimatedPattern />
      <Splash />
      <Navbar />

      <main>
        <Hero />
        <CreativityScene />
        <StatementBlock />
        <GalleryScene />
        <ProfileProduct />
        <PartOfOutfit />
        <Partners />
        <SocialAlbum />
      </main>

      <Footer />
    </>
  );
}
