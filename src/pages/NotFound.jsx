import { Link } from "react-router-dom";
import { Compass, Home, MessageCircle } from "lucide-react";
import { SITE } from "../data/site";

export default function NotFound() {
  return (
    <main className="relative overflow-hidden py-20 sm:py-28">
      <div className="container-x relative text-center">
        <span className="hero-anim mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-100 text-brand-700" style={{ "--hero-delay": "0s" }}>
          <Compass className="h-10 w-10" />
        </span>
        <p className="hero-anim mt-6 font-arabic text-2xl text-brand-700" dir="rtl" lang="ar" style={{ "--hero-delay": "0.1s" }}>
          إِنَّا لِلَّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
        </p>
        <h1 className="hero-anim heading-hover mt-4 text-5xl font-extrabold tracking-tight text-brand-950 sm:text-6xl" style={{ "--hero-delay": "0.2s" }}>404</h1>
        <h2 className="hero-anim mt-2 text-xl font-bold text-brand-900" style={{ "--hero-delay": "0.3s" }}>This page wandered off the path</h2>
        <p className="hero-anim mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-600 sm:text-base" style={{ "--hero-delay": "0.4s" }}>
          The page you are looking for may have been moved or no longer exists. Let us guide you back to your Quranic
          learning journey.
        </p>
        <div className="hero-anim mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ "--hero-delay": "0.5s" }}>
          <Link
            to="/"
            className="btn-cta inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-8 text-sm font-semibold text-white shadow hover:bg-brand-800 sm:w-auto"
          >
            <Home className="h-4 w-4" /> Back to Home
          </Link>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="btn-cta inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 text-sm font-semibold text-white shadow hover:brightness-95 sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
