"use client";

import Link from "next/link";
import { MapPin, Printer, Share2, Star } from "lucide-react";
import type { Site } from "@/lib/types";
import { StatusBadge, ConditionBadge, WorkflowBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";

export function SiteHero({ site }: { site: Site }) {
  const { t, tType } = useI18n();
  return (
    <div className="relative overflow-hidden rounded-xl border">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={site.coverImage}
          alt={site.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
      </div>

      <div className="relative flex flex-col justify-end gap-4 p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <WorkflowBadge stage={site.workflowStage} />
          <StatusBadge status={site.status} />
          <ConditionBadge condition={site.condition} />
          <Badge variant="secondary" className="bg-white/15 text-white">
            {tType[site.type]}
          </Badge>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1.5">
            <p className="font-mono text-sm text-white/70">{site.reference}</p>
            <h1 className="text-2xl font-semibold sm:text-3xl">{site.name}</h1>
            <p className="flex items-center gap-1.5 text-sm text-white/80">
              <MapPin className="h-4 w-4" /> {site.address}, {site.city},{" "}
              {site.region}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <div className="text-left sm:text-right">
              <p className="text-xs uppercase tracking-wide text-white/60">
                {t.detail.assessedValuation}
              </p>
              <p className="text-3xl font-semibold">
                {formatCurrency(site.valuation)}
              </p>
              <p className="flex items-center gap-1 text-xs text-white/70 sm:justify-end">
                <Star className="h-3 w-3 fill-warning text-warning" />
                {site.confidence}% {t.detail.confidence} ·{" "}
                {formatCurrency(site.valuationPerSqFt)}/{t.sites.sqft}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/15 text-white hover:bg-white/25"
              >
                <Share2 className="h-4 w-4" /> {t.detail.share}
              </Button>
              <Button size="sm" asChild>
                <Link href={`/print/${site.id}`}>
                  <Printer className="h-4 w-4" /> {t.detail.print}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
