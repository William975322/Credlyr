import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Shield, Lock, Server, Eye } from "lucide-react";

const PILLARS = [
  { icon: Lock, title: "Encryption at rest & in transit", desc: "All client data is encrypted using AES-256 at rest and TLS 1.3 in transit. We never store sensitive credentials in plain text." },
  { icon: Server, title: "Secure infrastructure", desc: "All Credlyr services are hosted on enterprise-grade cloud infrastructure with SOC 2 Type II certified providers and automatic failover." },
  { icon: Eye, title: "Access control", desc: "Role-based access controls limit who can view or modify client data. All actions are logged and auditable." },
  { icon: Shield, title: "Responsible disclosure", desc: "We maintain a responsible disclosure programme. If you discover a vulnerability, we want to hear from you." },
];

export default function SecurityPage() {
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
          Security you can trust.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-gray-500 leading-relaxed max-w-xl font-normal">
          Credlyr takes the security of your data and your clients' data seriously. Here's how we protect what matters.
        </motion.p>
      </section>

      {/* Pillars */}
      <section className="px-5 sm:px-8 md:px-10 py-16 border-t border-neutral-200/60">
        <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white border border-neutral-200/70 rounded-2xl p-7 shadow-sm flex gap-5 items-start">
                <div className="w-10 h-10 rounded-xl bg-[#faf9f6] border border-neutral-200/60 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={18} strokeWidth={1.7} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-gray-950 mb-2">{p.title}</h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* GDPR */}
      <section className="px-5 sm:px-8 md:px-10 py-16 border-t border-neutral-200/60 bg-white">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-950 mb-4 tracking-tight">GDPR & Data Privacy</h2>
          <p className="text-[15px] text-gray-500 leading-relaxed mb-6">
            Credlyr operates in full compliance with the General Data Protection Regulation (GDPR). We act as a data processor for client data and never sell, share, or use your data for purposes beyond the services we provide. Our full Privacy Policy is available at the footer of every page.
          </p>
          <div className="flex gap-4 flex-wrap">
            {["GDPR Compliant", "Data Processor Agreement", "Privacy by Design"].map((badge) => (
              <span key={badge} className="border border-neutral-200 rounded-full px-3 py-1.5 text-[12px] font-semibold text-neutral-600 bg-[#faf9f6]">{badge}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Disclosure */}
      <section className="px-5 sm:px-8 md:px-10 py-16 border-t border-neutral-200/60">
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold text-gray-950 mb-2">Report a vulnerability</h2>
          <p className="text-[15px] text-gray-500 mb-4 leading-relaxed">Found something that doesn't look right? Please reach out to our security team directly. We respond to all responsible disclosures within 48 hours.</p>
          <a href="mailto:security@credlyr.com" className="text-[15px] font-semibold text-gray-950 hover:text-gray-500 transition-colors">security@credlyr.com</a>
        </div>
      </section>
    </div>
  );
}
