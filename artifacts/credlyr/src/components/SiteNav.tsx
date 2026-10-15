import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ChevronDown, Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { BRAND } from "./site";

interface NavItem {
  label: string;
  href?: string;
  items?: { label: string; sub: string; href: string }[];
}

const NAV: NavItem[] = [
  {
    label: "Services",
    items: [
      { label: "Websites & landing pages", sub: "Bespoke sites built to earn trust", href: "/product/websites" },
      { label: "Appointment scheduling", sub: "Booking on your own website", href: "/product/booking" },
      { label: "Lead response & CRM", sub: "Prompt replies, recorded properly", href: "/product/conversion" },
      { label: "Website audit", sub: "A review of your current site", href: "/get-started" },
    ],
  },
  {
    label: "Sectors",
    items: [
      { label: "Dental practices", sub: "General, cosmetic and specialist", href: "/industries/dental" },
      { label: "Medical & clinics", sub: "Private consultants and clinics", href: "/industries/medical" },
      { label: "Aesthetics", sub: "Aesthetic and wellness studios", href: "/industries/aesthetics" },
      { label: "Advisory firms", sub: "Legal, wealth and consultancy", href: "/industries/advisory" },
    ],
  },
  { label: "About", href: "/about" },
];

export function SiteNav() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
    setExpanded(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const active = NAV.find((n) => n.label === open);

  return (
    <header
      data-testid="navigation"
      onMouseLeave={() => setOpen(null)}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300 ${
        scrolled || open ? "bg-white/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1440px] items-center justify-between px-6 md:h-[76px] md:px-10">
        <Link href="/" data-testid="link-logo" aria-label={`${BRAND} home`} className="relative z-10">
          <BrandLogo />
        </Link>

        <nav aria-label="Main navigation" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {NAV.map((item) =>
            item.items ? (
              <button
                key={item.label}
                type="button"
                aria-expanded={open === item.label}
                aria-haspopup="true"
                onMouseEnter={() => setOpen(item.label)}
                onFocus={() => setOpen(item.label)}
                onClick={() => setOpen(open === item.label ? null : item.label)}
                data-testid={`nav-link-${item.label.toLowerCase()}`}
                className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[14.5px] text-[#222221] transition-colors hover:text-[#6b6864]"
              >
                {item.label}
                <ChevronDown
                  size={14}
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${open === item.label ? "rotate-180" : ""}`}
                />
              </button>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                onMouseEnter={() => setOpen(null)}
                data-testid={`nav-link-${item.label.toLowerCase()}`}
                className="rounded-full px-3.5 py-2 text-[14.5px] text-[#222221] transition-colors hover:text-[#6b6864]"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <Link
          href="/get-started"
          data-testid="button-book-demo"
          className="relative z-10 hidden items-center rounded-full bg-[#16100c] px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-neutral-800 md:inline-flex"
        >
          Book an audit
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="-mr-2 flex h-11 w-11 items-center justify-center text-[#222221] md:hidden"
        >
          <Menu size={24} strokeWidth={1.7} />
        </button>
      </div>

      {/* Desktop dropdown */}
      <AnimatePresence>
        {active?.items && (
          <motion.div
            key={active.label}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-[68px] hidden w-[520px] -translate-x-1/2 md:block"
          >
            <div className="grid grid-cols-2 gap-1 rounded-2xl border border-black/[0.06] bg-white p-3 shadow-[0_24px_60px_-24px_rgba(30,25,20,0.3)]">
              {active.items.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-xl px-4 py-3 transition-colors hover:bg-[#f4f2ee]"
                  data-testid={`dropdown-item-${link.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                >
                  <span className="block text-[14.5px] font-medium text-[#222221]">{link.label}</span>
                  <span className="mt-0.5 block text-[13.5px] text-[#6b6864]">{link.sub}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-white px-6 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-[68px] shrink-0 items-center justify-between">
              <Link href="/" aria-label={`${BRAND} home`}>
                <BrandLogo />
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="-mr-2 flex h-11 w-11 items-center justify-center text-[#222221]"
              >
                <X size={24} strokeWidth={1.7} />
              </button>
            </div>

            <div className="flex flex-1 flex-col pt-4">
              {NAV.map((item) =>
                item.items ? (
                  <div key={item.label} className="border-b border-[#ece9e3]">
                    <button
                      type="button"
                      aria-expanded={expanded === item.label}
                      onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                      className="flex w-full items-center justify-between py-5 text-left text-[20px] tracking-[-0.02em] text-[#222221]"
                    >
                      {item.label}
                      <ChevronDown
                        size={18}
                        aria-hidden="true"
                        className={`text-[#6f6c66] transition-transform duration-200 ${expanded === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col pb-4">
                            {item.items.map((link) => (
                              <Link key={link.label} href={link.href} className="py-2.5 text-[16px] text-[#6b6864]">
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className="border-b border-[#ece9e3] py-5 text-[20px] tracking-[-0.02em] text-[#222221]"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>

            <div className="shrink-0 pb-8 pt-6">
              <Link
                href="/get-started"
                className="flex w-full items-center justify-center rounded-full bg-[#16100c] py-4 text-[16px] font-medium text-white"
              >
                Book a website audit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
