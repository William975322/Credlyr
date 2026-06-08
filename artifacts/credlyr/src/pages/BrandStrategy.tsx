import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

const DELIVERABLES = [
  "Brand Strategy & Positioning",
  "Naming & Verbal Identity",
  "Brand Architecture",
  "Visual Identity System",
  "Design System & Guidelines",
  "Brand Story & Messaging",
];

const PROCESS = [
  { step: "01", title: "Discovery", desc: "We immerse ourselves in your world — your market, your competitors, your customers, and your vision." },
  { step: "02", title: "Strategy", desc: "We define your positioning, brand voice, and the single story that makes you impossible to ignore." },
  { step: "03", title: "Identity", desc: "We build the visual and verbal system that brings your brand to life across every touchpoint." },
  { step: "04", title: "Delivery", desc: "You receive a complete brand kit, guidelines, and a team ready to implement consistently." },
];

const PROJECTS = ["Charlie Oscar", "Vertical", "Venga"];

export default function BrandStrategyPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Back nav */}
      <div className="px-5 sm:px-8 md:px-10 pt-28 pb-0">
        <Link href="/">
          <a className="inline-flex items-center gap-2 text-[13px] font-medium text-neutral-500 hover:text-gray-950 transition-colors">
            <ArrowLeft size={14} strokeWidth={1.8} />
            Back to home
          </a>
        </Link>
      </div>

      {/* Hero */}
      <section className="px-5 sm:px-8 md:px-10 pt-12 pb-16 md:pb-24 max-w-5xl">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block border border-gray-200 rounded-full px-3 py-1 text-[12px] text-gray-600 font-medium mb-6"
        >
          Services
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-950 leading-[1.05] mb-6 max-w-2xl"
        >
          Brand is how your business shows up in the world.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-xl font-normal mb-10"
        >
          It shapes perception, builds trust, and gives people a reason to believe in what you do. We define the strategy, narrative, and identity that bring your brand into focus.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Link href="/get-started">
            <a className="inline-flex items-center gap-2 bg-gray-950 text-white rounded-full px-6 py-3 text-[14px] font-semibold hover:bg-gray-800 transition-colors">
              Start a brand project <ArrowRight size={14} strokeWidth={2} />
            </a>
          </Link>
        </motion.div>
      </section>

      {/* Deliverables */}
      <section className="px-5 sm:px-8 md:px-10 py-16 md:py-20 border-t border-neutral-200/60">
        <div className="max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-950 mb-10 tracking-tight">What you get</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {DELIVERABLES.map((d, i) => (
              <motion.div
                key={d}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-3 bg-white border border-neutral-200/70 rounded-2xl px-5 py-4 shadow-sm"
              >
                <CheckCircle2 size={16} strokeWidth={1.8} className="text-gray-400 mt-0.5 shrink-0" />
                <span className="text-[15px] font-medium text-gray-900">{d}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-5 sm:px-8 md:px-10 py-16 md:py-20 border-t border-neutral-200/60 bg-white">
        <div className="max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-950 mb-12 tracking-tight">How we work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col gap-3"
              >
                <span className="text-[11px] font-mono font-bold text-neutral-400 tracking-widest">{p.step}</span>
                <h3 className="text-[20px] font-semibold text-gray-950">{p.title}</h3>
                <p className="text-[15px] text-gray-500 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-5 sm:px-8 md:px-10 py-16 md:py-20 border-t border-neutral-200/60">
        <div className="max-w-5xl flex items-center gap-6 flex-wrap">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest font-mono">Featured Projects:</span>
          {PROJECTS.map((p) => (
            <a key={p} href="#" className="text-[13px] font-semibold text-neutral-700 hover:text-black flex items-center gap-0.5 group transition-colors font-mono">
              {p}<span className="inline-block transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150">↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 sm:px-8 md:px-10 py-16 md:py-24 border-t border-neutral-200/60 bg-gray-950">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4 leading-tight">Ready to build a brand that stands for something?</h2>
          <p className="text-neutral-400 text-lg mb-8 leading-relaxed">Let's start with a conversation about where you are and where you want to be.</p>
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
