"use client";

import { Suspense, useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";

/**
 * Model 3D kaos oversized (tshirt-1k.glb, ~1.8MB, Draco-compressed).
 * Auto-rotate pelan saat idle; user bisa drag untuk putar manual.
 * Transparent bg agar menyatu dengan section parent.
 * Fallback: gambar statis kalau WebGL gagal.
 */

const MODEL_URL = "/models/tshirt-1k.glb";

/* ---------- Model component ---------- */
function TShirtModel() {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    // Auto-center & auto-scale berdasarkan bounding box model
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Pindahkan scene agar center-nya di origin
    scene.position.sub(center);

    // Hitung scale supaya model pas di viewport
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 2.4; // ukuran target di world units
    const scaleFactor = targetSize / maxDim;

    if (groupRef.current) {
      groupRef.current.scale.setScalar(scaleFactor);
    }

    // Adjust camera distance
    const dist = targetSize / (2 * Math.tan((Math.PI * 40) / 360));
    camera.position.set(0, 0, dist * 1.2);
    camera.updateProjectionMatrix();

    // Pastikan material menerima cahaya dengan baik
    scene.traverse((child) => {
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
              mat.envMapIntensity = 0.8;
              mat.needsUpdate = true;
            }
          });
        }
      }
    });
  }, [scene, camera]);

  // Floating animation halus
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

/* ---------- Scene content (di dalam Canvas) ---------- */
function SceneContent({ onLoaded }: { onLoaded: () => void }) {
  useEffect(() => {
    onLoaded();
  }, [onLoaded]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow />
      <directionalLight
        position={[-4, 3, -2]}
        intensity={0.5}
        color="#CDFF00"
      />
      <pointLight position={[0, -3, 4]} intensity={0.3} color="#EDEBDD" />

      {/* Hemisphere light untuk fill natural */}
      <hemisphereLight
        color="#EDEBDD"
        groundColor="#2C3221"
        intensity={0.4}
      />

      {/* Model */}
      <Center>
        <TShirtModel />
      </Center>

      {/* Orbit controls — rotate only, no zoom/pan */}
      <OrbitControls
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
      <torusGeometry args={[0.5, 0.06, 16, 48, Math.PI * 1.5]} />
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
          position: [0, 0, 4],
          fov: 40,
          near: 0.01,
          far: 200,
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
        }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
        }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <SceneContent onLoaded={handleLoaded} />
        </Suspense>
      </Canvas>

      {/* Hint interaksi — tampil setelah model loaded */}
      <div
        className={`pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 transition-opacity duration-700 ${
          modelLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="label-mono inline-flex items-center gap-2 rounded-pill bg-forest-deep/70 px-3 py-1.5 text-bone/70 backdrop-blur-sm">
          <svg
            width="14"
            height="14"
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
useGLTF.preload(MODEL_URL);
