"use client";

import { Suspense, useRef, useEffect, useState, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";

/**
 * Model 3D kaos oversized (tshirt-1k.glb, ~1.8MB, Draco-compressed).
 * Auto-rotate pelan saat idle; user bisa drag untuk putar manual.
 * Transparent bg agar menyatu dengan section parent.
 * Fallback: gambar statis kalau WebGL gagal.
 */

const MODEL_URL = "/models/tshirt-1k.glb";
const DRACO_PATH = "/draco/";

/* ---------- Model component ---------- */
function TShirtModel({ onLoaded }: { onLoaded?: () => void }) {
  const { scene } = useGLTF(MODEL_URL, DRACO_PATH);
  const groupRef = useRef<THREE.Group>(null);

  // Clone scene and auto-center / auto-scale in useMemo
  const { modelClone, scale } = useMemo(() => {
    const clone = scene.clone(true);

    // Setup materials, shadows, and fabric texture enhancement
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const materials = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];
          materials.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.side = THREE.DoubleSide;
              mat.roughness = 0.7;
              mat.metalness = 0.1;
              mat.envMapIntensity = 1.0;
              mat.needsUpdate = true;
            }
          });
        }
      }
    });

    // Compute bounding box
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Center model precisely at origin (0, 0, 0)
    clone.position.set(-center.x, -center.y, -center.z);

    // Target visual size: 1.85 units (leaves ~28% margin inside canvas for collar, sleeves & floating animation)
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetScale = 1.85 / maxDim;

    return { modelClone: clone, scale: targetScale };
  }, [scene]);

  useEffect(() => {
    if (onLoaded) onLoaded();
  }, [onLoaded]);

  // Floating animation halus
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.035;
    }
  });

  return (
    <group ref={groupRef} scale={scale} position={[0, 0, 0]}>
      <primitive object={modelClone} />
    </group>
  );
}

/* ---------- Scene content (di dalam Canvas) ---------- */
function SceneContent({ onLoaded }: { onLoaded: () => void }) {
  return (
    <>
      {/* Studio Lighting Setup for Streetwear Fabric */}
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 4]} intensity={2.0} castShadow />
      <directionalLight position={[-4, 3, -3]} intensity={0.9} color="#CDFF00" />
      <directionalLight position={[0, -3, 3]} intensity={0.6} color="#EDEBDD" />
      <pointLight position={[0, 1, 3.5]} intensity={0.9} color="#FFFFFF" />

      {/* Model */}
      <TShirtModel onLoaded={onLoaded} />

      {/* Orbit controls — rotate only, centered on (0, 0, 0) */}
      <OrbitControls
        target={[0, 0, 0]}
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.2}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        dampingFactor={0.08}
        enableDamping
      />
    </>
  );
}

/* ---------- Loading spinner 3D ---------- */
function LoadingSpinner() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[0.35, 0.04, 16, 48, Math.PI * 1.5]} />
      <meshBasicMaterial color="#CDFF00" transparent opacity={0.7} />
    </mesh>
  );
}

/* ---------- Main viewer ---------- */
export default function TShirtViewer({
  className = "",
}: {
  className?: string;
}) {
  const [webGLFailed, setWebGLFailed] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  const handleLoaded = useCallback(() => {
    setModelLoaded(true);
  }, []);

  // Cek WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) {
        setWebGLFailed(true);
      }
    } catch {
      setWebGLFailed(true);
    }
  }, []);

  // Fallback gambar statis jika WebGL tidak support
  if (webGLFailed) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src="/img/shirt-gray.png"
          alt="Kaos oversized euphoric.disorder"
          width={701}
          height={648}
          className="h-full w-full object-contain drop-shadow-2xl"
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ touchAction: "none" }}>
      <Canvas
        camera={{
          position: [0, 0, 3.5],
          fov: 40,
          near: 0.1,
          far: 50,
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
        }}
        dpr={[1, 2]}
        style={{ background: "transparent", width: "100%", height: "100%" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.35;
        }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <SceneContent onLoaded={handleLoaded} />
        </Suspense>
      </Canvas>

      {/* Hint interaksi — tampil setelah model loaded */}
      <div
        className={`pointer-events-none absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-700 ${
          modelLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="label-mono inline-flex items-center gap-2 rounded-pill bg-forest-deep/80 border border-bone/15 px-3 py-1 text-bone/80 backdrop-blur-sm text-caption">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M4 12h3m10 0h3M12 4v3m0 10v3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M7.8 7.8l1.4 1.4m5.6 5.6l1.4 1.4M16.2 7.8l-1.4 1.4M9.2 14.8l-1.4 1.4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Drag to rotate
        </span>
      </div>
    </div>
  );
}

// Preload model
useGLTF.preload(MODEL_URL, DRACO_PATH);
