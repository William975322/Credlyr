import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { ART, CONTAINER, PageHero, usePageTitle } from "../components/site";
import { SiteFooter } from "../components/SiteFooter";

const CONTACT_EMAIL = "hello@credyr.com";

const TOPICS = [
  "Website or landing page",
  "Appointment scheduling",
  "Lead response and CRM",
  "Website audit",
  "Something else",
];

type Status = "idle" | "sending" | "sent" | "error" | "limited";

const FIELD =
  "w-full rounded-xl border border-[#e3dfd8] bg-white px-4 py-3 text-[16px] text-[#222221] placeholder:text-[#a19d96] transition focus:border-[#222221] focus:outline-none focus:ring-2 focus:ring-[#222221]/10 disabled:opacity-60";
const LABEL = "mb-2 block text-[14px] font-medium text-[#222221]";

export default function ContactPage() {
  usePageTitle("Contact", "Get in touch with Credyr about your website, appointment scheduling or lead response.");
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: TOPICS[0], message: "", website: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);
      // Only confirm when the server says the message was actually delivered.
      setStatus(res.ok && data?.success ? "sent" : res.status === 429 ? "limited" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <main>
        <PageHero
          art={ART.riverbank}
          position="50% 35%"
          eyebrow="Contact"
          title="Let’s talk about your website."
          lead="Tell us a little about your practice and what you’d like to improve. For a structured review of your current site, book a website audit instead."
        />

        <section className="bg-white pb-24 md:pb-32">
          <div className={`${CONTAINER} grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16`}>
            <div className="flex flex-col gap-8">
              <div className="border-t border-[#222221] pt-6">
                <p className="text-[14px] text-[#6f6c66]">Email</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="mt-1 inline-block text-[20px] tracking-[-0.02em] text-[#222221] underline-offset-4 hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div className="border-t border-[#ece9e3] pt-6">
                <p className="text-[14px] text-[#6f6c66]">Prefer to talk it through?</p>
                <Link href="/get-started" className="mt-2 inline-flex items-center gap-1.5 text-[17px] text-[#222221] underline-offset-4 hover:underline">
                  Book a website audit <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-[24px] bg-[#f7f4ef] p-6 sm:p-10">
              {status === "sent" ? (
                <div role="status" className="flex flex-col items-start gap-4 py-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#222221] text-white">
                    <Check size={20} aria-hidden="true" />
                  </span>
                  <h2 className="text-[28px] tracking-[-0.04em] text-[#222221]">Thank you, we’ve received your message.</h2>
                  <p className="text-[16px] leading-[1.6] text-[#5f5c58]">We’ll reply by email.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Honeypot for bots: hidden from people and assistive tech. */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label htmlFor="c-website">Website</label>
                    <input id="c-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-name" className={LABEL}>Name</label>
                      <input id="c-name" required autoComplete="name" value={form.name} onChange={set("name")} disabled={status === "sending"} className={FIELD} />
                    </div>
                    <div>
                      <label htmlFor="c-email" className={LABEL}>Email</label>
                      <input id="c-email" type="email" required autoComplete="email" value={form.email} onChange={set("email")} disabled={status === "sending"} className={FIELD} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-phone" className={LABEL}>
                        Phone <span className="font-normal text-[#6f6c66]">(optional)</span>
                      </label>
                      <input id="c-phone" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} disabled={status === "sending"} className={FIELD} />
                    </div>
                    <div>
                      <label htmlFor="c-topic" className={LABEL}>What can we help with?</label>
                      <select id="c-topic" value={form.service} onChange={set("service")} disabled={status === "sending"} className={FIELD}>
                        {TOPICS.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-message" className={LABEL}>Message</label>
                    <textarea id="c-message" rows={5} value={form.message} onChange={set("message")} disabled={status === "sending"} className={`${FIELD} resize-y`} />
                  </div>

                  {status === "limited" && (
                    <p role="alert" className="rounded-xl bg-[#fbeae6] px-4 py-3 text-[15px] leading-[1.5] text-[#8a2f1d]">
                      You’ve sent several messages in a short time. Please try again later, or email us at{" "}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
                    </p>
                  )}
                  {status === "error" && (
                    <p role="alert" className="rounded-xl bg-[#fbeae6] px-4 py-3 text-[15px] leading-[1.5] text-[#8a2f1d]">
                      Sorry, we couldn’t send your message. Please email us at{" "}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a> or book a website audit instead.
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#16100c] px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-60"
                    >
                      {status === "sending" ? "Sending…" : "Send message"}
                    </button>
                    <p className="text-[13.5px] leading-[1.5] text-[#6f6c66]">
                      We use your details only to reply. See our <Link href="/privacy" className="underline">privacy notice</Link>.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
