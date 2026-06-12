import IndustryPage from "./IndustryPage";
export default function DentalPage() {
  return <IndustryPage data={{
    name: "Dental Practices",
    tagline: "More booked appointments. Fewer no-shows. A practice website that actually works.",
    description: "Your website should be your best patient acquisition tool — not a digital brochure. We build dental websites that convert first-time visitors into booked appointments.",
    hero: "dental",
    painPoints: [
      "Low website traffic that doesn't convert to bookings",
      "No clear before/after or treatment showcase",
      "Missing local trust signals (Google, NHS, reviews)",
      "Mobile experience that drives patients away",
      "No automated follow-up for missed appointments",
      "Slow page load hurting your Google ranking",
    ],
    features: [
      { title: "Conversion-first design", desc: "Every page element is designed to guide visitors toward booking — not just browsing. CTAs, trust signals, and urgency built in." },
      { title: "Local SEO structure", desc: "We structure your site so Google understands your location, treatments, and reviews — getting you found by patients in your area." },
      { title: "Treatment showcase pages", desc: "Dedicated, SEO-optimised pages for implants, whitening, Invisalign, and other high-value treatments." },
      { title: "Review & trust integration", desc: "Automatically surface your Google reviews and verified testimonials so new patients feel confident booking immediately." },
      { title: "Mobile-first booking flow", desc: "A frictionless mobile experience that lets patients request appointments in under 60 seconds — from any device." },
      { title: "Speed-optimised build", desc: "Core Web Vitals-optimised builds that load fast, rank higher, and keep impatient visitors from bouncing." },
    ],
    ctaLine: "Ready to turn your website into your best-performing team member?",
  }} />;
}
