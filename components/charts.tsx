import { cn, formatCurrency } from "@/lib/utils";
import { t, tStatus, tType } from "@/lib/i18n";
import type { SiteStatus, SiteType } from "@/lib/types";

const PALETTE = [
  "hsl(217 91% 42%)",
  "hsl(152 62% 36%)",
  "hsl(271 60% 50%)",
  "hsl(38 92% 45%)",
  "hsl(199 89% 48%)",
];

/* ---------------- Horizontal bar chart (valuation by type) ------------- */

export function ValuationBars({
  data,
}: {
  data: { label: string; value: number }[];
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="space-y-4">
      {data.map((d, i) => (
        <div key={d.label} className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{tType[d.label as SiteType] ?? d.label}</span>
            <span className="tabular-nums text-muted-foreground">
              {formatCurrency(d.value, true)}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${(d.value / max) * 100}%`,
                backgroundColor: PALETTE[i % PALETTE.length],
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Donut chart (status distribution) -------------------- */

export function StatusDonut({
  data,
}: {
  data: { label: string; value: number }[];
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const radius = 60;
  const circ = 2 * Math.PI * radius;
  let offset = 0;

  const colors: Record<string, string> = {
    Approved: "hsl(152 62% 36%)",
    "In Review": "hsl(38 92% 45%)",
    Draft: "hsl(217 91% 42%)",
    Archived: "hsl(215 16% 60%)",
  };

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
      <div className="relative h-40 w-40 shrink-0">
        <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
          <circle cx="80" cy="80" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="16" />
          {data.map((d) => {
            const len = (d.value / total) * circ;
            const seg = (
              <circle
                key={d.label}
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={colors[d.label] ?? "hsl(217 91% 42%)"}
                strokeWidth="16"
                strokeDasharray={`${len} ${circ - len}`}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              />
            );
            offset += len;
            return seg;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold">{total}</span>
          <span className="text-xs text-muted-foreground">{t.dashboard.totalSites}</span>
        </div>
      </div>
      <div className="grid w-full gap-2.5 sm:w-auto">
        {data.map((d) => (
          <div key={d.label} className="flex items-center justify-between gap-6 text-sm">
            <span className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: colors[d.label] ?? "hsl(217 91% 42%)" }}
              />
              {tStatus[d.label as SiteStatus] ?? d.label}
            </span>
            <span className="font-semibold tabular-nums">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Area/line trend chart -------------------------------- */

export function TrendChart({
  data,
  className,
}: {
  data: { month: string; value: number }[];
  className?: string;
}) {
  const w = 640;
  const h = 220;
  const pad = 28;
  const max = Math.max(...data.map((d) => d.value)) * 1.15;
  const min = 0;
  const stepX = (w - pad * 2) / (data.length - 1);
  const scaleY = (v: number) =>
    h - pad - ((v - min) / (max - min)) * (h - pad * 2);

  const points = data.map((d, i) => ({
    x: pad + i * stepX,
    y: scaleY(d.value),
  }));

  const line = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const area = `${line} L ${points[points.length - 1].x} ${h - pad} L ${points[0].x} ${h - pad} Z`;

  return (
    <div className={cn("w-full", className)}>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full">
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(217 91% 42%)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(217 91% 42%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={pad}
            x2={w - pad}
            y1={pad + (h - pad * 2) * f}
            y2={pad + (h - pad * 2) * f}
            stroke="hsl(var(--border))"
            strokeDasharray="3 4"
          />
        ))}
        <path d={area} fill="url(#trendFill)" />
        <path d={line} fill="none" stroke="hsl(217 91% 42%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="3.5" fill="hsl(var(--background))" stroke="hsl(217 91% 42%)" strokeWidth="2" />
            <text x={p.x} y={h - 8} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              {data[i].month}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
