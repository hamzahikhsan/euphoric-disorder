import { notFound } from "next/navigation";
import { getAdminMessageById } from "@/app/actions/admin/messages";
import MessageDetailView from "@/components/admin/MessageDetailView";

export const dynamic = "force-dynamic";

export default async function PesanDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await getAdminMessageById(params.id);

  if (!res.ok || !res.data) {
    notFound();
  }

  return <MessageDetailView message={res.data} />;
}
