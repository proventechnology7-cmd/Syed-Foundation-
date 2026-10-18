import * as React from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { X, CheckCircle2, Loader2, CalendarCheck, Sparkles } from "lucide-react";
import { SITE } from "../data/site";
import { COURSES } from "../data/courses";

const inputCls =
  "w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 outline-none transition-all duration-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-100";

/**
 * Lead capture popup. Opens from any "Book Free Trial" button via useLeadPopup(),
 * or automatically 3s after the homepage loads (once per 7 days).
 * Submits straight to the Google Sheet endpoint — same as the enrollment form.
 */
export default function LeadPopup({ open, context = {}, onClose }) {
  const [form, setForm] = React.useState({ name: "", phone: "", email: "", country: "", course: "" });
  const [status, setStatus] = React.useState("idle"); // idle | sending | done
  const backdropRef = React.useRef(null);
  const cardRef = React.useRef(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Entrance animation + lock body scroll
  React.useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setForm((f) => ({ ...f, course: context.course || f.course || "" }));
    document.body.style.overflow = "hidden";
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.88, y: 32 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }
    );
    gsap.fromTo(
      ".lead-popup-field",
      { opacity: 0, x: -14 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, delay: 0.25, ease: "power2.out", overwrite: true }
    );
    return () => {
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open ]);

  if (!open) return null;

  const closeAnimated = () => {
    gsap.to(cardRef.current, { opacity: 0, scale: 0.92, y: 20, duration: 0.25, ease: "power2.in" });
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.25, onComplete: onClose });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      country: form.country.trim(),
      course: form.course,
      requirements: context.source ? `Source: ${context.source}` : "",
      plan: context.planLabel || "",
    };
    try {
      await fetch(SITE.leadSheetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });
    } catch {
      /* fire-and-forget: sheet may still have received it */
    }
    setStatus("done");
    requestAnimationFrame(() => {
      gsap.fromTo(".popup-success-icon", { scale: 0, rotate: -30 }, { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(2)" });
    });
  };

  const planLine = context.planLabel ? (
    <p className="mt-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-700">
      <Sparkles className="h-3.5 w-3.5" />
      {context.planLabel}
    </p>
  ) : null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Book free trial">
      <div ref={backdropRef} className="absolute inset-0 bg-brand-950/60 backdrop-blur-sm" onClick={closeAnimated} />
      <div
        ref={cardRef}
        className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl border border-gold-200 bg-ivory p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={closeAnimated}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-stone-500 shadow-card transition-all duration-200 hover:rotate-90 hover:bg-stone-100 hover:text-stone-800"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "done" ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="popup-success-icon mx-auto h-16 w-16 text-brand-600" />
            <h3 className="mt-4 text-2xl font-extrabold text-brand-950">You're booked in!</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm text-stone-600">
              Our coordinator will contact you on WhatsApp shortly to schedule your free trial class.
            </p>
            <button
              type="button"
              onClick={closeAnimated}
              className="btn-cta mt-6 rounded-xl bg-brand-700 px-8 py-3 text-sm font-bold text-white shadow-card hover:bg-brand-800"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-gold-300 shadow-card">
                <CalendarCheck className="h-6 w-6" />
              </span>
              <h3 className="mt-3 text-2xl font-extrabold text-brand-950">Book Your Free Trial</h3>
              <p className="mt-1 text-sm text-stone-600">Fill this in — we'll contact you within hours, in shaa Allah.</p>
              {planLine}
            </div>
            <form onSubmit={submit} className="mt-5 space-y-3">
              <div className="lead-popup-field">
                <input required value={form.name} onChange={set("name")} placeholder="Your name *" className={inputCls} autoComplete="name" />
              </div>
              <div className="lead-popup-field">
                <input
                  required
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="WhatsApp number * (e.g. +971 50 123 4567)"
                  className={inputCls}
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>
              <div className="lead-popup-field">
                <input type="email" value={form.email} onChange={set("email")} placeholder="Email address" className={inputCls} autoComplete="email" />
              </div>
              <div className="lead-popup-field grid grid-cols-2 gap-3">
                <input value={form.country} onChange={set("country")} placeholder="Country" className={inputCls} autoComplete="country-name" />
                <select value={form.course} onChange={set("course")} className={inputCls} aria-label="Course">
                  <option value="">Course…</option>
                  {COURSES.map((c) => (
                    <option key={c.slug} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-cta lead-popup-field flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-3.5 text-sm font-bold text-white shadow-card hover:bg-brand-800 disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  "Claim My Free Trial"
                )}
              </button>
              <p className="lead-popup-field text-center text-[11px] leading-relaxed text-stone-400">
                No payment needed. By submitting you agree to be contacted about your trial.
              </p>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
