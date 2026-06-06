import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUpRight, Lock, MinusCircle, X, Quote, CheckSquare, Zap, MessageSquare, SlidersHorizontal, LayoutList } from "lucide-react";

// ─── Nav data ─────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  {
    label: "Platform",
    dropdown: [
      { label: "Instant Response", sub: "Reply to every lead in under 60 seconds" },
      { label: "Smart Qualification", sub: "Automated lead scoring and routing" },
      { label: "Appointment Booking", sub: "Frictionless scheduling, zero back-and-forth" },
      { label: "Follow-up Engine", sub: "Automated sequences that re-engage leads" },
      { label: "CRM Sync", sub: "Keep every contact up to date, automatically" },
    ],
  },
  { label: "Solutions" },
  { label: "Company" },
  { label: "Resources" },
];

const STATS = [
  { value: "10.6x", label: "Faster lead response" },
  { value: "37%", label: "Conversion increase" },
  { value: "4.8x", label: "More booked appointments" },
];

const TRUSTED_LOGOS = [
  "Apex Dental",
  "NovaSpa",
  "Shield Brokers",
  "HomeServ",
  "PrecisionMed",
  "TrueRealty",
];

// ─── Navigation ───────────────────────────────────────────────────────────────

function Navigation() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState("Instant Response");

  const activeLink = NAV_LINKS.find((l) => l.label === openDropdown);
  const previewItem = activeLink?.dropdown?.find((d) => d.label === activeItem);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      data-testid="navigation"
      onMouseLeave={() => setOpenDropdown(null)}
    >
      {/* Main bar */}
      <div className="flex items-center justify-between px-10 py-5">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-[7px] text-[15px] font-semibold text-gray-950 tracking-tight select-none"
          data-testid="link-logo"
        >
          <span className="text-[17px] leading-none translate-y-[-1px]">✦</span>
          <span>Credlyr</span>
        </a>

        {/* Center plain-text links */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onMouseEnter={() => {
                if (link.dropdown) {
                  setOpenDropdown(link.label);
                  setActiveItem(link.dropdown[0].label);
                } else {
                  setOpenDropdown(null);
                }
              }}
              className={`inline-flex items-center gap-[3px] px-4 py-2 rounded-full text-[14px] font-medium transition-colors duration-150 cursor-pointer select-none ${
                openDropdown === link.label
                  ? "text-gray-950"
                  : "text-gray-600 hover:text-gray-950"
              }`}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
              {link.dropdown && (
                <ChevronDown
                  size={13}
                  className={`text-gray-400 transition-transform duration-200 ${
                    openDropdown === link.label ? "rotate-180 text-gray-700" : ""
                  }`}
                />
              )}
            </button>
          ))}
        </nav>

        {/* CTA pill */}
        <a
          href="#book"
          className="hidden md:inline-flex items-center px-5 py-[9px] bg-gray-950 text-white text-[14px] font-medium rounded-full transition-all duration-200 hover:bg-gray-700 hover:scale-[1.03] active:scale-[0.99]"
          data-testid="button-book-demo"
        >
          Book a demo
        </a>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {openDropdown && activeLink?.dropdown && (
          <motion.div
            key={openDropdown}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 -translate-x-1/2 top-[68px] w-[520px]"
          >
            <div className="flex bg-gray-950/96 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/[0.08] overflow-hidden">
              {/* Link list */}
              <div className="flex-1 py-3 px-2">
                {activeLink.dropdown.map((item) => (
                  <button
                    key={item.label}
                    onMouseEnter={() => setActiveItem(item.label)}
                    className={`w-full text-left px-4 py-[11px] rounded-xl transition-colors duration-100 cursor-pointer ${
                      activeItem === item.label ? "bg-white/10" : "hover:bg-white/[0.05]"
                    }`}
                    data-testid={`dropdown-item-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <div className="text-[13.5px] font-semibold text-white leading-snug">{item.label}</div>
                    <div className="text-[12px] text-white/40 mt-[2px]">{item.sub}</div>
                  </button>
                ))}
              </div>

              {/* Preview card */}
              {previewItem && (
                <motion.div
                  key={activeItem}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.12 }}
                  className="w-[188px] m-[10px] bg-white rounded-xl flex flex-col overflow-hidden"
                >
                  <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
                    <div className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center border border-gray-100">
                      <span className="text-base leading-none">✦</span>
                    </div>
                  </div>
                  <div className="px-4 py-3 border-t border-gray-100">
                    <div className="text-[13px] font-semibold text-gray-900 mb-[3px]">{previewItem.label}</div>
                    <div className="text-[11.5px] text-gray-400 leading-snug">{previewItem.sub}</div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Full-bleed painting */}
      <img
        src="/hero-landscape.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-[center_58%]"
      />

      {/* Gradient scrim — keeps top 55% fully clear, subtle legibility scrim below */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 55%, rgba(255,255,255,0.15) 70%, rgba(255,255,255,0.45) 82%, rgba(255,255,255,0.80) 92%, #ffffff 100%)",
        }}
      />

      {/* Overlay text — centered, anchored toward bottom */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-6 z-10">
        {/* Announcement pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="mb-5"
        >
          <span className="inline-flex items-center gap-1.5 bg-gray-900/90 text-white text-xs font-medium px-4 py-1.5 rounded-full tracking-wide backdrop-blur-sm">
            New&nbsp;→&nbsp;Credlyr for service businesses
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="text-[56px] md:text-[68px] font-bold leading-[1.07] tracking-[-0.03em] text-gray-950 text-center mb-5 max-w-[800px]"
          style={{ textShadow: "0 0 20px rgba(255,255,255,0.85), 0 0 40px rgba(255,255,255,0.5)" }}
        >
          The new standard
          <br />
          in conversion
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
          className="text-[17px] font-normal text-gray-700 max-w-[460px] leading-[1.65] text-center mb-9"
          style={{ textShadow: "0 1px 16px rgba(255,255,255,0.9), 0 0px 6px rgba(255,255,255,0.8)" }}
        >
          Meet the platform that turns online attention into booked
          appointments, automates follow-up, and grows revenue.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.36 }}
        >
          <a
            href="#book"
            className="inline-flex items-center px-8 py-[13px] bg-gray-950 text-white text-[15px] font-medium rounded-full transition-all duration-200 hover:bg-gray-700 hover:scale-[1.03] active:scale-[0.99] shadow-sm"
            data-testid="button-hero-cta"
          >
            Get started
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Logo strip ───────────────────────────────────────────────────────────────

function TrustedBy() {
  return (
    <section
      data-testid="trusted-by-section"
      className="w-full bg-white pb-20 px-10"
    >
      <p className="text-center text-[13px] text-gray-400 font-medium tracking-[0.04em] uppercase mb-8">
        Trusted by service businesses
      </p>
      <div className="flex items-center justify-center gap-10 flex-wrap">
        {TRUSTED_LOGOS.map((name) => (
          <span
            key={name}
            className="text-[17px] font-semibold text-gray-300 tracking-tight select-none"
            data-testid={`logo-${name.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function Stats() {
  return (
    <section
      data-testid="stats-section"
      className="w-full bg-white border-t border-gray-100 py-16 px-10"
    >
      <div className="flex items-stretch">
        {STATS.map((stat, i) => (
          <div key={stat.value} className="flex flex-1 items-stretch">
            {/* Stat block */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="flex flex-col justify-center pr-12"
            >
              <span
                className="text-[42px] font-bold tracking-[-0.04em] text-gray-950 leading-none mb-2"
                data-testid={`stat-value-${i}`}
              >
                {stat.value}
              </span>
              <span
                className="text-[14px] font-normal text-gray-400 leading-snug"
                data-testid={`stat-label-${i}`}
              >
                {stat.label}
              </span>
            </motion.div>

            {/* Vertical divider — hidden after last item, hidden on mobile */}
            {i < STATS.length - 1 && (
              <div className="hidden md:block self-stretch mr-12 flex-shrink-0">
                <div className="w-px bg-gray-200 h-full" style={{ transform: "scaleY(0.6)", transformOrigin: "center" }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Value Proposition ────────────────────────────────────────────────────────

const VALUE_PROPS = [
  {
    Icon: ArrowUpRight,
    heading: "Drive revenue",
    body: "Credlyr's system responds to every lead in under 60 seconds — closing the gap between interest and conversation that costs service businesses bookings every day.",
  },
  {
    Icon: Lock,
    heading: "Book more appointments",
    body: "Automated qualification and scheduling moves leads from form fill to confirmed appointment without a single manual step — no phone tag, no back-and-forth.",
  },
  {
    Icon: MinusCircle,
    heading: "Reduce overhead",
    body: "Replace manual follow-up, chaser emails, and missed calls with automated sequences that run around the clock — without hiring extra staff.",
  },
];

function ValueProposition() {
  return (
    <section
      data-testid="value-proposition-section"
      className="w-full bg-white py-20 px-10"
    >
      {/* H2 heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="text-[38px] font-bold tracking-[-0.025em] text-gray-950 leading-[1.1] mb-14 max-w-[640px]"
      >
        Designed to convert. Built to scale.
      </motion.h2>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {VALUE_PROPS.map(({ Icon, heading, body }, i) => (
          <motion.div
            key={heading}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            data-testid={`value-card-${i}`}
          >
            {/* Icon — thin stroke, consistent weight */}
            <Icon
              size={22}
              strokeWidth={1.5}
              className="text-gray-900 mb-5"
              aria-hidden="true"
            />

            {/* Heading */}
            <h3 className="text-[16px] font-semibold text-gray-950 mb-3 tracking-[-0.01em]">
              {heading}
            </h3>

            {/* Body */}
            <p className="text-[14.5px] text-gray-400 leading-[1.65] font-normal">
              {body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Trusted By Leaders ───────────────────────────────────────────────────────

type LeaderCardVariant = "logo" | "portrait" | "testimonial";

interface LeaderCard {
  id: string;
  variant: LeaderCardVariant;
  colSpan?: 2;
  // logo
  company?: string;
  tagline?: string;
  // portrait
  name?: string;
  title?: string;
  initials?: string;
  gradient?: string;
  // testimonial
  quote?: string;
  author?: string;
  role?: string;
  dark?: boolean;
}

const LEADER_CARDS: LeaderCard[] = [
  {
    id: "logo-apex",
    variant: "logo",
    company: "Apex Dental",
    tagline: "Multi-location dental group",
  },
  {
    id: "portrait-sarah",
    variant: "portrait",
    name: "Sarah Chen",
    title: "CEO, HomeServ",
    initials: "SC",
    gradient: "linear-gradient(135deg, #c8a97e 0%, #a07850 100%)",
    quote: "Every lead gets a response within 60 seconds. Our close rate tripled in the first month.",
  },
  {
    id: "testimonial-nova",
    variant: "testimonial",
    quote: "We stopped losing clients to faster competitors. Credlyr gave our front desk an unfair advantage.",
    author: "Lena Park",
    role: "Founder, NovaSpa",
    dark: true,
  },
  {
    id: "testimonial-reid",
    variant: "testimonial",
    colSpan: 2,
    quote: "Before Credlyr, half our leads went cold before anyone called them back. Now every enquiry gets a personalised response in under a minute — and our appointment book stays full.",
    author: "Dr. Marcus Reid",
    role: "Director, PrecisionMed",
    dark: false,
  },
  {
    id: "logo-shield",
    variant: "logo",
    company: "Shield Brokers",
    tagline: "Insurance & risk advisory",
  },
  {
    id: "portrait-emma",
    variant: "portrait",
    name: "Emma Walsh",
    title: "Operations Director, TrueRealty",
    initials: "EW",
    gradient: "linear-gradient(135deg, #7c9e8f 0%, #4a7265 100%)",
    quote: "Our agents now spend time closing deals, not chasing cold leads that went quiet.",
  },
  {
    id: "logo-homeserv",
    variant: "logo",
    company: "HomeServ Pro",
    tagline: "Home services network",
  },
  {
    id: "testimonial-james",
    variant: "testimonial",
    quote: "The ROI showed up in the first week. I genuinely wish we'd found this two years ago.",
    author: "James Okafor",
    role: "CEO, TrueRealty",
    dark: true,
  },
];

function LogoCard({ card, onClick }: { card: LeaderCard; onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl border border-gray-150 bg-white shadow-sm cursor-pointer flex flex-col items-center justify-center p-8 h-64"
      data-testid={`leader-card-${card.id}`}
    >
      <span className="text-[22px] font-bold tracking-[-0.02em] text-gray-900 mb-2">
        {card.company}
      </span>
      <span className="text-[13px] text-gray-400 font-normal">{card.tagline}</span>
    </motion.div>
  );
}

function PortraitCard({ card, onClick }: { card: LeaderCard; onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl shadow-sm cursor-pointer relative overflow-hidden h-64"
      style={{ background: card.gradient }}
      data-testid={`leader-card-${card.id}`}
    >
      {/* Large initial */}
      <span
        className="absolute top-6 left-6 text-[80px] font-bold leading-none select-none"
        style={{ color: "rgba(255,255,255,0.18)" }}
      >
        {card.initials?.[0]}
      </span>

      {/* Bottom overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-5">
        <p className="text-[14px] font-semibold text-white leading-snug mb-0.5">{card.name}</p>
        <p className="text-[12px] text-white/60">{card.title}</p>
      </div>
    </motion.div>
  );
}

function TestimonialCard({ card, onClick }: { card: LeaderCard; onClick: () => void }) {
  const isWide = card.colSpan === 2;
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-3xl shadow-sm cursor-pointer flex flex-col justify-between p-7 h-64 ${
        card.dark ? "bg-gray-950" : "bg-stone-100"
      } ${isWide ? "col-span-2" : ""}`}
      data-testid={`leader-card-${card.id}`}
    >
      <Quote
        size={20}
        strokeWidth={1.5}
        className={card.dark ? "text-white/30" : "text-gray-300"}
      />
      <p
        className={`text-[14px] leading-[1.6] font-normal mt-4 ${
          isWide ? "text-[15px]" : ""
        } ${card.dark ? "text-white/80" : "text-gray-700"}`}
      >
        {card.quote}
      </p>
      <div className="mt-5">
        <p className={`text-[13px] font-semibold ${card.dark ? "text-white" : "text-gray-900"}`}>
          {card.author}
        </p>
        <p className={`text-[12px] mt-0.5 ${card.dark ? "text-white/40" : "text-gray-400"}`}>
          {card.role}
        </p>
      </div>
    </motion.div>
  );
}

function TrustedByLeaders() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = LEADER_CARDS.find((c) => c.id === selectedId) ?? null;

  return (
    <section
      data-testid="trusted-by-leaders-section"
      className="w-full bg-white py-20 px-10"
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center text-[13px] text-gray-400 font-medium tracking-[0.04em] uppercase mb-10"
      >
        Trusted by leaders
      </motion.p>

      {/* Mosaic grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-min gap-4 [grid-auto-flow:dense]">
        {LEADER_CARDS.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.07 }}
            className={card.colSpan === 2 ? "md:col-span-2" : ""}
          >
            {card.variant === "logo" && (
              <LogoCard card={card} onClick={() => setSelectedId(card.id)} />
            )}
            {card.variant === "portrait" && (
              <PortraitCard card={card} onClick={() => setSelectedId(card.id)} />
            )}
            {card.variant === "testimonial" && (
              <TestimonialCard card={card} onClick={() => setSelectedId(card.id)} />
            )}
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
              onClick={() => setSelectedId(null)}
            />

            {/* Modal panel */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-[480px] mx-4"
              data-testid="leader-modal"
            >
              <div
                className={`rounded-3xl shadow-2xl p-8 relative ${
                  selected.dark ?? selected.variant === "portrait"
                    ? "bg-gray-950 text-white"
                    : "bg-white text-gray-950"
                }`}
              >
                {/* Close */}
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-white/10 transition-colors"
                  data-testid="modal-close"
                  aria-label="Close"
                >
                  <X
                    size={16}
                    className={selected.dark ?? selected.variant === "portrait" ? "text-white/60" : "text-gray-400"}
                  />
                </button>

                {/* Content */}
                {selected.variant === "logo" && (
                  <div className="text-center py-4">
                    <span className="text-[28px] font-bold tracking-[-0.02em] text-gray-900 block mb-2">
                      {selected.company}
                    </span>
                    <span className="text-[14px] text-gray-400">{selected.tagline}</span>
                  </div>
                )}

                {(selected.variant === "portrait" || selected.variant === "testimonial") && (
                  <>
                    <Quote size={24} strokeWidth={1.5} className="mb-5 opacity-30" />
                    <p
                      className={`text-[17px] leading-[1.65] font-normal mb-8 ${
                        selected.dark ?? selected.variant === "portrait" ? "text-white/85" : "text-gray-700"
                      }`}
                    >
                      {selected.quote ?? selected.quote}
                    </p>
                    <div className="flex items-center gap-3">
                      {selected.variant === "portrait" && (
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0"
                          style={{ background: selected.gradient }}
                        >
                          {selected.initials}
                        </div>
                      )}
                      <div>
                        <p
                          className={`text-[14px] font-semibold ${
                            selected.dark ?? selected.variant === "portrait" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {selected.name ?? selected.author}
                        </p>
                        <p
                          className={`text-[12px] ${
                            selected.dark ?? selected.variant === "portrait" ? "text-white/40" : "text-gray-400"
                          }`}
                        >
                          {selected.title ?? selected.role}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Infrastructure Hub ───────────────────────────────────────────────────────

function SpokeNode({ label }: { label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white border border-gray-200 rounded-full px-6 py-2.5 text-[14px] text-gray-700 font-medium cursor-default whitespace-nowrap shadow-sm select-none"
    >
      {label}
    </motion.div>
  );
}

function HubDesktop() {
  return (
    <div className="relative w-full h-[460px]">
      {/* SVG connector lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* top */}
        <line x1="50%" y1="20%" x2="50%" y2="33%" stroke="#d1d5db" strokeWidth="1" />
        {/* bottom */}
        <line x1="50%" y1="67%" x2="50%" y2="80%" stroke="#d1d5db" strokeWidth="1" />
        {/* left */}
        <line x1="21%" y1="50%" x2="31.5%" y2="50%" stroke="#d1d5db" strokeWidth="1" />
        {/* right */}
        <line x1="68.5%" y1="50%" x2="79%" y2="50%" stroke="#d1d5db" strokeWidth="1" />
      </svg>

      {/* Center hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Concentric rings */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[192px] rounded-[124px] border border-gray-200/60 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[390px] h-[210px] rounded-[133px] border border-gray-200/40 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[228px] rounded-[142px] border border-gray-200/20 pointer-events-none" />
        {/* Hub pill */}
        <motion.div
          whileHover={{ scale: 1.02, boxShadow: "0 12px 48px rgba(0,0,0,0.14)" }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-80 h-40 rounded-[100px] overflow-hidden border-2 border-gray-100 cursor-default"
        >
          <img
            src="/hero-landscape.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[center_60%]"
          />
          <div className="absolute inset-0 bg-black/25" />
          <span className="absolute inset-0 flex items-center justify-center text-[22px] font-bold text-white tracking-[-0.025em] select-none">
            Credlyr Engine
          </span>
        </motion.div>
      </div>

      {/* Top: Decide */}
      <div className="absolute left-1/2 -translate-x-1/2 top-12">
        <SpokeNode label="Decide" />
      </div>

      {/* Bottom: Data Platform */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-12">
        <SpokeNode label="Data Platform" />
      </div>

      {/* Left: Onboard */}
      <div className="absolute left-14 top-1/2 -translate-y-1/2">
        <SpokeNode label="Onboard" />
      </div>

      {/* Right: Lifecycle */}
      <div className="absolute right-14 top-1/2 -translate-y-1/2">
        <SpokeNode label="Lifecycle" />
      </div>
    </div>
  );
}

function HubMobile() {
  return (
    <div className="flex flex-col items-center gap-0 py-8">
      <SpokeNode label="Decide" />
      <div className="w-px h-8 bg-gray-200" />
      {/* Hub */}
      <motion.div
        whileHover={{ scale: 1.02, boxShadow: "0 12px 48px rgba(0,0,0,0.14)" }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-72 h-36 rounded-[100px] overflow-hidden border-2 border-gray-100 cursor-default"
      >
        <img
          src="/hero-landscape.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[center_60%]"
        />
        <div className="absolute inset-0 bg-black/25" />
        <span className="absolute inset-0 flex items-center justify-center text-[18px] font-bold text-white tracking-[-0.025em] select-none">
          Credlyr Engine
        </span>
      </motion.div>
      <div className="w-px h-8 bg-gray-200" />
      <SpokeNode label="Data Platform" />
      <div className="flex gap-4 mt-6">
        <SpokeNode label="Onboard" />
        <SpokeNode label="Lifecycle" />
      </div>
    </div>
  );
}

function InfrastructureHub() {
  return (
    <section
      data-testid="infrastructure-hub-section"
      className="w-full bg-[#f5f4f2] py-20 px-10"
    >
      {/* Section header */}
      <div className="flex items-start justify-between mb-12">
        <div className="max-w-sm">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[38px] md:text-[46px] font-bold tracking-[-0.03em] text-gray-950 leading-[1.08] mb-4"
          >
            The infrastructure<br />behind every booking.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="text-[14px] text-gray-500 leading-relaxed"
          >
            At the heart of Credlyr is a powerful conversion engine driving action
            across the full customer lifecycle.
          </motion.p>
        </div>
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="hidden md:flex items-center gap-1.5 border border-gray-300 rounded-full px-4 py-2 text-[13px] text-gray-600 hover:bg-white/80 transition-colors whitespace-nowrap mt-1 shrink-0"
        >
          Explore <ArrowUpRight size={12} strokeWidth={1.5} />
        </motion.a>
      </div>

      {/* Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="w-full max-w-4xl mx-auto"
      >
        <div className="hidden md:block">
          <HubDesktop />
        </div>
        <div className="md:hidden">
          <HubMobile />
        </div>
      </motion.div>
    </section>
  );
}

// ─── Feature Highlight ────────────────────────────────────────────────────────

type FeatureItem = {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
};

const FEATURE_ITEMS: FeatureItem[] = [
  {
    id: "automated",
    icon: CheckSquare,
    title: "Automated lead response",
    description:
      "Convert enquiries into booked appointments using AI-powered sequences that trigger within 60 seconds — before a competitor picks up the phone.",
  },
  {
    id: "efficiency",
    icon: Zap,
    title: "Increased team efficiency",
    description:
      "Assign, escalate, and resolve leads with built-in prioritisation so your team focuses on closing, not chasing.",
  },
  {
    id: "messaging",
    icon: MessageSquare,
    title: "In-platform messaging",
    description:
      "Centralised inbox for every lead conversation — no more scattered threads across email, SMS, and DMs.",
  },
  {
    id: "audit",
    icon: SlidersHorizontal,
    title: "Full audit trail",
    description:
      "Every lead interaction is automatically logged — timestamped, attributed, and exportable.",
  },
];

const DASHBOARD_ITEMS = [
  { label: "New leads", count: 2, active: true },
  { label: "My open leads", count: 3, active: false },
  { label: "My follow-ups", count: 4, active: false },
  { label: "Escalations", count: 3, active: false },
  { label: "All leads", count: null, active: false },
];

function FeatureHighlight() {
  const [activeId, setActiveId] = useState<string>("automated");

  return (
    <section
      data-testid="feature-highlight-section"
      className="w-full bg-white py-20 px-10"
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-10">
        <div>
          {/* Pill label */}
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block border border-gray-200 rounded-full px-3 py-1 text-[12px] text-gray-600 font-medium mb-5"
          >
            Decide
          </motion.span>

          {/* H2 */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="text-[38px] md:text-[46px] font-bold tracking-[-0.03em] text-gray-950 leading-[1.08] max-w-lg"
          >
            Save time with automated lead management
          </motion.h2>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[15px] text-gray-500 mt-4 leading-relaxed max-w-md"
          >
            Increase booking quality and cut costs — by removing manual follow-up from your team's plate.
          </motion.p>
        </div>

        {/* Explore link */}
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="hidden md:flex items-center gap-1.5 border border-gray-300 rounded-full px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap shrink-0 mt-1"
        >
          Explore <ArrowUpRight size={12} strokeWidth={1.5} />
        </motion.a>
      </div>

      {/* Two-column body */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">

        {/* Left — feature list */}
        <div className="flex-1 flex flex-col gap-1">
          {FEATURE_ITEMS.map((item, i) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.07,
                }}
                onClick={() => setActiveId(item.id)}
                className={`rounded-xl px-4 py-4 cursor-pointer transition-colors duration-200 ${
                  isActive ? "bg-gray-50" : "hover:bg-gray-50/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={16}
                    strokeWidth={1.5}
                    className={isActive ? "text-gray-800" : "text-gray-400"}
                  />
                  <span
                    className={`text-[15px] font-semibold ${
                      isActive ? "text-gray-950" : "text-gray-500"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.p
                      key="desc"
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[13px] text-gray-500 leading-[1.65] pl-7 overflow-hidden"
                    >
                      {item.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Bottom explore link — mobile only */}
          <a
            href="#"
            className="md:hidden flex items-center gap-1.5 text-[13px] text-gray-500 mt-4 pl-4 hover:text-gray-800 transition-colors"
          >
            Explore <ArrowUpRight size={12} strokeWidth={1.5} />
          </a>
        </div>

        {/* Right — dashboard card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex-1 md:flex-[1.1]"
        >
          {/* Outer wrapper — off-white tray */}
          <div className="bg-[#f5f4f2] rounded-2xl p-6 shadow-inner">
            {/* White dashboard card */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              {/* Card header */}
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                <LayoutList size={14} strokeWidth={1.5} className="text-gray-400" />
                <span className="text-[14px] font-semibold text-gray-800">Leads</span>
              </div>

              {/* List */}
              <div className="divide-y divide-gray-50">
                {DASHBOARD_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors cursor-default ${
                      item.active ? "bg-gray-50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          item.active ? "bg-gray-500" : "bg-gray-300"
                        }`}
                      />
                      <span
                        className={`text-[13px] ${
                          item.active
                            ? "text-gray-900 font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    {item.count !== null && (
                      <span className="text-[12px] text-gray-400 tabular-nums">
                        {item.count}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* Nav is fixed/transparent — hero image bleeds to page top */}
      <Hero />
      <TrustedBy />
      <Stats />
      <ValueProposition />
      <TrustedByLeaders />
      <InfrastructureHub />
      <FeatureHighlight />
    </div>
  );
}
