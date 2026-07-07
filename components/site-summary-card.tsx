import { FileText, Hash, Images, MapPin, Maximize, Trees } from "lucide-react";
import type { Site } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkflowBadge } from "@/components/status-badge";
import { formatNumber } from "@/lib/utils";

export function SiteSummaryCard({ site }: { site: Site }) {
  const rows: { icon: typeof Hash; label: string; value: string }[] = [
    { icon: Hash, label: "Survey No.", value: site.surveyNo },
    { icon: Trees, label: "Village / Locality", value: site.village },
    { icon: Maximize, label: "Area", value: `${formatNumber(site.areaSqFt)} sq ft` },
    {
      icon: MapPin,
      label: "Coordinates",
      value: `${site.coordinates.lat.toFixed(4)}, ${site.coordinates.lng.toFixed(4)}`,
    },
    { icon: Images, label: "Photographs", value: `${site.photos.length} files` },
    { icon: FileText, label: "Documents", value: `${site.documents.length} files` },
  ];

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Site Summary</CardTitle>
        <WorkflowBadge stage={site.workflowStage} />
      </CardHeader>
      <CardContent>
        <dl className="divide-y">
          {rows.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.label}
                className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
              >
                <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                <dt className="text-sm text-muted-foreground">{r.label}</dt>
                <dd className="ml-auto text-right text-sm font-medium">
                  {r.value}
                </dd>
              </div>
            );
          })}
        </dl>
      </CardContent>
    </Card>
  );
}
