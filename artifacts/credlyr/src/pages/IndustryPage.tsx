import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export interface IndustryData {
  name: string;
  tagline: string;
  description: string;
  hero: string;
  painPoints: string[];
  features: { title: string; desc: string }[];
  ctaLine: string;
}

export default function IndustryPage({ data }: { data: IndustryData }) {
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
          {data.name}
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-950 leading-[1.05] mb-6 max-w-2xl">
          {data.tagline}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-xl font-normal mb-10">
          {data.description}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
          <Link href="/get-started">
            <a className="inline-flex items-center gap-2 bg-gray-950 text-white rounded-full px-6 py-3 text-[14px] font-semibold hover:bg-gray-800 transition-colors">
              Start your project <ArrowRight size={14} strokeWidth={2} />
            </a>
          </Link>
        </motion.div>
      </section>

      {/* Pain points */}
      <section className="px-5 sm:px-8 md:px-10 py-16 border-t border-neutral-200/60 bg-white">
        <div className="max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-950 mb-10 tracking-tight">What we solve for {data.name.toLowerCase()}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.painPoints.map((p, i) => (
              <motion.div key={p}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-3 bg-[#faf9f6] border border-neutral-200/60 rounded-2xl px-5 py-4">
                <CheckCircle2 size={16} strokeWidth={1.8} className="text-gray-400 mt-0.5 shrink-0" />
                <span className="text-[15px] font-medium text-gray-900">{p}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-5 sm:px-8 md:px-10 py-16 md:py-20 border-t border-neutral-200/60">
        <div className="max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-950 mb-12 tracking-tight">What you get with Credlyr</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.features.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex flex-col gap-2">
                <h3 className="text-[19px] font-semibold text-gray-950">{f.title}</h3>
                <p className="text-[15px] text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 sm:px-8 md:px-10 py-16 md:py-24 border-t border-neutral-200/60 bg-gray-950">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4 leading-tight">{data.ctaLine}</h2>
          <p className="text-neutral-400 text-lg mb-8">Book a free 30-minute call. No commitment, no pitch deck.</p>
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
