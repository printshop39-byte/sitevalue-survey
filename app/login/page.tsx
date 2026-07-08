"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  UserCog,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClientLogo } from "@/components/client-logo";
import { LanguageToggle } from "@/components/language-toggle";
import { useI18n } from "@/components/i18n-provider";
import { ACCOUNTS, useAuth } from "@/components/auth-provider";
import { BrandLoading } from "@/components/brand-loading";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useI18n();
  const { login } = useAuth();
  const highlights = t.login.highlights;

  const [email, setEmail] = useState(ACCOUNTS[0].email);
  const [password, setPassword] = useState(ACCOUNTS[0].password);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function attempt(mail: string, pass: string) {
    setLoading(true);
    setError(false);
    // Small delay to mimic a network round-trip.
    window.setTimeout(() => {
      if (login(mail, pass)) {
        router.push("/dashboard");
      } else {
        setError(true);
        setLoading(false);
      }
    }, 1100);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    attempt(email, password);
  }

  function useAccount(mail: string, pass: string) {
    setEmail(mail);
    setPassword(pass);
    setError(false);
  }

  const roleIcon = { admin: UserCog, staff: UserRound };

  if (loading) return <BrandLoading />;

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
            <p className="text-xs text-sidebar-foreground/60">{t.brand.subtitle}</p>
          </div>
        </div>

        <div className="relative max-w-md space-y-6">
          <h1 className="text-3xl font-semibold leading-tight">{t.login.heroTitle}</h1>
          <ul className="space-y-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm text-sidebar-foreground/80">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sidebar-accent" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative space-y-4">
          <div className="flex items-center gap-6 text-xs text-sidebar-foreground/50">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4" /> {t.login.iso}
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="h-4 w-4" /> {t.login.soc}
            </span>
          </div>
          <div className="border-t border-white/10 pt-4 leading-tight">
            <p className="text-sm font-semibold text-sidebar-foreground/90">K D SOFT</p>
            <p className="text-xs text-sidebar-foreground/50">
              {t.common.owner} · {t.common.version}
            </p>
            <p className="text-xs text-sidebar-foreground/50">
              {t.common.preparedForDemo}
            </p>
          </div>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {t.login.invalid}
              </p>
            )}

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

          {/* Demo accounts */}
          <div className="mt-6 rounded-lg border bg-muted/40 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t.login.demoTitle}
            </p>
            <div className="space-y-2">
              {ACCOUNTS.map((a) => {
                const Icon = roleIcon[a.role];
                return (
                  <div
                    key={a.email}
                    className="flex items-center gap-2 rounded-md bg-background px-2.5 py-2"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1 leading-tight">
                      <p className="truncate text-xs font-medium">
                        {a.role === "admin" ? t.login.demoAdmin : t.login.demoStaff}
                      </p>
                      <p className="truncate font-mono text-[11px] text-muted-foreground">
                        {a.email} · {a.password}
                      </p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => useAccount(a.email, a.password)}
                    >
                      {t.login.useThis}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">{t.login.note}</p>

          <div className="mt-4 border-t pt-4 text-center leading-tight">
            <p className="text-xs font-semibold">K D SOFT</p>
            <p className="text-[11px] text-muted-foreground">
              {t.common.owner} · {t.common.version}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {t.common.systemName}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              © 2026 K D SOFT · {t.common.preparedForDemo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
