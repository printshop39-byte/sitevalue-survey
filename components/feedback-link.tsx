"use client";

import { MessageCircle } from "lucide-react";
import { feedbackLink } from "@/lib/pilot";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";

/**
 * "Send feedback" link that opens a pre-filled WhatsApp chat to K D SOFT.
 * Renders nothing until a WhatsApp number is configured in lib/pilot.ts, so it
 * stays invisible in the frozen demo until the pilot is switched on.
 */
export function FeedbackLink({ className }: { className?: string }) {
  const href = feedbackLink();
  const { t } = useI18n();
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 font-medium text-primary hover:underline",
        className
      )}
    >
      <MessageCircle className="h-3.5 w-3.5" />
      {t.common.feedback}
    </a>
  );
}
