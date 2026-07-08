"use client";

import type { Site } from "@/lib/types";
import { PageHeader } from "@/components/page-header";
import { SiteNav } from "@/components/site-nav";
import { PhotoGallery } from "@/components/photo-gallery";
import { UploadDialog } from "@/components/upload-dialog";
import { useI18n } from "@/components/i18n-provider";

export function PhotosView({ site }: { site: Site }) {
  const { t, fill } = useI18n();

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title={t.detail.photoGallery}
        description={fill(t.gallery.subtitle, {
          n: site.photos.length,
          name: site.name,
        })}
        crumbs={[
          { label: t.nav.sites, href: "/sites" },
          { label: site.reference, href: `/sites/${site.id}` },
          { label: t.gallery.crumb },
        ]}
        actions={<UploadDialog label={t.gallery.upload} siteName={site.name} />}
      />
      <SiteNav id={site.id} />
      <PhotoGallery photos={site.photos} />
    </div>
  );
}
