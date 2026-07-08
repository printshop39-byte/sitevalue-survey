import { notFound } from "next/navigation";
import { getSite, sites } from "@/lib/mock-data";
import { SiteDetailView } from "@/components/site-detail-view";

export function generateStaticParams() {
  return sites.map((s) => ({ id: s.id }));
}

export default async function SiteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const site = getSite(id);
  if (!site) notFound();

  return <SiteDetailView site={site} />;
}
