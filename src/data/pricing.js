/**
 * Tuition plans with explicit per-region pricing (clean, rounded local numbers).
 * 30-min plans are the core offering; 60-min plans scale proportionally.
 */
export const PLANS = [
  { id: 1, daysPerWeek: 2, minutesPerClass: 30, classesPerMonth: 8, popular: false },
  { id: 2, daysPerWeek: 3, minutesPerClass: 30, classesPerMonth: 12, popular: true },
  { id: 3, daysPerWeek: 4, minutesPerClass: 30, classesPerMonth: 16, popular: false },
  { id: 4, daysPerWeek: 5, minutesPerClass: 30, classesPerMonth: 20, popular: false },
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
    1: { price: 149, was: 179 },
    2: { price: 199, was: 239 },
    3: { price: 249, was: 299 },
    4: { price: 299, was: 359 },
    5: { price: 369, was: 439 },
    6: { price: 469, was: 559 },
    7: { price: 599, was: 719 },
    8: { price: 679, was: 819 },
  },
  australia: {
    1: { price: 59, was: 71 },
    2: { price: 79, was: 95 },
    3: { price: 99, was: 119 },
    4: { price: 119, was: 143 },
    5: { price: 149, was: 179 },
    6: { price: 189, was: 227 },
    7: { price: 239, was: 287 },
    8: { price: 279, was: 335 },
  },
  usa: {
    1: { price: 39, was: 47 },
    2: { price: 54, was: 65 },
    3: { price: 69, was: 83 },
    4: { price: 84, was: 101 },
    5: { price: 99, was: 119 },
    6: { price: 124, was: 149 },
    7: { price: 159, was: 191 },
    8: { price: 179, was: 215 },
  },
  uk: {
    1: { price: 31, was: 37 },
    2: { price: 43, was: 52 },
    3: { price: 55, was: 66 },
    4: { price: 67, was: 80 },
    5: { price: 79, was: 95 },
    6: { price: 99, was: 119 },
    7: { price: 127, was: 152 },
    8: { price: 143, was: 172 },
  },
  canada: {
    1: { price: 53, was: 64 },
    2: { price: 73, was: 88 },
    3: { price: 94, was: 113 },
    4: { price: 114, was: 137 },
    5: { price: 135, was: 162 },
    6: { price: 169, was: 203 },
    7: { price: 216, was: 259 },
    8: { price: 243, was: 292 },
  },
  europe: {
    1: { price: 36, was: 43 },
    2: { price: 50, was: 60 },
    3: { price: 64, was: 77 },
    4: { price: 77, was: 92 },
    5: { price: 91, was: 109 },
    6: { price: 114, was: 137 },
    7: { price: 146, was: 175 },
    8: { price: 165, was: 198 },
  },
};

export const REGIONS = [
  { id: "gulf", label: "Gulf", currency: "AED ", code: "AED", note: "Also billed in SAR, QAR, KWD, OMR, BHD at local equivalents." },
  { id: "australia", label: "Australia", currency: "A$", code: "AUD" },
  { id: "usa", label: "USA", currency: "$", code: "USD" },
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
