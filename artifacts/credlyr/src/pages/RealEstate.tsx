import IndustryPage from "./IndustryPage";
export default function RealEstatePage() {
  return <IndustryPage data={{
    name: "Real Estate",
    tagline: "Agent branding and property sites that generate qualified leads — not just views.",
    description: "In real estate, first impressions happen online. Whether you're an independent agent or a multi-branch agency, your digital presence determines whether buyers and sellers choose you.",
    hero: "realestate",
    painPoints: [
      "Generic agency template that looks like everyone else",
      "No clear personal brand for individual agents",
      "Listing pages that don't capture buyer enquiries",
      "Missing valuation or appraisal lead funnel",
      "No local area SEO presence for key postcodes",
      "Poor mobile experience losing mobile-first buyers",
    ],
    features: [
      { title: "Agent personal brand site", desc: "Your own distinct digital identity — separate from the franchise template — so clients choose you, not just your brand." },
      { title: "Property listing showcase", desc: "Beautiful, fast property listing pages that highlight the best of each home with photography, floorplans, and virtual tours." },
      { title: "Valuation lead funnels", desc: "Conversion-optimised landing pages that turn curious homeowners into booked valuation appointments." },
      { title: "Local area content strategy", desc: "Area guide pages and neighbourhood content that ranks for local search terms and positions you as the area expert." },
      { title: "CRM & portal integration", desc: "Seamless connection to your existing CRM, Rightmove, Zoopla, or OnTheMarket feeds — automated and always up to date." },
      { title: "Testimonial & sold history", desc: "Showcase past sales, client success stories, and response time stats to build immediate credibility with new instructions." },
    ],
    ctaLine: "Ready to build a real estate presence that wins listings and buyers?",
  }} />;
}
