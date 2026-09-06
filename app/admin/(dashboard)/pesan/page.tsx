import { getAdminMessages } from "@/app/actions/admin/messages";
import MessageInbox from "@/components/admin/MessageInbox";

export const dynamic = "force-dynamic";

export default async function PesanPage() {
  const res = await getAdminMessages();
  const messages = res.ok && res.data ? res.data : [];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-bone/10">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-1.5 h-1.5 bg-lime inline-block" />
          <span className="text-[10px] font-mono text-lime uppercase tracking-[0.25em]">
            TRANSMISSION VAULT // KOTAK MASUK INVESTIGASI
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-bone">
          Transmisi Pesan & Pertanyaan Pelanggan
        </h1>
        <p className="text-bone-dim text-xs font-mono mt-1">
          Laporan kasus, inquiry kustom sablon, dan pertanyaan langsung dari formulir kontak publik.
        </p>
      </div>

      <MessageInbox initialMessages={messages} />
    </div>
  );
}
