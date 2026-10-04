import { Link } from "react-router-dom";
import { MessageCircle, Mail, Clock, ChevronRight } from "lucide-react";
import { SITE } from "../data/site";
import GeometricPattern from "./GeometricPattern";
import SectionLink from "./SectionLink";
import logo from "../assets/logo.jpg";

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", section: "about" },
  { label: "Programs", section: "courses" },
  { label: "Pricing Plans", to: "/pricing" },
  { label: "Quranic Blogs", to: "/blog" },
  { label: "Why Learn Here", section: "why-us" },
  { label: "Questions", section: "faqs" },
];

const PROGRAMS = [
  "Noorani Qaida Basics",
  "Quran Recitation & Reading",
  "Master Tajweed Rules",
  "Quran Memorization (Hifz)",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-950 text-brand-100">
      <GeometricPattern className="text-gold-400" opacity={0.06} />
      <div className="container-x relative py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt={SITE.name} className="h-12 w-12 rounded-xl object-cover" />
              <div className="leading-tight">
                <p className="font-extrabold text-ivory">Syed Foundation</p>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-400">Academy</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-brand-100/80">
              An international online Quran academy providing personalized 1-on-1 certified live instruction for
              children and adults. Helping families across the Gulf and Australia master Tajweed and Quran memorization
              at home.
            </p>
            <p className="mt-4 text-xs text-brand-100/60">
              Serving: {SITE.regions.join(" · ")}
            </p>
          </div>

          <nav aria-label="Quick links">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400">Quick Links</h4>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label} className="flex">
                  {l.to ? (
                    <Link to={l.to} className="group inline-flex items-center gap-1.5 text-sm text-brand-100/80 hover:text-white">
                      <ChevronRight className="h-3.5 w-3.5 text-gold-400 transition-transform group-hover:translate-x-0.5" />
                      {l.label}
                    </Link>
                  ) : (
                    <SectionLink id={l.section} className="group inline-flex items-center gap-1.5 text-sm text-brand-100/80 hover:text-white">
                      <ChevronRight className="h-3.5 w-3.5 text-gold-400 transition-transform group-hover:translate-x-0.5" />
                      {l.label}
                    </SectionLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400">Our Programs</h4>
            <ul className="mt-4 space-y-2.5">
              {PROGRAMS.map((p) => (
                <li key={p}>
                  <Link to="/courses" className="group inline-flex items-center gap-1.5 text-sm text-brand-100/80 hover:text-white">
                    <ChevronRight className="h-3.5 w-3.5 text-gold-400 transition-transform group-hover:translate-x-0.5" />
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400">Active Support</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <span className="block text-xs text-brand-100/60">WhatsApp Number</span>
                <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-2 font-semibold text-white hover:text-gold-300">
                  <MessageCircle className="h-4 w-4 text-gold-400" />
                  {SITE.whatsappDisplay}
                </a>
              </li>
              <li>
                <span className="block text-xs text-brand-100/60">Email Helpdesk</span>
                <a href={`mailto:${SITE.email}`} className="mt-1 inline-flex items-center gap-2 font-semibold text-white hover:text-gold-300">
                  <Mail className="h-4 w-4 text-gold-400" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <span className="block text-xs text-brand-100/60">School Timing</span>
                <span className="mt-1 inline-flex items-center gap-2 font-semibold text-white">
                  <Clock className="h-4 w-4 text-gold-400" />
                  {SITE.hours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-brand-100/70">© 2026 {SITE.name}. All Rights Reserved. {SITE.tagline}.</p>
          <p className="mt-1 text-xs text-brand-100/50">Designed with complete respect for Quranic learning</p>
        </div>
      </div>
    </footer>
  );
}
