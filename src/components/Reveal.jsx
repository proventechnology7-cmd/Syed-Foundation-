import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Refresh trigger positions once all assets (images, fonts) finish loading,
// so reveals fire at the right scroll position on image-heavy pages.
let refreshBound = false;
function ensureRefreshOnLoad() {
  if (refreshBound || typeof window === "undefined") return;
  refreshBound = true;
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Scroll-triggered reveal animation.
 * - Fades + slides up once when scrolled into view (play-once by default,
 *   so scrolling back up doesn't re-hide content).
 * - `replay`: set true to replay every time the element enters/leaves view.
 * - `stagger`: when > 0 (seconds), direct children animate one after another.
 * - `delay`: stagger offset in seconds. `y`: slide distance in px.
 * - Respects prefers-reduced-motion: renders visible with no animation.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  replay = false,
  stagger = 0,
}) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    ensureRefreshOnLoad();
    const el = ref.current;
    if (!el) return;

    // Reduced motion: show everything immediately, animate nothing.
    if (prefersReducedMotion()) {
      gsap.set(el, { clearProps: "opacity,transform" });
      if (stagger) gsap.set(el.children, { clearProps: "opacity,transform" });
      return;
    }

    const useStagger = stagger > 0 && el.children.length > 0;
    const targets = useStagger ? el.children : el;
    const tween = gsap.fromTo(
      targets,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        delay,
        ease: "power3.out",
        stagger: useStagger ? stagger : 0,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: replay ? "play none none reverse" : "play none none none",
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, y, replay, stagger]);

  return (
    <div
      ref={ref}
      className={className}
      // In stagger mode the children carry the hidden state (set by GSAP),
      // so the wrapper itself must not start invisible.
      style={stagger > 0 ? undefined : { opacity: 0 }}
    >
      {children}
    </div>
  );
}
