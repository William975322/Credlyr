import { Link } from "wouter";
import { ART, CONTAINER, PageHero, usePageTitle } from "../components/site";
import { SiteFooter } from "../components/SiteFooter";
import { BUSINESS, businessAddress } from "../lib/business";

// Business identification that Belgian law expects on a business website
// (Code of Economic Law, book XII). Values come from business.json; rows that
// are still empty are left out, and `pnpm run check:launch` reports them.

export default function LegalPage() {
  usePageTitle("Legal information", "Business and contact details.");
  const rows: [string, string | null][] = [
    ["Business name", BUSINESS.legalName],
    ["Legal form", BUSINESS.legalForm],
    ["Registered address", businessAddress()],
    ["Enterprise number (KBO/BCE)", BUSINESS.enterpriseNumber],
    ["VAT number", BUSINESS.vatNumber && (BUSINESS.vatActive ? BUSINESS.vatNumber : `${BUSINESS.vatNumber} (not active)`)],
    ["Email", BUSINESS.publicEmail],
    ["Phone", BUSINESS.phone],
  ];
  const shown = rows.filter((r): r is [string, string] => Boolean(r[1]));
  return (
    <>
      <main>
        <PageHero art={ART.sky} position="50% 25%" eyebrow="Legal" title="Legal information." />
        <section className="bg-white pb-24 md:pb-32">
          <div className={CONTAINER}>
            <dl className="max-w-[720px]">
              {shown.map(([label, value]) => (
                <div key={label} className="grid grid-cols-1 gap-1 border-t border-[#ece9e3] py-5 sm:grid-cols-[240px_1fr] sm:gap-6">
                  <dt className="text-[15px] text-[#6b6864]">{label}</dt>
                  <dd className="text-[16.5px] text-[#222221]">{value}</dd>
                </div>
              ))}
              <p className="border-t border-[#ece9e3] pt-6 text-[15px] leading-[1.6] text-[#4f4c48]">
                How we handle personal information is described in our{" "}
                <Link href="/privacy" className="text-[#222221] underline underline-offset-2">privacy notice</Link>.
              </p>
            </dl>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
