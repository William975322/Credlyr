import { motion } from "framer-motion";
import { ShieldCheck, Check } from "lucide-react";
import { SiteFooter } from "../App";

export default function Trust() {
  const securityPillars = [
    {
      title: "Static Build Architecture",
      desc: "By pre-rendering page structures into static HTML, we completely eliminate database requests and backend query load. Your site serves instantly while keeping your core database completely unreachable from the public web.",
    },
    {
      title: "Automated SSL & Encryption",
      desc: "Every deployed page is provisioned with automated, auto-renewing Let's Encrypt SSL/TLS certificates. All connection tunnels are enforced with strict transport security protocols.",
    },
    {
      title: "DDoS Protection & Caching",
      desc: "Global caching rules keep your assets cached at edge locations, preventing database strain or server exhaustion. Traffic surges are scaled natively across AWS infrastructure.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-gray-950 pt-0 pb-0 px-0 flex flex-col justify-between animate-fade-in">
      
      {/* ─── 1. Hero Section ─── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f5f3ec] to-[#fbfaf7] pt-36 pb-20 md:pt-48 md:pb-28 text-center px-5 sm:px-6">
        {/* Soft colorful glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-45"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(99, 102, 241, 0.12) 0%, rgba(59, 130, 246, 0.08) 40%, transparent 70%)",
          }}
        />

        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
          {/* Badge */}
          <span className="px-4 py-1.5 rounded-full border border-neutral-200 bg-white text-[13px] text-neutral-600 font-semibold mb-6 shadow-sm">
            Trust
          </span>

          {/* Headline */}
          <h1 className="max-w-3xl text-balance text-4xl sm:text-5xl md:text-6xl lg:text-[66px] leading-[1.04] tracking-tight font-serif italic font-normal text-gray-950 mb-6">
            Engineered for credibility
          </h1>

          {/* Subtitle */}
          <p className="max-w-[660px] text-balance text-[17px] sm:text-[19px] md:text-[21px] leading-[1.48] text-neutral-600 font-normal mb-0">
            In the AI awareness cycle, your website is the ultimate trust-and-conversion hub. Choosing a partner to design, write, and build your digital footprint is a critical decision: we therefore uphold high standards of performance, security, and edge-hosting reliability.
          </p>
        </div>
      </section>

      {/* ─── 2. Secure Infrastructure Section (2-Column Grid) ─── */}
      <section className="bg-white py-24 md:py-32 px-5 sm:px-8 md:px-10 border-t border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center text-left">
          
          {/* Left Column: Copy */}
          <div className="flex flex-col items-start">
            <h2 className="text-3xl md:text-4xl lg:text-[46px] font-bold tracking-tight text-gray-950 mb-6 leading-tight">
              Secure & performant infrastructure
            </h2>
            <div className="space-y-6 text-base md:text-lg text-neutral-600 leading-relaxed font-normal">
              <p>
                Our websites are built using static architecture and deployed directly to global edge networks (AWS CloudFront CDN integration). By serving pre-rendered static HTML, CSS, and lightweight JS from secure edge servers close to your visitors, we deliver sub-second load times worldwide while completely eliminating traditional database load lag. Because there is no database running on the server, your website is immune to SQL injections, database breaches, and server-side exploits.
              </p>
              <p>
                For delivery and hosting, we enforce secure HTTPS encryption, automated SSL certificates, and isolated static environments. This means only clean, compiled code is served to your customers, protecting your brand from malware or defacement. Combined with automated uptime checks and intelligent caching rules, our website infrastructure is engineered to handle massive viral traffic spikes effortlessly while keeping your business-critical lead generation forms operational 24/7.
              </p>
            </div>
          </div>

          {/* Right Column: High-Fidelity Edge Map SVG */}
          <div className="bg-[#f5f3ec] border border-[#e6e2da] rounded-[28px] p-6 md:p-8 flex flex-col justify-between aspect-[16/11] overflow-hidden select-none">
            <div className="flex justify-between items-center border-b border-neutral-200/60 pb-3">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
                Global Latency Map
              </span>
              <span className="text-[10px] text-[#00c060] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c060] animate-pulse" />
                Active Distribution
              </span>
            </div>

            {/* Network map canvas */}
            <div className="flex-1 relative flex items-center justify-center my-4">
              <svg viewBox="0 0 400 220" className="w-full h-full text-neutral-300">
                {/* Connecting lines */}
                <path d="M70,80 L200,110 M200,110 L330,60 M200,110 L150,160 M200,110 L280,170 M70,80 L150,160 M330,60 L280,170" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                
                {/* Central Server Hub Node */}
                <circle cx="200" cy="110" r="10" className="fill-neutral-900 stroke-white" strokeWidth="2" />
                
                {/* Edge nodes */}
                <circle cx="70" cy="80" r="5" className="fill-indigo-500" />
                <circle cx="330" cy="60" r="5" className="fill-purple-500" />
                <circle cx="150" cy="160" r="5" className="fill-pink-500" />
                <circle cx="280" cy="170" r="5" className="fill-blue-500" />

                {/* Node labels */}
                <text x="70" y="68" textAnchor="middle" className="text-[9px] font-mono font-bold fill-gray-900">New York</text>
                <text x="70" y="93" textAnchor="middle" className="text-[8px] font-mono fill-[#00c060] font-semibold">8ms</text>

                <text x="330" y="48" textAnchor="middle" className="text-[9px] font-mono font-bold fill-gray-900">London</text>
                <text x="330" y="73" textAnchor="middle" className="text-[8px] font-mono fill-[#00c060] font-semibold">12ms</text>

                <text x="150" y="183" textAnchor="middle" className="text-[9px] font-mono font-bold fill-gray-900">Amsterdam</text>
                <text x="150" y="195" textAnchor="middle" className="text-[8px] font-mono fill-[#00c060] font-semibold">10ms</text>

                <text x="280" y="158" textAnchor="middle" className="text-[9px] font-mono font-bold fill-gray-900">Tokyo</text>
                <text x="280" y="183" textAnchor="middle" className="text-[8px] font-mono fill-[#00c060] font-semibold">28ms</text>

                {/* Secure Badge overlay */}
                <g transform="translate(185, 95)" className="text-white">
                  <path d="M15,5 L25,10 V20 C25,26 15,30 15,30 C15,30 5,26 5,20 V10 Z" className="fill-neutral-900 stroke-white" strokeWidth="1.5" />
                  <path d="M11,18 L14,21 L20,14" stroke="#00c060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </g>
              </svg>
            </div>

            <div className="flex justify-between items-end border-t border-neutral-200/60 pt-3 text-[10px] text-neutral-400 font-mono">
              <span>AWS CLOUDFRONT CDN</span>
              <span>100% SECURE EDGE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. Compliance & Pillars Section ─── */}
      <section className="bg-[#fbfaf8] py-24 md:py-32 px-5 sm:px-8 md:px-10 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {securityPillars.map((p, idx) => (
              <div
                key={p.title}
                className="bg-white border border-neutral-200/60 rounded-3xl p-8 flex flex-col justify-between min-h-[240px] hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-800 border border-neutral-200 mb-6">
                  <ShieldCheck size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-950 mb-3 tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Site Footer */}
      <SiteFooter />
    </div>
  );
}
