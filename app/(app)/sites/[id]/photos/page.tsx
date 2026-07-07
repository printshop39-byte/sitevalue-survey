import { notFound } from "next/navigation";
import { Upload } from "lucide-react";
import { getSite, sites } from "@/lib/mock-data";
import { PageHeader } from "@/components/page-header";
import { SiteNav } from "@/components/site-nav";
import { PhotoGallery } from "@/components/photo-gallery";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";

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

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title={t.detail.photoGallery}
        description={`${site.name} च्या सर्वेक्षणादरम्यान घेतलेली ${site.photos.length} छायाचित्रे`}
        crumbs={[
          { label: t.nav.sites, href: "/sites" },
          { label: site.reference, href: `/sites/${site.id}` },
          { label: t.gallery.crumb },
        ]}
        actions={
          <Button>
            <Upload className="h-4 w-4" /> {t.gallery.upload}
          </Button>
        }
      />
      <SiteNav id={site.id} />
      <PhotoGallery photos={site.photos} />
    </div>
  );
}
