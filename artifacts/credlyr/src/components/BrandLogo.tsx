import React, { useState } from "react";
import { cn } from "@/lib/utils";

export type LogoDirection = "A1" | "A2" | "A3" | "A" | "B" | "C";
export type LogoTone = "dark" | "light";

interface LogoMarkProps extends React.SVGProps<SVGSVGElement> {
  tone?: LogoTone;
  direction?: LogoDirection;
}

// ── Refinement A1: Architectural Geometric C Glyph (Modern Grotesque) ──
export function LogoMarkA1({ tone = "dark", className, ...props }: LogoMarkProps) {
  const strokeColor = tone === "light" ? "#FFFFFF" : "#111110";
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="Credyr Refinement A1 mark"
      className={cn("h-6 w-6 shrink-0", className)}
      {...props}
    >
      <path
        d="M23 10.5C21.2 8.5 18.7 7 16 7C11 7 7 11 7 16C7 21 11 25 16 25C18.7 25 21.2 23.5 23 21.5"
        stroke={strokeColor}
        strokeWidth="3.2"
        strokeLinecap="square"
      />
    </svg>
  );
}

// ── Refinement A2: Editorial High-Contrast Serif C Glyph (Editorial Antiqua) ──
export function LogoMarkA2({ tone = "dark", className, ...props }: LogoMarkProps) {
  const fillColor = tone === "light" ? "#FFFFFF" : "#111110";
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="Credyr Refinement A2 mark"
      className={cn("h-6 w-6 shrink-0", className)}
      {...props}
    >
      <path
        d="M23 11.2C22.2 9.5 20.2 7.5 16.5 7.5C11.5 7.5 7.5 11.2 7.5 16C7.5 20.8 11.5 24.5 16.5 24.5C20.2 24.5 22.4 22.5 23 20.5"
        stroke={fillColor}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <circle cx="22.5" cy="11.2" r="1.8" fill={fillColor} />
    </svg>
  );
}

// ── Refinement A3: Humanist Geometric Arch C Glyph (Humanist Grotesque) ──
export function LogoMarkA3({ tone = "dark", className, ...props }: LogoMarkProps) {
  const strokeColor = tone === "light" ? "#FFFFFF" : "#111110";
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="Credyr Refinement A3 mark"
      className={cn("h-6 w-6 shrink-0", className)}
      {...props}
    >
      <path
        d="M23.5 10.2C21.6 7.8 18.8 6.5 15.5 6.5C10 6.5 5.8 10.8 5.8 16C5.8 21.2 10 25.5 15.5 25.5C18.8 25.5 21.6 24.2 23.5 21.8"
        stroke={strokeColor}
        strokeWidth="3.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Backward compatibility aliases
export const LogoMarkA = LogoMarkA1;
export const LogoMark = LogoMarkA1;

export function LogoMarkB({ tone = "dark", className, ...props }: LogoMarkProps) {
  const strokeColor = tone === "light" ? "#FFFFFF" : "#111110";
  return (
    <svg viewBox="0 0 32 32" fill="none" role="img" className={cn("h-6 w-6 shrink-0", className)} {...props}>
      <rect x="6" y="6" width="20" height="20" rx="3.5" stroke={strokeColor} strokeWidth="2.4" />
      <path d="M16 10V22M10 16H22" stroke={strokeColor} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function LogoMarkC({ tone = "dark", className, ...props }: LogoMarkProps) {
  const fillColor = tone === "light" ? "#FFFFFF" : "#111110";
  return (
    <svg viewBox="0 0 32 32" fill="none" role="img" className={cn("h-6 w-6 shrink-0", className)} {...props}>
      <path d="M16 4 C16 10.6 10.6 16 4 16 C10.6 16 16 21.4 16 28 C16 21.4 21.4 16 28 16 C21.4 16 16 10.6 16 4 Z" fill={fillColor} />
    </svg>
  );
}

// ── Brand Direction Context ──
interface BrandContextType {
  direction: LogoDirection;
  setDirection: (d: LogoDirection) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const BrandDirectionContext = React.createContext<BrandContextType>({
  direction: "A1",
  setDirection: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
});

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [direction, setDirectionState] = useState<LogoDirection>(() => {
    // A1 is the working identity. Alternative directions are only selectable
    // in development (via /brand), never for public visitors.
    if (import.meta.env.DEV && typeof window !== "undefined") {
      const saved = localStorage.getItem("credyr_logo_direction") as LogoDirection | null;
      if (saved === "A1" || saved === "A2" || saved === "A3" || saved === "A" || saved === "B" || saved === "C") {
        return saved === "A" ? "A1" : saved;
      }
    }
    return "A1";
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setDirection = (d: LogoDirection) => {
    setDirectionState(d);
    if (typeof window !== "undefined") {
      localStorage.setItem("credyr_logo_direction", d);
    }
  };

  return (
    <BrandDirectionContext.Provider
      value={{ direction, setDirection, isModalOpen, setIsModalOpen }}
    >
      {children}
      <BrandShowcaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDirection={direction}
        onSelectDirection={setDirection}
      />
    </BrandDirectionContext.Provider>
  );
}

export function useBrandDirection() {
  return React.useContext(BrandDirectionContext);
}

// ── Universal BrandLogo Component ──
interface BrandLogoProps {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  tone?: LogoTone;
  size?: "sm" | "md" | "lg";
  direction?: LogoDirection;
  showMark?: boolean;
  tagline?: string;
}

export function BrandLogo({
  className,
  markClassName,
  wordmarkClassName,
  tone = "dark",
  size = "md",
  direction: propDirection,
  showMark,
  tagline,
}: BrandLogoProps) {
  const context = useBrandDirection();
  let direction = propDirection ?? context?.direction ?? "A1";
  if (direction === "A") direction = "A1"; // Map legacy Direction A to A1 Title Case

  const textColor = tone === "light" ? "text-white" : "text-[#111110]";

  const taglineEl = tagline ? (
    <span
      className={cn(
        "text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-neutral-200/80 text-neutral-500",
        tone === "light" && "border-white/20 text-neutral-300"
      )}
    >
      {tagline}
    </span>
  ) : null;

  // ── Option A1: Modern Sculptural Grotesque (Title Case "Credyr") ──
  if (direction === "A1") {
    const shouldShowMark = showMark ?? false;
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2.5 tracking-normal select-none",
          className
        )}
      >
        {shouldShowMark && <LogoMarkA1 tone={tone} className={cn("h-5 w-5", markClassName)} />}
        <span
          style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
          className={cn(
            "font-medium tracking-[-0.035em] leading-none text-[21px] sm:text-[22px]",
            textColor,
            wordmarkClassName
          )}
        >
          Credyr
        </span>
        {taglineEl}
      </span>
    );
  }

  // ── Option A2: Contemporary Editorial Antiqua (Title Case "Credyr") ──
  if (direction === "A2") {
    const shouldShowMark = showMark ?? false;
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2.5 tracking-normal select-none",
          className
        )}
      >
        {shouldShowMark && <LogoMarkA2 tone={tone} className={cn("h-5 w-5", markClassName)} />}
        <span
          style={{ fontFamily: "'Newsreader', 'Fraunces', Georgia, serif" }}
          className={cn(
            "font-normal tracking-[-0.015em] leading-none text-[23px] sm:text-[24px]",
            textColor,
            wordmarkClassName
          )}
        >
          Credyr
        </span>
        {taglineEl}
      </span>
    );
  }

  // ── Option A3: Humanist Geometric Arch (Title Case "Credyr") ──
  if (direction === "A3") {
    const shouldShowMark = showMark ?? false;
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2.5 tracking-normal select-none",
          className
        )}
      >
        {shouldShowMark && <LogoMarkA3 tone={tone} className={cn("h-5 w-5", markClassName)} />}
        <span
          style={{ fontFamily: "'Outfit', system-ui, -apple-system, sans-serif" }}
          className={cn(
            "font-semibold tracking-[-0.025em] leading-none text-[21px] sm:text-[22px]",
            textColor,
            wordmarkClassName
          )}
        >
          Credyr
        </span>
        {taglineEl}
      </span>
    );
  }

  // Legacy fallback
  if (direction === "B") {
    return (
      <span className={cn("inline-flex items-center gap-2.5 tracking-normal select-none font-sans", className)}>
        {(showMark ?? true) && <LogoMarkB tone={tone} className={cn("h-5 w-5", markClassName)} />}
        <span className={cn("font-semibold tracking-[0.16em] uppercase leading-none text-[17px] sm:text-[18px]", textColor, wordmarkClassName)}>
          Credyr
        </span>
        {taglineEl}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5 tracking-normal select-none font-sans", className)}>
      {(showMark ?? true) && <LogoMarkC tone={tone} className={cn("h-5 w-5", markClassName)} />}
      <span className={cn("font-normal tracking-[-0.035em] leading-none text-[21px] sm:text-[22px]", textColor, wordmarkClassName)}>
        Credyr
      </span>
      {taglineEl}
    </span>
  );
}

// ── Interactive Logo Showcase Component ──
interface BrandShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDirection: LogoDirection;
  onSelectDirection: (d: LogoDirection) => void;
}

export function BrandShowcaseModal({
  isOpen,
  onClose,
  selectedDirection,
  onSelectDirection,
}: BrandShowcaseModalProps) {
  if (!isOpen) return null;

  const refinements: Array<{
    id: LogoDirection;
    title: string;
    fontName: string;
    description: string;
    characteristics: string[];
  }> = [
    {
      id: "A1",
      title: "Option A1: Modern Sculptural Grotesque",
      fontName: "Plus Jakarta Sans (Medium, -0.035em tracking)",
      description:
        "Pure typographic confidence in title case. Balanced neo-grotesque letterforms with precision optical kerning and an architectural circular C monogram.",
      characteristics: [
        "Title case 'Credyr' with calibrated x-height and tight kerning",
        "Architectural geometric C glyph optimized for 16px to 64px",
        "Pure Swiss/Nordic modernism without decorative crutches",
      ],
    },
    {
      id: "A2",
      title: "Option A2: Contemporary Editorial Antiqua",
      fontName: "Newsreader Editorial Roman (Regular, -0.015em tracking)",
      description:
        "Haute editorial luxury in title case. High-contrast Roman letterforms with subtle teardrop terminals, conveying clinical lineage and partner-level prestige.",
      characteristics: [
        "Title case 'Credyr' with high-contrast vertical stress",
        "Editorial Serif C monogram with teardrop finial",
        "Ideal for high-trust specialist clinics and advisory practices",
      ],
    },
    {
      id: "A3",
      title: "Option A3: Humanist Geometric Arch",
      fontName: "Outfit Geometric (Semibold, -0.025em tracking)",
      description:
        "Architectural clarity meets humanist warmth. Pure circular bowls, open apertures, and a distinctive heavy-gauge geometric C arch monogram.",
      characteristics: [
        "Title case 'Credyr' with open geometric proportions",
        "Clean geometric C arch with rounded terminals",
        "Modern productized service clarity and high legibility",
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#fbfaf7] text-neutral-950 w-full max-w-5xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-neutral-200/80 my-8">
        <div className="flex items-start justify-between pb-6 border-b border-neutral-200">
          <div>
            <span className="text-[12px] font-semibold tracking-wider uppercase text-neutral-500">
              Direction A Refinements · Title Case
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal tracking-[-0.03em] text-neutral-950 mt-1">
              Credyr Typography-First Directions
            </h2>
            <p className="text-[15px] text-neutral-600 mt-1.5 max-w-2xl">
              Three genuinely different typographic executions of &ldquo;Credyr&rdquo; in title case, tested across realistic header size, light/dark canvases, and micro-favicons.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-8">
          {refinements.map((ref) => {
            const isSelected = selectedDirection === ref.id || (selectedDirection === "A" && ref.id === "A1");
            return (
              <div
                key={ref.id}
                className={cn(
                  "rounded-2xl p-6 sm:p-8 border transition-all",
                  isSelected
                    ? "border-neutral-900 bg-white shadow-md ring-1 ring-neutral-900"
                    : "border-neutral-200/80 bg-white/70 hover:border-neutral-300"
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-normal tracking-tight text-neutral-950">
                      {ref.title}
                    </h3>
                    <p className="text-[13.5px] font-mono text-neutral-500 mt-0.5">{ref.fontName}</p>
                    <p className="text-[14.5px] text-neutral-600 mt-1.5">{ref.description}</p>
                  </div>
                  <button
                    onClick={() => onSelectDirection(ref.id)}
                    className={cn(
                      "px-5 py-2 rounded-full text-[13.5px] font-medium transition-colors shrink-0",
                      isSelected
                        ? "bg-neutral-950 text-white"
                        : "border border-neutral-300 text-neutral-800 hover:border-neutral-900"
                    )}
                  >
                    {isSelected ? "Active on site" : "Preview on site"}
                  </button>
                </div>

                {/* Light & Dark & Warm Background Tests */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-[#fbfaf7] border border-neutral-200 rounded-xl p-5 flex flex-col justify-between min-h-[140px]">
                    <span className="text-[11px] font-mono text-neutral-500">Light Canvas (#fbfaf7)</span>
                    <div className="py-3 flex items-center justify-center">
                      <BrandLogo tone="dark" direction={ref.id} wordmarkClassName="text-2xl" />
                    </div>
                    <span className="text-[11px] text-neutral-400 text-center">Pure Wordmark</span>
                  </div>

                  <div className="bg-[#111110] border border-neutral-800 rounded-xl p-5 flex flex-col justify-between min-h-[140px]">
                    <span className="text-[11px] font-mono text-neutral-400">Dark Canvas (#111110)</span>
                    <div className="py-3 flex items-center justify-center">
                      <BrandLogo tone="light" direction={ref.id} wordmarkClassName="text-2xl" />
                    </div>
                    <span className="text-[11px] text-neutral-500 text-center">High Contrast UI</span>
                  </div>

                  <div className="bg-[#f0eee9] border border-neutral-200 rounded-xl p-5 flex flex-col justify-between min-h-[140px]">
                    <span className="text-[11px] font-mono text-neutral-500">With Monogram Mark</span>
                    <div className="py-3 flex items-center justify-center">
                      <BrandLogo tone="dark" direction={ref.id} showMark={true} wordmarkClassName="text-2xl" />
                    </div>
                    <span className="text-[11px] text-neutral-400 text-center">Wordmark + C Monogram</span>
                  </div>
                </div>

                {/* Favicon micro tests */}
                <div className="bg-[#f4f3ef] rounded-xl p-4 border border-neutral-200/80 flex items-center justify-around gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#111110] flex items-center justify-center shadow-sm">
                      {ref.id === "A1" && <LogoMarkA1 tone="light" className="h-6 w-6" />}
                      {ref.id === "A2" && <LogoMarkA2 tone="light" className="h-6 w-6" />}
                      {ref.id === "A3" && <LogoMarkA3 tone="light" className="h-6 w-6" />}
                    </div>
                    <span className="text-[12px] font-mono text-neutral-600">64px (Retina)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-[#111110] flex items-center justify-center shadow-sm">
                      {ref.id === "A1" && <LogoMarkA1 tone="light" className="h-3.5 w-3.5" />}
                      {ref.id === "A2" && <LogoMarkA2 tone="light" className="h-3.5 w-3.5" />}
                      {ref.id === "A3" && <LogoMarkA3 tone="light" className="h-3.5 w-3.5" />}
                    </div>
                    <span className="text-[12px] font-mono text-neutral-600">32px (Desktop tab)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-[3px] bg-[#111110] flex items-center justify-center shadow-sm">
                      {ref.id === "A1" && <LogoMarkA1 tone="light" className="h-2 w-2" />}
                      {ref.id === "A2" && <LogoMarkA2 tone="light" className="h-2 w-2" />}
                      {ref.id === "A3" && <LogoMarkA3 tone="light" className="h-2 w-2" />}
                    </div>
                    <span className="text-[12px] font-mono text-neutral-600">16px (Browser tab)</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
