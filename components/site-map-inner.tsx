"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { Site } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";

/**
 * Build a dependency-free marker (no external image assets, which break under
 * bundlers). Size scales with the site's valuation so the map doubles as a
 * value heat-view.
 */
function pin(size: number, accent: string) {
  const s = Math.round(size);
  return L.divIcon({
    className: "",
    html: `<div style="position:relative;width:${s}px;height:${s}px">
      <span style="display:block;width:${s}px;height:${s}px;border-radius:50% 50% 50% 0;background:${accent};transform:rotate(-45deg);box-shadow:0 2px 6px rgba(0,0,0,.35);border:2px solid #fff"></span>
      <span style="position:absolute;top:50%;left:50%;width:${Math.round(
        s / 3
      )}px;height:${Math.round(
    s / 3
  )}px;background:#fff;border-radius:50%;transform:translate(-50%,-60%)"></span>
    </div>`,
    iconSize: [s, s],
    iconAnchor: [s / 2, s],
    popupAnchor: [0, -s],
  });
}

const accentFor: Record<string, string> = {
  Approved: "hsl(152 62% 36%)",
  "In Review": "hsl(38 92% 45%)",
  Draft: "hsl(217 91% 42%)",
  Archived: "hsl(215 16% 55%)",
};

export default function SiteMapInner({
  sites,
  center,
  zoom = 7,
  height = 420,
  interactive = true,
}: {
  sites: Site[];
  center?: [number, number];
  zoom?: number;
  height?: number;
  interactive?: boolean;
}) {
  const { t, tType } = useI18n();
  const values = sites.map((s) => s.valuation);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const sizeFor = (v: number) =>
    max === min ? 30 : 22 + ((v - min) / (max - min)) * 20;

  const mapCenter: [number, number] =
    center ?? (sites.length === 1
      ? [sites[0].coordinates.lat, sites[0].coordinates.lng]
      : [18.9, 74.6]);

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      scrollWheelZoom={false}
      dragging={interactive}
      style={{ height, width: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {sites.map((s) => (
        <Marker
          key={s.id}
          position={[s.coordinates.lat, s.coordinates.lng]}
          icon={pin(sizeFor(s.valuation), accentFor[s.status] ?? "hsl(217 91% 42%)")}
        >
          <Popup>
            <div className="space-y-1">
              <p className="text-sm font-semibold">{s.name}</p>
              <p className="text-xs text-slate-500">
                {s.reference} · {s.city} · {tType[s.type]}
              </p>
              <p className="text-sm font-semibold">
                {formatCurrency(s.valuation, true)}
              </p>
              <Link
                href={`/sites/${s.id}`}
                className="inline-block pt-1 text-xs font-medium text-primary underline"
              >
                {t.map.viewSite} →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
