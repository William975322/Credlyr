import { motion } from "framer-motion";
import { ArrowRight, Newspaper, Download, ShieldCheck, Cpu, Paintbrush, Shield, BookOpen, Layers } from "lucide-react";
import { SiteFooter } from "../App";

export default function About() {
  const newsItems = [
    {
      category: "Product Strategy",
      title: "Designing for the AI Awareness Cycle",
      desc: "Why websites have returned as the ultimate trust-and-conversion hub in an era of unlimited, AI-generated generic content.",
      icon: BookOpen,
      iconBg: "from-amber-500/10 to-orange-500/10 text-amber-700",
      graphic: (
        <svg viewBox="0 0 100 60" className="w-20 h-12 text-neutral-400">
          <circle cx="50" cy="30" r="16" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="50" cy="30" r="8" className="fill-neutral-900/10 stroke-neutral-900" strokeWidth="1.5" />
          <path d="M50,14 L50,6 M50,46 L50,54 M20,30 L12,30 M80,30 L88,30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      category: "Engineering",
      title: "Modern Performance Architectures",
      desc: "How static page generation deployed directly to AWS CloudFront CDN achieves sub-second load speeds without database query delays.",
      icon: Cpu,
      iconBg: "from-blue-500/10 to-indigo-500/10 text-blue-700",
      graphic: (
        <svg viewBox="0 0 100 60" className="w-20 h-12 text-neutral-400">
          <rect x="30" y="15" width="40" height="30" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="36" y="21" width="28" height="18" rx="3" className="fill-neutral-900/10 stroke-neutral-900" strokeWidth="1.5" />
          <path d="M50,15 L50,10 M50,45 L50,50 M30,30 L25,30 M70,30 L75,30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      category: "Design & Copy",
      title: "The Psychology of Credibility",
      desc: "Why templates fail to command authority and how bespoke visual design and sharp copy positioning influence B2B buyers in under 3 seconds.",
      icon: Paintbrush,
      iconBg: "from-purple-500/10 to-pink-500/10 text-purple-700",
      graphic: (
        <svg viewBox="0 0 100 60" className="w-20 h-12 text-neutral-400">
          <rect x="25" y="15" width="50" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="25" y1="23" x2="75" y2="23" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="32" cy="19" r="1.5" className="fill-neutral-900" />
          <circle cx="37" cy="19" r="1.5" className="fill-neutral-900" />
          <circle cx="42" cy="19" r="1.5" className="fill-neutral-900" />
          <path d="M40,32 L60,32 M45,38 L55,38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      category: "Security",
      title: "Building Secure Form Pipelines",
      desc: "Eliminating SQL injection risks and database vulnerabilities by completely decoupling lead capture submission layers from public hosts.",
      icon: Shield,
      iconBg: "from-green-500/10 to-emerald-500/10 text-green-700",
      graphic: (
        <svg viewBox="0 0 100 60" className="w-20 h-12 text-neutral-400">
          <path d="M50,15 L70,20 V35 C70,45 50,50 50,50 C50,50 30,45 30,35 V20 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M43,32 L48,37 L57,27" className="stroke-neutral-900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      )
    },
    {
      category: "Design System",
      title: "Credyr Design Framework Release",
      desc: "Introducing our custom lightweight styling framework built for speed, responsiveness, and warm minimalist brand aesthetics.",
      icon: Layers,
      iconBg: "from-teal-500/10 to-cyan-500/10 text-teal-700",
      graphic: (
        <svg viewBox="0 0 100 60" className="w-20 h-12 text-neutral-400">
          <path d="M25,25 L50,15 L75,25 L50,35 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M25,33 L50,43 L75,33" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M25,41 L50,51 L75,41" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      category: "Infrastructure",
      title: "AWS Edge vs. Traditional VPS",
      desc: "A detailed benchmark comparison of serverless edge asset distribution against traditional server clusters during viral traffic spikes.",
      icon: ShieldCheck,
      iconBg: "from-rose-500/10 to-red-500/10 text-rose-700",
      graphic: (
        <svg viewBox="0 0 100 60" className="w-20 h-12 text-neutral-400">
          <circle cx="30" cy="30" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="70" cy="30" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M40,30 L60,30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
          <path d="M47,27 L53,30 L47,33 Z" className="fill-neutral-900" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-gray-950 pt-0 pb-0 px-0 flex flex-col justify-between animate-fade-in">
      
      {/* ─── 1. Hero Banner Section ─── */}
      <section className="relative w-full h-[400px] overflow-hidden p-0 m-0">
        {/* Full-bleed landscape painting */}
        <img
          src="/hero-landscape.png?v=2"
          alt="Landscape background"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          style={{
            objectPosition: "center 58%",
            filter: "sepia(15%) brightness(105%) saturate(120%) hue-rotate(5deg)",
          }}
        />

        {/* Buttery Bottom Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.2) 80%, #ffffff 100%)",
          }}
        />
      </section>

      {/* ─── 2. Editorial Narrative Section ─── */}
      <section className="bg-white pt-16 pb-24 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-3xl mx-auto text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[34px] sm:text-[44px] md:text-[52px] font-normal tracking-tight text-gray-950 mb-12 leading-[1.12]"
          >
            Credibility is one of the internet’s biggest unsolved problems
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="space-y-8 text-[17px] md:text-[18px] text-neutral-600 leading-relaxed font-normal"
          >
            <p>
              In 1993, The New Yorker published an iconic cartoon featuring two
              dogs. One sits in front of a computer, saying to the other: ‘On the
              Internet, nobody knows you're a dog.’ Ever since, little has
              changed. Trust remains hard to measure, tied to legacy templates,
              and resulting in billions lost to bounce rates, friction, and skepticism.
            </p>
            <p>
              Our mission is to build digital presence that commands authority. We
              believe a website is a problem rooted in positioning and engineering,
              not just aesthetics. Our custom website designs, crisp authority-building
              copy, and secure AWS serverless edge infrastructure combine to deliver
              a modern conversion engine—making buying decisions as simple as one click.
            </p>
            <p>
              High-fidelity design and copy are mission-critical, but shouldn’t be
              your core business. That’s why it’s ours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── 3. Our Company Section (Founder & Partner Logos) ─── */}
      <section className="bg-[#fbfaf8] py-24 md:py-32 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto">
          
          {/* Section Header */}
          <div className="text-left mb-16 max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-normal tracking-tight text-gray-950 mb-4">
              Our company
            </h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-normal">
              Credyr brings deep expertise in design, positioning copy, and performance edge architecture to build websites that command authority.
            </p>
          </div>

          {/* Centered Founder Card */}
          <div className="flex justify-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#f5f3ec] border border-[#e6e2da] rounded-[24px] p-8 w-full max-w-xl hover:shadow-sm transition-all duration-300 flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                {/* Photo Placeholder */}
                <div className="w-14 h-14 rounded-xl bg-neutral-200/80 border border-neutral-300 flex items-center justify-center text-neutral-500 font-bold font-mono text-base tracking-wider shadow-sm select-none">
                  WV
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-950 leading-tight">
                    William Vanderplaetse
                  </h3>
                  <p className="text-xs text-neutral-400 font-bold font-mono uppercase tracking-widest mt-0.5">
                    Founder
                  </p>
                </div>
              </div>
              <p className="text-[14px] md:text-[15px] text-neutral-600 leading-relaxed font-normal">
                Former Managing consultant IBM Benelux data, ai & automation practice. Deep background in data engineering, positioning strategy, and technology execution.
              </p>
            </motion.div>
          </div>

          {/* Grayscale Logo Strip */}
          <div className="border-t border-neutral-200/50 pt-16 text-center">
            <p className="text-[11px] text-neutral-400 font-semibold uppercase tracking-widest mb-10">
              By people who previously built
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-45 grayscale select-none pointer-events-none">
              <span className="text-xl font-black tracking-tighter text-neutral-700 italic">
                Klarna.
              </span>
              <span className="text-xl font-semibold tracking-tight text-neutral-800 font-sans">
                Uber
              </span>
              <div className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-neutral-800 fill-current">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.63.73-1.18 1.87-1.03 2.98 1.11.09 2.24-.59 2.96-1.41z" />
                </svg>
                <span className="text-[15px] font-semibold text-neutral-800 font-sans">
                  Apple
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg viewBox="0 0 32 32" className="w-5 h-5 text-neutral-800 stroke-current fill-none" strokeWidth="2.5">
                  <path d="M16 1 C16 1, 24 10, 24 18 C24 22, 20 26, 16 26 C12 26, 8 22, 8 18 C8 10, 16 1, 16 1 Z M16 13 C14.34 13, 13 14.34, 13 16 C13 17.66, 14.34 19, 16 19 C17.66 19, 19 17.66, 19 16 C19 14.34, 17.66 13, 16 13 Z" />
                </svg>
                <span className="text-[15px] font-bold text-neutral-800 font-sans tracking-tight">
                  airbnb
                </span>
              </div>
              <span className="text-xl font-bold tracking-tight text-neutral-800">
                mollie
              </span>
              <span className="text-sm font-bold tracking-widest text-neutral-800 uppercase">
                TRADE REPUBLIC
              </span>
              <div className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-neutral-800 fill-current">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.982-.336.075-.668-.135-.744-.47-.077-.336.135-.668.47-.743 3.856-.88 7.15-.506 9.822 1.13.295.178.387.563.205.858zm1.225-2.72c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.082-1.182-.413.125-.847-.107-.972-.52-.125-.413.107-.847.52-.972 3.673-1.114 8.243-.57 11.35 1.343.366.226.486.706.258 1.07zm.105-2.836C14.492 8.812 8.788 8.623 5.466 9.63c-.51.155-1.04-.135-1.196-.646-.156-.51.135-1.04.646-1.196 3.81-1.157 10.116-.94 14.07 1.407.46.273.61.87.338 1.33-.274.46-.87.61-1.33.338z" />
                </svg>
                <span className="text-[15px] font-bold text-neutral-800 font-sans tracking-tight">
                  Spotify
                </span>
              </div>
              <span className="text-xl font-bold tracking-tight text-neutral-800 font-sans">
                stripe
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 4. News & Insights Section ─── */}
      <section className="bg-white py-24 md:py-32 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center text-neutral-800">
              <Newspaper size={18} strokeWidth={1.8} />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-normal tracking-tight text-gray-950">
              News & insights
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Graphic card header */}
                    <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-tr from-[#edeae1] via-[#f5f3ec] to-[#fbfaf8] border border-neutral-200/60 relative mb-5 flex items-center justify-center group-hover:border-neutral-350 transition-colors duration-300">
                      {item.graphic}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className={`p-1.5 rounded-lg bg-gradient-to-br ${item.iconBg}`}>
                        <IconComponent size={13} strokeWidth={2} />
                      </div>
                      <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-neutral-400">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-950 mb-2 leading-snug tracking-tight group-hover:text-neutral-700 transition-colors duration-200">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-neutral-500 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── 5. Press Section ─── */}
      <section className="bg-[#fbfaf8] py-24 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-neutral-200/60 rounded-3xl p-10 md:p-14 text-center shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-950 mb-4 tracking-tight">
              Press resources
            </h2>
            <p className="text-sm md:text-base text-neutral-500 leading-relaxed font-normal mb-8 max-w-lg mx-auto">
              Download our official media press kit containing high-resolution brand assets, logo variants, and layout screenshots.
            </p>
            <button className="inline-flex items-center gap-2 bg-black hover:bg-neutral-800 text-white font-semibold text-[14px] px-6 py-3.5 rounded-full transition-all active:scale-[0.98] shadow-md shadow-black/5">
              <span>Download media resources</span>
              <Download size={15} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </section>

      {/* Shared Dark Site Footer */}
      <SiteFooter />
    </div>
  );
}
