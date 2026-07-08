"use client";

import {
  FileArchive,
  FileSpreadsheet,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { UploadDropzone } from "@/components/upload-dropzone";
import { NativeSelect } from "@/components/ui/native-select";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sites } from "@/lib/mock-data";
import { useI18n } from "@/components/i18n-provider";

export default function UploadPage() {
  const { t } = useI18n();

  const categories = [
    { icon: ImageIcon, label: t.upload.catPhotos, hint: t.upload.catPhotosHint, tint: "text-primary bg-primary/10" },
    { icon: FileText, label: t.upload.catPdf, hint: t.upload.catPdfHint, tint: "text-warning bg-warning/10" },
    { icon: FileArchive, label: t.upload.catDwg, hint: t.upload.catDwgHint, tint: "text-[hsl(271_60%_50%)] bg-[hsl(271_60%_50%)]/10" },
    { icon: FileSpreadsheet, label: t.upload.catEstimate, hint: t.upload.catEstimateHint, tint: "text-success bg-success/10" },
  ];

  return (
    <div className="mx-auto max-w-[1100px] space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title={t.upload.title}
        description={t.upload.subtitle}
        crumbs={[{ label: t.brand.workspace, href: "/dashboard" }, { label: t.upload.crumb }]}
      />

      {/* Accepted categories */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {categories.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.label}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${c.tint}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{c.label}</p>
                  <p className="text-xs text-muted-foreground">{c.hint}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader className="flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <CardTitle className="text-base">{t.upload.title}</CardTitle>
          <div className="flex items-center gap-2">
            <Label className="whitespace-nowrap text-sm text-muted-foreground">
              {t.upload.targetSite}
            </Label>
            <NativeSelect defaultValue={sites[0].id} className="w-56">
              {sites.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} · {s.reference}
                </option>
              ))}
            </NativeSelect>
          </div>
        </CardHeader>
        <CardContent>
          <UploadDropzone />
        </CardContent>
      </Card>
    </div>
  );
}
