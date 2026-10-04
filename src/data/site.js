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
  whatsapp: "https://wa.me/18186509752",
  whatsappDisplay: "+1 (818) 650-9752",
  whatsappNumber: "18186509752",
  email: "Contact@quranrise.com",
  hours: "24/7 (Flexible Custom Hours)",
  regions: ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain", "Australia"],
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
