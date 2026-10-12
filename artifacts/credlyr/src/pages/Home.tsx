import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
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
} from "lucide-react";
import {
  ART,
  BookingVisual,
  ClosingCta,
  ConceptWebsite,
  CONTAINER,
  FollowUpVisual,
  H2,
  LEAD,
  PrimaryButton,
  SectionHeader, usePageTitle } from "../components/site";

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

export default function HomePage() {
  usePageTitle();
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
