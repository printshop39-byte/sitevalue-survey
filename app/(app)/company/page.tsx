"use client";

import {
  Building2,
  CalendarDays,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ClientLogo } from "@/components/client-logo";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { company } from "@/lib/mock-data";
import { useI18n } from "@/components/i18n-provider";
import { useRequireAuth } from "@/components/auth-provider";

export default function CompanyPage() {
  const { t } = useI18n();
  const { allowed } = useRequireAuth("admin");
  if (!allowed) return null;

  const details = [
    { icon: Building2, label: t.company.org, value: t.company.orgValue },
    { icon: MapPin, label: t.company.based, value: t.company.basedValue },
    { icon: Mail, label: t.company.contact, value: company.email },
    { icon: ShieldCheck, label: t.company.plan, value: t.company.planValue },
    { icon: CalendarDays, label: t.company.since, value: t.company.sinceValue },
  ];

  const modules = ["Dashboard", "Sites", "Map", "Reports", "Staff", "Settings"];

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title={t.company.title}
        description={t.company.subtitle}
        crumbs={[
          { label: t.nav.administration, href: "/dashboard" },
          { label: t.company.title },
        ]}
      />

      {/* Company profile card */}
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-4 border-b bg-gradient-to-r from-primary/10 via-card to-card p-6 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border bg-background shadow-sm">
            <ClientLogo className="h-10 w-10" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {t.company.name}
              </p>
              <Badge variant="secondary">{t.common.demoMode}</Badge>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">{company.name}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <UserRound className="h-4 w-4" />
              {t.company.owner}: <span className="font-medium text-foreground">{company.owner}</span>
            </p>
          </div>
        </div>

        <CardContent className="grid gap-x-6 gap-y-4 p-6 sm:grid-cols-2">
          {details.map((d) => {
            const Icon = d.icon;
            return (
              <div key={d.label} className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="leading-tight">
                  <p className="text-xs text-muted-foreground">{d.label}</p>
                  <p className="text-sm font-medium">{d.value}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Active modules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-primary" /> {t.company.modules}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {modules.map((m) => (
            <Badge key={m} variant="secondary" className="gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              {m}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
