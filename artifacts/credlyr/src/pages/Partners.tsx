import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, HandshakeIcon } from "lucide-react";

const TIERS = [
  { name: "Referral Partner", desc: "Refer clients to Credlyr and earn a commission on every project that completes. No work required on your end.", cta: "Join as referral" },
  { name: "Agency Partner", desc: "White-label our design and development capabilities under your brand. Scale your offering without scaling your team.", cta: "Explore agency partnership" },
  { name: "Technology Partner", desc: "Integrate your product or platform with Credlyr's client projects. Reach new customers through our network.", cta: "Become a tech partner" },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="px-5 sm:px-8 md:px-10 pt-28 pb-0">
        <Link href="/"><a className="inline-flex items-center gap-2 text-[13px] font-medium text-neutral-500 hover:text-gray-950 transition-colors">
          <ArrowLeft size={14} strokeWidth={1.8} /> Back to home
        </a></Link>
      </div>

      <section className="px-5 sm:px-8 md:px-10 pt-12 pb-16 md:pb-24 max-w-5xl">
        <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-block border border-gray-200 rounded-full px-3 py-1 text-[12px] text-gray-600 font-medium mb-6">
          Customers
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-950 leading-[1.05] mb-6 max-w-2xl">
          Build with us. Grow together.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-xl font-normal mb-10">
          Whether you refer clients, resell our services, or integrate your product with our work — the Credlyr partner programme gives you the tools to grow alongside us.
        </motion.p>
      </section>

      <section className="px-5 sm:px-8 md:px-10 py-16 border-t border-neutral-200/60">
        <div className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white border border-neutral-200/70 rounded-2xl p-7 shadow-sm flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#faf9f6] border border-neutral-200/60 flex items-center justify-center">
                <HandshakeIcon size={18} strokeWidth={1.6} className="text-gray-600" />
              </div>
              <h3 className="text-[19px] font-semibold text-gray-950">{t.name}</h3>
              <p className="text-[14px] text-gray-500 leading-relaxed flex-1">{t.desc}</p>
              <Link href="/get-started"><a className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gray-900 hover:text-gray-500 transition-colors mt-2">
                {t.cta} <ArrowRight size={13} strokeWidth={2} />
              </a></Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-10 py-16 md:py-24 border-t border-neutral-200/60 bg-gray-950">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">Interested in partnering?</h2>
          <p className="text-neutral-400 text-lg mb-8">Tell us about your situation and we'll find the right fit.</p>
          <Link href="/get-started"><a className="inline-flex items-center gap-2 bg-white text-gray-950 rounded-full px-6 py-3 text-[14px] font-semibold hover:bg-neutral-100 transition-colors">
            Schedule a call <ArrowRight size={14} strokeWidth={2} />
          </a></Link>
        </div>
      </section>
    </div>
  );
}
