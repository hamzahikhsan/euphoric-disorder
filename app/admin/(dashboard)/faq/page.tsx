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
      <div>
        <h1 className="text-[#F1F3F5] text-2xl font-bold font-[family-name:var(--font-nohemi)]">
          Kelola FAQ (Tanya Jawab)
        </h1>
        <p className="text-[#909296] text-sm font-[family-name:var(--font-space-mono)] mt-1">
          Daftar pertanyaan yang tampil di bagian bawah halaman kontak website.
        </p>
      </div>

      <FaqManager initialFaqs={faqsList} />
    </div>
  );
}
