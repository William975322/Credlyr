import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ChevronRight,
  ShieldCheck,
  CalendarCheck,
  MessageSquareReply,
  PenTool,
  MousePointerClick,
  Gauge,
  Search,
  CalendarDays,
  RefreshCw,
  BellRing,
  Send,
  Database,
  ListChecks,
  Check,
  ArrowRight,
} from "lucide-react";

// Layout tokens shared by every homepage section (measured from the Duna
// reference: 1120px content column, 44px section headings).
const CONTAINER = "mx-auto w-full max-w-[1120px] px-6 md:px-10 xl:px-0";
const H2 =
  "text-[34px] md:text-[44px] leading-[1.1] tracking-[-0.045em] font-normal text-[#222221]";
const LEAD = "text-[18px] md:text-[20px] leading-[1.45] tracking-[-0.02em] text-[#6b6864]";

// "The Valley" — one original painted landscape series used across the page.
const ART = {
  hero: "/art/valley-hero.jpg",
  sky: "/art/valley-sky.jpg",
  dusk: "/art/valley-dusk.jpg",
  riverbank: "/art/valley-riverbank.jpg",
};

// Colours of the fictional concept-practice brand shown in the examples.
const CONCEPT_GREEN = "#26372e";
const CONCEPT_SERIF = { fontFamily: "'Fraunces', Georgia, serif" };

function PrimaryButton({ href, children, testId }: { href: string; children: ReactNode; testId?: string }) {
  return (
    <Link
      href={href}
      data-testid={testId}
      className="inline-flex items-center gap-1.5 rounded-full bg-[#16100c] px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
    >
      {children}
      <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
    </Link>
  );
}

function SectionHeader({ title, lead, href, linkLabel }: { title: string; lead: string; href: string; linkLabel: string }) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-[640px]">
        <h2 className={H2}>{title}</h2>
        <p className={`${LEAD} mt-4`}>{lead}</p>
      </div>
      <Link
        href={href}
        className="inline-flex shrink-0 items-center gap-1 self-start rounded-full border border-[#dedad3] px-4 py-2 text-[14px] font-medium text-[#222221] transition-colors hover:border-[#222221] sm:self-auto"
      >
        {linkLabel}
        <ChevronRight size={15} aria-hidden="true" />
      </Link>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
// The painting fills the top of the viewport and dissolves into the page; the
// river leads the eye down into the headline. The section uses min-height
// (never a fixed height + overflow-hidden), so short or zoomed viewports grow
// the section instead of clipping its content.

function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-x-clip bg-white"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[92%] md:h-[90%]">
        <img
          src={ART.hero}
          alt=""
          className="h-full w-full select-none object-cover object-[50%_30%]"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 46%, rgba(255,255,255,0.5) 62%, rgba(255,255,255,0.88) 76%, #fff 90%)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex w-full max-w-[860px] flex-col items-center px-6 pb-[clamp(56px,10vh,112px)] pt-[42svh] text-center"
      >
        <h1 className="text-balance text-[clamp(42px,min(6.2vw,9.5svh),76px)] font-normal leading-[1.02] tracking-[-0.05em] text-[#222221]">
          Websites that turn visitors into customers.
        </h1>
        <p className="mt-6 max-w-[640px] text-balance text-[18px] leading-[1.45] tracking-[-0.02em] text-[#5f5c58] md:text-[22px]">
          We design premium websites for clinics, practices and advisory firms, with booking and
          follow-up built in.
        </p>
        <div className="mt-9">
          <PrimaryButton href="/get-started" testId="button-hero-cta">
            Book a website audit
          </PrimaryButton>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Positioning ─────────────────────────────────────────────────────────────

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Earn trust at first glance",
    body: "Considered design, clear information and visible credentials help visitors feel confident before they call.",
  },
  {
    icon: CalendarCheck,
    title: "Make booking effortless",
    body: "Clients choose a time that suits them, on any device, without phone tag or forms that go nowhere.",
  },
  {
    icon: MessageSquareReply,
    title: "Never let an enquiry go cold",
    body: "Every enquiry gets a prompt, personal reply and lands where your team can follow it up.",
  },
];

function Positioning() {
  return (
    <section data-testid="positioning-section" className="bg-white pb-8 pt-20 md:pb-12 md:pt-28">
      <div className={CONTAINER}>
        <div className="max-w-[640px]">
          <h2 className={H2}>Your website is your first consultation.</h2>
          <p className={`${LEAD} mt-5`}>
            People choosing a dentist, a specialist or an adviser decide quickly who to trust. Most
            service websites make that decision harder than it should be.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 border-t border-[#e8e5df] md:mt-20 md:grid-cols-3">
          {PRINCIPLES.map(({ icon: Icon, title, body }, i) => (
            <div
              key={title}
              className={`py-9 md:py-10 ${i > 0 ? "border-t border-[#e8e5df] md:border-l md:border-t-0 md:pl-8" : ""} ${i < 2 ? "md:pr-8" : ""}`}
            >
              <Icon size={22} strokeWidth={1.5} className="text-[#222221]" aria-hidden="true" />
              <h3 className="mt-6 text-[18px] font-medium tracking-[-0.02em] text-[#222221]">{title}</h3>
              <p className="mt-2 text-[16px] leading-[1.55] text-[#6b6864]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Service 1: Websites — a full-width concept site ─────────────────────────
// A real, responsive mini-site (container queries) rather than a screenshot, so
// it demonstrates craft at every viewport.

function ConceptWebsite() {
  const treatments = [
    ["General dentistry", "Check-ups, fillings and preventive care for the whole family."],
    ["Dental implants", "Permanent, natural-looking replacements, planned with you."],
    ["Hygiene & whitening", "Gentle cleaning and whitening for a healthy, bright smile."],
  ];
  return (
    <figure className="m-0">
      <div className="@container overflow-hidden rounded-[20px] bg-[#fbf8f2] shadow-[0_40px_100px_-40px_rgba(40,30,20,0.35)] ring-1 ring-black/[0.06]">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-black/[0.06] bg-white px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e6e1d9]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e6e1d9]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e6e1d9]" />
          <span className="mx-auto rounded-md bg-[#f4f1ec] px-3 py-1 text-[12px] text-[#8a8782]">Concept design</span>
          <span className="w-[42px]" />
        </div>

        {/* Site navigation */}
        <div className="flex items-center justify-between px-5 py-4 @3xl:px-10 @3xl:py-5">
          <span className="text-[19px] tracking-[-0.02em] @3xl:text-[22px]" style={{ ...CONCEPT_SERIF, color: CONCEPT_GREEN }}>
            Hartley <span className="italic">Dental</span>
          </span>
          <div className="hidden items-center gap-7 text-[14px] text-[#4b4f49] @3xl:flex">
            <span>Treatments</span>
            <span>Our team</span>
            <span>Visit us</span>
          </div>
          <span className="rounded-full px-4 py-2 text-[13px] text-white" style={{ background: CONCEPT_GREEN }}>
            Book a visit
          </span>
        </div>

        {/* Site hero */}
        <div className="grid grid-cols-1 items-center gap-6 px-5 pb-6 pt-2 @3xl:grid-cols-[1fr_1.1fr] @3xl:gap-10 @3xl:px-10 @3xl:pb-10">
          <div>
            <p className="text-[12px] uppercase tracking-[0.14em] text-[#7d7a71]">Private dental practice · Bath</p>
            <p
              className="mt-3 text-[30px] leading-[1.05] tracking-[-0.025em] @3xl:text-[44px] @5xl:text-[52px]"
              style={{ ...CONCEPT_SERIF, color: CONCEPT_GREEN }}
            >
              Calm, modern dentistry in the heart of Bath.
            </p>
            <p className="mt-4 max-w-[400px] text-[15px] leading-[1.55] text-[#5d5f58]">
              Unhurried appointments, clear treatment plans and a team who take time to listen.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[14px] text-white" style={{ background: CONCEPT_GREEN }}>
                Book a consultation <ArrowRight size={14} aria-hidden="true" />
              </span>
              <span className="rounded-full border border-[#d9d4c9] px-5 py-2.5 text-[14px] text-[#3d413b]">Our treatments</span>
            </div>
          </div>
          <img src={ART.riverbank} alt="" className="aspect-[4/3] w-full rounded-[14px] object-cover" loading="lazy" />
        </div>

        {/* Treatments row */}
        <div className="grid grid-cols-1 gap-3 border-t border-black/[0.05] bg-white px-5 py-5 @3xl:grid-cols-3 @3xl:gap-5 @3xl:px-10 @3xl:py-8">
          {treatments.map(([t, d]) => (
            <div key={t} className="rounded-[12px] bg-[#fbf8f2] p-4 @3xl:p-5">
              <p className="text-[17px] tracking-[-0.01em]" style={{ ...CONCEPT_SERIF, color: CONCEPT_GREEN }}>{t}</p>
              <p className="mt-1.5 text-[13.5px] leading-[1.5] text-[#6b6d66]">{d}</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-[13px] text-[#8a8782]">
        Concept design for illustration. Not a client project.
      </figcaption>
    </figure>
  );
}

const WEBSITE_POINTS = [
  { icon: PenTool, title: "Designed around your practice", body: "Original art direction and copy shaped around your services, team and clients." },
  { icon: MousePointerClick, title: "Built to convert", body: "Clear pages, confident calls to action and a route to booking from every page." },
  { icon: Gauge, title: "Fast and accessible", body: "Responsive on every device, quick to load and comfortable to read." },
  { icon: Search, title: "Easy to find", body: "Clean structure and metadata, so search engines understand what you offer." },
];

function WebsitesSection() {
  return (
    <section id="services" data-testid="services-section" className="bg-white py-20 md:py-28">
      <div className={CONTAINER}>
        <SectionHeader
          title="Websites and landing pages"
          lead="Bespoke websites that show the quality of your work and guide visitors towards booking."
          href="/product/websites"
          linkLabel="Websites"
        />
        <div className="mt-12 md:mt-16">
          <ConceptWebsite />
        </div>
        <ul className="mt-14 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {WEBSITE_POINTS.map(({ icon: Icon, title, body }) => (
            <li key={title} className="border-t border-[#ece9e3] py-6">
              <Icon size={20} strokeWidth={1.6} className="text-[#222221]" aria-hidden="true" />
              <h3 className="mt-4 text-[17px] font-medium tracking-[-0.02em] text-[#222221]">{title}</h3>
              <p className="mt-1.5 text-[15px] leading-[1.55] text-[#6b6864]">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Painted interlude ───────────────────────────────────────────────────────
// Full-bleed sky from the Valley series; dissolves in and out of the white page
// and bridges "website" to "what happens after someone is interested".

function Interlude() {
  return (
    <section data-testid="interlude-section" className="relative isolate flex min-h-[620px] items-center justify-center overflow-hidden px-6 py-36 text-center md:min-h-[760px]">
      <img src={ART.sky} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_80%]" loading="lazy" />
      <div
        aria-hidden="true"
        className="absolute -inset-y-[2px] inset-x-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0) 18%, rgba(255,255,255,0) 82%, #fff 100%)",
        }}
      />
      <div className="max-w-[680px]">
        <h2 className="text-balance text-[36px] font-normal leading-[1.08] tracking-[-0.045em] text-[#222221] md:text-[52px]">
          A beautiful website is only the beginning.
        </h2>
        <p className="mx-auto mt-5 max-w-[540px] text-balance text-[18px] leading-[1.5] text-[#4f4c48] md:text-[20px]">
          We connect it to booking and follow-up, so the interest your website creates becomes
          appointments in your calendar.
        </p>
      </div>
    </section>
  );
}

// ─── Services 2 & 3 ──────────────────────────────────────────────────────────

interface SplitBlockProps {
  title: string;
  lead: string;
  href: string;
  linkLabel: string;
  points: { icon: typeof PenTool; title: string; body: string }[];
  visual: ReactNode;
  reverse?: boolean;
}

function SplitBlock({ title, lead, href, linkLabel, points, visual, reverse }: SplitBlockProps) {
  return (
    <div className="py-20 md:py-28">
      <SectionHeader title={title} lead={lead} href={href} linkLabel={linkLabel} />
      <div className="mt-12 grid grid-cols-1 items-center gap-10 md:mt-16 lg:grid-cols-2 lg:gap-16">
        <div className={reverse ? "lg:order-2" : ""}>{visual}</div>
        <ul className={`flex flex-col ${reverse ? "lg:order-1" : ""}`}>
          {points.map(({ icon: Icon, title: t, body }, i) => (
            <li key={t} className={`flex gap-4 py-5 ${i > 0 ? "border-t border-[#ece9e3]" : ""}`}>
              <Icon size={20} strokeWidth={1.6} className="mt-0.5 shrink-0 text-[#222221]" aria-hidden="true" />
              <div>
                <h3 className="text-[17px] font-medium tracking-[-0.02em] text-[#222221]">{t}</h3>
                <p className="mt-1 text-[15.5px] leading-[1.55] text-[#6b6864]">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// A painted stage from the Valley series holding one calm composition. The art
// is clipped in its own layer so the foreground content can never be clipped.
function PaintedStage({ art, position, children }: { art: string; position: string; children: ReactNode }) {
  return (
    <figure className="m-0 w-full">
      <div className="relative isolate flex min-h-[520px] w-full items-center justify-center px-5 py-12 sm:px-10 lg:aspect-square lg:min-h-0">
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden rounded-[24px]">
          <img src={art} alt="" className="h-full w-full object-cover" style={{ objectPosition: position }} loading="lazy" />
          <div className="absolute inset-0 bg-white/10" />
        </div>
        {children}
      </div>
      <figcaption className="mt-3 text-[13px] text-[#8a8782]">Illustrative example</figcaption>
    </figure>
  );
}

function BookingVisual() {
  const days = [
    ["Mon", "14"],
    ["Tue", "15"],
    ["Wed", "16"],
    ["Thu", "17"],
    ["Fri", "18"],
  ];
  const times = ["09:00", "09:30", "11:00", "13:45", "15:15", "16:30"];
  return (
    <PaintedStage art={ART.sky} position="50% 100%">
      <div className="relative w-full max-w-[380px]">
        <div className="rounded-[18px] bg-white p-6 shadow-[0_30px_70px_-25px_rgba(60,40,20,0.35)]">
          <p className="text-[14px]" style={{ ...CONCEPT_SERIF, color: CONCEPT_GREEN }}>
            Hartley <span className="italic">Dental</span>
          </p>
          <p className="mt-4 text-[20px] tracking-[-0.03em] text-[#222221]">Choose a time</p>
          <p className="mt-0.5 text-[14px] text-[#7a776f]">New patient consultation · 30 minutes</p>
          <div className="mt-5 grid grid-cols-5 gap-1.5 text-center">
            {days.map(([d, n], i) => (
              <div
                key={d}
                className={`rounded-xl py-2 ${i === 2 ? "text-white" : "bg-[#f6f3ee] text-[#222221]"}`}
                style={i === 2 ? { background: CONCEPT_GREEN } : undefined}
              >
                <span className={`block text-[11px] ${i === 2 ? "text-white/70" : "text-[#8a8782]"}`}>{d}</span>
                <span className="block text-[15px]">{n}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {times.map((t) => (
              <div
                key={t}
                className={`rounded-xl py-2.5 text-center text-[14px] ${t === "11:00" ? "font-medium" : "text-[#4a4744]"}`}
                style={t === "11:00" ? { boxShadow: `inset 0 0 0 1.5px ${CONCEPT_GREEN}`, color: CONCEPT_GREEN } : { boxShadow: "inset 0 0 0 1px #ebe7e0" }}
              >
                {t}
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-full py-3 text-center text-[14px] text-white" style={{ background: CONCEPT_GREEN }}>
            Confirm Wednesday at 11:00
          </div>
        </div>
        <div className="absolute -bottom-6 -right-3 flex items-center gap-2.5 rounded-full bg-white py-2.5 pl-2.5 pr-4 text-[13.5px] text-[#222221] shadow-[0_18px_40px_-16px_rgba(60,40,20,0.4)] sm:-right-8">
          <span className="flex h-6 w-6 items-center justify-center rounded-full text-white" style={{ background: CONCEPT_GREEN }}>
            <Check size={14} strokeWidth={2.5} aria-hidden="true" />
          </span>
          Booked. Confirmation sent by email.
        </div>
      </div>
    </PaintedStage>
  );
}

function FollowUpVisual() {
  return (
    <PaintedStage art={ART.hero} position="50% 60%">
      <div className="flex w-full max-w-[400px] flex-col gap-3">
        <div className="rounded-[16px] bg-white/85 p-5 shadow-[0_14px_36px_-20px_rgba(60,40,20,0.4)] backdrop-blur-sm">
          <p className="text-[13px] text-[#7a776f]">New enquiry from your website</p>
          <p className="mt-1 text-[16px] text-[#222221]">Emma R. · Implant consultation</p>
          <p className="mt-1.5 text-[14px] leading-[1.5] text-[#5d5a55]">
            “Do you have availability in the next couple of weeks?”
          </p>
        </div>
        <div className="rounded-[16px] bg-white p-5 shadow-[0_30px_70px_-25px_rgba(60,40,20,0.4)] sm:ml-8">
          <div className="flex items-center justify-between">
            <p className="text-[14px]" style={{ ...CONCEPT_SERIF, color: CONCEPT_GREEN }}>
              Hartley <span className="italic">Dental</span>
            </p>
            <p className="text-[12px] text-[#8a8782]">Sent automatically</p>
          </div>
          <p className="mt-3 text-[16px] text-[#222221]">Thank you for getting in touch, Emma</p>
          <p className="mt-1.5 text-[14px] leading-[1.55] text-[#5d5a55]">
            You can choose a time for your consultation below, or we’ll call you tomorrow morning.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] text-white" style={{ background: CONCEPT_GREEN }}>
            Choose a time <ArrowRight size={13} aria-hidden="true" />
          </span>
        </div>
        <div className="flex items-center gap-2.5 self-start rounded-full bg-white/90 py-2.5 pl-3 pr-4 text-[13.5px] text-[#222221] shadow-[0_14px_30px_-16px_rgba(60,40,20,0.4)] sm:ml-8">
          <Database size={15} strokeWidth={1.7} aria-hidden="true" />
          Added to your CRM · awaiting booking
        </div>
      </div>
    </PaintedStage>
  );
}

function FollowThroughSection() {
  return (
    <section className="bg-white">
      <div className={`${CONTAINER} divide-y divide-[#ece9e3]`}>
        <SplitBlock
          reverse
          title="Appointment scheduling"
          lead="Clients book a consultation in a few taps, at a time that suits them."
          href="/product/booking"
          linkLabel="Scheduling"
          visual={<BookingVisual />}
          points={[
            { icon: CalendarDays, title: "Booking on your website", body: "A booking flow that matches your brand, instead of a generic third-party page." },
            { icon: RefreshCw, title: "Works with your calendar", body: "Availability comes from the calendar you already use, so it stays accurate." },
            { icon: BellRing, title: "Confirmations and reminders", body: "Clients receive clear confirmations and reminders before their appointment." },
          ]}
        />
        <SplitBlock
          title="Lead response and CRM integrations"
          lead="Every enquiry receives a prompt, personal reply and is recorded where your team works."
          href="/product/conversion"
          linkLabel="Lead response"
          visual={<FollowUpVisual />}
          points={[
            { icon: Send, title: "Immediate acknowledgement", body: "Enquirers get a thoughtful reply straight away, with a simple way to book." },
            { icon: Database, title: "Connected to your CRM", body: "New enquiries are added to your CRM with their details and where they came from." },
            { icon: ListChecks, title: "Clear follow-up", body: "Your team can see who needs a call back, so nothing slips through." },
          ]}
        />
      </div>
    </section>
  );
}

// ─── Closing CTA ─────────────────────────────────────────────────────────────
// The valley at dusk; its dark meadow continues into the footer colour.

function ClosingCta() {
  return (
    <section
      data-testid="closing-cta-section"
      className="relative isolate flex min-h-[640px] items-start justify-center overflow-hidden bg-[#161a1e] px-6 pb-56 pt-36 text-center md:min-h-[760px] md:pt-44"
    >
      <img src={ART.dusk} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_45%]" loading="lazy" />
      <div
        aria-hidden="true"
        className="absolute -inset-y-[2px] inset-x-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0) 14%, rgba(22,26,30,0) 60%, rgba(22,26,30,0.6) 82%, #161a1e 100%)",
        }}
      />
      <div className="max-w-[640px]">
        <h2 className="text-balance text-[36px] font-normal leading-[1.08] tracking-[-0.045em] text-white md:text-[52px]">
          See what your website could be.
        </h2>
        <p className="mx-auto mt-5 max-w-[520px] text-balance text-[18px] leading-[1.5] text-white/85 md:text-[20px]">
          Book a website audit. We’ll review your current site, show where enquiries are lost and
          suggest what to improve first.
        </p>
        <Link
          href="/get-started"
          data-testid="button-closing-cta"
          className="mt-9 inline-flex items-center gap-1.5 rounded-full bg-white px-6 py-3.5 text-[15px] font-medium text-[#16100c] transition-colors hover:bg-neutral-100"
        >
          Book a website audit
          <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Positioning />
      <WebsitesSection />
      <Interlude />
      <FollowThroughSection />
      <ClosingCta />
    </main>
  );
}
