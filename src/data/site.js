/**
 * Central contact & brand configuration.
 *
 * NOTE: The WhatsApp number and email below are PLACEHOLDERS copied from the
 * source site the design was inspired by. Replace them with the academy's real
 * details before launch.
 */
export const SITE = {
  name: "Syed Foundation Academy",
  shortName: "Syed Foundation",
  tagline: "Recite with Beauty",
  // Production domain. TODO: set this once your domain is connected,
  // e.g. "https://www.syedfoundationacademy.com". Empty = falls back to
  // window.location.origin (works on Vercel preview URLs too).
  url: "",
  whatsapp: "https://wa.me/923122797208",
  whatsappDisplay: "+92 312 2797208",
  whatsappNumber: "923122797208",
  email: "syedfoundation.online@gmail.com",
  hours: "24/7 (Flexible Custom Hours)",
  regions: ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain", "Australia"],
  // Google Apps Script Web App URL that receives enrollment leads into the
  // "lead sheet" Google Sheet. Empty = leads are not sent anywhere.
  leadSheetUrl: "https://script.google.com/macros/s/AKfycbylaO4oeHlLI9eKJlPasnljWyku_WIasGnLsVkVvaF42aoZno4SbNVkjCjrIGm7rZlKPA/exec",
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Pricing", to: "/pricing" },
  { label: "Courses", to: "/courses" },
  { label: "Blogs", to: "/blog" },
];

export function whatsappLink(message) {
  const text = encodeURIComponent(
    message || "Assalamu Alaikum! I would like to book a free trial class at Syed Foundation Academy."
  );
  return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
}
