// Pre-launch check: run `pnpm run check:launch` before releasing to production.
//
// Fails when legally required business details are missing from
// artifacts/credlyr/src/business.json. With --env it also checks the
// environment variables the production build and contact form need; run it
// with the production values loaded, e.g. `vercel env pull` then
// `node --env-file=.env.local scripts/check-launch.mjs --env`.

import { readFileSync } from "node:fs";

const business = JSON.parse(readFileSync(new URL("../artifacts/credlyr/src/business.json", import.meta.url), "utf8"));
const problems = [];
const filled = (key) => typeof business[key] === "string" && business[key].trim() !== "";

for (const [key, label] of [
  ["legalName", "legal name of the business"],
  ["legalForm", "legal form (e.g. sole trader, BV/SRL)"],
  ["street", "registered address: street and number"],
  ["postcode", "registered address: postcode"],
  ["city", "registered address: city"],
  ["enterpriseNumber", "enterprise number (KBO/BCE)"],
  ["vatNumber", "VAT number"],
  ["publicEmail", "public contact email (a mailbox that receives mail)"],
  ["enquiryRetention", "how long enquiries are kept (privacy notice)"],
]) {
  if (!filled(key)) problems.push(`business.json: ${key} is empty (${label})`);
}

const digits = (v) => (v ?? "").replace(/\D/g, "");
if (filled("enterpriseNumber") && !/^[01]\d{9}$/.test(digits(business.enterpriseNumber))) {
  problems.push("business.json: enterpriseNumber should have 10 digits, e.g. 0123.456.789");
}
if (filled("vatNumber") && !/^BE\s?[01]\d{3}\.?\d{3}\.?\d{3}$/i.test(business.vatNumber.trim())) {
  problems.push("business.json: vatNumber should look like BE0123.456.789");
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
}

if (problems.length) {
  console.error(`Not ready to launch:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log("Launch check passed.");
