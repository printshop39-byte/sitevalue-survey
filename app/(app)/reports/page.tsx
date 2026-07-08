"use client";

import Link from "next/link";
import { FileText, Printer } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sites } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";

export default function ReportsPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title={t.reports.title}
        description={t.reports.subtitle}
        crumbs={[{ label: t.brand.workspace, href: "/dashboard" }, { label: t.reports.title }]}
      />

      {sites.length === 0 ? (
        <EmptyState icon={FileText} title={t.reports.empty} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{t.reports.heading}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {sites.map((s) => (
              <div
                key={s.id}
                className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.reference} · {formatCurrency(s.valuation, true)} ·{" "}
                    {t.reports.updated} {formatDate(s.lastUpdated)}
                  </p>
                </div>
                <StatusBadge status={s.status} />
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/print/${s.id}`}>
                    <Printer className="h-4 w-4" /> {t.reports.open}
                  </Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
