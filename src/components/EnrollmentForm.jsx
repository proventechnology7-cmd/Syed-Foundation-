import * as React from "react";
import { CheckCircle2, MessageCircle, Send, RotateCcw, ShieldCheck, Zap } from "lucide-react";
import { SITE, whatsappLink } from "../data/site";
import { COURSES } from "../data/courses";
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
  const [form, setForm] = React.useState({
    name: "", email: "", dial: "971", phone: "", country: "United Arab Emirates",
    course: COURSES[0].title, requirements: "",
  });
  const [done, setDone] = React.useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const waMessage = `Assalamu Alaikum! I am ${form.name || "[Name]"}. I would like to book a free trial class at Syed Foundation Academy.\nCourse: ${form.course}\nWhatsApp: +${form.dial} ${form.phone}\nCountry: ${form.country}\nRequirements: ${form.requirements || "—"}`;

  const submit = (e) => {
    e.preventDefault();
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
          <strong>{form.course}</strong> has been noted. Our coordinator will contact you on WhatsApp within 12
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
            onClick={() => { setDone(false); setForm({ name: "", email: "", dial: "971", phone: "", country: "United Arab Emirates", course: COURSES[0].title, requirements: "" }); }}
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
        className="group flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#25D366]/10 text-[#1da851]">
          <Zap className="h-6 w-6" />
        </span>
        <span>
          <span className="block text-xs font-semibold uppercase tracking-wide text-stone-500">Fast Coordinator WhatsApp</span>
          <span className="mt-0.5 block font-bold text-brand-950 group-hover:text-brand-700">{SITE.whatsappDisplay}</span>
        </span>
      </a>
      <a
        href={`mailto:${SITE.email}`}
        className="group flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
          <MessageCircle className="h-6 w-6" />
        </span>
        <span>
          <span className="block text-xs font-semibold uppercase tracking-wide text-stone-500">Direct Helpdesk Email</span>
          <span className="mt-0.5 block font-bold text-brand-950 group-hover:text-brand-700">{SITE.email}</span>
        </span>
      </a>
    </div>
  );
}
