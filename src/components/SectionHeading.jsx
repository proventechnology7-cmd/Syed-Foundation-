import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";

/**
 * Eyebrow + title + subtitle block used across sections.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
  className,
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "mx-0 text-left",
        className
      )}
    >
      {eyebrow && (
        <Badge variant={dark ? "gold" : "secondary"} className="mb-4">
          {eyebrow}
        </Badge>
      )}
      <h2
        className={cn(
          "text-3xl font-extrabold tracking-tight sm:text-4xl",
          dark ? "text-white" : "text-brand-950"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-brand-100/85" : "text-stone-600")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
