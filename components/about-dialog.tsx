"use client";

import { ClientLogo } from "@/components/client-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useI18n } from "@/components/i18n-provider";

export function AboutDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const { t } = useI18n();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">{t.about.title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-2 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border bg-background shadow-sm">
            <ClientLogo className="h-10 w-10" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">{t.about.product}</h3>
            <Badge variant="secondary">{t.about.version}</Badge>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">{t.about.tagline}</p>

          <div className="w-full rounded-lg border bg-muted/40 p-4 text-sm">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {t.about.preparedBy}
            </p>
            <p className="mt-0.5 text-base font-bold tracking-tight">
              {t.about.company}
            </p>
            <p className="text-sm text-muted-foreground">{t.about.owner}</p>
            <div className="mt-3 border-t pt-3">
              <Badge variant="warning" className="gap-1.5 pl-2">
                <span className="h-1.5 w-1.5 rounded-full bg-warning" />
                {t.about.demoVersion}
              </Badge>
            </div>
          </div>

          <Button className="w-full" onClick={() => onOpenChange(false)}>
            {t.about.close}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
