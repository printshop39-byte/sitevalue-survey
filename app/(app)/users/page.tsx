"use client";

import { Check, Info, Minus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useI18n } from "@/components/i18n-provider";
import { useRequireAuth } from "@/components/auth-provider";

// module key → [admin allowed, staff allowed]
const MATRIX: { key: keyof ReturnType<typeof labels>; admin: boolean; staff: boolean }[] = [
  { key: "dashboard", admin: true, staff: true },
  { key: "sites", admin: true, staff: true },
  { key: "map", admin: true, staff: false },
  { key: "upload", admin: true, staff: true },
  { key: "reports", admin: true, staff: true },
  { key: "company", admin: true, staff: false },
  { key: "staff", admin: true, staff: false },
  { key: "access", admin: true, staff: false },
  { key: "settings", admin: true, staff: false },
];

function labels(t: ReturnType<typeof useI18n>["t"]) {
  return {
    dashboard: t.nav.dashboard,
    sites: t.nav.sites,
    map: t.nav.map,
    upload: t.nav.upload,
    reports: t.nav.reports,
    company: t.nav.company,
    staff: t.nav.staff,
    access: t.nav.access,
    settings: t.nav.settings,
  };
}

function Cell({ ok, yes, no }: { ok: boolean; yes: string; no: string }) {
  return ok ? (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
      <Check className="h-4 w-4" /> {yes}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
      <Minus className="h-4 w-4" /> {no}
    </span>
  );
}

export default function UsersPage() {
  const { t } = useI18n();
  const { allowed } = useRequireAuth("admin");
  if (!allowed) return null;

  const l = labels(t);

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title={t.access.title}
        description={t.access.subtitle}
        crumbs={[
          { label: t.nav.administration, href: "/dashboard" },
          { label: t.access.title },
        ]}
      />

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.access.colModule}</TableHead>
                <TableHead>{t.access.superAdmin}</TableHead>
                <TableHead>{t.access.staff}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MATRIX.map((row) => (
                <TableRow key={row.key}>
                  <TableCell className="font-medium">{l[row.key]}</TableCell>
                  <TableCell>
                    <Cell ok={row.admin} yes={t.access.allowed} no={t.access.denied} />
                  </TableCell>
                  <TableCell>
                    <Cell ok={row.staff} yes={t.access.allowed} no={t.access.denied} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card>
        <CardContent className="flex items-start gap-3 p-4 text-sm text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{t.access.note}</p>
        </CardContent>
      </Card>
    </div>
  );
}
