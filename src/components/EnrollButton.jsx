import { CalendarCheck } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "../lib/utils";
import { feedback } from "../lib/sound";
import { useLeadPopup } from "./LeadPopupContext";
import { useBooking } from "./BookingContext";
import { REGIONS, getPrice } from "../data/pricing";

/**
 * CTA button.
 * - Default: opens the trial-booking scheduler (Calendly-style).
 * - `mode="lead"`: opens the classic lead-capture popup instead
 *   (used for non-booking CTAs like "Get Expert Proposal").
 * Pass `plan` + `regionId` to attach that plan, or `course` to pre-select it.
 */
export default function EnrollButton({ className, variant = "default", size = "default", children, plan, regionId, course, mode }) {
  const { openPopup } = useLeadPopup();
  const { openBooking } = useBooking();

  const go = () => {
    if (mode === "lead") {
      let planLabel = "";
      let planId = "";
      if (plan) {
        const region = REGIONS.find((r) => r.id === (regionId || "gulf")) || REGIONS[0];
        planLabel = `${plan.name} — ${region.label}: ${region.currency}${getPrice(plan.id, region.id)}/mo`;
        planId = String(plan.id);
      }
      openPopup({ planLabel, planId, course, source: "cta-button" });
      return;
    }
    feedback("select");
    openBooking({ plan, regionId, course, source: "cta-button" });
  };

  return (
    <button type="button" onClick={go} className={cn(buttonVariants({ variant, size }), "btn-cta", className)}>
      <CalendarCheck className="h-4 w-4" />
      {children || "Book Free Trial"}
    </button>
  );
}
