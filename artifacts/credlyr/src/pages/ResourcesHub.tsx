import { motion } from "framer-motion";
import { Link } from "wouter";
import { SiteFooter } from "../App";

interface ResourceCard {
  title: string;
  category: string;
  readTime: string;
  type: "gradient" | "image";
  iconType?: "star" | "circles" | "mckinsey" | "pyramid" | "plaid";
  imagePath?: string;
}

const RESOURCES_CARDS: ResourceCard[] = [
  {
    title: "AI-native KYB platforms",
    category: "Insights",
    readTime: "7 min Insights",
    type: "gradient",
    iconType: "star",
  },
  {
    title: "How to reduce false positives in KYB",
    category: "Insights",
    readTime: "8 min Insights",
    type: "gradient",
    iconType: "star",
  },
  {
    title: "What is Know Your Business (KYB)? A guide to KYB verification",
    category: "Insights",
    readTime: "5 min Insights",
    type: "gradient",
    iconType: "star",
  },
  {
    title: "Compliance is a conversion problem in KYB onboarding",
    category: "Insights",
    readTime: "5 min Insights",
    type: "gradient",
    iconType: "star",
  },
  {
    title: "Building an Identity system of record in times of AI",
    category: "Product",
    readTime: "7 min Product",
    type: "gradient",
    iconType: "circles",
  },
  {
    title: "McKinsey gets it: Why AI will transform financial crime fighting",
    category: "Insights",
    readTime: "5 min Insights",
    type: "gradient",
    iconType: "mckinsey",
  },
  {
    title: "Credlyr Conversations with Stripe COO Claire Hughes Johnson",
    category: "Conversations",
    readTime: "19 min Conversations",
    type: "image",
    imagePath: "/claire-hughes-johnson.png",
  },
  {
    title: "Credlyr Conversations with Adyen founder Pieter van der Does",
    category: "Conversations",
    readTime: "16 min Conversations",
    type: "image",
    imagePath: "/pieter-van-der-does.png",
  },
  {
    title: "Credlyr Onboard: A revenue-driving onboarding solution",
    category: "Product",
    readTime: "4 min Product",
    type: "gradient",
    iconType: "star",
  },
  {
    title: "Compliance, conversion, and growth: A guide for leaders",
    category: "Insights",
    readTime: "6 min Insights",
    type: "gradient",
    iconType: "pyramid",
  },
  {
    title: "Credlyr + Plaid: Seamless bank authentication",
    category: "Product",
    readTime: "3 min Product",
    type: "gradient",
    iconType: "plaid",
  },
];

function DunaGradientCard({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-tr from-[#eae6c8] via-[#7da3a6] to-[#4b707c] flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 group ${className}`}
    >
      {/* SVG Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Hover Sheen */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
      {/* Content wrapper */}
      <div className="relative z-10 flex items-center justify-center w-full h-full p-6 select-none">
        {children}
      </div>
    </div>
  );
}

function CardIllustration({ iconType }: { iconType?: string }) {
  switch (iconType) {
    case "star":
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-16 h-16 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
        >
          <line x1="50" y1="18" x2="50" y2="82" />
          <line x1="18" y1="50" x2="82" y2="50" />
          <line x1="27.3" y1="27.3" x2="72.7" y2="72.7" />
          <line x1="27.3" y1="72.7" x2="72.7" y2="27.3" />
        </svg>
      );
    case "circles":
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-20 h-20 text-white/90"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <circle cx="50" cy="50" r="9" />
          <circle cx="50" cy="50" r="17" />
          <circle cx="50" cy="50" r="25" />
          <circle cx="50" cy="50" r="33" />
          <circle cx="50" cy="50" r="41" />
        </svg>
      );
    case "mckinsey":
      return (
        <span className="text-white text-2xl md:text-3xl font-serif tracking-normal text-center leading-tight select-none">
          McKinsey
          <br />& Company
        </span>
      );
    case "pyramid":
      return (
        <svg
          viewBox="0 0 100 100"
          className="w-20 h-20 text-white/95"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="50,15 15,80 85,80" />
          <polygon points="50,26 21,80 79,80" />
          <polygon points="50,37 27,80 73,80" />
          <polygon points="50,48 33,80 67,80" />
          <polygon points="50,59 39,80 61,80" />
          <polygon points="50,70 45,80 55,80" />
          <line x1="50" y1="15" x2="50" y2="80" />
        </svg>
      );
    case "plaid":
      return (
        <div className="flex items-center gap-3">
          <svg
            viewBox="0 0 100 100"
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M30 20 h40 M20 40 h60 M20 60 h60 M30 80 h40 M30 20 v60 M50 20 v60 M70 20 v60" />
          </svg>
          <span className="text-white text-2xl font-black tracking-wider font-sans select-none">
            PLAID
          </span>
        </div>
      );
    default:
      return null;
  }
}

export default function ResourcesHub() {
  return (
    <div className="min-h-screen bg-[#fbfaf7] text-gray-950 pt-28 pb-0 px-0 flex flex-col justify-between">
      {/* Content wrapper */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 pb-20 w-full flex-1">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center border-b border-gray-200/50 pb-16">
          {/* Hero Image Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <Link href="/resources-hub/identity-in-an-ai-world">
              <a className="block w-full cursor-pointer transition-transform duration-350 hover:scale-[1.01]">
                <DunaGradientCard className="w-full aspect-[4/3] lg:aspect-[1.4] shadow-md">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-24 h-24 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  >
                    <line x1="50" y1="18" x2="50" y2="82" />
                    <line x1="18" y1="50" x2="82" y2="50" />
                    <line x1="27.3" y1="27.3" x2="72.7" y2="72.7" />
                    <line x1="27.3" y1="72.7" x2="72.7" y2="27.3" />
                  </svg>
                </DunaGradientCard>
              </a>
            </Link>
          </motion.div>

          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium tracking-wide">
              <span>Insights</span>
              <span>Jun 4, 2026</span>
            </div>

            <Link href="/resources-hub/identity-in-an-ai-world">
              <a className="block text-left cursor-pointer group">
                <h1 className="text-4xl md:text-5xl lg:text-[54px] font-normal tracking-tight text-gray-950 mt-4 mb-6 leading-[1.08] group-hover:text-neutral-800 transition-colors">
                  Identity in an AI world:
                  <br />
                  When the attacker is a
                  <br />
                  model
                </h1>
              </a>
            </Link>

            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-normal max-w-[540px]">
              Only 2% of financial crime is detected today. This article
              explains why AI-based attackers have broken rules-based onboarding
              and what AI-native compliance systems do differently.
            </p>
          </motion.div>
        </section>

        {/* Card Grid Section */}
        <section className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14">
            {RESOURCES_CARDS.map((card, i) => (
              <motion.div
                key={`${card.title}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                  delay: (i % 3) * 0.08,
                }}
                className="flex flex-col group/card cursor-pointer"
              >
                {/* Visual Area */}
                {card.type === "gradient" ? (
                  <DunaGradientCard>
                    <CardIllustration iconType={card.iconType} />
                  </DunaGradientCard>
                ) : (
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-md bg-stone-200 transition-all duration-300">
                    <img
                      src={card.imagePath}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover/card:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Metadata */}
                <h3 className="text-xl md:text-2xl font-normal text-gray-950 mt-5 mb-2.5 leading-snug group-hover/card:text-neutral-800 transition-colors">
                  {card.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium tracking-wide">
                  <span>{card.category}</span>
                  <span>—</span>
                  <span>{card.readTime}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Dark Shared Site Footer */}
      <SiteFooter />
    </div>
  );
}
