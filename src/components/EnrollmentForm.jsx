import * as React from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle2, MessageCircle, Send, RotateCcw, ShieldCheck, Zap } from "lucide-react";
import { SITE, whatsappLink } from "../data/site";
import { COURSES } from "../data/courses";
import { PLANS, REGIONS, getPrice, planLabel } from "../data/pricing";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select } from "./ui/select";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const DIAL_CODES = [
  ["United Arab Emirates", "971"], ["Saudi Arabia", "966"], ["Qatar", "974"],
  ["Kuwait", "965"], ["Oman", "968"], ["Bahrain", "973"], ["Australia", "61"],
  ["United States", "1"], ["United Kingdom", "44"], ["Canada", "1"], ["Pakistan", "92"],
  ["India", "91"], ["Bangladesh", "880"], ["Egypt", "20"], ["Malaysia", "60"],
  ["Indonesia", "62"], ["Turkey", "90"], ["South Africa", "27"], ["New Zealand", "64"],
  ["Ireland", "353"], ["Germany", "49"], ["France", "33"], ["Netherlands", "31"],
  ["Sweden", "46"], ["Norway", "47"], ["Denmark", "45"], ["Spain", "34"],
  ["Italy", "39"], ["Singapore", "65"], ["Philippines", "63"], ["Nigeria", "234"],
  ["Kenya", "254"], ["Morocco", "212"], ["Jordan", "962"], ["Lebanon", "961"],
];

const COUNTRIES = [
  "United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain",
  "Australia", "United States", "United Kingdom", "Canada", "Pakistan", "India",
  "Bangladesh", "Egypt", "Malaysia", "Indonesia", "Turkey", "South Africa",
  "New Zealand", "Ireland", "Germany", "France", "Netherlands", "Sweden", "Norway",
  "Denmark", "Spain", "Italy", "Singapore", "Philippines", "Nigeria", "Kenya",
  "Morocco", "Jordan", "Lebanon", "Afghanistan", "Sri Lanka", "Nepal", "Maldives",
];

const labelCls = "mb-1.5 block text-sm font-semibold text-brand-950";

export default function EnrollmentForm() {
  const location = useLocation();
  // Plan/course pre-selected when arriving from Pricing or Courses CTA buttons.
  const incomingPlan = location.state?.plan;
  const incomingRegionId = location.state?.regionId || "gulf";
  const incomingCourse = location.state?.course;

  const [form, setForm] = React.useState({
    name: "", email: "", dial: "971", phone: "", country: "United Arab Emirates",
    course: incomingCourse || COURSES[0].title, requirements: "",
    planId: incomingPlan?.id || PLANS[1].id, regionId: incomingRegionId,
  });
  const [done, setDone] = React.useState(false);

  // If the user picks another plan/course and returns, sync it.
  React.useEffect(() => {
    if (incomingPlan || incomingCourse) {
      setForm((f) => ({
        ...f,
        planId: incomingPlan?.id || f.planId,
        regionId: incomingRegionId,
        course: incomingCourse || f.course,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomingPlan?.id, incomingCourse, incomingRegionId]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const selectedPlan = PLANS.find((p) => p.id === Number(form.planId)) || PLANS[1];
  const selectedRegion = REGIONS.find((r) => r.id === form.regionId) || REGIONS[0];
  const selectedPrice = getPrice(selectedPlan.id, selectedRegion.id);

  const waMessage = `Assalamu Alaikum! I am ${form.name || "[Name]"}. I would like to book a free trial class at Syed Foundation Academy.\nCourse: ${form.course}\nPlan: ${planLabel(selectedPlan)} (${selectedRegion.currency}${selectedPrice}/month)\nWhatsApp: +${form.dial} ${form.phone}\nCountry: ${form.country}\nRequirements: ${form.requirements || "—"}`;

  const submit = (e) => {
    e.preventDefault();
    // Send the lead to the Google Sheet via the Apps Script web app.
    // Fire-and-forget: the success screen shows regardless, so a slow or
    // blocked request never stops the user's flow.
    if (SITE.leadSheetUrl) {
      const payload = {
        name: form.name,
        phone: `+${form.dial} ${form.phone}`,
        email: form.email,
        country: form.country,
        course: form.course,
        requirements: form.requirements,
        plan: `${planLabel(selectedPlan)} (${selectedRegion.currency}${selectedPrice}/month)`,
      };
      try {
        fetch(SITE.leadSheetUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(payload),
        }).catch(() => {});
      } catch (_) {}
    }
    setDone(true);
    document.getElementById("enroll-success")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (done) {
    return (
      <Card id="enroll-success" className="border-brand-200 bg-brand-50/60 p-8 text-center animate-rise-in sm:p-10">
        <CheckCircle2 className="mx-auto h-14 w-14 text-brand-600" />
        <h3 className="mt-4 text-2xl font-extrabold text-brand-950">Request Received!</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-600">
          JazakAllah Khair, <strong>{form.name}</strong>. Your free-trial request for{" "}
          <strong>{form.course}</strong> ({planLabel(selectedPlan)} — {selectedRegion.currency}{selectedPrice}/month)
          has been noted. Our coordinator will contact you on WhatsApp within 12
          hours. For an instant response, tap below — your details are prefilled.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappLink(waMessage)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#25D366] px-6 text-sm font-semibold text-white shadow hover:brightness-95"
          >
            <MessageCircle className="h-4 w-4" />
            Continue on WhatsApp
          </a>
          <Button
            variant="outline"
            onClick={() => { setDone(false); setForm({ name: "", email: "", dial: "971", phone: "", country: "United Arab Emirates", course: COURSES[0].title, requirements: "", planId: PLANS[1].id, regionId: "gulf" }); }}
          >
            <RotateCcw className="h-4 w-4" />
            New Request
          </Button>
        </div>
        <p className="mt-5 inline-flex items-center gap-1.5 text-xs text-stone-500">
          <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
          Zero auto-spam policy. Your details stay encrypted and private.
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="ef-name" className={labelCls}>Full Name / Parent Name</label>
            <Input id="ef-name" required placeholder="e.g. Ahmed Syed" value={form.name} onChange={set("name")} />
          </div>
          <div>
            <label htmlFor="ef-email" className={labelCls}>Email Address</label>
            <Input id="ef-email" required type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} />
          </div>
          <div>
            <label htmlFor="ef-phone" className={labelCls}>WhatsApp Contact Number</label>
            <div className="flex gap-2">
              <Select value={form.dial} onChange={set("dial")} className="w-32 shrink-0" aria-label="Country code">
                {DIAL_CODES.map(([n, c]) => (
                  <option key={`${n}-${c}`} value={c}>+{c} · {n}</option>
                ))}
              </Select>
              <Input id="ef-phone" required type="tel" placeholder="5X XXX XXXX" value={form.phone} onChange={set("phone")} />
            </div>
          </div>
          <div>
            <label htmlFor="ef-country" className={labelCls}>Country of Residence</label>
            <Select id="ef-country" value={form.country} onChange={set("country")}>
              {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
            </Select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="ef-course" className={labelCls}>Select Quran Course</label>
            <Select id="ef-course" value={form.course} onChange={set("course")}>
              {COURSES.map((c) => <option key={c.slug}>{c.title}</option>)}
            </Select>
          </div>
          <div>
            <label htmlFor="ef-plan" className={labelCls}>Select Plan</label>
            <Select id="ef-plan" value={form.planId} onChange={set("planId")}>
              {PLANS.map((p) => (
                <option key={p.id} value={p.id}>
                  {planLabel(p)}{p.popular ? " ★ Popular" : ""}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label htmlFor="ef-region" className={labelCls}>Billing Region</label>
            <Select id="ef-region" value={form.regionId} onChange={set("regionId")}>
              {REGIONS.map((r) => <option key={r.id} value={r.id}>{r.label} ({r.currency.trim()})</option>)}
            </Select>
          </div>
          <div className="sm:col-span-2 -mt-2">
            <p className="rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-900">
              Selected plan: <strong>{planLabel(selectedPlan)}</strong> —{" "}
              <strong>{selectedRegion.currency}{selectedPrice}/month</strong>
              {selectedPlan.popular && <span className="ml-2 rounded-full bg-gold-400/30 px-2 py-0.5 text-xs font-bold text-gold-700">Most Popular</span>}
            </p>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="ef-req" className={labelCls}>Your Requirements / Student's Age and Level</label>
            <Textarea
              id="ef-req"
              placeholder="e.g. My 7-year-old daughter is a complete beginner; we prefer a female tutor in the evenings (GST)."
              value={form.requirements}
              onChange={set("requirements")}
            />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="lg" className="w-full">
              <Send className="h-4 w-4" />
              Securely Book 3-Day Free Trial
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-stone-500">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
              Zero auto-spam policy. Your personal details are encrypted securely.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function DirectChannels() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="card-lift group flex flex-col gap-3 rounded-2xl border border-brand-100 bg-white p-5 shadow-card"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366]/10 text-[#1da851]">
          <Zap className="h-6 w-6" />
        </span>
        <span className="min-w-0">
          <span className="block text-xs font-semibold uppercase tracking-wide text-stone-500">Fast Coordinator WhatsApp</span>
          <span className="mt-1 block whitespace-nowrap text-lg font-bold text-brand-950 group-hover:text-brand-700">{SITE.whatsappDisplay}</span>
        </span>
      </a>
      <a
        href={`mailto:${SITE.email}`}
        className="card-lift group flex flex-col gap-3 rounded-2xl border border-brand-100 bg-white p-5 shadow-card"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
          <MessageCircle className="h-6 w-6" />
        </span>
        <span className="min-w-0">
          <span className="block text-xs font-semibold uppercase tracking-wide text-stone-500">Direct Helpdesk Email</span>
          <span className="mt-1 block whitespace-nowrap text-xs font-bold tracking-tight text-brand-950 group-hover:text-brand-700 sm:text-[13px]">{SITE.email}</span>
        </span>
      </a>
    </div>
  );
}
