"use client";

import Link from "next/link";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language-toggle";
import { useI18n } from "@/components/i18n-provider";

export function PrintToolbar({ backHref }: { backHref: string }) {
  const { t } = useI18n();
  return (
    <div className="no-print sticky top-0 z-10 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href={backHref}>
            <ArrowLeft className="h-4 w-4" /> {t.print.back}
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Download className="h-4 w-4" /> {t.print.savePdf}
          </Button>
          <Button size="sm" onClick={() => window.print()}>
            <Printer className="h-4 w-4" /> {t.print.printReport}
          </Button>
        </div>
      </div>
    </div>
  );
}
