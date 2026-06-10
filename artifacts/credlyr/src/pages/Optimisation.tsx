import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, TrendingUp } from "lucide-react";

const METRICS = [
  { value: "3.2×", label: "Average ROI", sub: "vs. no retainer" },
  { value: "+31%", label: "Conversion lift", sub: "median across clients" },
  { value: "2 wk", label: "First results", sub: "from kickoff" },
];

const INCLUDED = [
  "Monthly site performance audit",
  "A/B testing & experimentation",
  "SEO structure review & fixes",
  "Conversion rate optimisation",
  "Speed & Core Web Vitals",
  "Content & copy updates",
  "Analytics reporting & insights",
  "Priority design changes",
];

export default function OptimisationPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="px-5 sm:px-8 md:px-10 pt-28 pb-0">
        <Link href="/">
          <a className="inline-flex items-center gap-2 text-[13px] font-medium text-neutral-500 hover:text-gray-950 transition-colors">
            <ArrowLeft size={14} strokeWidth={1.8} /> Back to home
          </a>
        </Link>
      </div>

      <section className="px-5 sm:px-8 md:px-10 pt-12 pb-16 md:pb-24 max-w-5xl">
        <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-block border border-gray-200 rounded-full px-3 py-1 text-[12px] text-gray-600 font-medium mb-6">
          Services
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-950 leading-[1.05] mb-6 max-w-2xl">
          Your site keeps getting better — every single month.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-xl font-normal mb-10">
          Launch is just the beginning. Ongoing Optimisation is our monthly retainer that keeps your digital presence sharp, fast, and converting — so you never leave performance on the table.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
          <Link href="/get-started">
            <a className="inline-flex items-center gap-2 bg-gray-950 text-white rounded-full px-6 py-3 text-[14px] font-semibold hover:bg-gray-800 transition-colors">
              Start optimising <ArrowRight size={14} strokeWidth={2} />
            </a>
          </Link>
        </motion.div>
      </section>

      {/* Metrics */}
      <section className="px-5 sm:px-8 md:px-10 py-12 border-t border-neutral-200/60 bg-white">
        <div className="max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-6">
          {METRICS.map((m, i) => (
            <motion.div key={m.label}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#faf9f6] border border-neutral-200/60 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} strokeWidth={1.8} className="text-neutral-400" />
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">{m.label}</span>
              </div>
              <p className="text-4xl font-semibold text-gray-950 tracking-tight">{m.value}</p>
              <p className="text-[13px] text-neutral-400 mt-1">{m.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="px-5 sm:px-8 md:px-10 py-16 md:py-20 border-t border-neutral-200/60">
        <div className="max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-950 mb-10 tracking-tight">What's included every month</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INCLUDED.map((item, i) => (
              <motion.div key={item}
                initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-3 bg-white border border-neutral-200/70 rounded-xl px-5 py-3.5 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                <span className="text-[15px] font-medium text-gray-900">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-5 sm:px-8 md:px-10 py-16 md:py-20 border-t border-neutral-200/60 bg-white">
        <div className="max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-950 mb-10 tracking-tight">How the retainer works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: "Week 1", t: "Audit & prioritise", d: "We analyse your site's data, identify the biggest conversion opportunities, and set the monthly sprint." },
              { n: "Weeks 2–3", t: "Build & test", d: "Changes are made, A/B tests run, and new variations go live — all tracked and version-controlled." },
              { n: "Week 4", t: "Report & plan", d: "You get a plain-language report covering what we did, what moved the needle, and what we tackle next month." },
            ].map((s, i) => (
              <motion.div key={s.n}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col gap-2">
                <span className="text-[11px] font-mono font-bold text-neutral-400 tracking-widest">{s.n}</span>
                <h3 className="text-[19px] font-semibold text-gray-950">{s.t}</h3>
                <p className="text-[15px] text-gray-500 leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 sm:px-8 md:px-10 py-16 md:py-24 border-t border-neutral-200/60 bg-gray-950">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4 leading-tight">Stop leaving conversions on the table.</h2>
          <p className="text-neutral-400 text-lg mb-8">Join businesses already growing with Credyr's monthly optimisation retainer.</p>
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
