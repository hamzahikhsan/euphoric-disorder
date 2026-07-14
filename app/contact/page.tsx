import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";
import { site, waLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Lapor Kasus Baru — Contact",
  description:
    "Hubungi euphoric.disorder untuk custom order, kolaborasi, atau pertanyaan produk.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-forest text-bone">
      <div className="mx-auto max-w-content px-6 py-16">
        {/* header ringkas */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-[12px] font-extrabold uppercase leading-[1.02] tracking-tight text-bone"
          >
            Euphoric
            <br />
            Disorder
          </Link>
          <Link
            href="/"
            className="label-mono text-bone/60 transition-colors hover:text-lime"
          >
            ← Kembali
          </Link>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* kiri: intro */}
          <div>
            <p className="label-mono text-bone/50">Contact — case intake</p>
            <h1 className="mt-3 font-display text-h1 font-black uppercase leading-[0.9] tracking-tight text-bone">
              Lapor <span className="font-brush lowercase text-lime">kasus</span> baru
            </h1>
            <p className="mt-5 max-w-md font-body text-p1 leading-snug text-bone/75">
              Custom order, kolaborasi, atau sekadar tanya-tanya. Tinggalkan
              berkasmu — kami arsipkan dan balas secepatnya.
            </p>

            <dl className="mt-8 flex flex-col gap-3 font-body text-body1 text-bone/80">
              <div>
                <dt className="label-mono text-bone/45">WhatsApp</dt>
                <dd>
                  <a href={waLink(site.waGeneralMessage)} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-lime">
                    {site.whatsappNumber}
                  </a>{" "}
                  <span className="text-bone/45">· {site.whatsappHours}</span>
                </dd>
              </div>
              <div>
                <dt className="label-mono text-bone/45">Sosial</dt>
                <dd className="flex gap-4">
                  {site.socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-lime">
                      {s.label}
                    </a>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="label-mono text-bone/45">Lokasi</dt>
                <dd>
                  <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-lime">
                    {site.city}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* kanan: form → Supabase */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
