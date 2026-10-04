import * as React from "react";
import { Link } from "react-router-dom";
import {
  BadgeCheck, Clock, Globe2, Star, MessageCircle, BookOpen, BookMarked, Sparkles, Heart,
  Target, HeartHandshake, ChevronRight, GraduationCap, Users, CalendarClock, UserCheck,
  Wallet, ClipboardList, ShieldCheck, Radio, Video, ArrowRight, Quote, ListChecks, PhoneCall, FileCheck2,
} from "lucide-react";
import { SITE } from "../data/site";
import { COURSES } from "../data/courses";
import { TESTIMONIALS, TESTIMONIAL_TABS } from "../data/testimonials";
import { FAQS } from "../data/faqs";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Accordion, AccordionItem } from "../components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import SectionHeading from "../components/SectionHeading";
import GeometricPattern from "../components/GeometricPattern";
import EnrollButton from "../components/EnrollButton";
import EnrollmentForm, { DirectChannels } from "../components/EnrollmentForm";
import { cn } from "../lib/utils";

const COURSE_ICONS = { BookOpen, BookMarked, Sparkles, Heart };

/* ---------------- Animated counter ---------------- */
function Counter({ target, suffix = "", duration = 1600 }) {
  const ref = React.useRef(null);
  const [value, setValue] = React.useState(0);
  const started = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (t) => {
            const p = Math.min((t - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------------- Hero trust badges ---------------- */
const TRUST_BADGES = [
  { icon: BadgeCheck, title: "Qualified Quran Teachers", sub: "Experienced & Verified Instructors" },
  { icon: Clock, title: "Flexible 24/7 Hours", sub: "To fit your timeline" },
  { icon: Globe2, title: "Trusted by Families Worldwide", sub: "Across the Gulf & Australia" },
  { icon: Star, title: "4.9/5 Rating", sub: "Loved by parents & students" },
];

/* ---------------- Course card (preview) ---------------- */
function CourseCard({ course }) {
  const [showSyllabus, setShowSyllabus] = React.useState(false);
  const Icon = COURSE_ICONS[course.icon] || BookOpen;
  return (
    <Card className="group flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-soft">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-gold-400 transition-transform group-hover:scale-110">
            <Icon className="h-6 w-6" />
          </span>
          <Badge variant="outline" className={cn("shrink-0", course.levelColor, "border-transparent")}>
            {course.level}
          </Badge>
        </div>
        <CardTitle className="pt-2">{course.title}</CardTitle>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{course.audience}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <p className="text-sm leading-relaxed text-stone-600">{course.description}</p>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowSyllabus((v) => !v)}
            aria-expanded={showSyllabus}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            <ListChecks className="h-4 w-4" />
            Syllabus
            <ChevronRight className={cn("h-4 w-4 transition-transform", showSyllabus && "rotate-90")} />
          </button>
          <div className={cn("grid transition-all duration-300", showSyllabus ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
            <div className="overflow-hidden">
              <ul className="mt-2 space-y-1.5 rounded-xl bg-brand-50/70 p-3">
                {course.syllabus.map((s) => (
                  <li key={s.unit} className="flex items-start gap-2 text-xs text-stone-600">
                    <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" />
                    <span><strong className="text-brand-900">{s.unit}:</strong> {s.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-auto flex gap-2 pt-5">
          <EnrollButton variant="outline" size="sm" className="flex-1">Book Class</EnrollButton>
          <Link
            to="/courses"
            className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl px-4 text-xs font-semibold text-brand-800 transition-colors hover:bg-brand-100"
          >
            Details <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------------- Home page ---------------- */
export default function Home() {
  const [tab, setTab] = React.useState("all");
  const filtered = TESTIMONIALS.filter((t) => tab === "all" || t.category === tab);

  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-ivory to-ivory">
        <GeometricPattern className="text-brand-800" opacity={0.06} />
        <div className="container-x relative py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-arabic text-3xl text-brand-800 sm:text-4xl" dir="rtl" lang="ar">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.12] tracking-tight text-brand-950 sm:text-5xl lg:text-6xl">
              Learn Quran Online with{" "}
              <span className="relative whitespace-nowrap text-brand-700">
                Syed Foundation Academy
                <svg viewBox="0 0 320 12" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full text-gold-400" aria-hidden="true">
                  <path d="M4 8 C 80 2, 240 2, 316 8" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
                </svg>
              </span>{" "}
              and Master Tajweed
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
              Connect live with highly learned tutors. Experience personalized, safe, 1-on-1 sessions designed with
              expert care for kids and adults — across the Gulf and Australia.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <EnrollButton size="lg" className="w-full sm:w-auto" />
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 text-base font-semibold text-white shadow transition hover:brightness-95 active:scale-[0.98] sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_BADGES.map((b) => (
              <div key={b.title} className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-white/80 p-4 shadow-card backdrop-blur">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-gold-400">
                  <b.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-brand-950">{b.title}</span>
                  <span className="block text-xs text-stone-500">{b.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LIVE AVAILABILITY STRIP ============ */}
      <section className="relative -mt-2 pb-4">
        <div className="container-x">
          <Card className="relative overflow-hidden border-brand-200 bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-white shadow-soft">
            <GeometricPattern className="text-gold-400" opacity={0.07} />
            <CardContent className="relative flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                  <Video className="h-7 w-7 text-gold-400" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-400" />
                  </span>
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-lg font-extrabold">Live Availability</span>
                    <Badge variant="success" className="bg-emerald-400/20 text-emerald-200">
                      <Radio className="h-3 w-3" /> ACTIVE
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-brand-100/80">
                    Live preview · Quick inquiry · Certified Quran teachers online now for <strong className="text-gold-300">Hifz</strong> &amp; Tajweed
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                <EnrollButton variant="gold">Live Preview</EnrollButton>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/25 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <MessageCircle className="h-4 w-4" /> Quick Inquiry
                </a>
              </div>
            </CardContent>
          </Card>
          <p className="mt-3 text-center text-sm text-stone-500">
            Complete personalized Tajweed alignment — tutors available across Gulf &amp; Australian time zones.
          </p>
        </div>
      </section>

      {/* ============ COURSES PREVIEW ============ */}
      <section id="courses" className="scroll-mt-24 py-14 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Programs"
            title="Our Elite Online Quran Academy Programs"
            subtitle="Each course syllabus is masterfully optimized for youngsters, school children, and remote beginners — ensuring beautiful Arabic recitation with expert live focus."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {COURSES.map((c) => <CourseCard key={c.slug} course={c} />)}
          </div>

          {/* Expert proposal CTA */}
          <Card className="relative mt-10 overflow-hidden border-brand-200 bg-brand-50/60">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:p-10">
              <GraduationCap className="h-10 w-10 text-brand-700" />
              <h3 className="max-w-xl text-2xl font-extrabold text-brand-950">
                Evaluating where to begin Tajweed education?
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
                Sign up for a risk-free 3-day class evaluation. Our advisor maps individual recitation errors and
                proposes a specialized custom pathway.
              </p>
              <EnrollButton variant="gold" size="lg">Get Expert Proposal</EnrollButton>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section id="about" className="relative scroll-mt-24 overflow-hidden bg-brand-950 py-14 text-white sm:py-20">
        <GeometricPattern className="text-gold-400" opacity={0.07} />
        <div className="container-x relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Badge variant="gold" className="mb-4">About the Academy</Badge>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              A Kind, Compassionate Pathway toward Noble Quran Tajweed
            </h2>
            <p className="mt-5 leading-relaxed text-brand-100/85">
              At Syed Foundation Academy, we establish a warm, encouraging environment connecting families across the
              Gulf and Australia with highly certified, authorized expert educators — from the comfort of home.
            </p>
            <p className="mt-4 leading-relaxed text-brand-100/85">
              We appreciate that every student is unique and advances at their own natural speed. Our live classes are
              conducted as supportive, friendly dialogs rather than stressful examinations. We seamlessly fuse classic
              Arabic spelling (Noorani Qaida) rules with interactive video platforms, ensuring your children read the
              verses with absolute beauty, correct pronunciation, and deep admiration.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {[
              { icon: Target, title: "Perfect Makharij Accuracy", text: "Focusing closely on native tongue and throat positions so children learn correct letter origins." },
              { icon: HeartHandshake, title: "Patient Female Specialists", text: "Gentle and loving certified female Sheikhahs, highly protective of young kids and sisters." },
              { icon: Users, title: "1-on-1 Live Personalized Space", text: "A dedicated interactive atmosphere where every lesson revolves around one student." },
              { icon: ShieldCheck, title: "Verified & Certified Tutors", text: "Every teaching credential is audited, verified and certified annually for authenticity." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:bg-white/10">
                <f.icon className="h-7 w-7 text-gold-400" />
                <h3 className="mt-3 font-bold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-100/75">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3-STEP PROCESS ============ */}
      <section className="py-14 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="The Simplest Process"
            title="Begin Your Path in 3 Elegant Steps"
          />
          <div className="relative mt-12 grid gap-6 md:grid-cols-3">
            <div className="absolute left-0 right-0 top-10 hidden h-0.5 bg-gradient-to-r from-transparent via-brand-200 to-transparent md:block" aria-hidden="true" />
            {[
              { n: "01", icon: ClipboardList, title: "Book a Free Trial", text: "Fill out our simple inquiry form. Our scheduling coordinator will reach out directly on WhatsApp to coordinate a convenient time." },
              { n: "02", icon: UserCheck, title: "Meet Your Tutor", text: "Connect live with a certified expert tutor. We assess the learner's level and suggest a customized curriculum path." },
              { n: "03", icon: CalendarClock, title: "Begin Quran Classes", text: "Lock in your weekly class slots and join highly interactive 1-on-1 virtual sessions. Watch your family's Tajweed skills rise." },
            ].map((s) => (
              <Card key={s.n} className="relative p-6 text-center sm:p-8">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-700 text-gold-400 shadow-card">
                  <s.icon className="h-8 w-8" />
                </span>
                <span className="mt-4 block text-xs font-extrabold tracking-[0.3em] text-gold-600">{s.n}</span>
                <h3 className="mt-1 text-xl font-extrabold text-brand-950">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{s.text}</p>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <EnrollButton size="lg">Schedule 3-Day Free Trial Now</EnrollButton>
          </div>
        </div>
      </section>

      {/* ============ WHY US ============ */}
      <section id="why-us" className="relative scroll-mt-24 overflow-hidden bg-brand-50/60 py-14 sm:py-20">
        <GeometricPattern className="text-brand-800" opacity={0.05} />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Academy Advancements"
            title="Why Hundreds of Worldwide Families Empower Their Kids via Syed Foundation Academy"
            subtitle="Our academy prioritizes professional teacher evaluations, scheduling convenience, verified certifications, and interactive spaces designed for success."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: GraduationCap, title: "Certified Expert Tutors", text: "Learn from highly qualified, certified educators who graduated from prestigious Islamic institutions and hold verified academic credentials." },
              { icon: Video, title: "Live 1-on-1 Sessions", text: "Get focused attention with personal classes customized around your learning speed, unique strengths, and continuous educational goals." },
              { icon: Clock, title: "Flexible Scheduling 24/7", text: "Pick your preferred days and timings. Change or reschedule classes to coordinate elegantly with busy school, work, or family schedules." },
              { icon: Users, title: "Male & Female Teachers", text: "We prioritize comfort and ease by offering children and adults the choice between dedicated male and experienced female Quran tutors." },
              { icon: Wallet, title: "Affordable & High Quality", text: "No hidden registration fees or long commitments. Transparent, competitive packages structured to keep online Quran studies accessible to everyone." },
              { icon: ClipboardList, title: "Personalized Study Plans", text: "We craft structured, customized learning pathways designed for individual student goals, ensuring comfort, optimal progress, and deep retention." },
            ].map((f) => (
              <Card key={f.title} className="p-6 transition hover:-translate-y-1 hover:shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-bold text-brand-950">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{f.text}</p>
              </Card>
            ))}
          </div>
          <p className="mx-auto mt-8 flex max-w-3xl items-start justify-center gap-2 text-center text-sm text-stone-600">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
            Rest assured: every teaching credential is audited, verified, and certified annually to guarantee perfect authenticity.
          </p>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="relative overflow-hidden bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 py-12 sm:py-16">
        <GeometricPattern className="text-gold-400" opacity={0.07} />
        <div className="container-x relative">
          <p className="text-center text-sm font-bold uppercase tracking-[0.25em] text-gold-400">
            Credibility &amp; Experience
          </p>
          <h2 className="mx-auto mt-2 max-w-2xl text-center text-2xl font-extrabold text-white sm:text-3xl">
            An International Academy Built on Trust &amp; Devotion
          </h2>
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-6 text-center lg:grid-cols-4">
            {[
              { target: 12, suffix: "+", label: "Years Experience", sub: "Delivering exceptional Islamic and Qur'anic teaching to international students." },
              { target: 120, suffix: "K+", label: "Classes Completed", sub: "Successful live one-on-one sessions taught by top-ranking certified tutors." },
              { target: 98, suffix: "%", label: "Student Satisfaction", sub: "Loved and recommended by international parents, children, and adult scholars." },
              { target: 100, suffix: "%", label: "Certified Educators", sub: "Instructors holding legitimate degrees, Hifz certificates, and verified credentials." },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6">
                <p className="text-3xl font-extrabold text-gold-400 sm:text-4xl">
                  <Counter target={s.target} suffix={s.suffix} />
                </p>
                <p className="mt-1.5 text-sm font-bold text-white">{s.label}</p>
                <p className="mt-1.5 hidden text-xs leading-relaxed text-brand-100/70 sm:block">{s.sub}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-brand-100/80">
            <strong className="text-gold-300">100% certified recitation credentials</strong> — all our senior tutors
            hold certified credentials and authorizations from respected institutions. Your family receives authentic,
            beautifully articulated preservation classes.
          </p>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-14 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Success Stories"
            title="Hear From Our Quran Learners"
            subtitle="Discover how school children and adults are improving Arabic letter articulation and Tajweed rules at home."
          />
          <Tabs value={tab} onValueChange={setTab} className="mt-8">
            <div className="flex justify-center">
              <TabsList>
                {TESTIMONIAL_TABS.map((t) => (
                  <TabsTrigger key={t.id} value={t.id}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </div>
            <TabsContent value={tab} className="mt-8">
              <div className="grid gap-6 md:grid-cols-2">
                {filtered.map((t) => (
                  <Card key={t.name} className="flex flex-col p-6 sm:p-7">
                    <Quote className="h-8 w-8 text-gold-400" />
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600 sm:text-[15px]">"{t.quote}"</p>
                    <div className="mt-5 flex items-center gap-3 border-t border-brand-100 pt-5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-gold-300">
                        {t.initials}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-brand-950">{t.name}</p>
                        <p className="text-xs text-stone-500">{t.role} · {t.location}</p>
                      </div>
                      <span className="ml-auto flex items-center gap-1 text-xs font-bold text-gold-600">
                        <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" /> 5.0
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ============ ENROLLMENT ============ */}
      <section id="enroll" className="relative scroll-mt-24 overflow-hidden bg-brand-50/60 py-14 sm:py-20">
        <GeometricPattern className="text-brand-800" opacity={0.05} />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Secure Enrollment Hub"
            title="Schedule Your Free Trial Lesson"
            subtitle="Join risk-free. No credit card required. Our coordinator sets up direct class coordination on WhatsApp within 12 hours."
          />

          <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-3">
            {[
              { icon: PhoneCall, title: "WhatsApp Coordination", text: "Our coordinator contacts you on WhatsApp immediately to set up appropriate lesson timings and dates." },
              { icon: FileCheck2, title: "Certified 3-Day Assessment", text: "Connect directly with a friendly, highly qualified, certified tutor to map spelling and recitation levels." },
              { icon: ClipboardList, title: "Custom Student Syllabus", text: "If 100% satisfied, lock in regular classes on your own flexible schedule at highly accessible sibling pricing." },
            ].map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-gold-400">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-extrabold tracking-widest text-gold-600">STEP {i + 1}</span>
                </div>
                <h3 className="mt-3 text-sm font-bold text-brand-950">{s.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-stone-600">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <EnrollmentForm />
            </div>
            <div className="flex flex-col gap-4 lg:col-span-2">
              <Card className="bg-brand-950 text-white">
                <CardContent className="p-6">
                  <h3 className="font-bold">What happens next?</h3>
                  <ul className="mt-3 space-y-2.5 text-sm text-brand-100/85">
                    <li className="flex gap-2"><ChevronRight className="h-4 w-4 shrink-0 text-gold-400" /> Coordinator messages you on WhatsApp</li>
                    <li className="flex gap-2"><ChevronRight className="h-4 w-4 shrink-0 text-gold-400" /> Free 3-day assessment with a certified tutor</li>
                    <li className="flex gap-2"><ChevronRight className="h-4 w-4 shrink-0 text-gold-400" /> Personalized syllabus &amp; flexible schedule</li>
                  </ul>
                  <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-4 text-xs text-brand-100/70">
                    <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-gold-400" /> 256-bit encryption</span>
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-gold-400" /> Response: under ~1 hour</span>
                  </div>
                </CardContent>
              </Card>
              <DirectChannels />
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faqs" className="scroll-mt-24 py-14 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              eyebrow="Got Questions?"
              title="Frequently Asked Questions"
              subtitle="Find immediate answers regarding lesson formats, teacher gender options, scheduling flexibility, and billing."
            />
            <Accordion className="mt-8">
              {FAQS.map((f, i) => (
                <AccordionItem key={f.question} question={f.question} defaultOpen={i === 0}>
                  {f.answer}
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 text-center">
              <p className="text-sm text-stone-600">Still have questions? Talk to our coordinator directly.</p>
              <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 text-sm font-semibold text-white shadow hover:brightness-95"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
                <Link
                  to="/pricing"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-brand-300 px-6 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
                >
                  View Pricing Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
