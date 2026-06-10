import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, Zap, Settings } from "lucide-react";

const GUIDES = [
  { icon: Zap, title: "Getting started with Credyr", desc: "Everything you need to know for your first project — from onboarding to launch.", time: "5 min read" },
  { icon: BookOpen, title: "How to prepare your brand assets", desc: "What to gather before your brand or website project kicks off so we can hit the ground running.", time: "4 min read" },
  { icon: Settings, title: "Optimisation retainer: what to expect", desc: "A plain-language guide to how the monthly retainer works, what we track, and how we report.", time: "6 min read" },
  { icon: BookOpen, title: "Working with our team", desc: "Communication cadence, revision process, approval stages, and how to get the best result.", time: "3 min read" },
  { icon: Zap, title: "Launch checklist for new websites", desc: "The complete checklist we run through before every site goes live — and why each step matters.", time: "7 min read" },
  { icon: Settings, title: "SEO basics for service businesses", desc: "A practical guide to local SEO for dental, medical, wellness, and home service businesses.", time: "8 min read" },
];

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="px-5 sm:px-8 md:px-10 pt-28 pb-0">
        <Link href="/"><a className="inline-flex items-center gap-2 text-[13px] font-medium text-neutral-500 hover:text-gray-950 transition-colors">
          <ArrowLeft size={14} strokeWidth={1.8} /> Back to home
        </a></Link>
      </div>

      <section className="px-5 sm:px-8 md:px-10 pt-12 pb-16 md:pb-20 max-w-5xl">
        <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-block border border-gray-200 rounded-full px-3 py-1 text-[12px] text-gray-600 font-medium mb-6">
          Resources
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-950 leading-[1.05] mb-6 max-w-2xl">
          Guides & documentation.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-gray-500 leading-relaxed max-w-xl font-normal">
          Everything you need to work effectively with Credyr — from onboarding to launch and beyond.
        </motion.p>
      </section>

      <section className="px-5 sm:px-8 md:px-10 py-16 border-t border-neutral-200/60">
        <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-5">
          {GUIDES.map((g, i) => {
            const Icon = g.icon;
            return (
              <motion.div key={g.title}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
                className="bg-white border border-neutral-200/70 rounded-2xl p-6 shadow-sm flex gap-5 items-start cursor-pointer hover:shadow-md transition-shadow group">
                <div className="w-9 h-9 rounded-xl bg-[#faf9f6] border border-neutral-200/60 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={16} strokeWidth={1.7} className="text-gray-500" />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <h3 className="text-[16px] font-semibold text-gray-950 group-hover:text-gray-700 transition-colors">{g.title}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{g.desc}</p>
                  <p className="text-[11px] font-mono font-bold text-neutral-400 tracking-wide mt-2">{g.time}</p>
                </div>
                <ArrowRight size={14} strokeWidth={1.8} className="text-neutral-300 group-hover:text-gray-500 transition-colors shrink-0 mt-1" />
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-10 py-16 border-t border-neutral-200/60 bg-white">
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold text-gray-950 mb-2">Can't find what you need?</h2>
          <p className="text-[15px] text-gray-500 mb-6">Our team is always happy to help with specific questions.</p>
          <a href="mailto:hello@credyr.com" className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-5 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            Email us <ArrowRight size={13} strokeWidth={2} />
          </a>
        </div>
      </section>
    </div>
  );
}
