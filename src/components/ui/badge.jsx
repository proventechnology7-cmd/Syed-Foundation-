import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none [&_svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-transparent bg-brand-700 text-white",
        secondary: "border-transparent bg-brand-100 text-brand-900",
        gold: "border-transparent bg-gold-400 text-brand-950",
        outline: "border-brand-200 text-brand-800",
        success: "border-transparent bg-emerald-100 text-emerald-800",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
