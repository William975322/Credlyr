import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { SiteFooter } from "../App";

export default function About() {
  return (
    <div className="min-h-screen bg-[#fbfaf7] text-gray-950 pt-0 pb-0 px-0 flex flex-col justify-between">
      {/* ─── 1. Hero Section ─── */}
      <section
        data-testid="about-hero"
        className="relative w-full h-[100svh] min-h-[660px] md:min-h-[760px] overflow-hidden p-0 m-0"
      >
        {/* Full-bleed landscape painting */}
        <img
          src="/hero-landscape.png?v=2"
          alt=""
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
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.08) 66%, rgba(255,255,255,0.24) 78%, rgba(255,255,255,0.52) 90%, rgba(255,255,255,0.9) 100%)",
          }}
        />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-[clamp(52px,9vh,96px)] z-10 text-center px-5 sm:px-6">
          {/* Announcement pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="px-4 py-1.5 rounded-full bg-gray-950/95 text-white text-xs font-medium tracking-normal mb-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] cursor-pointer hover:bg-black transition-colors"
          >
            Credlyr raises $35mn Series A <span className="ml-1">➔</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="max-w-4xl text-balance text-[clamp(44px,7.5vw,80px)] leading-[1.02] tracking-normal font-normal text-gray-950"
          >
            Defining the future of
            <br />
            business onboarding
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
            className="mt-5 md:mt-6 max-w-[680px] text-balance text-[clamp(16px,1.9vw,20px)] leading-[1.45] text-neutral-700 font-normal mb-8"
          >
            Meet the AI-native business identity platform that accelerates
            business onboarding, automates manual work, and grows revenue.
          </motion.p>
        </div>
      </section>

      {/* ─── 2. Identity Problem Section ─── */}
      <section className="bg-white py-24 md:py-32 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-3xl mx-auto text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-[54px] font-normal tracking-tight text-gray-950 mb-12 leading-[1.1]"
          >
            Identity is one of the internet’s biggest unsolved problems
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="space-y-8 text-[17px] md:text-[18px] text-neutral-600 leading-relaxed font-normal"
          >
            <p>
              In 1993, The New Yorker published an iconic cartoon featuring two
              dogs. One sits in front of a computer, saying to the other: ‘On the
              Internet, nobody knows you're a dog.’ Ever since, little has
              changed. Identity remains tied to legacy systems resulting in
              billions lost to fraud, friction and fines.
            </p>
            <p>
              Our mission is to redefine identity for the global economy. We
              believe business identity is a problem rooted in code, not
              compliance. Our first product is a platform for compliant business
              onboarding and lifecycle management. Over time, this will evolve
              into a network for shareable identity – making onboarding as
              simple as one click.
            </p>
            <p>
              Identity infrastructure is mission-critical, but shouldn’t be your
              core business. That’s why it’s ours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── 3. Our Company Section (Founders & Logos) ─── */}
      <section className="bg-[#fbfaf7] py-24 md:py-32 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-left mb-16 max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-normal tracking-tight text-gray-950 mb-4">
              Our company
            </h2>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-normal">
              Credlyr brings decades of expertise in scaling identity and payments
              infrastructure at billion-dollar companies.
            </p>
          </div>

          {/* Founders Grid */}
          <div className="flex justify-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#f5f3ec] border border-[#e6e2da] rounded-2xl p-8 w-full max-w-xl hover:shadow-sm transition-all duration-300"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-950">
                  William Vanderplaetse
                </h3>
                <p className="text-sm text-neutral-400 font-medium mt-0.5">
                  Founder
                </p>
              </div>
              <p className="text-sm md:text-[15px] text-neutral-600 leading-relaxed">
                Former Managing consultant IBM Benelux data, ai & automation practice.
              </p>
            </motion.div>
          </div>

          {/* Gray Logo Strip */}
          <div className="border-t border-neutral-200/50 pt-16 text-center">
            <p className="text-[12px] text-neutral-400 font-semibold uppercase tracking-widest mb-10">
              By people who previously built
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-45 grayscale select-none pointer-events-none">
              {/* Klarna */}
              <span className="text-xl font-black tracking-tighter text-neutral-700 italic">
                Klarna.
              </span>
              {/* Uber */}
              <span className="text-xl font-semibold tracking-tight text-neutral-800 font-sans">
                Uber
              </span>
              {/* Apple */}
              <div className="flex items-center gap-1.5">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-neutral-800 fill-current"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.63.73-1.18 1.87-1.03 2.98 1.11.09 2.24-.59 2.96-1.41z" />
                </svg>
                <span className="text-[15px] font-semibold text-neutral-800 font-sans">
                  Apple
                </span>
              </div>
              {/* Airbnb */}
              <div className="flex items-center gap-1.5">
                <svg
                  viewBox="0 0 32 32"
                  className="w-5 h-5 text-neutral-800 stroke-current fill-none"
                  strokeWidth="2.5"
                >
                  <path d="M16 1 C16 1, 24 10, 24 18 C24 22, 20 26, 16 26 C12 26, 8 22, 8 18 C8 10, 16 1, 16 1 Z M16 13 C14.34 13, 13 14.34, 13 16 C13 17.66, 14.34 19, 16 19 C17.66 19, 19 17.66, 19 16 C19 14.34, 17.66 13, 16 13 Z" />
                </svg>
                <span className="text-[15px] font-bold text-neutral-800 font-sans tracking-tight">
                  airbnb
                </span>
              </div>
              {/* Mollie */}
              <span className="text-xl font-bold tracking-tight text-neutral-800">
                mollie
              </span>
              {/* Trade Republic */}
              <span className="text-sm font-bold tracking-widest text-neutral-800 uppercase">
                TRADE REPUBLIC
              </span>
              {/* Spotify */}
              <div className="flex items-center gap-1.5">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-neutral-800 fill-current"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.982-.336.075-.668-.135-.744-.47-.077-.336.135-.668.47-.743 3.856-.88 7.15-.506 9.822 1.13.295.178.387.563.205.858zm1.225-2.72c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.082-1.182-.413.125-.847-.107-.972-.52-.125-.413.107-.847.52-.972 3.673-1.114 8.243-.57 11.35 1.343.366.226.486.706.258 1.07zm.105-2.836C14.492 8.812 8.788 8.623 5.466 9.63c-.51.155-1.04-.135-1.196-.646-.156-.51.135-1.04.646-1.196 3.81-1.157 10.116-.94 14.07 1.407.46.273.61.87.338 1.33-.274.46-.87.61-1.33.338z" />
                </svg>
                <span className="text-[15px] font-bold text-neutral-800 font-sans tracking-tight">
                  Spotify
                </span>
              </div>
              {/* Stripe */}
              <span className="text-xl font-bold tracking-tight text-neutral-800 font-sans">
                stripe
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. About Section ─── */}
      <section className="bg-white py-24 md:py-32 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-3xl mx-auto text-left">
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-normal tracking-tight text-gray-950 mb-10">
            About Credlyr
          </h2>

          <div className="space-y-8 text-[16px] md:text-[17px] text-neutral-600 leading-relaxed font-normal">
            <p className="font-semibold text-gray-950 text-[18px] md:text-[19px] leading-relaxed">
              Credlyr's mission is to build global trust infrastructure by providing
              a digital passport for every business. Over time, this will evolve
              into a network for shareable identity and one-click onboarding.
            </p>
            <p>
              Credlyr's business identity platform currently serves large banks,
              fintechs, platforms and financial institutions. Customers include
              large enterprises such as Plaid, CCV (Fiserv), Moss, Bol and SVEA
              bank — with companies reporting 10.6x faster onboarding and 4.8x
              productivity gains.
            </p>
            <p>
              Credlyr is backed by Index Ventures and CapitalG, as well as an
              exceptional group of tech executives from Stripe, Adyen, Anthropic,
              and Goldman Sachs – including Adyen founder Pieter van der Does,
              Stripe COO Claire Hughes Johnson and Snowflake Chairman Frank
              Slootman.
            </p>
          </div>
        </div>
      </section>

      {/* Shared Dark Site Footer */}
      <SiteFooter />
    </div>
  );
}
