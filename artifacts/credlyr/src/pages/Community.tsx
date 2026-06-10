import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="px-5 sm:px-8 md:px-10 pt-28 pb-0">
        <Link href="/"><a className="inline-flex items-center gap-2 text-[13px] font-medium text-neutral-500 hover:text-gray-950 transition-colors">
          <ArrowLeft size={14} strokeWidth={1.8} /> Back to home
        </a></Link>
      </div>

      <section className="px-5 sm:px-8 md:px-10 pt-12 pb-16 md:pb-24 max-w-3xl">
        <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-block border border-gray-200 rounded-full px-3 py-1 text-[12px] text-gray-600 font-medium mb-6">
          Community
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-950 leading-[1.05] mb-6 max-w-2xl">
          The Credyr Community.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-500 leading-relaxed font-normal mb-10">
          A private space for Credyr clients and partners to share results, get feedback, and stay sharp on what's working in digital growth.
        </motion.p>
      </section>

      <section className="px-5 sm:px-8 md:px-10 py-16 border-t border-neutral-200/60 bg-white">
        <div className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Monthly newsletter", desc: "Practical digital marketing and design insights delivered monthly. No fluff — just what's working for businesses like yours." },
            { title: "Client Slack group", desc: "A private channel where Credyr clients share wins, ask questions, and get direct access to our team between projects." },
            { title: "Webinar series", desc: "Quarterly live sessions on conversion, SEO, branding, and digital strategy — hosted by the Credyr team." },
          ].map((c, i) => (
            <motion.div key={c.title}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col gap-3">
              <h3 className="text-[19px] font-semibold text-gray-950">{c.title}</h3>
              <p className="text-[15px] text-gray-500 leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter signup */}
      <section className="px-5 sm:px-8 md:px-10 py-16 md:py-20 border-t border-neutral-200/60">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-950 mb-4 tracking-tight">Join the newsletter</h2>
          <p className="text-[15px] text-gray-500 mb-8 leading-relaxed">Get our best articles, case studies, and resources delivered straight to your inbox. Monthly. Always practical.</p>
          <form className="flex gap-3 flex-col sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" className="flex-1 border border-neutral-200 rounded-xl px-4 py-3 text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition" />
            <button type="submit" className="inline-flex items-center gap-2 bg-gray-950 text-white rounded-xl px-6 py-3 text-[14px] font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap">
              Subscribe <ArrowRight size={14} strokeWidth={2} />
            </button>
          </form>
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-10 py-16 md:py-24 border-t border-neutral-200/60 bg-gray-950">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">Already a client?</h2>
          <p className="text-neutral-400 text-lg mb-8">Get access to the private Slack group and quarterly webinars — included for all active clients.</p>
          <Link href="/get-started"><a className="inline-flex items-center gap-2 bg-white text-gray-950 rounded-full px-6 py-3 text-[14px] font-semibold hover:bg-neutral-100 transition-colors">
            Schedule a call <ArrowRight size={14} strokeWidth={2} />
          </a></Link>
        </div>
      </section>
    </div>
  );
}
