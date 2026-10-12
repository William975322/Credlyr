import { useSearch } from "wouter";
import { ART, PageHero, PrimaryButton, usePageTitle, useNoIndex } from "../components/site";
import { SiteFooter } from "../components/SiteFooter";

// Landing page after a booking (Cal.com "Redirect on booking" →
// /thanks?booked=1) or a message. The URL alone proves nothing, so the copy
// never asserts that a booking exists: Cal.com's confirmation email is the
// source of truth.
export default function ThanksPage() {
  const fromBooking = new URLSearchParams(useSearch()).get("booked") === "1";
  usePageTitle("Thank you");
  useNoIndex();

  return (
    <>
      <main>
        <PageHero
          art={ART.hero}
          position="50% 30%"
          eyebrow={fromBooking ? "Website audit" : "Thank you"}
          title={fromBooking ? "Thank you." : "Thank you for getting in touch."}
          lead={
            fromBooking
              ? "If you’ve just booked a website audit, your confirmation email from Cal.com has the date, time and a link to reschedule. If it hasn’t arrived within a few minutes, please check your spam folder or contact us."
              : "We’ll reply by email."
          }
        >
          <PrimaryButton href="/">Back to the homepage</PrimaryButton>
        </PageHero>
        <div className="h-16 bg-white md:h-24" />
      </main>
      <SiteFooter />
    </>
  );
}
