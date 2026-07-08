"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileText,
  Loader2,
  Upload,
  UploadCloud,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";

interface Picked {
  id: string;
  name: string;
  size: number;
  type: string;
  preview?: string; // object URL for images
}

let seq = 0;

function humanSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function iconFor(name: string, type: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (type.startsWith("image/")) return FileImage;
  if (ext === "pdf") return FileText;
  if (["xls", "xlsx", "csv"].includes(ext)) return FileSpreadsheet;
  if (["dwg", "dxf", "zip"].includes(ext)) return FileArchive;
  return FileText;
}

export function UploadDropzone({
  onComplete,
  compact = false,
}: {
  onComplete?: (count: number) => void;
  compact?: boolean;
}) {
  const { t, fill } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<Picked[]>([]);
  const [dragging, setDragging] = useState(false);
  const [phase, setPhase] = useState<"idle" | "uploading" | "done">("idle");

  // Revoke object URLs on unmount to avoid leaks.
  useEffect(() => {
    return () => {
      files.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFiles = useCallback((list: FileList | null) => {
    if (!list || list.length === 0) return;
    const next: Picked[] = Array.from(list).map((file) => ({
      id: `f${++seq}`,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
    }));
    setFiles((prev) => [...prev, ...next]);
    setPhase("idle");
  }, []);

  const remove = (id: string) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target?.preview) URL.revokeObjectURL(target.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const clearAll = () => {
    files.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
    setFiles([]);
    setPhase("idle");
  };

  const startUpload = () => {
    if (files.length === 0) return;
    setPhase("uploading");
    // Simulated upload — no network. Resolves to a success state.
    window.setTimeout(() => {
      setPhase("done");
      onComplete?.(files.length);
    }, 1400);
  };

  if (phase === "done") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-success/30 bg-success/5 py-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold">{t.upload.successTitle}</h3>
          <p className="text-sm text-muted-foreground">
            {fill(t.upload.successBody, { n: files.length })}
          </p>
        </div>
        <Button variant="outline" onClick={clearAll}>
          <Upload className="h-4 w-4" /> {t.upload.uploadMore}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed text-center transition-colors",
          compact ? "px-4 py-8" : "px-6 py-12",
          dragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/40"
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UploadCloud className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium">{t.upload.dropTitle}</p>
        <p className="text-xs text-muted-foreground">{t.upload.dropSub}</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-1"
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.click();
          }}
        >
          {t.upload.browse}
        </Button>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">
          {t.upload.selected}
          {files.length > 0 && (
            <span className="ml-1 text-muted-foreground">({files.length})</span>
          )}
        </p>
        {files.length > 0 && phase === "idle" && (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            {t.upload.clearAll}
          </Button>
        )}
      </div>

      {files.length === 0 ? (
        <div className="rounded-lg border border-dashed py-8 text-center text-sm text-muted-foreground">
          {t.upload.empty}
          <p className="mt-1 text-xs">{t.upload.emptyHint}</p>
        </div>
      ) : (
        <ul className="grid gap-2 sm:grid-cols-2">
          {files.map((f) => {
            const Icon = iconFor(f.name, f.type);
            return (
              <li
                key={f.id}
                className="flex items-center gap-3 rounded-lg border bg-card p-2.5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
                  {f.preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={f.preview}
                      alt={f.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{f.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {humanSize(f.size)}
                  </p>
                </div>
                {phase === "idle" && (
                  <button
                    type="button"
                    onClick={() => remove(f.id)}
                    aria-label={t.upload.remove}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">{t.upload.maxNote}</p>
        <Button
          onClick={startUpload}
          disabled={files.length === 0 || phase === "uploading"}
        >
          {phase === "uploading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> {t.upload.uploading}
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />{" "}
              {fill(t.upload.simulate, { n: files.length })}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
