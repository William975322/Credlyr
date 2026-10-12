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
  Check,
  Sparkles,
  Smartphone,
  Send,
  Bell,
  Database,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Link, Route, Switch, useLocation } from "wouter";
import ResourcesHubPage from "./pages/ResourcesHub";
import ArticleDetailPage from "./pages/ArticleDetail";
import AboutPage from "./pages/About";
import ProductPage from "./pages/ProductPage";
import TrustPage from "./pages/Trust";
import CareersPage from "./pages/Careers";
import ReviewsPage from "./pages/Reviews";
import PartnersPage from "./pages/Partners";
import CommunityPage from "./pages/Community";
import NewsPage from "./pages/News";
import ContactPage from "./pages/Contact";
import DocumentationPage from "./pages/Documentation";
import SecurityPage from "./pages/Security";
import DentalPage from "./pages/Dental";
import MedicalPage from "./pages/Medical";
import SpasPage from "./pages/Spas";
import HomeServicesPage from "./pages/HomeServices";
import RealEstatePage from "./pages/RealEstate";
import BrandStrategyPage from "./pages/BrandStrategy";
import VisualIdentityPage from "./pages/VisualIdentity";
import OptimisationPage from "./pages/Optimisation";
import BrandShowcasePage from "./pages/BrandShowcase";
import { BrandLogo, BrandProvider, useBrandDirection, LogoMark } from "./components/BrandLogo";

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
    label: "Services",
    dropdown: {
      variant: "two-column",
      left: {
        title: "Core Offerings",
        items: [
          {
            label: "Websites & Landing Pages",
            sub: "Fast, editorial sites built to convert",
            href: "/product/websites",
          },
          {
            label: "Appointment Scheduling",
            sub: "Frictionless calendar booking, zero drop-off",
            href: "/product/booking",
          },
          {
            label: "Lead-Response Automation",
            sub: "Rapid automated reply and CRM sync",
            href: "/product/conversion",
          },
        ],
      },
      right: {
        title: "Capabilities",
        items: [
          {
            label: "Brand & Visual Identity",
            sub: "Art direction that commands authority",
            href: "/services/visual-identity",
          },
          {
            label: "Answer Engine Optimization",
            sub: "Structured for Google & AI answers",
            href: "/product/ai-search",
          },
          {
            label: "Conversion Audits",
            sub: "Teardowns that eliminate friction leaks",
            href: "/get-started",
          },
        ],
      },
    },
  },
  {
    label: "Sectors",
    dropdown: {
      variant: "two-column",
      left: {
        title: "Healthcare & Wellness",
        items: [
          {
            label: "Dental Practices",
            sub: "Specialist surgeries & private clinics",
            href: "/industries/dental",
          },
          {
            label: "Medical & Clinics",
            sub: "Consultants, diagnostics & medicine",
            href: "/industries/medical",
          },
          {
            label: "Aesthetics & Spas",
            sub: "Aesthetic studios & restorative care",
            href: "/industries/spas",
          },
        ],
      },
      right: {
        title: "Specialist Firms",
        items: [
          {
            label: "Advisory & Specialist",
            sub: "Private wealth, legal & consultancy",
            href: "/services/brand-strategy",
          },
          {
            label: "High-Value Trades",
            sub: "Architectural builders & luxury trade",
            href: "/industries/home-services",
          },
          {
            label: "Client Reviews",
            sub: "How practices grow with Credyr",
            href: "/customers/reviews",
          },
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
          { label: "About", sub: "Our ethos & craft", href: "/about" },
          { label: "News", sub: "Press and insights", href: "/news" },
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
          { label: "Trust & Security", sub: "Safe, secure, and private", href: "/trust" },
          { label: "Status", sub: "Real-time system availability", href: "/status" },
          {
            label: "Resources Hub",
            sub: "Playbooks, articles & teardowns",
            href: "/resources-hub",
          },
        ],
      },
    },
  },
];


// ─── Navigation ───────────────────────────────────────────────────────────────

function Navigation() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useLocation();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleMobileNav = (href: string) => {
    setIsMobileMenuOpen(false);
    setExpandedSection(null);
    setTimeout(() => {
      setLocation(href);
    }, 150);
  };

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

  const { direction: logoDirection, setIsModalOpen } = useBrandDirection();

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
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between px-6 sm:px-8 md:px-12 py-5 md:py-6">
        {/* Logo */}
        <a
          href="/"
          className="select-none"
          data-testid="link-logo"
        >
          <BrandLogo />
        </a>

        {/* Center plain-text links */}
        <nav
          className="hidden md:flex items-center gap-2"
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
                className={`group inline-flex items-center px-3.5 py-1.5 rounded-full text-[14.5px] font-medium transition-colors duration-150 cursor-pointer select-none ${
                  openDropdown === link.label
                    ? "text-neutral-950 font-semibold"
                    : "text-neutral-900 hover:text-neutral-600"
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

        {/* Right CTA */}
        <div className="hidden md:flex items-center">
          <Link href="/get-started" asChild>
            <a
              className="inline-flex items-center px-5 py-2.5 bg-neutral-950 text-white text-[14px] font-medium rounded-full transition-colors duration-150 hover:bg-neutral-800 active:scale-[0.98] cursor-pointer shadow-sm"
              data-testid="button-book-demo"
            >
              {isResourcesPage ? "Schedule a demo" : "Book an audit"}
            </a>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex md:hidden items-center justify-center w-10 h-10 text-neutral-950 hover:text-neutral-700 transition-colors cursor-pointer select-none"
          aria-label="Open menu"
        >
          <Menu size={24} strokeWidth={1.8} />
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
                        const isClickable = true;
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
                        const isClickable = true;
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
            className="fixed inset-0 bg-neutral-950/98 backdrop-blur-xl z-[100] flex flex-col p-6 md:hidden overflow-y-auto"
          >
            {/* Header row */}
            <div className="flex items-center justify-between pb-6 border-b border-neutral-900 shrink-0">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNav("/");
                }}
                className="select-none"
              >
                <BrandLogo tone="light" size="md" />
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-800 hover:bg-neutral-800/50 text-white transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Links vertical list */}
            <div className="flex-1 py-8 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const hasDropdown = !!link.dropdown;
                const isExpanded = expandedSection === link.label;

                if (hasDropdown) {
                  return (
                    <div key={link.label} className="flex flex-col border-b border-neutral-900">
                      <button
                        onClick={() => setExpandedSection(isExpanded ? null : link.label)}
                        className="flex items-center justify-between text-[18px] font-medium text-white py-4 hover:text-neutral-300 transition-colors w-full text-left cursor-pointer"
                      >
                        <span>{link.label}</span>
                        <ChevronRight 
                          size={16} 
                          className={`text-neutral-500 transition-transform duration-200 ${isExpanded ? "rotate-90 text-white" : ""}`} 
                        />
                      </button>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-4 pb-4 flex flex-col gap-3"
                          >
                            {/* Render items from left column */}
                            {link.dropdown?.left?.items.map((item) => (
                              <button
                                key={item.label}
                                onClick={() => handleMobileNav(item.href || "/get-started")}
                                className="text-[15px] font-medium text-neutral-400 hover:text-white transition-colors text-left py-1 w-full cursor-pointer"
                              >
                                {item.label}
                              </button>
                            ))}
                            {/* Render items from right column */}
                            {link.dropdown?.right?.items.map((item) => (
                              <button
                                key={item.label}
                                onClick={() => handleMobileNav(item.href || "/get-started")}
                                className="text-[15px] font-medium text-neutral-400 hover:text-white transition-colors text-left py-1 w-full cursor-pointer"
                              >
                                {item.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                // Fallback (for links without dropdowns)
                const isResources = link.label === "Resources";
                const isCompany = link.label === "Company";
                const hrefVal = isResources
                  ? "/resources-hub"
                  : isCompany
                  ? "/about"
                  : `/#${link.label.toLowerCase()}`;

                return (
                  <button
                    key={link.label}
                    onClick={() => handleMobileNav(hrefVal)}
                    className="flex items-center justify-between text-[18px] font-medium text-white py-4 border-b border-neutral-900 hover:text-neutral-300 transition-colors w-full text-left cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={16} className="text-neutral-500" />
                  </button>
                );
              })}
            </div>

            {/* Bottom section */}
            <div className="pt-6 border-t border-neutral-900 flex flex-col gap-4 shrink-0">
              <button
                onClick={() => handleMobileNav("/get-started")}
                className="w-full inline-flex items-center justify-center py-3.5 bg-white text-black text-[15px] font-semibold rounded-full hover:bg-neutral-200 active:scale-[0.98] transition-all cursor-pointer"
              >
                {isResourcesPage ? "Schedule a demo" : "Book a website audit"}
              </button>
              <span className="text-center text-[12px] text-neutral-500 mt-2">
                Built for businesses where trust drives revenue
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Section 1: Hero ─────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="relative w-full h-[100svh] min-h-[660px] md:min-h-[760px] overflow-hidden p-0 m-0"
    >
      {/* Full-bleed landscape painting */}
      <img
        src="/hero-landscape.png?v=2"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-[center_56%] pointer-events-none select-none"
        style={{
          filter: "sepia(12%) brightness(104%) saturate(118%) hue-rotate(4deg)",
        }}
      />

      {/* Calibrated warm scrim gradient guaranteeing WCAG AAA dark text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(251,250,247,0) 0%, rgba(251,250,247,0.06) 38%, rgba(251,250,247,0.38) 62%, rgba(251,250,247,0.78) 80%, rgba(251,250,247,0.95) 93%, #fbfaf7 100%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center pt-20 pb-10 sm:pt-24 sm:pb-12 z-10 text-center px-5 sm:px-6">
        {/* Headline */}
        <h1 className="max-w-4xl text-balance text-[clamp(44px,7.5vw,84px)] leading-[0.98] tracking-[-0.035em] font-normal text-neutral-950">
          Websites that turn
          <br />
          visitors into customers.
        </h1>

        {/* Subtitle - high contrast, larger, crisp typography */}
        <p className="mt-6 md:mt-7 max-w-[620px] text-balance text-[clamp(19px,2.1vw,22px)] leading-[1.48] text-neutral-950 font-normal mb-8 md:mb-10">
          We build beautiful websites that help service businesses win trust, capture enquiries and book more appointments.
        </p>

        {/* Single CTA */}
        <div className="flex flex-col items-center">
          <Link href="/get-started" asChild>
            <a
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-neutral-950 text-white rounded-full font-medium text-[16px] md:text-[17px] hover:bg-neutral-800 active:scale-[0.98] transition-all cursor-pointer shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
              data-testid="button-hero-cta"
            >
              Book a website audit
              <ChevronRight size={18} strokeWidth={2} />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Section 2: What We Do (Duna Editorial Blueprint) ───────────────────────

function WhatWeDoSection() {
  return (
    <section
      data-testid="what-we-do-section"
      className="w-full bg-[#fbfaf7] py-28 md:py-36 px-6 sm:px-8 md:px-12 border-b border-neutral-200/60"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Editorial narrative */}
        <div className="lg:col-span-6 text-left">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-normal tracking-[-0.045em] text-[#222221] leading-[1.12] mb-6">
            Most service websites lose clients before they ever reach out.
          </h2>

          <div className="flex flex-col gap-5 text-[18.5px] sm:text-[20px] text-neutral-700 leading-[1.62] font-normal">
            <p>
              When someone searches for a specialist doctor, private clinic, or advisory firm, they decide in seconds whether to trust you. If your website feels outdated, loads slowly, or makes booking difficult, they leave for a competitor.
            </p>
            <p>
              Credyr builds bespoke digital front doors and connects the systems behind the scenes — from first visit to automated response and calendar booking — so no client is lost.
            </p>
          </div>
        </div>

        {/* Right Column: Framed Editorial Artwork (inspired by Duna Foundation in duna_5.webp) */}
        <div className="lg:col-span-6">
          <div className="rounded-3xl border border-neutral-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.04)] overflow-hidden aspect-[4/3] bg-neutral-100">
            <img
              src="/editorial-canvas.jpg"
              alt="Credyr editorial landscape"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Core Services (Duna Product Blueprint) ───────────────────────

function ServicesSection() {
  const [activeTab1, setActiveTab1] = useState(0);
  const [activeTab2, setActiveTab2] = useState(0);
  const [activeTab3, setActiveTab3] = useState(0);

  const service1Tabs = [
    {
      icon: ShieldCheck,
      title: "Clinical Authority Architecture",
      description:
        "Position clinical expertise immediately with verified practitioner credentials, GMC registration, and intuitive treatment pathways.",
    },
    {
      icon: Globe,
      title: "High-Converting Patient Journeys",
      description:
        "Crafted specifically for discerning patients seeking private specialist care, turning cautious visitors into confident bookings.",
    },
    {
      icon: Smartphone,
      title: "Mobile-First Specialist Discovery",
      description:
        "Over 70% of private patients research on mobile. Fast touch response, zero layout shift, and instant consultation reservation.",
    },
    {
      icon: Lock,
      title: "Fast, Accessible & Compliant Code",
      description:
        "Sub-second load times, WCAG AAA compliant typography, clean semantic markup, and strict data privacy standards.",
    },
  ];

  const service2Tabs = [
    {
      icon: Calendar,
      title: "Live Schedule Synchronization",
      description:
        "Clients select confirmed consultation slots directly on your website, with calendar invites and intake links dispatched automatically.",
    },
    {
      icon: Users,
      title: "Clinician & Room Routing",
      description:
        "Route appointments intelligently based on practitioner specialties, consultation rooms, and bespoke treatment times.",
    },
    {
      icon: Bell,
      title: "Automated SMS & Email Reminders",
      description:
        "Eliminate costly no-shows with timed pre-visit reminders, location directions, and calendar updates (.ics, Google, Outlook).",
    },
    {
      icon: CheckCircle,
      title: "Two-Way Calendar Synchronization",
      description:
        "Direct two-way synchronization with your existing calendar keeps your schedule accurate without manual checks.",
    },
  ];

  const service3Tabs = [
    {
      icon: Zap,
      title: "Instant Multi-Channel Dispatch",
      description:
        "Acknowledge every consultation enquiry within seconds via branded SMS confirmation and pre-visit intake details.",
    },
    {
      icon: Database,
      title: "Direct Practice CRM Integration",
      description:
        "Sync patient records, consultation notes, and intake documents directly into HubSpot, Cliniko, or your custom CRM.",
    },
    {
      icon: FileText,
      title: "Automated Intake Questionnaires",
      description:
        "Collect patient medical background, symptoms, and consent securely prior to the appointment without paper forms.",
    },
    {
      icon: CheckSquare,
      title: "Complete Interaction Audit Trail",
      description:
        "Every SMS sent, link opened, and confirmation dispatched is logged with exact timestamps in your client activity feed.",
    },
  ];

  return (
    <section
      id="services"
      data-testid="services-section"
      className="w-full bg-white py-28 md:py-36 px-6 sm:px-8 md:px-12 border-b border-neutral-200/60"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-24 md:mb-32 text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-normal tracking-[-0.04em] text-[#222221] leading-[1.12] mb-5">
            Three services. One complete conversion system.
          </h2>
          <p className="text-[19px] md:text-[21px] text-neutral-600 leading-relaxed font-normal">
            We handle the design, build the booking flows, and connect the automated follow-up that turns visitors into confirmed appointments.
          </p>
        </div>

        {/* 3 Duna-Style Feature Blocks */}
        <div className="flex flex-col gap-28 md:gap-36">
          {/* ── Feature 1: Websites & Landing Pages ── */}
          <div className="flex flex-col gap-10">
            {/* Header row: Title + Subtitle on Left, Explore CTA on Right */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-2 text-left">
              <div className="max-w-2xl">
                <h3 className="text-2xl sm:text-3xl md:text-[40px] font-normal tracking-[-0.04em] text-[#222221] leading-[1.14] mb-3">
                  Bespoke websites that establish clinical authority
                </h3>
                <p className="text-[18px] md:text-[19.5px] text-neutral-600 leading-[1.5] font-normal">
                  Digital front doors crafted specifically for high-trust specialist practices and private clinics.
                </p>
              </div>
              <Link href="/product/websites" asChild>
                <a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-300 text-[14.5px] font-medium text-neutral-900 hover:border-neutral-900 transition-colors shrink-0 self-start sm:self-auto">
                  Explore websites <ChevronRight className="w-4 h-4" />
                </a>
              </Link>
            </div>

            {/* 2-Column Body: Visual Left, 4 Interactive Tabs Right (Duna 6:6 proportion) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Visual Card (Left) — Dual-card blueprint matching Duna Feature 1 */}
              <div className="lg:col-span-7">
                <div className="bg-[#eae7e1] rounded-[32px] p-6 sm:p-8 md:p-9 border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.02)] min-h-[460px] flex flex-col justify-center relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
                    {/* Architecture Specs Card */}
                    <div className="bg-white rounded-2xl p-5 shadow-[0_8px_28px_rgba(0,0,0,0.04)] border border-neutral-200/70 sm:w-[195px] shrink-0 text-left flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[13.5px] font-semibold text-neutral-950">Settings</span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="bg-[#f6f5f0] rounded-xl px-3 py-2 text-[12px] font-medium text-neutral-700 border border-neutral-200/50">
                            Core Vitals: <span className="text-emerald-700 font-semibold">99</span>
                          </div>
                          <div className="bg-[#f6f5f0] rounded-xl px-3 py-2 text-[12px] font-medium text-neutral-700 border border-neutral-200/50">
                            Trust: <span className="text-neutral-950 font-semibold">GMC Specialist</span>
                          </div>
                          <div className="bg-[#f6f5f0] rounded-xl px-3 py-2 text-[12px] font-medium text-neutral-700 border border-neutral-200/50">
                            Booking: <span className="text-neutral-950 font-semibold">Frictionless</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] text-neutral-400">
                        <Lock className="w-3 h-3 text-emerald-600" />
                        <span>Private Clinic Standard</span>
                      </div>
                    </div>

                    {/* Curved SVG Connector matching Duna Feature 1 bracket */}
                    <div className="hidden sm:flex items-center justify-center shrink-0 w-8">
                      <svg width="32" height="72" viewBox="0 0 32 72" fill="none">
                        <path d="M 0 16 C 16 16, 16 36, 28 36" stroke="#a39f93" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        <path d="M 0 36 L 28 36" stroke="#a39f93" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        <path d="M 0 56 C 16 56, 16 36, 28 36" stroke="#a39f93" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        <path d="M 24 32 L 28 36 L 24 40" stroke="#a39f93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </div>

                    {/* Flagship Website Preview Card */}
                    <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.06)] border border-neutral-200/80 flex-1 text-left min-w-0">
                      {/* Browser address bar */}
                      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-100 text-[11.5px] text-neutral-500">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
                          <span className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
                          <span className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-neutral-50 rounded-md border border-neutral-200/60 text-neutral-600 font-mono text-[11px]">
                          <Lock className="w-2.5 h-2.5 text-emerald-600" />
                          drharrisonclinic.co.uk
                        </div>
                        <span className="text-[10.5px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">Live Flagship</span>
                      </div>

                      <span className="inline-block text-[11.5px] font-semibold tracking-wider uppercase text-neutral-500 mb-2">
                        Harley Street · Dermatology
                      </span>
                      <h4 className="text-[18px] sm:text-[20px] font-medium text-neutral-950 leading-snug mb-3">
                        World-class dermatological care with dedicated private consultations.
                      </h4>
                      <div className="flex items-center gap-2 text-[12.5px] text-neutral-600 mb-5 flex-wrap">
                        <span className="text-amber-500 font-medium">★ Highly Rated</span>
                        <span className="w-1 h-1 rounded-full bg-neutral-300" />
                        <span className="font-medium text-neutral-800">GMC Registered</span>
                        <span className="w-1 h-1 rounded-full bg-neutral-300" />
                        <span className="text-neutral-500 text-[12px]">Direct Booking</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="px-4 py-2 bg-neutral-950 text-white rounded-full text-[12.5px] font-medium">
                          Book Consultation
                        </span>
                        <span className="px-3.5 py-2 bg-neutral-100 text-neutral-800 rounded-full text-[12.5px]">
                          Treatment Guide
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Feature Items (Right) — Interactive Tabs */}
              <div className="lg:col-span-5 flex flex-col gap-2 text-left">
                {service1Tabs.map((tab, idx) => {
                  const Icon = tab.icon;
                  const isActive = activeTab1 === idx;
                  return (
                    <div
                      key={tab.title}
                      onClick={() => setActiveTab1(idx)}
                      className={`cursor-pointer transition-all duration-200 rounded-2xl ${
                        isActive
                          ? "bg-[#eae7e1] p-5 sm:p-6 shadow-sm border border-black/[0.04]"
                          : "py-3.5 px-4 hover:bg-neutral-100/60 text-neutral-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? "text-neutral-950" : "text-neutral-600"}`} />
                        <h5 className={`text-[17px] ${isActive ? "font-medium text-neutral-950" : "font-normal text-neutral-800"}`}>
                          {tab.title}
                        </h5>
                      </div>
                      {isActive && (
                        <p className="text-[14.5px] text-neutral-600 mt-2.5 leading-relaxed font-normal">
                          {tab.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Feature 2: Appointment Scheduling ── */}
          <div className="flex flex-col gap-10">
            {/* Header row: Title + Subtitle on Left, Explore CTA on Right */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-2 text-left">
              <div className="max-w-2xl">
                <h3 className="text-2xl sm:text-3xl md:text-[40px] font-normal tracking-[-0.04em] text-[#222221] leading-[1.14] mb-3">
                  Direct calendar booking without the back-and-forth
                </h3>
                <p className="text-[18px] md:text-[19.5px] text-neutral-600 leading-[1.5] font-normal">
                  Eliminate phone tag and delayed emails with friction-free consultation reservation.
                </p>
              </div>
              <Link href="/product/booking" asChild>
                <a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-300 text-[14.5px] font-medium text-neutral-900 hover:border-neutral-900 transition-colors shrink-0 self-start sm:self-auto">
                  Explore scheduling <ChevronRight className="w-4 h-4" />
                </a>
              </Link>
            </div>

            {/* 2-Column Body: 4 Interactive Tabs Left, Visual Right (Duna Alternating Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* 4 Feature Items (Left on desktop, first on mobile) */}
              <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col gap-2 text-left">
                {service2Tabs.map((tab, idx) => {
                  const Icon = tab.icon;
                  const isActive = activeTab2 === idx;
                  return (
                    <div
                      key={tab.title}
                      onClick={() => setActiveTab2(idx)}
                      className={`cursor-pointer transition-all duration-200 rounded-2xl ${
                        isActive
                          ? "bg-[#eae7e1] p-5 sm:p-6 shadow-sm border border-black/[0.04]"
                          : "py-3.5 px-4 hover:bg-neutral-100/60 text-neutral-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? "text-neutral-950" : "text-neutral-600"}`} />
                        <h5 className={`text-[17px] ${isActive ? "font-medium text-neutral-950" : "font-normal text-neutral-800"}`}>
                          {tab.title}
                        </h5>
                      </div>
                      {isActive && (
                        <p className="text-[14.5px] text-neutral-600 mt-2.5 leading-relaxed font-normal">
                          {tab.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Visual Card (Right on desktop, second on mobile) — Elevated perspective card stack */}
              <div className="order-1 lg:order-2 lg:col-span-7">
                <div className="bg-[#eae7e1] rounded-[32px] p-6 sm:p-8 md:p-10 border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.02)] min-h-[460px] flex flex-col justify-center text-left relative overflow-hidden">
                  <div className="w-full max-w-[460px] mx-auto relative">
                    {/* Multi-layered backdrop cards for Duna Feature 2 depth */}
                    <div className="absolute inset-0 translate-y-4 scale-[0.93] rounded-2xl bg-white/45 border border-neutral-300/30 shadow-sm pointer-events-none" />
                    <div className="absolute inset-0 translate-y-2 scale-[0.97] rounded-2xl bg-white/75 border border-neutral-300/40 shadow-sm pointer-events-none" />

                    {/* Main Booking Card */}
                    <div className="relative bg-white rounded-2xl p-6 sm:p-7 shadow-[0_24px_55px_rgba(0,0,0,0.08)] border border-neutral-200/80">
                      {/* Clinician Profile Row */}
                      <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-neutral-950 text-white flex items-center justify-center font-medium text-[13px] tracking-tight shrink-0">
                            SV
                          </div>
                          <div>
                            <h4 className="text-[16px] font-semibold text-neutral-950 leading-tight">
                              Dr. Sarah Vance, MD
                            </h4>
                            <p className="text-[12.5px] text-neutral-500 mt-0.5">
                              Consultant Dermatologist · 45-min Initial Consultation
                            </p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200/60 rounded-full text-[11.5px] font-medium flex items-center gap-1.5 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                          Live Availability
                        </span>
                      </div>

                      {/* Day picker strip */}
                      <div className="grid grid-cols-5 gap-2 text-center mb-4">
                        <div className="p-2 rounded-xl border border-neutral-200/70 bg-neutral-50/50">
                          <span className="block text-[11px] text-neutral-500">Mon</span>
                          <span className="block text-[14.5px] font-medium text-neutral-800 mt-0.5">14</span>
                        </div>
                        <div className="p-2 rounded-xl border border-neutral-200/70 bg-neutral-50/50">
                          <span className="block text-[11px] text-neutral-500">Tue</span>
                          <span className="block text-[14.5px] font-medium text-neutral-800 mt-0.5">15</span>
                        </div>
                        <div className="p-2 rounded-xl bg-neutral-950 text-white shadow-sm">
                          <span className="block text-[11px] text-neutral-300">Wed</span>
                          <span className="block text-[14.5px] font-medium text-white mt-0.5">16</span>
                        </div>
                        <div className="p-2 rounded-xl border border-neutral-200/70 bg-neutral-50/50">
                          <span className="block text-[11px] text-neutral-500">Thu</span>
                          <span className="block text-[14.5px] font-medium text-neutral-800 mt-0.5">17</span>
                        </div>
                        <div className="p-2 rounded-xl border border-neutral-200/70 bg-neutral-50/50">
                          <span className="block text-[11px] text-neutral-500">Fri</span>
                          <span className="block text-[14.5px] font-medium text-neutral-800 mt-0.5">18</span>
                        </div>
                      </div>

                      {/* Slot pills */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                        <div className="px-3 py-2 text-center rounded-xl border border-neutral-200 text-neutral-700 text-[13px]">
                          09:30 AM
                        </div>
                        <div className="px-3 py-2 text-center rounded-xl bg-neutral-950 text-white font-medium text-[13px] flex items-center justify-center gap-1.5">
                          <Check className="w-3.5 h-3.5" /> 11:00 AM
                        </div>
                        <div className="px-3 py-2 text-center rounded-xl border border-neutral-200 text-neutral-700 text-[13px]">
                          02:15 PM
                        </div>
                        <div className="px-3 py-2 text-center rounded-xl border border-neutral-200 text-neutral-700 text-[13px]">
                          04:00 PM
                        </div>
                      </div>

                      {/* Sync status */}
                      <div className="pt-3.5 border-t border-neutral-100 flex items-center gap-2 text-[12px] text-neutral-600">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Synchronized with practice schedule · Instant calendar invite dispatched</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Feature 3: Lead Response & CRM Sync ── */}
          <div className="flex flex-col gap-10">
            {/* Header row: Title + Subtitle on Left, Explore CTA on Right */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-2 text-left">
              <div className="max-w-2xl">
                <h3 className="text-2xl sm:text-3xl md:text-[40px] font-normal tracking-[-0.04em] text-[#222221] leading-[1.14] mb-3">
                  Automated response connected directly to your CRM
                </h3>
                <p className="text-[18px] md:text-[19.5px] text-neutral-600 leading-[1.5] font-normal">
                  Engage every enquiry automatically while interest is highest, syncing client records directly into your CRM.
                </p>
              </div>
              <Link href="/product/conversion" asChild>
                <a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-300 text-[14.5px] font-medium text-neutral-900 hover:border-neutral-900 transition-colors shrink-0 self-start sm:self-auto">
                  Explore automation <ChevronRight className="w-4 h-4" />
                </a>
              </Link>
            </div>

            {/* 2-Column Body: Visual Left, 4 Interactive Tabs Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Visual Card (Left) — Connected workflow pipeline matching Duna Feature 3 */}
              <div className="lg:col-span-7">
                <div className="bg-[#eae7e1] rounded-[32px] p-6 sm:p-8 md:p-9 border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.02)] min-h-[460px] flex flex-col justify-center text-left gap-3 relative overflow-hidden">
                  {/* Step 1 */}
                  <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-neutral-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
                        Stage 1 · Website Lead
                      </span>
                      <p className="text-[15px] font-medium text-neutral-950 mt-0.5">
                        Enquiry received: Sarah Jenkins
                      </p>
                      <p className="text-[12.5px] text-neutral-600 mt-0.5">
                        Consultation request · Harley Street Clinic
                      </p>
                    </div>
                    <span className="text-[11.5px] font-mono text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-md">
                      10:42 AM
                    </span>
                  </div>

                  {/* Flow connector with curved SVG and badge */}
                  <div className="flex items-center gap-3 pl-6 py-0.5">
                    <div className="w-px h-5 bg-neutral-300" />
                    <span className="text-[11.5px] font-medium text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70 flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-emerald-700" />
                      Automated inquiry response dispatched
                    </span>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-neutral-200/80 shadow-[0_8px_24px_rgba(0,0,0,0.04)] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
                        Stage 2 · Instant Response
                      </span>
                      <p className="text-[15px] font-medium text-neutral-950 mt-0.5">
                        Branded SMS & booking link dispatched
                      </p>
                      <p className="text-[12.5px] text-neutral-600 mt-0.5">
                        Direct consultation confirmation sent to client
                      </p>
                    </div>
                    <span className="text-[11.5px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                      Delivered
                    </span>
                  </div>

                  {/* Flow connector with curved SVG and badge */}
                  <div className="flex items-center gap-3 pl-6 py-0.5">
                    <div className="w-px h-5 bg-neutral-300" />
                    <span className="text-[11.5px] font-medium text-neutral-700 bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-200/70 flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-neutral-700" />
                      Real-time synchronization
                    </span>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-neutral-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
                        Stage 3 · Practice Management
                      </span>
                      <p className="text-[15px] font-medium text-neutral-950 mt-0.5">
                        Practice CRM updated
                      </p>
                      <p className="text-[12.5px] text-neutral-600 mt-0.5">
                        Client record, notes & consultation synchronized
                      </p>
                    </div>
                    <span className="text-[11.5px] font-medium text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-md border border-neutral-200/60">
                      HubSpot / Cliniko
                    </span>
                  </div>

                  {/* Illustrative note */}
                  <div className="pt-1 text-center">
                    <span className="text-[11.5px] text-neutral-500 font-normal">
                      Illustrative lead conversion workflow
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Feature Items (Right) — Interactive Tabs */}
              <div className="lg:col-span-5 flex flex-col gap-2 text-left">
                {service3Tabs.map((tab, idx) => {
                  const Icon = tab.icon;
                  const isActive = activeTab3 === idx;
                  return (
                    <div
                      key={tab.title}
                      onClick={() => setActiveTab3(idx)}
                      className={`cursor-pointer transition-all duration-200 rounded-2xl ${
                        isActive
                          ? "bg-[#eae7e1] p-5 sm:p-6 shadow-sm border border-black/[0.04]"
                          : "py-3.5 px-4 hover:bg-neutral-100/60 text-neutral-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? "text-neutral-950" : "text-neutral-600"}`} />
                        <h5 className={`text-[17px] ${isActive ? "font-medium text-neutral-950" : "font-normal text-neutral-800"}`}>
                          {tab.title}
                        </h5>
                      </div>
                      {isActive && (
                        <p className="text-[14.5px] text-neutral-600 mt-2.5 leading-relaxed font-normal">
                          {tab.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: Closing CTA ───────────────────────────────────────────────────

function ClosingCtaSection() {
  return (
    <section
      data-testid="closing-cta-section"
      className="w-full bg-[#fbfaf7] py-32 md:py-40 px-6 sm:px-8 md:px-12 border-b border-neutral-200/60"
    >
      <div className="max-w-4xl mx-auto w-full text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal tracking-[-0.035em] text-neutral-950 leading-[1.1] mb-6">
          Ready to turn visitors into booked clients?
        </h2>

        <p className="text-[19px] md:text-[21px] text-neutral-700 leading-relaxed font-normal max-w-2xl mx-auto mb-10">
          Book a 20-minute website audit. We'll review your current website, show you where enquiries are dropping off, and give you a clear plan to fix it.
        </p>

        <div className="flex flex-col items-center">
          <Link href="/get-started" asChild>
            <a
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-neutral-950 text-white rounded-full font-medium text-[16px] md:text-[17px] hover:bg-neutral-800 active:scale-[0.98] transition-all cursor-pointer shadow-[0_12px_32px_rgba(0,0,0,0.16)]"
              data-testid="button-closing-cta"
            >
              Book a website audit
              <ChevronRight size={18} strokeWidth={2} />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

const FOOTER_COLS = [
  {
    heading: "Services",
    links: [
      { label: "Websites & Landing Pages", href: "/product/websites" },
      { label: "Appointment Scheduling", href: "/product/booking" },
      { label: "Lead Response & CRM Sync", href: "/product/conversion" },
    ],
  },
  {
    heading: "Sectors",
    links: [
      { label: "Dental Practices", href: "/industries/dental" },
      { label: "Medical & Clinics", href: "/industries/medical" },
      { label: "Specialist Advisory", href: "/services/brand-strategy" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Credyr", href: "/about" },
      { label: "Book a Website Audit", href: "/get-started" },
      { label: "System Status", href: "/status" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer
      data-testid="site-footer"
      className="relative w-full overflow-hidden bg-[#111110] text-white"
    >
      {/* Background artwork with dark overlay */}
      <img
        src="/hero-landscape.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none opacity-25"
        style={{
          filter: "sepia(20%) brightness(85%) contrast(110%)",
        }}
      />
      {/* Rich dark gradient scrim ensuring effortless readability */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(17,17,16,0.95) 0%, rgba(17,17,16,0.85) 40%, rgba(17,17,16,0.98) 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 md:px-12 pt-20 pb-12 flex flex-col justify-between min-h-[420px]">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="max-w-xs text-left">
            <BrandLogo tone="light" size="sm" className="mb-5 flex" />
            <p className="text-[15px] text-neutral-400 leading-relaxed font-normal">
              Premium websites and lead-conversion systems designed for specialist service businesses.
            </p>
          </div>

          {/* 3 Link Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16 text-left">
            {FOOTER_COLS.map((col) => (
              <div key={col.heading}>
                <p className="text-[13px] font-semibold text-neutral-300 tracking-wider uppercase mb-4">
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[14.5px] text-neutral-400 hover:text-white transition-colors duration-150 font-normal"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Strip */}
        <div className="flex items-center justify-between gap-4 pt-8 text-[13px] text-neutral-500 font-normal flex-wrap">
          <p>© Credyr 2026. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/trust" className="hover:text-neutral-300 transition-colors">
              Trust & Privacy
            </Link>
            <Link href="/security" className="hover:text-neutral-300 transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Thanks Page ─────────────────────────────────────────────────────────────

export function ThanksPage() {
  return (
    <div className="min-h-screen bg-[#fbfaf7] text-gray-950 pt-0 pb-0 px-0 flex flex-col justify-between">
      <section className="relative w-full min-h-[85vh] overflow-hidden p-0 m-0 flex items-center justify-center pt-32 pb-16 px-5 sm:px-6">
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

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-[640px] overflow-hidden rounded-3xl border border-white/30 bg-white/92 p-10 shadow-2xl backdrop-blur-md md:p-14 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-950 mb-6">
            Thanks for your interest
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal mb-8 max-w-md mx-auto">
            We'll reach out to you shortly.
          </p>
          <Link href="/" asChild>
            <a className="inline-flex items-center px-8 py-3 bg-black text-white hover:bg-neutral-800 active:scale-[0.98] transition-all rounded-full font-bold text-sm cursor-pointer shadow-md select-none">
              Back to homepage
            </a>
          </Link>
        </motion.div>
      </section>
      <SiteFooter />
    </div>
  );
}

// ─── Get Started Page ─────────────────────────────────────────────────────────

const BOOKING_URL =
  (import.meta.env.VITE_CAL_URL as string | undefined)?.trim() ||
  "https://cal.com/william-vanderpl";

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
            className="select-none"
          >
            <BrandLogo tone="light" size="md" />
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
          <p>Powered by Credyr</p>
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
    <BrandProvider>
      <div className="min-h-screen bg-[#fbfaf7]">
        {showNavigation && <Navigation />}
        <Switch>
          <Route path="/brand" component={BrandShowcasePage} />
          <Route path="/get-started" component={GetStartedPage} />
          <Route path="/thanks" component={ThanksPage} />
          <Route path="/status" component={StatusPage} />
          <Route path="/resources-hub" component={ResourcesHubPage} />
          <Route path="/resources-hub/identity-in-an-ai-world" component={ArticleDetailPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/trust" component={TrustPage} />
          <Route path="/careers" component={CareersPage} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/customers/reviews" component={ReviewsPage} />
          <Route path="/customers/partners" component={PartnersPage} />
          <Route path="/customers/community" component={CommunityPage} />
          <Route path="/news" component={NewsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/docs" component={DocumentationPage} />
          <Route path="/security" component={SecurityPage} />
          <Route path="/industries/dental" component={DentalPage} />
          <Route path="/industries/medical" component={MedicalPage} />
          <Route path="/industries/spas" component={SpasPage} />
          <Route path="/industries/home-services" component={HomeServicesPage} />
          <Route path="/industries/real-estate" component={RealEstatePage} />
          <Route path="/services/brand-strategy" component={BrandStrategyPage} />
          <Route path="/services/visual-identity" component={VisualIdentityPage} />
          <Route path="/services/optimisation" component={OptimisationPage} />
          <Route path="/">
            <>
              {/* Nav is fixed/transparent — hero image bleeds to page top */}
              <Hero />
              <WhatWeDoSection />
              <ServicesSection />
              <ClosingCtaSection />
              <SiteFooter />
            </>
          </Route>
        </Switch>
      </div>
    </BrandProvider>
  );
}
