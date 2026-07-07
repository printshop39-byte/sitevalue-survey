"use client";

import { useEffect, useState } from "react";
import { t } from "@/lib/i18n";

/**
 * Official-style print stamp: Printed On / Printed By / Document Version /
 * Page. The timestamp is resolved on the client so it reflects the actual
 * moment the report is opened or printed.
 */
export function PrintStamp({
  printedBy,
  version,
  page = 1,
  totalPages = 5,
}: {
  printedBy: string;
  version: string;
  page?: number;
  totalPages?: number;
}) {
  const [stamp, setStamp] = useState("—");

  useEffect(() => {
    setStamp(
      new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, []);

  const cell = (label: string, value: string) => (
    <div className="px-3 py-1.5">
      <p className="text-[9px] uppercase tracking-wide text-slate-400">{label}</p>
      <p className="text-[11px] font-medium text-slate-700">{value}</p>
    </div>
  );

  return (
    <div className="mt-8 grid grid-cols-2 divide-x divide-y divide-slate-200 rounded-md border border-slate-300 sm:grid-cols-4 sm:divide-y-0">
      {cell(t.print.printedOn, stamp)}
      {cell(t.print.printedBy, printedBy)}
      {cell(t.print.version, version)}
      {cell(t.print.page, `${totalPages} पैकी ${page}`)}
    </div>
  );
}
