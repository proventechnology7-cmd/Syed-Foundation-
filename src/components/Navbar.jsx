import * as React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import { SITE, NAV_LINKS } from "../data/site";
import EnrollButton from "./EnrollButton";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const lastY = React.useRef(0);
  const location = useLocation();
  const isHome = location.pathname === "/";

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      // Hide on scroll down, reveal on scroll up (keeps nav out of the way
      // while reading, but one small upward scroll brings it back).
      if (y > 160 && y > lastY.current + 4) setHidden(true);
      else if (y < lastY.current - 4 || y <= 160) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  // Transparent only on home hero; light solid elsewhere for readability
  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        hidden && !open && "-translate-y-full",
        transparent
          ? "bg-transparent border-b border-transparent"
          : "bg-ivory/95 shadow-card backdrop-blur-xl border-b border-brand-100"
      )}
    >
      <div className="container-x flex h-16 sm:h-20 items-center justify-between gap-4">
        <a
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label={`${SITE.name} home`}
          onClick={(e) => {
            // Full refresh + scroll to top on logo click
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.location.reload();
            }
          }}
        >
          <span className="relative">
            <img src={logo} alt={SITE.name} className="h-10 w-10 rounded-xl object-cover shadow-card ring-2 ring-gold-400/60 transition-all duration-300 group-hover:scale-105 group-hover:ring-gold-400 sm:h-12 sm:w-12" width="48" height="48" />
            <span className="absolute -inset-1 -z-10 rounded-2xl bg-gold-400/20 blur-md transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
          </span>
          <span className="leading-tight">
            <span className={cn("block font-display text-base font-normal sm:text-lg", transparent ? "text-white" : "text-brand-950")}>Syed Foundation</span>
            <span className={cn("block text-[10px] font-bold uppercase tracking-[0.22em] sm:text-[11px]", transparent ? "text-gold-400" : "text-gold-600")}>
              Academy
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? transparent
                      ? "scale-[1.04] bg-gold-400 text-brand-950 shadow-lg"
                      : "scale-[1.04] bg-brand-700 text-white shadow-card"
                    : transparent
                      ? "text-white/85 hover:scale-[1.02] hover:bg-white/10 hover:text-white"
                      : "text-brand-950 hover:scale-[1.02] hover:bg-brand-50 hover:text-brand-900"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <EnrollButton />
        </div>

        <button
          type="button"
          className={cn("flex h-10 w-10 items-center justify-center rounded-xl lg:hidden", transparent ? "text-white hover:bg-white/10" : "text-brand-950 hover:bg-brand-100")}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "grid overflow-hidden transition-all duration-300 lg:hidden",
          transparent ? "border-b border-gold-400/20 bg-brand-950/95 backdrop-blur-xl" : "border-b border-brand-100 bg-ivory/95 backdrop-blur-xl",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 border-b-0"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <nav className="container-x flex flex-col gap-1 py-4" aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-xl px-4 py-3 text-base font-semibold transition-all duration-200",
                    isActive
                      ? transparent
                        ? "scale-[1.02] bg-gold-400 text-brand-950 shadow-lg"
                        : "scale-[1.02] bg-brand-700 text-white shadow-card"
                      : transparent
                        ? "text-white/85 hover:bg-white/10 hover:text-white"
                        : "text-brand-950 hover:bg-brand-50 hover:text-brand-900"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <EnrollButton className="mt-2 w-full" size="lg" />
          </nav>
        </div>
      </div>
    </header>
  );
}
