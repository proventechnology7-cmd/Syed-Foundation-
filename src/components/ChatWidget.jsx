import * as React from "react";
import { X, MessageCircle } from "lucide-react";
import { SITE, whatsappLink } from "../data/site";
import { feedback } from "../lib/sound";
import { cn } from "../lib/utils";

/**
 * Floating chat widget — gold brand style with the kid mascot avatar.
 * Shows a proactive greeting bubble after a few seconds; clicking opens
 * a WhatsApp chat with a prefilled message. Dismissal is remembered for
 * the session so it doesn't nag.
 */
const DISMISSED_KEY = "sf-chat-dismissed";

const AVATAR = "data:image/webp;base64,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";

export default function ChatWidget() {
  const [open, setOpen] = React.useState(false); // greeting card visible
  const [seen, setSeen] = React.useState(false); // badge cleared
  const [ready, setReady] = React.useState(false); // entrance done

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(DISMISSED_KEY)) {
      setSeen(true);
      setReady(true);
      return;
    }
    const t = window.setTimeout(() => {
      setOpen(true);
      setReady(true);
    }, 3500);
    return () => window.clearTimeout(t);
  }, []);

  const dismiss = React.useCallback(() => {
    setOpen(false);
    setSeen(true);
    try {
      window.sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const openWhatsApp = React.useCallback(() => {
    feedback("select");
    setSeen(true);
    window.open(
      whatsappLink("Assalam o Alaikum! I want to know more about your online Quran classes."),
      "_blank",
      "noopener,noreferrer"
    );
  }, []);

  const toggle = React.useCallback(() => {
    feedback("tick");
    if (open) {
      dismiss();
    } else {
      setOpen(true);
      setSeen(true);
    }
  }, [open, dismiss]);

  return (
    <div
      className={cn(
        "fixed right-4 z-40 flex flex-col items-end gap-3 lg:right-6",
        // sit above the sticky mobile CTA bar on small screens
        "bottom-24 lg:bottom-6",
        "transition-all duration-700",
        ready ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
      aria-label="Chat with us on WhatsApp"
    >
      {/* Greeting card */}
      <div
        className={cn(
          "w-64 origin-bottom-right rounded-2xl border border-gold-500/60 bg-brand-950/95 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"
        )}
        role="dialog"
        aria-hidden={!open}
      >
        <button
          onClick={dismiss}
          aria-label="Dismiss chat greeting"
          className="absolute right-2 top-2 rounded-full p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2.5">
          <img
            src={AVATAR}
            alt="Syed Foundation assistant"
            className="h-10 w-10 rounded-full border border-gold-500/70 object-cover"
          />
          <div>
            <p className="text-sm font-bold text-gold-300">Assalam o Alaikum!</p>
            <p className="flex items-center gap-1 text-[11px] text-emerald-200/90">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Online — replies quickly
            </p>
          </div>
        </div>
        <p className="mt-2.5 text-[13px] leading-relaxed text-white/85">
          Courses ya timings ke baare mein koi sawal? Hum se abhi chat karein.
        </p>
        <button
          onClick={openWhatsApp}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 px-4 py-2.5 text-sm font-bold text-brand-950 shadow-gold transition hover:bg-gold-400 active:scale-[0.98]"
        >
          <MessageCircle className="h-4 w-4" />
          Chat on WhatsApp
        </button>
      </div>

      {/* Floating avatar button */}
      <button
        onClick={toggle}
        aria-label={open ? "Close chat widget" : "Open chat widget"}
        className="group relative h-14 w-14 overflow-visible rounded-full border-2 border-gold-500 bg-brand-900 shadow-[0_8px_28px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <img
          src={AVATAR}
          alt=""
          className="h-full w-full rounded-full object-cover"
          draggable={false}
        />
        {!seen && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white shadow">
            1
          </span>
        )}
        <span className="absolute inset-0 rounded-full border-2 border-gold-400/0 transition group-hover:border-gold-400/50" />
      </button>
    </div>
  );
}
