"use client";

import { useEffect, useState } from "react";
import { company } from "@/lib/mock-data";
import { useI18n } from "@/components/i18n-provider";

/**
 * Repeating confidential footer. On screen it renders once at the end of the
 * report; when printing, `position: fixed` (see .print-footer in globals.css)
 * repeats it at the bottom of every A4 page.
 */
export function PrintFooter({
  printedBy,
  version,
}: {
  printedBy: string;
  version: string;
}) {
  const { t } = useI18n();
  const [date, setDate] = useState("—");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );
  }, []);

  return (
    <div className="print-footer mt-6 border-t border-slate-300 pt-2 text-[10px] text-slate-500">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wide text-slate-700">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-600" />
          {t.print.confidential}
        </span>
        <span>
          {t.print.preparedByCompany}:{" "}
          <span className="font-semibold text-slate-700">{company.name}</span>
        </span>
        <span className="font-medium text-slate-600">{t.print.clientDemo}</span>
        <span>
          {t.print.printedBy}: {printedBy}
        </span>
        <span>
          {t.print.printedOn}: {date}
        </span>
        <span>
          {t.print.version}: {version}
        </span>
      </div>
    </div>
  );
}
