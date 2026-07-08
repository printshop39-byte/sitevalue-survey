"use client";

import { useMemo, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import type { Photo } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";

const categories = ["All", "Exterior", "Interior", "Structural", "Site", "Defect"] as const;

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const { t, tPhotoCat } = useI18n();
  const [category, setCategory] =
    useState<(typeof categories)[number]>("All");
  const [active, setActive] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      category === "All"
        ? photos
        : photos.filter((p) => p.category === category),
    [photos, category]
  );

  const open = active !== null ? filtered[active] : null;

  const step = (dir: number) => {
    if (active === null) return;
    setActive((active + dir + filtered.length) % filtered.length);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((c) => {
          const count =
            c === "All"
              ? photos.length
              : photos.filter((p) => p.category === c).length;
          return (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                category === c
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              )}
            >
              {tPhotoCat[c] ?? c}
              <span
                className={cn(
                  "rounded-full px-1.5 text-[10px]",
                  category === c ? "bg-primary/20" : "bg-muted"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => setActive(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted text-left"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.thumb}
              alt={photo.caption}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute left-2 top-2 flex gap-1.5">
              <Badge
                variant={photo.category === "Defect" ? "destructive" : "secondary"}
                className="bg-black/50 text-white backdrop-blur"
              >
                {tPhotoCat[photo.category] ?? photo.category}
              </Badge>
              {photo.tag && (
                <Badge variant="warning" className="backdrop-blur">
                  {photo.tag}
                </Badge>
              )}
            </div>
            <p className="absolute bottom-0 left-0 right-0 truncate p-2 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              {photo.caption}
            </p>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
          <Camera className="h-8 w-8" />
          <p className="text-sm">{t.gallery.noPhotos}</p>
        </div>
      )}

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div className="flex items-center justify-between p-4 text-white">
            <div>
              <p className="text-sm font-medium">{open.caption}</p>
              <p className="text-xs text-white/60">
                {tPhotoCat[open.category] ?? open.category} · {formatDate(open.takenAt)} ·{" "}
                {active! + 1} / {filtered.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <Download className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setActive(null)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center px-4 pb-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => step(-1)}
              className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={open.url}
              alt={open.caption}
              className="max-h-full max-w-full rounded-lg object-contain"
            />
            <button
              onClick={() => step(1)}
              className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
