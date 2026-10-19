import * as React from "react";
import { SITE } from "../data/site";

/**
 * Per-page SEO for the SPA. Updates document title, meta description,
 * canonical URL and Open Graph / Twitter tags on every route change,
 * so each page has unique, keyword-rich metadata for Google.
 */
function baseUrl() {
  if (SITE.url) return SITE.url.replace(/\/$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "";
}

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const m = selector.match(/\[(name|property)="([^"]+)"\]/);
    if (m) el.setAttribute(m[1], m[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSeo({ title, description, path = "/", image = "/logo.jpg" }) {
  React.useEffect(() => {
    const fullTitle = title.includes("Syed Foundation") ? title : `${title} — Syed Foundation Academy`;
    document.title = fullTitle;

    const url = `${baseUrl()}${path}`;
    const img = image.startsWith("http") ? image : `${baseUrl()}${image}`;

    setMeta('meta[name="description"]', "content", description);
    setCanonical(url);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:image"]', "content", img);
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", img);
  }, [title, description, path, image]);
}

/** Renders a JSON-LD structured-data block (Organization, FAQPage, ...). */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
