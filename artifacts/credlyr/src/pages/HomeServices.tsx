import IndustryPage from "./IndustryPage";
export default function HomeServicesPage() {
  return <IndustryPage data={{
    name: "Home Services",
    tagline: "Turn local searches into booked jobs — every single day.",
    description: "Plumbers, electricians, roofers, landscapers — customers Google you first, decide in 30 seconds, and move on. Your website needs to win that moment every time.",
    hero: "homeservices",
    painPoints: [
      "Invisible in local Google searches",
      "No way to capture leads outside of phone calls",
      "Reviews scattered across platforms with no central showcase",
      "No online quoting or instant enquiry capability",
      "Website that looks untrustworthy on mobile",
      "Seasonal gaps in booking not addressed by marketing",
    ],
    features: [
      { title: "Local SEO foundation", desc: "We build your site's structure, content, and schema markup to rank for 'near me' and postcode-specific searches in your trade." },
      { title: "Instant enquiry & quote capture", desc: "Simple, mobile-friendly enquiry forms and quote calculators that turn website visitors into job leads 24/7." },
      { title: "Trust signal display", desc: "Gas Safe, NICEIC, CHAS, Checkatrade, Trustmark — your certifications are displayed prominently where they matter most." },
      { title: "Review aggregation", desc: "Pull your best reviews from Google, Checkatrade, and Trustpilot into a single, persuasive social proof section." },
      { title: "Service area pages", desc: "Individual pages for each town and postcode you cover — so you rank locally everywhere you work, not just where you're based." },
      { title: "Seasonal campaign pages", desc: "Fast-build campaign pages for boiler servicing, gutter clearing, emergency cover, and other seasonal demand spikes." },
    ],
    ctaLine: "Ready to get more jobs from your website than ever before?",
  }} />;
}
