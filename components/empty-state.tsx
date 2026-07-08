import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Consistent empty state used across the app when a list, filter or record
 * has no content. Pass an optional `action` (e.g. a Button) for recovery.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  compact = false,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <Card className={className}>
      <CardContent
        className={
          compact
            ? "flex flex-col items-center justify-center gap-3 py-10 text-center"
            : "flex flex-col items-center justify-center gap-4 py-16 text-center"
        }
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <Icon className="h-7 w-7" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-base font-semibold">{title}</h3>
          {description && (
            <p className="mx-auto max-w-sm text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {action}
      </CardContent>
    </Card>
  );
}
