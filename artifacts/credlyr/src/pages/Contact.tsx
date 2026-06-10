import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Mail, Clock } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="px-5 sm:px-8 md:px-10 pt-28 pb-0">
        <Link href="/"><a className="inline-flex items-center gap-2 text-[13px] font-medium text-neutral-500 hover:text-gray-950 transition-colors">
          <ArrowLeft size={14} strokeWidth={1.8} /> Back to home
        </a></Link>
      </div>

      <div className="px-5 sm:px-8 md:px-10 pt-12 pb-24 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-block border border-gray-200 rounded-full px-3 py-1 text-[12px] text-gray-600 font-medium mb-6">
            Company
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
            className="text-5xl md:text-5xl font-semibold tracking-tight text-gray-950 leading-[1.1] mb-6">
            Let's talk.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-500 leading-relaxed font-normal mb-10">
            Whether you have a project in mind or just want to explore what's possible — we'd love to hear from you.
          </motion.p>

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200/60 flex items-center justify-center shrink-0">
                <Mail size={15} strokeWidth={1.8} className="text-gray-500" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Email</p>
                <a href="mailto:hello@credyr.com" className="text-[15px] font-semibold text-gray-900 hover:text-gray-500 transition-colors">hello@credyr.com</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200/60 flex items-center justify-center shrink-0">
                <Clock size={15} strokeWidth={1.8} className="text-gray-500" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Response time</p>
                <p className="text-[15px] font-semibold text-gray-900">Within 24 hours</p>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-neutral-200/60 pt-8">
            <p className="text-[13px] text-gray-500 mb-4">Prefer to book directly?</p>
            <Link href="/get-started">
              <a className="inline-flex items-center gap-2 bg-gray-950 text-white rounded-full px-5 py-2.5 text-[13px] font-semibold hover:bg-gray-800 transition-colors">
                Schedule a call <ArrowRight size={13} strokeWidth={2} />
              </a>
            </Link>
          </div>
        </div>

        {/* Right — form */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white border border-neutral-200/70 rounded-3xl p-8 shadow-sm">
          {sent ? (
            <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-xl">✓</span>
              </div>
              <h3 className="text-[19px] font-semibold text-gray-950">Message sent</h3>
              <p className="text-[14px] text-gray-500">We'll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Name</label>
                  <input required type="text" placeholder="Your name" className="border border-neutral-200 rounded-xl px-4 py-3 text-[14px] bg-[#faf9f6] focus:outline-none focus:ring-2 focus:ring-gray-300 transition" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Email</label>
                  <input required type="email" placeholder="you@company.com" className="border border-neutral-200 rounded-xl px-4 py-3 text-[14px] bg-[#faf9f6] focus:outline-none focus:ring-2 focus:ring-gray-300 transition" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">What do you need?</label>
                <select className="border border-neutral-200 rounded-xl px-4 py-3 text-[14px] bg-[#faf9f6] focus:outline-none focus:ring-2 focus:ring-gray-300 transition text-gray-700">
                  <option>Brand Strategy</option>
                  <option>Visual Identity</option>
                  <option>Full-Cycle Website</option>
                  <option>Landing Pages</option>
                  <option>Ongoing Optimisation</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Message</label>
                <textarea required rows={4} placeholder="Tell us about your project..." className="border border-neutral-200 rounded-xl px-4 py-3 text-[14px] bg-[#faf9f6] focus:outline-none focus:ring-2 focus:ring-gray-300 transition resize-none" />
              </div>
              <button type="submit" className="w-full bg-gray-950 text-white rounded-xl py-3 text-[14px] font-semibold hover:bg-gray-800 transition-colors">
                Send message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
