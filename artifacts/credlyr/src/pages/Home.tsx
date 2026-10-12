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
} from "lucide-react";

// Layout tokens shared by every homepage section (measured from the Duna
// reference: 1120px content column, 44px section headings).
const CONTAINER = "mx-auto w-full max-w-[1120px] px-6 md:px-10 xl:px-0";
const H2 =
  "text-[34px] md:text-[44px] leading-[1.1] tracking-[-0.045em] font-normal text-[#222221]";
const LEAD = "text-[18px] md:text-[20px] leading-[1.45] tracking-[-0.02em] text-[#6b6864]";

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

// ─── Hero ────────────────────────────────────────────────────────────────────
// The painting fills the top of the viewport and dissolves into the page; the
// headline sits on the dissolve. The section uses min-height (never a fixed
// height + overflow-hidden), so short or zoomed viewports grow the section
// instead of clipping its content.

function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-x-clip bg-white"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[92%] md:h-[90%]">
        <img
          src="/editorial-canvas.jpg"
          alt=""
          className="h-full w-full select-none object-cover object-[50%_38%]"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 38%, rgba(255,255,255,0.55) 58%, rgba(255,255,255,0.9) 74%, #fff 92%)",
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
    <section data-testid="positioning-section" className="bg-white pb-10 pt-20 md:pb-16 md:pt-28">
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

// ─── Services ────────────────────────────────────────────────────────────────

interface ServiceBlockProps {
  title: string;
  lead: string;
  href: string;
  linkLabel: string;
  points: { icon: typeof PenTool; title: string; body: string }[];
  visual: ReactNode;
  reverse?: boolean;
}

function ServiceBlock({ title, lead, href, linkLabel, points, visual, reverse }: ServiceBlockProps) {
  return (
    <div className="py-20 md:py-28">
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

// Square beige stage that holds one calm, illustrative composition.
function Stage({ children }: { children: ReactNode }) {
  return (
    <figure className="m-0 w-full max-w-[560px]">
      <div className="relative flex aspect-square w-full items-center justify-center rounded-[24px] bg-[#f1eee8] p-6 sm:p-10">
        {children}
      </div>
      <figcaption className="mt-3 text-[13px] text-[#8a8782]">Illustrative example</figcaption>
    </figure>
  );
}

function WebsiteVisual() {
  return (
    <Stage>
      <div className="w-full max-w-[400px] overflow-hidden rounded-[14px] bg-white shadow-[0_24px_60px_-20px_rgba(40,30,20,0.25)]">
        <div className="flex items-center gap-1.5 border-b border-[#efece6] px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-[#e3dfd8]" />
          <span className="h-2 w-2 rounded-full bg-[#e3dfd8]" />
          <span className="h-2 w-2 rounded-full bg-[#e3dfd8]" />
        </div>
        <div className="relative">
          <img src="/hero-landscape.png" alt="" className="h-[150px] w-full object-cover sm:h-[190px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
          <div className="absolute left-5 right-5 top-4 flex items-center justify-between text-[11px] text-[#2a2826]">
            <span className="font-semibold tracking-[-0.02em]">Hartley Dental</span>
            <span className="rounded-full bg-[#2a2826] px-2.5 py-1 text-[10px] text-white">Book</span>
          </div>
        </div>
        <div className="px-5 pb-6 pt-1">
          <p className="text-[19px] leading-[1.15] tracking-[-0.03em] text-[#222221] sm:text-[22px]">
            Calm, modern dentistry in the heart of Bath.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="whitespace-nowrap rounded-full bg-[#16100c] px-3.5 py-1.5 text-[11.5px] text-white">Book a consultation</span>
            <span className="hidden whitespace-nowrap rounded-full border border-[#e3dfd8] px-3.5 py-1.5 text-[11.5px] text-[#4a4744] min-[420px]:inline-block">Our treatments</span>
          </div>
        </div>
      </div>
    </Stage>
  );
}

function SchedulingVisual() {
  const days = [
    ["Mon", "14"],
    ["Tue", "15"],
    ["Wed", "16"],
    ["Thu", "17"],
  ];
  const times = ["09:30", "11:00", "14:15"];
  return (
    <Stage>
      <div className="w-full max-w-[360px] rounded-[16px] bg-white p-6 shadow-[0_24px_60px_-20px_rgba(40,30,20,0.25)]">
        <p className="text-[18px] tracking-[-0.03em] text-[#222221]">Book a consultation</p>
        <p className="mt-1 text-[13px] text-[#8a8782]">Initial consultation · 30 minutes</p>
        <div className="mt-5 grid grid-cols-4 gap-2 text-center">
          {days.map(([d, n], i) => (
            <div
              key={d}
              className={`rounded-xl py-2.5 ${i === 2 ? "bg-[#16100c] text-white" : "border border-[#ece9e3] text-[#222221]"}`}
            >
              <span className={`block text-[11px] ${i === 2 ? "text-white/70" : "text-[#8a8782]"}`}>{d}</span>
              <span className="mt-0.5 block text-[15px]">{n}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {times.map((t, i) => (
            <div
              key={t}
              className={`rounded-xl px-4 py-2.5 text-[14px] ${i === 1 ? "border border-[#16100c] text-[#222221]" : "border border-[#ece9e3] text-[#4a4744]"}`}
            >
              {t}
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-full bg-[#16100c] py-2.5 text-center text-[13.5px] text-white">Confirm booking</div>
      </div>
    </Stage>
  );
}

function LeadResponseVisual() {
  return (
    <Stage>
      <div className="flex w-full max-w-[380px] flex-col gap-3">
        <div className="rounded-[16px] bg-white/70 p-5 shadow-[0_10px_30px_-18px_rgba(40,30,20,0.3)]">
          <p className="text-[12px] text-[#8a8782]">New enquiry · Website</p>
          <p className="mt-1.5 text-[15px] text-[#222221]">Emma R. — implant consultation</p>
          <p className="mt-1 text-[13.5px] leading-[1.5] text-[#6b6864]">
            “Do you have availability in the next couple of weeks?”
          </p>
        </div>
        <div className="ml-6 rounded-[16px] bg-white p-5 shadow-[0_24px_60px_-20px_rgba(40,30,20,0.28)]">
          <p className="text-[12px] text-[#8a8782]">Reply sent automatically</p>
          <p className="mt-1.5 text-[14.5px] leading-[1.5] text-[#222221]">
            Hi Emma, thank you for getting in touch. You can choose a time for your consultation here,
            or we’ll call you tomorrow morning.
          </p>
          <span className="mt-3 inline-block rounded-full bg-[#16100c] px-3.5 py-1.5 text-[12px] text-white">
            Choose a time
          </span>
        </div>
        <div className="ml-6 flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-[12.5px] text-[#4a4744]">
          <Database size={14} strokeWidth={1.6} aria-hidden="true" />
          Enquiry added to your CRM
        </div>
      </div>
    </Stage>
  );
}

function Services() {
  return (
    <section id="services" data-testid="services-section" className="bg-white">
      <div className={`${CONTAINER} divide-y divide-[#ece9e3]`}>
        <ServiceBlock
          title="Websites and landing pages"
          lead="Bespoke websites that show the quality of your work and guide visitors towards booking."
          href="/product/websites"
          linkLabel="Websites"
          visual={<WebsiteVisual />}
          points={[
            { icon: PenTool, title: "Designed around your practice", body: "Original art direction and copy shaped around your services, your team and your clients." },
            { icon: MousePointerClick, title: "Built to convert", body: "Clear pages, confident calls to action and a route to booking from every page." },
            { icon: Gauge, title: "Fast and accessible", body: "Responsive on every device, quick to load and comfortable to read." },
            { icon: Search, title: "Easy to find", body: "Clean structure and metadata, so search engines understand what you offer." },
          ]}
        />
        <ServiceBlock
          reverse
          title="Appointment scheduling"
          lead="Clients book a consultation in a few taps, at a time that suits them."
          href="/product/booking"
          linkLabel="Scheduling"
          visual={<SchedulingVisual />}
          points={[
            { icon: CalendarDays, title: "Booking on your website", body: "A booking flow that matches your brand, instead of a generic third-party page." },
            { icon: RefreshCw, title: "Works with your calendar", body: "Availability comes from the calendar you already use, so it stays accurate." },
            { icon: BellRing, title: "Confirmations and reminders", body: "Clients receive clear confirmations and reminders before their appointment." },
          ]}
        />
        <ServiceBlock
          title="Lead response and CRM integrations"
          lead="Every enquiry receives a prompt, personal reply and is recorded where your team works."
          href="/product/conversion"
          linkLabel="Lead response"
          visual={<LeadResponseVisual />}
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

function ClosingCta() {
  return (
    // Full-bleed painting that dissolves downward into the dark footer.
    <section
      data-testid="closing-cta-section"
      className="relative isolate flex min-h-[620px] items-center justify-center overflow-hidden bg-[#141312] px-6 pb-36 pt-32 text-center md:min-h-[720px]"
    >
      <img
        src="/hero-landscape.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_35%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 14%, rgba(20,19,18,0.25) 40%, rgba(20,19,18,0.55) 70%, #141312 100%), radial-gradient(ellipse 50% 45% at 50% 52%, rgba(20,19,18,0.35), rgba(20,19,18,0))",
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
      <Services />
      <ClosingCta />
    </main>
  );
}
