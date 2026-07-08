"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import type { Site } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/i18n-provider";

/**
 * Leaflet map, loaded client-only (react-leaflet touches `window`).
 *
 * Map provider strategy: if a Google Maps key is configured we would use it;
 * with no key present the component automatically renders OpenStreetMap tiles,
 * which need no key and work identically after deployment. Today the app ships
 * without a Google key, so OSM is the active provider.
 */
const GOOGLE_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
export const usingOSM = !GOOGLE_KEY;

const SiteMapInner = dynamic(() => import("@/components/site-map-inner"), {
  ssr: false,
  loading: () => <MapLoading height={420} />,
});

function MapLoading({ height }: { height: number }) {
  const { t } = useI18n();
  return (
    <div
      className="relative flex items-center justify-center bg-muted"
      style={{ height }}
    >
      <Skeleton className="absolute inset-0 rounded-none" />
      <span className="relative z-10 flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4" /> {t.map.loading}
      </span>
    </div>
  );
}

export function SiteMap({
  sites,
  center,
  zoom,
  height = 420,
  interactive = true,
  showProvider = true,
}: {
  sites: Site[];
  center?: [number, number];
  zoom?: number;
  height?: number;
  interactive?: boolean;
  showProvider?: boolean;
}) {
  const { t } = useI18n();
  return (
    <div className="relative overflow-hidden rounded-xl border">
      {showProvider && (
        <Badge
          variant="secondary"
          className="absolute right-3 top-3 z-[400] shadow-sm"
        >
          {usingOSM ? t.map.osmBadge : t.map.googleBadge}
        </Badge>
      )}
      <SiteMapInner
        sites={sites}
        center={center}
        zoom={zoom}
        height={height}
        interactive={interactive}
      />
    </div>
  );
}
