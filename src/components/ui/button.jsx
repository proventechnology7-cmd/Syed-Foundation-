import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-brand-700 text-white shadow hover:bg-brand-800 active:scale-[0.98]",
        gold: "bg-gold-400 text-brand-950 shadow hover:bg-gold-500 active:scale-[0.98]",
        secondary: "bg-brand-100 text-brand-900 hover:bg-brand-200 active:scale-[0.98]",
        outline: "border border-brand-300 bg-transparent text-brand-800 hover:bg-brand-50",
        ghost: "text-brand-800 hover:bg-brand-100",
        whatsapp: "bg-[#25D366] text-white shadow hover:brightness-95 active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "px-8 py-4 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? "span" : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
