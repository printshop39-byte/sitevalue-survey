import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  FileText,
  Images,
  Landmark,
  Layers,
  Mail,
  MapPin,
  Ruler,
  Building,
} from "lucide-react";
import { getSite, sites } from "@/lib/mock-data";
import { PageHeader } from "@/components/page-header";
import { SiteHero } from "@/components/site-hero";
import { SiteNav } from "@/components/site-nav";
import { SiteSummaryCard } from "@/components/site-summary-card";
import { SiteTimeline } from "@/components/site-timeline";
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
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate, formatNumber, initials } from "@/lib/utils";

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

  const facts = [
    { icon: Building, label: "Asset type", value: site.type },
    { icon: Ruler, label: "Floor area", value: `${formatNumber(site.areaSqFt)} sq ft` },
    { icon: Layers, label: "Plot size", value: site.plotSize },
    {
      icon: CalendarDays,
      label: "Year built",
      value: site.yearBuilt === 0 ? "Undeveloped" : String(site.yearBuilt),
    },
    { icon: MapPin, label: "Region", value: site.region },
    { icon: Landmark, label: "£ / sq ft", value: formatCurrency(site.valuationPerSqFt) },
  ];

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title={site.name}
        crumbs={[
          { label: "Sites", href: "/sites" },
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
              <CardTitle>Survey Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {site.summary}
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Survey completion</span>
                  <span className="text-muted-foreground">{site.progress}%</span>
                </div>
                <Progress value={site.progress} />
              </div>
            </CardContent>
          </Card>

          {/* Workflow timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Survey Workflow</CardTitle>
              <CardDescription>
                Progress of this site through the survey lifecycle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SiteTimeline steps={site.timeline} />
            </CardContent>
          </Card>

          {/* Valuation breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Valuation Breakdown</CardTitle>
              <CardDescription>
                Component build-up of the assessed value
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {site.valuationBreakdown.map((line) => {
                  const pct = Math.round((line.amount / site.valuation) * 100);
                  return (
                    <div key={line.label} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{line.label}</span>
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
                <span className="font-semibold">Total assessed value</span>
                <span className="text-lg font-semibold">
                  {formatCurrency(site.valuation)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Inspection findings */}
          <Card>
            <CardHeader>
              <CardTitle>Inspection Findings</CardTitle>
              <CardDescription>
                Element-by-element condition assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Element</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead className="pr-6">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {site.inspection.map((item) => (
                    <TableRow key={item.category}>
                      <TableCell className="pl-6 font-medium">
                        {item.category}
                      </TableCell>
                      <TableCell>
                        <ConditionBadge condition={item.condition} />
                      </TableCell>
                      <TableCell className="pr-6 text-sm text-muted-foreground">
                        {item.notes}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Side column */}
        <div className="space-y-6">
          {/* Site summary */}
          <SiteSummaryCard site={site} />

          {/* Assigned surveyor */}
          <Card>
            <CardHeader>
              <CardTitle>Assigned Surveyor</CardTitle>
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
                  <p className="text-muted-foreground">Survey date</p>
                  <p className="font-medium">{formatDate(site.surveyDate)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last updated</p>
                  <p className="font-medium">{formatDate(site.lastUpdated)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-lg border bg-muted">
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="relative flex flex-col items-center text-center">
                  <MapPin className="h-8 w-8 text-primary" />
                  <p className="mt-1 text-xs font-medium">{site.city}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {site.coordinates.lat.toFixed(4)},{" "}
                    {site.coordinates.lng.toFixed(4)}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {site.address}, {site.city}, {site.region}
              </p>
            </CardContent>
          </Card>

          {/* Assets shortcuts */}
          <Card>
            <CardHeader>
              <CardTitle>Attached Records</CardTitle>
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
                  <p className="text-sm font-medium">Photo Gallery</p>
                  <p className="text-xs text-muted-foreground">
                    {site.photos.length} site photographs
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
                  <p className="text-sm font-medium">Documents</p>
                  <p className="text-xs text-muted-foreground">
                    {site.documents.length} files attached
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
