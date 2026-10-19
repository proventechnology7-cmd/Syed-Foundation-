import * as React from "react";

/**
 * Thin gold scroll-progress bar pinned to the top of the viewport.
 * Updates via rAF-throttled scroll listener; transform-only for 60fps.
 */
export default function ScrollProgress() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.min(Math.max(h.scrollTop / max, 0), 1) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60]">
      <div
        ref={ref}
        className="h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600"
      />
    </div>
  );
}
