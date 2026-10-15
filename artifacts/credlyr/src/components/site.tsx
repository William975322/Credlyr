import { useEffect, type ReactNode } from "react";
import { Link } from "wouter";
import { ChevronRight, Check, ArrowRight, Database, type LucideIcon } from "lucide-react";

// Layout tokens shared by every homepage section (measured from the Duna
// reference: 1120px content column, 44px section headings).
export const CONTAINER = "mx-auto w-full max-w-[1120px] px-6 md:px-10 xl:px-0";

export const H2 =
  "text-[34px] md:text-[44px] leading-[1.1] tracking-[-0.045em] font-normal text-[#222221]";

export const LEAD = "text-[18px] md:text-[20px] leading-[1.45] tracking-[-0.02em] text-[#6b6864]";

// "The Valley" — one original painted landscape series used across the page.
export const ART = {
  hero: "/art/valley-hero.jpg",
  sky: "/art/valley-sky.jpg",
  dusk: "/art/valley-dusk.jpg",
  riverbank: "/art/valley-riverbank.jpg",
};

// Colour along the top edge of each painting as it is cropped in the heroes.
// macOS and iOS paint this above the page when it is pulled down at the top
// (rubber-band overscroll), so the sky continues instead of revealing white.
const ART_TOP_EDGE: Record<string, string> = {
  [ART.hero]: "#f9d2b5",
  [ART.sky]: "#fbeacf",
  [ART.riverbank]: "#f6e1c8",
};

/** Sets the overscroll colour above the page to match the hero painting. */
export function useOverscrollTop(art: string) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--overscroll-top", ART_TOP_EDGE[art] ?? "#ffffff");
    return () => {
      root.style.removeProperty("--overscroll-top");
    };
  }, [art]);
}

// Colours of the fictional concept-practice brand shown in the examples.
export const CONCEPT_GREEN = "#26372e";

export const CONCEPT_SERIF = { fontFamily: "'Fraunces', Georgia, serif" };

export function PrimaryButton({ href, children, testId }: { href: string; children: ReactNode; testId?: string }) {
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

export function SectionHeader({ title, lead, href, linkLabel }: { title: string; lead: string; href: string; linkLabel: string }) {
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

// ─── Service 1: Websites — a full-width concept site ─────────────────────────
// A real, responsive mini-site (container queries) rather than a screenshot, so
// it demonstrates craft at every viewport.

export function ConceptWebsite() {
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
          <span className="mx-auto rounded-md bg-[#f4f1ec] px-3 py-1 text-[12px] text-[#6f6c66]">Concept design</span>
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
            <p className="text-[12px] uppercase tracking-[0.14em] text-[#6b6864]">Private dental practice · Bath</p>
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
      <figcaption className="mt-3 text-[13px] text-[#6f6c66]">
        Concept design for a fictional practice. Not a client project.
      </figcaption>
    </figure>
  );
}

// A painted stage from the Valley series holding one calm composition. The art
// is clipped in its own layer so the foreground content can never be clipped.
export function PaintedStage({ art, position, caption, children }: { art: string; position: string; caption: string; children: ReactNode }) {
  return (
    <figure className="m-0 w-full">
      <div className="relative isolate flex min-h-[520px] w-full items-center justify-center px-5 py-12 sm:px-10 lg:aspect-square lg:min-h-0">
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden rounded-[24px]">
          <img src={art} alt="" className="h-full w-full object-cover" style={{ objectPosition: position }} loading="lazy" />
          <div className="absolute inset-0 bg-white/10" />
        </div>
        {children}
      </div>
      <figcaption className="mt-3 text-[13px] text-[#6f6c66]">{caption}</figcaption>
    </figure>
  );
}

export function BookingVisual() {
  const days = [
    ["Mon", "14"],
    ["Tue", "15"],
    ["Wed", "16"],
    ["Thu", "17"],
    ["Fri", "18"],
  ];
  const times = ["09:00", "09:30", "11:00", "13:45", "15:15", "16:30"];
  return (
    <PaintedStage art={ART.sky} position="50% 100%" caption="Illustrative example for a fictional practice. Not a real booking.">
      <div className="relative w-full max-w-[380px]">
        <div className="rounded-[18px] bg-white p-6 shadow-[0_30px_70px_-25px_rgba(60,40,20,0.35)]">
          <p className="text-[14px]" style={{ ...CONCEPT_SERIF, color: CONCEPT_GREEN }}>
            Hartley <span className="italic">Dental</span>
          </p>
          <p className="mt-4 text-[20px] tracking-[-0.03em] text-[#222221]">Choose a time</p>
          <p className="mt-0.5 text-[14px] text-[#6b6864]">New patient consultation · 30 minutes</p>
          <div className="mt-5 grid grid-cols-5 gap-1.5 text-center">
            {days.map(([d, n], i) => (
              <div
                key={d}
                className={`rounded-xl py-2 ${i === 2 ? "text-white" : "bg-[#f6f3ee] text-[#222221]"}`}
                style={i === 2 ? { background: CONCEPT_GREEN } : undefined}
              >
                <span className={`block text-[11px] ${i === 2 ? "text-white/70" : "text-[#6f6c66]"}`}>{d}</span>
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

export function FollowUpVisual() {
  return (
    <PaintedStage art={ART.hero} position="50% 60%" caption="Illustrative example for a fictional practice and enquiry.">
      <div className="flex w-full max-w-[400px] flex-col gap-3">
        <div className="rounded-[16px] bg-white/85 p-5 shadow-[0_14px_36px_-20px_rgba(60,40,20,0.4)] backdrop-blur-sm">
          <p className="text-[13px] text-[#6b6864]">New enquiry from your website</p>
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
            <p className="text-[12px] text-[#6f6c66]">Sent automatically</p>
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

// ─── Closing CTA ─────────────────────────────────────────────────────────────
// The valley at dusk; its dark meadow continues into the footer colour.

export function ClosingCta({
  title = "See what your website could be.",
  body = "Book a website audit. We’ll review your current site, show where enquiries are lost and suggest what to improve first.",
}: { title?: string; body?: string } = {}) {
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
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-[520px] text-balance text-[18px] leading-[1.5] text-white/85 md:text-[20px]">
          {body}
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

// ─── Inner-page hero ─────────────────────────────────────────────────────────
// Same language as the homepage hero, condensed: a Valley painting dissolving
// into white, with a left-aligned headline on the dissolve (the composition
// Duna uses for its editorial pages). Grows with its content; never clips.

export function PageHero({
  art,
  position = "50% 40%",
  eyebrow,
  title,
  lead,
  children,
}: {
  art: string;
  position?: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  useOverscrollTop(art);
  return (
    <section data-testid="page-hero" className="relative isolate overflow-x-clip bg-white">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[560px] md:h-[640px]">
        <img src={art} alt="" className="h-full w-full select-none object-cover" style={{ objectPosition: position }} fetchPriority="high" />
        <div
          className="absolute -inset-y-[2px] inset-x-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.6) 64%, rgba(255,255,255,0.92) 82%, #fff 100%)",
          }}
        />
      </div>
      <div className={`${CONTAINER} pb-14 pt-[300px] md:pb-20 md:pt-[360px]`}>
        <div className="max-w-[760px]">
          {eyebrow && <p className="mb-4 text-[15px] text-[#5f5c58]">{eyebrow}</p>}
          <h1 className="text-balance text-[40px] font-normal leading-[1.04] tracking-[-0.05em] text-[#222221] md:text-[64px]">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 max-w-[620px] text-[18px] leading-[1.5] tracking-[-0.02em] text-[#5f5c58] md:text-[21px]">{lead}</p>
          )}
          {children && <div className="mt-9">{children}</div>}
        </div>
      </div>
    </section>
  );
}

// A list of icon + title + body points, laid out in columns with hairlines.
export function PointGrid({
  points,
  columns = 3,
}: {
  points: { icon: LucideIcon; title: string; body: string }[];
  columns?: 2 | 3 | 4;
}) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <ul className={`grid grid-cols-1 gap-x-8 ${cols}`}>
      {points.map(({ icon: Icon, title, body }) => (
        <li key={title} className="border-t border-[#ece9e3] py-7">
          <Icon size={20} strokeWidth={1.6} className="text-[#222221]" aria-hidden="true" />
          <h3 className="mt-4 text-[17px] font-medium tracking-[-0.02em] text-[#222221]">{title}</h3>
          <p className="mt-1.5 text-[15.5px] leading-[1.55] text-[#6b6864]">{body}</p>
        </li>
      ))}
    </ul>
  );
}

// Numbered steps for "how it works" sections.
export function Steps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="border-t border-[#222221] py-7">
          <span className="text-[15px] text-[#6f6c66]">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 text-[19px] tracking-[-0.03em] text-[#222221]">{s.title}</h3>
          <p className="mt-2 text-[15.5px] leading-[1.55] text-[#6b6864]">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

export const BRAND = "Olerivo";
const SITE_TITLE = `${BRAND} — Premium Websites & Lead-Conversion Systems`;

const SITE_URL = "https://www.olerivo.com";
const SITE_DESCRIPTION =
  `${BRAND} designs premium websites for clinics, practices and advisory firms, with appointment booking and lead follow-up built in.`;

function setHeadTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

// Sets the page's title ("<page> — Olerivo"; the homepage uses the full site
// title), meta description and canonical URL.
export function usePageTitle(page?: string, description = SITE_DESCRIPTION) {
  useEffect(() => {
    document.title = page ? `${page} — ${BRAND}` : SITE_TITLE;
    setHeadTag('meta[name="description"]', () => Object.assign(document.createElement("meta"), { name: "description" }), "content", description);
    const canonical = SITE_URL + (window.location.pathname === "/" ? "/" : window.location.pathname.replace(/\/$/, ""));
    setHeadTag('link[rel="canonical"]', () => Object.assign(document.createElement("link"), { rel: "canonical" }), "href", canonical);
  }, [page, description]);
}

// Keeps utility pages (confirmation, 404) out of search results.
export function useNoIndex() {
  useEffect(() => {
    const meta = document.head.querySelector('meta[name="robots"]');
    const previous = meta?.getAttribute("content") ?? "index, follow";
    meta?.setAttribute("content", "noindex, follow");
    return () => meta?.setAttribute("content", previous);
  }, []);
}
