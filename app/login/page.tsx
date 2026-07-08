"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Building2,
  CheckCircle2,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClientLogo } from "@/components/client-logo";
import { LanguageToggle } from "@/components/language-toggle";
import { useI18n } from "@/components/i18n-provider";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useI18n();
  const highlights = t.login.highlights;
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 700);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-sidebar p-12 text-sidebar-foreground lg:flex lg:flex-col lg:justify-between">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sidebar-accent/20 blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-accent">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-lg font-semibold">SiteValue</p>
            <p className="text-xs text-sidebar-foreground/60">
              {t.brand.subtitle}
            </p>
          </div>
        </div>

        <div className="relative max-w-md space-y-6">
          <h1 className="text-3xl font-semibold leading-tight">
            {t.login.heroTitle}
          </h1>
          <ul className="space-y-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm text-sidebar-foreground/80">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sidebar-accent" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center gap-6 text-xs text-sidebar-foreground/50">
          <span className="flex items-center gap-1.5">
            <Building2 className="h-4 w-4" /> {t.login.iso}
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="h-4 w-4" /> {t.login.soc}
          </span>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2.5 lg:invisible">
              <ClientLogo className="h-9 w-9" />
              <span className="text-lg font-semibold">SiteValue</span>
            </div>
            <LanguageToggle />
          </div>

          <div className="mb-8 space-y-1.5">
            <h2 className="text-2xl font-semibold tracking-tight">{t.login.welcome}</h2>
            <p className="text-sm text-muted-foreground">{t.login.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.login.email}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  defaultValue="aarti.deshmukh@sahyadrisurvey.in"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t.login.password}</Label>
                <button type="button" className="text-xs font-medium text-primary hover:underline">
                  {t.login.forgot}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  defaultValue="demo-password"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-input accent-primary"
              />
              {t.login.keep}
            </label>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? t.login.signingIn : t.login.signin}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            {t.login.or}
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button variant="outline" className="w-full" size="lg" asChild>
            <Link href="/dashboard">{t.login.sso}</Link>
          </Button>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            {t.login.note}
          </p>
        </div>
      </div>
    </div>
  );
}
