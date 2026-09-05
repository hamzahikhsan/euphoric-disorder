import { getAdminMessages } from "@/app/actions/admin/messages";
import MessageInbox from "@/components/admin/MessageInbox";

export const dynamic = "force-dynamic";

export default async function PesanPage() {
  const res = await getAdminMessages();
  const messages = res.ok && res.data ? res.data : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[#F1F3F5] text-2xl font-bold font-[family-name:var(--font-nohemi)]">
          Kotak Masuk Pesan Pelanggan
        </h1>
        <p className="text-[#909296] text-sm font-[family-name:var(--font-space-mono)] mt-1">
          Laporan kasus dan pertanyaan yang dikirimkan pelanggan melalui formulir kontak.
        </p>
      </div>

      <MessageInbox initialMessages={messages} />
    </div>
  );
}
