import { Link, useParams, Navigate } from "react-router-dom";
import { Clock, ArrowLeft, ArrowRight, Quote, CalendarDays } from "lucide-react";
import { POSTS } from "../data/blog";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import SectionHeading from "../components/SectionHeading";
import GeometricPattern from "../components/GeometricPattern";
import EnrollButton from "../components/EnrollButton";

function Block({ block }) {
  if (block.type === "heading") {
    return <h2 className="mt-9 text-xl font-extrabold text-brand-950 sm:text-2xl">{block.text}</h2>;
  }
  if (block.type === "quote") {
    return (
      <blockquote className="relative mt-8 overflow-hidden rounded-2xl bg-brand-50 p-6 pl-14 sm:p-7 sm:pl-16">
        <Quote className="absolute left-5 top-6 h-7 w-7 text-gold-500" />
        <p className="font-arabic text-lg leading-relaxed text-brand-900 sm:text-xl">"{block.text}"</p>
      </blockquote>
    );
  }
  return <p className="mt-5 leading-relaxed text-stone-700">{block.text}</p>;
}

export default function BlogDetail() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main>
      <article className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-ivory to-ivory py-12 sm:py-16">
        <GeometricPattern className="text-brand-800" opacity={0.05} />
        <div className="container-x relative">
          <div className="mx-auto max-w-3xl">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{post.category}</Badge>
              <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                <CalendarDays className="h-3.5 w-3.5" /> {post.date}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                <Clock className="h-3.5 w-3.5" /> {post.readTime}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-brand-950 sm:text-4xl">
              {post.title}
            </h1>

            <div className="mt-6 flex items-center gap-3 border-y border-brand-100 py-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-gold-300">
                {post.author.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </span>
              <div>
                <p className="text-sm font-bold text-brand-950">{post.author}</p>
                <p className="text-xs text-stone-500">{post.authorRole}</p>
              </div>
              <span className="ml-auto hidden rounded-full bg-brand-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-800 sm:block">
                Verified Authentic Content
              </span>
            </div>

            <div className="mt-2 text-[15px] sm:text-base">
              {post.body.map((b, i) => (
                <Block key={i} block={b} />
              ))}
            </div>

            <Card className="mt-10 bg-brand-950 text-white">
              <CardContent className="flex flex-col items-center gap-4 p-7 text-center sm:p-8">
                <h3 className="text-xl font-extrabold">Apply these principles live — free</h3>
                <p className="max-w-lg text-sm text-brand-100/85">
                  Book a 3-day free assessment and practice Tajweed with a certified instructor in a live 1-on-1 session.
                </p>
                <EnrollButton variant="gold">Book Free Trial</EnrollButton>
              </CardContent>
            </Card>
          </div>
        </div>
      </article>

      {/* Related posts */}
      <section className="py-12 sm:py-16">
        <div className="container-x">
          <SectionHeading eyebrow="Keep Reading" title="More Quranic Insights" align="left" className="mx-0" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/blog/${r.slug}`}
                className="group rounded-2xl border border-brand-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft"
              >
                <Badge variant="secondary">{r.category}</Badge>
                <h3 className="mt-3 font-extrabold leading-snug text-brand-950 group-hover:text-brand-700">{r.title}</h3>
                <p className="mt-2 text-sm text-stone-500">{r.author} · {r.readTime}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700">
                  Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
