import { ArrowUpRight, Check } from "lucide-react";
import { ART, CONTAINER, PageHero, usePageTitle } from "../components/site";
import { SiteFooter } from "../components/SiteFooter";

// Public Cal.com booking link. Set VITE_CAL_URL to the dedicated
// "Website audit" event once it exists in Cal.com.
export const BOOKING_URL =
  (import.meta.env.VITE_CAL_URL as string | undefined)?.trim() || "https://cal.com/william-vanderpl";

const WHAT_TO_EXPECT = [
  "A review of your current website, on desktop and mobile",
  "Where visitors hesitate, and where enquiries may be lost",
  "Practical recommendations, starting with what matters most",
];

export default function BookingPage() {
  usePageTitle("Book a website audit", "Book a website audit with Credyr. We’ll review your current website with you and show you what to improve first.");
  return (
    <>
      <main>
        <PageHero
          art={ART.hero}
          position="50% 30%"
          eyebrow="Website audit"
          title="Book a website audit."
          lead="Choose a time that suits you. We’ll review your current website together and show you what to improve first."
        />

        <section className="bg-white pb-24 md:pb-32">
          <div className={`${CONTAINER} grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16`}>
            <div>
              <h2 className="text-[24px] tracking-[-0.035em] text-[#222221]">What to expect</h2>
              <ul className="mt-6 flex flex-col">
                {WHAT_TO_EXPECT.map((item) => (
                  <li key={item} className="flex gap-3 border-t border-[#ece9e3] py-4 text-[16px] leading-[1.5] text-[#4f4c48]">
                    <Check size={18} className="mt-0.5 shrink-0 text-[#222221]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[14px] leading-[1.6] text-[#6f6c66]">
                Booking is handled by Cal.com. You’ll receive a confirmation email with a link to reschedule or cancel.
              </p>
            </div>

            <div>
              <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_30px_80px_-40px_rgba(40,30,20,0.35)] ring-1 ring-black/[0.06]">
                <iframe
                  src={`${BOOKING_URL}?embed=true&theme=light`}
                  title="Book a website audit with Credyr"
                  className="block h-[680px] w-full border-0"
                  loading="eager"
                />
              </div>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-[14px] text-[#6b6864] underline-offset-4 hover:text-[#222221] hover:underline"
              >
                Calendar not loading? Open the booking page in a new tab
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
