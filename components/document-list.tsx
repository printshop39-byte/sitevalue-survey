"use client";

import { useMemo, useState } from "react";
import {
  Download,
  FileBadge,
  FileSpreadsheet,
  FileText,
  MoreVertical,
  PenTool,
  Scale,
  Search,
} from "lucide-react";
import type { DocumentType, SiteDocument } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, formatDate } from "@/lib/utils";
import { t, tDocType } from "@/lib/i18n";

const typeMeta: Record<
  DocumentType,
  { icon: typeof FileText; color: string }
> = {
  Report: { icon: FileText, color: "text-primary bg-primary/10" },
  Drawing: { icon: PenTool, color: "text-[hsl(271_60%_50%)] bg-[hsl(271_60%_50%)]/10" },
  Certificate: { icon: FileBadge, color: "text-success bg-success/10" },
  Legal: { icon: Scale, color: "text-warning bg-warning/10" },
  Spreadsheet: { icon: FileSpreadsheet, color: "text-[hsl(152_62%_36%)] bg-[hsl(152_62%_36%)]/10" },
};

const filters: (DocumentType | "All")[] = [
  "All",
  "Report",
  "Drawing",
  "Certificate",
  "Legal",
  "Spreadsheet",
];

export function DocumentList({ documents }: { documents: SiteDocument[] }) {
  const [type, setType] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      documents.filter(
        (d) =>
          (type === "All" || d.type === type) &&
          d.name.toLowerCase().includes(query.toLowerCase())
      ),
    [documents, type, query]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t.documents.search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setType(f)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                type === f
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              )}
            >
              {tDocType[f]}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.documents.colDocument}</TableHead>
              <TableHead>{t.documents.colType}</TableHead>
              <TableHead>{t.documents.colVersion}</TableHead>
              <TableHead>{t.documents.colUploadedBy}</TableHead>
              <TableHead>{t.documents.colDate}</TableHead>
              <TableHead className="text-right">{t.documents.colSize}</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((doc) => {
              const meta = typeMeta[doc.type];
              const Icon = meta.icon;
              return (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-lg",
                          meta.color
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{tDocType[doc.type]}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {doc.version}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {doc.uploadedBy}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(doc.uploadedAt)}
                  </TableCell>
                  <TableCell className="text-right text-sm tabular-nums text-muted-foreground">
                    {doc.size}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="h-4 w-4" /> {t.documents.download}
                        </DropdownMenuItem>
                        <DropdownMenuItem>{t.documents.preview}</DropdownMenuItem>
                        <DropdownMenuItem>{t.documents.history}</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm text-muted-foreground">
            {t.documents.noDocs}
          </div>
        )}
      </Card>
    </div>
  );
}
