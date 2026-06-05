import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// ─── Nav data ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  {
    label: "Platform",
    active: true,
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

// ─── Navigation ──────────────────────────────────────────────────────────────

function Navigation() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeDropdownItem, setActiveDropdownItem] = useState("Instant Response");

  const activeLink = NAV_LINKS.find((l) => l.label === openDropdown);
  const previewItem = activeLink?.dropdown?.find((d) => d.label === activeDropdownItem);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      data-testid="navigation"
      onMouseLeave={() => setOpenDropdown(null)}
    >
      {/* Main nav bar */}
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 text-[15px] font-semibold text-gray-900 tracking-tight"
          data-testid="link-logo"
        >
          <span className="text-[18px] leading-none">✦</span>
          <span>Credlyr</span>
        </a>

        {/* Center nav pill */}
        <nav className="hidden md:flex items-center">
          <div className="flex items-center gap-1 bg-white/80 backdrop-blur-md rounded-full px-2 py-1.5 shadow-sm border border-black/[0.06]">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onMouseEnter={() => {
                  if (link.dropdown) {
                    setOpenDropdown(link.label);
                    setActiveDropdownItem(link.dropdown[0].label);
                  } else {
                    setOpenDropdown(null);
                  }
                }}
                className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-[14px] font-medium transition-all duration-150 cursor-pointer ${
                  openDropdown === link.label
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:text-gray-900 hover:bg-black/[0.05]"
                }`}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
                {link.dropdown && (
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-150 ${openDropdown === link.label ? "rotate-180" : ""}`}
                  />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* CTA */}
        <a
          href="#book"
          className="hidden md:inline-flex items-center px-5 py-2 bg-gray-900 text-white text-[14px] font-medium rounded-full hover:bg-gray-800 transition-colors"
          data-testid="button-book-demo"
        >
          Book a demo
        </a>
      </div>

      {/* Dropdown panel */}
      <AnimatePresence>
        {openDropdown && activeLink?.dropdown && (
          <motion.div
            key={openDropdown}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 mt-1 w-[540px]"
          >
            <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex">
              {/* Left: link list */}
              <div className="flex-1 py-4 px-2">
                {activeLink.dropdown.map((item) => (
                  <button
                    key={item.label}
                    onMouseEnter={() => setActiveDropdownItem(item.label)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors duration-100 cursor-pointer ${
                      activeDropdownItem === item.label ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                    data-testid={`dropdown-item-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <div className="text-[14px] font-medium text-white leading-snug">{item.label}</div>
                    <div className="text-[12px] text-white/50 mt-0.5">{item.sub}</div>
                  </button>
                ))}
              </div>

              {/* Right: preview card */}
              {previewItem && (
                <motion.div
                  key={activeDropdownItem}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                  className="w-[200px] m-3 bg-white rounded-xl flex flex-col"
                >
                  <div className="flex-1 flex items-center justify-center p-6">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <span className="text-lg">✦</span>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-100">
                    <div className="text-[13px] font-semibold text-gray-900 mb-1">{previewItem.label}</div>
                    <div className="text-[12px] text-gray-500 leading-snug">{previewItem.sub}</div>
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

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: 600 }}
      data-testid="hero-section"
    >
      {/* Full-bleed landscape painting */}
      <div className="absolute inset-0">
        <img
          src="/hero-landscape.png"
          alt=""
          className="w-full h-full object-cover object-center"
          aria-hidden="true"
        />
        {/* Fade to white at the bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(255,255,255,0.55) 62%, rgba(255,255,255,0.92) 78%, #ffffff 92%)",
          }}
        />
      </div>

      {/* Hero text — centered, lower portion */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="text-[52px] md:text-[68px] font-bold leading-[1.08] tracking-[-0.03em] text-gray-950 mb-5"
        >
          The new standard
          <br />
          in conversion
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          className="text-[17px] text-gray-500 max-w-[460px] leading-relaxed mb-8"
        >
          Meet the platform that turns online attention into booked
          appointments, automates follow-up, and grows revenue.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <a
            href="#book"
            className="inline-flex items-center px-7 py-3 bg-gray-900 text-white text-[15px] font-medium rounded-full hover:bg-gray-800 transition-colors shadow-lg"
            data-testid="button-hero-cta"
          >
            Get started
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      {/* More sections coming next */}
    </div>
  );
}
