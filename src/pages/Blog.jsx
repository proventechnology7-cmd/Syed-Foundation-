import { Link } from "react-router-dom";
import { Clock, ArrowRight, ArrowUpRight, BookOpenText } from "lucide-react";
import { POSTS } from "../data/blog";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import SectionHeading from "../components/SectionHeading";
import GeometricPattern from "../components/GeometricPattern";
import EnrollButton from "../components/EnrollButton";

function CategoryArt({ seed, className }) {
  // Original decorative SVG art per post (no copied assets)
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 ${className || ""}`}>
      <svg viewBox="0 0 400 225" className="absolute inset-0 h-full w-full opacity-25" aria-hidden="true">
        <defs>
          <pattern id={`blogp-${seed}`} width="48" height="48" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="#f0c44c" strokeWidth="1">
              <rect x="14" y="14" width="20" height="20" />
              <rect x="14" y="14" width="20" height="20" transform="rotate(45 24 24)" />
            </g>
          </pattern>
        </defs>
        <rect width="400" height="225" fill={`url(#blogp-${seed})`} />
      </svg>
      <BookOpenText className="relative h-16 w-16 text-gold-400/90" />
    </div>
  );
}

export default function Blog() {
  const featured = POSTS.find((p) => p.featured) || POSTS[0];
  const archive = POSTS.filter((p) => p.slug !== featured.slug);

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-ivory to-ivory py-14 sm:py-20">
        <GeometricPattern className="text-brand-800" opacity={0.06} />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Quranic Blog Archives"
            title="Quranic Insights"
            subtitle="Verified, authentic content on Tajweed, Hifz, phonetics and digital parenting — from our academy scholars."
          />

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
            {archive.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-soft"
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
            ))}
          </div>

          {/* Engagement CTA */}
          <Card className="relative mt-12 overflow-hidden bg-brand-950 text-white">
            <GeometricPattern className="text-gold-400" opacity={0.07} />
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
