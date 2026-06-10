import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const REVIEWS = [
  { name: "James R.", role: "Dental Practice Owner", text: "Credyr built our new site in under 2 weeks and our appointment bookings went up 40% in the first month. It just works.", rating: 5 },
  { name: "Sarah M.", role: "Spa Director", text: "The design is exactly what we wanted — beautiful, premium, and now our gift voucher sales are up massively over Christmas.", rating: 5 },
  { name: "Tom H.", role: "Estate Agent", text: "I wanted a personal brand separate from my franchise. Credyr delivered something I'm genuinely proud to send clients to.", rating: 5 },
  { name: "Anna K.", role: "Clinic Manager", text: "Professional, fast, and they understood our industry without us having to explain everything twice. Highly recommend.", rating: 5 },
  { name: "Chris B.", role: "Plumbing Business Owner", text: "Started ranking on Google within 6 weeks. My phone hasn't stopped since. Worth every penny.", rating: 5 },
  { name: "Emma L.", role: "Wellness Brand Founder", text: "Not just a website — a full brand identity. Credyr gave us a look that finally matches the quality of what we offer.", rating: 5 },
];

export default function ReviewsPage() {
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
          Customers
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-950 leading-[1.05] mb-6 max-w-2xl">
          What our clients say.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-xl font-normal">
          Real results from real businesses. Here's what our clients have to say about working with Credyr.
        </motion.p>
      </section>

      {/* Stats */}
      <section className="px-5 sm:px-8 md:px-10 py-10 border-t border-neutral-200/60 bg-white">
        <div className="max-w-5xl grid grid-cols-3 gap-6">
          {[["5.0", "Average rating"], ["100%", "Recommend us"], ["48h", "Average response"]].map(([v, l]) => (
            <div key={l} className="flex flex-col gap-1">
              <p className="text-4xl font-semibold text-gray-950 tracking-tight">{v}</p>
              <p className="text-[13px] text-neutral-400 font-medium">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews grid */}
      <section className="px-5 sm:px-8 md:px-10 py-16 md:py-20 border-t border-neutral-200/60">
        <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.div key={r.name}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-white border border-neutral-200/70 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, s) => (
                  <Star key={s} size={13} fill="currentColor" className="text-gray-800" />
                ))}
              </div>
              <p className="text-[15px] text-gray-700 leading-relaxed">"{r.text}"</p>
              <div className="border-t border-neutral-100 pt-3 mt-auto">
                <p className="text-[14px] font-semibold text-gray-900">{r.name}</p>
                <p className="text-[12px] text-neutral-400 font-medium">{r.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-10 py-16 md:py-24 border-t border-neutral-200/60 bg-gray-950">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">Join them.</h2>
          <p className="text-neutral-400 text-lg mb-8">Start a conversation about what we can build for you.</p>
          <Link href="/get-started"><a className="inline-flex items-center gap-2 bg-white text-gray-950 rounded-full px-6 py-3 text-[14px] font-semibold hover:bg-neutral-100 transition-colors">
            Schedule a call <ArrowRight size={14} strokeWidth={2} />
          </a></Link>
        </div>
      </section>
    </div>
  );
}
