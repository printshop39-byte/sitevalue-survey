"use client";

import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/i18n-provider";
import type { ConditionRating, SiteStatus, WorkflowStage } from "@/lib/types";

const statusVariant: Record<SiteStatus, { variant: "default" | "success" | "warning" | "muted"; dot: string }> = {
  Approved: { variant: "success", dot: "bg-success" },
  "In Review": { variant: "warning", dot: "bg-warning" },
  Draft: { variant: "default", dot: "bg-primary" },
  Archived: { variant: "muted", dot: "bg-muted-foreground" },
};

export function StatusBadge({ status }: { status: SiteStatus }) {
  const { tStatus } = useI18n();
  const s = statusVariant[status];
  return (
    <Badge variant={s.variant} className="gap-1.5 pl-2">
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {tStatus[status]}
    </Badge>
  );
}

const conditionVariant: Record<ConditionRating, "success" | "default" | "warning" | "destructive"> = {
  Excellent: "success",
  Good: "default",
  Fair: "warning",
  Poor: "destructive",
};

export function ConditionBadge({ condition }: { condition: ConditionRating }) {
  const { tCondition } = useI18n();
  return <Badge variant={conditionVariant[condition]}>{tCondition[condition]}</Badge>;
}

const stageVariant: Record<
  WorkflowStage,
  "muted" | "warning" | "default" | "success"
> = {
  Draft: "muted",
  "Survey Pending": "warning",
  "Documents Pending": "warning",
  "Ready for Print": "default",
  Completed: "success",
};

export function WorkflowBadge({ stage }: { stage: WorkflowStage }) {
  const { tStage } = useI18n();
  return <Badge variant={stageVariant[stage]}>{tStage[stage]}</Badge>;
}
