"use client";

import type { Site } from "@/lib/types";
import { PageHeader } from "@/components/page-header";
import { SiteNav } from "@/components/site-nav";
import { DocumentList } from "@/components/document-list";
import { UploadDialog } from "@/components/upload-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/components/i18n-provider";

export function DocumentsView({ site }: { site: Site }) {
  const { t, fill } = useI18n();

  const byType = site.documents.reduce<Record<string, number>>((acc, d) => {
    acc[d.type] = (acc[d.type] ?? 0) + 1;
    return acc;
  }, {});

  const stats = [
    { label: t.documents.statTotal, value: site.documents.length },
    { label: t.documents.statReports, value: byType["Report"] ?? 0 },
    { label: t.documents.statDrawings, value: byType["Drawing"] ?? 0 },
    {
      label: t.documents.statCertsLegal,
      value: (byType["Certificate"] ?? 0) + (byType["Legal"] ?? 0),
    },
  ];

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title={t.documents.title}
        description={fill(t.documents.subtitle, { name: site.name })}
        crumbs={[
          { label: t.nav.sites, href: "/sites" },
          { label: site.reference, href: `/sites/${site.id}` },
          { label: t.documents.crumb },
        ]}
        actions={<UploadDialog label={t.documents.upload} siteName={site.name} />}
      />
      <SiteNav id={site.id} />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className="text-2xl font-semibold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <DocumentList documents={site.documents} />
    </div>
  );
}
