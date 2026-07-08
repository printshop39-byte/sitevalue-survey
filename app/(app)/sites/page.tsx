"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Building2,
  Download,
  LayoutGrid,
  List,
  MapPin,
  Plus,
  Search,
  SearchX,
  SlidersHorizontal,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { StatusBadge, ConditionBadge, WorkflowBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { sites } from "@/lib/mock-data";
import type { SiteStatus, SiteType } from "@/lib/types";
import { cn, formatCurrency, formatNumber, initials } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";

const statuses: (SiteStatus | "All")[] = [
  "All",
  "Approved",
  "In Review",
  "Draft",
  "Archived",
];
const types: (SiteType | "All")[] = [
  "All",
  "Commercial",
  "Industrial",
  "Residential",
  "Mixed Use",
  "Agricultural",
  "Land",
];

export default function SitesPage() {
  const { t, tStatus, tType, fill } = useI18n();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof statuses)[number]>("All");
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [view, setView] = useState<"table" | "grid">("table");

  const resetFilters = () => {
    setQuery("");
    setStatus("All");
    setType("All");
  };

  const filtered = useMemo(() => {
    return sites.filter((s) => {
      const matchesQuery =
        !query ||
        [s.name, s.reference, s.city, s.address, s.surveyor.name]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());
      const matchesStatus = status === "All" || s.status === status;
      const matchesType = type === "All" || s.type === type;
      return matchesQuery && matchesStatus && matchesType;
    });
  }, [query, status, type]);

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title={t.sites.title}
        description={fill(t.sites.subtitle, {
          count: sites.length,
          value: formatCurrency(
            sites.reduce((s, x) => s + x.valuation, 0),
            true
          ),
        })}
        crumbs={[{ label: t.brand.workspace, href: "/dashboard" }, { label: t.sites.title }]}
        actions={
          <>
            <Button variant="outline">
              <Download className="h-4 w-4" /> {t.common.export}
            </Button>
            <Button asChild>
              <Link href="/sites/new">
                <Plus className="h-4 w-4" /> {t.common.newSite}
              </Link>
            </Button>
          </>
        }
      />

      {/* Filters */}
      <Card>
        <CardContent className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t.sites.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg border bg-muted/40 p-1">
              <SlidersHorizontal className="ml-1.5 h-3.5 w-3.5 text-muted-foreground" />
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                    status === s
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {s === "All" ? t.common.all : tStatus[s]}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 rounded-lg border bg-muted/40 p-1">
              <button
                onClick={() => setView("table")}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
                  view === "table"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground"
                )}
                aria-label="Table view"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("grid")}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
                  view === "grid"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground"
                )}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Type chips */}
      <div className="flex flex-wrap gap-2">
        {types.map((ty) => (
          <button
            key={ty}
            onClick={() => setType(ty)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              type === ty
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:bg-muted"
            )}
          >
            {ty === "All" ? t.common.all : tType[ty]}
          </button>
        ))}
        <span className="ml-auto self-center text-sm text-muted-foreground">
          {filtered.length} {t.common.results}
        </span>
      </div>

      {/* Results */}
      {view === "table" ? (
        filtered.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title={t.sites.noResults}
            description={t.sites.noResultsHint}
            action={
              <Button variant="outline" size="sm" onClick={resetFilters}>
                {t.common.clearFilters}
              </Button>
            }
          />
        ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.sites.colSite}</TableHead>
                <TableHead>{t.sites.colType}</TableHead>
                <TableHead>{t.sites.colStage}</TableHead>
                <TableHead>{t.sites.colStatus}</TableHead>
                <TableHead>{t.sites.colCondition}</TableHead>
                <TableHead className="text-right">{t.sites.colArea}</TableHead>
                <TableHead className="text-right">{t.sites.colValuation}</TableHead>
                <TableHead>{t.sites.colSurveyor}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((site) => (
                <TableRow key={site.id} className="cursor-pointer">
                  <TableCell>
                    <Link href={`/sites/${site.id}`} className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Building2 className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className="font-medium leading-tight">{site.name}</p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {site.reference} · {site.city}
                        </p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{tType[site.type]}</Badge>
                  </TableCell>
                  <TableCell>
                    <WorkflowBadge stage={site.workflowStage} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={site.status} />
                  </TableCell>
                  <TableCell>
                    <ConditionBadge condition={site.condition} />
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-muted-foreground">
                    {formatNumber(site.areaSqFt, true)} {t.sites.sqft}
                  </TableCell>
                  <TableCell className="text-right font-semibold tabular-nums">
                    {formatCurrency(site.valuation, true)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="bg-secondary text-[10px]">
                          {initials(site.surveyor.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {site.surveyor.name.split(" ")[0]}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </Card>
        )
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title={t.sites.noResults}
          description={t.sites.noResultsHint}
          action={
            <Button variant="outline" size="sm" onClick={resetFilters}>
              {t.common.clearFilters}
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((site) => (
            <Link key={site.id} href={`/sites/${site.id}`}>
              <Card className="group overflow-hidden transition-shadow hover:shadow-md">
                <div className="relative h-40 overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={site.coverImage}
                    alt={site.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3">
                    <StatusBadge status={site.status} />
                  </div>
                  <div className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur">
                    {formatCurrency(site.valuation, true)}
                  </div>
                </div>
                <CardContent className="space-y-3 p-4">
                  <div>
                    <p className="font-semibold leading-tight">{site.name}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {site.reference} · {site.city}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{tType[site.type]}</Badge>
                    <ConditionBadge condition={site.condition} />
                  </div>
                  <div className="flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
                    <span>{formatNumber(site.areaSqFt, true)} {t.sites.sqft}</span>
                    <span>{formatCurrency(site.valuationPerSqFt)}/{t.sites.sqft}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
