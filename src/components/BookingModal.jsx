import * as React from "react";
import {
  X,
  CalendarDays,
  Clock,
  ChevronLeft,
  CheckCircle2,
  MessageCircle,
  Globe,
  User,
  Phone,
  BookOpen,
} from "lucide-react";
import { cn } from "../lib/utils";
import { SITE, whatsappLink } from "../data/site";
import { COURSES } from "../data/courses";
import { REGIONS, getPrice } from "../data/pricing";
import { feedback } from "../lib/sound";
import {
  BOOKING_ZONES,
  bookingDays,
  slotsForDay,
  formatDayShort,
  formatDayFull,
  formatSlot,
  zoneLabel,
} from "../lib/booking";

const STEPS = ["Date", "Time", "Details"];

/**
 * Calendly-style trial booking modal.
 * Step 1: pick a day (next 14 days) + timezone.
 * Step 2: pick a time slot (converted to the chosen timezone).
 * Step 3: parent details -> confirm -> WhatsApp deep link + lead sheet post.
 */
export default function BookingModal({ open, context = {}, onClose }) {
  const [step, setStep] = React.useState(0);
  const [dayKey, setDayKey] = React.useState(null);
  const [slotMs, setSlotMs] = React.useState(null);
  const [zone, setZone] = React.useState(BOOKING_ZONES[0].id);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [course, setCourse] = React.useState(context.course || COURSES[0].title);
  const [error, setError] = React.useState("");
  const closeRef = React.useRef(null);

  const days = React.useMemo(() => (open ? bookingDays() : []), [open]);
  const day = days.find((d) => d.key === dayKey) || null;
  const slots = React.useMemo(() => (day ? slotsForDay(day) : []), [day]);
  const openSlots = slots.filter((s) => !s.past);

  // Reset every time the modal opens; prefill course from context.
  React.useEffect(() => {
    if (open) {
      setStep(0);
      setDayKey(null);
      setSlotMs(null);
      setName("");
      setPhone("");
      setCourse(context.course || COURSES[0].title);
      setError("");
      document.body.style.overflow = "hidden";
      setTimeout(() => closeRef.current?.focus(), 60);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const pickDay = (key) => {
    feedback("tick");
    setDayKey(key);
    setSlotMs(null);
    setStep(1);
  };

  const pickSlot = (utcMs) => {
    feedback("tick");
    setSlotMs(utcMs);
  };

  const plan = context.plan || null;
  const region = REGIONS.find((r) => r.id === (context.regionId || "gulf")) || REGIONS[0];
  const planLine = plan ? `${plan.name} — ${region.label}: ${region.currency}${getPrice(plan.id, region.id)}/mo` : "";

  const confirm = () => {
    if (name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7) {
      setError("Please enter a valid WhatsApp number.");
      return;
    }
    setError("");
    feedback("select");

    const dateStr = formatDayFull(day);
    const timeStr = `${formatSlot(slotMs, zone)} (${zoneLabel(zone)})`;

    // Fire-and-forget: post the booking to the lead sheet like other leads.
    if (SITE.leadSheetUrl) {
      try {
        fetch(SITE.leadSheetUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({
            type: "trial-booking",
            name: name.trim(),
            phone: phone.trim(),
            course,
            plan: planLine || undefined,
            date: dateStr,
            time: timeStr,
            source: context.source || "booking-modal",
          }),
        }).catch(() => {});
      } catch {
        /* ignore */
      }
    }
    setStep(3);
  };

  const waMessage =
    `Assalamu Alaikum! I would like to book a FREE trial class at Syed Foundation Academy.\n` +
    `Date: ${day ? formatDayFull(day) : ""}\n` +
    `Time: ${slotMs ? `${formatSlot(slotMs, zone)} (${zoneLabel(zone)})` : ""}\n` +
    `Course: ${course}\n` +
    (planLine ? `Plan: ${planLine}\n` : "") +
    `Name: ${name.trim()}\n` +
    `WhatsApp: ${phone.trim()}`;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-brand-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Book a free trial class"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="animate-rise-in flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-ivory shadow-2xl sm:rounded-3xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-brand-100 bg-white px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-600">Free Trial</p>
            <h3 className="font-display text-xl text-brand-950">Book your slot</h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close booking"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-800 transition hover:bg-brand-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step indicator */}
        {step < 3 && (
          <div className="flex items-center gap-2 border-b border-brand-100 bg-white px-5 py-3">
            {STEPS.map((label, i) => (
              <React.Fragment key={label}>
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold",
                      i < step
                        ? "bg-brand-700 text-white"
                        : i === step
                          ? "bg-gold-400 text-brand-950"
                          : "bg-brand-100 text-brand-500"
                    )}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-semibold",
                      i === step ? "text-brand-950" : "text-brand-400"
                    )}
                  >
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && <div className="h-px flex-1 bg-brand-100" />}
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="overflow-y-auto px-5 py-5">
          {/* STEP 1 — DATE */}
          {step === 0 && (
            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-sm font-bold text-brand-950">
                  <CalendarDays className="h-4 w-4 text-brand-700" /> Pick a day
                </p>
                <label className="flex items-center gap-1.5 text-xs text-brand-600">
                  <Globe className="h-3.5 w-3.5" />
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="rounded-lg border border-brand-200 bg-white px-2 py-1 text-xs font-semibold text-brand-900"
                    aria-label="Timezone"
                  >
                    {BOOKING_ZONES.map((z) => (
                      <option key={z.id} value={z.id}>
                        {z.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {days.map((d) => {
                  const f = formatDayShort(d);
                  const active = d.key === dayKey;
                  return (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => pickDay(d.key)}
                      className={cn(
                        "flex flex-col items-center rounded-2xl border px-1 py-3 transition",
                        active
                          ? "border-brand-700 bg-brand-700 text-white shadow-card"
                          : "border-brand-100 bg-white text-brand-900 hover:border-brand-300 hover:shadow-card"
                      )}
                    >
                      <span className={cn("text-[10px] font-bold uppercase", active ? "text-gold-300" : "text-brand-500")}>
                        {f.dow}
                      </span>
                      <span className="text-lg font-extrabold leading-tight">{f.num}</span>
                      <span className={cn("text-[10px]", active ? "text-white/70" : "text-brand-400")}>{f.mon}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-center text-xs text-brand-500">
                Academy is open 7 days a week — pick whichever suits your family.
              </p>
            </div>
          )}

          {/* STEP 2 — TIME */}
          {step === 1 && day && (
            <div>
              <button
                type="button"
                onClick={() => {
                  feedback("tick");
                  setStep(0);
                }}
                className="mb-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-900"
              >
                <ChevronLeft className="h-4 w-4" /> {formatDayFull(day)}
              </button>
              <p className="mb-3 flex items-center gap-2 text-sm font-bold text-brand-950">
                <Clock className="h-4 w-4 text-brand-700" /> Pick a time
                <span className="font-normal text-brand-500">({zoneLabel(zone)})</span>
              </p>
              {openSlots.length === 0 ? (
                <p className="rounded-2xl bg-brand-50 p-6 text-center text-sm text-brand-700">
                  All slots for this day are past — please pick another day.
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {openSlots.map((s) => {
                    const active = s.utcMs === slotMs;
                    return (
                      <button
                        key={s.utcMs}
                        type="button"
                        onClick={() => pickSlot(s.utcMs)}
                        className={cn(
                          "rounded-xl border px-2 py-2.5 text-sm font-semibold transition",
                          active
                            ? "border-brand-700 bg-brand-700 text-white shadow-card"
                            : "border-brand-100 bg-white text-brand-900 hover:border-brand-300 hover:shadow-card"
                        )}
                      >
                        {formatSlot(s.utcMs, zone)}
                      </button>
                    );
                  })}
                </div>
              )}
              <button
                type="button"
                disabled={!slotMs}
                onClick={() => {
                  feedback("tick");
                  setStep(2);
                }}
                className="btn-cta mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-brand-700 text-sm font-bold text-white shadow disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
              </button>
            </div>
          )}

          {/* STEP 3 — DETAILS */}
          {step === 2 && (
            <div>
              <button
                type="button"
                onClick={() => {
                  feedback("tick");
                  setStep(1);
                }}
                className="mb-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-900"
              >
                <ChevronLeft className="h-4 w-4" /> {formatSlot(slotMs, zone)} · {zoneLabel(zone)}
              </button>
              <div className="space-y-3">
                <label className="block">
                  <span className="mb-1 flex items-center gap-1.5 text-xs font-bold text-brand-900">
                    <User className="h-3.5 w-3.5" /> Parent's name
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ahmed Khan"
                    className="h-11 w-full rounded-xl border border-brand-200 bg-white px-3 text-sm text-brand-950 outline-none placeholder:text-brand-300 focus:border-brand-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 flex items-center gap-1.5 text-xs font-bold text-brand-900">
                    <Phone className="h-3.5 w-3.5" /> WhatsApp number
                  </span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    inputMode="tel"
                    className="h-11 w-full rounded-xl border border-brand-200 bg-white px-3 text-sm text-brand-950 outline-none placeholder:text-brand-300 focus:border-brand-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 flex items-center gap-1.5 text-xs font-bold text-brand-900">
                    <BookOpen className="h-3.5 w-3.5" /> Course
                  </span>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="h-11 w-full rounded-xl border border-brand-200 bg-white px-3 text-sm text-brand-950 outline-none focus:border-brand-500"
                  >
                    {COURSES.map((c) => (
                      <option key={c.slug} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </label>
                {planLine && (
                  <p className="rounded-xl bg-gold-400/15 px-3 py-2 text-xs font-semibold text-brand-900">
                    Selected plan: {planLine}
                  </p>
                )}
                {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
                <button
                  type="button"
                  onClick={confirm}
                  className="btn-gold btn-cta flex h-12 w-full items-center justify-center rounded-xl text-sm font-bold"
                >
                  Confirm booking
                </button>
                <p className="text-center text-[11px] leading-relaxed text-brand-500">
                  No payment needed. Our coordinator confirms your slot on WhatsApp within 12 hours.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4 — SUCCESS */}
          {step === 3 && (
            <div className="py-4 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-brand-600" />
              <h4 className="font-display mt-3 text-2xl text-brand-950">Slot reserved!</h4>
              <div className="mx-auto mt-4 max-w-sm space-y-1.5 rounded-2xl bg-white p-4 text-left text-sm">
                <p>
                  <strong className="text-brand-900">Date:</strong> {day && formatDayFull(day)}
                </p>
                <p>
                  <strong className="text-brand-900">Time:</strong> {formatSlot(slotMs, zone)} ({zoneLabel(zone)})
                </p>
                <p>
                  <strong className="text-brand-900">Course:</strong> {course}
                </p>
                <p>
                  <strong className="text-brand-900">Name:</strong> {name.trim()}
                </p>
              </div>
              <a
                href={whatsappLink(waMessage)}
                target="_blank"
                rel="noreferrer"
                className="btn-cta mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 text-sm font-bold text-white shadow"
              >
                <MessageCircle className="h-5 w-5" /> Confirm instantly on WhatsApp
              </a>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 text-xs font-semibold text-brand-600 hover:text-brand-900"
              >
                Done — we'll contact you shortly
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
