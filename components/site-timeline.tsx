import { Check } from "lucide-react";
import type { TimelineStep } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

export function SiteTimeline({ steps }: { steps: TimelineStep[] }) {
  const activeIdx = steps.findIndex((s) => !s.done);

  return (
    <ol className="relative space-y-0">
      {steps.map((step, i) => {
        const isActive = i === activeIdx;
        const isLast = i === steps.length - 1;
        return (
          <li key={step.key} className="flex gap-4">
            {/* Rail */}
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors",
                  step.done
                    ? "border-success bg-success text-success-foreground"
                    : isActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-muted text-muted-foreground"
                )}
              >
                {step.done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              {!isLast && (
                <span
                  className={cn(
                    "min-h-[28px] w-0.5 flex-1",
                    step.done ? "bg-success" : "bg-border"
                  )}
                />
              )}
            </div>
            {/* Content */}
            <div className={cn("pb-6", isLast && "pb-0")}>
              <p
                className={cn(
                  "text-sm font-medium leading-8",
                  step.done || isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {step.done && step.date
                  ? formatDate(step.date)
                  : isActive
                  ? "In progress"
                  : "Pending"}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
