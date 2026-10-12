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
import { BrandLogo, BrandProvider } from "./components/BrandLogo";

import { SiteNav } from "./components/SiteNav";
import { SiteFooter } from "./components/SiteFooter";
import HomePage from "./pages/Home";

// Re-exported for pages that import the footer from App.
export { SiteFooter };


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
          <h1 className="mt-2 text-[32px] font-normal leading-tight tracking-[-0.04em] text-[#222221] md:text-[40px]">
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
              src={`${BOOKING_URL}?embed=true&theme=light`}
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

  // Start each route at the top of the page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <BrandProvider>
      <div className="min-h-screen bg-white">
        {showNavigation && <SiteNav />}
        <Switch>
          {import.meta.env.DEV && <Route path="/brand" component={BrandShowcasePage} />}
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
              <HomePage />
              <SiteFooter />
            </>
          </Route>
        </Switch>
      </div>
    </BrandProvider>
  );
}
