import type { ReactNode } from "react";
import { ART, CONTAINER, PageHero, usePageTitle } from "../components/site";
import { SiteFooter } from "../components/SiteFooter";

// Factual summary of what this website actually collects, based on the code.
// It is not a substitute for a full privacy policy reviewed by a professional.

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-[#ece9e3] py-8">
      <h2 className="text-[22px] tracking-[-0.035em] text-[#222221]">{title}</h2>
      <div className="mt-3 space-y-3 text-[16.5px] leading-[1.65] text-[#4f4c48]">{children}</div>
    </div>
  );
}

export default function PrivacyPage() {
  usePageTitle("Privacy");
  return (
    <>
      <main>
        <PageHero
          art={ART.sky}
          position="50% 25%"
          eyebrow="Privacy"
          title="How we handle your information."
          lead="A plain summary of what this website collects and why."
        />
        <section className="bg-white pb-24 md:pb-32">
          <div className={CONTAINER}>
            <div className="max-w-[720px]">
              <Block title="Contact form">
                <p>
                  When you send a message through our contact form, we receive your name, email address, phone number
                  (if you provide it), the topic you choose and your message. We use these details only to reply to
                  you and to discuss working together.
                </p>
                <p>
                  Submissions are stored in our lead database and sent to us by email. We use service providers for
                  this (Supabase for storage and Resend for email delivery).
                </p>
              </Block>
              <Block title="Booking a website audit">
                <p>
                  Bookings are handled by Cal.com. When you book, Cal.com processes the details you enter, such as
                  your name, email address and chosen time, and sends your confirmation. Cal.com’s own privacy policy
                  applies to that processing.
                </p>
              </Block>
              <Block title="Cookies and analytics">
                <p>
                  This website does not use analytics or advertising cookies. Fonts are loaded from Google Fonts,
                  which means your browser connects to Google’s servers when a page loads.
                </p>
              </Block>
              <Block title="Your choices">
                <p>
                  We don’t sell your information. You can ask us what information we hold about you, or ask us to
                  correct or delete it, by emailing{" "}
                  <a href="mailto:hello@credyr.com" className="text-[#222221] underline">hello@credyr.com</a>.
                </p>
              </Block>
              <p className="border-t border-[#ece9e3] pt-8 text-[14px] text-[#8a8782]">Last updated 12 October 2026.</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
