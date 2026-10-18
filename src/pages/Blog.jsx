import { Link } from "react-router-dom";
import { Clock, ArrowRight, ArrowUpRight, BookOpenText } from "lucide-react";
import { POSTS } from "../data/blog";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import SectionHeading from "../components/SectionHeading";
import EnrollButton from "../components/EnrollButton";
import Reveal from "../components/Reveal";

function CategoryArt({ seed, className }) {
  // Unique artistic style per post, matched to content
  const styles = {
    "divine-rhythm-tajweed-mentorship": {
      bg: "from-emerald-900 via-emerald-800 to-teal-900",
      art: (
        <svg viewBox="0 0 400 225" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {[...Array(24)].map((_, i) => {
            const h = 20 + Math.abs(Math.sin(i * 0.7)) * 90;
            return <rect key={i} x={12 + i * 16} y={112 - h / 2} width={7} height={h} rx={3.5} fill="#f0c44c" opacity={0.25 + (i % 4) * 0.18} />;
          })}
          <circle cx={200} cy={112} r={46} fill="none" stroke="#f0c44c" strokeWidth={2} opacity={0.5} />
          <circle cx={200} cy={112} r={30} fill="#f0c44c" opacity={0.2} />
        </svg>
      ),
    },
    "memory-palace-hifz-cognitive-science": {
      bg: "from-indigo-950 via-indigo-900 to-violet-900",
      art: (
        <svg viewBox="0 0 400 225" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {[[80,60],[160,40],[250,70],[320,50],[110,150],[200,170],[290,150],[160,110],[250,120]].map(([x,y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={7} fill="#a5b4fc" opacity={0.7} />
              <circle cx={x} cy={y} r={14} fill="none" stroke="#a5b4fc" strokeWidth={1} opacity={0.3} />
            </g>
          ))}
          {[[80,60,160,40],[160,40,250,70],[250,70,320,50],[110,150,200,170],[200,170,290,150],[80,60,160,110],[160,110,250,120],[250,120,320,50],[110,150,160,110],[200,170,160,110]].map(([x1,y1,x2,y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#a5b4fc" strokeWidth={1} opacity={0.35} />
          ))}
        </svg>
      ),
    },
    "anatomical-sounds-tajweed-makharij": {
      bg: "from-amber-950 via-yellow-900 to-amber-900",
      art: (
        <svg viewBox="0 0 400 225" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <text x={200} y={130} textAnchor="middle" fontSize={110} fill="#fcd34d" opacity={0.35} fontFamily="Amiri, serif">ض</text>
          <text x={90} y={80} textAnchor="middle" fontSize={52} fill="#fcd34d" opacity={0.25} fontFamily="Amiri, serif">ق</text>
          <text x={310} y={180} textAnchor="middle" fontSize={64} fill="#fcd34d" opacity={0.22} fontFamily="Amiri, serif">ع</text>
          <circle cx={200} cy={112} r={88} fill="none" stroke="#fcd34d" strokeWidth={1.5} opacity={0.3} strokeDasharray="6 6" />
        </svg>
      ),
    },
    "screens-to-deen-digital-parenting-hifz": {
      bg: "from-sky-950 via-blue-900 to-indigo-950",
      art: (
        <svg viewBox="0 0 400 225" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <rect x={140} y={45} width={120} height={135} rx={14} fill="none" stroke="#7dd3fc" strokeWidth={2.5} opacity={0.5} />
          <rect x={155} y={70} width={90} height={70} rx={6} fill="#7dd3fc" opacity={0.18} />
          <polygon points="188,82 218,105 188,128" fill="#7dd3fc" opacity={0.65} />
          <circle cx={200} cy={162} r={5} fill="#7dd3fc" opacity={0.5} />
          {[...Array(5)].map((_, i) => (
            <circle key={i} cx={60 + i * 70} cy={200} r={3} fill="#7dd3fc" opacity={0.4 - i * 0.06} />
          ))}
        </svg>
      ),
    },
    "triumphant-path-hifz-challenges-rewards": {
      bg: "from-orange-950 via-amber-900 to-yellow-900",
      art: (
        <svg viewBox="0 0 400 225" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx={200} cy={150} r={52} fill="#fbbf24" opacity={0.35} />
          <circle cx={200} cy={150} r={36} fill="#fbbf24" opacity={0.45} />
          <path d="M0 225 L120 110 L200 170 L290 80 L400 160 L400 225 Z" fill="#92400e" opacity={0.5} />
          <path d="M0 225 L120 110 L200 170 L290 80 L400 160" fill="none" stroke="#fde68a" strokeWidth={2.5} opacity={0.6} strokeDasharray="10 6" />
          {[...Array(8)].map((_, i) => (
            <circle key={i} cx={30 + i * 48} cy={25 + (i % 3) * 18} r={2.5} fill="#fde68a" opacity={0.55} />
          ))}
        </svg>
      ),
    },
  };
  const s = styles[seed] || styles["divine-rhythm-tajweed-mentorship"];
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${s.bg} ${className || ""}`}>
      {s.art}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  );
}

export default function Blog() {
  const featured = POSTS.find((p) => p.featured) || POSTS[0];
  const archive = POSTS.filter((p) => p.slug !== featured.slug);

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-ivory to-ivory py-10 sm:py-14">
        <div className="container-x relative">
          <Reveal>
            <SectionHeading
            eyebrow="Quranic Blog Archives"
            title="Quranic Insights"
            subtitle="Verified, authentic content on Tajweed, Hifz, phonetics and digital parenting — from our academy scholars."
            />
          </Reveal>

          {/* Featured post */}
          <Link
            to={`/blog/${featured.slug}`}
            className="group mt-10 grid overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-soft lg:grid-cols-2"
          >
            <CategoryArt seed="feat" className="min-h-56 lg:min-h-full" />
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="gold">Featured</Badge>
                <Badge variant="secondary">{featured.category}</Badge>
                <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                  <Clock className="h-3.5 w-3.5" /> {featured.readTime}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-extrabold leading-tight text-brand-950 group-hover:text-brand-700 sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">{featured.excerpt}</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-gold-300">
                  {featured.author.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </span>
                <div>
                  <p className="text-sm font-bold text-brand-950">{featured.author}</p>
                  <p className="text-xs text-stone-500">{featured.authorRole} · {featured.date}</p>
                </div>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700">
                Read Article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          {/* Archive grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {archive.map((post, i) => (
              <Reveal key={post.slug} delay={Math.min(i * 0.08, 0.32)}>
              <Link
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft"
              >
                <CategoryArt seed={post.slug} className="h-44" />
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                      <Clock className="h-3.5 w-3.5" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-extrabold leading-snug text-brand-950 group-hover:text-brand-700">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-brand-100 pt-4">
                    <div>
                      <p className="text-sm font-bold text-brand-950">{post.author}</p>
                      <p className="text-xs text-stone-500">{post.date}</p>
                    </div>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition group-hover:bg-brand-700 group-hover:text-gold-300">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Link>
              </Reveal>
            ))}
          </div>

          {/* Engagement CTA */}
          <Card className="relative mt-12 overflow-hidden bg-brand-950 text-white">
            <CardContent className="relative flex flex-col items-center gap-4 p-8 text-center sm:p-10">
              <h3 className="max-w-xl text-2xl font-extrabold">Experience the 1-on-1 Advantage — For Free</h3>
              <p className="max-w-2xl text-sm leading-relaxed text-brand-100/85">
                Apply Tajweed principles live with an expert certified instructor. Access 3 assessment sessions with no
                strings attached.
              </p>
              <EnrollButton variant="gold" size="lg">Book Your Free Trial</EnrollButton>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
