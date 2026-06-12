import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { SiteFooter } from "../App";

interface TOCSection {
  id: string;
  label: string;
}

const SECTIONS: TOCSection[] = [
  { id: "takeaways", label: "Key takeaways" },
  {
    id: "awareness-cycle",
    label: "What is the AI awareness cycle?",
  },
  {
    id: "first-visitor-model",
    label: "Why is your next visitor as likely to be a model as a person?",
  },
  {
    id: "filtered-in-seconds",
    label: "Why do buyers filter you out in seconds?",
  },
  {
    id: "conversion-infrastructure",
    label: "What does conversion infrastructure actually look like?",
  },
  {
    id: "three-decisions",
    label:
      "Three decisions that will define the next five years for service businesses",
  },
  { id: "faq", label: "Frequently asked questions" },
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

function CardIllustration() {
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
}

const CONTINUE_READING_ARTICLES = [
  {
    title: "How AI answer engines choose which businesses to cite",
    href: "/resources-hub",
    readTime: "7 min read",
  },
  {
    title: "Credibility in an AI world: When the first visitor is a model",
    href: "/resources-hub/identity-in-an-ai-world",
    readTime: "6 min read",
  },
  {
    title: "The landing-page economy: one page per offer, not one homepage",
    href: "/resources-hub",
    readTime: "5 min read",
  },
];

export default function ArticleDetail() {
  const [activeSection, setActiveSection] = useState("takeaways");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220; // offset for nav header

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 120, // offset for nav header
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-gray-950 pt-28 pb-0 px-0 flex flex-col justify-between">
      {/* Inner Container */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 pb-20 w-full flex-1">
        {/* Header Block */}
        <section className="text-center pb-12">
          <span className="text-xs text-neutral-500 font-medium tracking-wide">
            Jun 4, 2026
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-normal tracking-tight text-gray-950 mt-4 mb-14 leading-[1.08] max-w-4xl mx-auto">
            Credibility in an AI world: When
            <br />
            the first visitor is a model
          </h1>

          {/* Large Hero Image */}
          <div className="relative w-full aspect-[2.1/1] rounded-3xl overflow-hidden bg-gradient-to-tr from-[#eae6c8] via-[#7da3a6] to-[#4b707c] flex items-center justify-center shadow-md select-none">
            {/* SVG Grain Overlay */}
            <div
              className="absolute inset-0 opacity-[0.14] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />
            {/* Center Content Star */}
            <div className="relative z-10">
              <svg
                viewBox="0 0 100 100"
                className="w-28 h-28 md:w-36 md:h-36 text-white"
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
            </div>
          </div>
        </section>

        {/* Content Layout Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 mt-16 items-start">
          {/* Left Column: TOC Sidebar */}
          <aside className="hidden lg:block sticky top-28">
            <h4 className="text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-5">
              On this page
            </h4>
            <nav className="flex flex-col gap-1.5 border-l border-neutral-200">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-left pl-4 py-1.5 text-[13.5px] leading-snug border-l -ml-[1px] transition-all cursor-pointer font-normal ${
                    activeSection === section.id
                      ? "text-gray-950 border-gray-900 font-semibold"
                      : "text-neutral-400 border-transparent hover:text-neutral-700"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Right Column: Article Long-form Content */}
          <article className="prose max-w-none text-neutral-800 leading-relaxed font-normal">
            {/* takeaways */}
            <section id="takeaways" className="scroll-mt-32 pb-12 border-b border-neutral-200/60">
              <h2 className="text-3xl font-normal text-gray-950 mb-6">
                Key takeaways
              </h2>
              <ul className="list-disc pl-5 space-y-4 text-[16px] text-neutral-600">
                <li>
                  Buyers no longer browse. They ask AI, get a shortlist, and
                  click one link. Your website is the only thing between "paid"
                  and the back button.
                </li>
                <li>
                  Your next visitor is as likely to be an answer-engine crawler
                  as a person. Sites structured for clarity, proof, and intent
                  get cited; everyone else is invisible.
                </li>
                <li>
                  Trust is decided in seconds, before a word is read. Slow,
                  generic, or confusing sites get filtered out instantly - by
                  humans and by models.
                </li>
                <li>
                  The demand isn't "AI websites." It's conversion
                  infrastructure: websites, landing pages, booking, and CRM
                  automation built for speed of decision, trust, and action.
                </li>
                <li>
                  The winner isn't whoever has a website. It's whoever has a
                  site that sells, proves, and positions.
                </li>
              </ul>
            </section>

            {/* awareness-cycle */}
            <section
              id="awareness-cycle"
              className="scroll-mt-32 py-12 border-b border-neutral-200/60"
            >
              <h2 className="text-3xl font-normal text-gray-950 mb-6">
                What is the AI awareness cycle?
              </h2>
              <div className="space-y-6 text-[16px] text-neutral-600">
                <p>
                  When was the last time you browsed the internet without
                  asking AI first? Over the past two years, AI quietly became
                  your search engine, your encyclopaedia, your shopping
                  assistant, and your personal researcher. And because it is
                  that convenient, it became something more consequential: the
                  decision maker.
                </p>
                <p>
                  The buying journey has compressed accordingly. The old
                  pattern was fifteen minutes of opening tabs, comparing
                  options, and second-guessing. The new pattern is short: ask
                  AI, get the answer, click one link - credit card half out.
                  The visitor who lands on your site has already done their
                  research somewhere else. They are not browsing. They are
                  deciding.
                </p>
                <p>
                  That shift is what we call the AI awareness cycle, and it has
                  an unexpected consequence: the website - written off for
                  years as a digital brochure - is back at the centre of the
                  sale. Not because websites are new, but because the buying
                  environment changed around them. When the entire journey
                  collapses into one click, the page that click lands on
                  carries the full weight of the transaction. It is now the
                  trust-and-conversion hub of the business.
                </p>
              </div>
            </section>

            {/* first-visitor-model */}
            <section
              id="first-visitor-model"
              className="scroll-mt-32 py-12 border-b border-neutral-200/60"
            >
              <h2 className="text-3xl font-normal text-gray-950 mb-6">
                Why is your next visitor as likely to be a model as a person?
              </h2>
              <div className="space-y-6 text-[16px] text-neutral-600">
                <p>
                  In 1993, The New Yorker published the cartoon that defined
                  the early internet: one dog at a keyboard telling another,
                  "On the Internet, nobody knows you're a dog." For thirty
                  years that was the web's credibility problem - anyone could
                  claim anything, and the reader had no way to check.
                </p>
                <p>
                  The situation has now inverted. Before a human ever reaches
                  your site, an AI model probably has. Answer engines crawl,
                  read, and evaluate your pages to decide whether you are worth
                  recommending. They check whether your claims are structured
                  and consistent, whether your services are clearly described,
                  whether your proof is verifiable, and whether your business
                  details match the public record. The reader knows more than
                  ever - because the reader is a model.
                </p>
                <p>
                  This changes what a website has to do. It is no longer
                  enough to look good to a person scrolling on a phone. The
                  site has to be legible to machines: clean semantic
                  structure, schema markup that states plainly who you are and
                  what you do, question-shaped headings with direct answers
                  underneath, and credentials a crawler can verify. Sites
                  built this way get cited and recommended. Sites that bury
                  their offer in vague slogans and decorative markup simply
                  never enter the conversation.
                </p>

                {/* Embedded Cartoon */}
                <div className="flex flex-col items-center my-10 select-none">
                  <div className="max-w-xl border border-neutral-200 bg-white p-6 rounded-2xl shadow-sm">
                    <img
                      src="/nobody-knows-youre-a-dog.png"
                      alt="New Yorker Dog Cartoon: On the Internet, nobody knows you're a dog"
                      className="w-full h-auto object-contain"
                    />
                    <p className="text-center font-serif text-[15px] italic text-neutral-700 mt-4">
                      "On the Internet, nobody knows you're a dog."
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* filtered-in-seconds */}
            <section
              id="filtered-in-seconds"
              className="scroll-mt-32 py-12 border-b border-neutral-200/60"
            >
              <h2 className="text-3xl font-normal text-gray-950 mb-6">
                Why do buyers filter you out in seconds?
              </h2>
              <div className="space-y-6 text-[16px] text-neutral-600">
                <p>
                  AI search compresses attention. When an answer engine hands a
                  buyer a shortlist of two or three options, the casual,
                  exploratory click disappears. What's left is a smaller number
                  of decision-ready visitors - people who arrive with intent
                  and a credit card, and who will commit to whichever option
                  feels safest, fastest.
                </p>
                <p>
                  Those visitors judge before they read. A page that takes
                  seconds too long to load, a template they have seen on five
                  competitor sites, a wall of vague copy that never states the
                  offer, a booking path hidden behind a contact form - each of
                  these is an instant filter. The visitor doesn't complain or
                  give feedback. They press back, return to the AI, and take
                  the next recommendation. The sale happens; it just happens
                  somewhere else.
                </p>
                <p>
                  This is also why trust requirements keep rising. In an
                  environment where AI can generate unlimited generic content
                  and passable template websites in minutes, generic itself has
                  become a warning sign. Distinctive design, specific claims,
                  verifiable proof, and named, accountable people are what
                  separate a real business from noise - to human visitors and
                  answer engines alike. Credibility is the new competition: the
                  winner isn't whoever has a website, it's whoever has a site
                  that sells, proves, and positions.
                </p>
              </div>
            </section>

            {/* conversion-infrastructure */}
            <section
              id="conversion-infrastructure"
              className="scroll-mt-32 py-12 border-b border-neutral-200/60"
            >
              <h2 className="text-3xl font-normal text-gray-950 mb-6">
                What does conversion infrastructure actually look like?
              </h2>
              <div className="space-y-6 text-[16px] text-neutral-600">
                <p>
                  The demand this creates isn't for "AI websites" as a
                  category. It is for conversion infrastructure: every layer
                  between a buyer's first impression and a confirmed
                  appointment, engineered for speed of decision. In practice it
                  has four parts.
                </p>

                <p>
                  <strong>Speed.</strong> Pages served as pre-rendered static
                  files from edge servers close to the visitor, so the site
                  loads before doubt sets in. Speed is not a technical vanity
                  metric; it is the first trust signal a visitor experiences,
                  and a ranking input for both search and answer engines.
                </p>

                <p>
                  <strong>Clarity.</strong> One page, one argument. The
                  landing-page economy replaces the single overloaded homepage
                  with a dedicated page per offer, per campaign, per audience -
                  so the dental-implant prospect, the emergency patient, and
                  the price-shopper each land on exactly the argument they
                  need, with nothing else competing for the click.
                </p>

                <p>
                  <strong>Proof.</strong> Trust systems that surface real
                  reviews, credentials, case results, and registrations where
                  the buying decision actually happens - next to the call to
                  action, not on a forgotten "testimonials" page. Proof is
                  what converts a hesitant visitor, and it is what answer
                  engines look for when deciding whom to cite.
                </p>

                <p>
                  <strong>Action.</strong> A frictionless path from interest to
                  commitment: calendar booking embedded in the page so a
                  visitor can take a slot in under a minute, CRM automation
                  that captures and follows up with every enquiry instantly,
                  and reminders that protect the appointment once it's made.
                  Response time decides close rates; automation is how a small
                  team responds in seconds, every time.
                </p>

                <p>
                  None of these layers is optional, because the visitor only
                  experiences them as one thing: a site that either feels safe
                  and easy to buy from, or doesn't.
                </p>
              </div>
            </section>

            {/* three-decisions */}
            <section
              id="three-decisions"
              className="scroll-mt-32 py-12 border-b border-neutral-200/60"
            >
              <h2 className="text-3xl font-normal text-gray-950 mb-6">
                Three decisions that will define the next five years for
                service businesses
              </h2>
              <div className="space-y-6 text-[16px] text-neutral-600">
                <p>
                  <strong>Treat your website as a living system, not a
                  launch.</strong> A site that ships and then sits still decays
                  in rankings, relevance, and conversion. The businesses that
                  win treat the site like a sales rep on continuous review:
                  measured monthly, tested constantly, and improved wherever
                  visitors hesitate or drop off.
                </p>
                <p>
                  <strong>Structure for machines as deliberately as for
                  people.</strong> Answer engines are becoming the front door
                  to your business. Clean structure, schema markup, direct
                  answers, and verifiable credentials are not technical
                  niceties - they are distribution. A site that AI cannot
                  confidently read is a site AI will not recommend.
                </p>
                <p>
                  <strong>Compete on credibility, not presence.</strong>
                  "Having a website" stopped being a differentiator a decade
                  ago. In a market flooded with generated content and
                  interchangeable templates, the scarce assets are specific
                  proof, distinctive positioning, and a frictionless path to
                  action. Those are buildable - but they have to be built on
                  purpose.
                </p>
                <p>
                  The buying environment will keep shifting. The constant is
                  that someone - human or model - lands on your site, decides
                  in seconds, and either commits or moves on. Everything in
                  this article is about winning that moment.
                </p>
              </div>
            </section>

            {/* faq */}
            <section id="faq" className="scroll-mt-32 py-12">
              <h2 className="text-3xl font-normal text-gray-950 mb-6">
                Frequently asked questions
              </h2>
              <div className="space-y-6 text-[16px] text-neutral-600 border-t border-neutral-200/40 pt-6">
                <div>
                  <p className="font-semibold text-gray-950 mb-1">
                    What is an answer engine?
                  </p>
                  <p>
                    An answer engine is an AI system - like ChatGPT,
                    Perplexity, or Google's AI Overviews - that responds to a
                    question with a direct answer and a small number of cited
                    sources, instead of a page of links. Being one of those
                    cited sources is the new version of ranking first.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-950 mb-1">
                    Do I still need traditional SEO if buyers ask AI instead of
                    Google?
                  </p>
                  <p>
                    Yes. Answer engines build on the same foundations as
                    search: crawlable structure, fast pages, clear content, and
                    authoritative signals. Answer-engine optimisation extends
                    SEO rather than replacing it - if your site isn't findable
                    and readable, it can't be cited.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-950 mb-1">
                    Why isn't one good homepage enough anymore?
                  </p>
                  <p>
                    Because different visitors arrive with different intents,
                    and a homepage has to serve all of them at once - which
                    means it serves none of them perfectly. A dedicated landing
                    page per offer, campaign, and audience lets each visitor
                    land on a single focused argument, which is consistently
                    what converts best.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-950 mb-1">
                    What is conversion infrastructure?
                  </p>
                  <p>
                    Conversion infrastructure is the full system between a
                    buyer's first impression and a confirmed appointment: a
                    fast, trust-first website, focused landing pages, embedded
                    calendar booking, and CRM automation that captures and
                    follows up with every lead instantly. It treats the website
                    as a revenue system rather than a brochure.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-950 mb-1">
                    How fast does a website need to be?
                  </p>
                  <p>
                    Fast enough that the visitor never notices the wait -
                    in practice, loading in about a second and passing Google's
                    Core Web Vitals. Every additional second of delay measurably
                    increases the share of visitors who leave before the page
                    renders, and speed also feeds search and answer-engine
                    rankings.
                  </p>
                </div>
              </div>
            </section>
          </article>
        </section>

        {/* Continue reading section */}
        <section className="mt-24 pt-16 border-t border-neutral-200/60">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-normal text-gray-950">Continue reading</h2>
            <Link href="/resources-hub" asChild>
              <a className="inline-flex items-center px-4 py-2 border border-neutral-300 hover:border-neutral-800 text-[13.5px] font-medium rounded-full transition-colors duration-150 cursor-pointer">
                Read all &gt;
              </a>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CONTINUE_READING_ARTICLES.map((art, idx) => (
              <Link key={art.title} href={art.href} asChild>
                <div className="flex flex-col group cursor-pointer">
                  <CredyrGradientCard>
                    <CardIllustration />
                  </CredyrGradientCard>
                  <h3 className="text-lg md:text-xl font-normal text-gray-950 mt-4 mb-2 group-hover:text-neutral-800 transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                  <span className="text-xs text-neutral-400 font-medium">
                    Insights — {art.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Shared Dark Website Footer */}
      <SiteFooter />
    </div>
  );
}
