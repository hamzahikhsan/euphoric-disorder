import { getAdminSettings } from "@/app/actions/admin/settings";
import SettingsForm from "@/components/admin/SettingsForm";
import { site as fallbackSite } from "@/content/site";

export const dynamic = "force-dynamic";

export default async function PengaturanPage() {
  const res = await getAdminSettings();

  const configMap: Record<string, string> = {
    name: fallbackSite.name,
    wordmark: fallbackSite.wordmark,
    tagline: fallbackSite.tagline,
    thesis: fallbackSite.thesis,
    est: fallbackSite.est,
    city: fallbackSite.city,
    address: fallbackSite.address,
    maps_url: fallbackSite.mapsUrl,
    whatsapp_number: fallbackSite.whatsappNumber,
    whatsapp_base: fallbackSite.whatsappBase,
    whatsapp_hours: fallbackSite.whatsappHours,
    wa_general_message: fallbackSite.waGeneralMessage,
    shopee_url: fallbackSite.shopeeUrl,
    instagram: fallbackSite.instagram,
    threads: fallbackSite.threads,
  };

  if (res.ok && res.data) {
    for (const item of res.data) {
      configMap[item.key] = item.value;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[#F1F3F5] text-2xl font-bold font-[family-name:var(--font-nohemi)]">
          Pengaturan Situs
        </h1>
        <p className="text-[#909296] text-sm font-[family-name:var(--font-space-mono)] mt-1">
          Sesuaikan tagline, nomor WhatsApp, alamat workshop, dan tautan sosial media secara real-time.
        </p>
      </div>

      <SettingsForm initialConfig={configMap} />
    </div>
  );
}
