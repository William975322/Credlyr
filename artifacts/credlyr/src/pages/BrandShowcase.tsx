import React from "react";
import { Link } from "wouter";
import {
  BrandLogo,
  LogoMarkA1,
  LogoMarkA2,
  LogoMarkA3,
  useBrandDirection,
  LogoDirection,
} from "../components/BrandLogo";
import { ArrowLeft, Check, Download, Layers, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";

interface RefinementItem {
  id: "A1" | "A2" | "A3";
  name: string;
  category: string;
  fontFamily: string;
  license: string;
  description: string;
  opticalDetails: {
    letterCase: string;
    tracking: string;
    weight: string;
    monogram: string;
    vibe: string;
  };
  svgFile: string;
  principles: string[];
}

const REFINEMENTS: RefinementItem[] = [
  {
    id: "A1",
    name: "Option A1: Modern Sculptural Grotesque",
    category: "Swiss Modernism / Architectural Grotesque",
    fontFamily: "Plus Jakarta Sans / Inter Display",
    license: "Google Fonts OFL (Open Font License)",
    description:
      "Pure typographic discipline in title case. Calibrated neo-grotesque letterforms with precision optical kerning (-0.035em), a circular C with horizontal terminal cut, and an architectural square-cut C monogram for favicon density.",
    opticalDetails: {
      letterCase: "Title Case (Credyr)",
      tracking: "-0.035em (tight-knit optical rhythm)",
      weight: "500 Medium (sculptural stance)",
      monogram: "Architectural square-terminal geometric C",
      vibe: "Quiet luxury, structural confidence, modern tech authority",
    },
    svgFile: "/favicon-a1.svg",
    principles: [
      "Pure title-case wordmark with zero decorative filler",
      "Mathematically balanced kerning between 'Cr', 'ed', 'dy', and 'yr'",
      "Distinctive architectural C monogram scales down to 16px crispness",
    ],
  },
  {
    id: "A2",
    name: "Option A2: Contemporary Editorial Antiqua",
    category: "Haute Editorial Roman / Transitional Serif",
    fontFamily: "Newsreader / Fraunces",
    license: "Google Fonts OFL (Open Font License)",
    description:
      "Literary prestige and clinical lineage in title case. Features high-contrast vertical stress, a sweeping capital C with delicate teardrop terminal, and elegant serif footings, evoking Harley Street clinics and established advisory partners.",
    opticalDetails: {
      letterCase: "Title Case (Credyr)",
      tracking: "-0.015em (delicate editorial spacing)",
      weight: "400 Regular (high-contrast contrast)",
      monogram: "Editorial Serif C with teardrop finial",
      vibe: "Clinical prestige, bespoke advisory, editorial gravitas",
    },
    svgFile: "/favicon-a2.svg",
    principles: [
      "High-contrast thick/thin strokes convey clinical pedigree",
      "Graceful teardrop finial on capital C adds warm memory anchor",
      "Editorial serif C monogram commands authority in favicon scale",
    ],
  },
  {
    id: "A3",
    name: "Option A3: Humanist Geometric Arch",
    category: "Humanist Geometric Grotesque",
    fontFamily: "Outfit / Syne Geometric",
    license: "Google Fonts OFL (Open Font License)",
    description:
      "Engineered clarity meets organic warmth in title case. Circular bowls, open geometric apertures, and an authoritative geometric C arch monogram with rounded terminals for maximum digital readability.",
    opticalDetails: {
      letterCase: "Title Case (Credyr)",
      tracking: "-0.025em (balanced horizontal pace)",
      weight: "600 Semibold (high-impact presence)",
      monogram: "Heavy-gauge geometric C arch with rounded terminals",
      vibe: "Productized service clarity, approachable precision, modern craft",
    },
    svgFile: "/favicon-a3.svg",
    principles: [
      "Open geometric bowls provide instant recognition at small sizes",
      "Balanced letterforms eliminate clinical coldness while retaining precision",
      "Bold geometric C arch monogram is unmistakable in browser tabs",
    ],
  },
];

export default function BrandShowcasePage() {
  const { direction, setDirection } = useBrandDirection();
  const currentActive = direction === "A" ? "A1" : direction;

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-neutral-950 pt-28 pb-24 px-5 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Navigation back */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" asChild>
            <a className="inline-flex items-center gap-2 text-[14.5px] font-medium text-neutral-600 hover:text-neutral-950 transition-colors">
              <ArrowLeft size={16} /> Back to homepage
            </a>
          </Link>
          <span className="text-[12px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-neutral-200 bg-white text-neutral-600">
            Current Active: Option {currentActive}
          </span>
        </div>

        {/* Page Header */}
        <div className="pb-10 border-b border-neutral-200">
          <span className="text-[12.5px] font-semibold tracking-wider uppercase text-neutral-500 block mb-2">
            Direction A Refinements · Title Case Typography
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.04em] text-[#111110] leading-[1.08]">
            Credyr Brand Identity: Three Title-Case Refinements
          </h1>
          <p className="mt-4 text-[17px] sm:text-[19px] text-neutral-600 max-w-3xl leading-relaxed font-normal">
            Building upon Direction A as our starting foundation, we have engineered three genuinely different typography-first refinements of <strong className="font-semibold text-neutral-900">&ldquo;Credyr&rdquo; in title case</strong> (replacing widely spaced uppercase). All options use appropriately licensed fonts (Google Fonts OFL), omit generic decorative symbols, and are tested at realistic header size, light/dark canvases, and micro-favicons.
          </p>
        </div>

        {/* ── 3-COLUMN SIDE-BY-SIDE COMPARATIVE MATRIX ── */}
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-normal tracking-tight text-neutral-950">
                Side-by-Side Comparative Matrix
              </h2>
              <p className="text-[14.5px] text-neutral-500 mt-1">
                Compare all three title-case refinements side-by-side across realistic header scale, light and dark backgrounds, and favicon stress tests.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {REFINEMENTS.map((ref) => {
              const isSelected = currentActive === ref.id;
              return (
                <div
                  key={ref.id}
                  className={`rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all ${
                    isSelected
                      ? "bg-white border-neutral-950 shadow-xl ring-2 ring-neutral-950"
                      : "bg-white/70 border-neutral-200/90 shadow-sm hover:border-neutral-300"
                  }`}
                >
                  <div>
                    {/* Badge & Title */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                        {ref.category}
                      </span>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-neutral-950 text-white">
                          <Check size={11} /> Active
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-neutral-950">
                      {ref.name}
                    </h3>
                    <p className="text-[12.5px] font-mono text-neutral-500 mt-1">
                      {ref.fontFamily}
                    </p>
                    <p className="text-[14px] text-neutral-600 mt-2.5 leading-relaxed">
                      {ref.description}
                    </p>

                    {/* ── REALISTIC HEADER BAR SIMULATION (LIGHT & DARK) ── */}
                    <div className="mt-4 pt-3.5 border-t border-neutral-200/70">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
                        Realistic Header Size (1:1 Scale)
                      </span>

                      {/* Realistic Light Header Bar */}
                      <div className="bg-white/95 border border-neutral-200/80 rounded-xl px-3.5 py-2 flex items-center justify-between shadow-xs mb-2">
                        <BrandLogo direction={ref.id} tone="dark" />
                        <div className="hidden sm:flex items-center gap-3 text-[12px] text-neutral-600 font-medium">
                          <span>Services</span>
                          <span>About</span>
                        </div>
                        <span className="text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full bg-neutral-950 text-white">
                          Audit
                        </span>
                      </div>

                      {/* Realistic Dark Header Bar */}
                      <div className="bg-[#111110] border border-neutral-800 rounded-xl px-3.5 py-2 flex items-center justify-between shadow-xs">
                        <BrandLogo direction={ref.id} tone="light" />
                        <div className="hidden sm:flex items-center gap-3 text-[12px] text-neutral-400 font-medium">
                          <span>Services</span>
                          <span>About</span>
                        </div>
                        <span className="text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full bg-white text-neutral-950">
                          Audit
                        </span>
                      </div>
                    </div>

                    {/* ── RENDERED CANVAS ENVIRONMENTS ── */}
                    <div className="mt-4 pt-3.5 border-t border-neutral-200/70">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
                        Rendered Environments
                      </span>

                      <div className="flex flex-col gap-2">
                        {/* Light Canvas */}
                        <div className="bg-[#fbfaf7] border border-neutral-200 rounded-lg px-3.5 py-2 flex items-center justify-between">
                          <span className="text-[10.5px] font-mono text-neutral-400">Light (#fbfaf7)</span>
                          <BrandLogo direction={ref.id} tone="dark" wordmarkClassName="text-[19px]" />
                        </div>

                        {/* Dark Canvas */}
                        <div className="bg-[#111110] border border-neutral-800 rounded-lg px-3.5 py-2 flex items-center justify-between">
                          <span className="text-[10.5px] font-mono text-neutral-500">Dark (#111110)</span>
                          <BrandLogo direction={ref.id} tone="light" wordmarkClassName="text-[19px]" />
                        </div>

                        {/* Warm Stone with Monogram */}
                        <div className="bg-[#f0eee9] border border-neutral-200/80 rounded-lg px-3.5 py-2 flex items-center justify-between">
                          <span className="text-[10.5px] font-mono text-neutral-500">+ Monogram</span>
                          <BrandLogo direction={ref.id} tone="dark" showMark={true} wordmarkClassName="text-[19px]" />
                        </div>
                      </div>
                    </div>

                    {/* ── FAVICON STRESS TESTS ── */}
                    <div className="mt-4 pt-3.5 border-t border-neutral-200/70">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block mb-2">
                        Favicon Scale Tests (64px, 32px, 16px)
                      </span>
                      <div className="bg-[#f4f3ef] rounded-xl p-2.5 border border-neutral-200/80 flex items-center justify-around">
                        {/* 64px */}
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-10 h-10 rounded-lg bg-[#111110] flex items-center justify-center shadow-xs">
                            {ref.id === "A1" && <LogoMarkA1 tone="light" className="h-5 w-5" />}
                            {ref.id === "A2" && <LogoMarkA2 tone="light" className="h-5 w-5" />}
                            {ref.id === "A3" && <LogoMarkA3 tone="light" className="h-5 w-5" />}
                          </div>
                          <span className="text-[9.5px] font-mono text-neutral-500">64px</span>
                        </div>

                        {/* 32px */}
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-6 h-6 rounded-md bg-[#111110] flex items-center justify-center shadow-xs">
                            {ref.id === "A1" && <LogoMarkA1 tone="light" className="h-3 w-3" />}
                            {ref.id === "A2" && <LogoMarkA2 tone="light" className="h-3 w-3" />}
                            {ref.id === "A3" && <LogoMarkA3 tone="light" className="h-3 w-3" />}
                          </div>
                          <span className="text-[9.5px] font-mono text-neutral-500">32px</span>
                        </div>

                        {/* 16px */}
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-4 h-4 rounded-[3px] bg-[#111110] flex items-center justify-center shadow-xs">
                            {ref.id === "A1" && <LogoMarkA1 tone="light" className="h-2 w-2" />}
                            {ref.id === "A2" && <LogoMarkA2 tone="light" className="h-2 w-2" />}
                            {ref.id === "A3" && <LogoMarkA3 tone="light" className="h-2 w-2" />}
                          </div>
                          <span className="text-[9.5px] font-mono text-neutral-500">16px</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-3.5 border-t border-neutral-200/80 flex items-center justify-between gap-3">
                    <a
                      href={ref.svgFile}
                      download={`credyr-${ref.id.toLowerCase()}-favicon.svg`}
                      className="inline-flex items-center gap-1.5 text-[12px] font-medium text-neutral-700 hover:text-neutral-950 transition-colors"
                    >
                      <Download size={12} /> SVG
                    </a>
                    <button
                      onClick={() => setDirection(ref.id)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12.5px] font-medium transition-colors ${
                        isSelected
                          ? "bg-neutral-950 text-white cursor-default"
                          : "border border-neutral-950 text-neutral-950 hover:bg-neutral-950 hover:text-white"
                      }`}
                    >
                      {isSelected ? "Active on site" : "Preview on site"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── DEEP-DIVE SPECIFICATION PANELS ── */}
        <div className="mt-20">
          <div className="pb-6 border-b border-neutral-200 mb-10">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950">
              Detailed Typographic Anatomy & Rationale
            </h2>
            <p className="text-[15px] text-neutral-600 mt-1">
              Thorough design breakdown of letterforms, optical kerning, stroke weights, and licensing.
            </p>
          </div>

          <div className="flex flex-col gap-14">
            {REFINEMENTS.map((ref) => (
              <div
                key={`detail-${ref.id}`}
                className="bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-12 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-neutral-200">
                  <div>
                    <span className="text-[12px] font-mono uppercase tracking-wider text-neutral-500">
                      {ref.category} · {ref.license}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-neutral-950 mt-1">
                      {ref.name}
                    </h3>
                    <p className="text-[16px] text-neutral-600 mt-2 max-w-2xl leading-relaxed">
                      {ref.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={ref.svgFile}
                      download={`credyr-${ref.id.toLowerCase()}-favicon.svg`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-300 text-[13px] font-medium text-neutral-800 hover:border-neutral-900 bg-white"
                    >
                      <Download size={14} /> Download Favicon SVG
                    </a>
                  </div>
                </div>

                {/* Anatomy Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 py-8 border-b border-neutral-200/70 text-left">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-1">
                      Letter Case
                    </span>
                    <span className="text-[14px] font-medium text-neutral-900">
                      {ref.opticalDetails.letterCase}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-1">
                      Optical Kerning
                    </span>
                    <span className="text-[14px] font-medium text-neutral-900">
                      {ref.opticalDetails.tracking}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-1">
                      Typographic Weight
                    </span>
                    <span className="text-[14px] font-medium text-neutral-900">
                      {ref.opticalDetails.weight}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-1">
                      Monogram Strategy
                    </span>
                    <span className="text-[14px] font-medium text-neutral-900">
                      {ref.opticalDetails.monogram}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-1">
                      Target Aesthetic
                    </span>
                    <span className="text-[14px] font-medium text-neutral-900">
                      {ref.opticalDetails.vibe}
                    </span>
                  </div>
                </div>

                {/* Large Display Specimen */}
                <div className="mt-8 bg-[#fbfaf7] rounded-2xl p-8 sm:p-12 border border-neutral-200/80 flex flex-col items-center justify-center text-center">
                  <span className="text-[12px] font-mono uppercase tracking-wider text-neutral-400 mb-6">
                    Large Scale Identity Specimen
                  </span>
                  <div className="py-6">
                    <BrandLogo
                      direction={ref.id}
                      tone="dark"
                      showMark={true}
                      wordmarkClassName="text-5xl sm:text-6xl md:text-7xl"
                      markClassName="h-12 w-12 sm:h-14 sm:w-14"
                    />
                  </div>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[13.5px] text-neutral-600">
                    {ref.principles.map((pr) => (
                      <span key={pr} className="inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
                        {pr}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
