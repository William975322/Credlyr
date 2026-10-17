// Pre-launch check: run `pnpm run check:launch` before releasing to production.
//
// Warns when business details are missing from
// artifacts/credlyr/src/business.json. Fails when the public mailbox has no
// mail servers or the built site still shows the old brand. With --env it
// also checks the environment variables and Resend DNS the contact form needs; run it
// with the production values loaded, e.g. `vercel env pull` then
// `node --env-file=.env.local scripts/check-launch.mjs --env`.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolveMx, resolveTxt } from "node:dns/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const business = JSON.parse(readFileSync(new URL("../artifacts/credlyr/src/business.json", import.meta.url), "utf8"));
const problems = [];
const warnings = [];
const filled = (key) => typeof business[key] === "string" && business[key].trim() !== "";

for (const [key, label] of [
  ["legalName", "legal name of the business"],
  ["legalForm", "legal form (e.g. sole trader, BV/SRL)"],
  ["street", "registered address: street and number"],
  ["postcode", "registered address: postcode"],
  ["city", "registered address: city"],
  ["enterpriseNumber", "enterprise number (KBO/BCE)"],
  ["publicEmail", "public contact email (a mailbox that receives mail)"],
  ["enquiryRetention", "how long enquiries are kept (privacy notice)"],
]) {
  if (!filled(key)) warnings.push(`business.json: ${key} is empty (${label})`);
}

const digits = (v) => (v ?? "").replace(/\D/g, "");
if (filled("enterpriseNumber") && !/^[01]\d{9}$/.test(digits(business.enterpriseNumber))) {
  warnings.push("business.json: enterpriseNumber should have 10 digits, e.g. 0123.456.789");
}
if (filled("vatNumber") && !/^BE\s?[01]\d{3}\.?\d{3}\.?\d{3}$/i.test(business.vatNumber.trim())) {
  warnings.push("business.json: vatNumber should look like BE0123.456.789");
}

// DNS: the public mailbox must have mail servers before it is advertised.
const txt = async (name) => (await resolveTxt(name).catch(() => [])).map((r) => r.join(""));
if (filled("publicEmail")) {
  const domain = business.publicEmail.split("@")[1];
  const mx = await resolveMx(domain).catch(() => []);
  if (!mx.length) problems.push(`dns: ${domain} has no MX records, so ${business.publicEmail} cannot receive mail yet`);
}

if (process.argv.includes("--env")) {
  const env = process.env;
  const cal = env.VITE_CAL_URL?.trim() ?? "";
  if (!cal) problems.push("env: VITE_CAL_URL is not set (the Website Audit event link)");
  else if (!/^https:\/\/cal\.com\/[^/]+\/[^/?#]+/.test(cal)) {
    problems.push("env: VITE_CAL_URL should link to one event (cal.com/<user>/<event>), not a profile");
  }
  for (const key of ["RESEND_API_KEY", "CONTACT_EMAIL_TO", "CONTACT_EMAIL_FROM"]) {
    if (!env[key]?.trim()) problems.push(`env: ${key} is not set`);
  }
  if (filled("publicEmail") && env.CONTACT_EMAIL_TO?.trim() && env.CONTACT_EMAIL_TO.trim() !== business.publicEmail.trim()) {
    problems.push(`env: CONTACT_EMAIL_TO is ${env.CONTACT_EMAIL_TO}, expected ${business.publicEmail}`);
  }
  // Resend sends from its own domain (a subdomain such as notify.olerivo.com),
  // which needs Resend's DKIM record before mail is accepted.
  const from = env.CONTACT_EMAIL_FROM?.match(/@([^>\s]+)>?\s*$/)?.[1];
  if (from && !(await txt(`resend._domainkey.${from}`)).length) {
    problems.push(`dns: resend._domainkey.${from} is missing, so Resend cannot send from ${from} yet`);
  }
}

// The built site must not show the previous brand anywhere.
const dist = fileURLToPath(new URL("../artifacts/credlyr/dist/public", import.meta.url));
if (existsSync(dist)) {
  const hits = readdirSync(dist, { recursive: true })
    .filter((f) => /\.(html|js|css|xml|txt|svg|json)$/.test(f))
    .filter((f) => /credyr/i.test(readFileSync(join(dist, f), "utf8")));
  if (hits.length) problems.push(`build: "Credyr" still appears in ${hits.join(", ")}`);
} else {
  console.warn("Note: no production build found; run the build to check it for old branding.");
}

if (warnings.length) console.warn(`Warnings (business details to complete):\n- ${warnings.join("\n- ")}`);
if (problems.length) {
  console.error(`Not ready to launch:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log("Launch check passed.");
