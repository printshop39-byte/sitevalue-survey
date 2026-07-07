"use client";

import Link from "next/link";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintToolbar({ backHref }: { backHref: string }) {
  return (
    <div className="no-print sticky top-0 z-10 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href={backHref}>
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Download className="h-4 w-4" /> Save as PDF
          </Button>
          <Button size="sm" onClick={() => window.print()}>
            <Printer className="h-4 w-4" /> Print report
          </Button>
        </div>
      </div>
    </div>
  );
}
