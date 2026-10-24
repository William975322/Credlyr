// Single source for titles, descriptions and canonical URLs.
// The prerender script and usePageTitle both read this, so the HTML Google
// receives and the tags the browser sets after navigation cannot drift apart.

export const BRAND = "Olerivo";
export const SITE_URL = "https://www.olerivo.com";

export const HOME_TITLE = `${BRAND} — Premium Websites & Lead-Conversion Systems`;
export const HOME_DESCRIPTION =
  `${BRAND} designs premium websites for clinics, practices and advisory firms, with appointment booking and lead follow-up built in.`;
const HOME_OG_TITLE = `${BRAND} — Turn website visitors into booked consultations`;

export type PageSeo = {
  title: string;
  description: string;
  ogTitle: string;
  robots: "index, follow" | "noindex, follow";
};

function page(name: string, description: string, robots: PageSeo["robots"] = "index, follow"): PageSeo {
  const title = `${name} — ${BRAND}`;
  return { title, description, ogTitle: title, robots };
}

export const PAGES: Record<string, PageSeo> = {
  "/": {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    ogTitle: HOME_OG_TITLE,
    robots: "index, follow",
  },
  "/product/websites": page(
    "Websites and landing pages",
    "We design and build bespoke websites and focused landing pages for clinics, practices and advisory firms. Clear, fast and built to turn visitors into enquiries.",
  ),
  "/product/booking": page(
    "Appointment scheduling",
    "We add appointment scheduling to your website, designed to match your brand and connected to the calendar you already use.",
  ),
  "/product/conversion": page(
    "Lead response and CRM integrations",
    "When someone gets in touch, they receive a prompt, personal acknowledgement with a simple way to book, and the enquiry is recorded where your team works.",
  ),
  "/get-started": page(
    "Book a free website audit",
    "Book a free 30-minute website audit. We review your current website with you and show you what to improve first.",
  ),
  "/industries/dental": page(
    "Dental practices",
    "Help new patients understand your treatments, get to know your team and book with confidence.",
  ),
  "/industries/medical": page(
    "Medical & clinics",
    "Give patients the clarity they look for before choosing a consultant or clinic, and an easy way to book.",
  ),
  "/industries/aesthetics": page(
    "Aesthetics",
    "Present your treatments and practitioners with care, and make it simple to book a consultation.",
  ),
  "/industries/advisory": page(
    "Advisory firms",
    "For legal, financial and consultancy firms: a website that communicates expertise clearly and makes the first conversation easy to arrange.",
  ),
  "/about": page(
    "About",
    "Olerivo designs websites and lead-conversion systems for clinics, practices and advisory firms. Founder-led, with a clear, defined service.",
  ),
  "/contact": page(
    "Contact",
    "Get in touch with Olerivo about your website, appointment scheduling or lead response.",
  ),
  "/privacy": page("Privacy", "How we handle the information you share through this website."),
  "/legal": page("Legal information", "Business and contact details."),
  "/thanks": page("Thank you", HOME_DESCRIPTION, "noindex, follow"),
};

export const NOT_FOUND_SEO: PageSeo = page("Page not found", HOME_DESCRIPTION, "noindex, follow");

export function normalizePath(input: string): string {
  const raw = input.split("#")[0]?.split("?")[0] || "/";
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  if (withSlash !== "/" && withSlash.endsWith("/")) return withSlash.replace(/\/+$/, "") || "/";
  return withSlash || "/";
}

export function pageSeo(pathname: string): PageSeo {
  return PAGES[normalizePath(pathname)] ?? NOT_FOUND_SEO;
}

/** Canonical URL with no trailing slash, except the homepage. */
export function canonicalUrl(pathname: string): string {
  const path = normalizePath(pathname);
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}
