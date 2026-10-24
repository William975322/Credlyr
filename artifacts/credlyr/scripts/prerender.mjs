// After the client and SSR builds: write one HTML file per route so crawlers
// receive that page's title, description, canonical and body text with no JavaScript.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const pkg = fileURLToPath(new URL("..", import.meta.url));
const dist = join(pkg, "dist/public");
const template = readFileSync(join(dist, "index.html"), "utf8");

if (!template.includes('<div id="root"></div>')) {
  throw new Error("Built index.html has no empty <div id=\"root\"></div>. The prerender step cannot inject page HTML.");
}

const serverEntry = join(pkg, "dist/server/entry-server.js");
const { render, PAGES, NOT_FOUND_SEO, canonicalUrl, pageSeo, SITE_URL } = await import(pathToFileURL(serverEntry).href);

const PHRASES = {
  "/": "Turn website visitors into booked consultations.",
  "/product/websites": "A website as considered as the care you provide.",
  "/product/booking": "Let clients book a consultation in a few taps.",
  "/product/conversion": "Reply to every enquiry while interest is high.",
  "/get-started": "Book a free website audit.",
  "/industries/dental": "Websites for dental practices",
  "/industries/medical": "Websites for private clinics and specialists.",
  "/industries/aesthetics": "Websites for aesthetic clinics",
  "/industries/advisory": "Websites for advisory firms",
  "/about": "Good practices deserve websites that earn trust.",
  "/contact": "talk about your website",
  "/privacy": "How we handle your information.",
  "/legal": "Enterprise number (KBO/BCE)",
  "/thanks": "Thank you for getting in touch.",
};

function escapeAttr(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function replaceOnce(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`Prerender could not find ${label} in the HTML template.`);
  return html.replace(pattern, replacement);
}

// React's renderToString prepends hoisted <link rel="preload"> tags to the
// markup. They belong in <head>. Left inside #root, hydration does not expect
// them and warns.
function splitHoisted(body) {
  let rest = body;
  const hoisted = [];
  while (rest.startsWith("<link ")) {
    const end = rest.indexOf(">");
    if (end === -1) break;
    hoisted.push(rest.slice(0, end + 1));
    rest = rest.slice(end + 1);
  }
  return { hoisted, rest };
}

function apply(body, seo, canonical) {
  const { hoisted, rest } = splitHoisted(body);
  let html = template.replace('<div id="root"></div>', `<div id="root">${rest}</div>`);
  if (hoisted.length) html = html.replace("</head>", `    ${hoisted.join("\n    ")}\n  </head>`);
  html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(seo.title)}</title>`, "title");
  html = replaceOnce(html, /<meta name="description" content="[^"]*"/, `<meta name="description" content="${escapeAttr(seo.description)}"`, "description");
  html = replaceOnce(html, /<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escapeAttr(seo.ogTitle)}"`, "og:title");
  html = replaceOnce(html, /<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${escapeAttr(seo.description)}"`, "og:description");
  html = replaceOnce(html, /<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${escapeAttr(canonical ?? SITE_URL + "/")}"`, "og:url");
  html = replaceOnce(html, /<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${escapeAttr(seo.ogTitle)}"`, "twitter:title");
  html = replaceOnce(html, /<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${escapeAttr(seo.description)}"`, "twitter:description");
  html = replaceOnce(html, /<meta name="robots" content="[^"]*"/, `<meta name="robots" content="${seo.robots}"`, "robots");
  if (canonical) {
    html = replaceOnce(html, /<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${escapeAttr(canonical)}"`, "canonical");
  } else {
    html = replaceOnce(html, /\s*<link rel="canonical" href="[^"]*"\s*\/?>/, "", "canonical removal");
  }
  return html;
}

function writePage(route, html) {
  const file = route === "/" ? join(dist, "index.html") : join(dist, route.slice(1), "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  return file;
}

function textOf(html) {
  const start = html.indexOf('<div id="root">');
  const end = html.lastIndexOf("</body>");
  const slice = start >= 0 && end > start ? html.slice(start, end) : html;
  return slice.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function assertPage(route, html, seo, canonical) {
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (title !== escapeAttr(seo.title)) throw new Error(`${route}: title is "${title}", expected "${escapeAttr(seo.title)}"`);
  if (!html.includes(`content="${escapeAttr(seo.description)}"`)) throw new Error(`${route}: missing meta description`);
  if (canonical && !html.includes(`rel="canonical" href="${canonical}"`)) {
    throw new Error(`${route}: canonical is not ${canonical}`);
  }
  if (!canonical && html.includes('rel="canonical"')) throw new Error(`${route}: canonical should be omitted`);
  if (!html.includes(`name="robots" content="${seo.robots}"`)) throw new Error(`${route}: robots is not ${seo.robots}`);
  const phrase = PHRASES[route];
  if (phrase && !html.includes(phrase)) throw new Error(`${route}: rendered HTML is missing "${phrase}"`);
  if (html.includes('<div id="root"><link')) throw new Error(`${route}: a hoisted preload link was left inside #root`);
  const words = textOf(html).split(" ").filter(Boolean);
  if (words.length < 40) throw new Error(`${route}: only ${words.length} words of text in the HTML`);
}

const sitemap = readFileSync(join(pkg, "public/sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/\/$/, "") || SITE_URL);
const indexable = Object.entries(PAGES)
  .filter(([, seo]) => seo.robots === "index, follow")
  .map(([path]) => (path === "/" ? SITE_URL : SITE_URL + path));
const missing = indexable.filter((url) => !locs.includes(url));
const extra = locs.filter((url) => !indexable.includes(url));
if (missing.length || extra.length) {
  throw new Error(`sitemap.xml does not match indexable pages.\nMissing: ${missing.join(", ") || "—"}\nExtra: ${extra.join(", ") || "—"}`);
}

for (const route of Object.keys(PAGES)) {
  const seo = pageSeo(route);
  const canonical = canonicalUrl(route);
  const html = apply(render(route), seo, canonical);
  assertPage(route, html, seo, canonical);
  if (route === "/get-started" && html.includes("<iframe")) {
    throw new Error("/get-started prerender includes a calendar iframe. It must load only after the visitor asks.");
  }
  writePage(route, html);
}

const notFoundHtml = apply(render("/this-page-does-not-exist"), NOT_FOUND_SEO, null);
assertPage("/404", notFoundHtml, NOT_FOUND_SEO, null);
if (!notFoundHtml.includes("This page")) throw new Error("404 HTML is missing the not-found heading");
writeFileSync(join(dist, "404.html"), notFoundHtml);

console.log(`Prerendered ${Object.keys(PAGES).length} routes and the 404 page.`);
