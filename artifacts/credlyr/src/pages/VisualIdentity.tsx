import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

const DELIVERABLES = [
  "Logo System & Mark",
  "Colour Palette",
  "Typography System",
  "Iconography",
  "Motion Principles",
  "Brand Guidelines PDF",
];

const PRINCIPLES = [
  { title: "Distinctive", desc: "Your mark needs to own a space in people's minds — not blend in. We design for recognition, not trend." },
  { title: "Scalable", desc: "From favicon to billboard, every element is built to hold at any size and on any surface." },
  { title: "Systematic", desc: "We document every decision so your team — and future partners — can apply your brand without you in the room." },
  { title: "Timeless", desc: "Credyr identities are built to last a decade, not a season. We avoid what looks good right now and build what endures." },
];

export default function VisualIdentityPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="px-5 sm:px-8 md:px-10 pt-28 pb-0">
        <Link href="/">
          <a className="inline-flex items-center gap-2 text-[13px] font-medium text-neutral-500 hover:text-gray-950 transition-colors">
            <ArrowLeft size={14} strokeWidth={1.8} /> Back to home
          </a>
        </Link>
      </div>

      {/* Hero */}
      <section className="px-5 sm:px-8 md:px-10 pt-12 pb-16 md:pb-24 max-w-5xl">
        <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-block border border-gray-200 rounded-full px-3 py-1 text-[12px] text-gray-600 font-medium mb-6">
          Services
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-950 leading-[1.05] mb-6 max-w-2xl">
          The face of your brand — built to last.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-xl font-normal mb-10">
          A visual identity is more than a logo. It's the complete system that makes your brand instantly recognisable — wherever it appears and on whatever surface it lands.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
          <Link href="/get-started">
            <a className="inline-flex items-center gap-2 bg-gray-950 text-white rounded-full px-6 py-3 text-[14px] font-semibold hover:bg-gray-800 transition-colors">
              Start your identity <ArrowRight size={14} strokeWidth={2} />
            </a>
          </Link>
        </motion.div>
      </section>

      {/* Identity preview card */}
      <section className="px-5 sm:px-8 md:px-10 py-12 border-t border-neutral-200/60">
        <div className="max-w-5xl">
          <div className="bg-white border border-neutral-200/70 rounded-3xl p-8 md:p-12 flex flex-col gap-8 shadow-sm">
            {/* Logo mock */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-950 flex items-center justify-center shrink-0">
                <span className="text-white text-lg font-bold">✦</span>
              </div>
              <div>
                <p className="text-[18px] font-bold text-gray-950 tracking-tight leading-none">Credyr</p>
                <p className="text-[11px] text-neutral-400 font-medium mt-0.5">Brand System</p>
              </div>
            </div>
            {/* Colour palette */}
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-3">Colour Palette</p>
              <div className="flex gap-3 flex-wrap">
                {[
                  { bg: "bg-gray-950", label: "Ink" },
                  { bg: "bg-[#e6e2da]", label: "Sand" },
                  { bg: "bg-[#fbfaf7]", label: "Cream", border: true },
                  { bg: "bg-neutral-400", label: "Mist" },
                  { bg: "bg-neutral-200", label: "Haze", border: true },
                ].map((c) => (
                  <div key={c.label} className="flex flex-col items-center gap-1.5">
                    <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.border ? "border border-neutral-200" : ""}`} />
                    <span className="text-[10px] text-neutral-400 font-medium">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Type specimen */}
            <div className="border-t border-neutral-100 pt-6">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-3">Typography</p>
              <div className="flex items-baseline gap-5">
                <span className="text-[40px] font-bold text-gray-950 leading-none tracking-tight">Aa</span>
                <div>
                  <p className="text-[13px] font-semibold text-neutral-700">GT America</p>
                  <p className="text-[11px] text-neutral-400">Regular · Medium · Bold</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="px-5 sm:px-8 md:px-10 py-16 md:py-20 border-t border-neutral-200/60 bg-white">
        <div className="max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-950 mb-12 tracking-tight">Our design principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRINCIPLES.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex flex-col gap-2">
                <h3 className="text-[19px] font-semibold text-gray-950">{p.title}</h3>
                <p className="text-[15px] text-gray-500 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="px-5 sm:px-8 md:px-10 py-16 md:py-20 border-t border-neutral-200/60">
        <div className="max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-950 mb-10 tracking-tight">What you receive</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {DELIVERABLES.map((d, i) => (
              <motion.div key={d}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-3 bg-white border border-neutral-200/70 rounded-2xl px-5 py-4 shadow-sm">
                <CheckCircle2 size={16} strokeWidth={1.8} className="text-gray-400 mt-0.5 shrink-0" />
                <span className="text-[15px] font-medium text-gray-900">{d}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 sm:px-8 md:px-10 py-16 md:py-24 border-t border-neutral-200/60 bg-gray-950">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4 leading-tight">Ready to create an identity you're proud of?</h2>
          <p className="text-neutral-400 text-lg mb-8">Let's build something distinctive together.</p>
          <Link href="/get-started">
            <a className="inline-flex items-center gap-2 bg-white text-gray-950 rounded-full px-6 py-3 text-[14px] font-semibold hover:bg-neutral-100 transition-colors">
              Schedule a call <ArrowRight size={14} strokeWidth={2} />
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
