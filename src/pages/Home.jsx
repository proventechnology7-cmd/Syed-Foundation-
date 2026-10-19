import * as React from "react";
import { Link } from "react-router-dom";
import {
  BadgeCheck, Clock, Globe2, Star, MessageCircle, BookOpen, BookMarked, Sparkles, Heart,
  Target, HeartHandshake, ChevronRight, GraduationCap, Users, CalendarClock, UserCheck,
  Wallet, ClipboardList, ShieldCheck, Radio, Video, ArrowRight, Quote, ListChecks, PhoneCall, FileCheck2,
  Baby, Briefcase, Award, Languages, Mic,
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
import EnrollButton from "../components/EnrollButton";
import CourseArt from "../components/CourseArt";
import EnrollmentForm, { DirectChannels } from "../components/EnrollmentForm";
import Reveal from "../components/Reveal";
import { useLeadPopup } from "../components/LeadPopupContext";
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

/* ---------------- Course card (preview) ---------------- */
function CourseCard({ course }) {
  const [showSyllabus, setShowSyllabus] = React.useState(false);
  const Icon = COURSE_ICONS[course.icon] || BookOpen;
  return (
    <Card className="card-premium group flex flex-col overflow-hidden">
      <CourseArt slug={course.slug} className="h-28" />
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
          <EnrollButton variant="outline" size="sm" className="flex-1" course={course.title}>Book Class</EnrollButton>
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
  const { openPopup } = useLeadPopup();

  // Auto-popup: 3s after homepage load, at most once per 3 days
  React.useEffect(() => {
    const KEY = "sf-popup-last-shown";
    const last = parseInt(localStorage.getItem(KEY) || "0", 10);
    if (Date.now() - last > 3 * 24 * 60 * 60 * 1000) {
      const t = setTimeout(() => {
        openPopup({ source: "auto-popup" });
        try {
          localStorage.setItem(KEY, Date.now().toString());
        } catch {}
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [openPopup]);

  // Note: hero entrance uses pure CSS (.hero-anim in index.css) — reliable on first paint.

  return (
    <main>
      {/* ============ HERO with video background ============ */}
      <section className="relative overflow-hidden bg-brand-950">
        {/* Background video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="https://assets.mixkit.co/videos/34208/34208-720.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        {/* Dark gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/85 via-brand-950/60 to-brand-950/90" />
        <div className="container-x relative flex min-h-screen flex-col justify-center py-24 sm:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="hero-anim font-arabic text-3xl leading-[1.9] text-gold-300 sm:text-4xl" style={{ "--hero-delay": "0s" }} dir="rtl" lang="ar">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="hero-anim mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400" style={{ "--hero-delay": "0.1s" }}>
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
            <h1 className="hero-anim font-display mt-6 text-4xl font-normal leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl" style={{ "--hero-delay": "0.22s" }}>
              Learn Quran Online with{" "}
              <span className="text-gold-gradient sm:whitespace-nowrap">
                Syed Foundation Academy
              </span>{" "}
              and Master Tajweed
            </h1>
            <p className="hero-anim mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg" style={{ "--hero-delay": "0.34s" }}>
              Connect live with highly learned tutors. Experience personalized, safe, 1-on-1 sessions designed with
              expert care for kids and adults — across the US, Gulf and Australia.
            </p>
            <div className="hero-anim mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ "--hero-delay": "0.46s" }}>
              <EnrollButton size="lg" className="w-full sm:w-auto" />
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn-cta inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 text-base font-semibold text-white shadow transition hover:brightness-95 sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ============ LIVE AVAILABILITY STRIP ============ */}
      <section className="relative mt-8 pb-4">
        <div className="container-x">
          <Card className="relative overflow-hidden border-brand-200 bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-white shadow-soft">
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
                <EnrollButton variant="gold">Book Free Trial</EnrollButton>
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
            Live 1-on-1 Quran classes — certified tutors available across US, Gulf & Australia time zones.
          </p>
        </div>
      </section>

      {/* ============ COURSES PREVIEW ============ */}
      <section id="courses" className="scroll-mt-24 py-10 sm:py-14">
        <div className="container-x">
          <Reveal>
            <SectionHeading
            eyebrow="Our Programs"
            title="Our Elite Online Quran Academy Programs"
            subtitle="Each course syllabus is masterfully optimized for youngsters, school children, and remote beginners — ensuring beautiful Arabic recitation with expert live focus."
            />
          </Reveal>
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
              { icon: HeartHandshake, title: "Patient & Caring Tutors", text: "Gentle, encouraging certified teachers who make every student feel comfortable and confident." },
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
      <section className="py-10 sm:py-14">
        <div className="container-x">
          <Reveal>
            <SectionHeading
            eyebrow="The Simplest Process"
            title="Begin Your Path in 3 Elegant Steps"
            />
          </Reveal>
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
      <section id="why-us" className="relative scroll-mt-24 overflow-hidden bg-brand-50/60 py-10 sm:py-14">
        <div className="container-x relative">
          <Reveal>
            <SectionHeading
            eyebrow="Academy Advancements"
            title="Why Hundreds of Worldwide Families Empower Their Kids via Syed Foundation Academy"
            subtitle="Our academy prioritizes professional teacher evaluations, scheduling convenience, verified certifications, and interactive spaces designed for success."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: GraduationCap, title: "Certified Expert Tutors", text: "Learn from highly qualified, certified educators who graduated from prestigious Islamic institutions and hold verified academic credentials." },
              { icon: Video, title: "Live 1-on-1 Sessions", text: "Get focused attention with personal classes customized around your learning speed, unique strengths, and continuous educational goals." },
              { icon: Clock, title: "Flexible Scheduling 24/7", text: "Pick your preferred days and timings. Change or reschedule classes to coordinate elegantly with busy school, work, or family schedules." },
              { icon: Users, title: "Certified Quran Teachers", text: "Learn from experienced, verified Quran tutors dedicated to your progress and comfort." },
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

      {/* ============ MEET OUR TEACHERS ============ */}
      <section className="py-10 sm:py-14">
        <div className="container-x">
          <Reveal>
            <SectionHeading
            eyebrow="Learn From The Best"
            title="Learn from Certified Specialists"
            subtitle="Every tutor is hand-picked, background-verified, and certified — here are the kinds of specialists who will teach you and your family."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Mic, role: "Qari", focus: "Tajweed & Qira'at Specialist", points: ["Ijazah-certified in Hafs recitation", "10+ years teaching experience", "Makharij & Sifaat mastery"] },
              { icon: BookMarked, role: "Hafiz", focus: "Hifz Program Lead", points: ["Completed Quran memorization", "Structured Sabaq revision system", "Tracks every student's progress"] },
              { icon: Languages, role: "Mentor", focus: "Islamic Foundations Guide", points: ["Salah, Duas & Seerah for kids", "Fluent English, Urdu & Arabic", "New-Muslim friendly teaching"] },
            ].map((t, i) => (
              <Reveal key={t.role} delay={Math.min(i * 0.08, 0.32)}>
              <Card className="flex h-full flex-col p-6 text-center card-lift">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-700 text-gold-400">
                  <t.icon className="h-8 w-8" />
                </span>
                <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.2em] text-gold-600">{t.role}</p>
                <h3 className="mt-1 font-bold text-brand-950">{t.focus}</h3>
                <ul className="mt-4 space-y-2 text-left">
                  {t.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-xs leading-relaxed text-stone-600">
                      <Award className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Card>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2 text-center text-sm text-stone-600">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
            Every teacher is background-verified and certified — your family's safety and comfort come first.
          </p>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="relative overflow-hidden bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 py-8 sm:py-12">
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
      <section className="py-10 sm:py-14">
        <div className="container-x">
          <Reveal>
            <SectionHeading
            eyebrow="Success Stories"
            title="Hear From Our Quran Learners"
            subtitle="Discover how school children and adults are improving Arabic letter articulation and Tajweed rules at home."
            />
          </Reveal>
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
                {filtered.map((t, i) => (
                  <Reveal key={t.name} delay={Math.min(i * 0.08, 0.24)}>
                  <Card className="flex h-full flex-col p-6 sm:p-7 card-lift">
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
                  </Reveal>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ============ ENROLLMENT ============ */}
      <section id="enroll" className="relative scroll-mt-24 overflow-hidden bg-brand-50/60 py-10 sm:py-14">
        <div className="container-x relative">
          <Reveal>
            <SectionHeading
            eyebrow="Secure Enrollment Hub"
            title="Schedule Your Free Trial Lesson"
            subtitle="Join risk-free. No credit card required. Our coordinator sets up direct class coordination on WhatsApp within 12 hours."
            />
          </Reveal>

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
      <section id="faqs" className="scroll-mt-24 py-10 sm:py-14">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <Reveal>
            <SectionHeading
              eyebrow="Got Questions?"
              title="Frequently Asked Questions"
              subtitle="Find immediate answers regarding lesson formats, teacher gender options, scheduling flexibility, and billing."
              />
          </Reveal>
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
