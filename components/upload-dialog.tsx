"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadDropzone } from "@/components/upload-dropzone";
import { useI18n } from "@/components/i18n-provider";

/**
 * "Upload" button that opens a dialog wrapping the shared dropzone. Used from
 * the per-site Photos and Documents pages.
 */
export function UploadDialog({
  label,
  siteName,
}: {
  label: string;
  siteName: string;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="h-4 w-4" /> {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{t.upload.title}</DialogTitle>
          <DialogDescription>
            {t.upload.targetSite}: <span className="font-medium">{siteName}</span>
          </DialogDescription>
        </DialogHeader>
        <UploadDropzone compact onComplete={() => undefined} />
      </DialogContent>
    </Dialog>
  );
}
