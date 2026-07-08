"use client";

import { useState } from "react";
import {
  Bell,
  CheckCircle2,
  Globe,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { clientBrand, surveyors } from "@/lib/mock-data";
import { cn, initials } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";
import { useRequireAuth } from "@/components/auth-provider";
import type { Locale } from "@/lib/i18n";

function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
        checked ? "bg-primary" : "bg-muted-foreground/30"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-4" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { t, locale, setLocale } = useI18n();
  const { allowed } = useRequireAuth("admin");
  const [notif, setNotif] = useState({ email: true, weekly: true, mentions: false });
  const [saved, setSaved] = useState(false);

  if (!allowed) return null;

  const save = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title={t.nav.settings}
        description={t.settings.subtitle}
        crumbs={[{ label: t.brand.workspace, href: "/dashboard" }, { label: t.nav.settings }]}
        actions={
          <Button onClick={save}>
            {saved ? (
              <>
                <CheckCircle2 className="h-4 w-4" /> {t.settings.saved}
              </>
            ) : (
              t.common.save
            )}
          </Button>
        }
      />

      {/* General */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <SlidersHorizontal className="h-4 w-4 text-primary" /> {t.settings.secGeneral}
          </CardTitle>
          <CardDescription>{t.settings.secGeneralSub}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>{t.settings.workspaceName}</Label>
            <Input defaultValue={clientBrand.name} />
          </div>
          <div className="space-y-1.5">
            <Label>{t.settings.orgType}</Label>
            <Input defaultValue="Survey & Valuation LLP" />
          </div>
          <div className="space-y-1.5">
            <Label>{t.settings.defaultCurrency}</Label>
            <NativeSelect defaultValue="INR">
              <option value="INR">₹ Indian Rupee (INR)</option>
              <option value="USD">$ US Dollar (USD)</option>
            </NativeSelect>
          </div>
        </CardContent>
      </Card>

      {/* Localization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="h-4 w-4 text-primary" /> {t.settings.secLocalization}
          </CardTitle>
          <CardDescription>{t.settings.secLocalizationSub}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>{t.settings.language}</Label>
            <NativeSelect
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
            >
              <option value="en">{t.lang.english}</option>
              <option value="mr">{t.lang.marathi}</option>
            </NativeSelect>
          </div>
          <div className="space-y-1.5">
            <Label>{t.settings.dateFormat}</Label>
            <NativeSelect defaultValue="dmy">
              <option value="dmy">DD MMM YYYY</option>
              <option value="mdy">MMM DD, YYYY</option>
            </NativeSelect>
          </div>
          <div className="space-y-1.5">
            <Label>{t.settings.numberFormat}</Label>
            <NativeSelect defaultValue="in">
              <option value="in">Indian (लाख / कोटी)</option>
              <option value="intl">International (K / M)</option>
            </NativeSelect>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4 text-primary" /> {t.settings.secNotifications}
          </CardTitle>
          <CardDescription>{t.settings.secNotificationsSub}</CardDescription>
        </CardHeader>
        <CardContent className="divide-y">
          {[
            { key: "email" as const, label: t.settings.notifEmail, sub: t.settings.notifEmailSub },
            { key: "weekly" as const, label: t.settings.notifWeekly, sub: t.settings.notifWeeklySub },
            { key: "mentions" as const, label: t.settings.notifMentions, sub: t.settings.notifMentionsSub },
          ].map((row) => (
            <div
              key={row.key}
              className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium">{row.label}</p>
                <p className="text-xs text-muted-foreground">{row.sub}</p>
              </div>
              <Switch
                checked={notif[row.key]}
                onChange={(v) => setNotif((n) => ({ ...n, [row.key]: v }))}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Team */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="h-4 w-4 text-primary" /> {t.settings.secTeam}
          </CardTitle>
          <CardDescription>{t.settings.secTeamSub}</CardDescription>
        </CardHeader>
        <CardContent className="divide-y">
          {surveyors.map((s) => (
            <div key={s.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-secondary text-xs">
                  {initials(s.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{s.name}</p>
                <p className="truncate text-xs text-muted-foreground">{s.email}</p>
              </div>
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                {s.role}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
