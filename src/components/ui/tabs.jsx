import * as React from "react";
import { cn } from "../../lib/utils";

const TabsContext = React.createContext(null);

function Tabs({ value, onValueChange, children, className }) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ children, className }) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex flex-wrap items-center justify-center gap-1 rounded-2xl bg-brand-50 p-1.5",
        className
      )}
    >
      {children}
    </div>
  );
}

function TabsTrigger({ value: triggerValue, children, className }) {
  const ctx = React.useContext(TabsContext);
  const active = ctx ? ctx.value === triggerValue : false;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={() => ctx?.onValueChange?.(triggerValue)}
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

function TabsContent({ value: contentValue, children, className }) {
  const ctx = React.useContext(TabsContext);
  if (ctx && contentValue !== undefined && contentValue !== ctx.value) return null;
  return <div className={cn("animate-rise-in", className)}>{children}</div>;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
