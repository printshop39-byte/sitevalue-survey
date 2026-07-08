"use client";

import { Languages } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

const options: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "mr", label: "मराठी" },
];

/**
 * Compact EN / मराठी segmented switch. `variant="ghost"` suits dark surfaces
 * (the login hero); the default suits the app top bar.
 */
export function LanguageToggle({
  variant = "default",
  className,
}: {
  variant?: "default" | "ghost";
  className?: string;
}) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border p-0.5",
        variant === "ghost"
          ? "border-white/20 bg-white/10"
          : "border-border bg-muted/40",
        className
      )}
      role="group"
      aria-label="Language"
    >
      <Languages
        className={cn(
          "ml-1 h-3.5 w-3.5",
          variant === "ghost" ? "text-white/70" : "text-muted-foreground"
        )}
      />
      {options.map((o) => {
        const active = locale === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => setLocale(o.value)}
            aria-pressed={active}
            className={cn(
              "rounded-md px-2 py-1 text-xs font-medium transition-colors",
              active
                ? variant === "ghost"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "bg-background text-foreground shadow-sm"
                : variant === "ghost"
                ? "text-white/70 hover:text-white"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
