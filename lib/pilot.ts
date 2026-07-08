/**
 * Pilot configuration.
 *
 * To route in-app feedback to K D SOFT over WhatsApp, set `whatsappNumber`
 * below to the number in international format — digits only, no "+", spaces or
 * dashes. Example: "919820011223" for +91 98200 11223.
 *
 * While it is empty, the feedback affordance is hidden everywhere, so the
 * frozen demo surface is unchanged. Set the number, commit, and push — Vercel
 * redeploys automatically and the "Send feedback" link appears app-wide.
 */
export const pilot = {
  whatsappNumber: "", // ← set the K D SOFT WhatsApp number here to enable feedback
  feedbackPrompt:
    "Hi K D SOFT — my feedback on the Survey & Site Valuation demo:",
};

/** wa.me deep link with a pre-filled message, or null when no number is set. */
export function feedbackLink(): string | null {
  const digits = pilot.whatsappNumber.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(pilot.feedbackPrompt)}`;
}
