/**
 * Tuition plans. Base prices are USD per month (from source site).
 * Region tabs convert using the rates below.
 */
export const PLANS = [
  { id: 1, daysPerWeek: 2, minutesPerClass: 30, classesPerMonth: 8, price: 38, was: 48, popular: false },
  { id: 2, daysPerWeek: 3, minutesPerClass: 30, classesPerMonth: 12, price: 53, was: 63, popular: false },
  { id: 3, daysPerWeek: 4, minutesPerClass: 30, classesPerMonth: 16, price: 68, was: 78, popular: false },
  { id: 4, daysPerWeek: 5, minutesPerClass: 30, classesPerMonth: 20, price: 83, was: 93, popular: false },
  { id: 5, daysPerWeek: 3, minutesPerClass: 60, classesPerMonth: 12, price: 100, was: 110, popular: true },
  { id: 6, daysPerWeek: 4, minutesPerClass: 60, classesPerMonth: 16, price: 125, was: 135, popular: false },
  { id: 7, daysPerWeek: 5, minutesPerClass: 60, classesPerMonth: 20, price: 160, was: 170, popular: false },
  { id: 8, daysPerWeek: 6, minutesPerClass: 60, classesPerMonth: 24, price: 180, was: 200, popular: false },
];

/**
 * Region tabs with currency conversion (approximate 2026 rates).
 * Gulf tab shows AED (also usable across the GCC; SAR ≈ AED × 1.02).
 */
export const REGIONS = [
  { id: "usa", label: "USA", currency: "$", code: "USD", rate: 1 },
  { id: "uk", label: "UK", currency: "£", code: "GBP", rate: 0.79 },
  { id: "canada", label: "Canada", currency: "CA$", code: "CAD", rate: 1.36 },
  { id: "australia", label: "Australia", currency: "A$", code: "AUD", rate: 1.52 },
  { id: "europe", label: "Europe", currency: "€", code: "EUR", rate: 0.92 },
  { id: "gulf", label: "Gulf", currency: "AED ", code: "AED", rate: 3.67, note: "Also billed in SAR, QAR, KWD, OMR, BHD at local equivalents." },
];

export function convertPrice(usd, region) {
  return Math.round(usd * region.rate);
}
