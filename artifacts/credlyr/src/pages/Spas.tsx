import IndustryPage from "./IndustryPage";
export default function SpasPage() {
  return <IndustryPage data={{
    name: "Spas & Wellness",
    tagline: "Serene, premium digital experiences that sell the feeling before guests arrive.",
    description: "Wellness clients decide with their senses. Your website needs to evoke calm, luxury, and care — and then convert that feeling into bookings and gift voucher sales.",
    hero: "spa",
    painPoints: [
      "Website doesn't convey the premium feel of your space",
      "Low online gift voucher sales",
      "Treatment menu that's hard to navigate",
      "No seasonal campaign or promotion capability",
      "Instagram-only presence with no owned channel",
      "Mobile bookings lost to a clunky form or phone call",
    ],
    features: [
      { title: "Immersive, sensory design", desc: "Photography-first layouts, soft colour palettes, and thoughtful typography that communicate luxury before a word is read." },
      { title: "Online gift voucher system", desc: "A seamless purchase flow for digital gift vouchers — perfect for birthdays, anniversaries, and corporate gifting." },
      { title: "Treatment menu with booking", desc: "Beautifully laid out treatments with clear descriptions, durations, pricing, and instant booking capability." },
      { title: "Membership & loyalty pages", desc: "Dedicated pages that sell your membership tiers and recurring package offers with clarity and appeal." },
      { title: "Seasonal campaign landing pages", desc: "Fast-turnaround campaign pages for Valentine's Day, Christmas, Mother's Day and other high-booking windows." },
      { title: "Review & ambience gallery", desc: "Curated photo galleries and testimonials that make first-time visitors feel like they already know your space." },
    ],
    ctaLine: "Ready to build a digital presence as beautiful as your space?",
  }} />;
}
