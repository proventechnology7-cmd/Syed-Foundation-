import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

function Accordion({ children, className, ...props }) {
  return (
    <div className={cn("divide-y divide-brand-100 rounded-2xl border border-brand-100 bg-white", className)} {...props}>
      {children}
    </div>
  );
}

function AccordionItem({ question, children, defaultOpen = false, className }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className={cn("px-5 sm:px-6", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm sm:text-base font-semibold text-brand-950">{question}</span>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-transform duration-300",
            open && "rotate-180 bg-brand-700 text-white"
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="text-sm leading-relaxed text-stone-600">{children}</div>
        </div>
      </div>
    </div>
  );
}

export { Accordion, AccordionItem };
