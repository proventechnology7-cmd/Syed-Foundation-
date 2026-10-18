import * as React from "react";
import { CalendarCheck } from "lucide-react";
import { cn } from "../lib/utils";
import { useLeadPopup } from "./LeadPopupContext";

/**
 * Sticky bottom CTA bar — mobile only. Appears after scrolling past the hero,
 * keeping the free-trial action one tap away on small screens.
 */
export default function StickyMobileCTA() {
  const [visible, setVisible] = React.useState(false);
  const { openPopup } = useLeadPopup();

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-brand-100 bg-ivory/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full"
      )}
      aria-hidden={!visible}
    >
      <button
        type="button"
        onClick={() => openPopup({ source: "sticky-mobile" })}
        tabIndex={visible ? 0 : -1}
        className="btn-cta flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-700 text-sm font-bold text-white shadow"
      >
        <CalendarCheck className="h-4 w-4" />
        Book Your Free Trial Class
      </button>
    </div>
  );
}
