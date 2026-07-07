import { cn } from "@/lib/utils";

/**
 * Placeholder client logo mark. Replace the <svg> with the client's real
 * logo asset (or an <Image>) when branding is provided.
 */
export function ClientLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("h-10 w-10", className)}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="10" fill="hsl(var(--primary))" />
      <path
        d="M20 8 L31 14 V26 L20 32 L9 26 V14 Z"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14 22 L18 25 L26 16"
        fill="none"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
