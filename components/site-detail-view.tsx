"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building,
  CalendarDays,
  FileText,
  Images,
  Landmark,
  Layers,
  Mail,
  MapPin,
  Ruler,
} from "lucide-react";
import type { Site } from "@/lib/types";
import { PageHeader } from "@/components/page-header";
import { SiteHero } from "@/components/site-hero";
import { SiteNav } from "@/components/site-nav";
import { SiteSummaryCard } from "@/components/site-summary-card";
import { SiteTimeline } from "@/components/site-timeline";
import { SiteMap } from "@/components/site-map";
import { ConditionBadge } from "@/components/status-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate, formatNumber, initials } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";

export function SiteDetailView({ site }: { site: Site }) {
  const { t, tType, tBreakdown, tInspectionCat, tInspectionNote, fill } =
    useI18n();

  const facts = [
    { icon: Building, label: t.detail.assetType, value: tType[site.type] },
    { icon: Ruler, label: t.detail.floorArea, value: `${formatNumber(site.areaSqFt)} ${t.sites.sqft}` },
    { icon: Layers, label: t.detail.plotSize, value: site.plotSize },
    {
      icon: CalendarDays,
      label: t.detail.yearBuilt,
      value: site.yearBuilt === 0 ? t.detail.undeveloped : String(site.yearBuilt),
    },
    { icon: MapPin, label: t.detail.region, value: site.region },
    { icon: Landmark, label: t.detail.perSqFt, value: formatCurrency(site.valuationPerSqFt) },
  ];

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title={site.name}
        crumbs={[
          { label: t.nav.sites, href: "/sites" },
          { label: site.reference },
        ]}
      />

      <SiteHero site={site} />
      <SiteNav id={site.id} />

      {/* Quick facts */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {facts.map((f) => {
          const Icon = f.icon;
          return (
            <Card key={f.label}>
              <CardContent className="p-4">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <p className="mt-2 text-xs text-muted-foreground">{f.label}</p>
                <p className="text-sm font-semibold">{f.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t.detail.surveySummary}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {site.summary}
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{t.detail.surveyCompletion}</span>
                  <span className="text-muted-foreground">{site.progress}%</span>
                </div>
                <Progress value={site.progress} />
              </div>
            </CardContent>
          </Card>

          {/* Workflow timeline */}
          <Card>
            <CardHeader>
              <CardTitle>{t.detail.workflowTitle}</CardTitle>
              <CardDescription>{t.detail.workflowSub}</CardDescription>
            </CardHeader>
            <CardContent>
              <SiteTimeline steps={site.timeline} />
            </CardContent>
          </Card>

          {/* Valuation breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>{t.detail.valBreakdown}</CardTitle>
              <CardDescription>{t.detail.valBreakdownSub}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {site.valuationBreakdown.map((line) => {
                  const pct = Math.round((line.amount / site.valuation) * 100);
                  return (
                    <div key={line.key} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{tBreakdown[line.key]}</span>
                        <span className="tabular-nums">
                          {formatCurrency(line.amount, true)}{" "}
                          <span className="text-muted-foreground">({pct}%)</span>
                        </span>
                      </div>
                      <Progress value={pct} className="h-2" />
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 flex items-center justify-between border-t pt-4">
                <span className="font-semibold">{t.detail.totalAssessed}</span>
                <span className="text-lg font-semibold">
                  {formatCurrency(site.valuation)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Inspection findings */}
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>{t.detail.inspection}</CardTitle>
              <CardDescription>{t.detail.inspectionSub}</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">{t.detail.element}</TableHead>
                      <TableHead>{t.detail.conditionCol}</TableHead>
                      <TableHead className="pr-6">{t.detail.notes}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {site.inspection.map((item) => (
                      <TableRow key={item.key}>
                        <TableCell className="pl-6 font-medium">
                          {tInspectionCat[item.key]}
                        </TableCell>
                        <TableCell>
                          <ConditionBadge condition={item.condition} />
                        </TableCell>
                        <TableCell className="pr-6 text-sm text-muted-foreground">
                          {tInspectionNote[item.key]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side column */}
        <div className="space-y-6">
          <SiteSummaryCard site={site} />

          {/* Assigned surveyor */}
          <Card>
            <CardHeader>
              <CardTitle>{t.detail.assignedSurveyor}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {initials(site.surveyor.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{site.surveyor.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {site.surveyor.role}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Mail className="h-4 w-4" /> {site.surveyor.email}
              </Button>
              <div className="grid grid-cols-2 gap-3 border-t pt-4 text-sm">
                <div>
                  <p className="text-muted-foreground">{t.detail.surveyDate}</p>
                  <p className="font-medium">{formatDate(site.surveyDate)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t.detail.lastUpdated}</p>
                  <p className="font-medium">{formatDate(site.lastUpdated)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>{t.detail.location}</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/map">
                  {t.detail.openInMap} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <SiteMap
                sites={[site]}
                zoom={12}
                height={180}
                interactive={false}
                showProvider={false}
              />
              <p className="text-sm text-muted-foreground">
                {site.address}, {site.city}, {site.region}
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {site.coordinates.lat.toFixed(4)}, {site.coordinates.lng.toFixed(4)}
              </p>
            </CardContent>
          </Card>

          {/* Assets shortcuts */}
          <Card>
            <CardHeader>
              <CardTitle>{t.detail.attachedRecords}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                href={`/sites/${site.id}/photos`}
                className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/60"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Images className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{t.detail.photoGallery}</p>
                  <p className="text-xs text-muted-foreground">
                    {fill(t.detail.photosCount, { n: site.photos.length })}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link
                href={`/sites/${site.id}/documents`}
                className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/60"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{t.detail.documents}</p>
                  <p className="text-xs text-muted-foreground">
                    {fill(t.detail.filesAttached, { n: site.documents.length })}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
