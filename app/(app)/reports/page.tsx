import Link from "next/link";
import { FileText, Printer } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sites } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ReportsPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Reports"
        description="Generate and export valuation reports for any site"
        crumbs={[{ label: "Workspace", href: "/dashboard" }, { label: "Reports" }]}
      />

      <Card>
        <CardHeader>
          <CardTitle>Valuation Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {sites.map((s) => (
            <div
              key={s.id}
              className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{s.name}</p>
                <p className="text-xs text-muted-foreground">
                  {s.reference} · {formatCurrency(s.valuation, true)} · Updated{" "}
                  {formatDate(s.lastUpdated)}
                </p>
              </div>
              <StatusBadge status={s.status} />
              <Button size="sm" variant="outline" asChild>
                <Link href={`/print/${s.id}`}>
                  <Printer className="h-4 w-4" /> Open report
                </Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
