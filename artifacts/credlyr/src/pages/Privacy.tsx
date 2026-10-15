import type { ReactNode } from "react";
import { Link } from "wouter";
import { ART, CONTAINER, PageHero, usePageTitle } from "../components/site";
import { SiteFooter } from "../components/SiteFooter";
import { BUSINESS, businessAddress } from "../lib/business";

// Factual summary of what this website actually collects, based on the code,
// structured around what GDPR Article 13 asks a privacy notice to state.
// Business details come from business.json and are left out while empty.
// It is not a substitute for review by a professional.

const LAST_UPDATED = "15 October 2026";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-[#ece9e3] py-8">
      <h2 className="text-[22px] tracking-[-0.035em] text-[#222221]">{title}</h2>
      <div className="mt-3 space-y-3 text-[16.5px] leading-[1.65] text-[#4f4c48]">{children}</div>
    </div>
  );
}

const A = "text-[#222221] underline underline-offset-2";

function ContactRoute() {
  return BUSINESS.privacyEmail ? (
    <a href={`mailto:${BUSINESS.privacyEmail}`} className={A}>{BUSINESS.privacyEmail}</a>
  ) : (
    <Link href="/contact" className={A}>our contact form</Link>
  );
}

export default function PrivacyPage() {
  usePageTitle("Privacy", "How we handle the information you share through this website.");
  const address = businessAddress();
  return (
    <>
      <main>
        <PageHero
          art={ART.sky}
          position="50% 25%"
          eyebrow="Privacy"
          title="How we handle your information."
          lead="A plain summary of what this website collects, why, and what you can ask us to do with it."
        />
        <section className="bg-white pb-24 md:pb-32">
          <div className={CONTAINER}>
            <div className="max-w-[720px]">
              <Block title="Who is responsible">
                <p>
                  {BUSINESS.legalName ? `${BUSINESS.legalName}${BUSINESS.legalForm ? ` (${BUSINESS.legalForm})` : ""}` : "We"}{" "}
                  {BUSINESS.legalName ? "is" : "are"} responsible for the personal information collected through this
                  website.
                  {address && <> Registered address: {address}.</>}
                  {BUSINESS.enterpriseNumber && <> Enterprise number: {BUSINESS.enterpriseNumber}.</>}
                </p>
                <p>
                  For any question about your information, contact us through <ContactRoute />. Our full business
                  details are on the <Link href="/legal" className={A}>legal information</Link> page.
                </p>
              </Block>

              <Block title="Contact form">
                <p>
                  When you send a message through our contact form, we receive your name, email address, phone number
                  (if you provide it), the topic you choose and your message. We use these details only to reply to
                  you and to discuss working together.
                </p>
                <p>
                  We process them because you asked us to get back to you, as a step before a possible agreement
                  (GDPR Article 6(1)(b)), and because replying to business enquiries is in our legitimate interest
                  (Article 6(1)(f)). Your message reaches our inbox as an email sent through our email delivery
                  provider, Resend. We don’t send automatic emails to the address you enter.
                </p>
              </Block>

              <Block title="Booking a website audit">
                <p>
                  Bookings are handled by Cal.com. When you book, Cal.com processes the details you enter, such as
                  your name, email address and chosen time, and sends your confirmation. We use these details to hold
                  the meeting you asked for (Article 6(1)(b)).
                </p>
              </Block>

              <Block title="Emailing us">
                <p>
                  Email you send us is handled by {BUSINESS.emailProvider ?? "our business email provider"}, and we use
                  it only to reply and to work with you.
                </p>
              </Block>

              <Block title="Hosting">
                <p>
                  This website is hosted by Vercel. Like most hosting providers, Vercel processes technical
                  information such as your IP address to deliver pages and keep the service secure, which is in our
                  legitimate interest (Article 6(1)(f)).
                </p>
              </Block>

              <Block title="Who else receives it">
                <p>
                  Only the service providers named above, who process it on our behalf: Vercel (hosting), Resend
                  (email delivery), Cal.com (scheduling){BUSINESS.emailProvider ? ` and ${BUSINESS.emailProvider} (email)` : ""}.
                  We don’t sell your information or share it for advertising.
                </p>
                <p>
                  Some of these providers are based in the United States. Where information is transferred outside
                  the European Economic Area, it is protected by safeguards such as the EU–U.S. Data Privacy Framework
                  or the European Commission’s standard contractual clauses.
                </p>
              </Block>

              {BUSINESS.enquiryRetention && (
                <Block title="How long we keep it">
                  <p>{BUSINESS.enquiryRetention}</p>
                </Block>
              )}

              <Block title="Cookies and analytics">
                <p>
                  This website itself does not set cookies and does not use analytics or advertising tracking. Our
                  fonts are hosted on this website, so loading a page does not contact third-party font services.
                </p>
                <p>
                  The booking calendar on the website audit page is provided by Cal.com. It loads only when you choose
                  to show available times, and Cal.com may then set its own cookies. Cal.com’s privacy policy applies
                  to that processing.
                </p>
              </Block>

              <Block title="Your rights">
                <p>
                  You can ask to see the information we hold about you, to correct or delete it, to restrict or object
                  to how we use it, or to receive a copy of it. Contact us through <ContactRoute />.
                </p>
                <p>
                  You can also lodge a complaint with the Belgian Data Protection Authority
                  (Gegevensbeschermingsautoriteit / Autorité de protection des données) at{" "}
                  <a href="https://www.dataprotectionauthority.be" target="_blank" rel="noopener noreferrer" className={A}>
                    dataprotectionauthority.be
                  </a>
                  .
                </p>
              </Block>
              <p className="border-t border-[#ece9e3] pt-8 text-[14px] text-[#6b6864]">Last updated {LAST_UPDATED}.</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
