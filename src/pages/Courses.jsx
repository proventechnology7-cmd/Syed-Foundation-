import { Link } from "react-router-dom";
import { BookOpen, BookMarked, Sparkles, Heart, CheckCircle2, Users, ChevronRight, ArrowRight } from "lucide-react";
import { COURSES } from "../data/courses";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import SectionHeading from "../components/SectionHeading";
import GeometricPattern from "../components/GeometricPattern";
import EnrollButton from "../components/EnrollButton";
import { cn } from "../lib/utils";

const COURSE_ICONS = { BookOpen, BookMarked, Sparkles, Heart };

export default function Courses() {
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-ivory to-ivory py-14 sm:py-20">
        <GeometricPattern className="text-brand-800" opacity={0.06} />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Our Programs"
            title="Quran Courses for Every Age & Level"
            subtitle="Four carefully structured programs — from a child's first Arabic letter to advanced Tajweed mastery and complete Hifz. Every course is taught live, 1-on-1, by a certified tutor."
          />

          <div className="mt-12 space-y-8">
            {COURSES.map((course, idx) => {
              const Icon = COURSE_ICONS[course.icon] || BookOpen;
              const flip = idx % 2 === 1;
              return (
                <Card key={course.slug} className="overflow-hidden">
                  <div className={cn("grid lg:grid-cols-5")}>
                    {/* Summary panel */}
                    <div
                      className={cn(
                        "relative flex flex-col justify-center gap-4 overflow-hidden bg-brand-950 p-7 text-white sm:p-9 lg:col-span-2",
                        flip && "lg:order-2"
                      )}
                    >
                      <GeometricPattern className="text-gold-400" opacity={0.06} />
                      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-gold-400">
                        <Icon className="h-7 w-7" />
                      </span>
                      <div className="relative">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="gold">{course.level}</Badge>
                          <span className="text-xs font-semibold uppercase tracking-wide text-brand-100/70">
                            {course.audience}
                          </span>
                        </div>
                        <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">{course.title}</h2>
                        <p className="mt-3 text-sm leading-relaxed text-brand-100/85">{course.description}</p>
                      </div>
                      <div className="relative mt-2">
                        <EnrollButton variant="gold" className="w-full sm:w-auto">Book Class</EnrollButton>
                      </div>
                    </div>

                    {/* Syllabus + audience */}
                    <div className={cn("p-7 sm:p-9 lg:col-span-3", flip && "lg:order-1")}>
                      <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-brand-700">
                        <Users className="h-4 w-4" /> Who is it for?
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {course.whoFor.map((w) => (
                          <li key={w} className="flex items-start gap-2 text-sm text-stone-600">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                            {w}
                          </li>
                        ))}
                      </ul>

                      <h3 className="mt-7 flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-brand-700">
                        <BookOpen className="h-4 w-4" /> Full Syllabus
                      </h3>
                      <ol className="mt-3 space-y-3">
                        {course.syllabus.map((s, i) => (
                          <li key={s.unit} className="flex gap-3 rounded-xl bg-brand-50/70 p-3.5">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-700 text-xs font-extrabold text-gold-300">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-sm">
                              <strong className="block text-brand-950">{s.unit}</strong>
                              <span className="text-stone-600">{s.detail}</span>
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl border border-brand-200 bg-white p-6 text-center shadow-card sm:p-8">
            <h3 className="text-xl font-extrabold text-brand-950">Not sure which course fits?</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-stone-600">
              Book a free 3-day assessment — a certified tutor will evaluate the student's level and recommend the
              perfect starting point.
            </p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <EnrollButton size="lg">Get Free Assessment</EnrollButton>
              <Link
                to="/pricing"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl border border-brand-300 px-8 text-base font-semibold text-brand-800 transition hover:bg-brand-50"
              >
                Compare Plans <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-4 text-xs text-stone-500">
              <ChevronRight className="inline h-3 w-3" /> All courses: live 1-on-1 · male &amp; female tutors · flexible 24/7 scheduling
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
