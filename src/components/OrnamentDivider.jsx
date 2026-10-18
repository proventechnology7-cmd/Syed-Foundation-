/**
 * Elegant gold ornamental divider between sections
 */
export default function OrnamentDivider({ dark = false }) {
  return (
    <div className="flex items-center justify-center gap-3 py-2" aria-hidden="true">
      <span className={`h-px w-16 sm:w-24 ${dark ? "bg-gradient-to-r from-transparent to-gold-400/70" : "bg-gradient-to-r from-transparent to-gold-500/60"}`} />
      <span className={`flex h-2 w-2 rotate-45 ${dark ? "bg-gold-400" : "bg-gold-500"}`} />
      <span className={`h-px w-16 sm:w-24 ${dark ? "bg-gradient-to-l from-transparent to-gold-400/70" : "bg-gradient-to-l from-transparent to-gold-500/60"}`} />
    </div>
  );
}
