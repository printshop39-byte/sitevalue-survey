"use client";

import { Info } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SiteMap, usingOSM } from "@/components/site-map";
import { Card, CardContent } from "@/components/ui/card";
import { sites } from "@/lib/mock-data";
import { useI18n } from "@/components/i18n-provider";

export default function MapPage() {
  const { t, fill } = useI18n();

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title={t.nav.map}
        description={t.map.subtitle}
        crumbs={[{ label: t.brand.workspace, href: "/dashboard" }, { label: t.nav.map }]}
      />

      <SiteMap sites={sites} height={520} />

      <Card>
        <CardContent className="flex items-start gap-3 p-4 text-sm text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <div className="space-y-1">
            <p>
              {fill(t.map.caption, { n: sites.length })} {t.map.liveNote}{" "}
              {t.map.legend}
            </p>
            {usingOSM && <p className="text-xs">{t.map.fallbackNote}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
