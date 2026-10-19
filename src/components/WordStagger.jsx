import { cn } from "../lib/utils";

/**
 * Splits text into words that rise one after another (pure CSS, no JS timing).
 * `base` = delay before the first word (seconds), `step` = delay between words.
 * Screen readers get the full text via aria-label; animated words are hidden
 * from assistive tech to avoid stuttered announcements.
 */
export default function WordStagger({ text, base = 0, step = 0.07, className }) {
  const words = text.trim().split(/\s+/);
  return (
    <span className={cn("word-stagger", className)} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="word-stagger-word"
          style={{ "--w-delay": `${(base + i * step).toFixed(3)}s` }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}
