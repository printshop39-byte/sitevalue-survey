import { Badge } from "@/components/ui/badge";
import type { ConditionRating, SiteStatus, WorkflowStage } from "@/lib/types";

const statusMap: Record<SiteStatus, { variant: "default" | "success" | "warning" | "muted"; dot: string }> = {
  Approved: { variant: "success", dot: "bg-success" },
  "In Review": { variant: "warning", dot: "bg-warning" },
  Draft: { variant: "default", dot: "bg-primary" },
  Archived: { variant: "muted", dot: "bg-muted-foreground" },
};

export function StatusBadge({ status }: { status: SiteStatus }) {
  const s = statusMap[status];
  return (
    <Badge variant={s.variant} className="gap-1.5 pl-2">
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </Badge>
  );
}

const conditionMap: Record<ConditionRating, "success" | "default" | "warning" | "destructive"> = {
  Excellent: "success",
  Good: "default",
  Fair: "warning",
  Poor: "destructive",
};

export function ConditionBadge({ condition }: { condition: ConditionRating }) {
  return <Badge variant={conditionMap[condition]}>{condition}</Badge>;
}

const stageMap: Record<
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
  return <Badge variant={stageMap[stage]}>{stage}</Badge>;
}
