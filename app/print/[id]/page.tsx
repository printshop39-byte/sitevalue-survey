import { notFound } from "next/navigation";
import { getSite, sites } from "@/lib/mock-data";
import { PrintReport } from "@/components/print-report";

export function generateStaticParams() {
  return sites.map((s) => ({ id: s.id }));
}

export default async function PrintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const site = getSite(id);
  if (!site) notFound();

  return <PrintReport site={site} />;
}
