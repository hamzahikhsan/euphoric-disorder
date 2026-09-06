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
      <div className="pb-4 border-b border-bone/10">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-1.5 h-1.5 bg-lime inline-block" />
          <span className="text-[10px] font-mono text-lime uppercase tracking-[0.25em]">
            SYSTEM CONFIGURATION // KONFIGURASI MARKAS
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-bone">
          Pengaturan Situs & Pusat Komunikasi
        </h1>
        <p className="text-bone-dim text-xs font-mono mt-1">
          Atur identitas brand, jam operasional hotline WhatsApp, tautan toko Shopee, dan alamat workshop Kemayoran.
        </p>
      </div>

      <SettingsForm initialConfig={configMap} />
    </div>
  );
}
