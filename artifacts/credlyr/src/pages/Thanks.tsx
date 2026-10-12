import { useSearch } from "wouter";
import { ART, PageHero, PrimaryButton, usePageTitle } from "../components/site";
import { SiteFooter } from "../components/SiteFooter";

// Confirmation page. Cal.com can redirect here after a booking with
// `?booked=1` (set in the event's "Redirect on booking" setting); without the
// parameter it acknowledges a message instead.
export default function ThanksPage() {
  const booked = new URLSearchParams(useSearch()).get("booked") === "1";
  usePageTitle(booked ? "Booking confirmed" : "Thank you");

  return (
    <>
      <main>
        <PageHero
          art={ART.hero}
          position="50% 30%"
          eyebrow={booked ? "Booking confirmed" : "Thank you"}
          title={booked ? "Your website audit is booked." : "Thank you for getting in touch."}
          lead={
            booked
              ? "You’ll receive a confirmation email with the details and a link to reschedule if you need to. We look forward to speaking with you."
              : "We’ve received your details and will reply by email."
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
