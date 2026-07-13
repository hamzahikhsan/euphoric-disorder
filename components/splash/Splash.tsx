"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Splash: video brush "CREATIVITY" (bg lime) ~3 dtk lalu zoom-out + fade
 * transisi ke homepage (storyboard scene 0).
 * - Tampil sekali per sesi (sessionStorage) agar tidak mengganggu.
 * - prefers-reduced-motion: langsung skip.
 */
export default function Splash() {
  const [phase, setPhase] = useState<"show" | "exit" | "hidden">("hidden");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("ed-splash-seen");
    if (reduce || seen) {
      setPhase("hidden");
      return;
    }

    setPhase("show");
    document.body.style.overflow = "hidden";

    const exitT = setTimeout(() => setPhase("exit"), 3000);
    const doneT = setTimeout(() => {
      setPhase("hidden");
      document.body.style.overflow = "";
      sessionStorage.setItem("ed-splash-seen", "1");
    }, 3000 + 900);

    return () => {
      clearTimeout(exitT);
      clearTimeout(doneT);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-splash flex items-center justify-center overflow-hidden bg-lime"
      style={{
        transition: "transform 900ms var(--ease-inout), opacity 900ms var(--ease-inout)",
        transform: phase === "exit" ? "scale(1.35)" : "scale(1)",
        opacity: phase === "exit" ? 0 : 1,
      }}
    >
      <video
        ref={videoRef}
        className="w-[min(60vw,720px)]"
        src="/video/splash.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
