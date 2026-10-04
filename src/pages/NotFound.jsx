import { Link } from "react-router-dom";
import { Compass, Home, MessageCircle } from "lucide-react";
import { SITE } from "../data/site";
import GeometricPattern from "../components/GeometricPattern";

export default function NotFound() {
  return (
    <main className="relative overflow-hidden py-20 sm:py-28">
      <GeometricPattern className="text-brand-800" opacity={0.05} />
      <div className="container-x relative text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-100 text-brand-700">
          <Compass className="h-10 w-10" />
        </span>
        <p className="mt-6 font-arabic text-2xl text-brand-700" dir="rtl" lang="ar">
          إِنَّا لِلَّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
        </p>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-brand-950 sm:text-6xl">404</h1>
        <h2 className="mt-2 text-xl font-bold text-brand-900">This page wandered off the path</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-600 sm:text-base">
          The page you are looking for may have been moved or no longer exists. Let us guide you back to your Quranic
          learning journey.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-8 text-sm font-semibold text-white shadow transition hover:bg-brand-800 sm:w-auto"
          >
            <Home className="h-4 w-4" /> Back to Home
          </Link>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 text-sm font-semibold text-white shadow transition hover:brightness-95 sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
