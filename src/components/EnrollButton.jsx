import { CalendarCheck } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "../lib/utils";
import { useLeadPopup } from "./LeadPopupContext";
import { REGIONS, getPrice } from "../data/pricing";

/** CTA button that opens the lead-capture popup.
 *  Pass `plan` + `regionId` to show that plan inside the popup, or `course` to pre-select it. */
export default function EnrollButton({ className, variant = "default", size = "default", children, plan, regionId, course }) {
  const { openPopup } = useLeadPopup();

  const go = () => {
    let planLabel = "";
    if (plan) {
      const region = REGIONS.find((r) => r.id === (regionId || "gulf")) || REGIONS[0];
      planLabel = `${plan.name} — ${region.label}: ${region.currency}${getPrice(plan.id, region.id)}/mo`;
    }
    openPopup({ planLabel, course, source: "cta-button" });
  };

  return (
    <button type="button" onClick={go} className={cn(buttonVariants({ variant, size }), "btn-cta", className)}>
      <CalendarCheck className="h-4 w-4" />
      {children || "Book Free Trial"}
    </button>
  );
}
