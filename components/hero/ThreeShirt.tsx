"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center, ContactShadows } from "@react-three/drei";
import type { Group } from "three";

/**
 * Kaos 3D interaktif — STORYBOARD Scene 1.
 * - Float halus (bob) saat idle + bisa di-drag untuk rotate. Tanpa auto-spin
 *   (hero tenang; kaos diam menghadap depan).
 * - Draco decoder di-host lokal di /draco/ (bukan CDN) → cepat & tanpa
 *   dependency jaringan eksternal. GLB pakai EXT_texture_webp (didukung natif).
 * - Hormati prefers-reduced-motion: matikan bob, tetap bisa drag.
 *
 * Fallback gambar (HP lemah / reduced-motion / WebGL gagal) ditangani
 * oleh HeroScene, bukan di sini.
 */

const DRACO_PATH = "/draco/";

function Shirt({ url, reducedMotion }: { url: string; reducedMotion: boolean }) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(url, DRACO_PATH);

  useFrame((state) => {
    if (!group.current || reducedMotion) return;
    // Float halus: bob vertikal lembut + sedikit sway agar terasa "hidup".
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 0.8) * 0.04;
    group.current.rotation.z = Math.sin(t * 0.5) * 0.015;
  });

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

export default function ThreeShirt({ modelUrl }: { modelUrl: string }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Safeguard: di sebagian browser ResizeObserver awal tidak ter-fire,
  // sehingga R3F (react-use-measure) tak dapat ukuran & kanvas tak boot.
  // Trigger satu resize setelah paint untuk memastikan kanvas terukur.
  useEffect(() => {
    const raf = requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 2.4], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      {/* Pencahayaan lokal (tanpa HDRI jaringan) — netral, editorial. */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.5} />
      <directionalLight position={[-4, 2, -3]} intensity={0.55} />
      {/* Rim halus dari belakang untuk memisahkan kaos dari latar gelap. */}
      <directionalLight position={[0, 1, -5]} intensity={0.8} />

      <Suspense fallback={null}>
        <Shirt url={modelUrl} reducedMotion={reducedMotion} />
        <ContactShadows
          position={[0, -1.1, 0]}
          opacity={0.35}
          scale={6}
          blur={2.6}
          far={3}
        />
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.7}
      />
    </Canvas>
  );
}
