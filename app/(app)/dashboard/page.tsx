import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CircleDollarSign,
  ClipboardCheck,
  FileCheck2,
  Gauge,
  MessageSquare,
  Plus,
  Upload,
  UserPlus,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ClientLogo } from "@/components/client-logo";
import { KpiCard } from "@/components/kpi-card";
import { StatusDonut, TrendChart, ValuationBars } from "@/components/charts";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  activity,
  clientBrand,
  portfolioStats,
  sites,
  statusDistribution,
  valuationByType,
  valuationTrend,
} from "@/lib/mock-data";
import { formatCurrency, formatNumber, initials } from "@/lib/utils";

const activityIcon = {
  updated: CircleDollarSign,
  approved: FileCheck2,
  upload: Upload,
  comment: MessageSquare,
  created: UserPlus,
};

export default function DashboardPage() {
  const recent = [...sites]
    .sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated))
    .slice(0, 5);

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Client-branded banner */}
      <div className="flex flex-col gap-4 rounded-xl border bg-gradient-to-r from-primary/5 via-card to-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <ClientLogo className="h-11 w-11" />
          <div>
            <p className="text-base font-semibold leading-tight">
              {clientBrand.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {clientBrand.tagline} · {clientBrand.district}
            </p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Workspace
          </p>
          <p className="text-sm font-medium">Survey &amp; Valuation Portal</p>
        </div>
      </div>

      <PageHeader
        title="Portfolio Dashboard"
        description="Overview of surveyed sites, valuations and team activity."
        actions={
          <>
            <Button variant="outline">
              <FileCheck2 className="h-4 w-4" /> Export
            </Button>
            <Button asChild>
              <Link href="/sites">
                <Plus className="h-4 w-4" /> New Survey
              </Link>
            </Button>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Portfolio Valuation"
          value={formatCurrency(portfolioStats.totalValuation, true)}
          icon={CircleDollarSign}
          trend={{ value: "8.2%", positive: true }}
          hint="vs last quarter"
          accent="primary"
        />
        <KpiCard
          label="Active Sites"
          value={String(portfolioStats.siteCount)}
          icon={Building2}
          trend={{ value: "3 new", positive: true }}
          hint="this month"
          accent="success"
        />
        <KpiCard
          label="Pending Review"
          value={String(portfolioStats.inReview + portfolioStats.draft)}
          icon={ClipboardCheck}
          hint={`${portfolioStats.inReview} in review · ${portfolioStats.draft} draft`}
          accent="warning"
        />
        <KpiCard
          label="Avg. Confidence"
          value={`${portfolioStats.avgConfidence}%`}
          icon={Gauge}
          trend={{ value: "2.1%", positive: true }}
          hint="model accuracy"
          accent="primary"
        />
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Valuation Logged</CardTitle>
              <CardDescription>Cumulative portfolio value, ₹ Cr</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold">
                {formatCurrency(portfolioStats.totalValuation, true)}
              </p>
              <p className="text-xs text-success">▲ 19.5% YTD</p>
            </div>
          </CardHeader>
          <CardContent>
            <TrendChart data={valuationTrend} className="h-56" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Sites by survey stage</CardDescription>
          </CardHeader>
          <CardContent>
            <StatusDonut data={statusDistribution} />
          </CardContent>
        </Card>
      </div>

      {/* Lower row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Valuation by Asset Type</CardTitle>
            <CardDescription>Distribution across the portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <ValuationBars data={valuationByType} />
            <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total floor area</p>
                <p className="font-semibold">
                  {formatNumber(portfolioStats.totalArea, true)} sq ft
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Avg. ₹ / sq ft</p>
                <p className="font-semibold">
                  {formatCurrency(portfolioStats.avgPerSqFt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent sites */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Recently Updated Sites</CardTitle>
              <CardDescription>Latest survey activity</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/sites">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="px-2">
            <div className="divide-y">
              {recent.map((site) => (
                <Link
                  key={site.id}
                  href={`/sites/${site.id}`}
                  className="flex items-center gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-muted/60"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{site.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {site.reference} · {site.city} · {site.type}
                    </p>
                  </div>
                  <div className="hidden text-right sm:block">
                    <p className="text-sm font-semibold">
                      {formatCurrency(site.valuation, true)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatNumber(site.areaSqFt, true)} sq ft
                    </p>
                  </div>
                  <StatusBadge status={site.status} />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity feed */}
      <Card>
        <CardHeader>
          <CardTitle>Team Activity</CardTitle>
          <CardDescription>Recent actions across your workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {activity.map((ev) => {
              const Icon = activityIcon[ev.type];
              return (
                <div
                  key={ev.id}
                  className="flex items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-muted/50"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-secondary text-xs">
                      {initials(ev.actor)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-sm">
                    <p>
                      <span className="font-medium">{ev.actor}</span>{" "}
                      <span className="text-muted-foreground">{ev.action}</span>{" "}
                      <span className="font-medium">{ev.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{ev.time}</p>
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
