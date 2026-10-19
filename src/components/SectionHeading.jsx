import * as React from "react";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";

/**
 * Eyebrow + title + subtitle block used across sections.
 * The title gets a cinematic "mask reveal" (slides up from behind an
 * overflow-hidden mask) the first time it scrolls into view.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
  className,
  as: Tag = "h2",
}) {
  const titleRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
      <Tag
        className={cn(
          "heading-hover font-display text-3xl font-normal tracking-tight sm:text-4xl",
          dark ? "text-white" : "text-brand-950"
        )}
      >
        <span
          ref={titleRef}
          className={cn("mask-wrap", visible && "is-visible")}
        >
          <span className="mask-inner">{title}</span>
        </span>
      </Tag>
      {subtitle && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-brand-100/85" : "text-stone-600")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
