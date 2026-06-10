import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { SiteFooter } from "../App";

export default function Careers() {
  const openAppRoles = [
    { title: "Your future role", levels: "Open application", location: "Remote" }
  ];

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-gray-950 pt-0 pb-0 px-0 flex flex-col justify-between animate-fade-in">
      
      {/* ─── 1. Hero Letter Section (Sky Background) ─── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#bae6fd] via-[#e0f2fe] to-[#fbfaf7] pt-36 pb-24 md:pt-48 md:pb-32 px-5 sm:px-8 md:px-10">
        {/* Soft painted cloud details */}
        <div className="absolute inset-0 pointer-events-none opacity-40 select-none">
          <svg viewBox="0 0 1000 400" className="w-full h-full fill-white/60">
            <path d="M100,280 Q200,240 350,270 T650,290 T900,260 L1000,400 L0,400 Z" />
            <path d="M-50,330 Q150,300 350,320 T750,310 T1050,330 L1000,400 L0,400 Z" />
          </svg>
        </div>

        <div className="max-w-3xl mx-auto relative z-10 text-left">
          {/* Script Subtitle */}
          <span className="font-serif italic text-[20px] md:text-[22px] text-sky-800/85 mb-4 block tracking-wide">
            A letter from our founder
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] leading-[1.04] tracking-tight font-sans font-bold text-gray-950 mb-10">
            Building a unique company
          </h1>

          {/* Letter Body Copy */}
          <div className="space-y-6 text-[17px] md:text-[18px] text-neutral-800 leading-relaxed font-normal">
            <p className="font-semibold text-gray-950 text-[18px] md:text-[19px]">
              Dear future colleague, or other readers,
            </p>
            <p>
              &apos;Here&apos;s your spin-up buddy,&apos; said my manager at IBM years ago. Into the door walked a team that wanted to ship code, design interfaces, and build products at speeds they had never seen before. It marked the beginning of my love for technology execution, and eventually, the decision to build Credyr.
            </p>
            <p>
              We spend our days discussing how to build an agency that brings out the absolute best in people. Our friends and colleagues often mockingly joke: &apos;Shouldn’t you just build websites first and define your company culture later?&apos;. We politely disagree — both are equally important to execute on a big vision.
            </p>

            <h3 className="text-2xl font-bold text-gray-950 pt-6 pb-2 tracking-tight">
              Building a company as a product.
            </h3>
            <p>
              So here we are: thrilled to finally bring this vision into reality! We see Credyr as the second product we are building and are deeply motivated to make it our best. So how do we bring this to life?
            </p>
            <p>
              <strong>People.</strong> We believe a business becomes the people it hires. Talent density is the core of our company product. To us, this is our #1 goal. That&apos;s why we give extensive autonomy, select projects that challenge our boundaries, and are relentlessly looking for exceptional talent.
            </p>
            <p>
              <strong>Culture.</strong> The best people can work anywhere, but there are few places where they can do their best work. We aspire to be that place for you. We believe in real ownership, radical trust, full transparency, and moving fast. Fewer layers, more clarity.
            </p>
            <p>
              <strong>Ambition.</strong> Our ambitions are nothing short of grand. We believe in the magic of building things that last and help our partners command absolute authority in their respective fields.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2. Open Positions Section ─── */}
      <section className="bg-white py-24 md:py-32 px-5 sm:px-8 md:px-10 border-t border-b border-neutral-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-[46px] font-bold tracking-tight text-gray-950 mb-16 text-left">
            Open positions
          </h2>

          <div className="space-y-12">
            
            {/* Open Applications */}
            <div>
              <h3 className="text-xs font-bold font-mono text-neutral-400 uppercase tracking-widest mb-6 border-b border-neutral-100 pb-3">
                Open applications
              </h3>
              <div className="divide-y divide-neutral-100">
                {openAppRoles.map((role) => (
                  <div key={role.title} className="py-6 flex items-center justify-between group">
                    <div>
                      <h4 className="text-[17px] font-bold text-gray-950 group-hover:text-neutral-600 transition-colors">
                        {role.title}
                      </h4>
                      <p className="text-xs text-neutral-400 font-mono mt-1">
                        {role.levels}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-neutral-500 bg-neutral-50 border border-neutral-200/60 rounded-lg px-2.5 py-1 flex items-center gap-1.5">
                      <Globe size={13} className="text-neutral-400" />
                      {role.location}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 3. Feedback Section ─── */}
      <section className="bg-white py-24 md:py-32 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-3xl mx-auto text-left">
          <h2 className="text-3xl md:text-4xl lg:text-[46px] font-bold tracking-tight text-gray-950 mb-8 leading-tight">
            Feedback
          </h2>
          <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-normal max-w-2xl">
            One of our operating principles is to be a <em>curious student</em> — always learning, borrowing, remixing, and rethinking. So if there is anything we can improve, we&apos;d love to hear from you. We appreciate blunt directness: the good, the bad, the confusing. You can email us at{" "}
            <a href="mailto:feedback@credyr.com" className="text-gray-950 font-semibold underline decoration-neutral-400 hover:text-neutral-700 transition-colors">
              feedback@credyr.com
            </a>{" "}
            — we read every note with curiosity and care.
          </p>
        </div>
      </section>

      {/* Shared Dark Site Footer */}
      <SiteFooter />
    </div>
  );
}
