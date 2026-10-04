import * as React from "react";
import { cn } from "../../lib/utils";

function Tabs({ value, onValueChange, children, className }) {
  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { value, onValueChange }) : child
      )}
    </div>
  );
}

function TabsList({ value, onValueChange, children, className }) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex flex-wrap items-center justify-center gap-1 rounded-2xl bg-brand-50 p-1.5",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { value, onValueChange }) : child
      )}
    </div>
  );
}

function TabsTrigger({ value: triggerValue, value, onValueChange, children, className }) {
  const active = triggerValue === value;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={() => onValueChange?.(triggerValue)}
      className={cn(
        "rounded-xl px-4 py-2 text-sm font-semibold transition-all sm:px-5",
        active ? "bg-white text-brand-900 shadow-card" : "text-brand-700/70 hover:text-brand-900",
        className
      )}
    >
      {children}
    </button>
  );
}

function TabsContent({ value: contentValue, value, children, className }) {
  if (contentValue !== value) return null;
  return <div className={cn("animate-rise-in", className)}>{children}</div>;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
