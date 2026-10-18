/**
 * Unique artistic header per course, matched to content.
 * Used on Home course cards and the Courses page.
 */
export default function CourseArt({ slug, className = "h-28" }) {
  const arts = {
    "noorani-qaida": {
      bg: "from-emerald-800 to-teal-900",
      svg: (
        <svg viewBox="0 0 400 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <text x={70} y={80} textAnchor="middle" fontSize={56} fill="#f0c44c" opacity={0.5} fontFamily="Amiri, serif">ا</text>
          <text x={140} y={80} textAnchor="middle" fontSize={56} fill="#f0c44c" opacity={0.35} fontFamily="Amiri, serif">ب</text>
          <text x={210} y={80} textAnchor="middle" fontSize={56} fill="#f0c44c" opacity={0.5} fontFamily="Amiri, serif">ت</text>
          <text x={280} y={80} textAnchor="middle" fontSize={56} fill="#f0c44c" opacity={0.35} fontFamily="Amiri, serif">ث</text>
          <text x={340} y={80} textAnchor="middle" fontSize={56} fill="#f0c44c" opacity={0.5} fontFamily="Amiri, serif">ج</text>
        </svg>
      ),
    },
    "quran-recitation": {
      bg: "from-blue-900 to-indigo-950",
      svg: (
        <svg viewBox="0 0 400 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <rect x={150} y={20} width={100} height={80} rx={8} fill="none" stroke="#93c5fd" strokeWidth={2} opacity={0.5} />
          <line x1={165} y1={40} x2={235} y2={40} stroke="#93c5fd" strokeWidth={3} opacity={0.4} strokeLinecap="round" />
          <line x1={165} y1={55} x2={220} y2={55} stroke="#93c5fd" strokeWidth={3} opacity={0.3} strokeLinecap="round" />
          <line x1={165} y1={70} x2={235} y2={70} stroke="#93c5fd" strokeWidth={3} opacity={0.4} strokeLinecap="round" />
          <line x1={165} y1={85} x2={205} y2={85} stroke="#93c5fd" strokeWidth={3} opacity={0.3} strokeLinecap="round" />
          <circle cx={70} cy={60} r={28} fill="none" stroke="#93c5fd" strokeWidth={2} opacity={0.4} />
          <polygon points="64,48 84,60 64,72" fill="#93c5fd" opacity={0.5} />
          <circle cx={330} cy={60} r={28} fill="none" stroke="#93c5fd" strokeWidth={2} opacity={0.4} />
          <polygon points="324,48 344,60 324,72" fill="#93c5fd" opacity={0.5} />
        </svg>
      ),
    },
    "tajweed": {
      bg: "from-amber-900 to-orange-950",
      svg: (
        <svg viewBox="0 0 400 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {[...Array(20)].map((_, i) => {
            const h = 14 + Math.abs(Math.sin(i * 0.9)) * 44;
            return <rect key={i} x={30 + i * 18} y={60 - h / 2} width={6} height={h} rx={3} fill="#fcd34d" opacity={0.3 + (i % 3) * 0.2} />;
          })}
        </svg>
      ),
    },
    "hifz": {
      bg: "from-violet-950 to-purple-900",
      svg: (
        <svg viewBox="0 0 400 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx={200} cy={60} r={34} fill="none" stroke="#c4b5fd" strokeWidth={2} opacity={0.5} />
          <circle cx={200} cy={60} r={20} fill="#c4b5fd" opacity={0.25} />
          {[[120,35],[280,35],[120,85],[280,85],[80,60],[320,60]].map(([x,y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={6} fill="#c4b5fd" opacity={0.6} />
              <line x1={x} y1={y} x2={200} y2={60} stroke="#c4b5fd" strokeWidth={1} opacity={0.3} />
            </g>
          ))}
        </svg>
      ),
    },
  };
  const a = arts[slug] || arts["noorani-qaida"];
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${a.bg} ${className}`}>
      <div className="img-zoom absolute inset-0">
        {a.svg}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </div>
  );
}
