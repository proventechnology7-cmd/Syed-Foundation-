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
  const location = useLocation();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all",
        scrolled
          ? "border-brand-100 bg-ivory/85 shadow-card backdrop-blur-xl"
          : "border-transparent bg-ivory/60 backdrop-blur-md"
      )}
    >
      <div className="container-x flex h-16 sm:h-20 items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${SITE.name} home`}>
          <img src={logo} alt={SITE.name} className="h-10 w-10 rounded-xl object-cover shadow-card sm:h-12 sm:w-12" />
          <span className="leading-tight">
            <span className="block text-base font-extrabold text-brand-950 sm:text-lg">Syed Foundation</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-gold-600 sm:text-[11px]">
              Academy
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "rounded-xl px-4 py-2 text-sm font-semibold transition-colors",
                  isActive ? "bg-brand-100 text-brand-900" : "text-brand-900/70 hover:bg-brand-50 hover:text-brand-900"
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
          className="flex h-10 w-10 items-center justify-center rounded-xl text-brand-900 hover:bg-brand-100 lg:hidden"
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
          "grid overflow-hidden border-b border-brand-100 bg-ivory/95 backdrop-blur-xl transition-all duration-300 lg:hidden",
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
                    "rounded-xl px-4 py-3 text-base font-semibold",
                    isActive ? "bg-brand-100 text-brand-900" : "text-brand-900/75 hover:bg-brand-50"
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
