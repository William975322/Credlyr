import { useState } from "react";
import { useRoute, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  X,
  ChevronRight,
  Calendar,
  Clock,
  Check,
  Zap,
  Layers,
  Sparkles,
} from "lucide-react";
import { SiteFooter } from "../App";

// ─── Types and Interfaces ───────────────────────────────────────────────────

interface ProductDetails {
  badge: string;
  title: string;
  subtitle: string;
  
  // Section 1: Modules / Need
  needTitle: string;
  needSubtitle: string;
  needBullets: string[];
  needStackCards: string[];
  
  // Section 2: Conversion / Flow
  convTitle: string;
  convSubtitle: string;
  convBullets: string[];
  convFlowTitle: string;
  convFlowNodes: { label: string; sub?: string }[];
  
  // Section 3: Collect info tabs
  collectTitle: string;
  collectSubtitle: string;
  collectTabs: { title: string; desc: string }[];
  collectMockupSettings: string[];
  collectMockupInfo: string[];
  
  // Section 4: Glance Columns
  glanceTitle: string;
  glanceCols: {
    title: string;
    items: string[];
  }[];
}

// ─── Product Copy Data Dictionary ───────────────────────────────────────────

const PRODUCT_DATA: Record<string, ProductDetails> = {
  "websites": {
    badge: "Full-Cycle Websites",
    title: "A full-service digital innovation partner",
    subtitle: "Our rich design and technology expertise delivers top brands and digital experiences.",
    needTitle: "Everything you need, and more",
    needSubtitle: "Stop losing customers to clunky templates. Access elite, hand-coded layout patterns designed for high performance.",
    needBullets: [
      "Bespoke typography layout",
      "Mathematical grid positioning",
      "Core Web Vitals optimized",
      "Clean semantic HTML5 markup",
      "Custom SVG graphic vectors",
      "Exempt from layout shifting",
      "Secure static CDN hosting",
      "Integrated brand rules",
      "Zero database load lag"
    ],
    needStackCards: [
      "Mobile speed score: 99",
      "Grid alignment logic",
      "Bespoke code structure",
      "Typography: Serif / Sans",
      "Conversion funnel check"
    ],
    convTitle: "Designed for conversion",
    convSubtitle: "We obsess over every detail of the page layout — from the header size to A/B testing triggers. We build speed-heavy conversion systems.",
    convBullets: [
      "Third-party data autofill",
      "Instant page loading speed",
      "Real-time layout validation",
      "Frictionless form flows",
      "Desktop/tablet/mobile sync",
      "Custom interaction tracking",
      "Dynamic layout templates",
      "Micro-interaction triggers",
      "Exit-intent reminders",
      "Smart scheduling prompts"
    ],
    convFlowTitle: "Bespoke Grid Autofill",
    convFlowNodes: [
      { label: "User Landing", sub: "utm_source=direct" },
      { label: "Brand Layout Load", sub: "99 Speed Score" },
      { label: "Interactive Intake", sub: "Autofilled fields" }
    ],
    collectTitle: "Collect all information in one go",
    collectSubtitle: "Provide the right context at the right time — without adding friction to your customer experience.",
    collectTabs: [
      { title: "Bespoke Journeys", desc: "Adapt layouts dynamically based on visitor intent or campaign source to present the ideal proof." },
      { title: "Staged Layouts", desc: "Split longer landing forms into progressive, bite-sized steps to maximize completion rates and cut bounce." },
      { title: "Private Codebase", desc: "Build on isolated static architectures with no shared database or security vulnerabilities." },
      { title: "Multi-Offer Systems", desc: "Present distinct campaigns on dedicated pages while maintaining a single cohesive brand footprint." }
    ],
    collectMockupSettings: ["Risk score: Low", "Region: EU", "Theme: Off-White"],
    collectMockupInfo: ["Custom Product Design", "SEO sitemaps", "SSL security"],
    glanceTitle: "Full-Cycle Websites at a glance",
    glanceCols: [
      { title: "Design", items: ["Bespoke typography", "Mathematical grids", "Custom brand visuals", "Style guidelines", "Dynamic icons", "Animation controls"] },
      { title: "Performance", items: ["Mobile optimized", "Edge CDN routing", "Image compression", "Lighthouse audits", "Static generation", "Zero layout shift"] },
      { title: "SEO Ready", items: ["Metadata structures", "Semantic tags", "XML sitemap auto-gen", "JSON-LD schema", "AI engine readable", "Index guidelines"] },
      { title: "Conversion", items: ["Trust indicators", "Direct call-to-actions", "No nav distractions", "Frictionless checkout", "Social proof grids", "Exit warnings"] },
      { title: "Integrations", items: ["Booking widget hooks", "Stripe payments sync", "CRM pipeline links", "Google Analytics", "Cal.com scheduling", "Zapier webhooks"] }
    ]
  },
  "landing-pages": {
    badge: "Landing Pages",
    title: "Scale campaigns with Landing Pages",
    subtitle: "Create dedicated page layouts per campaign, offer, and audience. Deliver highly tailored arguments that close deals before users exit.",
    needTitle: "Everything you need to convert traffic",
    needSubtitle: "Deploy focused pages for targeted traffic sources. Capture lead interest instantly.",
    needBullets: [
      "Zero exit distraction layouts",
      "Dynamic text replacements",
      "Tailored audience messaging",
      "Multi-campaign setup",
      "Direct CTA alignments",
      "Pixel integrations",
      "Speed optimized assets",
      "Custom contact nodes",
      "Form submissions pipelines"
    ],
    needStackCards: [
      "Offer: Dental Implants",
      "Ad keyword synchronization",
      "Frictionless lead capturing",
      "Tracking pixels validated",
      "Targeted proof loaded"
    ],
    convTitle: "Designed for campaign ROI",
    convSubtitle: "Eliminate standard homepage clutter. Landing pages are built around a single conversion goal and a highly relevant offer.",
    convBullets: [
      "Single conversion path",
      "Zero main nav exits",
      "Dynamic keyword injection",
      "Local review highlights",
      "Direct booking widgets",
      "Autofill form handlers",
      "Mobile touch layouts",
      "Conversion rate tracking",
      "Pixel sync logic",
      "Form trigger alerts"
    ],
    convFlowTitle: "Ad Group Routing",
    convFlowNodes: [
      { label: "Search Ad Click", sub: "utm_term=dentist" },
      { label: "Landing Load", sub: "Headline matches ad" },
      { label: "Lead Submit", sub: "Auto-synced to CRM" }
    ],
    collectTitle: "Manage all landing layouts cleanly",
    collectSubtitle: "Organize layout variations for diverse customer demographics from one dashboard.",
    collectTabs: [
      { title: "Audience Splits", desc: "Vary layouts dynamically based on whether traffic is from Google, Facebook, or direct search." },
      { title: "Keyword Injection", desc: "Match landing titles to referral search keywords to build instant relevance." },
      { title: "Multi-Pixel Sync", desc: "Log conversions across Google, Facebook, and local analytics pipelines simultaneously." },
      { title: "Intake Handlers", desc: "Route details immediately to the designated salesperson for fast call scheduling." }
    ],
    collectMockupSettings: ["Keyword: Implants", "Platform: Adwords", "Target: Local"],
    collectMockupInfo: ["Campaign page", "Lead capture", "Pixel validation"],
    glanceTitle: "Landing Pages at a glance",
    glanceCols: [
      { title: "Marketing", items: ["Audience matching", "Keyword injection", "Dynamic headlines", "Distraction-free", "Single CTA focus", "Custom offers"] },
      { title: "Testing", items: ["Split layout variables", "Headline testing", "CTA position test", "Ad performance logs", "Scroll heatmaps", "Load speed score"] },
      { title: "Analytics", items: ["UTM parameter parse", "Multiple tracking pixels", "Conversion counts", "Bounce stats log", "Lead scoring sync", "API export"] },
      { title: "Setup", items: ["Custom subdomains", "Auto SSL certificates", "Form post routing", "Email forward setup", "Custom analytics", "DNS records config"] },
      { title: "Trust", items: ["Local client quotes", "Google review sync", "Security certificates", "Chamber register link", "Video testimonial grid", "Verified badge"] }
    ]
  },
  "booking": {
    badge: "Appointment Booking",
    title: "Book clients with Appointment Booking",
    subtitle: "Add frictionless, calendar-synced booking interfaces directly into your page layout to capture leads without manual back-and-forth.",
    needTitle: "Everything you need to fill slots",
    needSubtitle: "Let hot prospects schedule a call the second they are ready, syncing directly to your calendar.",
    needBullets: [
      "Cal.com & Calendly sync",
      "Real-time availability lock",
      "Timezone auto detection",
      "Auto confirmations",
      "Reminders & invitations",
      "CRM pipelines update",
      "Custom intake forms",
      "Payment on booking",
      "Buffer time slots logic"
    ],
    needStackCards: [
      "Intake: Dental cleaning",
      "Timezone: America/New_York",
      "Reminders: Active via SMS",
      "Calendar conflict: None",
      "Cal.com webhook: Verified"
    ],
    convTitle: "Designed to cut booking drop-off",
    convSubtitle: "Every extra form field decreases booking rates. We optimize booking widgets to capture essential data and close slots in seconds.",
    convBullets: [
      "Single-screen slot booking",
      "Instant calendar checks",
      "Minimal required fields",
      "Direct pipeline logging",
      "Calendar conflicts blocker",
      "Mobile touch responsive",
      "Frictionless date swipe",
      "Speed widget loading",
      "Custom redirect logic",
      "Auto SMS confirmation"
    ],
    convFlowTitle: "Booking Widget Funnel",
    convFlowNodes: [
      { label: "Slot Clicked", sub: "Monday 10:00 AM" },
      { label: "Intake Complete", sub: "Name & Email checked" },
      { label: "Calendar Synced", sub: "Invite sent automatically" }
    ],
    collectTitle: "Collect qualifying info cleanly",
    collectSubtitle: "Capture details during slot reservation without creating additional entry barriers.",
    collectTabs: [
      { title: "Calendar Sync", desc: "Scan and block host availability across multiple calendars in real time to avoid overlaps." },
      { title: "Custom Intake", desc: "Qualify customers with custom questions (e.g. business budget or practice needs) before confirmation." },
      { title: "Automatic Reminders", desc: "Send automated email and SMS follow-ups to minimize no-show rates." },
      { title: "Deposit Collection", desc: "Collect payments during booking using Stripe integration to commit prospects." }
    ],
    collectMockupSettings: ["Booking type: Cal.com", "Conflict check: Active", "Notifications: SMS"],
    collectMockupInfo: ["Intake data", "Calendar invite", "Stripe payment"],
    glanceTitle: "Appointment Booking at a glance",
    glanceCols: [
      { title: "Scheduling", items: ["Real-time slots", "Multi-calendar sync", "Buffer setup", "Timezone adjustments", "No conflict rules", "Round-robin hosts"] },
      { title: "Automation", items: ["Auto invites", "Email notices", "SMS reminder queues", "Host updates", "Cal cancellations", "Rescheduling hooks"] },
      { title: "Integrations", items: ["Zoom links gen", "Google Meet integration", "Stripe deposit capture", "Hubspot CRM sync", "Developer API", "Cal.com widget"] },
      { title: "UX Layout", items: ["Embedded widgets", "Lightbox popups", "One-click dates", "Mobile optimized", "Intake dropdowns", "Confirmation cards"] },
      { title: "Custom", items: ["Qualifying forms", "Custom branding", "Client redirects", "CSS overrides", "Team calendars", "Audit trails logs"] }
    ]
  },
  "conversion": {
    badge: "Lead Conversion",
    title: "Optimize conversions with Lead Conversion",
    subtitle: "Turn anonymous page traffic into qualified leads with smart form validation, direct CRM synchronization, and automated follow-up triggers.",
    needTitle: "Everything you need to convert leads",
    needSubtitle: "Set up form structures that reduce user friction and capture data cleanly.",
    needBullets: [
      "Smart dynamic fields",
      "Input value auto-formatting",
      "Instant CRM posting",
      "Real-time validation feedback",
      "Lead scoring logic",
      "Anti-spam honeypots",
      "Immediate team notifications",
      "File upload managers",
      "Multi-step progress bars"
    ],
    needStackCards: [
      "Field: Company name",
      "Format check: Validated",
      "CRM sync: Active",
      "Slack notify: Sent",
      "Progress: 100% complete"
    ],
    convTitle: "Designed for rapid follow-ups",
    convSubtitle: "Response times dictate close rates. Lead Conversion sends data to your CRM and notifies your team the millisecond a form is sent.",
    convBullets: [
      "Instant Slack alerts",
      "Direct SMS alerts",
      "Sales rep routing",
      "Auto-assigned pipelines",
      "Form detail printouts",
      "Auto-response templates",
      "Integrations with dialers",
      "Dynamic field logs",
      "UTM tracking captures",
      "Lead source score mapping"
    ],
    convFlowTitle: "Submission Pipeline",
    convFlowNodes: [
      { label: "Form Submit", sub: "Valid fields" },
      { label: "CRM Logged", sub: "Pipedrive / Salesforce" },
      { label: "Team Notified", sub: "Slack alert in 12ms" }
    ],
    collectTitle: "Qualify prospects automatically",
    collectSubtitle: "Collect essential data based on dynamic conditions to route hot leads to correct reps.",
    collectTabs: [
      { title: "Smart Routing", desc: "Forward leads immediately to different agents based on budget, region, or request type." },
      { title: "Auto-Responders", desc: "Fire immediate personalized email responses to let prospects know you're reviewing their details." },
      { title: "Score Qualification", desc: "Score submissions automatically based on company size or budget answers." },
      { title: "Database Sync", desc: "Format and write entries to multiple client database records simultaneously." }
    ],
    collectMockupSettings: ["Lead score: High", "Sales rep: Sarah Chen", "Alerts: Push & SMS"],
    collectMockupInfo: ["Form entries", "CRM record link", "Email receipt"],
    glanceTitle: "Lead Conversion at a glance",
    glanceCols: [
      { title: "Form Core", items: ["Field validation", "Format checks", "File uploads", "Progress trackers", "Honeypot blocks", "Responsive layouts"] },
      { title: "Routing", items: ["Round-robin", "Budget sorting", "Region sorting", "Rep assignments", "Slack channel logs", "SMS alerts"] },
      { title: "Data Sync", items: ["Pipedrive API", "Salesforce CRM", "Hubspot sync", "Zapier webhooks", "Database backups", "Contact sync"] },
      { title: "UX", items: ["Form auto-saves", "Error highlights", "Focus transitions", "Large touch targets", "Help tip tooltips", "Privacy notices"] },
      { title: "Analytics", items: ["UTM parsing", "Funnel analysis", "Field drop-out stats", "Google Ads sync", "A/B testing rules", "Conversion rates"] }
    ]
  },
  "ai-search": {
    badge: "AI Search Ready",
    title: "Structure sites with AI Search Ready",
    subtitle: "Structure your website content so AI answer engines (Perplexity, ChatGPT) and search crawlers index your brand as a primary source.",
    needTitle: "Everything you need for semantic search",
    needSubtitle: "Clean tag and schema architectures that AI index crawlers require.",
    needBullets: [
      "Custom JSON-LD schema",
      "Structured FAQ markup",
      "Semantic HTML5 layers",
      "Clean crawl paths",
      "Direct answers blocks",
      "Registry citation maps",
      "Author credibility tags",
      "Verify authority records",
      "Fast index sitemaps"
    ],
    needStackCards: [
      "JSON-LD: Business profile",
      "Author: W. Vanderplaetse",
      "FAQ markup: Verified",
      "Crawl map: Approved",
      "Citation index: Active"
    ],
    convTitle: "Designed for cited results",
    convSubtitle: "AI engines cite references. We format your copy to clearly showcase proof, credentials, and answers so your site gets cited.",
    convBullets: [
      "Answer engine formatting",
      "Structured table data",
      "Chamber register links",
      "Verified client stats",
      "Schema-based listings",
      "Fast engine crawling",
      "Clear semantic nodes",
      "Domain records setup",
      "Source verification tags",
      "Expert author schemas"
    ],
    convFlowTitle: "AI Index Crawling",
    convFlowNodes: [
      { label: "Engine Crawl", sub: "Perplexity / OpenAI" },
      { label: "JSON-LD Parse", sub: "Corporate registry matches" },
      { label: "Citation Output", sub: "Ranked as primary source" }
    ],
    collectTitle: "Build authority across platforms",
    collectSubtitle: "Provide verify-ready references that answer engine crawlers look for to determine credibility.",
    collectTabs: [
      { title: "Schema Sync", desc: "Auto-synchronize corporate schema blocks across subpages to ensure consistent engine indexing." },
      { title: "Semantic Tags", desc: "Structure text elements cleanly with headers, tables, and definitions so AI engines easily quote them." },
      { title: "Citation Engine", desc: "Integrate direct register credentials and customer statistics to serve as index references." },
      { title: "Author Profiles", desc: "Log author credentials and references to align with Search Quality Evaluator guidelines." }
    ],
    collectMockupSettings: ["Engine: ChatGPT", "Query match: 98%", "Crawl priority: High"],
    collectMockupInfo: ["JSON-LD block", "FAQ sitemaps", "Citation links"],
    glanceTitle: "AI Search Ready at a glance",
    glanceCols: [
      { title: "Search Core", items: ["Meta descriptions", "Clean heading hierarchy", "Image alt tags", "Auto XML sitemaps", "Robots.txt logic", "Pretty URLs"] },
      { title: "AI Indexing", items: ["JSON-LD business schema", "FAQ schema markup", "Citation index lists", "Author records tags", "Verified registries", "Knowledge graphs"] },
      { title: "Core Vitals", items: ["Page response speed", "Lighthouse optimization", "Light bundle size", "Edge hosting CDN", "No script render block", "Image lazy load"] },
      { title: "Structure", items: ["Q&A layout formatting", "Corporate directories", "Team author bio blocks", "Clean anchor lists", "Internal linking maps", "Data tables format"] },
      { title: "Verification", items: ["Chamber registration", "SSL certifications", "Domain validation", "Google search console", "AI agent crawl logs", "Authority indicators"] }
    ]
  },
  "trust-systems": {
    badge: "Trust Systems",
    title: "Build authority with Trust Systems",
    subtitle: "Deploy verified reviews, credentials, security badges, and testimonials in a cohesive, conversion-optimized layout.",
    needTitle: "Everything you need to prove credibility",
    needSubtitle: "Pristine reviews and credentials layout to eliminate visitor hesitation.",
    needBullets: [
      "SOC2 verification indicators",
      "GDPR alignment badges",
      "Google reviews live sync",
      "Chamber registration widgets",
      "Case studies layout cells",
      "Client quotes sliders",
      "Security certificate badges",
      "Trustpilot sync integrations",
      "Verified corporate logs"
    ],
    needStackCards: [
      "Review source: Google",
      "Rating: 5.0 stars",
      "Audit: SOC2 Type II",
      "Trust badge: Active",
      "Sync status: Completed"
    ],
    convTitle: "Designed to remove doubt",
    convSubtitle: "Vague websites trigger buyer hesitation. We build dedicated trust blocks featuring real-time verification to keep buyers moving.",
    convBullets: [
      "Live customer quote sliders",
      "Google Reviews widgets",
      "Verified status badges",
      "Registry lookup indicators",
      "SSL verification bars",
      "Partner logo matrices",
      "Security audit records",
      "Video review embeds",
      "Exemplary success metrics",
      "Client profile links"
    ],
    convFlowTitle: "Reviews Sync Pipeline",
    convFlowNodes: [
      { label: "New Review", sub: "Google Places API" },
      { label: "Score Filtered", sub: "Min 4.8 stars check" },
      { label: "Homepage Loaded", sub: "Formatted proof slider" }
    ],
    collectTitle: "Collect social proof automatically",
    collectSubtitle: "Sync customer feedback and certificates to your website directly from original platforms.",
    collectTabs: [
      { title: "Review Sync", desc: "Connect Google Places or Trustpilot APIs to fetch and format new client ratings automatically." },
      { title: "Certificate Badges", desc: "Synchronize compliance and security certifications directly from validation registries." },
      { title: "Intake Testimonials", desc: "Allow verified customers to write and log reviews directly on your service pages." },
      { title: "Audit Trail Sync", desc: "Display real-time verification indicators linked to state registries." }
    ],
    collectMockupSettings: ["API: Google Places", "Minimum score: 4.8", "Cache timeout: 1 hour"],
    collectMockupInfo: ["Review entries", "GDPR badge check", "Stripe security record"],
    glanceTitle: "Trust Systems at a glance",
    glanceCols: [
      { title: "Social Proof", items: ["Client testimonials", "Star rating modules", "Video reviews cell", "Logo grid matrices", "Success statistics", "Case study cards"] },
      { title: "Security Badges", items: ["SSL certifications", "SOC2 compliance badges", "GDPR badges", "Privacy statements", "Safe processing cards", "Audit reference links"] },
      { title: "Registry Details", items: ["Chamber register code", "State business match", "Google business profile", "Tax / VAT credentials", "Corporate verification", "Registry webhook logs"] },
      { title: "Layouts", items: ["Carousel quote blocks", "Testimonial cards", "Badge grid layouts", "Live overlay banners", "Floating reviews pill", "Custom review templates"] },
      { title: "Pipeline Sync", items: ["Google Reviews API", "Trustpilot API integration", "Auto updates logic", "Audit log cache", "Spam review blocks", "SSL verification check"] }
    ]
  }
};

// ─── Interactive Helper Layouts ───

interface CollapsibleItemProps {
  title: string;
  desc: string;
  isOpen: boolean;
  onToggle: () => void;
}

function CollapsibleItem({ title, desc, isOpen, onToggle }: CollapsibleItemProps) {
  return (
    <div className="border-b border-neutral-200 py-4 w-full">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left cursor-pointer group"
      >
        <span className={`text-[17px] font-semibold transition-colors duration-150 ${isOpen ? "text-gray-950 font-bold" : "text-gray-500 group-hover:text-gray-950"}`}>
          {title}
        </span>
        <ChevronRight
          size={18}
          className={`text-neutral-400 transition-transform duration-250 ${isOpen ? "rotate-90 text-gray-950" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.24, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm md:text-[14.5px] text-neutral-500 leading-relaxed font-normal">
              {desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Websites Bespoke Product Page Component ───────────────────────────────────

function WebsitesProductPage() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [customColor, setCustomColor] = useState("charcoal"); // beige, charcoal, green
  const [activeLang, setActiveLang] = useState("English");

  const accordionItems = [
    {
      title: "Discovery & Scoping",
      desc: "The best results start with collaboration. We'll work together, combining our design expertise with your industry insight to co-create a strategic project roadmap. You'll get full clarity on investment, timeline, and expected outcomes."
    },
    {
      title: "UX Research",
      desc: "We gather valuable insights to identify unmet user needs within your market and shape your idea into a digital product that is engaging and useful to the end user."
    },
    {
      title: "Accessibility Audit",
      desc: "Your product should meet or exceed ADA and WCAG AA standards. This ensures your website or app is inclusive, strengthens your SEO, and allows you to reach a wider audience overall."
    },
    {
      title: "Usability Testing",
      desc: "To make sure your app or website is intuitive and enjoyable to use, we'll test how your end users move through the funnel and identify opportunities to remove friction."
    },
    {
      title: "SEO Audit",
      desc: "We analyze search visibility, page speed, crawl paths, and indexing errors to guarantee your platform ranks as a primary source for search and answer engines."
    }
  ];

  const data = PRODUCT_DATA["websites"];

  const getTabMockupData = (idx: number) => {
    switch (idx) {
      case 0:
        return {
          title: "Roadmap Settings",
          criteria: ["Timeline: 4 weeks", "Scope: Responsive Web", "Deliverables: Figma Files"],
          outputs: ["Expected outcomes", "Investment clear", "Roadmap signed"]
        };
      case 1:
        return {
          title: "User Persona Criteria",
          criteria: ["Target: Service Business", "Region: Europe", "Needs: Instant Booking"],
          outputs: ["Persona mapped", "Friction solved", "Journey validated"]
        };
      case 2:
        return {
          title: "Accessibility Settings",
          criteria: ["ADA Standard: Title III", "WCAG: AA Level", "Testing: Screen Reader"],
          outputs: ["Color contrast pass", "ARIA labels active", "Keyboard nav ready"]
        };
      case 3:
        return {
          title: "Usability Testing Settings",
          criteria: ["Target: 10 Users", "Task: Book Cleaning", "Duration: 5 days"],
          outputs: ["Funnel drop-off cut", "Flow drop solved", "Navigation smoothed"]
        };
      case 4:
      default:
        return {
          title: "SEO Audit Settings",
          criteria: ["Search: Google/AI search", "Crawl path: Sitemap XML", "Schema: JSON-LD"],
          outputs: ["AI engine readable", "Sitemap generated", "Schema verified"]
        };
    }
  };

  const currentMockupData = getTabMockupData(activeTabIdx);

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-gray-950 pt-0 pb-0 px-0 flex flex-col justify-between">
      {/* ─── 1. Hero Section ─── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f5f3ec] to-[#fbfaf7] pt-36 pb-20 md:pt-48 md:pb-28 text-center px-5 sm:px-6">
        {/* Soft colorful glow */}
        <div className="absolute inset-0 pointer-events-none opacity-45" style={{
          background: "radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)"
        }} />

        <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
          <span className="px-4 py-1.5 rounded-full border border-neutral-200 bg-white text-[13px] text-neutral-600 font-semibold mb-6 shadow-sm">
            {data.badge}
          </span>

          <h1 className="max-w-4xl text-balance text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.04] tracking-tight font-serif italic font-normal text-gray-950 mb-6">
            {data.title}
          </h1>

          {/* Subtitle */}
          <p className="max-w-[640px] text-balance text-[17px] sm:text-[19px] md:text-[21px] leading-[1.48] text-neutral-600 font-normal mb-10">
            {data.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Link href="/get-started" asChild>
              <a className="inline-flex items-center px-8 py-3.5 bg-black text-white text-[15px] font-semibold rounded-full hover:bg-neutral-800 transition-colors duration-150 active:scale-[0.98] shadow-sm">
                Schedule a call
              </a>
            </Link>
            <Link href="/get-started" asChild>
              <a className="inline-flex items-center px-8 py-3.5 bg-[#efeeea] border border-neutral-200/80 text-gray-800 text-[15px] font-semibold rounded-full hover:bg-[#e4e3df] transition-colors duration-150 active:scale-[0.98]">
                Watch demo <ArrowUpRight size={14} className="ml-1.5" />
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 2. "Websites" Section ─── */}
      <section className="bg-white py-24 md:py-32 px-5 sm:px-8 md:px-10 border-t border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 items-center text-left">
          {/* Info Column */}
          <div className="flex flex-col items-start">
            <h2 className="text-3xl md:text-4xl lg:text-[46px] font-bold tracking-tight text-gray-950 mb-4 leading-tight">
              Websites
            </h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-normal mb-8 max-w-xl">
              A website is the most important channel to showcase your brand to customers. Our portfolio features award-winning websites designed to give users the best experience possible while also meeting business goals.
            </p>
            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {[
                "Content Strategy",
                "Web Design",
                "Interactive Experiences",
                "Content Production",
                "Frontend & Backend Development",
                "CMS Implementation"
              ].map((bullet) => (
                <div key={bullet} className="flex gap-3 items-center">
                  <Check className="w-5 h-5 text-neutral-400 shrink-0" />
                  <span className="text-sm md:text-[14.5px] text-gray-700 font-semibold">{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Browser Mockup on the right */}
          <div className="bg-[#f5f3ec] border border-[#e6e2da] rounded-[28px] p-6 flex flex-col justify-center items-center relative aspect-[16/10] overflow-hidden select-none">
            {/* Safari/Chrome Browser Frame */}
            <div className="w-full h-full bg-white border border-neutral-200/80 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col">
              {/* Browser bar */}
              <div className="bg-neutral-50 border-b border-neutral-150 px-4 py-2 flex items-center justify-between">
                {/* Window Controls */}
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                {/* Search Bar */}
                <div className="bg-neutral-100 border border-neutral-200/60 rounded-md px-12 py-0.5 text-[9px] text-neutral-400 font-mono flex items-center gap-1">
                  <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-none stroke-current" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>dfinity.org</span>
                </div>
                {/* Spacer */}
                <div className="w-10" />
              </div>

              {/* Website content preview */}
              <div className="flex-1 bg-[#fbfaf7] p-5 flex flex-col justify-between relative">
                {/* Fake website nav */}
                <div className="flex justify-between items-center text-[8px] font-sans font-semibold text-gray-900 border-b border-neutral-200/40 pb-2">
                  <span>∞ dfinity</span>
                  <div className="flex gap-3 text-neutral-400">
                    <span>Developers</span>
                    <span>Ecosystem</span>
                    <span>Community</span>
                  </div>
                </div>

                {/* Body split: left text, right cube */}
                <div className="flex-1 flex items-center justify-between my-2 gap-4">
                  <div className="flex-1 flex flex-col items-start gap-1">
                    <span className="text-[7.5px] font-bold text-indigo-500 uppercase tracking-widest">Internet Computer</span>
                    <h3 className="text-xs sm:text-[13px] font-serif font-bold text-gray-950 leading-tight">
                      Reimagine how you build everything.
                    </h3>
                    <p className="text-[6.5px] text-neutral-400 leading-normal max-w-[120px]">
                      The Internet Computer is a public network that connects billions of people and devices.
                    </p>
                  </div>

                  {/* 3D Geometric Cube SVG */}
                  <div className="w-16 h-16 relative flex items-center justify-center bg-neutral-900 rounded-lg p-2.5 shadow-md">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="1.5">
                      {/* Top Face */}
                      <polygon points="50,15 80,30 50,45 20,30" className="text-indigo-400" fill="rgba(99, 102, 241, 0.1)" />
                      {/* Left Face */}
                      <polygon points="20,30 50,45 50,85 20,70" className="text-purple-400" fill="rgba(168, 85, 247, 0.1)" />
                      {/* Right Face */}
                      <polygon points="50,45 80,30 80,70 50,85" className="text-pink-400" fill="rgba(236, 72, 153, 0.1)" />
                      {/* Grid Lines */}
                      <path d="M50 15 V85 M20 30 L80 70 M80 30 L20 70" className="text-white/20" strokeWidth="1" strokeDasharray="2 2" />
                      {/* Inner Star */}
                      <path d="M50,40 L52,48 L60,50 L52,52 L50,60 L48,52 L40,50 L48,48 Z" className="text-white fill-current" />
                    </svg>
                  </div>
                </div>

                {/* Footer line */}
                <div className="text-[6px] font-mono text-neutral-400 border-t border-neutral-200/40 pt-1.5 flex justify-between">
                  <span>LATENCY 0MS</span>
                  <span>100% DECENTRALIZED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. "Everything you need" Section ─── */}
      <section className="bg-white py-24 md:py-32 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 items-center text-left">
          {/* Info Column */}
          <div className="flex flex-col items-start">
            <h2 className="text-3xl md:text-4xl lg:text-[46px] font-bold tracking-tight text-gray-950 mb-4 leading-tight">
              {data.needTitle}
            </h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-normal mb-8 max-w-xl">
              {data.needSubtitle}
            </p>
            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {data.needBullets.map((bullet) => (
                <div key={bullet} className="flex gap-3 items-center">
                  <Check className="w-5 h-5 text-neutral-400 shrink-0" />
                  <span className="text-sm md:text-[14.5px] text-gray-700 font-semibold">{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Stack Card Mockup */}
          <div className="bg-[#f5f3ec] border border-[#e6e2da] rounded-[28px] p-8 flex flex-col justify-center items-center relative aspect-[16/10] overflow-hidden select-none">
            {/* Layered Card Stack Mockup */}
            <div className="flex flex-col gap-3 w-full max-w-[340px]">
              {data.needStackCards.map((card, idx) => (
                <motion.div
                  key={card}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`bg-white rounded-xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.02)] border flex items-center justify-between transition-all duration-300 ${
                    idx === 2 
                      ? "border-blue-550 shadow-[0_12px_36px_rgba(0,128,255,0.06)] relative z-10 scale-[1.03]" 
                      : "border-neutral-200/60 opacity-80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      idx === 2 ? "bg-blue-500/10 text-blue-600" : "bg-neutral-150 text-neutral-500"
                    }`}>
                      {idx + 1}
                    </div>
                    <span className="text-sm font-semibold text-gray-950">{card}</span>
                  </div>
                  <Check className={`w-4 h-4 ${idx === 2 ? "text-blue-500" : "text-neutral-300"}`} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. "Designed for conversion" Section ─── */}
      <section className="bg-[#fbfaf8] py-24 md:py-32 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center text-left">
          
          {/* Flowchart Mockup Block */}
          <div className="bg-[#f5f3ec] border border-[#e6e2da] rounded-[28px] p-8 flex flex-col justify-between aspect-[16/10] overflow-hidden select-none">
            <div className="flex justify-between items-center border-b border-neutral-200/60 pb-3 mb-4">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">{data.convFlowTitle}</span>
              <span className="text-[9px] font-mono text-neutral-500">Auto Verification</span>
            </div>
            
            {/* Flowchart items and connectors */}
            <div className="flex-1 flex flex-col justify-center gap-4 relative max-w-[280px] mx-auto w-full">
              {data.convFlowNodes.map((node, idx) => (
                <div key={node.label} className="flex flex-col items-center w-full">
                  <div className="bg-white border border-neutral-200 rounded-xl p-3.5 shadow-sm text-center w-full relative z-10 flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-gray-950">{node.label}</span>
                    {node.sub && <span className="text-[10px] text-neutral-400 font-mono">{node.sub}</span>}
                  </div>
                  {idx < data.convFlowNodes.length - 1 && (
                    <div className="w-px h-6 border-l border-dashed border-neutral-350 my-1 relative z-0" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-end border-t border-neutral-200/60 pt-3 mt-4 text-[10px] text-neutral-400 font-mono">
              <span>ACTIVE SYSTEM</span>
              <span>100% CORRECT</span>
            </div>
          </div>

          {/* Text Column */}
          <div className="flex flex-col items-start lg:pl-4">
            <h2 className="text-3xl md:text-4xl lg:text-[46px] font-bold tracking-tight text-gray-950 mb-4 leading-tight">
              {data.convTitle}
            </h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-normal mb-8 max-w-xl">
              {data.convSubtitle}
            </p>
            {/* Bullets */}
            <div className="space-y-4">
              {data.convBullets.slice(0, 5).map((bullet) => (
                <div key={bullet} className="flex gap-3.5 items-start">
                  <Check className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                  <span className="text-[15px] font-semibold text-gray-700">{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. "Collect all information" Tabs Section ─── */}
      <section className="bg-white py-24 md:py-32 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-left">
          {/* Section Header */}
          <div className="max-w-3xl mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-[46px] font-bold tracking-tight text-gray-950 mb-4 leading-tight">
              {data.collectTitle}
            </h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-normal">
              {data.collectSubtitle}
            </p>
          </div>

          {/* Tabs Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-stretch">
            {/* Left Side: Collapsible list */}
            <div className="flex flex-col justify-center">
              {accordionItems.map((tab, idx) => (
                <CollapsibleItem
                  key={tab.title}
                  title={tab.title}
                  desc={tab.desc}
                  isOpen={activeTabIdx === idx}
                  onToggle={() => setActiveTabIdx(idx)}
                />
              ))}
            </div>

            {/* Right Side: Mockup panel */}
            <div className="bg-[#f5f3ec] border border-[#e6e2da] rounded-[28px] p-8 flex flex-col justify-between aspect-[16/10] overflow-hidden select-none">
              <div className="flex justify-between items-center border-b border-neutral-200/60 pb-3">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">Settings Matrix</span>
                <span className="text-[10px] text-[#0080ff] font-bold">Autopiped</span>
              </div>

              {/* Mockup settings mapping layout */}
              <div className="flex-1 flex items-center justify-between gap-6 max-w-[320px] mx-auto w-full my-6">
                {/* Inputs block */}
                <div className="flex flex-col gap-2 flex-1">
                  <div className="text-[9px] font-mono uppercase text-neutral-400 mb-1 font-bold">{currentMockupData.title}</div>
                  {currentMockupData.criteria.map((setting) => (
                    <div key={setting} className="bg-white border rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm">
                      {setting}
                    </div>
                  ))}
                </div>
                {/* Arrow connectors */}
                <div className="flex flex-col justify-center">
                  <svg width="24" height="60" viewBox="0 0 24 60" fill="none" className="text-neutral-300">
                    <path d="M0 15 H14 Q20 15 20 22 V38 Q20 45 14 45 H0" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M20 30 H24" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                {/* Outputs block */}
                <div className="flex flex-col gap-2 flex-1">
                  <div className="text-[9px] font-mono uppercase text-neutral-400 mb-1 font-bold">Checklist Output</div>
                  {currentMockupData.outputs.map((info) => (
                    <div key={info} className="bg-white border border-[#00c060]/30 rounded-lg px-3 py-2 text-xs font-semibold text-gray-950 flex justify-between items-center shadow-sm">
                      <span>{info}</span>
                      <Check className="w-3.5 h-3.5 text-[#00c060]" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-neutral-200/60 pt-3 text-[10px] text-neutral-400 font-mono">
                <span>SECURITY ENCRYPTED</span>
                <span />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. "Fully customizable websites" Section ─── */}
      <section className="bg-[#fbfaf8] py-24 md:py-32 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center text-left">
          
          {/* Left Side: Mockup panel */}
          <div className="bg-[#f5f3ec] border border-[#e6e2da] rounded-[28px] p-8 flex flex-col justify-between aspect-[16/10] overflow-hidden select-none relative">
            <div className="flex justify-between items-center border-b border-neutral-200/60 pb-3">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">Design Editor Preview</span>
              {/* Color swatches */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCustomColor("charcoal")}
                  className={`w-4 h-4 rounded-full bg-[#0c0b0a] border cursor-pointer ${customColor === "charcoal" ? "ring-2 ring-offset-2 ring-blue-500 border-transparent" : "border-neutral-350"}`} 
                />
                <button 
                  onClick={() => setCustomColor("beige")}
                  className={`w-4 h-4 rounded-full bg-[#fbfaf7] border cursor-pointer ${customColor === "beige" ? "ring-2 ring-offset-2 ring-blue-500 border-transparent" : "border-neutral-350"}`} 
                />
                <button 
                  onClick={() => setCustomColor("green")}
                  className={`w-4 h-4 rounded-full bg-[#556b2f] border cursor-pointer ${customColor === "green" ? "ring-2 ring-offset-2 ring-blue-500 border-transparent" : "border-neutral-350"}`} 
                />
              </div>
            </div>

            {/* Simulated Website interface */}
            <div className="flex-1 bg-white border border-neutral-200/80 rounded-xl my-4 p-4 shadow-sm flex flex-col justify-between">
              {/* Fake Nav */}
              <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                <span className="text-xs font-bold text-gray-900 tracking-tight">✦ YourLogo</span>
                <div className="flex gap-2.5 text-[9px] text-neutral-400 font-semibold font-sans">
                  <span>Products</span>
                  <span>About</span>
                  <span>Contact</span>
                </div>
              </div>

              {/* Fake Hero Body */}
              <div className="my-auto py-2 text-center flex flex-col items-center">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Launch fast</span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight tracking-tight max-w-[200px]">
                  Experience trust built directly into the grid.
                </h3>
                {/* Dynamically styled button based on customColor */}
                <button 
                  className={`mt-4 px-4 py-1.5 text-[10px] font-bold text-white rounded-full transition-colors ${
                    customColor === "charcoal" ? "bg-[#0c0b0a] hover:bg-neutral-800" :
                    customColor === "beige" ? "bg-[#8c887d] text-gray-900 hover:bg-[#7a766b]" :
                    "bg-[#556b2f] hover:bg-[#445625]"
                  }`}
                >
                  Book slot
                </button>
              </div>

              {/* Tools row */}
              <div className="flex justify-between items-center pt-2 border-t border-neutral-100 text-[10px] text-neutral-400">
                <div className="flex gap-2">
                  <span className="px-1.5 py-0.5 bg-neutral-100 rounded text-[9px] font-mono">Aa</span>
                  <span className="px-1.5 py-0.5 bg-neutral-100 rounded text-[9px] font-mono">⌘K</span>
                </div>
                <span>Grid: Active</span>
              </div>
            </div>

            <div className="flex justify-between items-end border-t border-neutral-200/60 pt-3 text-[10px] text-neutral-400 font-mono">
              <span>WHITE-LABEL</span>
              <span>100% Custom Style</span>
            </div>
          </div>

          {/* Right Side Text */}
          <div className="flex flex-col items-start lg:pl-4">
            <h2 className="text-3xl md:text-4xl lg:text-[46px] font-bold tracking-tight text-gray-950 mb-4 leading-tight">
              Fully customizable websites
            </h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-normal">
              Leverage extensive brand control: customize colors, typography grids, spacing layouts, and shapes to match the look and feel of your brand. Keep design guidelines consistent across all product pages.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 6. "Global speed, local relevance" Section ─── */}
      <section className="bg-white py-24 md:py-32 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 items-center text-left">
          {/* Left Side Text */}
          <div className="flex flex-col items-start">
            <h2 className="text-3xl md:text-4xl lg:text-[46px] font-bold tracking-tight text-gray-950 mb-4 leading-tight">
              Global speed, local relevance
            </h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-normal mb-8">
              Deploy static pages to edge servers globally for sub-second load times. Seamlessly serve multi-language versions, target local search regions, and integrate localized booking calendars.
            </p>
            <a href="/get-started" className="inline-flex items-center gap-1.5 border border-neutral-350 hover:bg-neutral-50 rounded-full px-5 py-2.5 text-sm text-neutral-700 hover:text-black font-semibold transition-colors duration-150">
              Explore infrastructure <ChevronRight size={14} className="mt-0.5" />
            </a>
          </div>

          {/* Right Side Language list Mockup */}
          <div className="bg-[#f5f3ec] border border-[#e6e2da] rounded-[28px] p-8 flex flex-col justify-between aspect-[16/10] overflow-hidden select-none">
            <div className="flex justify-between items-center border-b border-neutral-200/60 pb-3">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">Active Localization</span>
              <span className="text-[10px] text-[#00c060] font-bold">Edge Auto-Route</span>
            </div>

            {/* Language dropdown select list mockup */}
            <div className="relative max-w-[200px] w-full mx-auto my-4 bg-white border border-neutral-200 shadow-lg rounded-xl overflow-hidden py-1.5">
              {["English", "Deutsch", "Español", "Français", "Italiano", "Nederlands", "Português"].map((lang) => {
                const isActive = activeLang === lang;
                return (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`w-full flex items-center justify-between px-4 py-2 text-xs font-semibold cursor-pointer text-left ${
                      isActive ? "bg-neutral-50 text-gray-950 font-bold" : "text-gray-500 hover:bg-neutral-25 hover:text-gray-950"
                    }`}
                  >
                    <span>{lang}</span>
                    {isActive && <Check className="w-3.5 h-3.5 text-[#00c060]" />}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-end border-t border-neutral-200/60 pt-3 text-[10px] text-neutral-400 font-mono">
              <span>LATENCY: 12MS</span>
              <span>7+ LANGUAGES READY</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. "Understand complex customer journeys" Section ─── */}
      <section className="bg-[#fbfaf8] py-24 md:py-32 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center text-left">
          
          {/* Left Side: Funnel Chart Mockup */}
          <div className="bg-[#f5f3ec] border border-[#e6e2da] rounded-[28px] p-8 flex flex-col justify-between aspect-[16/10] overflow-hidden select-none">
            <div className="flex justify-between items-center border-b border-neutral-200/60 pb-3">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">Conversion Funnel Analytics</span>
              <span className="text-[10px] text-neutral-500">Live feed</span>
            </div>

            {/* Org structure / Funnel representation */}
            <div className="flex-1 flex flex-col justify-center items-center py-4 w-full">
              <div className="flex flex-col gap-2.5 w-full max-w-[280px]">
                <div className="bg-white border rounded-xl p-2.5 shadow-sm text-center font-bold text-xs text-gray-950">
                  Google Search Ad <span className="text-blue-500 font-mono text-[9px] block">Click-thru (100%)</span>
                </div>
                
                <div className="flex justify-center text-neutral-300">
                  <ChevronRight size={16} className="rotate-90" />
                </div>

                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="bg-white border rounded-xl p-2.5 shadow-sm text-center font-bold text-[11px] text-gray-950">
                    Product Page <span className="text-neutral-400 font-mono text-[9px] block">Engagement (45%)</span>
                  </div>
                  <div className="bg-white border rounded-xl p-2.5 shadow-sm text-center font-bold text-[11px] text-gray-950">
                    Trust Block <span className="text-neutral-400 font-mono text-[9px] block">Verification (30%)</span>
                  </div>
                </div>

                <div className="flex justify-center text-neutral-300">
                  <ChevronRight size={16} className="rotate-90" />
                </div>

                <div className="bg-[#00c060]/5 border border-[#00c060]/30 rounded-xl p-2.5 shadow-sm text-center font-bold text-xs text-[#00c060] relative">
                  Calendar Booking <span className="text-[#00c060] font-mono text-[9px] block">Confirmed Appt (12.4%)</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end border-t border-neutral-200/60 pt-3 text-[10px] text-neutral-400 font-mono">
              <span>CONVERSION SCORE: HIGH</span>
              <span>12.4% FUNNEL OUTCOME</span>
            </div>
          </div>

          {/* Right Side Text */}
          <div className="flex flex-col items-start lg:pl-4">
            <h2 className="text-3xl md:text-4xl lg:text-[46px] font-bold tracking-tight text-gray-950 mb-4 leading-tight">
              Understand complex customer journeys
            </h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-normal">
              Trace how traffic converts from the initial search click down to the booked appointment. Sync your analytics pipelines directly to optimize copy layouts and maximize appointment rates without manual tracking.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 8. glance (at a glance) Section ─── */}
      <section className="bg-[#fbfaf8] py-24 md:py-32 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-left">
          
          {/* Section Header */}
          <div className="mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-[46px] font-bold tracking-tight text-gray-950 leading-tight">
              {data.glanceTitle}
            </h2>
          </div>

          {/* 5-Column Checklist Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-12 pt-8 border-t border-neutral-200">
            {data.glanceCols.map((col) => (
              <div key={col.title} className="flex flex-col items-start">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-950 mb-5 border-b border-neutral-200/80 pb-2 w-full">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-3.5 w-full">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-2 items-start text-xs sm:text-[13px] text-neutral-500 font-medium leading-tight">
                      <Check className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-[1px]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. Value Cards Section ─── */}
      <section className="bg-[#fbfaf8] py-24 md:py-32 px-5 sm:px-8 md:px-10 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-neutral-200/60 rounded-3xl p-8 md:p-10 flex flex-col justify-between aspect-[1/1] hover:shadow-md transition-shadow duration-300">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">— 01</span>
              <div>
                <h3 className="text-2xl font-semibold text-gray-950 mb-3 tracking-tight">See the big picture.</h3>
                <p className="text-sm sm:text-[14.5px] text-neutral-500 leading-relaxed">
                  We combine strategy, design and technical excellence. And never sacrifice one for the other.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-neutral-200/60 rounded-3xl p-8 md:p-10 flex flex-col justify-between aspect-[1/1] hover:shadow-md transition-shadow duration-300">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">— 02</span>
              <div>
                <h3 className="text-2xl font-semibold text-gray-950 mb-3 tracking-tight">Own it end to end.</h3>
                <p className="text-sm sm:text-[14.5px] text-neutral-500 leading-relaxed">
                  We build with cross-functional teams who take full responsibility, from idea to impact.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-neutral-200/60 rounded-3xl p-8 md:p-10 flex flex-col justify-between aspect-[1/1] hover:shadow-md transition-shadow duration-300">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">— 03</span>
              <div>
                <h3 className="text-2xl font-semibold text-gray-950 mb-3 tracking-tight">Move faster with AI.</h3>
                <p className="text-sm sm:text-[14.5px] text-neutral-500 leading-relaxed">
                  We use AI to build faster, and better.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. Testimonials (seQura / Plaid Style) ─── */}
      <section className="bg-white py-16 md:py-24 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: seQura */}
          <div className="bg-[#f5f3ec] rounded-3xl p-8 md:p-10 flex flex-col justify-between border border-neutral-200/60 shadow-sm min-h-[260px]">
            <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-gray-900 font-sans italic">
              "Great brands are built on great experiences. Credyr's conversion-optimized UX makes our customer acquisition seamless."
            </p>
            <div className="flex items-center gap-4 mt-8 border-t border-neutral-200/60 pt-6">
              <img 
                src="/pieter-van-der-does.png" 
                alt="David Backstrom" 
                className="w-11 h-11 rounded-full object-cover filter grayscale" 
              />
              <div>
                <h4 className="text-sm font-bold text-gray-950 font-sans">David Backstrom</h4>
                <p className="text-xs text-neutral-500 font-sans">CEO, seQura</p>
              </div>
            </div>
          </div>

          {/* Card 2: Plaid */}
          <div className="bg-[#f5f3ec] rounded-3xl p-8 md:p-10 flex flex-col justify-between border border-neutral-200/60 shadow-sm min-h-[260px]">
            <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-gray-900 font-sans italic">
              "A website used to be a cost center for us. Now, it’s a revenue driver thanks to Credyr’s intuitive custom layouts, enterprise-grade speed and zero code shift."
            </p>
            <div className="flex items-center gap-4 mt-8 border-t border-neutral-200/60 pt-6">
              <img 
                src="/claire-hughes-johnson.png" 
                alt="Zak Lambert" 
                className="w-11 h-11 rounded-full object-cover filter grayscale" 
              />
              <div>
                <h4 className="text-sm font-bold text-gray-950 font-sans">Zak Lambert</h4>
                <p className="text-xs text-neutral-500 font-sans">GM EMEA, Plaid</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 10. Next Up Carousel/List Section ─── */}
      <section className="bg-[#fbfaf8] py-20 md:py-28 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-left">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-950 mb-10 leading-tight">
            Next up
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <Link href="/product/landing-pages" asChild>
              <a className="bg-[#f5f3ec] hover:bg-[#ebe9e3] border border-[#e6e2da] rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[220px] transition-colors duration-200 group">
                <span className="px-2.5 py-1 bg-white border border-neutral-200 rounded-full text-[10px] font-mono uppercase tracking-wider w-fit text-neutral-500 font-bold">
                  Campaigns
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-950 mt-6 group-hover:translate-x-1 transition-transform duration-200">
                  Landing Pages: Build focused pages per offer and audience <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </h3>
              </a>
            </Link>

            {/* Card 2 */}
            <Link href="/product/booking" asChild>
              <a className="bg-[#f5f3ec] hover:bg-[#ebe9e3] border border-[#e6e2da] rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[220px] transition-colors duration-200 group">
                <span className="px-2.5 py-1 bg-white border border-neutral-200 rounded-full text-[10px] font-mono uppercase tracking-wider w-fit text-neutral-500 font-bold">
                  Scheduling
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-950 mt-6 group-hover:translate-x-1 transition-transform duration-200">
                  Appointment Booking: Frictionless timezone-locked calendar booking <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </h3>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 11. Custom Get Started Form (Light Block) ─── */}
      <section className="bg-[#fbfaf7] text-gray-950 py-24 px-5 sm:px-8 md:px-10 border-t border-neutral-150/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center text-left">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-950 mb-6">
              Get started
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-md">
              Learn more about the Credyr platform. Enter your business email and we&apos;ll reach out.
            </p>
          </div>

          <form 
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4 w-full max-w-md"
          >
            <input 
              type="text" 
              placeholder="Name *" 
              required
              className="w-full bg-white border border-neutral-250 rounded-lg px-4 py-3 text-sm text-gray-950 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-transparent transition-all font-semibold"
            />
            <input 
              type="email" 
              placeholder="Business email *" 
              required
              className="w-full bg-white border border-neutral-250 rounded-lg px-4 py-3 text-sm text-gray-950 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-transparent transition-all font-semibold"
            />
            <input 
              type="tel" 
              placeholder="Phone number" 
              className="w-full bg-white border border-neutral-250 rounded-lg px-4 py-3 text-sm text-gray-950 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-transparent transition-all font-semibold"
            />
            <button 
              type="submit"
              className="w-fit mt-2 px-8 py-3 bg-black text-white hover:bg-neutral-800 active:scale-[0.98] transition-all rounded-full font-bold text-sm cursor-pointer shadow-md select-none"
            >
              Schedule a call
            </button>
          </form>
        </div>
      </section>

      {/* Shared Dark Site Footer */}
      <SiteFooter />
    </div>
  );
}

// ─── Main Page Component ───────────────────────────────────────────────────────

export default function ProductPage() {
  const [match, params] = useRoute("/product/:id");
  const id = params?.id || "websites";
  const data = PRODUCT_DATA[id];

  const [activeTabIdx, setActiveTabIdx] = useState(0);

  if (id === "websites") {
    return <WebsitesProductPage />;
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#fbfaf7] flex flex-col justify-between pt-32 text-center px-5">
        <div className="my-auto max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-neutral-500 mb-8">The compliance or conversion offer you requested does not exist or has been updated.</p>
          <Link href="/" asChild>
            <a className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-neutral-800">
              Return Home
            </a>
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-gray-950 pt-0 pb-0 px-0 flex flex-col justify-between">
      
      {/* ─── 1. Hero Section ─── */}
      <section
        data-testid="product-hero"
        className="relative w-full overflow-hidden p-0 m-0 bg-[#fbfaf7] pt-36 pb-20 md:pt-48 md:pb-28 text-center px-5 sm:px-6"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Label tag */}
          <span className="px-4 py-1.5 rounded-full border border-neutral-200 bg-white text-[13px] text-neutral-600 font-semibold mb-6 shadow-sm">
            {data.badge}
          </span>

          {/* Headline */}
          <h1 className="max-w-3xl text-balance text-4xl sm:text-5xl md:text-6xl lg:text-[66px] leading-[1.04] tracking-tight font-bold text-gray-950 mb-6">
            {data.title}
          </h1>

          {/* Subtitle */}
          <p className="max-w-[640px] text-balance text-[17px] sm:text-[19px] md:text-[21px] leading-[1.48] text-neutral-600 font-normal mb-10">
            {data.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Link href="/get-started" asChild>
              <a className="inline-flex items-center px-8 py-3.5 bg-black text-white text-[15px] font-semibold rounded-full hover:bg-neutral-800 transition-colors duration-150 active:scale-[0.98] shadow-sm">
                Schedule a call
              </a>
            </Link>
            <Link href="/get-started" asChild>
              <a className="inline-flex items-center px-8 py-3.5 bg-[#efeeea] border border-neutral-200/80 text-gray-800 text-[15px] font-semibold rounded-full hover:bg-[#e4e3df] transition-colors duration-150 active:scale-[0.98]">
                Watch demo <ArrowUpRight size={14} className="ml-1.5" />
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 2. "Everything you need" Section ─── */}
      <section className="bg-white py-24 md:py-32 px-5 sm:px-8 md:px-10 border-t border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 items-center text-left">
          {/* Info Column */}
          <div className="flex flex-col items-start">
            <h2 className="text-3xl md:text-4xl lg:text-[46px] font-bold tracking-tight text-gray-950 mb-4 leading-tight">
              {data.needTitle}
            </h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-normal mb-8 max-w-xl">
              {data.needSubtitle}
            </p>
            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {data.needBullets.map((bullet) => (
                <div key={bullet} className="flex gap-3 items-center">
                  <Check className="w-5 h-5 text-neutral-400 shrink-0" />
                  <span className="text-sm md:text-[14.5px] text-gray-700 font-semibold">{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Stack Card Mockup */}
          <div className="bg-[#f5f3ec] border border-[#e6e2da] rounded-[28px] p-8 flex flex-col justify-center items-center relative aspect-[16/10] overflow-hidden select-none">
            {/* Layered Card Stack Mockup */}
            <div className="flex flex-col gap-3 w-full max-w-[340px]">
              {data.needStackCards.map((card, idx) => (
                <motion.div
                  key={card}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`bg-white rounded-xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.02)] border flex items-center justify-between transition-all duration-300 ${
                    idx === 2 
                      ? "border-[#0080ff] shadow-[0_12px_36px_rgba(0,128,255,0.06)] relative z-10 scale-[1.03]" 
                      : "border-neutral-200/60 opacity-80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      idx === 2 ? "bg-[#0080ff]/10 text-[#0080ff]" : "bg-neutral-150 text-neutral-500"
                    }`}>
                      {idx + 1}
                    </div>
                    <span className="text-sm font-semibold text-gray-950">{card}</span>
                  </div>
                  <Check className={`w-4 h-4 ${idx === 2 ? "text-[#0080ff]" : "text-neutral-300"}`} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. "Designed for conversion" Section ─── */}
      <section className="bg-[#fbfaf8] py-24 md:py-32 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center text-left">
          
          {/* Flowchart Mockup Block (first in DOM on small screen, but offset to left) */}
          <div className="bg-[#f5f3ec] border border-[#e6e2da] rounded-[28px] p-8 flex flex-col justify-between aspect-[16/10] overflow-hidden select-none">
            <div className="flex justify-between items-center border-b border-neutral-200/60 pb-3 mb-4">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">{data.convFlowTitle}</span>
              <span className="text-[9px] font-mono text-neutral-500">Auto Verification</span>
            </div>
            
            {/* Flowchart items and connectors */}
            <div className="flex-1 flex flex-col justify-center gap-4 relative max-w-[280px] mx-auto w-full">
              {data.convFlowNodes.map((node, idx) => (
                <div key={node.label} className="flex flex-col items-center w-full">
                  <div className="bg-white border border-neutral-200 rounded-xl p-3.5 shadow-sm text-center w-full relative z-10 flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-gray-950">{node.label}</span>
                    {node.sub && <span className="text-[10px] text-neutral-400 font-mono">{node.sub}</span>}
                  </div>
                  {idx < data.convFlowNodes.length - 1 && (
                    <div className="w-px h-6 border-l border-dashed border-neutral-350 my-1 relative z-0" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-end border-t border-neutral-200/60 pt-3 mt-4 text-[10px] text-neutral-400 font-mono">
              <span>ACTIVE SYSTEM</span>
              <span>100% CORRECT</span>
            </div>
          </div>

          {/* Text Column */}
          <div className="flex flex-col items-start lg:pl-4">
            <h2 className="text-3xl md:text-4xl lg:text-[46px] font-bold tracking-tight text-gray-950 mb-4 leading-tight">
              {data.convTitle}
            </h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-normal mb-8 max-w-xl">
              {data.convSubtitle}
            </p>
            {/* Bullets */}
            <div className="space-y-4">
              {data.convBullets.slice(0, 5).map((bullet) => (
                <div key={bullet} className="flex gap-3.5 items-start">
                  <Check className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                  <span className="text-[15px] font-semibold text-gray-700">{bullet}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ─── 4. "Collect all information" Tabs Section ─── */}
      <section className="bg-white py-24 md:py-32 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-left">
          {/* Section Header */}
          <div className="max-w-3xl mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-[46px] font-bold tracking-tight text-gray-950 mb-4 leading-tight">
              {data.collectTitle}
            </h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-normal">
              {data.collectSubtitle}
            </p>
          </div>

          {/* Tabs Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-stretch">
            {/* Left Side: Collapsible list */}
            <div className="flex flex-col justify-center">
              {data.collectTabs.map((tab, idx) => (
                <CollapsibleItem
                  key={tab.title}
                  title={tab.title}
                  desc={tab.desc}
                  isOpen={activeTabIdx === idx}
                  onToggle={() => setActiveTabIdx(idx)}
                />
              ))}
            </div>

            {/* Right Side: Mockup panel */}
            <div className="bg-[#f5f3ec] border border-[#e6e2da] rounded-[28px] p-8 flex flex-col justify-between aspect-[16/10] overflow-hidden select-none">
              <div className="flex justify-between items-center border-b border-neutral-200/60 pb-3">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">Settings Matrix</span>
                <span className="text-[10px] text-[#0080ff] font-bold">Autopiped</span>
              </div>

              {/* Mockup settings mapping layout */}
              <div className="flex-1 flex items-center justify-between gap-6 max-w-[320px] mx-auto w-full my-6">
                {/* Inputs block */}
                <div className="flex flex-col gap-2 flex-1">
                  <div className="text-[9px] font-mono uppercase text-neutral-400 mb-1 font-bold">Dynamic Criteria</div>
                  {data.collectMockupSettings.map((setting) => (
                    <div key={setting} className="bg-white border rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm">
                      {setting}
                    </div>
                  ))}
                </div>
                {/* Arrow connectors */}
                <div className="flex flex-col justify-center">
                  <svg width="24" height="60" viewBox="0 0 24 60" fill="none" className="text-neutral-300">
                    <path d="M0 15 H14 Q20 15 20 22 V38 Q20 45 14 45 H0" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M20 30 H24" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                {/* Outputs block */}
                <div className="flex flex-col gap-2 flex-1">
                  <div className="text-[9px] font-mono uppercase text-neutral-400 mb-1 font-bold">Checklist Output</div>
                  {data.collectMockupInfo.map((info) => (
                    <div key={info} className="bg-white border border-[#00c060]/30 rounded-lg px-3 py-2 text-xs font-semibold text-gray-950 flex justify-between items-center shadow-sm">
                      <span>{info}</span>
                      <Check className="w-3.5 h-3.5 text-[#00c060]" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-neutral-200/60 pt-3 text-[10px] text-neutral-400 font-mono">
                <span>SECURITY ENCRYPTED</span>
                <span />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. glance (at a glance) Section ─── */}
      <section className="bg-[#fbfaf8] py-24 md:py-32 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-left">
          
          {/* Section Header */}
          <div className="mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-[46px] font-bold tracking-tight text-gray-950 leading-tight">
              {data.glanceTitle}
            </h2>
          </div>

          {/* 5-Column Checklist Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-12 pt-8 border-t border-neutral-200">
            {data.glanceCols.map((col) => (
              <div key={col.title} className="flex flex-col items-start">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-950 mb-5 border-b border-neutral-200/80 pb-2 w-full">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-3.5 w-full">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-2 items-start text-xs sm:text-[13px] text-neutral-500 font-medium leading-tight">
                      <Check className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-[1px]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 6. Final Call to Action ─── */}
      <section className="bg-[#fbfaf7] text-gray-950 py-24 md:py-32 px-5 sm:px-8 md:px-10 text-center relative border-b border-neutral-150/50">
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-balance text-4xl md:text-5xl font-normal tracking-tight text-gray-950 mb-6 leading-tight">
            Ready to integrate {data.badge}?
          </h2>
          <p className="max-w-[560px] text-[16px] md:text-[18px] text-neutral-600 font-medium leading-relaxed mb-10">
            Build your conversion infrastructure. Schedule a 20-minute onboarding strategy session with William.
          </p>

          <Link href="/get-started" asChild>
            <a className="inline-flex items-center px-8 py-4 bg-black text-white text-[15px] font-semibold rounded-full hover:bg-neutral-800 transition-colors shadow-lg active:scale-[0.98]">
              Schedule a call <ArrowUpRight size={16} className="ml-2" />
            </a>
          </Link>
        </div>
      </section>

      {/* Shared Dark Site Footer */}
      <SiteFooter />
    </div>
  );
}
