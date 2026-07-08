import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  hint?: string;
  accent?: "primary" | "success" | "warning";
  /** Optional mini sparkline series. */
  spark?: number[];
}

const accentMap = {
  primary: { chip: "bg-primary/10 text-primary", stroke: "hsl(217 91% 42%)" },
  success: { chip: "bg-success/12 text-success", stroke: "hsl(152 62% 36%)" },
  warning: { chip: "bg-warning/15 text-warning", stroke: "hsl(38 92% 45%)" },
};

function Sparkline({ data, stroke }: { data: number[]; stroke: string }) {
  const w = 96;
  const h = 32;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const stepX = w / (data.length - 1);
  const pts = data.map((v, i) => ({
    x: i * stepX,
    y: h - 2 - ((v - min) / span) * (h - 4),
  }));
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const area = `${line} L ${w} ${h} L 0 ${h} Z`;
  const id = `spk-${stroke.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-24" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.22" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function KpiCard({
  label,
  value,
  icon: Icon,
  trend,
  hint,
  accent = "primary",
  spark,
}: KpiCardProps) {
  const a = accentMap[accent];
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-2xl font-semibold tracking-tight">{value}</p>
          </div>
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", a.chip)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="flex items-center gap-2 text-xs">
            {trend && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 font-semibold",
                  trend.positive ? "text-success" : "text-destructive"
                )}
              >
                {trend.positive ? (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5" />
                )}
                {trend.value}
              </span>
            )}
            {hint && <span className="text-muted-foreground">{hint}</span>}
          </div>
          {spark && spark.length > 1 && (
            <Sparkline data={spark} stroke={a.stroke} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
