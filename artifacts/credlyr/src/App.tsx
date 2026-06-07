import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUpRight, Lock, MinusCircle, X, Quote, CheckSquare, Zap, MessageSquare, SlidersHorizontal, LayoutList, Menu, ChevronRight, TrendingUp, ShieldCheck, LineChart } from "lucide-react";
import { Link, Route, Switch } from "wouter";

// ─── Nav data ─────────────────────────────────────────────────────────────────

interface NavDropdownColumn {
  title?: string;
  items: { label: string; sub: string }[];
}

interface NavItem {
  label: string;
  dropdown?: {
    variant: "two-column" | "split-preview";
    left: NavDropdownColumn;
    right?: NavDropdownColumn;
  };
}

const NAV_LINKS: NavItem[] = [
  {
    label: "Product",
    dropdown: {
      variant: "two-column",
      left: {
        title: "Platform",
        items: [
          { label: "Instant Response", sub: "Reply to every lead in under 60 seconds" },
          { label: "Smart Qualification", sub: "Automated lead scoring and routing" },
          { label: "Appointment Booking", sub: "Frictionless scheduling, zero back-and-forth" },
        ],
      },
      right: {
        title: "Solutions",
        items: [
          { label: "Follow-up Engine", sub: "Automated sequences that re-engage leads" },
          { label: "CRM Sync", sub: "Keep every contact up to date, automatically" },
        ],
      },
    },
  },
  {
    label: "Customers",
    dropdown: {
      variant: "two-column",
      left: {
        title: "Industries",
        items: [
          { label: "E-commerce", sub: "Webshops and online retail" },
          { label: "Local Business", sub: "Services, hospitality, trade" },
          { label: "Tech Startups", sub: "SaaS and digital platforms" },
        ],
      },
      right: {
        title: "Teams",
        items: [
          { label: "Sales", sub: "Lead gen and conversion strategy" },
          { label: "Marketing", sub: "Brand development and content" },
          { label: "Operations", sub: "CRM and workflow automation" },
        ],
      },
    },
  },
  {
    label: "Company",
    dropdown: {
      variant: "split-preview",
      left: {
        items: [
          { label: "About", sub: "Our story" },
          { label: "News", sub: "Press and insights" },
          { label: "Careers", sub: "We're hiring" },
        ],
      },
    },
  },
  { label: "Resources" },
];

const STATS = [
  { value: "10.6x", label: "Faster onboarding" },
  { value: "37%", label: "Conversion increase" },
  { value: "4.8x", label: "Analyst efficiency" },
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeLink = NAV_LINKS.find((l) => l.label === openDropdown);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-neutral-100"
          : "bg-transparent border-b border-transparent"
      }`}
      data-testid="navigation"
      onMouseLeave={() => setOpenDropdown(null)}
    >
      {/* Main bar */}
      <div className="flex items-center justify-between px-10 py-8">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-[10px] text-2xl md:text-3xl font-bold text-gray-950 tracking-tighter select-none"
          data-testid="link-logo"
        >
          <span className="text-2xl md:text-3xl leading-none translate-y-[-1px]">✦</span>
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
                } else {
                  setOpenDropdown(null);
                }
              }}
              className={`group inline-flex items-center gap-[3px] px-4 py-2 rounded-full text-[14px] font-medium transition-all duration-150 cursor-pointer select-none ${
                openDropdown === link.label
                  ? "bg-neutral-800/50 text-white backdrop-blur-md"
                  : "text-gray-600 hover:bg-neutral-800/50 hover:text-white hover:backdrop-blur-md"
              }`}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
              {link.dropdown && (
                <ChevronDown
                  size={13}
                  className={`text-gray-400 transition-transform duration-200 group-hover:text-white ${
                    openDropdown === link.label ? "rotate-180 text-white" : ""
                  }`}
                />
              )}
            </button>
          ))}
        </nav>

        {/* CTA pill */}
        <Link href="/get-started">
          <a
            className="hidden md:inline-flex items-center px-[18px] py-[8px] bg-black text-white text-[13.5px] font-semibold rounded-full transition-colors duration-150 hover:bg-neutral-800 active:scale-[0.98] cursor-pointer"
            data-testid="button-book-demo"
          >
            Schedule a call
          </a>
        </Link>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex md:hidden items-center justify-center p-1.5 text-gray-950 hover:text-gray-700 transition-colors cursor-pointer select-none"
          aria-label="Open menu"
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>
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
            className="absolute left-1/2 -translate-x-1/2 top-[68px] w-[560px]"
          >
            <div className="grid grid-cols-2 gap-6 bg-neutral-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-neutral-700/50 p-6">
              {activeLink.dropdown.variant === "two-column" ? (
                <>
                  {/* Left Column */}
                  <div>
                    {activeLink.dropdown.left.title && (
                      <div className="text-neutral-400 text-[11px] font-semibold tracking-wider uppercase mb-3 px-3">
                        {activeLink.dropdown.left.title}
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      {activeLink.dropdown.left.items.map((item) => (
                        <Link key={item.label} href="/get-started">
                          <a
                            className="block text-left px-3 py-2 rounded-xl transition-colors duration-100 cursor-pointer hover:bg-neutral-800/50"
                            data-testid={`dropdown-item-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            <div className="text-[13.5px] font-semibold text-white leading-snug">{item.label}</div>
                            <div className="text-neutral-500 text-sm mt-[2px] font-normal leading-normal">{item.sub}</div>
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    {activeLink.dropdown.right?.title && (
                      <div className="text-neutral-400 text-[11px] font-semibold tracking-wider uppercase mb-3 px-3">
                        {activeLink.dropdown.right.title}
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      {activeLink.dropdown.right?.items.map((item) => (
                        <Link key={item.label} href="/get-started">
                          <a
                            className="block text-left px-3 py-2 rounded-xl transition-colors duration-100 cursor-pointer hover:bg-neutral-800/50"
                            data-testid={`dropdown-item-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            <div className="text-[13.5px] font-semibold text-white leading-snug">{item.label}</div>
                            <div className="text-neutral-500 text-sm mt-[2px] font-normal leading-normal">{item.sub}</div>
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Left Column (No Header, padded items) */}
                  <div className="flex flex-col justify-center gap-1">
                    {activeLink.dropdown.left.items.map((item) => (
                      <Link key={item.label} href="/get-started">
                        <a
                          className="block text-left px-3 py-2 rounded-xl transition-colors duration-100 cursor-pointer hover:bg-neutral-800/50"
                          data-testid={`dropdown-item-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          <div className="text-[13.5px] font-semibold text-white leading-snug">{item.label}</div>
                          <div className="text-neutral-500 text-sm mt-[2px] font-normal leading-normal">{item.sub}</div>
                        </a>
                      </Link>
                    ))}
                  </div>

                  {/* Right Column (Visual Card Placeholder - bg-neutral-800) */}
                  <div className="flex items-center justify-center">
                    <div className="w-full aspect-square bg-neutral-800 rounded-xl flex items-center justify-center border border-neutral-700/30 overflow-hidden relative group/visual">
                      {/* Premium design gesture placeholder */}
                      <svg
                        viewBox="0 0 100 100"
                        className="w-20 h-20 text-neutral-400 group-hover/visual:scale-105 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {/* Elegant finger-heart gesture art */}
                        <path
                          d="M50 35 C48 31, 44 31, 42 33 C40 35, 40 39, 44 43 L50 49 L56 43 C60 39, 60 35, 58 33 C56 31, 52 31, 50 35 Z"
                          fill="currentColor"
                          fillOpacity="0.15"
                        />
                        
                        <path d="M35 85 C35 75, 40 70, 45 70" />
                        <path d="M65 85 C65 75, 60 70, 55 70" />
                        
                        <path d="M42 70 C40 68, 40 64, 43 62 C46 60, 49 62, 49 65" />
                        <path d="M44 62 C42 60, 42 56, 45 54 C48 52, 51 54, 51 57" />
                        <path d="M46 54 C44 52, 44 48, 47 46 C50 44, 53 46, 53 49" />
                        
                        <path d="M58 70 C60 65, 61 54, 51 45" />
                        
                        <path d="M47 70 C46 65, 45 51, 49 44 C51 41, 54 41, 56 44 C58 47, 56 51, 52 55" />
                      </svg>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-neutral-950/98 backdrop-blur-xl z-[100] flex flex-col p-6 md:hidden"
          >
            {/* Header row */}
            <div className="flex items-center justify-between pb-6 border-b border-neutral-900">
              <a
                href="/"
                className="flex items-center gap-[10px] text-2xl font-bold text-white tracking-tighter select-none"
              >
                <span className="text-2xl leading-none translate-y-[-1px]">✦</span>
                <span>Credlyr</span>
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg border border-neutral-800 hover:bg-neutral-800/50 text-white transition-colors"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Links vertical list */}
            <div className="flex-1 py-8 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={`#${link.label.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between text-[18px] font-medium text-white py-4 border-b border-neutral-900 hover:text-neutral-300 transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight size={16} className="text-neutral-500" />
                </a>
              ))}
            </div>

            {/* Bottom section */}
            <div className="pt-6 border-t border-neutral-900 flex flex-col gap-4">
              <Link href="/get-started">
                <a
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center py-3.5 bg-white text-black text-[15px] font-semibold rounded-full hover:bg-neutral-200 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Schedule a call
                </a>
              </Link>
              <span className="text-center text-[12px] text-neutral-500 mt-2">
                Built for service businesses
              </span>
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
      className="relative w-full h-screen overflow-hidden p-0 m-0"
      style={{ height: "100vh", width: "100vw" }}
    >
      {/* Full-bleed painting */}
      <img
        src="/hero-landscape.png?v=2"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 58%",
          maxWidth: "none",
          display: "block",
          margin: 0,
          padding: 0,
          filter: "sepia(15%) brightness(105%) saturate(120%) hue-rotate(5deg)"
        }}
      />

      {/* Gradient scrim — keeps top 60% fully clear, subtle legibility scrim below */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.3) 85%, rgba(255,255,255,0.55) 93%, rgba(255,255,255,0.75) 100%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 z-10 text-center px-6">
        {/* Announcement pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="px-4 py-1.5 rounded-full bg-gray-950 text-white text-xs font-medium tracking-wide mb-6"
        >
          New → Credlyr for service businesses
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="max-w-4xl text-balance text-[clamp(56px,7vw,92px)] leading-[0.95] tracking-[-0.055em] font-normal text-gray-950"
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
          className="mt-8 max-w-2xl text-balance text-[24px] leading-[1.35] text-neutral-700 font-normal mb-8"
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
          <Link href="/get-started">
            <a
              className="inline-flex items-center px-8 py-3 bg-black text-white rounded-full font-semibold text-lg hover:bg-gray-800 transition-all cursor-pointer"
              data-testid="button-hero-cta"
            >
              Get started
            </a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Logo strip ───────────────────────────────────────────────────────────────

function SocialProof() {
  return (
    <section
      data-testid="social-proof-section"
      className="w-full bg-white py-24 px-10 border-y border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <p className="text-center text-[13px] text-gray-400 font-medium tracking-[0.04em] uppercase mb-8">
          Trusted by service businesses
        </p>
        
        {/* Infinite marquee */}
        <div className="w-full overflow-hidden flex relative py-2 select-none pointer-events-none">
          {/* Gradient fade borders */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
          
          <motion.div
            className="flex gap-20 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 35,
              repeat: Infinity,
            }}
          >
            {/* Duplicated multiple times to guarantee seamless scrolling */}
            {Array(4).fill(TRUSTED_LOGOS).flat().map((name, i) => (
              <span
                key={i}
                className="text-[17px] font-semibold text-gray-300 tracking-tight"
                data-testid={`logo-${name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section
      data-testid="stats-section"
      className="w-full bg-white pt-24 pb-12 px-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-left flex flex-col items-start">
        {/* H2 heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl font-medium tracking-[-0.025em] text-gray-950 leading-tight mb-0 max-w-[640px]"
        >
          Designed to convert.
          <br />
          Built to scale.
        </motion.h2>

        {/* Stats Row */}
        <div className="flex flex-row flex-wrap justify-start items-start gap-12 mt-8 w-full">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="flex flex-col items-start text-left"
              data-testid={`stat-block-${i}`}
            >
              <span
                className="text-6xl md:text-7xl font-bold tracking-tighter text-gray-950 leading-none"
                data-testid={`stat-value-${i}`}
              >
                {stat.value}
              </span>
              <span
                className="text-sm font-normal text-neutral-500 mt-2 leading-tight"
                data-testid={`stat-label-${i}`}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Value Proposition ────────────────────────────────────────────────────────

const VALUE_PROPS = [
  {
    Icon: LineChart,
    heading: "Drive revenue",
    body: "Credlyr's platform is built to help enterprises grow. Optimised to eliminate friction and instantly deliver higher conversion.",
  },
  {
    Icon: Lock,
    heading: "Future-proof compliance",
    body: "A powerful policy engine translates KYC, KYB and AML into code - enabling the industry's most detailed audit trails.",
  },
  {
    Icon: MinusCircle,
    heading: "Reduce costs",
    body: "Eliminate manual checks, endless emails and lengthy reviews - by automating manual work with compliant, auditable AI.",
  },
];

function ValueProposition() {
  return (
    <section
      data-testid="value-proposition-section"
      className="w-full bg-white pt-0 pb-24 px-10 border-b border-neutral-200"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* 3-column grid with line separators */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-neutral-200">
          {VALUE_PROPS.map(({ Icon, heading, body }, i) => (
            <motion.div
              key={heading}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              data-testid={`value-card-${i}`}
              className={`px-8 py-12 flex flex-col items-start text-left ${
                i < 2 ? "md:border-r md:border-neutral-200" : ""
              }`}
            >
              {/* Icon — thin stroke, consistent weight */}
              <Icon
                strokeWidth={1.5}
                className="w-8 h-8 text-neutral-900 mb-4"
                aria-hidden="true"
              />

              {/* Heading */}
              <h3 className="text-xl font-semibold text-gray-950 mb-2">
                {heading}
              </h3>

              {/* Body */}
              <p className="text-base text-neutral-500 leading-relaxed font-normal">
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
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
            style={{ filter: "sepia(15%) brightness(105%) saturate(120%) hue-rotate(5deg)" }}
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
          style={{ filter: "sepia(15%) brightness(105%) saturate(120%) hue-rotate(5deg)" }}
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
      className="w-full bg-[#f5f4f2] py-24 px-10"
    >
      {/* Section header */}
      <div className="flex items-start justify-between mb-16">
        <div className="max-w-sm">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-bold tracking-[-0.03em] text-gray-950 leading-tight mb-4"
          >
            The infrastructure<br />behind every booking.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="font-sans text-lg text-gray-600 leading-relaxed font-normal"
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
      className="w-full bg-white py-24 px-10"
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-16">
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
            className="text-4xl font-bold tracking-[-0.03em] text-gray-950 leading-tight max-w-lg"
          >
            Save time with automated lead management
          </motion.h2>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-sans text-lg text-gray-600 mt-4 leading-relaxed max-w-md font-normal"
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
                      className="font-sans text-[13px] text-gray-600 leading-[1.65] pl-7 overflow-hidden"
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

// ─── News ─────────────────────────────────────────────────────────────────────

type NewsCardData = {
  id: string;
  variant: "text-bg" | "logo-bg" | "portrait";
  title: string;
  category: string;
  readTime: string;
};

const NEWS_CARDS: NewsCardData[] = [
  {
    id: "founding",
    variant: "text-bg",
    title: "A note from our founding team",
    category: "Company",
    readTime: "4 min read",
  },
  {
    id: "conversation",
    variant: "logo-bg",
    title: "Credlyr in conversation with HomeServ CEO Sarah Chen",
    category: "Conversations",
    readTime: "12 min watch",
  },
  {
    id: "casestudy",
    variant: "portrait",
    title: "How Apex Dental doubled bookings in 30 days",
    category: "Case Study",
    readTime: "8 min read",
  },
];

function NewsCardImage({ card }: { card: NewsCardData }) {
  if (card.variant === "text-bg") {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-orange-200 to-orange-300 flex items-center justify-center p-8">
        {/* Cloud shapes */}
        <div className="absolute bottom-[30%] left-[8%] w-24 h-10 bg-white/50 rounded-full blur-sm" />
        <div className="absolute bottom-[24%] left-[16%] w-32 h-8 bg-white/40 rounded-full blur-sm" />
        <div className="absolute top-[18%] right-[10%] w-20 h-8 bg-white/35 rounded-full blur-sm" />
        <p className="relative text-[17px] font-semibold text-white text-center leading-snug">
          {card.title}
        </p>
      </div>
    );
  }

  if (card.variant === "logo-bg") {
    return (
      <div className="absolute inset-0">
        <img
          src="/hero-landscape.png"
          alt=""
          className="w-full h-full object-cover object-[center_45%]"
          style={{ filter: "sepia(15%) brightness(105%) saturate(120%) hue-rotate(5deg)" }}
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-[36px] text-white font-bold leading-none select-none">✦</span>
            <p className="text-[15px] text-white/90 font-semibold tracking-wide mt-1 select-none">
              Credlyr
            </p>
          </div>
        </div>
      </div>
    );
  }

  // portrait
  return (
    <div
      className="absolute inset-0 flex items-end"
      style={{
        background: "linear-gradient(135deg, #e8e0d8 0%, #d6ccbf 100%)",
      }}
    >
      {/* Silhouette placeholder — large initials */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-stone-300/60 flex items-center justify-center">
        <span className="text-[28px] font-bold text-stone-500 select-none">AD</span>
      </div>
      {/* Name bar at bottom */}
      <div className="w-full px-5 pb-5 bg-gradient-to-t from-stone-200/80 to-transparent pt-12">
        <p className="text-[13px] font-semibold text-stone-700">Apex Dental</p>
        <p className="text-[11px] text-stone-500">Multi-location dental group</p>
      </div>
    </div>
  );
}

function NewsCard({ card, delay }: { card: NewsCardData; delay: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      className="flex flex-col cursor-pointer group"
    >
      {/* Image container */}
      <div className="aspect-[4/5] rounded-3xl overflow-hidden relative mb-4 shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
        <NewsCardImage card={card} />
      </div>

      {/* Text */}
      <p className="text-[15px] font-semibold text-gray-950 leading-snug mb-2">
        {card.title}
      </p>
      <p className="text-sm text-gray-400 flex items-center gap-1.5">
        <span>{card.category}</span>
        <span className="text-gray-200">—</span>
        <span>{card.readTime}</span>
      </p>
    </motion.article>
  );
}

function NewsSection() {
  return (
    <section
      data-testid="news-section"
      className="w-full bg-white py-24 px-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl font-bold tracking-[-0.025em] text-gray-950 leading-tight"
        >
          News
        </motion.h2>
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors"
        >
          See more
        </motion.a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {NEWS_CARDS.map((card, i) => (
          <NewsCard key={card.id} card={card} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

const FOOTER_COLS = [
  {
    heading: "Product",
    links: ["Automation", "Lead Nurturing", "Booking Engine", "Analytics", "Integrations"],
  },
  {
    heading: "Industries",
    links: ["Dental Practices", "Medical Clinics", "Spas & Wellness", "Real Estate", "Home Services"],
  },
  {
    heading: "Customers",
    links: ["Case Studies", "Reviews", "Partners", "Community"],
  },
  {
    heading: "Company",
    links: ["About", "News", "Careers", "Contact"],
  },
  {
    heading: "Resources",
    links: ["Blog", "Documentation", "Trust", "Security", "Status"],
  },
];

function SiteFooter() {
  return (
    <footer
      data-testid="site-footer"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "60vh" }}
    >
      {/* Painterly background */}
      <img
        src="/hero-landscape.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[center_42%] pointer-events-none select-none"
        style={{ filter: "sepia(15%) brightness(105%) saturate(120%) hue-rotate(5deg)" }}
      />
      {/* Warm dark overlay */}
      <div className="absolute inset-0 bg-stone-900/85 pointer-events-none" />

      {/* Content layer */}
      <div className="relative z-10 flex flex-col justify-between px-10 pt-32 pb-16 min-h-[inherit]" style={{ minHeight: "60vh" }}>

        {/* Logo mark */}
        <div>
          <p className="text-[16px] font-bold text-white/90 tracking-[-0.01em] mb-10 select-none">
            ✦ Credlyr
          </p>

          {/* Link columns — 2-col on mobile, 5-col on md+ */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-10">
            {FOOTER_COLS.map((col) => (
              <div key={col.heading}>
                <p className="text-[13px] font-semibold text-gray-100 mb-4 tracking-wide">
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-gray-300/80 hover:text-white transition-colors duration-150"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal strip */}
        <div className="flex items-center gap-5 mt-16 flex-wrap">
          <span className="text-[12px] text-gray-400">© Credlyr 2026</span>
          <a href="#" className="text-[12px] text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-[12px] text-gray-400 hover:text-white transition-colors">
            Security
          </a>
        </div>

      </div>
    </footer>
  );
}

// ─── Get Started Page ─────────────────────────────────────────────────────────

function GetStartedPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "Google search",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted! We will reach out to you soon.");
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden p-0 m-0 flex items-center justify-center pt-24 pb-16 px-6">
      {/* Full-bleed painting background */}
      <img
        src="/hero-landscape.png?v=2"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 58%",
          maxWidth: "none",
          display: "block",
          margin: 0,
          padding: 0,
          filter: "sepia(15%) brightness(105%) saturate(120%) hue-rotate(5deg)",
        }}
      />

      {/* Gradient scrim */}
      <div
        className="absolute inset-0 pointer-events-none p-0 m-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 55%, rgba(255,255,255,0.15) 70%, rgba(255,255,255,0.45) 82%, rgba(255,255,255,0.80) 92%, #ffffff 100%)",
        }}
      />

      {/* Form Container Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[500px] bg-white/90 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8 md:p-10 flex flex-col"
      >
        <div className="text-center mb-8">
          <h1 className="text-[36px] font-bold tracking-tight text-gray-950 mb-3">
            Get started
          </h1>
          <p className="text-lg text-gray-600 font-normal leading-relaxed">
            Fill out the form and we will reach out to you soon.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <input
              type="text"
              placeholder="Name *"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-white/50 focus:bg-white focus:border-neutral-500 focus:outline-none text-[15px] font-normal transition-all"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <input
              type="email"
              placeholder="Business email *"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-white/50 focus:bg-white focus:border-neutral-500 focus:outline-none text-[15px] font-normal transition-all"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <input
              type="tel"
              placeholder="Phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-white/50 focus:bg-white focus:border-neutral-500 focus:outline-none text-[15px] font-normal transition-all"
            />
          </div>

          {/* Source Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-medium text-gray-500 px-1">
              How did you hear about us?
            </label>
            <select
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="w-full px-5 py-3.5 rounded-xl border border-gray-300 bg-white/50 focus:bg-white focus:border-neutral-500 focus:outline-none text-[15px] font-normal transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1.25rem center",
                backgroundSize: "1rem",
                paddingRight: "2.5rem"
              }}
            >
              <option value="Google search">Google search</option>
              <option value="Referral">Referral</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Message Textarea */}
          <div className="flex flex-col gap-1.5">
            <textarea
              placeholder="How can we help?"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-white/50 focus:bg-white focus:border-neutral-500 focus:outline-none text-[15px] font-normal transition-all resize-none"
            />
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 bg-black text-white text-[15px] font-semibold rounded-full hover:bg-neutral-800 active:scale-[0.98] transition-all cursor-pointer select-none text-center"
          >
            Schedule a call
          </button>
        </form>
      </motion.div>
    </section>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Switch>
        <Route path="/get-started" component={GetStartedPage} />
        <Route path="/">
          <>
            {/* Nav is fixed/transparent — hero image bleeds to page top */}
            <Hero />
            <SocialProof />
            <StatsSection />
            <ValueProposition />
            <InfrastructureHub />
            <FeatureHighlight />
            <NewsSection />
            <SiteFooter />
          </>
        </Route>
      </Switch>
    </div>
  );
}
