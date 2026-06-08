import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

const NEWS_ITEMS = [
  { date: "June 2026", tag: "Launch", title: "Credlyr launches full brand and digital studio services for SMEs", excerpt: "Today we're announcing the full Credlyr studio offering — brand strategy, visual identity, full-cycle websites, and ongoing optimisation — all under one roof." },
  { date: "May 2026", tag: "Partnership", title: "Credlyr joins the Dental Growth Alliance as preferred digital partner", excerpt: "We're proud to be the recommended website and brand partner for DGA member practices across the UK." },
  { date: "April 2026", tag: "Product", title: "Introducing Ongoing Optimisation: your site, always improving", excerpt: "Our new monthly retainer service keeps your digital presence sharp, fast, and converting — month after month." },
];

export default function NewsPage() {
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
          Company
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-950 leading-[1.05] mb-6 max-w-2xl">
          News & announcements.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-gray-500 leading-relaxed max-w-xl font-normal">
          The latest from Credlyr — product launches, partnerships, and what we're thinking about.
        </motion.p>
      </section>

      <section className="px-5 sm:px-8 md:px-10 py-16 border-t border-neutral-200/60">
        <div className="max-w-5xl flex flex-col gap-6">
          {NEWS_ITEMS.map((n, i) => (
            <motion.article key={n.title}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-white border border-neutral-200/70 rounded-2xl p-7 shadow-sm flex flex-col gap-3 md:flex-row md:items-start md:gap-8">
              <div className="md:w-32 shrink-0">
                <p className="text-[11px] font-mono font-bold text-neutral-400 tracking-wider">{n.date}</p>
                <span className="inline-block mt-2 bg-[#faf9f6] border border-neutral-200/60 rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-neutral-600">{n.tag}</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[18px] font-semibold text-gray-950 leading-snug">{n.title}</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">{n.excerpt}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-10 py-16 border-t border-neutral-200/60 bg-white">
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold text-gray-950 mb-2">Press enquiries</h2>
          <p className="text-[15px] text-gray-500 mb-4">For media requests, interviews, and partnership announcements, reach us at:</p>
          <a href="mailto:press@credlyr.com" className="text-[15px] font-semibold text-gray-950 hover:text-gray-500 transition-colors">press@credlyr.com</a>
        </div>
      </section>
    </div>
  );
}
