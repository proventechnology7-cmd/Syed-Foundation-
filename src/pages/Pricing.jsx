import * as React from "react";
import { Check, Crown, CalendarDays, Timer, Layers, Sparkles, Info } from "lucide-react";
import { PLANS, REGIONS, convertPrice } from "../data/pricing";
import { SITE } from "../data/site";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import SectionHeading from "../components/SectionHeading";
import GeometricPattern from "../components/GeometricPattern";
import EnrollButton from "../components/EnrollButton";
import { cn } from "../lib/utils";

function PlanCard({ plan, region }) {
  const price = convertPrice(plan.price, region);
  const was = convertPrice(plan.was, region);
  return (
    <Card
      className={cn(
        "relative flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-soft",
        plan.popular && "border-2 border-gold-400 shadow-soft"
      )}
    >
      {plan.popular && (
        <div className="flex items-center justify-center gap-1.5 bg-gold-400 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand-950">
          <Crown className="h-3.5 w-3.5" /> Most Popular
        </div>
      )}
      <CardContent className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-brand-950">Plan {plan.id}</h3>
          <Badge variant="secondary" className="text-[11px]">
            {plan.minutesPerClass} min / class
          </Badge>
        </div>

        <div className="mt-4 flex items-end gap-2">
          <span className="text-4xl font-extrabold tracking-tight text-brand-800">
            {region.currency}
            {price.toLocaleString()}
          </span>
          <span className="pb-1 text-sm text-stone-500">/ month</span>
          <span className="mb-1 ml-auto text-sm text-stone-400 line-through">
            {region.currency}
            {was.toLocaleString()}
          </span>
        </div>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-emerald-600">
          Free trial class included
        </p>

        <ul className="mt-5 space-y-2.5 border-t border-brand-100 pt-5 text-sm text-stone-600">
          <li className="flex items-center gap-2.5">
            <CalendarDays className="h-4 w-4 shrink-0 text-brand-600" />
            {plan.daysPerWeek} Days per Week
          </li>
          <li className="flex items-center gap-2.5">
            <Timer className="h-4 w-4 shrink-0 text-brand-600" />
            {plan.minutesPerClass} Minutes / Class
          </li>
          <li className="flex items-center gap-2.5">
            <Layers className="h-4 w-4 shrink-0 text-brand-600" />
            {plan.classesPerMonth} Classes / Month
          </li>
          <li className="flex items-center gap-2.5">
            <Check className="h-4 w-4 shrink-0 text-brand-600" />
            Live 1-on-1 certified tutor
          </li>
        </ul>

        <EnrollButton className="mt-6 w-full" variant={plan.popular ? "gold" : "default"}>
          Book Free Trial
        </EnrollButton>
      </CardContent>
    </Card>
  );
}

export default function Pricing() {
  const [regionId, setRegionId] = React.useState("gulf");
  const region = REGIONS.find((r) => r.id === regionId) || REGIONS[0];

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-ivory to-ivory py-14 sm:py-20">
        <GeometricPattern className="text-brand-800" opacity={0.06} />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Pricing & Plans"
            title="Empowered Tuition Packages"
            subtitle="Choose the perfect Quran learning plan that fits your schedule and learning goals. All plans include a free trial class, live 1-on-1 instruction, and flexible Gulf & Australian time-zone scheduling."
          />

          <Tabs value={regionId} onValueChange={setRegionId} className="mt-10">
            <div className="flex justify-center">
              <TabsList className="max-w-full">
                {REGIONS.map((r) => (
                  <TabsTrigger key={r.id} value={r.id}>
                    {r.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {region.note && (
              <p className="mx-auto mt-3 flex max-w-2xl items-start justify-center gap-1.5 text-center text-xs text-stone-500">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" />
                {region.note}
              </p>
            )}
            <TabsContent value={regionId} className="mt-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {PLANS.map((p) => (
                  <PlanCard key={p.id} plan={p} region={region} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-brand-200 bg-white p-5 shadow-card">
            <Sparkles className="h-5 w-5 shrink-0 text-gold-600" />
            <p className="text-sm leading-relaxed text-stone-600">
              <strong className="text-brand-950">Sibling discounts &amp; custom plans available.</strong> No hidden
              registration fees, no long commitments. Message our coordinator on WhatsApp at{" "}
              <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="font-semibold text-brand-700 hover:underline">
                {SITE.whatsappDisplay}
              </a>{" "}
              to tailor a plan for your family.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
