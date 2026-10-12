import { Compass, ListChecks, MessageCircle, PenTool } from "lucide-react";
import { ART, ClosingCta, CONTAINER, H2, LEAD, PageHero, PointGrid, usePageTitle } from "../components/site";
import { SiteFooter } from "../components/SiteFooter";

const PRINCIPLES = [
  { icon: PenTool, title: "Considered, not templated", body: "Every site starts from your practice, your clients and what makes you worth choosing." },
  { icon: ListChecks, title: "A clear, defined service", body: "Three services with a defined process, so you know what you’re getting and when." },
  { icon: Compass, title: "Honest about results", body: "We don’t promise numbers we can’t stand behind. We agree what success looks like together." },
  { icon: MessageCircle, title: "Plain communication", body: "No jargon. You’ll always know what we’re working on and what we need from you." },
];

export default function AboutPage() {
  usePageTitle("About", "Credyr designs websites and lead-conversion systems for clinics, practices and advisory firms. Founder-led, with a clear, defined service.");
  return (
    <>
      <main>
        <PageHero
          art={ART.sky}
          position="50% 20%"
          eyebrow="About Credyr"
          title="Good practices deserve websites that earn trust."
          lead="Credyr designs websites and lead-conversion systems for clinics, practices and advisory firms."
        />

        <section className="bg-white pb-20 md:pb-28">
          <div className={CONTAINER}>
            <div className="max-w-[680px] space-y-6 text-[18px] leading-[1.65] text-[#3f3d3a] md:text-[19px]">
              <p>
                People choose a dentist, a specialist or an adviser carefully. More and more often, the first
                impression of that practice is its website, and too often that website lets it down. It looks
                dated, hides the information people need, makes booking awkward, or leaves enquiries waiting.
              </p>
              <p>
                We started Credyr to close that gap. We design websites that reflect the quality of the care
                and advice behind them, then connect them to the systems that turn interest into appointments:
                online booking, prompt replies to every enquiry, and a clear record in your CRM.
              </p>
              <p>
                Design, booking and follow-up are usually handled by different people with different tools.
                We bring them together as one service, so nothing gets lost between them.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white pb-20 md:pb-28">
          <div className={CONTAINER}>
            <h2 className={H2}>How we work</h2>
            <div className="mt-12">
              <PointGrid points={PRINCIPLES} columns={4} />
            </div>
          </div>
        </section>

        <section className="bg-[#f7f4ef] py-20 md:py-28">
          <div className={`${CONTAINER} grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.3fr] md:gap-16`}>
            <div>
              <h2 className={H2}>Who you’ll work with</h2>
              <p className={`${LEAD} mt-4`}>Credyr is founder-led. You work directly with the person responsible for your project.</p>
            </div>
            <div className="flex items-start gap-5 border-t border-[#222221] pt-7">
              <span
                aria-hidden="true"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#222221] text-[16px] text-white"
              >
                WV
              </span>
              <div>
                <h3 className="text-[20px] tracking-[-0.03em] text-[#222221]">William Vanderplaetse</h3>
                <p className="text-[15px] text-[#6f6c66]">Founder</p>
                <p className="mt-4 text-[16px] leading-[1.6] text-[#4f4c48]">
                  Former managing consultant in IBM Benelux’s Data, AI &amp; Automation practice, with a background
                  in data engineering, positioning and technology delivery.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
