/**
 * Tuition plans with explicit per-region pricing (clean, rounded local numbers).
 * 30-min plans are the core offering; 60-min plans scale proportionally.
 *
 * PRICING PSYCHOLOGY (owner, 2026-11-19): the 5 days/week 30-min plan is the
 * anchor (USA $65/mo) and the plan we push. Lower-frequency plans are priced
 * HIGH per class and the upgrade steps shrink (+8, +5, +3 in USD), so each
 * step up looks cheaper than the last and 5 days/week is the obvious value:
 * per-class cost falls steeply ($6.13 -> $4.75 -> $3.88 -> $3.25 in the USA).
 * The 5-day plan also carries the "Most Popular" badge. Regional prices keep
 * the previous ratios to the USA anchor, rounded to clean local numbers.
 */
export const PLANS = [
  { id: 1, daysPerWeek: 2, minutesPerClass: 30, classesPerMonth: 8, popular: false },
  { id: 2, daysPerWeek: 3, minutesPerClass: 30, classesPerMonth: 12, popular: false },
  { id: 3, daysPerWeek: 4, minutesPerClass: 30, classesPerMonth: 16, popular: false },
  { id: 4, daysPerWeek: 5, minutesPerClass: 30, classesPerMonth: 20, popular: true },
  { id: 5, daysPerWeek: 3, minutesPerClass: 60, classesPerMonth: 12, popular: false },
  { id: 6, daysPerWeek: 4, minutesPerClass: 60, classesPerMonth: 16, popular: false },
  { id: 7, daysPerWeek: 5, minutesPerClass: 60, classesPerMonth: 20, popular: false },
  { id: 8, daysPerWeek: 6, minutesPerClass: 60, classesPerMonth: 24, popular: false },
];

/**
 * Per-region monthly prices, keyed by plan id.
 * `was` is the strikethrough anchor price (shows the discount).
 */
const REGION_PRICES = {
  gulf: {
    1: { price: 169, was: 199 },
    2: { price: 199, was: 239 },
    3: { price: 219, was: 259 },
    4: { price: 229, was: 269 },
    5: { price: 369, was: 439 },
    6: { price: 419, was: 499 },
    7: { price: 459, was: 549 },
    8: { price: 519, was: 619 },
  },
  australia: {
    1: { price: 69, was: 83 },
    2: { price: 79, was: 95 },
    3: { price: 85, was: 102 },
    4: { price: 89, was: 107 },
    5: { price: 149, was: 179 },
    6: { price: 159, was: 189 },
    7: { price: 179, was: 215 },
    8: { price: 209, was: 249 },
  },
  usa: {
    1: { price: 49, was: 59 },
    2: { price: 57, was: 69 },
    3: { price: 62, was: 75 },
    4: { price: 65, was: 79 },
    5: { price: 109, was: 129 },
    6: { price: 119, was: 139 },
    7: { price: 125, was: 149 },
    8: { price: 145, was: 169 },
  },
  uk: {
    1: { price: 39, was: 47 },
    2: { price: 45, was: 54 },
    3: { price: 49, was: 59 },
    4: { price: 52, was: 62 },
    5: { price: 83, was: 99 },
    6: { price: 89, was: 105 },
    7: { price: 99, was: 119 },
    8: { price: 109, was: 129 },
  },
  canada: {
    1: { price: 67, was: 80 },
    2: { price: 77, was: 92 },
    3: { price: 84, was: 99 },
    4: { price: 89, was: 107 },
    5: { price: 139, was: 167 },
    6: { price: 149, was: 179 },
    7: { price: 169, was: 199 },
    8: { price: 189, was: 227 },
  },
  europe: {
    1: { price: 45, was: 54 },
    2: { price: 52, was: 62 },
    3: { price: 57, was: 68 },
    4: { price: 60, was: 72 },
    5: { price: 95, was: 113 },
    6: { price: 99, was: 119 },
    7: { price: 115, was: 137 },
    8: { price: 129, was: 155 },
  },
};

export const REGIONS = [
  { id: "usa", label: "USA", currency: "$", code: "USD" },
  { id: "gulf", label: "Gulf", currency: "AED ", code: "AED", note: "Also billed in SAR, QAR, KWD, OMR, BHD at local equivalents." },
  { id: "australia", label: "Australia", currency: "A$", code: "AUD" },
  { id: "uk", label: "UK", currency: "£", code: "GBP" },
  { id: "canada", label: "Canada", currency: "CA$", code: "CAD" },
  { id: "europe", label: "Europe", currency: "€", code: "EUR" },
];

/** Monthly price for a plan in a region. */
export function getPrice(planId, regionId) {
  const p = REGION_PRICES[regionId]?.[planId] || REGION_PRICES.usa[planId];
  return p.price;
}

/** Strikethrough anchor price for a plan in a region. */
export function getWasPrice(planId, regionId) {
  const p = REGION_PRICES[regionId]?.[planId] || REGION_PRICES.usa[planId];
  return p.was;
}

/** Human-readable plan label, e.g. "3 days/week · 30 min". */
export function planLabel(plan) {
  return `${plan.daysPerWeek} days/week · ${plan.minutesPerClass} min`;
}
