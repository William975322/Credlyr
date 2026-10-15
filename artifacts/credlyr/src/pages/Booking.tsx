import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ArrowUpRight, Check } from "lucide-react";
import { ART, CONTAINER, PageHero, usePageTitle } from "../components/site";
import { SiteFooter } from "../components/SiteFooter";

// Public Cal.com link to the "Website audit" event. Set VITE_CAL_URL in
// Vercel; `pnpm run check:launch --env` fails while it is missing.
export const BOOKING_URL =
  (import.meta.env.VITE_CAL_URL as string | undefined)?.trim() || "https://cal.com/william-vanderpl";

function embedUrl() {
  const url = new URL(BOOKING_URL);
  url.searchParams.set("embed", "true");
  url.searchParams.set("embedType", "inline");
  url.searchParams.set("theme", "light");
  return url.toString();
}

const WHAT_YOU_GET = [
  "A walk through your website on desktop and mobile, the way a new patient or client sees it",
  "Where visitors hesitate, and where enquiries are likely to be lost",
  "A short, prioritised list of improvements, starting with what matters most",
  "An honest view on whether a new website is worth it for you right now",
];

// The calendar is a Cal.com iframe, which sets third-party cookies. It loads
// only after the visitor asks for it, and then sizes itself to its content
// using the height Cal.com reports through postMessage.
function Calendar() {
  const [, navigate] = useLocation();
  const [show, setShow] = useState(false);
  const [height, setHeight] = useState(620);

  useEffect(() => {
    if (!show) return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== new URL(BOOKING_URL).origin) return;
      const msg = typeof e.data === "string" ? safeParse(e.data) : e.data;
      if (msg?.originator !== "CAL") return;
      if (msg.type === "__dimensionChanged" && typeof msg.data?.iframeHeight === "number") {
        setHeight(Math.max(420, Math.ceil(msg.data.iframeHeight)));
      }
      if (msg.type === "bookingSuccessful" || msg.type === "bookingSuccessfulV2") {
        navigate("/thanks?booked=1");
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [show, navigate]);

  if (!show) {
    return (
      <div className="flex flex-col items-start rounded-[24px] bg-[#f7f4ef] p-8 sm:p-10">
        <h2 className="text-[24px] tracking-[-0.035em] text-[#222221]">Choose a time</h2>
        <p className="mt-3 max-w-[460px] text-[16px] leading-[1.55] text-[#4f4c48]">
          Available times are shown in a calendar provided by Cal.com. It loads when you choose to see it, and
          Cal.com may then set its own cookies.
        </p>
        <button
          type="button"
          onClick={() => setShow(true)}
          className="mt-7 inline-flex items-center rounded-full bg-[#16100c] px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Show available times
        </button>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1 py-1 text-[14px] text-[#6b6864] underline-offset-4 hover:text-[#222221] hover:underline"
        >
          Or book on cal.com
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-[24px] bg-white ring-1 ring-black/[0.06]">
        <iframe
          src={embedUrl()}
          title="Available times for a website audit"
          style={{ height }}
          className="block w-full border-0 transition-[height] duration-300"
        />
      </div>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1 py-1 text-[14px] text-[#6b6864] underline-offset-4 hover:text-[#222221] hover:underline"
      >
        Calendar not loading? Open the booking page in a new tab
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </div>
  );
}

function safeParse(s: string) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

export default function BookingPage() {
  usePageTitle(
    "Book a free website audit",
    "Book a free 30-minute website audit. We review your current website with you and show you what to improve first.",
  );
  return (
    <>
      <main>
        <PageHero
          art={ART.hero}
          position="50% 30%"
          eyebrow="Website audit"
          title="Book a free website audit."
          lead="A free 30-minute video call. We look at your current website together and show you what to improve first. There’s no obligation."
        />

        <section className="bg-white pb-24 md:pb-32">
          <div className={`${CONTAINER} grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16`}>
            <div>
              <h2 className="text-[24px] tracking-[-0.035em] text-[#222221]">What you’ll get</h2>
              <ul className="mt-6 flex flex-col">
                {WHAT_YOU_GET.map((item) => (
                  <li key={item} className="flex gap-3 border-t border-[#ece9e3] py-4 text-[16px] leading-[1.5] text-[#4f4c48]">
                    <Check size={18} className="mt-0.5 shrink-0 text-[#222221]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[14px] leading-[1.6] text-[#6b6864]">
                You’ll receive a confirmation email from Cal.com with a link to reschedule or cancel.
              </p>
            </div>

            <Calendar />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
