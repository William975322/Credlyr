import { motion } from "framer-motion";
import { Link } from "wouter";
import { SiteFooter } from "../App";

interface ResourceCard {
  title: string;
  category: string;
  readTime: string;
  type: "gradient" | "image";
  iconType?: "star" | "circles" | "pyramid";
  imagePath?: string;
}

const RESOURCES_CARDS: ResourceCard[] = [
  {
    title: "How AI answer engines choose which businesses to cite",
    category: "Insights",
    readTime: "7 min read",
    type: "gradient",
    iconType: "star",
  },
  {
    title: "The landing-page economy: one page per offer, not one homepage",
    category: "Insights",
    readTime: "5 min read",
    type: "gradient",
    iconType: "star",
  },
  {
    title: "Why generic templates quietly kill conversion",
    category: "Insights",
    readTime: "6 min read",
    type: "gradient",
    iconType: "pyramid",
  },
  {
    title: "Speed is trust: why slow sites get filtered out instantly",
    category: "Insights",
    readTime: "5 min read",
    type: "gradient",
    iconType: "star",
  },
  {
    title: "Credyr Trust Systems: proof that removes buyer hesitation",
    category: "Product",
    readTime: "4 min read",
    type: "gradient",
    iconType: "circles",
  },
  {
    title: "Local SEO for service businesses: a practical guide",
    category: "Guides",
    readTime: "8 min read",
    type: "gradient",
    iconType: "pyramid",
  },
  {
    title: "Booking flows that convert: from landing to confirmed slot in under a minute",
    category: "Product",
    readTime: "5 min read",
    type: "gradient",
    iconType: "circles",
  },
  {
    title: "From enquiry to booked call: CRM automation that follows up for you",
    category: "Product",
    readTime: "6 min read",
    type: "gradient",
    iconType: "star",
  },
  {
    title: "Structuring your site for humans and answer engines alike",
    category: "Guides",
    readTime: "7 min read",
    type: "gradient",
    iconType: "star",
  },
  {
    title: "Email automation that nurtures leads without the spam folder",
    category: "Guides",
    readTime: "6 min read",
    type: "gradient",
    iconType: "pyramid",
  },
];

function CredyrGradientCard({
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
                <CredyrGradientCard className="w-full aspect-[4/3] lg:aspect-[1.4] shadow-md">
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
                </CredyrGradientCard>
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
                  Credibility in an AI
                  <br />
                  world: When the first
                  <br />
                  visitor is a model
                </h1>
              </a>
            </Link>

            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-normal max-w-[540px]">
              Buyers ask AI first and decide in one click. This article explains
              the AI awareness cycle, why answer engines now judge your site
              before humans do, and what conversion infrastructure looks like.
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
                  <CredyrGradientCard>
                    <CardIllustration iconType={card.iconType} />
                  </CredyrGradientCard>
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
