# Syed Foundation Academy

An online Quran academy website — a complete, original-code rebuild (React + Tailwind + shadcn-style components)
inspired by the layout of quranrise.com, fully rebranded as **Syed Foundation Academy** and tailored for families in
the **Gulf countries (UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain)** and **Australia**.

All layout, styling, SVG art and copy adaptation in this project are original. No assets were copied from the source site.

## Tech Stack

- **Vite** + **React 18** + **react-router-dom** (HashRouter, safe for static hosting)
- **Tailwind CSS v3** (`tailwind.config.js`) with a custom emerald/gold/ivory design system
- **shadcn-style UI primitives** hand-built in `src/components/ui/` (button, card, badge, accordion, input,
  textarea, select, tabs) using `class-variance-authority`, `clsx`, `tailwind-merge`
- **lucide-react** icons (no emojis anywhere in the UI)
- Google Fonts: **Plus Jakarta Sans** (UI/body) + **Amiri** (Arabic calligraphy accents)

## Getting Started

```bash
cd syed-foundation-academy
npm install
npm run dev        # start dev server (default http://localhost:5173)
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

> Do not leave a dev server running when you are done — stop it with `Ctrl+C`.

## Pages

| Route          | Page                                                                 |
|----------------|----------------------------------------------------------------------|
| `/`            | Home — hero, live-availability strip, courses preview, about, 3-step process, why-us, animated stats, testimonials (tabs), enrollment form, FAQ |
| `/pricing`     | Pricing — 8 tuition plans with region tabs (USA, UK, Canada, Australia, Europe, **Gulf** in AED) |
| `/courses`     | Courses — full syllabus breakdown for all 4 programs                  |
| `/blog`        | Blog — featured post + archive grid                                   |
| `/blog/:slug`  | Blog article detail (5 posts included)                                |
| `*`            | Custom 404 page                                                       |

## Customization

### Swapping the logo

The academy's real logo lives in two places (same image, kept in sync):

```
src/assets/logo.jpg   # imported by the navbar and footer
public/logo.jpg       # used as the browser favicon (see index.html)
```

Replace both files with a new image of the same filenames (square works best) and rebuild.

### Updating contact details

All contact details live in **one place** — every component reads from it:

```
src/data/site.js   ->   SITE = { whatsapp, whatsappDisplay, whatsappNumber, email, ... }
```

> **PLACEHOLDERS:** `whatsapp` (`https://wa.me/18186509752` / `+1 (818) 650-9752`) and `email`
> (`Contact@quranrise.com`) were copied from the source site and **must be replaced** with the academy's real
> details before launch.

### Other content

- Courses & syllabi: `src/data/courses.js`
- Pricing plans & region/currency conversion: `src/data/pricing.js`
- Testimonials: `src/data/testimonials.js`
- Blog posts: `src/data/blog.js`
- FAQs: `src/data/faqs.js`
- Brand colors/fonts: `tailwind.config.js`

## Placeholders & Assumptions

- **Stats band** (12+ years, 120K+ classes, 98% satisfaction, 100% certified) uses **illustrative placeholder
  numbers** carried over from the source site — replace with real figures.
- **Testimonial names/locations** are adapted from the source site; the academy should collect its own reviews.
- **Pricing conversions** (GBP, CAD, AUD, EUR, AED) use approximate 2026 FX rates — confirm before publishing.
- **Gulf tab** prices display in **AED** (SAR ≈ AED × 1.02; QAR/KWD/OMR/BHD billed at local equivalents — noted on the page).
- The enrollment form currently shows a **success state + WhatsApp deep link** with the request prefilled; wire it
  to a real backend/CRM when available.

## Project Structure

```
src/
  assets/logo.jpg            # academy logo (also in public/ as favicon)
  components/
    ui/                      # button, card, badge, accordion, input, textarea, select, tabs
    Navbar.jsx  Footer.jsx  WhatsAppFloat.jsx
    GeometricPattern.jsx     # original Islamic geometric SVG background
    SectionHeading.jsx  EnrollButton.jsx  SectionLink.jsx
    EnrollmentForm.jsx       # trial form + direct contact channels
  data/                      # site.js, courses.js, pricing.js, testimonials.js, blog.js, faqs.js
  pages/                     # Home, Pricing, Courses, Blog, BlogDetail, NotFound
  lib/utils.js               # cn() helper
  App.jsx                    # HashRouter + routes
```

## Deployment

`npm run build` emits a static `dist/` folder. Because the app uses `HashRouter`, it can be hosted on **any static
host** (Netlify, Vercel, GitHub Pages, cPanel, etc.) with no server rewrites required.
