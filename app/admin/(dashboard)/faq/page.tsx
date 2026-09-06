import { getAdminFaqs } from "@/app/actions/admin/faqs";
import FaqManager from "@/components/admin/FaqManager";
import { FAQS as fallbackFaqs } from "@/content/faqs";
import type { Database } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

type FaqRow = Database["public"]["Tables"]["faqs"]["Row"];

export default async function FaqPage() {
  const res = await getAdminFaqs();

  let faqsList: FaqRow[] = [];

  if (res.ok && res.data && res.data.length > 0) {
    faqsList = res.data;
  } else {
    // Fallback ke static faqs
    faqsList = fallbackFaqs.map((f, i) => ({
      id: `fallback-faq-${i}`,
      question: f.q,
      answer: f.a,
      sort_order: i + 1,
      is_visible: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-bone/10">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-1.5 h-1.5 bg-lime inline-block" />
          <span className="text-[10px] font-mono text-lime uppercase tracking-[0.25em]">
            BRIEFING ARCHIVE // INTEL TANYA JAWAB
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-bone">
          Kelola Pertanyaan Umum (FAQ)
        </h1>
        <p className="text-bone-dim text-xs font-mono mt-1">
          Daftar penjelasan berkas, panduan pemesanan, custom sablon, dan informasi operasional publik.
        </p>
      </div>

      <FaqManager initialFaqs={faqsList} />
    </div>
  );
}
