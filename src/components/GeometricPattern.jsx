import { cn } from "../lib/utils";

/**
 * Subtle Islamic geometric pattern (original SVG art) rendered at low opacity
 * behind sections. Non-interactive.
 */
export default function GeometricPattern({ className, opacity = 0.05 }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ opacity }}
    >
      <defs>
        <pattern id="geo-pattern" width="96" height="96" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="28" y="28" width="40" height="40" />
            <rect x="28" y="28" width="40" height="40" transform="rotate(45 48 48)" />
            <circle cx="48" cy="48" r="7" />
            <circle cx="0" cy="0" r="14" />
            <circle cx="96" cy="0" r="14" />
            <circle cx="0" cy="96" r="14" />
            <circle cx="96" cy="96" r="14" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geo-pattern)" />
    </svg>
  );
}
