"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { site, waLink } from "@/content/site";

const inputCls =
  "mt-1 w-full rounded-sm border border-bone/20 bg-forest-deep px-4 py-3 font-body text-body1 text-bone placeholder:text-bone/35 outline-none transition-colors focus:border-lime";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-[48px] items-center justify-center rounded-pill bg-lime px-7 font-display text-body1 font-bold text-ink transition-transform duration-micro hover:scale-[1.02] active:scale-95 disabled:opacity-60"
    >
      {pending ? "Mengirim…" : "Kirim laporan"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState<ContactState, FormData>(
    submitContact,
    null
  );

  if (state?.ok) {
    return (
      <div className="rounded-lg border border-lime/40 bg-lime/5 p-6">
        <p className="font-display text-h4 font-bold text-lime">
          Laporan diterima.
        </p>
        <p className="mt-2 font-body text-body1 text-bone/80">
          Berkasmu sudah kami arsipkan. Kami balas via kontak yang kamu tinggalkan.
          Butuh cepat? Hubungi langsung via WhatsApp ({site.whatsappHours}).
        </p>
        <a
          href={waLink(site.waGeneralMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-[44px] items-center rounded-pill border border-bone/40 px-5 font-display text-body2 font-bold text-bone transition-colors hover:bg-bone/10"
        >
          Chat WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {/* honeypot anti-bot (disembunyikan) */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      <div>
        <label htmlFor="name" className="label-mono text-bone/60">
          Nama *
        </label>
        <input id="name" name="name" required maxLength={120} className={inputCls} placeholder="Nama kamu" />
      </div>

      <div>
        <label htmlFor="contact" className="label-mono text-bone/60">
          Kontak (WhatsApp / Email / IG) *
        </label>
        <input id="contact" name="contact" required maxLength={200} className={inputCls} placeholder="08xx / email / @ig" />
      </div>

      <div>
        <label htmlFor="subject" className="label-mono text-bone/60">
          Perihal
        </label>
        <select id="subject" name="subject" className={inputCls} defaultValue="">
          <option value="">Pilih perihal…</option>
          <option value="Custom order">Custom order</option>
          <option value="Kolaborasi">Kolaborasi</option>
          <option value="Pertanyaan produk">Pertanyaan produk</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="label-mono text-bone/60">
          Pesan *
        </label>
        <textarea id="message" name="message" required maxLength={4000} rows={5} className={inputCls} placeholder="Ceritakan kasusmu…" />
      </div>

      {state?.error && (
        <p role="alert" className="font-body text-body2 text-[#ff6b6b]">
          {state.error}
        </p>
      )}

      <div className="mt-2">
        <SubmitButton />
      </div>
    </form>
  );
}
