"use client";

import { Loader2 } from "lucide-react";
import { ClientLogo } from "@/components/client-logo";
import { useI18n } from "@/components/i18n-provider";

/**
 * Full-screen branded loading state, shown after login while the workspace
 * mounts and while auth resolves. Kept dependency-light so it can render
 * before the authed user is known.
 */
export function BrandLoading() {
  const { t } = useI18n();
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background">
      <div className="flex items-center gap-3">
        <ClientLogo className="h-12 w-12" />
        <div className="leading-tight">
          <p className="text-lg font-semibold">K D SOFT</p>
          <p className="text-xs text-muted-foreground">{t.about.product}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        {t.common.loadingWorkspace}
      </div>
      <p className="absolute bottom-8 text-center text-[11px] text-muted-foreground">
        {t.common.version} · {t.common.preparedForDemo}
      </p>
    </div>
  );
}
