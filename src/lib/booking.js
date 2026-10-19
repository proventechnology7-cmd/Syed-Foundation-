/**
 * Trial-class booking engine.
 *
 * Slots are defined in academy time (Asia/Karachi, UTC+5, no DST) and converted
 * to whatever timezone the parent picks, using the Intl API so DST is handled
 * correctly (e.g. Sydney, London, New York).
 */

export const BOOKING = {
  daysAhead: 14, // how many days out parents can book
  slotMinutes: 60, // slot length
  dayStartMin: 9 * 60, // first slot 09:00 academy time
  dayEndMin: 21 * 60, // last slot starts 20:00 academy time
  academyZone: "Asia/Karachi",
  karachiOffsetMin: 5 * 60, // Asia/Karachi has no DST — fixed UTC+5
  offDays: [], // JS getDay() numbers to skip, e.g. [5] for Friday. [] = open 7 days.
};

export const BOOKING_ZONES = [
  { id: "Asia/Karachi", label: "Pakistan (PKT)" },
  { id: "Asia/Dubai", label: "UAE / Oman (GST)" },
  { id: "Asia/Riyadh", label: "Saudi / Qatar / Kuwait / Bahrain (AST)" },
  { id: "Asia/Kolkata", label: "India (IST)" },
  { id: "Europe/London", label: "UK" },
  { id: "America/New_York", label: "US Eastern" },
  { id: "Australia/Sydney", label: "Sydney" },
];

/** Calendar date (y/m/d) in academy time right now. */
function academyToday() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: BOOKING.academyZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const [y, m, d] = parts.split("-").map(Number);
  return { y, m, d };
}

/** Bookable days as { y, m, d, key, weekday }. */
export function bookingDays() {
  const { y, m, d } = academyToday();
  const days = [];
  for (let i = 0; i < BOOKING.daysAhead; i++) {
    // Noon UTC keeps the calendar date stable for weekday math.
    const weekday = new Date(Date.UTC(y, m - 1, d + i, 12)).getUTCDay();
    if (BOOKING.offDays.includes(weekday)) continue;
    const dd = new Date(Date.UTC(y, m - 1, d + i));
    days.push({
      y: dd.getUTCFullYear(),
      m: dd.getUTCMonth() + 1,
      d: dd.getUTCDate(),
      key: `${dd.getUTCFullYear()}-${dd.getUTCMonth() + 1}-${dd.getUTCDate()}`,
      weekday,
    });
  }
  return days;
}

/**
 * Slots for one academy day: [{ utcMs, past }].
 * `past` marks slots whose start time already passed.
 */
export function slotsForDay(day) {
  const slots = [];
  const midnightUTC = Date.UTC(day.y, day.m - 1, day.d);
  for (let min = BOOKING.dayStartMin; min < BOOKING.dayEndMin; min += BOOKING.slotMinutes) {
    const utcMs = midnightUTC - BOOKING.karachiOffsetMin * 60000 + min * 60000;
    slots.push({ utcMs, past: utcMs <= Date.now() });
  }
  return slots;
}

const dayNameFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: BOOKING.academyZone,
  weekday: "short",
});
const dayNumFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: BOOKING.academyZone,
  day: "numeric",
});
const monthFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: BOOKING.academyZone,
  month: "short",
});
const fullDateFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: BOOKING.academyZone,
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

function dayToDate(day) {
  // Noon UTC on that calendar date == afternoon academy time, same date.
  return new Date(Date.UTC(day.y, day.m - 1, day.d, 12));
}

export function formatDayShort(day) {
  const dt = dayToDate(day);
  return { dow: dayNameFmt.format(dt), num: dayNumFmt.format(dt), mon: monthFmt.format(dt) };
}

export function formatDayFull(day) {
  return fullDateFmt.format(dayToDate(day));
}

/** "2:00 PM" in the parent's chosen timezone. */
export function formatSlot(utcMs, timeZone) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(utcMs));
}

export function zoneLabel(id) {
  return (BOOKING_ZONES.find((z) => z.id === id) || BOOKING_ZONES[0]).label;
}
