"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { products } from "@/lib/products";

export default function Home() {
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const heroRef = useRef(null);
  const deckRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, innerWidth / innerHeight, 0.1, 100);
    camera.position.set(0, 0, 4.2);
    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const key = new THREE.DirectionalLight(0xffffff, 1.1); key.position.set(3, 5, 4); scene.add(key);
    const rim = new THREE.DirectionalLight(0xff2e88, 0.5); rim.position.set(-4, 2, -2); scene.add(rim);
    const fillL = new THREE.DirectionalLight(0x2436d8, 0.4); fillL.position.set(4, -2, -3); scene.add(fillL);
    const group = new THREE.Group(); scene.add(group);
    let model = null, raf = 0, alive = true;

    const draco = new DRACOLoader(); draco.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    const loader = new GLTFLoader(); loader.setDRACOLoader(draco);
    loader.load("/models/tshirt-1k.glb", (g) => {
      model = g.scene;
      const box = new THREE.Box3().setFromObject(model);
      const c = box.getCenter(new THREE.Vector3());
      const s = box.getSize(new THREE.Vector3());
      model.position.sub(c);
      model.scale.setScalar(1.9 / Math.max(s.x, s.y, s.z));
      group.add(model);
    });

    // drag
    const stage = stageRef.current;
    let dragRot = 0, drag = false, px = 0, vel = 0;
    const down = (e) => { drag = true; px = e.clientX; stage.classList.add("grabbing"); };
    const up = () => { drag = false; stage.classList.remove("grabbing"); };
    const move = (e) => { if (!drag) return; const dx = e.clientX - px; px = e.clientX; dragRot += dx * 0.008; vel = dx * 0.008; };
    stage.addEventListener("pointerdown", down);
    addEventListener("pointerup", up);
    addEventListener("pointermove", move);

    // glitch proximity
    const glitch = (e) => {
      const el = heroRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const near = e.clientX > r.left - 40 && e.clientX < r.right + 40 && e.clientY > r.top - 40 && e.clientY < r.bottom + 40;
      el.classList.toggle("glitch", near && scrollY < innerHeight * 0.6);
    };
    addEventListener("pointermove", glitch);

    const kf = [[0,0,0,1],[0.24,0,0,1],[0.46,-1.15,0,0.92],[0.62,-1.15,0,0.92],[0.76,-0.1,0.12,0.55],[0.9,0,-0.25,0.8],[1,0,-0.25,0.8]];
    const lerp = (a,b,t) => a + (b - a) * t;
    const sample = (p) => {
      for (let i=0;i<kf.length-1;i++){ if (p>=kf[i][0] && p<=kf[i+1][0]) { const t=(p-kf[i][0])/((kf[i+1][0]-kf[i][0])||1); const e=t*t*(3-2*t); return [lerp(kf[i][1],kf[i+1][1],e),lerp(kf[i][2],kf[i+1][2],e),lerp(kf[i][3],kf[i+1][3],e)]; } }
      const L = kf[kf.length-1]; return [L[1],L[2],L[3]];
    };
    let cur = { x:0, y:0, s:1 };
    const showcase = document.querySelector(".showcase");
    const cards = deckRef.current ? [...deckRef.current.querySelectorAll(".card")] : [];
    const mid = (cards.length - 1) / 2;

    const resize = () => { camera.aspect = innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); };
    resize(); addEventListener("resize", resize);

    const tick = () => {
      if (!alive) return;
      const max = document.body.scrollHeight - innerHeight;
      const p = max > 0 ? scrollY / max : 0;
      stage.classList.toggle("off", p > 0.22);
      const smp = sample(p);
      cur.x = lerp(cur.x, smp[0], 0.08); cur.y = lerp(cur.y, smp[1], 0.08); cur.s = lerp(cur.s, smp[2], 0.08);
      if (model) {
        group.position.set(cur.x, cur.y, 0); group.scale.setScalar(cur.s);
        if (!drag) { dragRot += vel; vel *= 0.92; }
        group.rotation.y = dragRot + p * Math.PI * 2;
      }
      if (showcase && cards.length) {
        const r = showcase.getBoundingClientRect();
        const segH = showcase.offsetHeight - innerHeight;
        let sp = 0; if (r.top <= 0 && -r.top <= segH) sp = (-r.top) / segH;
        sp = Math.min(1, Math.max(0, sp));
        const spread = Math.min(1, Math.max(0, (sp - 0.05) * 1.7));
        const eased = spread * spread * (3 - 2 * spread);
        cards.forEach((card, i) => {
          const d = i - mid;
          const x = d * 172 * eased;
          const rot = d * (3 + 5 * eased);
          const y = Math.abs(d) * Math.abs(d) * 10 * eased;
          const sc = 0.9 + 0.1 * eased;
          card.style.transform = `translate(${x}px,${y}px) rotate(${rot}deg) scale(${sc})`;
          card.style.zIndex = String(100 - Math.abs(d));
          card.style.opacity = (0.55 + 0.45 * Math.min(1, sp * 4)).toFixed(2);
        });
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      alive = false; cancelAnimationFrame(raf);
      removeEventListener("pointerup", up); removeEventListener("pointermove", move);
      removeEventListener("pointermove", glitch); removeEventListener("resize", resize);
      stage.removeEventListener("pointerdown", down);
      renderer.dispose();
    };
  }, []);

  const show = products.slice(0, 5);

  return (
    <>
      <canvas id="c" ref={canvasRef}></canvas>
      <div id="stage" ref={stageRef}></div>

      <main>
        <section className="hero">
          <div className="corner tl mono">EUPHORIC DISORDER — ARSIP PERKARA</div>
          <div className="corner tr mono">EST. 2024<br/>#WARONDRUGS</div>
          <div className="corner bl mono">Setiap kaos punya catatan kriminalnya sendiri.</div>
          <div className="corner br mono">CASE FILES 001–047<br/>STATUS: OPEN</div>
          <h1 ref={heroRef} id="heroTitle">
            <span className="gl" data-text="ALWAYS">ALWAYS</span>
            <span className="gl" data-text="BRINGING">BRINGING</span>
            <span className="gl" data-text="THE FIGHT">THE FIGHT</span>
          </h1>
          <div className="scrollhint mono">SCROLL — BUKA BERKAS<div className="bar"></div></div>
        </section>

        <section className="about-home">
          <div className="panel">
            <span className="eyebrow">Exhibit A — About</span>
            <h2 className="misreg">Setiap desain<br/>adalah barang bukti.</h2>
            <p>euphoric.disorder menyusun berkas perkara dari tiap motif: satu nomor kasus, satu cerita, satu kejahatan kecil yang dijadikan busana.</p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <Link className="btn ink" href="/about">Baca Berkas Lengkap →</Link>
              <Link className="btn" href="/product">Lihat Semua Kasus</Link>
            </div>
          </div>
        </section>

        <section className="showcase">
          <div className="pin">
            <h2 className="misreg" style={{fontFamily:"var(--f-display)",textTransform:"uppercase",fontSize:"clamp(2rem,6vw,4rem)"}}>THE CASE FILES</h2>
            <div className="sub mono" style={{margin:"6px 0 44px"}}>Scroll — barang bukti tersusun dari tumpukan</div>
            <div className="deck" ref={deckRef}>
              {show.map((p) => (
                <Link key={p.slug} href={`/product/${p.slug}`} className="card">
                  <div className="thumb"><img src={p.img} alt={p.name}/><div className="dots"></div><span className="no">CASE #{p.no}</span></div>
                  <div className="b"><h4>{p.name}</h4><div className="price">{p.price}</div><span className={`badge ${p.badge}`}>{p.status}</span></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="foot-spacer"></section>
      </main>
    </>
  );
}
