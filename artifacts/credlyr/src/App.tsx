import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUpRight, Lock, MinusCircle } from "lucide-react";

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
    <section data-testid="hero-section" className="w-full bg-white">
      {/* Painting — anchored at top, fades to white */}
      <div className="relative w-full" style={{ height: "58vh", minHeight: 340, maxHeight: 560 }}>
        <img
          src="/hero-landscape.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 60%" }}
        />
        {/* Buttery multi-stop gradient to white */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 22%, rgba(255,255,255,0.20) 36%, rgba(255,255,255,0.58) 50%, rgba(255,255,255,0.86) 63%, rgba(255,255,255,0.97) 73%, #ffffff 80%)",
          }}
        />
      </div>

      {/* Text content — left-aligned, px-10 matches nav logo grid column */}
      <div className="px-10 pt-6 pb-16 max-w-[720px]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-[68px] font-bold leading-[1.07] tracking-[-0.03em] text-gray-950 mb-5"
        >
          The new standard
          <br />
          in conversion
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
          className="text-[18px] font-normal text-gray-500 max-w-[440px] leading-[1.6] mb-9"
        >
          Meet the platform that turns online attention into booked
          appointments, automates follow-up, and grows revenue.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.33 }}
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
    </div>
  );
}
