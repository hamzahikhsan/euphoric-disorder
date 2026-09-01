"use client";

import { useState } from "react";
import SmoothScroll from "@/components/system/SmoothScroll";
import SurfaceController from "@/components/system/SurfaceController";
import AnimatedPattern from "@/components/pattern/AnimatedPattern";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/sections/Footer";
import { site, waLink } from "@/content/site";
import { FAQS } from "@/content/faqs";

// Helper sanitasi input dari potensi XSS injection
function sanitizeInput(val: string): string {
  return val
    .replace(/[<>'"&]/g, (char) => {
      const map: Record<string, string> = {
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
        "&": "&amp;",
      };
      return map[char] || char;
    })
    .trim();
}

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    subject: "Pertanyaan Umum",
    message: "",
    website_hp: "", // Honeypot anti-spam field
  });
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Bot detection via honeypot
    if (formData.website_hp) {
      console.warn("Spam bot detected via honeypot field.");
      setSubmitted(true);
      return;
    }

    const cleanName = sanitizeInput(formData.name);
    const cleanContact = sanitizeInput(formData.contact);
    const cleanMessage = sanitizeInput(formData.message);

    if (!cleanName || cleanName.length < 2) {
      setValidationError("Mohon masukkan nama atau identitas yang valid.");
      return;
    }

    if (!cleanContact || cleanContact.length < 4) {
      setValidationError("Mohon masukkan nomor WhatsApp atau akun Instagram yang valid.");
      return;
    }

    if (!cleanMessage || cleanMessage.length < 5) {
      setValidationError("Mohon masukkan rincian pesan minimal 5 karakter.");
      return;
    }

    // Direct redirection to WhatsApp with pre-filled case log
    const waMsg = `[LAPOR KASUS / INQUIRY]\nNama: ${cleanName}\nKontak: ${cleanContact}\nPerkara: ${formData.subject}\nPesan: ${cleanMessage}`;
    window.open(waLink(waMsg), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <>
      <SmoothScroll />
      <SurfaceController />
      <AnimatedPattern />
      <Navbar />

      <main className="min-h-screen pt-24 pb-12">
        {/* SECTION 1: HEADER (LIGHT) */}
        <section data-scene="light" className="relative px-6 py-16">
          <div className="mx-auto max-w-content">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="label-mono rounded-sm bg-lime px-2.5 py-1 text-ink font-bold">
                  FIELD STATION
                </span>
                <span className="label-mono text-fg-dim">DIRECT CHANNELS</span>
              </div>

              <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tight text-fg">
                Contact &amp; <span className="font-serif italic text-accent">Lapor Kasus</span>
              </h1>

              <p className="mt-2 max-w-xl font-body text-p2 text-fg-dim leading-relaxed">
                Punya pertanyaan seputar produk, stok, atau ingin mengajukan proyek sablon custom? Hubungi markas kami melalui saluran resmi di bawah ini.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: CHANNELS & FORM (DARK) */}
        <section data-scene="dark" className="relative px-6 py-20 my-8">
          <div className="mx-auto max-w-content">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              {/* Saluran Resmi (Kiri) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                <div>
                  <span className="label-mono text-accent">Official Channels</span>
                  <h2 className="mt-2 font-display text-h2 font-black uppercase text-fg">
                    Saluran Direct
                  </h2>
                  <p className="mt-2 font-body text-body1 text-fg-dim">
                    Respon tercepat pada jam kerja: {site.whatsappHours}.
                  </p>

                  <div className="mt-8 space-y-4">
                    {/* WA Card */}
                    <a
                      href={waLink(site.waGeneralMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-fg/15 bg-fg/5 p-5 transition-all hover:border-accent hover:bg-fg/10"
                    >
                      <div>
                        <span className="label-mono text-accent block">WhatsApp Business</span>
                        <span className="font-display text-h4 font-bold text-fg group-hover:text-accent">
                          {site.whatsappNumber}
                        </span>
                      </div>
                      <span className="text-h3 font-bold text-accent group-hover:translate-x-1 transition-transform">→</span>
                    </a>

                    {/* Shopee Store */}
                    <a
                      href={site.shopeeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-fg/15 bg-fg/5 p-5 transition-all hover:border-accent hover:bg-fg/10"
                    >
                      <div>
                        <span className="label-mono text-accent block">Shopee Official Store</span>
                        <span className="font-display text-h4 font-bold text-fg group-hover:text-accent">
                          shopee.co.id/compaxgrup
                        </span>
                      </div>
                      <span className="text-h3 font-bold text-accent group-hover:translate-x-1 transition-transform">→</span>
                    </a>

                    {/* Instagram */}
                    <a
                      href={site.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-fg/15 bg-fg/5 p-5 transition-all hover:border-accent hover:bg-fg/10"
                    >
                      <div>
                        <span className="label-mono text-accent block">Instagram Feed</span>
                        <span className="font-display text-h4 font-bold text-fg group-hover:text-accent">
                          @euphoric.disorder
                        </span>
                      </div>
                      <span className="text-h3 font-bold text-accent group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Form Lapor Kasus / Custom Order (Kanan) */}
              <div className="lg:col-span-7 rounded-2xl border border-fg/15 bg-fg/5 p-8 md:p-10 shadow-2xl backdrop-blur-md">
                <span className="label-mono text-accent">Form Pelaporan</span>
                <h2 className="mt-1 font-display text-h2 font-black uppercase text-fg">
                  Lapor Kasus / Custom Inquiry
                </h2>
                <p className="mt-2 font-body text-body2 text-fg-dim">
                  Isi formulir ini untuk mengajukan barang bukti baru, pesanan sablon custom, atau pertanyaan bisnis.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  {/* Anti-spam Honeypot field (hidden from humans) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website_hp">Leave this empty</label>
                    <input
                      id="website_hp"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website_hp}
                      onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block label-mono text-fg mb-2">
                      Nama Pelapor / Identitas *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Misal: Alex / Komunitas Street"
                      className="w-full rounded-lg border border-fg/20 bg-fg/5 px-4 py-3 font-body text-fg placeholder-fg/40 focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block label-mono text-fg mb-2">
                      Kontak (No. WA / Instagram) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={50}
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="0856xxxxxxx / @username"
                      className="w-full rounded-lg border border-fg/20 bg-fg/5 px-4 py-3 font-body text-fg placeholder-fg/40 focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block label-mono text-fg mb-2">
                      Subjek Perkara
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-lg border border-fg/20 bg-fg/5 px-4 py-3 font-body text-fg focus:border-accent focus:outline-none"
                    >
                      <option value="Tanya Produk & Pre-Order">Tanya Produk &amp; Pre-Order</option>
                      <option value="Order Sablon Custom / Komunitas">Order Sablon Custom / Komunitas</option>
                      <option value="Kerjasama & Kolaborasi">Kerjasama &amp; Kolaborasi</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block label-mono text-fg mb-2">
                      Rincian Laporan / Pesanan *
                    </label>
                    <textarea
                      required
                      rows={4}
                      maxLength={1000}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tuliskan detail pertanyaan atau jumlah pesanan baju..."
                      className="w-full rounded-lg border border-fg/20 bg-fg/5 px-4 py-3 font-body text-fg placeholder-fg/40 focus:border-accent focus:outline-none"
                    />
                  </div>

                  {validationError && (
                    <p className="font-mono text-caption text-red-400 bg-red-950/40 border border-red-800/50 rounded-md p-3">
                      ⚠️ {validationError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded-pill bg-lime py-4 font-display text-h4 font-bold text-ink transition-transform hover:scale-[1.01] active:scale-95 shadow-lg"
                  >
                    Kirim Laporan via WhatsApp →
                  </button>

                  {submitted && (
                    <p className="font-mono text-caption text-accent text-center mt-2">
                      ✓ Laporan siap dikirimkan ke WhatsApp Admin!
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: HEADQUARTERS LOCATION (LIGHT) */}
        <section data-scene="light" className="relative px-6 py-20">
          <div className="mx-auto max-w-content">
            <div className="rounded-2xl border border-fg/15 bg-fg/5 p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <span className="label-mono text-accent">Headquarters</span>
                <h2 className="mt-1 font-display text-[clamp(2rem,4vw,3.5rem)] font-black uppercase text-fg leading-none">
                  Kemayoran, <span className="font-serif italic text-accent">Jakarta Pusat</span>
                </h2>
                <p className="mt-3 max-w-xl font-body text-p2 text-fg-dim">
                  {site.address}
                </p>
              </div>

              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap rounded-pill bg-lime px-8 py-4 font-display text-h4 font-bold text-ink transition-transform hover:scale-105 shadow-lg"
              >
                Petunjuk Arah Google Maps ↗
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 4: FAQ ACCORDION (DARK) */}
        <section data-scene="dark" className="relative px-6 py-24">
          <div className="mx-auto max-w-content">
            <div className="mb-12 text-center">
              <span className="label-mono text-accent">Pertanyaan Umum</span>
              <h2 className="mt-1 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-black uppercase text-fg">
                FAQ — <span className="font-serif italic text-accent">Pertanyaan Perkara</span>
              </h2>
            </div>

            <div className="mx-auto max-w-3xl space-y-4">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-fg/15 bg-fg/5 p-6 shadow-md transition-all hover:border-accent"
                >
                  <h3 className="font-display text-h4 font-bold text-fg">
                    {faq.q}
                  </h3>
                  <p className="mt-2 font-body text-p2 text-fg-dim leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
