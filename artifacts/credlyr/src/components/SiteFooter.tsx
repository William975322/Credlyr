import { Link } from "wouter";
import { BrandLogo } from "./BrandLogo";
import { BRAND } from "./site";

const FOOTER_COLS = [
  {
    heading: "Services",
    links: [
      { label: "Websites & landing pages", href: "/product/websites" },
      { label: "Appointment scheduling", href: "/product/booking" },
      { label: "Lead response & CRM", href: "/product/conversion" },
    ],
  },
  {
    heading: "Sectors",
    links: [
      { label: "Dental practices", href: "/industries/dental" },
      { label: "Medical & clinics", href: "/industries/medical" },
      { label: "Advisory firms", href: "/industries/advisory" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Book a website audit", href: "/get-started" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer data-testid="site-footer" className="bg-[#161a1e] text-white">
      <div className="mx-auto w-full max-w-[1120px] px-6 pb-10 pt-20 md:px-10 md:pt-24 xl:px-0">
        <div className="flex flex-col gap-14 md:flex-row md:justify-between">
          <div className="max-w-[300px]">
            <BrandLogo tone="light" size="sm" />
            <p className="mt-5 text-[15px] leading-[1.6] text-white/55">
              Premium websites and lead-conversion systems for specialist service businesses.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 md:gap-x-16">
            {FOOTER_COLS.map((col) => (
              <div key={col.heading}>
                <p className="text-[14px] font-medium text-white">{col.heading}</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="-my-1.5 block py-1.5 text-[14.5px] leading-6 text-white/55 transition-colors hover:text-white"
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

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-[13px] text-white/45">
          <p>© {new Date().getFullYear()} {BRAND}</p>
          <div className="flex gap-6">
            <Link href="/legal" className="-my-2 py-2 transition-colors hover:text-white/80">
              Legal
            </Link>
            <Link href="/privacy" className="-my-2 py-2 transition-colors hover:text-white/80">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
