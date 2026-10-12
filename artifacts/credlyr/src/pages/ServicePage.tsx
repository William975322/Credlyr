import type { ReactNode } from "react";
import { Link, Redirect, useRoute } from "wouter";
import {
  ArrowRight,
  BellRing,
  CalendarClock,
  CalendarDays,
  ClipboardList,
  Database,
  FileText,
  Gauge,
  LayoutTemplate,
  ListChecks,
  MessagesSquare,
  PenTool,
  RefreshCw,
  Search,
  Send,
  UsersRound,
  type LucideIcon,
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
  PageHero,
  PointGrid,
  PrimaryButton,
  Steps, usePageTitle } from "../components/site";
import { SiteFooter } from "../components/SiteFooter";

type ServiceId = "websites" | "booking" | "conversion";

interface Service {
  name: string;
  art: string;
  artPosition: string;
  title: string;
  lead: string;
  visual: ReactNode;
  wideVisual?: boolean;
  includedLead: string;
  included: { icon: LucideIcon; title: string; body: string }[];
  steps: { title: string; body: string }[];
  note?: string;
}

const SERVICES: Record<ServiceId, Service> = {
  websites: {
    name: "Websites and landing pages",
    art: ART.hero,
    artPosition: "50% 30%",
    title: "A website as considered as the care you provide.",
    lead: "We design and build bespoke websites and focused landing pages for clinics, practices and advisory firms. Clear, fast and built to turn visitors into enquiries.",
    visual: <ConceptWebsite />,
    wideVisual: true,
    includedLead: "Everything needed to present your practice well and make the next step obvious.",
    included: [
      { icon: PenTool, title: "Art direction and design", body: "An original visual direction shaped around your practice, not a template with your logo on it." },
      { icon: FileText, title: "Clear, confident copy", body: "We write or refine your copy with you, so every page explains what you do and why it matters." },
      { icon: LayoutTemplate, title: "Focused landing pages", body: "Dedicated pages for a treatment, service or campaign, each with one clear next step." },
      { icon: Gauge, title: "Fast and accessible", body: "Responsive on every device, quick to load and comfortable to read." },
      { icon: Search, title: "Search foundations", body: "Clean structure, metadata, structured data and sitemaps, so search engines understand what you offer." },
      { icon: CalendarDays, title: "Booking and enquiries built in", body: "Ready to connect to appointment scheduling and lead response, so interest turns into appointments." },
    ],
    steps: [
      { title: "Audit", body: "We review your current website and goals, and agree what the new site needs to achieve." },
      { title: "Design", body: "We develop the visual direction, page structure and copy, and refine them with you." },
      { title: "Build", body: "We build the site, test it across devices and connect booking and enquiry forms." },
      { title: "Launch and refine", body: "We launch, check everything works in practice and help you make improvements." },
    ],
  },
  booking: {
    name: "Appointment scheduling",
    art: ART.sky,
    artPosition: "50% 75%",
    title: "Let clients book a consultation in a few taps.",
    lead: "We add appointment scheduling to your website, designed to match your brand and connected to the calendar you already use.",
    visual: <BookingVisual />,
    includedLead: "A booking experience that feels like part of your website, not a detour away from it.",
    included: [
      { icon: CalendarDays, title: "Booking on your website", body: "Clients choose an appointment without leaving your site or waiting for a call back." },
      { icon: RefreshCw, title: "Your calendar, your availability", body: "Availability comes from the calendar you already use, such as Google Calendar or Outlook." },
      { icon: ClipboardList, title: "Appointment types", body: "Separate options for consultations, follow-ups or treatments, each with its own length." },
      { icon: BellRing, title: "Confirmations and reminders", body: "Clients receive a confirmation by email and a reminder before their appointment." },
      { icon: CalendarClock, title: "Easy rescheduling", body: "Clients can reschedule or cancel through their confirmation, so your calendar stays accurate." },
      { icon: UsersRound, title: "The right details up front", body: "A few simple questions help your team prepare before the first appointment." },
    ],
    steps: [
      { title: "Map your appointments", body: "We list your appointment types, durations and who each one is with." },
      { title: "Connect your calendar", body: "We set up availability from the calendar your team already uses." },
      { title: "Design the flow", body: "We design the booking experience into your website, in your brand." },
      { title: "Test and launch", body: "We test bookings, confirmations and reminders end to end before going live." },
    ],
    note: "We usually build on established scheduling tools such as Cal.com, so bookings stay reliable. We’ll recommend the right option for your practice during the audit.",
  },
  conversion: {
    name: "Lead response and CRM integrations",
    art: ART.riverbank,
    artPosition: "50% 55%",
    title: "Reply to every enquiry while interest is high.",
    lead: "When someone gets in touch, they receive a prompt, personal acknowledgement with a simple way to book, and the enquiry is recorded where your team works.",
    visual: <FollowUpVisual />,
    includedLead: "A calm, reliable process behind every enquiry, so nothing depends on someone remembering.",
    included: [
      { icon: Send, title: "Immediate acknowledgement", body: "Every enquiry receives a reply straight away, with a link to choose a time." },
      { icon: MessagesSquare, title: "Written in your voice", body: "We write the messages with you, so they sound like your practice rather than a robot." },
      { icon: Database, title: "Recorded in your CRM", body: "New enquiries are added to your CRM with their details and where they came from." },
      { icon: BellRing, title: "Team notifications", body: "The right person is told about each new enquiry by email or in your team chat." },
      { icon: ListChecks, title: "Clear follow-up", body: "Your team can see who has booked and who still needs a call back." },
      { icon: RefreshCw, title: "Connected to booking", body: "Works together with appointment scheduling, so replies lead straight to a booking." },
    ],
    steps: [
      { title: "Map your enquiries", body: "We look at where enquiries come from today and what happens to them next." },
      { title: "Write the responses", body: "We draft acknowledgements and follow-ups with you, in your voice." },
      { title: "Connect your tools", body: "We connect your forms, email and CRM so every enquiry is captured." },
      { title: "Test and monitor", body: "We test the whole journey and check it keeps working after launch." },
    ],
    note: "We connect to CRMs that offer an API or automation integrations. During the audit we’ll confirm what’s possible with the tools you use.",
  },
};

const ORDER: ServiceId[] = ["websites", "booking", "conversion"];

export default function ServicePage() {
  const [, params] = useRoute("/product/:id");
  const id = params?.id;
  const service = id && id in SERVICES ? SERVICES[id as ServiceId] : undefined;
  usePageTitle(service?.name, service?.lead);
  if (!service) return <Redirect to="/product/websites" replace />;
  const others = ORDER.filter((o) => o !== id);

  return (
    <>
      <main>
        <PageHero art={service.art} position={service.artPosition} eyebrow={service.name} title={service.title} lead={service.lead}>
          <PrimaryButton href="/get-started">Book a website audit</PrimaryButton>
        </PageHero>

        {/* Example */}
        <section className="bg-white pb-20 md:pb-28">
          <div className={CONTAINER}>
            <div className={service.wideVisual ? "" : "mx-auto max-w-[620px]"}>{service.visual}</div>
          </div>
        </section>

        {/* What's included */}
        <section className="bg-white pb-20 md:pb-28">
          <div className={CONTAINER}>
            <div className="max-w-[640px]">
              <h2 className={H2}>What’s included</h2>
              <p className={`${LEAD} mt-4`}>{service.includedLead}</p>
            </div>
            <div className="mt-12">
              <PointGrid points={service.included} />
            </div>
            {service.note && <p className="mt-8 max-w-[640px] text-[15.5px] leading-[1.6] text-[#6b6864]">{service.note}</p>}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-[#f7f4ef] py-20 md:py-28">
          <div className={CONTAINER}>
            <h2 className={H2}>How it works</h2>
            <div className="mt-12">
              <Steps steps={service.steps} />
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="bg-white py-20 md:py-28">
          <div className={CONTAINER}>
            <h2 className={H2}>Works best together</h2>
            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o}
                  href={`/product/${o}`}
                  className="group flex items-center justify-between gap-6 rounded-[20px] border border-[#ece9e3] p-7 transition-colors hover:border-[#222221]"
                >
                  <div>
                    <p className="text-[22px] tracking-[-0.03em] text-[#222221]">{SERVICES[o].name}</p>
                    <p className="mt-1.5 text-[15.5px] leading-[1.5] text-[#6b6864]">{SERVICES[o].title}</p>
                  </div>
                  <ArrowRight size={20} className="shrink-0 text-[#222221] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
