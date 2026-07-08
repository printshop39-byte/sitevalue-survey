"use client";

import { useI18n } from "@/components/i18n-provider";
import { FeedbackLink } from "@/components/feedback-link";

/** Consistent app footer: © 2026 K D SOFT · Survey & Site Valuation … */
export function AppFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-1 px-4 py-4 text-center text-xs text-muted-foreground sm:flex-row sm:px-6 sm:text-left lg:px-8">
        <p>© 2026 K D SOFT</p>
        <p>{t.common.systemName}</p>
        <div className="flex items-center gap-3">
          <FeedbackLink />
          <span className="hidden sm:inline">
            {t.common.version} · {t.common.demoMode}
          </span>
        </div>
      </div>
    </footer>
  );
}
