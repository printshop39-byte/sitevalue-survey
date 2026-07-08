import { notFound } from "next/navigation";
import { getSite, sites } from "@/lib/mock-data";
import { PhotosView } from "@/components/photos-view";

export function generateStaticParams() {
  return sites.map((s) => ({ id: s.id }));
}

export default async function PhotosPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const site = getSite(id);
  if (!site) notFound();

  return <PhotosView site={site} />;
}
