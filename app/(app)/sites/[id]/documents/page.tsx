import { notFound } from "next/navigation";
import { Upload } from "lucide-react";
import { getSite, sites } from "@/lib/mock-data";
import { PageHeader } from "@/components/page-header";
import { SiteNav } from "@/components/site-nav";
import { DocumentList } from "@/components/document-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function generateStaticParams() {
  return sites.map((s) => ({ id: s.id }));
}

export default async function DocumentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const site = getSite(id);
  if (!site) notFound();

  const byType = site.documents.reduce<Record<string, number>>((acc, d) => {
    acc[d.type] = (acc[d.type] ?? 0) + 1;
    return acc;
  }, {});

  const stats = [
    { label: "Total documents", value: site.documents.length },
    { label: "Reports", value: byType["Report"] ?? 0 },
    { label: "Drawings", value: byType["Drawing"] ?? 0 },
    { label: "Certificates & Legal", value: (byType["Certificate"] ?? 0) + (byType["Legal"] ?? 0) },
  ];

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Documents"
        description={`Survey documentation and records for ${site.name}`}
        crumbs={[
          { label: "Sites", href: "/sites" },
          { label: site.reference, href: `/sites/${site.id}` },
          { label: "Documents" },
        ]}
        actions={
          <Button>
            <Upload className="h-4 w-4" /> Upload Document
          </Button>
        }
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
