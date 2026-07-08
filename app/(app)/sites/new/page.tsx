"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Building2,
  CheckCircle2,
  Loader2,
  MapPin,
  Ruler,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { surveyors } from "@/lib/mock-data";
import { useI18n } from "@/components/i18n-provider";
import type { SiteStatus, SiteType } from "@/lib/types";

const types: SiteType[] = [
  "Commercial",
  "Industrial",
  "Residential",
  "Mixed Use",
  "Agricultural",
  "Land",
];
const statuses: SiteStatus[] = ["Draft", "In Review", "Approved"];

export default function NewSitePage() {
  const { t, tType, tStatus } = useI18n();
  const [reference] = useState(
    () => `STE-${4830 + Math.floor(Math.random() * 160)}`
  );
  const [name, setName] = useState("");
  const [phase, setPhase] = useState<"form" | "saving" | "done">("form");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) {
      setError(true);
      return;
    }
    setError(false);
    setPhase("saving");
    // Simulated persistence — no backend.
    window.setTimeout(() => setPhase("done"), 1200);
  }

  if (phase === "done") {
    return (
      <div className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-xl font-semibold">{t.newSite.successTitle}</h2>
              <p className="text-sm text-muted-foreground">
                {t.newSite.successBody.replace("{name}", name)} · {reference}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Button asChild>
                <Link href="/sites">{t.newSite.viewSites}</Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setName("");
                  setPhase("form");
                }}
              >
                {t.newSite.addAnother}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title={t.newSite.title}
        description={t.newSite.subtitle}
        crumbs={[
          { label: t.nav.sites, href: "/sites" },
          { label: t.newSite.crumb },
        ]}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Site details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Building2 className="h-4 w-4 text-primary" /> {t.newSite.secDetails}
            </CardTitle>
            <CardDescription>{t.newSite.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field label={t.newSite.fName} required className="sm:col-span-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.newSite.fNamePh}
                aria-invalid={error}
                className={error ? "border-destructive" : ""}
              />
              {error && (
                <p className="text-xs text-destructive">{t.newSite.validation}</p>
              )}
            </Field>
            <Field label={t.newSite.fType}>
              <NativeSelect defaultValue="Commercial">
                {types.map((ty) => (
                  <option key={ty} value={ty}>
                    {tType[ty]}
                  </option>
                ))}
              </NativeSelect>
            </Field>
            <Field label={t.newSite.fStatus}>
              <NativeSelect defaultValue="Draft">
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {tStatus[s]}
                  </option>
                ))}
              </NativeSelect>
            </Field>
            <Field label={t.newSite.fReference} hint={t.newSite.fReferenceHint}>
              <Input value={reference} readOnly className="bg-muted/50" />
            </Field>
          </CardContent>
        </Card>

        {/* Location & land record */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4 text-primary" /> {t.newSite.secLocation}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field label={t.newSite.fAddress} className="sm:col-span-2">
              <Input placeholder={t.newSite.fAddressPh} />
            </Field>
            <Field label={t.newSite.fCity}>
              <Input placeholder="Pune" />
            </Field>
            <Field label={t.newSite.fRegion}>
              <Input placeholder="Pune" />
            </Field>
            <Field label={t.newSite.fSurveyNo}>
              <Input placeholder={t.newSite.fSurveyNoPh} />
            </Field>
            <Field label={t.newSite.fVillage}>
              <Input placeholder="Kharabwadi, Chakan" />
            </Field>
          </CardContent>
        </Card>

        {/* Survey & valuation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Ruler className="h-4 w-4 text-primary" /> {t.newSite.secValuation}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field label={t.newSite.fArea}>
              <Input type="number" min={0} placeholder="184000" />
            </Field>
            <Field label={t.newSite.fPlot}>
              <Input placeholder={t.newSite.fPlotPh} />
            </Field>
            <Field label={t.newSite.fSurveyor}>
              <NativeSelect defaultValue={surveyors[0].id}>
                {surveyors.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — {s.role}
                  </option>
                ))}
              </NativeSelect>
            </Field>
            <Field label={t.newSite.fSurveyDate}>
              <Input type="date" />
            </Field>
            <Field label={t.newSite.fValuation} className="sm:col-span-2">
              <Input type="number" min={0} placeholder="465000000" />
            </Field>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="outline" asChild>
            <Link href="/sites">{t.common.cancel}</Link>
          </Button>
          <Button type="submit" disabled={phase === "saving"}>
            {phase === "saving" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> {t.newSite.submitting}
              </>
            ) : (
              t.newSite.submit
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      <Label className="flex items-center gap-1.5">
        {label}
        {required && <span className="text-destructive">*</span>}
        {hint && (
          <span className="ml-auto text-xs font-normal text-muted-foreground">
            {hint}
          </span>
        )}
      </Label>
      {children}
    </div>
  );
}
