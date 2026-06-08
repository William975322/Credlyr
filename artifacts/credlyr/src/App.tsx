import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Lock,
  MinusCircle,
  X,
  Quote,
  CheckSquare,
  Zap,
  MessageSquare,
  SlidersHorizontal,
  LayoutList,
  Menu,
  ChevronRight,
  LineChart,
  ShieldCheck,
  Calendar,
  Clock,
  CheckCircle,
  Info,
  Briefcase,
  Landmark,
  UserCheck,
  DollarSign,
  Fingerprint,
  Users,
  FileText,
  Eye,
  Globe,
  Search,
} from "lucide-react";
import { Link, Route, Switch, useLocation } from "wouter";
import ResourcesHubPage from "./pages/ResourcesHub";
import ArticleDetailPage from "./pages/ArticleDetail";
import AboutPage from "./pages/About";
import ProductPage from "./pages/ProductPage";
import TrustPage from "./pages/Trust";
import CareersPage from "./pages/Careers";

// ─── Nav data ─────────────────────────────────────────────────────────────────

interface NavDropdownColumn {
  title?: string;
  items: { label: string; sub: string; href?: string }[];
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
        title: "Product",
        items: [
          {
            label: "Full-Cycle Websites",
            sub: "Fast, trust-first sites built to convert",
            href: "/product/websites",
          },
          {
            label: "Landing Pages",
            sub: "Pages for every offer and campaign",
            href: "/product/landing-pages",
          },
          {
            label: "Appointment Booking",
            sub: "Frictionless scheduling, zero back-and-forth",
            href: "/product/booking",
          },
        ],
      },
      right: {
        title: "Platform",
        items: [
          {
            label: "Lead Conversion",
            sub: "Keep leads moving from click to deal",
            href: "/product/conversion",
          },
          {
            label: "AI Search Ready",
            sub: "Clear structure for answer engines",
            href: "/product/ai-search",
          },
          {
            label: "Trust Systems",
            sub: "Credibility signals that reduce hesitation",
            href: "/product/trust-systems",
          },
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
          { label: "Dentists", sub: "Surgeries, orthodontics, clinics" },
          { label: "Healthcare", sub: "Medical groups, wellness, therapy" },
          { label: "Local Practices", sub: "Law firms, physio, consultants" },
        ],
      },
      right: {
        title: "Teams",
        items: [
          { label: "Sales", sub: "Lead generation, booking flow" },
          { label: "Marketing", sub: "Positioning, brand, copywriting" },
          { label: "Operations", sub: "CRM sync, workflow automation" },
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
          { label: "About", sub: "Our story", href: "/about" },
          { label: "News", sub: "Press and insights" },
          { label: "Careers", sub: "We're hiring", href: "/careers" },
        ],
      },
    },
  },
  {
    label: "Resources",
    dropdown: {
      variant: "split-preview",
      left: {
        items: [
          { label: "Trust", sub: "Safe, secure, and private", href: "/trust" },
          { label: "Status", sub: "Uptime and availability", href: "/status" },
          {
            label: "Resources hub",
            sub: "Customer stories, insights, product updates",
            href: "/resources-hub",
          },
        ],
      },
    },
  },
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
  const [location] = useLocation();
  const isResourcesPage = location.startsWith("/resources-hub");

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
      <div className="flex items-center justify-between px-5 py-5 sm:px-8 md:px-10 md:py-7">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-[10px] text-2xl md:text-3xl font-bold text-gray-950 tracking-normal select-none"
          data-testid="link-logo"
        >
          <span className="text-2xl md:text-3xl leading-none translate-y-[-1px]">
            ✦
          </span>
          <span>Credlyr</span>
        </a>

        {/* Center plain-text links */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => {
            const ButtonElement = (
              <button
                key={link.label}
                onMouseEnter={() => {
                  if (link.dropdown) {
                    setOpenDropdown(link.label);
                  } else {
                    setOpenDropdown(null);
                  }
                }}
                onFocus={() => {
                  if (link.dropdown) {
                    setOpenDropdown(link.label);
                  } else {
                    setOpenDropdown(null);
                  }
                }}
                onClick={() => {
                  if (link.dropdown) {
                    setOpenDropdown(link.label);
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
              </button>
            );

            if (link.label === "Resources") {
              return (
                <Link key={link.label} href="/resources-hub" asChild>
                  {ButtonElement}
                </Link>
              );
            }

            return ButtonElement;
          })}
        </nav>

        {/* CTA pill */}
        <Link href="/get-started" asChild>
          <a
            className="hidden md:inline-flex items-center px-[18px] py-[8px] bg-black text-white text-[13.5px] font-semibold rounded-full transition-colors duration-150 hover:bg-neutral-800 active:scale-[0.98] cursor-pointer"
            data-testid="button-book-demo"
          >
            {isResourcesPage ? "Schedule a demo" : "Schedule a call"}
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
            className={`absolute left-1/2 -translate-x-1/2 top-[68px] ${
              openDropdown === "Resources" ? "w-[680px]" : "w-[560px]"
            }`}
          >
            <div
              className={`grid bg-neutral-900/95 backdrop-blur-xl shadow-2xl border border-neutral-700/50 ${
                openDropdown === "Resources"
                  ? "grid-cols-[1.15fr_0.85fr] gap-4 rounded-[18px] p-4"
                  : "grid-cols-2 gap-6 rounded-2xl p-6"
              }`}
            >
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
                      {activeLink.dropdown.left.items.map((item) => {
                        const isClickable = activeLink.label !== "Customers";
                        if (isClickable) {
                          return (
                            <Link
                              key={item.label}
                              href={item.href || "/get-started"}
                              asChild
                            >
                              <a
                                className="block text-left px-3 py-2 rounded-xl transition-colors duration-100 cursor-pointer hover:bg-neutral-800/50"
                                data-testid={`dropdown-item-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                              >
                                <div className="text-[13.5px] font-semibold text-white leading-snug">
                                  {item.label}
                                </div>
                                <div className="text-neutral-500 text-sm mt-[2px] font-normal leading-normal">
                                  {item.sub}
                                </div>
                              </a>
                            </Link>
                          );
                        }
                        return (
                          <div
                            key={item.label}
                            className="block text-left px-3 py-2 rounded-xl select-none"
                            data-testid={`dropdown-item-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            <div className="text-[13.5px] font-semibold text-white leading-snug">
                              {item.label}
                            </div>
                            <div className="text-neutral-500 text-sm mt-[2px] font-normal leading-normal">
                              {item.sub}
                            </div>
                          </div>
                        );
                      })}
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
                      {activeLink.dropdown.right?.items.map((item) => {
                        const isClickable = activeLink.label !== "Customers";
                        if (isClickable) {
                          return (
                            <Link
                              key={item.label}
                              href={item.href || "/get-started"}
                              asChild
                            >
                              <a
                                className="block text-left px-3 py-2 rounded-xl transition-colors duration-100 cursor-pointer hover:bg-neutral-800/50"
                                data-testid={`dropdown-item-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                              >
                                <div className="text-[13.5px] font-semibold text-white leading-snug">
                                  {item.label}
                                </div>
                                <div className="text-neutral-500 text-sm mt-[2px] font-normal leading-normal">
                                  {item.sub}
                                </div>
                              </a>
                            </Link>
                          );
                        }
                        return (
                          <div
                            key={item.label}
                            className="block text-left px-3 py-2 rounded-xl select-none"
                            data-testid={`dropdown-item-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            <div className="text-[13.5px] font-semibold text-white leading-snug">
                              {item.label}
                            </div>
                            <div className="text-neutral-500 text-sm mt-[2px] font-normal leading-normal">
                              {item.sub}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Left Column (No Header, padded items) */}
                  <div
                    className={`flex flex-col gap-1 ${
                      openDropdown === "Resources"
                        ? "justify-center border-r border-white/10 py-1 pr-4"
                        : "justify-center"
                    }`}
                  >
                    {activeLink.dropdown.left.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href || "/get-started"}
                        asChild
                      >
                        <a
                          className={`block text-left rounded-xl transition-colors duration-100 cursor-pointer hover:bg-neutral-800/50 ${
                            openDropdown === "Resources"
                              ? "px-4 py-2.5"
                              : "px-3 py-2"
                          }`}
                          data-testid={`dropdown-item-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          <div
                            className={`font-semibold text-white leading-snug ${
                              openDropdown === "Resources"
                                ? "text-[16px]"
                                : "text-[13.5px]"
                            }`}
                          >
                            {item.label}
                          </div>
                          <div
                            className={`mt-[2px] font-normal leading-normal ${
                              openDropdown === "Resources"
                                ? "text-[13.5px] text-neutral-200/80"
                                : "text-sm text-neutral-500"
                            }`}
                          >
                            {item.sub}
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>

                  {/* Right Column (Visual Card Placeholder - bg-neutral-800) */}
                  <div className="flex items-center justify-center">
                    <div
                      className={`w-full flex items-center justify-center overflow-hidden relative group/visual ${
                        openDropdown === "Resources"
                          ? "h-[195px] rounded-lg border border-neutral-200/20 bg-[#f0eee8]"
                          : "aspect-square bg-neutral-800 rounded-xl border border-neutral-700/30"
                      }`}
                    >
                      {openDropdown === "Resources" ? (
                        <ShieldCheck
                          size={48}
                          strokeWidth={1.5}
                          className="text-neutral-600 group-hover/visual:scale-105 transition-transform duration-300"
                          aria-hidden="true"
                        />
                      ) : (
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
                      )}
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
                className="flex items-center gap-[10px] text-2xl font-bold text-white tracking-normal select-none"
              >
                <span className="text-2xl leading-none translate-y-[-1px]">
                  ✦
                </span>
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
              {NAV_LINKS.map((link) => {
                const isResources = link.label === "Resources";
                const isCompany = link.label === "Company";
                const hrefVal = isResources
                  ? "/resources-hub"
                  : isCompany
                  ? "/about"
                  : isResourcesPage
                  ? `/#${link.label.toLowerCase()}`
                  : `#${link.label.toLowerCase()}`;
                return (
                  <Link key={link.label} href={hrefVal} asChild>
                    <a
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between text-[18px] font-medium text-white py-4 border-b border-neutral-900 hover:text-neutral-300 transition-colors cursor-pointer"
                    >
                      <span>{link.label}</span>
                      <ChevronRight size={16} className="text-neutral-500" />
                    </a>
                  </Link>
                );
              })}
            </div>

            {/* Bottom section */}
            <div className="pt-6 border-t border-neutral-900 flex flex-col gap-4">
              <Link href="/get-started" asChild>
                <a
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center py-3.5 bg-white text-black text-[15px] font-semibold rounded-full hover:bg-neutral-200 active:scale-[0.98] transition-all cursor-pointer"
                >
                  {isResourcesPage ? "Schedule a demo" : "Schedule a call"}
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
      className="relative w-full h-[100svh] min-h-[660px] md:min-h-[760px] overflow-hidden p-0 m-0"
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
          filter: "sepia(15%) brightness(105%) saturate(120%) hue-rotate(5deg)",
        }}
      />

      {/* Gradient scrim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.08) 66%, rgba(255,255,255,0.24) 78%, rgba(255,255,255,0.52) 90%, rgba(255,255,255,0.9) 100%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-[clamp(52px,9vh,96px)] z-10 text-center px-5 sm:px-6">
        {/* Announcement pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="px-4 py-1.5 rounded-full bg-gray-950/95 text-white text-xs font-medium tracking-normal mb-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
        >
          Websites for the AI search era
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="max-w-4xl text-balance text-[clamp(46px,8vw,88px)] leading-[0.98] tracking-normal font-normal text-gray-950"
        >
          Websites built
          <br />
          for conversion
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
          className="mt-5 md:mt-6 max-w-[680px] text-balance text-[clamp(17px,2.1vw,22px)] leading-[1.42] text-neutral-700 font-normal mb-7 md:mb-8"
        >
          Credlyr builds fast, clear, trust-heavy websites that turn
          decision-ready visitors into buyers before they hit the back button.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.36 }}
        >
          <Link href="/get-started" asChild>
            <a
              className="inline-flex items-center px-8 py-3.5 bg-black text-white rounded-full font-semibold text-[15px] md:text-[16px] hover:bg-gray-800 active:scale-[0.98] transition-all cursor-pointer shadow-[0_18px_45px_rgba(0,0,0,0.22)]"
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
      className="w-full bg-white py-16 md:py-24 px-5 sm:px-8 md:px-10 border-y border-gray-100"
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
            {Array(4)
              .fill(TRUSTED_LOGOS)
              .flat()
              .map((name, i) => (
                <span
                  key={i}
                  className="text-[17px] font-semibold text-gray-300 tracking-normal"
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
      className="w-full bg-white pt-16 md:pt-24 pb-10 md:pb-12 px-5 sm:px-8 md:px-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-left flex flex-col items-start">
        {/* H2 heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-gray-950 leading-[1.08] mb-0"
        >
          Designed to convert.
          <br />
          Built to scale.
        </motion.h2>

        {/* Stats Row */}
        <div className="flex flex-row flex-wrap justify-start items-start gap-8 md:gap-12 mt-8 w-full">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.1,
              }}
              className="flex flex-col items-start text-left"
              data-testid={`stat-block-${i}`}
            >
              <span
                className="text-6xl md:text-[80px] font-bold tracking-tight text-gray-950 leading-none"
                data-testid={`stat-value-${i}`}
              >
                {stat.value}
              </span>
              <span
                className="text-[14px] md:text-[15px] font-normal text-neutral-500 mt-3 leading-tight"
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

const DriveRevenueIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 text-neutral-900 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M7 16l4-4 4 3 3-5" />
    <circle cx="7" cy="16" r="0.8" className="fill-neutral-900" />
    <circle cx="11" cy="12" r="0.8" className="fill-neutral-900" />
    <circle cx="15" cy="15" r="0.8" className="fill-neutral-900" />
    <circle cx="18" cy="10" r="0.8" className="fill-neutral-900" />
  </svg>
);

const ComplianceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 text-neutral-900 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="5" y="11" width="14" height="10" rx="3" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    <circle cx="12" cy="16" r="0.8" className="fill-neutral-900" />
  </svg>
);

const ReduceCostsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 text-neutral-900 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const VALUE_PROPS = [
  {
    Icon: DriveRevenueIcon,
    heading: "Drive revenue",
    body: "Credlyr's platform is built to help enterprises grow. Optimised to eliminate friction and instantly deliver higher conversion.",
  },
  {
    Icon: ComplianceIcon,
    heading: "Future-proof compliance",
    body: "A powerful policy engine translates KYC, KYB and AML into code - enabling the industry's most detailed audit trails.",
  },
  {
    Icon: ReduceCostsIcon,
    heading: "Reduce costs",
    body: "Eliminate manual checks, endless emails and lengthy reviews - by automating manual work with compliant, auditable AI.",
  },
];

function ValueProposition() {
  return (
    <section
      data-testid="value-proposition-section"
      className="w-full bg-white pt-0 pb-16 md:pb-24 px-5 sm:px-8 md:px-10"
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
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.1,
              }}
              data-testid={`value-card-${i}`}
              className={`px-0 py-10 md:px-8 md:py-12 flex flex-col items-start text-left ${
                i < 2 ? "md:border-r md:border-neutral-200" : ""
              }`}
            >
              {/* Icon — thin stroke, custom SVG */}
              <Icon />

              {/* Heading */}
              <h3 className="text-[18px] md:text-[19px] font-bold text-gray-950 mb-3 leading-snug">
                {heading}
              </h3>

              {/* Body */}
              <p className="text-[14px] md:text-[15px] text-neutral-500 leading-relaxed font-normal">
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AI Visual Section ────────────────────────────────────────────────────────

// ─── AI Awareness Cycle Section ────────────────────────────────────────────────

const NumberOneCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-current" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8M10 10l2-2" />
  </svg>
);

function OnboardHighlight() {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      icon: Briefcase,
      title: "20+ Layout components",
      desc: "Configure every page section to fit your campaign needs – from heroes to grids, forms, and more.",
    },
    {
      icon: Zap,
      title: "Optimised for conversion",
      desc: "Benefit from data pre-fills, dynamic user interfaces, smart reminders, and intelligent optimisations.",
    },
    {
      icon: NumberOneCircleIcon,
      title: "First-time-right data collection",
      desc: "Adapt data collection in real-time based on visitor behavior, country routing, and conversion rules.",
    },
    {
      icon: Globe,
      title: "Multi-language ready",
      desc: "Launch in 7+ languages out of the box. Visitors see your site in their language, automatically.",
    },
  ];

  // For localization rotation
  const [localIndex, setLocalIndex] = useState(0);
  const localizations = [
    { country: "United States", flag: "🇺🇸", method: "ACH / Plaid", currency: "USD", rule: "SEC / FINRA" },
    { country: "Germany", flag: "🇩🇪", method: "Sofort / SEPA", currency: "EUR", rule: "BaFin Compliant" },
    { country: "Netherlands", flag: "🇳🇱", method: "iDEAL / SEPA", currency: "EUR", rule: "DNB Compliant" },
    { country: "United Kingdom", flag: "🇬🇧", method: "Faster Payments", currency: "GBP", rule: "FCA Compliant" },
  ];

  useEffect(() => {
    if (activeIndex !== 3) return;
    const timer = setInterval(() => {
      setLocalIndex((prev) => (prev + 1) % localizations.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <section
      data-testid="onboard-highlight-section"
      className="w-full bg-[#fbfaf7] py-16 md:py-24 px-5 sm:px-8 md:px-10 border-t border-neutral-100"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="text-left">
            <span className="inline-block bg-[#eae7e1]/50 border border-neutral-250/20 text-neutral-600 rounded-full px-3 py-1 text-[12px] font-medium mb-4">
              Onboard
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-950 leading-[1.1] mb-3">
              Drive revenues with Credlyr Onboard
            </h2>
            <p className="text-lg md:text-[19px] text-neutral-500 font-normal leading-relaxed">
              High-converting onboarding journeys, no code required.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link to="/product/websites" className="inline-flex items-center gap-1.5 px-6 py-2.5 border border-neutral-250/80 rounded-full text-[14px] font-semibold text-gray-950 hover:bg-neutral-50 transition-all hover:shadow-[0_2px_8px_rgba(0,0,0,0.02)] bg-white">
              Explore <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Two-column layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Visual Showcase */}
          <div className="bg-[#f5f3ef]/80 border border-neutral-200/60 rounded-[32px] p-6 md:p-10 flex items-center justify-center min-h-[440px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              {activeIndex === 0 && (
                <motion.div
                  key="modules"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-2.5 w-full max-w-[290px] select-none text-left"
                >
                  {/* Web sections templates list */}
                  {[
                    { label: "Pricing grid", color: "text-rose-500 bg-rose-50/80", icon: DollarSign },
                    { label: "Hero header", color: "text-blue-500 bg-blue-50/80", icon: LayoutList },
                    { label: "Feature list", color: "text-amber-600 bg-amber-50/80", icon: CheckSquare },
                    {
                      label: "Contact form",
                      color: "text-white bg-purple-600",
                      icon: MessageSquare,
                      isActive: true,
                    },
                    { label: "Testimonials", color: "text-teal-500 bg-teal-50/80", icon: Users },
                    { label: "FAQ section", color: "text-emerald-600 bg-emerald-50/80", icon: FileText },
                    { label: "Footer layout", color: "text-neutral-500 bg-neutral-100/80", icon: Eye },
                  ].map((m, idx) => {
                    const MIcon = m.icon;
                    return (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className={`flex items-center gap-3.5 px-4 py-2.5 rounded-2xl border transition-all ${
                          m.isActive
                            ? "bg-white border-purple-100 shadow-[0_12px_28px_rgba(147,51,234,0.06),0_4px_8px_rgba(147,51,234,0.03)] scale-[1.04]"
                            : "bg-white/70 border-neutral-200/40 text-neutral-600"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${m.color}`}>
                          <MIcon className="w-4.5 h-4.5" />
                        </div>
                        <span className={`text-[14px] ${m.isActive ? "font-bold text-gray-950" : "font-semibold"}`}>
                          {m.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              {activeIndex === 1 && (
                <motion.div
                  key="conversion"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[280px] select-none flex flex-col gap-3 text-left"
                >
                  {/* Duna conversion autofill card mockup adapted to website context */}
                  <div className="flex flex-col gap-1 w-full">
                    <span className="text-[11.5px] font-bold text-neutral-400 uppercase tracking-wider pl-0.5">
                      Business search
                    </span>
                    <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl border border-emerald-500 bg-white shadow-xs">
                      <Search className="w-4 h-4 text-neutral-400" />
                      <span className="text-[14px] text-gray-900 font-semibold">Credlyr B.V.</span>
                    </div>
                  </div>

                  {/* Down Arrow */}
                  <div className="flex justify-center -my-0.5">
                    <svg width="10" height="24" viewBox="0 0 10 24" fill="none" stroke="#d4d4d8" strokeWidth="1.5">
                      <line x1="5" y1="0" x2="5" y2="24" />
                      <path d="M2 19l3 3 3-3" />
                    </svg>
                  </div>

                  {/* Card 1 */}
                  <div className="bg-white border border-neutral-200/50 rounded-2xl p-4 shadow-sm flex flex-col gap-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded bg-gray-950 flex items-center justify-center text-[9px] text-white">✦</div>
                      <span className="text-[14px] font-bold text-gray-900">Business details</span>
                    </div>
                    <div className="flex items-center gap-1 pl-7 text-[12px] text-emerald-600 font-bold">
                      <Zap className="w-3.5 h-3.5 fill-emerald-600" /> Autofilled
                    </div>
                  </div>

                  {/* Down Arrow */}
                  <div className="flex justify-center -my-0.5">
                    <svg width="10" height="24" viewBox="0 0 10 24" fill="none" stroke="#d4d4d8" strokeWidth="1.5">
                      <line x1="5" y1="0" x2="5" y2="24" />
                      <path d="M2 19l3 3 3-3" />
                    </svg>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white border border-neutral-200/50 rounded-2xl p-4 shadow-sm flex flex-col gap-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded bg-gray-950 flex items-center justify-center text-[9px] text-white">✦</div>
                      <span className="text-[14px] font-bold text-gray-900">Representatives</span>
                    </div>
                    <div className="flex items-center gap-1 pl-7 text-[12px] text-emerald-600 font-bold">
                      <Zap className="w-3.5 h-3.5 fill-emerald-600" /> Autofilled
                    </div>
                  </div>
                </motion.div>
              )}

              {activeIndex === 2 && (
                <motion.div
                  key="data-collection"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[320px] select-none flex items-center justify-between text-left relative"
                >
                  {/* Left Card: Settings */}
                  <div className="w-[125px] bg-white border border-neutral-200/50 rounded-2xl p-4 shadow-sm flex flex-col gap-2">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Settings</span>
                    <div className="bg-neutral-50 border border-neutral-200/60 rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-neutral-600">
                      Risk level: Medium
                    </div>
                    <div className="bg-neutral-50 border border-neutral-200/60 rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-neutral-600">
                      Country: NL
                    </div>
                    <div className="bg-neutral-50 border border-neutral-200/60 rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-neutral-600">
                      Business type: SaaS
                    </div>
                  </div>

                  {/* Connecting Schematic Line */}
                  <div className="flex-1 h-[90px] flex items-center justify-center">
                    <svg width="32" height="90" viewBox="0 0 32 90" fill="none" stroke="#d4d4d8" strokeWidth="1.5">
                      <path d="M0 20 H8 Q16 20 16 35 V55 Q16 70 8 70 H0" />
                      <path d="M0 45 H16" />
                      <path d="M32 20 H24 Q16 20 16 35 V55 Q16 70 24 70 H32" />
                      <path d="M32 45 H16" />
                    </svg>
                  </div>

                  {/* Right Card: Information */}
                  <div className="w-[135px] bg-white border border-neutral-200/50 rounded-2xl p-4 shadow-sm flex flex-col gap-2">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Information</span>
                    {[
                      { label: "UBO" },
                      { label: "Bank account" },
                      { label: "Ownership" },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between py-1 border-b border-neutral-50 last:border-0">
                        <span className="text-[12px] font-bold text-neutral-600">{row.label}</span>
                        <div className="w-4.5 h-4.5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] shrink-0 font-bold select-none leading-none">
                          ✓
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeIndex === 3 && (
                <motion.div
                  key="localization"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[260px] select-none"
                >
                  {/* Duna-style language selector dropdown */}
                  <div className="bg-white border border-neutral-200/50 rounded-2xl overflow-hidden shadow-lg">
                    {/* Selected language row */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg leading-none">🇬🇧</span>
                        <span className="text-[14px] font-semibold text-gray-900">English</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-400 rotate-90" />
                    </div>

                    {/* Dropdown list */}
                    <div className="flex flex-col divide-y divide-neutral-50">
                      {[
                        { flag: "🇩🇪", label: "Deutsch",    active: false },
                        { flag: "🇬🇧", label: "English",    active: true  },
                        { flag: "🇪🇸", label: "Español",    active: false },
                        { flag: "🇫🇷", label: "Français",   active: false },
                        { flag: "🇮🇹", label: "Italiano",   active: false },
                        { flag: "🇳🇱", label: "Nederlands", active: false },
                        { flag: "🇵🇹", label: "Português",  active: false },
                      ].map((lang, i) => (
                        <motion.div
                          key={lang.label}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                          className={`flex items-center justify-between px-4 py-2.5 ${
                            lang.active ? "bg-neutral-50" : "bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base leading-none">{lang.flag}</span>
                            <span className={`text-[13px] font-semibold ${
                              lang.active ? "text-gray-950" : "text-neutral-500"
                            }`}>{lang.label}</span>
                          </div>
                          {lang.active && (
                            <span className="text-[12px] text-neutral-400">✓</span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Clickable Features Accordion */}
          <div className="flex flex-col justify-center gap-4 text-left w-full">
            {features.map((f, index) => {
              const FIcon = f.icon;
              const isActive = index === activeIndex;

              return (
                <button
                  key={f.title}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left rounded-2xl transition-all duration-300 border focus:outline-none cursor-pointer ${
                    isActive
                      ? "bg-[#eae7e1]/45 border-neutral-250/20 shadow-[0_4px_12px_rgba(0,0,0,0.02)] p-6"
                      : "bg-transparent border-transparent hover:bg-[#eae7e1]/20 p-5"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? "bg-gray-950 text-white" : "bg-[#eae7e1]/50 text-neutral-500"
                    }`}>
                      <FIcon className="w-5 h-5" />
                    </div>
                    <span className={`text-[16px] md:text-[17px] font-bold text-gray-950`}>
                      {f.title}
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm md:text-[14.5px] text-neutral-600 leading-relaxed pl-14 font-normal">
                          {f.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Infrastructure Hub ───────────────────────────────────────────────────────

// ─── Our Services Section ──────────────────────────────────────────────────────

function BrandVisual() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-[#161514] flex flex-col justify-between p-6 md:p-8 select-none border border-neutral-850">
      {/* Editorial typographic grid */}
      <div className="flex justify-between items-start">
        <span className="text-[11px] font-mono tracking-widest text-[#e6e2da]/70 uppercase">
          Brand System / V1
        </span>
        <span className="text-[11px] font-mono tracking-widest text-neutral-500">
          © 2026
        </span>
      </div>

      <div className="relative flex-1 flex items-center justify-center my-4">
        {/* Floating abstract graphic elements */}
        <div className="absolute w-36 h-36 rounded-full border border-neutral-800 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border border-neutral-800/60 flex items-center justify-center">
            <div className="text-[32px] font-bold text-neutral-700 font-serif">✦</div>
          </div>
        </div>

        {/* Dynamic typographic layout */}
        <div className="relative text-center z-10 flex flex-col items-center">
          <span className="text-[38px] font-normal font-serif text-neutral-300 leading-none tracking-tight">
            CREDLYR
          </span>
          <span className="text-[34px] font-normal italic font-serif text-[#e6e2da] leading-none tracking-normal mt-1">
            Studio
          </span>
          <span className="text-[38px] font-semibold font-sans text-white leading-none tracking-tighter mt-2">
            CREATIVE
          </span>
        </div>
      </div>

      <div className="flex justify-between items-end border-t border-neutral-900 pt-4">
        <span className="text-[10px] text-neutral-600 font-mono">
          SYSTEM / STORY / VALUE
        </span>
        <span className="text-[10px] text-neutral-400 font-mono">
          CREDLYR®
        </span>
      </div>
    </div>
  );
}

function DigitalVisual() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-[#faf9f6] flex flex-col justify-between p-6 md:p-8 select-none border border-neutral-200/80 shadow-sm">
      {/* Visual background accents */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0080ff]/5 to-transparent pointer-events-none" />

      <div className="flex justify-between items-start">
        <span className="text-[11px] font-mono tracking-widest text-[#0080ff]/75 uppercase">
          Digital Interface / UX
        </span>
        <span className="text-[11px] font-mono tracking-widest text-neutral-400">
          Live Preview
        </span>
      </div>

      <div className="relative flex-1 flex items-center justify-center my-4">
        {/* Mock Desktop Browser Window */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-[280px] md:w-[320px] h-[160px] md:h-[180px] rounded-xl bg-white border border-neutral-200/70 shadow-lg flex flex-col overflow-hidden z-10"
        >
          {/* Browser Header Bar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-100 bg-neutral-50/50">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
            </div>
            <div className="w-36 h-3 bg-neutral-200/60 rounded-full" />
            <div className="w-4" />
          </div>

          {/* Browser Content */}
          <div className="p-3 flex-1 flex flex-col justify-between">
            {/* Header / Nav Mock */}
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-blue-500 flex items-center justify-center text-[7px] text-white">✦</div>
                <div className="w-8 h-2 bg-neutral-300 rounded-full" />
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-1.5 bg-neutral-200 rounded-full" />
                <div className="w-6 h-1.5 bg-neutral-200 rounded-full" />
                <div className="w-6 h-1.5 bg-neutral-200 rounded-full" />
              </div>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-[1.2fr_0.8fr] gap-3 flex-1">
              <div className="flex flex-col justify-center gap-2">
                <div className="w-24 h-3 bg-neutral-800 rounded-full" />
                <div className="w-16 h-2 bg-neutral-400 rounded-full" />
                <div className="space-y-1 mt-1">
                  <div className="w-32 h-1 bg-neutral-200 rounded-full" />
                  <div className="w-28 h-1 bg-neutral-200 rounded-full" />
                </div>
                <div className="w-12 h-3.5 bg-blue-500 rounded mt-1" />
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full h-full rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center p-2">
                  <div className="flex flex-col items-center gap-1.5 w-full">
                    <div className="w-8 h-8 rounded-full border border-blue-500/30 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <span className="text-[10px] text-blue-600 font-bold">✓</span>
                      </div>
                    </div>
                    <div className="w-12 h-1.5 bg-neutral-300 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mock Mobile Phone Window (Overlapping) */}
        <motion.div
          animate={{ y: [0, -9, 0], x: [0, -1, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="absolute right-4 md:right-8 bottom-2 w-[84px] md:w-[92px] h-[146px] md:h-[160px] rounded-2xl bg-white border-[3px] border-neutral-800 shadow-2xl flex flex-col overflow-hidden z-20"
        >
          {/* Mobile Speaker Slot */}
          <div className="w-7 h-1 bg-neutral-800 rounded-full mx-auto mt-1 mb-1" />

          {/* Mobile Body Content */}
          <div className="p-1.5 flex-1 flex flex-col justify-between">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <div className="flex flex-col gap-[1.5px] items-end">
                <div className="w-3 h-[1.5px] bg-neutral-400 rounded-full" />
                <div className="w-2.5 h-[1.5px] bg-neutral-400 rounded-full" />
              </div>
            </div>

            {/* Mobile Body Page Stack */}
            <div className="flex-1 flex flex-col gap-1.5 justify-center">
              <div className="w-14 h-2.5 bg-neutral-800 rounded-full" />
              <div className="w-10 h-1.5 bg-neutral-400 rounded-full" />
              
              <div className="w-full h-11 bg-neutral-50 border border-neutral-100 rounded-md flex items-center justify-center p-1 my-0.5">
                <div className="flex flex-col items-center gap-1 w-full">
                  <div className="w-4 h-4 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <span className="text-[6px] text-blue-600 font-bold">✓</span>
                  </div>
                  <div className="w-8 h-1 bg-neutral-300 rounded-full" />
                </div>
              </div>

              <div className="w-full h-2.5 bg-blue-500 rounded" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-between items-end border-t border-neutral-200/50 pt-4">
        <span className="text-[10px] text-neutral-400 font-mono">
          WEBSITE UX / RESPONSIVE
        </span>
        <span className="text-[10px] text-neutral-600 font-mono">
          MOBILE / DESKTOP
        </span>
      </div>
    </div>
  );
}

function OurServices() {
  const brandServices = [
    "Brand Strategy",
    "Positioning",
    "Brand architecture",
    "Naming",
    "Visual identity",
    "Verbal identity",
    "Design Systems",
    "Brand Guidelines",
  ];

  const digitalServices = [
    "Digital strategy",
    "Website UX",
    "Website UI",
    "Platform & Product UI",
    "Website development",
    "Ongoing optimisation",
  ];

  return (
    <section
      data-testid="our-services-section"
      className="w-full bg-[#fbfaf7] py-20 md:py-32 px-5 sm:px-8 md:px-10 border-t border-neutral-100"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-left">
        {/* Section Header */}
        <div className="max-w-4xl mb-20 md:mb-28">
          <p className="font-serif italic text-[17px] md:text-[19px] text-[#8c887d] mb-4">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[60px] font-normal tracking-tight text-gray-950 leading-[1.05] max-w-3xl">
            Blending brand and digital we turn <span className="font-serif italic">emotional connection</span> into <span className="font-serif italic text-neutral-700">meaningful growth</span>.
          </h2>
        </div>

        {/* Services Columns */}
        <div className="flex flex-col gap-24 md:gap-32">
          
          {/* Row 1: Brand */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
            {/* Visual block */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <BrandVisual />
            </motion.div>

            {/* Info block */}
            <div className="flex flex-col items-start">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-2xl font-bold font-serif text-gray-950">Brand</h3>
              </div>

              {/* Description */}
              <p className="text-[16px] md:text-[17px] text-neutral-600 leading-relaxed font-normal mb-8">
                Brand is how your business shows up in the world. It shapes perception, builds trust, and gives people a reason to believe in what you do. We define the strategy, narrative and identity that bring your brand into focus.
              </p>

              {/* Sub-services list */}
              <ul className="flex flex-col gap-3">
                {brandServices.map((service, idx) => (
                  <motion.li
                    key={service}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="text-[17px] md:text-[18px] text-gray-750 hover:text-gray-950 font-serif italic cursor-pointer transition-colors duration-150 relative group w-fit"
                  >
                    {service}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-400 group-hover:w-full transition-all duration-200" />
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Row 2: Digital */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
            {/* Visual block (order-last on large screens to offset) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:order-last"
            >
              <DigitalVisual />
            </motion.div>

            {/* Info block */}
            <div className="flex flex-col items-start">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-2xl font-bold font-serif text-gray-950">Digital</h3>
              </div>

              {/* Description */}
              <p className="text-[16px] md:text-[17px] text-neutral-600 leading-relaxed font-normal mb-8">
                Digital is where your brand is experienced. It’s how people engage, interact, and decide. We design and build digital experiences that turn a single, defining feeling into seamless journeys – from strategy and UX to design and development.
              </p>

              {/* Sub-services list */}
              <ul className="flex flex-col gap-3 mb-8">
                {digitalServices.map((service, idx) => (
                  <motion.li
                    key={service}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="text-[17px] md:text-[18px] text-gray-750 hover:text-gray-950 font-serif italic cursor-pointer transition-colors duration-150 relative group w-fit"
                  >
                    {service}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-400 group-hover:w-full transition-all duration-200" />
                  </motion.li>
                ))}
              </ul>

              {/* Project links under Digital */}
              <div className="flex items-center gap-4 flex-wrap border-t border-neutral-200/60 pt-6 w-full">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mr-2 font-mono">Featured Projects:</span>
                {["Charlie Oscar", "Vertical", "Venga"].map((proj) => (
                  <a
                    key={proj}
                    href="#"
                    className="text-[13px] font-semibold text-neutral-700 hover:text-black flex items-center gap-0.5 group transition-colors font-mono"
                  >
                    {proj}
                    <span className="inline-block transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150">↘</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
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

type DashboardItem = {
  label: string;
  count: number | null;
  active: boolean;
};

type DashboardState = {
  title: string;
  items: DashboardItem[];
};

const FEATURE_ITEMS: FeatureItem[] = [
  {
    id: "automated",
    icon: CheckSquare,
    title: "Full-Cycle Websites",
    description:
      "Turn attention into action with a fast, clear site that sells your offer before the buyer loses interest.",
  },
  {
    id: "efficiency",
    icon: Zap,
    title: "Landing pages at scale",
    description:
      "Build focused pages per offer, campaign, and audience so every visitor lands on the argument they need.",
  },
  {
    id: "messaging",
    icon: MessageSquare,
    title: "Trust-first messaging",
    description:
      "Make proof, positioning, and next steps obvious enough for decision-ready visitors to act quickly.",
  },
  {
    id: "audit",
    icon: SlidersHorizontal,
    title: "Clear performance view",
    description:
      "See which pages, offers, and proof points create action so the site keeps improving over time.",
  },
];

const DASHBOARD_STATES: Record<string, DashboardState> = {
  automated: {
    title: "Launch Checklist",
    items: [
      { label: "Mobile speed optimization", count: 99, active: true },
      { label: "SEO schema structure", count: 1, active: false },
      { label: "Trust system synchronization", count: 4, active: false },
      { label: "Form fields friction cut", count: 2, active: false },
      { label: "All tasks completed", count: null, active: false },
    ],
  },
  efficiency: {
    title: "Campaign Pages",
    items: [
      { label: "Dental Implants Offer", count: 8, active: true },
      { label: "Emergency Care Page", count: 3, active: false },
      { label: "Teeth Whitening Special", count: 4, active: false },
      { label: "Local Cleaning Campaign", count: 2, active: false },
      { label: "All active campaigns", count: null, active: false },
    ],
  },
  messaging: {
    title: "Collect Trust Signals",
    items: [],
  },
  audit: {
    title: "Performance Logs",
    items: [
      { label: "Daily conversion check", count: 8, active: true },
      { label: "Active A/B tests", count: 3, active: false },
      { label: "Page Speed auto scans", count: 12, active: false },
      { label: "Analytics exports ready", count: 2, active: false },
      { label: "All records normal", count: null, active: false },
    ],
  },
};

function MessagingPreview() {
  return (
    <div className="relative mx-auto flex min-h-[360px] max-w-[560px] items-center justify-center overflow-hidden rounded-[28px] bg-[#ebe9e5] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_24px_70px_rgba(0,0,0,0.08)] md:min-h-[460px] md:p-12">
      <div className="absolute left-1/2 top-[22%] h-24 w-[72%] -translate-x-1/2 rounded-2xl bg-white/45 shadow-[0_12px_40px_rgba(0,0,0,0.04)]" />
      <div className="absolute left-1/2 top-[18%] h-24 w-[64%] -translate-x-1/2 rounded-2xl bg-white/30 shadow-[0_12px_40px_rgba(0,0,0,0.03)]" />

      <div className="relative w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
        <h3 className="text-[22px] font-semibold leading-tight text-gray-900">
          Collect Customer Proof
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-gray-600">
          Automate review requests right after appointment completion.
        </p>

        <div className="mt-5 rounded-lg bg-sky-50 px-4 py-4 text-[14px] leading-relaxed text-sky-800">
          "Hi Sarah, thank you for booking through Credlyr today! Would you mind sharing a quick 1-minute review of your dental cleaning?"
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-gray-800"
          >
            <X size={16} strokeWidth={1.8} />
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-[14px] font-semibold text-gray-900"
          >
            <ChevronRight size={16} strokeWidth={1.8} className="rotate-180" />
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}

const PERFORMANCE_METRICS = [
  { label: "Site visitors", value: "3,842", change: "+18%" },
  { label: "Booked calls", value: "126", change: "+31%" },
  { label: "Conversion", value: "8.4%", change: "+2.1%" },
];

const PERFORMANCE_PAGES = [
  { label: "Dental implants", value: "12.8%", width: "92%" },
  { label: "Emergency dentist", value: "9.6%", width: "74%" },
  { label: "Whitening offer", value: "6.1%", width: "52%" },
];

function PerformancePreview() {
  return (
    <div className="relative mx-auto flex min-h-[360px] max-w-[560px] items-center justify-center overflow-hidden rounded-[28px] bg-[#ebe9e5] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_24px_70px_rgba(0,0,0,0.08)] md:min-h-[460px] md:p-10">
      <div className="w-full max-w-[430px] rounded-2xl bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-neutral-400">
              Performance
            </p>
            <h3 className="mt-1 text-[22px] font-semibold leading-tight text-neutral-900">
              Conversion overview
            </h3>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
            <LineChart size={20} strokeWidth={1.7} aria-hidden="true" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {PERFORMANCE_METRICS.map((metric) => (
            <div key={metric.label} className="rounded-xl bg-neutral-50 p-3">
              <p className="text-[11px] leading-tight text-neutral-400">
                {metric.label}
              </p>
              <p className="mt-2 text-[20px] font-semibold leading-none text-neutral-900">
                {metric.value}
              </p>
              <p className="mt-2 text-[11px] font-semibold text-emerald-600">
                {metric.change}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[13px] font-semibold text-neutral-900">
              Top converting pages
            </p>
            <p className="text-[12px] text-neutral-400">Last 30 days</p>
          </div>

          <div className="space-y-4">
            {PERFORMANCE_PAGES.map((page) => (
              <div key={page.label}>
                <div className="mb-1.5 flex items-center justify-between gap-4">
                  <span className="text-[13px] font-medium text-neutral-700">
                    {page.label}
                  </span>
                  <span className="text-[13px] font-semibold text-neutral-900">
                    {page.value}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-neutral-900"
                    style={{ width: page.width }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center">
            {["Visit", "Lead", "Booked"].map((step, index) => (
              <div key={step} className="contents">
                <div className="rounded-lg bg-[#ebe9e5] px-3 py-2 text-[12px] font-semibold text-neutral-700">
                  {step}
                </div>
                {index < 2 && (
                  <ChevronRight
                    size={16}
                    strokeWidth={1.8}
                    className="text-neutral-300"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureHighlight() {
  const [activeId, setActiveId] = useState<string>("automated");
  const activeDashboard = DASHBOARD_STATES[activeId];

  return (
    <section
      data-testid="feature-highlight-section"
      className="w-full bg-white py-16 md:py-24 px-5 sm:px-8 md:px-10"
    >
      {/* Header row */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12 md:mb-16">
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
            className="text-3xl md:text-4xl font-bold tracking-normal text-gray-950 leading-tight max-w-lg"
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
            Increase booking quality and cut costs — by removing manual
            follow-up from your team's plate.
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
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.07,
                }}
                onClick={() => setActiveId(item.id)}
                className={`w-full rounded-xl px-4 py-4 text-left cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 border ${
                  isActive
                    ? "bg-white border-blue-500/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                    : "bg-transparent border-transparent hover:bg-gray-50/60"
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
              </motion.button>
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
          <AnimatePresence mode="wait">
            {activeId === "messaging" ? (
              <motion.div
                key="messaging-preview"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <MessagingPreview />
              </motion.div>
            ) : activeId === "audit" ? (
              <motion.div
                key="performance-preview"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <PerformancePreview />
              </motion.div>
            ) : (
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#ebe9e5] rounded-[28px] p-7 md:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_24px_70px_rgba(0,0,0,0.08)]"
              >
                <div className="mx-auto bg-white rounded-2xl shadow-[0_18px_55px_rgba(0,0,0,0.08)] overflow-hidden max-w-[520px]">
                  <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
                    <LayoutList
                      size={16}
                      strokeWidth={1.6}
                      className="text-gray-500"
                    />
                    <span className="text-[18px] font-semibold text-gray-900">
                      {activeDashboard.title}
                    </span>
                  </div>

                  <div className="divide-y divide-gray-50">
                    {activeDashboard.items.map((item) => (
                      <div
                        key={item.label}
                        className={`flex items-center justify-between px-6 py-4 transition-colors cursor-default ${
                          item.active ? "bg-[#efeeeb]" : "bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              item.active ? "bg-gray-600" : "bg-gray-300"
                            }`}
                          />
                          <span
                            className={`text-[15px] md:text-[16px] ${
                              item.active
                                ? "text-gray-900 font-medium"
                                : "text-gray-500"
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                        {item.count !== null && (
                          <span className="text-[14px] text-gray-400 tabular-nums">
                            {item.count}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Security Trust ───────────────────────────────────────────────────────────

function TrustBadge({
  label,
  sublabel,
  variant = "plain",
}: {
  label: string;
  sublabel?: string;
  variant?: "plain" | "stars" | "ring";
}) {
  return (
    <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 md:h-32 md:w-32">
      {variant === "stars" ? (
        <div className="relative h-full w-full">
          {Array.from({ length: 12 }).map((_, index) => {
            const angle = (index / 12) * Math.PI * 2;
            const x = 50 + Math.cos(angle) * 34;
            const y = 50 + Math.sin(angle) * 34;
            return (
              <span
                key={index}
                className="absolute text-[13px] font-semibold text-neutral-400"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                ★
              </span>
            );
          })}
          <span className="absolute inset-0 flex items-center justify-center text-[20px] font-bold text-neutral-600">
            {label}
          </span>
        </div>
      ) : (
        <div className="text-center">
          {variant === "ring" && (
            <div className="mx-auto mb-1 h-9 w-9 rounded-full border-2 border-neutral-400">
              <div className="mx-auto mt-2 h-4 w-8 rounded-[50%] border border-neutral-400" />
            </div>
          )}
          <p className="text-[19px] font-bold leading-[1.05] text-neutral-600 md:text-[21px]">
            {label}
          </p>
          {sublabel && (
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-normal text-neutral-400">
              {sublabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function SecurityTrust() {
  return (
    <section
      data-testid="security-trust-section"
      className="w-full bg-[#f5f4f2] px-5 py-20 sm:px-8 md:px-10 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-[1.05fr_0.95fr] md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-[clamp(36px,5vw,64px)] font-normal leading-[1.08] tracking-normal text-gray-950">
            Safe and secure
          </h2>
          <p className="mt-6 max-w-3xl text-[18px] leading-[1.55] text-neutral-500 md:text-[24px]">
            Your trust is our foundation. Credlyr is designed with a deep
            commitment to data privacy and security. Visit our trust page and
            security center to learn more.
          </p>

          <a
            href="#"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white/60 px-5 py-3 text-[15px] font-semibold text-neutral-900 transition-colors hover:bg-white"
          >
            Explore <ChevronRight size={17} strokeWidth={1.8} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.08,
          }}
          className="flex flex-wrap items-center justify-start gap-5 md:justify-end md:gap-7"
        >
          <TrustBadge label="AICPA SOC2" />
          <TrustBadge label="GDPR" variant="stars" />
          <TrustBadge label="ISO" sublabel="27001" variant="ring" />
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
          style={{
            filter:
              "sepia(15%) brightness(105%) saturate(120%) hue-rotate(5deg)",
          }}
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-[36px] text-white font-bold leading-none select-none">
              ✦
            </span>
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
        <span className="text-[28px] font-bold text-stone-500 select-none">
          AD
        </span>
      </div>
      {/* Name bar at bottom */}
      <div className="w-full px-5 pb-5 bg-gradient-to-t from-stone-200/80 to-transparent pt-12">
        <p className="text-[13px] font-semibold text-stone-700">Apex Dental</p>
        <p className="text-[11px] text-stone-500">
          Multi-location dental group
        </p>
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
      className="w-full bg-white py-16 md:py-24 px-5 sm:px-8 md:px-10"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-12 md:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-4xl font-bold tracking-normal text-gray-950 leading-tight"
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
    heading: "Services",
    links: [
      "Brand Strategy",
      "Visual Identity",
      "Full-Cycle Websites",
      "Landing Pages",
      "Ongoing Optimisation",
    ],
  },
  {
    heading: "Industries",
    links: [
      "Dental Practices",
      "Medical Clinics",
      "Spas & Wellness",
      "Real Estate",
      "Home Services",
    ],
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

export function SiteFooter() {
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
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
        style={{
          filter: "sepia(15%) brightness(105%) saturate(120%) hue-rotate(5deg)",
        }}
      />
      {/* Seamless top gradient fade */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#fbfaf7] via-[#fbfaf7]/70 to-transparent pointer-events-none z-10" />

      {/* Content layer */}
      <div
        className="relative z-10 flex flex-col justify-between px-5 pt-24 pb-12 sm:px-8 md:px-10 md:pt-32 md:pb-16 min-h-[inherit]"
        style={{ minHeight: "60vh" }}
      >
        {/* Logo mark */}
        <div>
          <p className="text-[16px] font-bold text-gray-950 tracking-normal mb-10 select-none">
            ✦ Credlyr
          </p>

          {/* Link columns — 2-col on mobile, 5-col on md+ */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-10">
            {FOOTER_COLS.map((col) => (
              <div key={col.heading}>
                <p className="text-[13px] font-bold text-gray-950 mb-4 tracking-wide">
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => {
                    let hrefVal = "#";
                    if (link === "Website Builds" || link === "Full-Cycle Websites" || link === "Custom Digital Product Design & Development") hrefVal = "/product/websites";
                    else if (link === "Landing Pages") hrefVal = "/product/landing-pages";
                    else if (link === "About") hrefVal = "/about";
                    else if (link === "Blog" || link === "Case Studies") hrefVal = "/resources-hub";
                    
                    const isInternal = hrefVal.startsWith("/");
                    const Anchor = (
                      <a
                        href={hrefVal}
                        className="text-sm text-neutral-700 hover:text-gray-950 transition-colors duration-150 font-medium"
                      >
                        {link}
                      </a>
                    );

                    return (
                      <li key={link}>
                        {isInternal ? (
                          <Link href={hrefVal} asChild>
                            {Anchor}
                          </Link>
                        ) : (
                          Anchor
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal strip */}
        <div className="flex items-center gap-5 mt-16 flex-wrap">
          <span className="text-[12px] text-neutral-600 font-medium">© Credlyr 2026</span>
          <a
            href="#"
            className="text-[12px] text-neutral-600 hover:text-gray-950 transition-colors font-medium"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-[12px] text-neutral-600 hover:text-gray-950 transition-colors font-medium"
          >
            Security
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Get Started Page ─────────────────────────────────────────────────────────

const BOOKING_URL =
  (import.meta.env.VITE_CAL_URL as string | undefined)?.trim() || "";

function GetStartedPage() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden p-0 m-0 flex items-center justify-center pt-24 pb-12 px-5 sm:px-6">
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

      {/* Fast booking card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[760px] overflow-hidden rounded-3xl border border-white/30 bg-white/92 p-7 shadow-2xl backdrop-blur-md md:p-8"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950 text-white">
          <Calendar size={22} strokeWidth={1.8} aria-hidden="true" />
        </div>

        <div className="mt-5 text-center">
          <h1 className="mt-2 text-[32px] font-bold leading-tight tracking-normal text-gray-950 md:text-[38px]">
            Book your website audit
          </h1>
          <p className="mx-auto mt-3 max-w-[480px] text-[16px] font-normal leading-relaxed text-gray-600">
            Pick a slot and we&apos;ll map the fastest fixes to make your site
            clearer, faster, and easier to buy from.
          </p>
        </div>

        <div className="mt-7 w-full border border-neutral-200/60 rounded-2xl overflow-hidden bg-white shadow-sm">
          {BOOKING_URL ? (
            <iframe
              src={`${BOOKING_URL}?embed=true`}
              style={{ width: "100%", height: "550px" }}
              frameBorder="0"
              title="Book Website Audit"
              className="w-full h-[550px]"
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-neutral-350 bg-neutral-50 px-5 py-8 text-center">
              <p className="text-[14px] font-semibold text-neutral-900">
                Add your booking link to activate this scheduler.
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-neutral-500">
                Set VITE_CAL_URL to your public event link.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

// ─── Status Page ──────────────────────────────────────────────────────────────

const STATUS_SERVICES = [
  {
    name: "Websites",
    incidents: [42],
  },
  {
    name: "Booking links",
    incidents: [31, 36],
  },
  {
    name: "CRM sync",
    incidents: [42],
  },
];

const STATUS_DAYS = Array.from({ length: 56 }, (_, index) => index);
const STATUS_CALENDAR_DAYS = Array.from({ length: 30 }, (_, index) => index + 1);

function StatusBar({ incidents }: { incidents: number[] }) {
  return (
    <div className="mt-3 grid grid-cols-[repeat(56,minmax(0,1fr))] gap-1">
      {STATUS_DAYS.map((day) => (
        <span
          key={day}
          className={`h-5 rounded-[2px] ${
            incidents.includes(day) ? "bg-[#ef6351]" : "bg-[#4cb394]"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function StatusPage() {
  return (
    <section className="min-h-screen bg-[#151516] px-5 py-10 text-neutral-100 sm:px-8 md:px-10">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center gap-[10px] text-2xl font-bold tracking-normal text-white select-none"
          >
            <span className="text-2xl leading-none translate-y-[-1px]">✦</span>
            <span>Credlyr</span>
          </a>

          <div className="flex flex-wrap gap-3">
            <Link href="/get-started" asChild>
              <a className="rounded-lg border border-white/10 px-4 py-2 text-[14px] font-semibold text-neutral-200 transition-colors hover:bg-white/5">
                Support center
              </a>
            </Link>
            <Link href="/get-started" asChild>
              <a className="rounded-lg bg-white px-4 py-2 text-[14px] font-semibold text-neutral-950 transition-colors hover:bg-neutral-200">
                Subscribe to updates
              </a>
            </Link>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-lg border border-emerald-500/70">
          <div className="flex items-center gap-3 bg-emerald-900/60 px-6 py-5">
            <CheckCircle
              size={22}
              strokeWidth={1.8}
              className="text-emerald-300"
              aria-hidden="true"
            />
            <h1 className="text-[22px] font-semibold tracking-normal text-white">
              We&apos;re fully operational
            </h1>
          </div>
          <div className="bg-[#151516] px-6 py-5">
            <p className="text-[17px] leading-relaxed text-neutral-200">
              We&apos;re not aware of any issues affecting our systems.
            </p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-white/12">
          <div className="flex flex-col gap-1 border-b border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:gap-4">
            <h2 className="text-[21px] font-semibold text-white">
              System status
            </h2>
            <span className="text-[17px] text-neutral-500">
              Mar 2026 - Jun 2026
            </span>
          </div>

          <div className="divide-y divide-white/10">
            {STATUS_SERVICES.map((service) => (
              <div key={service.name} className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <CheckCircle
                    size={20}
                    strokeWidth={1.8}
                    className="text-[#4cb394]"
                    aria-hidden="true"
                  />
                  <span className="text-[18px] font-semibold text-neutral-200">
                    {service.name}
                  </span>
                  <Info
                    size={16}
                    strokeWidth={1.8}
                    className="text-neutral-500"
                    aria-hidden="true"
                  />
                </div>
                <StatusBar incidents={service.incidents} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-white/12">
          <div className="flex items-center gap-4 border-b border-white/10 px-6 py-5">
            <h2 className="text-[21px] font-semibold text-white">Calendar</h2>
            <span className="text-[17px] text-neutral-500">Jun 2026</span>
          </div>

          <div className="grid grid-cols-7 border-b border-white/10 text-center text-[14px] font-semibold text-neutral-500">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
              <div key={`${day}-${index}`} className="py-4">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 text-center text-[15px] text-neutral-500">
            {STATUS_CALENDAR_DAYS.map((day) => (
              <div
                key={day}
                className="min-h-14 border-r border-t border-white/10 py-4 last:border-r-0"
              >
                {day}
              </div>
            ))}
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="min-h-14 border-r border-t border-white/10 py-4 last:border-r-0"
              />
            ))}
          </div>
        </div>

        <div className="mt-10 pb-4 text-center text-[13px] text-neutral-500">
          <p>Powered by Credlyr</p>
          <a href="#" className="mt-4 inline-block hover:text-neutral-300">
            Privacy policy
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [location] = useLocation();
  const showNavigation = location !== "/status";

  return (
    <div className="min-h-screen bg-[#fbfaf7]">
      {showNavigation && <Navigation />}
      <Switch>
        <Route path="/get-started" component={GetStartedPage} />
        <Route path="/status" component={StatusPage} />
        <Route path="/resources-hub" component={ResourcesHubPage} />
        <Route path="/resources-hub/identity-in-an-ai-world" component={ArticleDetailPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/trust" component={TrustPage} />
        <Route path="/careers" component={CareersPage} />
        <Route path="/product/:id" component={ProductPage} />
        <Route path="/">
          <>
            {/* Nav is fixed/transparent — hero image bleeds to page top */}
            <Hero />
            <SocialProof />
            <StatsSection />
            <ValueProposition />
            <OnboardHighlight />
            <OurServices />
            <FeatureHighlight />
            <SecurityTrust />
            <NewsSection />
            <SiteFooter />
          </>
        </Route>
      </Switch>
    </div>
  );
}
