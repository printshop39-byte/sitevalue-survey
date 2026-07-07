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

const highlights = [
  "Standardised site surveys with audit-ready trails",
  "Automated valuation models and confidence scoring",
  "Photo, document and defect management in one place",
  "Board-ready valuation reports in a single click",
];

export default function LoginPage() {
  const router = useRouter();
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
              Survey &amp; Valuation Platform
            </p>
          </div>
        </div>

        <div className="relative max-w-md space-y-6">
          <h1 className="text-3xl font-semibold leading-tight">
            The valuation workspace built for engineering teams.
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
            <Building2 className="h-4 w-4" /> ISO 9001 workflows
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="h-4 w-4" /> SOC 2 Type II
          </span>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold">SiteValue</span>
          </div>

          <div className="mb-8 space-y-1.5">
            <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
            <p className="text-sm text-muted-foreground">
              Sign in to your valuation workspace to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  defaultValue="elena.marsh@sitevalue.io"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-xs font-medium text-primary hover:underline">
                  Forgot password?
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
              Keep me signed in on this device
            </label>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            OR
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button variant="outline" className="w-full" size="lg" asChild>
            <Link href="/dashboard">Continue with SSO (SAML)</Link>
          </Button>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            This is a design prototype. Any credentials will sign you in.
          </p>
        </div>
      </div>
    </div>
  );
}
