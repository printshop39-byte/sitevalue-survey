"use client";

import Link from "next/link";
import { Compass, LayoutDashboard, LogIn } from "lucide-react";
import { ClientLogo } from "@/components/client-logo";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      {/* Brand mark */}
      <div className="flex items-center gap-2.5">
        <ClientLogo className="h-9 w-9" />
        <div className="text-left leading-tight">
          <p className="text-sm font-semibold">K D SOFT</p>
          <p className="text-[11px] text-muted-foreground">{t.common.systemName}</p>
        </div>
      </div>

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Compass className="h-8 w-8" />
      </div>

      <div className="space-y-2">
        <p className="text-5xl font-bold tracking-tight text-primary/90">
          {t.notFound.code}
        </p>
        <h1 className="text-2xl font-semibold">{t.notFound.title}</h1>
        <p className="mx-auto max-w-md text-muted-foreground">{t.notFound.body}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="h-4 w-4" /> {t.notFound.home}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/login">
            <LogIn className="h-4 w-4" /> {t.notFound.login}
          </Link>
        </Button>
      </div>

      <p className="absolute bottom-8 text-[11px] text-muted-foreground">
        © 2026 K D SOFT · {t.common.version}
      </p>
    </div>
  );
}
