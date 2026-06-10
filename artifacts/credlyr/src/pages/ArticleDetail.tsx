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
    id: "what-attacker-means",
    label: 'What does "the attacker is a model" actually mean for compliance?',
  },
  {
    id: "four-threats",
    label: "What are the four AI threats to identity verification right now?",
  },
  {
    id: "why-friction-fails",
    label: "Why does friction-first onboarding fail as a fraud strategy?",
  },
  {
    id: "what-ai-native-looks-like",
    label: "What does AI-native compliance actually look like in practice?",
  },
  {
    id: "why-slow-adoption",
    label: "Why has AI adoption in compliance been so slow?",
  },
  {
    id: "three-decisions",
    label:
      "Three decisions that will define the next five years in identity and compliance",
  },
  { id: "faq", label: "Frequently asked questions" },
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
    title: "Best KYB software in 2026",
    href: "/resources-hub",
    readTime: "9 min read",
  },
  {
    title: "Identity in an AI world: When the attacker is a model",
    href: "/resources-hub/identity-in-an-ai-world",
    readTime: "6 min read",
  },
  {
    title: "AI-native KYB platforms",
    href: "/resources-hub",
    readTime: "7 min read",
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
            Identity in an AI world: When
            <br />
            the attacker is a model
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
                  Rules-based onboarding was designed to stop a human attacker
                  with limited time and effort. The new attacker is an AI model
                  with unlimited time and zero marginal cost per attempt.
                </li>
                <li>
                  Only 2% of global financial crime is detected today, despite
                  $304 billion spent annually on anti-money laundering (AML)
                  and know-your-customer (KYC) compliance worldwide (McKinsey &
                  Company, Agentic AI Report 2025).
                </li>
                <li>
                  AI-driven fraud now includes four distinct threat classes:
                  AI-generated documents, deepfake video at onboarding,
                  synthetic companies, and state-sponsored actors (FATF,
                  Europol, FBI IC3, 2025).
                </li>
                <li>
                  Identity is also a conversion problem. More than half of
                  applicants abandon financial applications that take over ten
                  minutes to complete (Ribbit Capital, Identity Newsletter).
                </li>
                <li>
                  AI-native compliance systems have already cut onboarding time
                  by 60% and reduced analyst follow-up rates by 51%. The gap is
                  adoption: only around 10% of firms have made a meaningful AI
                  impact in compliance (Credyr, 2026).
                </li>
              </ul>
            </section>

            {/* what-attacker-means */}
            <section
              id="what-attacker-means"
              className="scroll-mt-32 py-12 border-b border-neutral-200/60"
            >
              <h2 className="text-3xl font-normal text-gray-950 mb-6">
                What does "the attacker is a model" actually mean for compliance?
              </h2>
              <div className="space-y-6 text-[16px] text-neutral-600">
                <p>
                  In 1993, The New Yorker published the cartoon that still hangs
                  in every identity professional's mental gallery: one dog at a
                  keyboard telling another, "On the Internet, nobody knows
                  you're a dog." The joke aged fine. The compliance systems
                  built on the same assumption did not.
                </p>
                <p>
                  For three decades, the financial industry layered checks on
                  top of checks (more vendors, more workflow steps, more
                  document requirements). The underlying assumption held: the
                  person on the other side of the application was a human being
                  with limited time, limited resources, and a limited appetite
                  for friction. Rules-based onboarding was an arms race
                  calibrated for that attacker. Create enough friction and the
                  bad actor gives up. Let the legitimate customer through.
                </p>
                <p>
                  That assumption is now wrong. The attacker is increasingly a
                  model. AI agents can attempt thousands of onboarding flows
                  simultaneously, generate plausible synthetic documentation,
                  pass liveness checks using deepfake video, and construct
                  entirely fictitious company structures with supporting
                  registries and directorship chains. The marginal cost of each
                  new attempt approaches zero. The time available approaches
                  unlimited. A system designed to exhaust a human adversary does
                  not exhaust a model.
                </p>
                <p>
                  The result is a detection rate that has not kept pace with
                  the scale of the problem. According to McKinsey & Company's
                  Agentic AI Report (2025), only 2% of global financial crime is
                  being detected today - despite the US alone spending $46
                  billion annually on financial crime compliance, and cumulative
                  AML fines since 2008 reaching $321 billion globally. Revolut
                  has more than a third of its staff working on financial crime;
                  Wise runs compliance operations across 65+ licenses. The
                  spend is enormous. The outcome is not.
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

            {/* four-threats */}
            <section
              id="four-threats"
              className="scroll-mt-32 py-12 border-b border-neutral-200/60"
            >
              <h2 className="text-3xl font-normal text-gray-950 mb-6">
                What are the four AI threats to identity verification right now?
              </h2>
              <div className="space-y-6 text-[16px] text-neutral-600">
                <p>
                  Regulators including FATF, Europol, and the FBI's Internet
                  Crime Complaint Center (IC3) have catalogued four distinct
                  threat classes in identity verification as of 2025.
                </p>

                <p>
                  <strong>AI-generated documents.</strong> Large language models
                  and image synthesis tools can produce supporting documentation
                  (utility bills, incorporation certificates, beneficial
                  ownership records) that passes surface-level visual
                  inspection. Document verification that relies on template
                  matching or optical character recognition alone is now a weak
                  control.
                </p>

                <p>
                  <strong>Deepfake video at onboarding.</strong> Real-time
                  face-swapping and voice synthesis have reached the point where
                  video liveness checks can be defeated without specialized
                  hardware. The check that was designed to confirm a human is
                  present can now be passed by a model driving a synthetic
                  face.
                </p>

                <p>
                  <strong>Synthetic companies.</strong> Corporate identity fraud
                  has scaled. It is now possible to construct a company with a
                  plausible digital footprint (registered address, director
                  history, company number, and some adverse-media-free history)
                  using publicly available registries and AI-assisted content
                  generation. Standard KYB (know-your-business) checks that rely
                  on registry data alone do not catch a synthetic company that
                  is, technically, in the registry.
                </p>

                <p>
                  <strong>State-sponsored actors.</strong> Nation-state fraud
                  operations have the budget, the patience, and the AI
                  infrastructure to probe compliance systems at scale over
                  extended periods. The concept of "friction as deterrence" has
                  no meaning against an adversary whose resources dwarf the cost
                  of the friction.
                </p>

                <p>
                  Each of these threats shares the same structural property: it
                  is optimized against a rules-based system. Rules are
                  observable, testable, and eventually navigable by a patient,
                  automated adversary. The defense has to be built differently.
                </p>
              </div>
            </section>

            {/* why-friction-fails */}
            <section
              id="why-friction-fails"
              className="scroll-mt-32 py-12 border-b border-neutral-200/60"
            >
              <h2 className="text-3xl font-normal text-gray-950 mb-6">
                Why does friction-first onboarding fail as a fraud strategy?
              </h2>
              <div className="space-y-6 text-[16px] text-neutral-600">
                <p>
                  Friction-first onboarding was rational when the population of
                  potential fraudsters was constrained by human cost. Every
                  extra document request, every callback, every manual review
                  added effort that a bad actor might not absorb. Legitimate
                  customers tolerated it because switching was costly and the
                  alternative was no account at all.
                </p>
                <p>Neither of those conditions holds anymore.</p>
                <p>
                  On the fraud side: the marginal cost of completing an
                  onboarding flow has dropped toward zero for model-based
                  attackers. Friction deters humans. It does not deter agents.
                </p>
                <p>
                  On the conversion side: customers now comparison-shop
                  financial services the way they compare any product. In 2018,
                  25% of customers opened a new bank account without shopping
                  around; today that figure is 4% (McKinsey & Company, Global
                  Banking Annual Review 2025). Friction that once locked
                  customers in now loses them to whoever moves faster. More than
                  half of applicants abandon applications that take over ten
                  minutes (Ribbit Capital, Identity Newsletter). Identity is a
                  conversion problem as much as a fraud problem, a framing the
                  industry has been slow to accept.
                </p>
                <p>
                  The systems built on friction-as-defense are now
                  simultaneously failing at both jobs. They are not stopping the
                  attackers they were designed to stop, and they are turning
                  away legitimate customers they were designed to admit.
                </p>
              </div>
            </section>

            {/* what-ai-native-looks-like */}
            <section
              id="what-ai-native-looks-like"
              className="scroll-mt-32 py-12 border-b border-neutral-200/60"
            >
              <h2 className="text-3xl font-normal text-gray-950 mb-6">
                What does AI-native compliance actually look like in practice?
              </h2>
              <div className="space-y-6 text-[16px] text-neutral-600">
                <p>
                  The case for AI-native compliance is sometimes presented as a
                  future state. The evidence suggests it is already producing
                  results at firms that have made the transition.
                </p>
                <p>
                  The numbers from implementations of Credyr's AI-native
                  onboarding are concrete: onboarding time cut by more than 60%,
                  and analyst follow-up rates down 51% (from around 30% of cases
                  to 17%), measured over a rolling 30-day period through
                  mid-2025. These results sit alongside the 10.6x onboarding and
                  4.8x productivity figures published at Credyr's Series A.
                  McKinsey's Agentic AI Report (2025) puts the productivity
                  gains from agentic AI in financial-crime work at 200% to
                  2,000%.
                </p>
                <p>
                  These outcomes follow from three properties that distinguish
                  AI-native systems from their rules-based predecessors.
                </p>

                <p>
                  <strong>Evidence-based decisioning.</strong> Rather than
                  checking whether a document was submitted, an evidence-based
                  system asks whether the evidence is consistent and credible
                  across multiple signals simultaneously. A model can generate a
                  document; it is harder to generate a document that is coherent
                  with the applicant's digital footprint, behavioral signals,
                  and cross-registry data.
                </p>

                <p>
                  <strong>Deterministic, auditable outputs.</strong> Compliance
                  has a higher bar for AI deployment than most other functions.
                  An unexplainable decision does not mean a missed sale: it
                  means a regulatory enforcement action or a missed SAR
                  (suspicious activity report). AI in compliance needs to
                  produce decisions that can be explained to a regulator,
                  attributed to a specific policy, and reproduced. The policy
                  engine is the layer that makes AI decisions auditable rather
                  than probabilistic.
                </p>

                <p>
                  <strong>Continuous monitoring.</strong> A customer who passes
                  onboarding in January may be a different risk profile in July.
                  Static, point-in-time onboarding produces a snapshot that
                  becomes stale the moment it is filed. Continuous lifecycle
                  monitoring (daily automated screening against sanctions lists,
                  politically exposed person (PEP) registries, and adverse
                  media) converts identity from a one-time check into a living
                  record.
                </p>

                <p>
                  This is the inversion the industry is moving toward: from 99%
                  checkbox and 1% judgment, to 1% checkbox and 99% judgment. The
                  checkboxes get automated. The judgment (the decisions that
                  actually require a human) gets surfaced to people equipped to
                  make it.
                </p>
              </div>
            </section>

            {/* why-slow-adoption */}
            <section
              id="why-slow-adoption"
              className="scroll-mt-32 py-12 border-b border-neutral-200/60"
            >
              <h2 className="text-3xl font-normal text-gray-950 mb-6">
                Why has AI adoption in compliance been so slow?
              </h2>
              <div className="space-y-6 text-[16px] text-neutral-600">
                <p>
                  Only around 10% of firms have made a meaningful AI impact in
                  compliance (Credyr, 2026). That is a striking gap given the
                  proof of concept is already there.
                </p>
                <p>
                  Four structural factors explain why compliance is the second
                  wave of AI rather than the first.
                </p>
                <p>
                  <strong>Risk asymmetry.</strong> In most business functions, the
                  downside of a failed AI implementation is a missed efficiency.
                  In compliance, the downside is a regulatory enforcement action,
                  a fine, a reputational event, or a missed report on criminal
                  activity. The upside is capped; the downside is career-ending.
                  That asymmetry produces rational caution even when the
                  evidence for transition is clear.
                </p>
                <p>
                  <strong>The legacy policy layer.</strong> Financial institutions
                  have accumulated hundreds of pages of judgment-based compliance
                  policy written for human analysts. Converting that policy into
                  machine-readable rules is a project in its own right, one that
                  has to happen before AI can run on top of it. Firms that have
                  not done that translation work cannot plug an AI layer in.
                </p>
                <p>
                  <strong>The quality bar.</strong> AI in sales or marketing
                  tolerates imprecision. AI in compliance must be reliable,
                  repeatable, and explainable to a regulator on demand. The bar is
                  higher, the testing cycles are longer, and the tolerance for
                  hallucination is zero.
                </p>
                <p>
                  <strong>Constant change.</strong> Customer data changes.
                  Regulations change. AI models are updated. Sanctions lists move
                  daily. A compliance system has to handle continuous change in its
                  inputs while maintaining consistent, auditable outputs. That is a
                  harder engineering problem than most AI deployments face.
                </p>
                <p>
                  These are real constraints, not excuses. Purpose-built
                  compliance infrastructure is designed to handle them;
                  general-purpose AI tools applied to compliance workflows as an
                  afterthought are not.
                </p>
              </div>
            </section>

            {/* three-decisions */}
            <section
              id="three-decisions"
              className="scroll-mt-32 py-12 border-b border-neutral-200/60"
            >
              <h2 className="text-3xl font-normal text-gray-950 mb-6">
                Three decisions that will define the next five years in identity
                and compliance
              </h2>
              <div className="space-y-6 text-[16px] text-neutral-600">
                <p>
                  <strong>Treat identity as a living system of record.</strong> A
                  KYB or KYC check that produces a PDF and a green light is not
                  an identity system - it is a snapshot. The firms that will be
                  best positioned are the ones that treat the identity record as
                  something that continues to evolve after onboarding: updated
                  continuously, enriched by new signals, and re-evaluated when
                  the risk environment changes. The Credyr AI memo frames this as
                  the "AI-native identity system of record," the category that
                  replaces static compliance files.
                </p>
                <p>
                  <strong>Design for determinism and explainability from the
                  start.</strong> Adding explainability to a system that was built
                  without it is expensive and often impossible. Compliance AI that
                  cannot trace a decision back to a specific policy input will not
                  survive regulatory scrutiny. The architecture decision (evidence-based
                  and auditable from day one) is more consequential than the choice
                  of which AI model to run on top of it.
                </p>
                <p>
                  <strong>Build for the adversary you will face, not the one
                  you faced.</strong> The compliance frameworks in place at most
                  institutions were calibrated against a human attacker with
                  limited resources. The attacker is now a model. The threat
                  classes are already documented by FATF, Europol, and the FBI:
                  AI-generated documents, deepfake video, synthetic companies,
                  state-sponsored actors. The question is whether the systems
                  being built today are designed to handle them, or designed to
                  handle a 2015 fraud profile.
                </p>
                <p>
                  The detection rate does not move without the underlying system
                  changing. Two percent detected is not a measurement problem. It
                  is an architecture problem.
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
                    What is the current global financial crime detection rate?
                  </p>
                  <p>
                    According to McKinsey & Company's Agentic AI Report (2025),
                    only 2% of global financial crime is detected today, despite
                    approximately $304 billion being spent each year on AML and
                    KYC compliance worldwide.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-950 mb-1">
                    What AI threats are financial institutions facing in identity
                    verification?
                  </p>
                  <p>
                    FATF, Europol, and the FBI IC3 have identified four primary
                    AI-driven threats in identity verification as of 2025: AI-generated
                    documents, deepfake video used to defeat liveness checks at
                    onboarding, synthetic companies with fabricated digital footprints,
                    and state-sponsored actors operating at scale.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-950 mb-1">
                    Why did rules-based onboarding stop working?
                  </p>
                  <p>
                    Rules-based onboarding was designed to deter human attackers
                    with limited time and resources. AI-based attackers have
                    unlimited time, near-zero cost per attempt, and can systematically
                    probe and navigate fixed rules. Friction deters people; it
                    does not deter models.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-950 mb-1">
                    What are the measurable results of AI-native compliance
                    systems?
                  </p>
                  <p>
                    Implementations show onboarding time reductions of more than
                    60% and a 51% drop in analyst follow-up rates. McKinsey (Agentic
                    AI Report, 2025) estimates productivity gains from agentic AI
                    in financial-crime work at 200% to 2,000%.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-950 mb-1">
                    What makes compliance harder to automate with AI than other
                    functions?
                  </p>
                  <p>
                    Compliance requires AI outputs to be reliable, repeatable,
                    and explainable to regulators on demand. The tolerance for
                    error is effectively zero, and the consequences of a missed
                    detection or unexplainable decision are regulatory rather than
                    commercial. The quality bar is categorically higher than in
                    most business functions where AI has already taken hold.
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
                  <DunaGradientCard>
                    <CardIllustration />
                  </DunaGradientCard>
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
