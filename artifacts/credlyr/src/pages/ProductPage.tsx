import { useState } from "react";
import { useRoute, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle,
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
    badge: "Custom Digital Product Design & Development",
    title: "Drive revenues with Custom Digital Product Design & Development",
    subtitle: "Custom Digital Product Design & Development provides conversion-optimized page frameworks designed for speed, clarity, and authority. Hand-coded directly for your brand.",
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
    glanceTitle: "Custom Digital Product Design & Development at a glance",
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
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const accordionItems = [
    {
      title: "Discovery & Scoping",
      desc: "The best results start with collaboration. We'll work together, combining our design expertise with your industry insight to co-create a strategic project roadmap. You'll get full clarity on investment, timeline, and expected outcomes.",
      readMore: true
    },
    {
      title: "UX Research",
      desc: "We gather valuable insights to identify unmet user needs within your market and shape your idea into a digital product that is engaging and useful to the end user."
    },
    {
      title: "Accessibility Audit",
      desc: "Your product should meet or exceed ADA and WCAG AA standards. This ensures your website or app is inclusive, strengthens your SEO, and allows you to reach a wider audience overall.",
      readMore: true
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

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-gray-950 pt-0 pb-0 px-0 flex flex-col justify-between">
      {/* ─── 1. Hero Section ─── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f5f3ec] to-[#fbfaf7] pt-36 pb-20 md:pt-48 md:pb-28 text-center px-5 sm:px-6">
        {/* Soft colorful glow */}
        <div className="absolute inset-0 pointer-events-none opacity-45" style={{
          background: "radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)"
        }} />

        <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
          <h1 className="max-w-4xl text-balance text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.04] tracking-tight font-serif italic font-normal text-gray-950 mb-12">
            We build digital products that win.
          </h1>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-4">
            {/* Card 1: Dashboard */}
            <div className="bg-white rounded-2xl border border-neutral-200/85 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.03)] aspect-[4/3] flex items-center justify-center group hover:scale-[1.01] transition-transform duration-300">
              <img src="/mockup-crm.png" alt="CRM dashboard analytics" className="w-full h-full object-cover" />
            </div>

            {/* Card 2: Keyboard/Keyboard Typing */}
            <div className="bg-white rounded-2xl border border-neutral-200/85 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.03)] aspect-[4/3] flex items-center justify-center group hover:scale-[1.01] transition-transform duration-300">
              <img src="/mockup-calendar.png" alt="Scheduling calendar mockup" className="w-full h-full object-cover" />
            </div>

            {/* Card 3: Mobile Phone/Wallet */}
            <div className="bg-white rounded-2xl border border-neutral-200/85 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.03)] aspect-[4/3] flex items-center justify-center group hover:scale-[1.01] transition-transform duration-300">
              <img src="/mockup-chat.png" alt="Chat and dynamic mobile feeds" className="w-full h-full object-cover" />
            </div>

            {/* Card 4: VR Headset Spatial Canvas */}
            <div className="bg-[#0c0b0a] rounded-2xl border border-neutral-800 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.03)] aspect-[4/3] relative flex flex-col justify-between p-5 text-white text-left group hover:scale-[1.01] transition-transform duration-300">
              <div className="flex justify-between items-center text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                <span>VISION PRO</span>
                <span>90 FPS</span>
              </div>
              <div className="my-auto flex flex-col items-center">
                <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#e8e4db] stroke-current fill-none" strokeWidth="1.5">
                  <path d="M15 45 Q50 35 85 45 Q90 65 50 65 Q10 65 15 45 Z" />
                  <path d="M50 35 V65" strokeDasharray="3 3" />
                </svg>
                <span className="text-[11px] font-mono text-[#e8e4db] mt-3 uppercase tracking-wider">Spatial Canvas</span>
              </div>
              <div className="flex justify-between items-center text-[9px] font-mono text-neutral-500">
                <span>LATENCY 12MS</span>
                <span>ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Platform Edge Section ─── */}
      <section className="bg-white py-24 md:py-32 px-5 sm:px-8 md:px-10 border-t border-b border-neutral-100">
        <div className="max-w-5xl mx-auto text-left">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em] block mb-6">
            YOUR PLATFORMS ARE YOUR EDGE
          </span>
          <p className="text-xl sm:text-2xl md:text-[28px] leading-[1.45] text-neutral-800 font-normal tracking-tight max-w-4xl">
            No matter what industry you&apos;re in, your digital products are at the heart of how you work, how you connect with customers, and how you deliver your services. The best ones win hearts and drive results.
          </p>
          <p className="text-xl sm:text-2xl md:text-[28px] leading-[1.45] text-neutral-800 font-normal tracking-tight max-w-4xl mt-6">
            Unfortunately, your competitors know this too. How do you take the lead? You obsess over what your customers need. Then you move fast, and build better.
          </p>
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em] block mt-16">
            ✦ OUR OFFERING
          </span>
        </div>
      </section>

      {/* ─── 3. Offering Accordion Section (Dark) ─── */}
      <section className="bg-[#0f0e0d] text-white py-24 md:py-32 px-5 sm:px-8 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col">
          
          {/* Adchitects style header block */}
          <div className="border-b border-neutral-800 pb-12 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full">
            <div>
              <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block mb-3">
                CUSTOM DIGITAL PRODUCT DESIGN & DEVELOPMENT
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-[40px] font-sans font-bold tracking-tight text-white leading-none">
                FULL-CYCLE WEBSITES & APPS.
              </h3>
            </div>
            <div>
              <span className="text-neutral-400 text-base md:text-xl font-sans font-bold tracking-tight uppercase leading-none block md:pb-1">
                EXPERIENCE FIRST.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 lg:gap-24 items-start w-full">
            {/* Left Side Info */}
            <div className="sticky top-32">
              <h2 className="text-3xl md:text-4xl lg:text-[52px] font-sans font-bold tracking-tight text-white mb-6 uppercase">
                IDEATE
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base md:text-[17px] leading-relaxed max-w-md font-normal">
                Our creatives are experienced in developing your ideas or inventing new ones. Together, we can explore concepts and shape your idea into plans for a brand-new or improved digital experience.
              </p>
            </div>

            {/* Right Side Interactive List */}
            <div className="flex flex-col gap-1 w-full">
              {accordionItems.map((item, idx) => {
                const isOpen = openAccordion === idx;
                return (
                  <div key={item.title} className="border-b border-neutral-800 py-5 w-full">
                    <button
                      onClick={() => setOpenAccordion(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left cursor-pointer group py-1"
                    >
                      <span className={`text-[17px] md:text-[19px] font-semibold transition-colors duration-200 flex items-center gap-4 ${
                        isOpen ? "text-white" : "text-neutral-500 group-hover:text-neutral-200"
                      }`}>
                        <span className="text-xs">✦</span>
                        {item.title}
                      </span>
                      <ChevronRight
                        size={18}
                        className={`text-neutral-600 transition-transform duration-300 ${isOpen ? "rotate-90 text-white" : ""}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 14 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden pl-8"
                        >
                          <p className="text-sm md:text-[15px] text-neutral-400 leading-relaxed font-normal max-w-xl">
                            {item.desc}
                          </p>
                          {item.readMore && (
                            <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-full mt-4 transition-colors duration-150 cursor-pointer select-none">
                              <span className="w-1 h-1 bg-white rounded-full" />
                              Read more
                            </button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* AI Box */}
              <div className="bg-[#07162c] border border-blue-900/40 rounded-2xl p-6 flex items-start gap-4 mt-10">
                <div className="bg-blue-500/10 rounded-lg p-2 text-blue-400 shrink-0">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                    Building with AI
                  </h4>
                  <p className="text-xs sm:text-[13px] text-blue-200/80 leading-relaxed max-w-xl">
                    From AI-driven development practices to complete native AI integrations, we inject smart sitemaps, dynamic query prompts, and indexing schemas to keep you at the absolute forefront.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. Value Cards Section ─── */}
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

      {/* ─── 6. Final Call to Action ─── */}
      <section className="bg-[#fbfaf7] text-gray-950 py-24 md:py-32 px-5 sm:px-8 md:px-10 text-center relative border-b border-neutral-150/50">
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-balance text-4xl md:text-5xl font-normal tracking-tight text-gray-950 mb-6 leading-tight">
            Ready to integrate Custom Digital Product Design & Development?
          </h2>
          <p className="max-w-[560px] text-[16px] md:text-[18px] text-neutral-600 font-medium leading-relaxed mb-10">
            Build your conversion infrastructure. Schedule a 20-minute onboarding strategy session with William.
          </p>

          <Link href="/get-started" asChild>
            <a className="inline-flex items-center px-8 py-4 bg-black text-white text-[15px] font-semibold rounded-full hover:bg-neutral-850 transition-colors shadow-lg active:scale-[0.98]">
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
                  <CheckCircle className="w-5 h-5 text-neutral-400 shrink-0" />
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
                  <CheckCircle className="w-5 h-5 text-[#00c060] shrink-0 mt-0.5" />
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
                <span>Cal.com Integration</span>
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
