import { Link, Redirect, useParams } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { ART, ClosingCta, CONTAINER, H2, LEAD, PageHero, PrimaryButton, usePageTitle } from "../components/site";
import { SiteFooter } from "../components/SiteFooter";

interface Sector {
  name: string;
  art: string;
  artPosition: string;
  title: string;
  lead: string;
  audience: string;
  needs: string[];
  build: { service: "websites" | "booking" | "conversion"; title: string; body: string }[];
}

const SECTORS: Record<string, Sector> = {
  dental: {
    name: "Dental practices",
    art: ART.hero,
    artPosition: "50% 45%",
    title: "Websites for dental practices that patients feel good about.",
    lead: "Help new patients understand your treatments, get to know your team and book with confidence.",
    audience: "patients",
    needs: [
      "Clear information about treatments and what they involve",
      "Who they’ll see, and their qualifications",
      "Reassurance if they’re nervous about the dentist",
      "Guidance on fees and payment options",
      "Location, parking and opening hours at a glance",
      "A simple way to book, on any device",
    ],
    build: [
      { service: "websites", title: "Treatment and team pages", body: "Calm, clear pages for each treatment and every member of your team." },
      { service: "booking", title: "Online booking", body: "New and existing patients book the right appointment type themselves." },
      { service: "conversion", title: "Treatment enquiry follow-up", body: "Consultation enquiries get a prompt reply and a clear next step." },
    ],
  },
  medical: {
    name: "Medical & clinics",
    art: ART.riverbank,
    artPosition: "50% 40%",
    title: "Websites for private clinics and specialists.",
    lead: "Give patients the clarity they look for before choosing a consultant or clinic, and an easy way to book.",
    audience: "patients",
    needs: [
      "Who the specialist is, and their training and experience",
      "Which conditions are treated, and what happens at a first visit",
      "Clear information on fees and insurance",
      "How referrals work, for patients and for GPs",
      "Reassurance that their information is handled with care",
      "A straightforward way to book or enquire",
    ],
    build: [
      { service: "websites", title: "Specialist and condition pages", body: "Pages that explain expertise and conditions in plain, reassuring language." },
      { service: "booking", title: "Consultation booking", body: "Patients choose an initial consultation that fits their schedule." },
      { service: "conversion", title: "Enquiry handling", body: "Every enquiry is acknowledged promptly and recorded for your team." },
    ],
  },
  aesthetics: {
    name: "Aesthetics",
    art: ART.sky,
    artPosition: "50% 30%",
    title: "Websites for aesthetic clinics that feel as refined as your treatments.",
    lead: "Present your treatments and practitioners with care, and make it simple to book a consultation.",
    audience: "clients",
    needs: [
      "Clear, responsible information about each treatment",
      "Who performs the treatment, and their qualifications",
      "What to expect before, during and after",
      "Transparent guidance on pricing",
      "Aftercare information they can return to",
      "An easy way to book a consultation",
    ],
    build: [
      { service: "websites", title: "Treatment pages", body: "Elegant pages that inform first and sell second, in your brand." },
      { service: "booking", title: "Consultation booking", body: "Clients book consultations and treatments online, at a time that suits them." },
      { service: "conversion", title: "Enquiry follow-up", body: "A personal reply to every enquiry, with a simple way to book." },
    ],
  },
  advisory: {
    name: "Advisory firms",
    art: ART.hero,
    artPosition: "50% 0%",
    title: "Websites for advisory firms that clients take seriously.",
    lead: "For legal, financial and consultancy firms: a website that communicates expertise clearly and makes the first conversation easy to arrange.",
    audience: "clients",
    needs: [
      "Which matters you advise on, explained clearly",
      "Who the advisers are, and their background",
      "Regulatory and professional information where it applies",
      "How an engagement works, and what it might cost",
      "A discreet way to make an enquiry",
      "An easy way to arrange an initial conversation",
    ],
    build: [
      { service: "websites", title: "Expertise and people pages", body: "Clear pages for your services and advisers, written for the clients you want." },
      { service: "booking", title: "Initial consultation booking", body: "Prospective clients arrange a first conversation without back-and-forth emails." },
      { service: "conversion", title: "Enquiry handling and CRM", body: "Enquiries are acknowledged promptly and recorded in your CRM." },
    ],
  },
};

export default function SectorPage() {
  // Params from the matched <Route> (see ServicePage for why not useRoute).
  const { id } = useParams<{ id: string }>();
  const sector = id ? SECTORS[id] : undefined;
  usePageTitle();
  if (!sector) return <Redirect to="/" replace />;

  return (
    <>
      <main>
        <PageHero art={sector.art} position={sector.artPosition} eyebrow={sector.name} title={sector.title} lead={sector.lead}>
          <PrimaryButton href="/get-started">Book a website audit</PrimaryButton>
        </PageHero>

        <section className="bg-white pb-20 md:pb-28">
          <div className={CONTAINER}>
            <div className="max-w-[640px]">
              <h2 className={H2}>What your {sector.audience} look for</h2>
              <p className={`${LEAD} mt-4`}>
                Before they get in touch, people want to understand what you do, who they’ll deal with and what
                happens next.
              </p>
            </div>
            <ul className="mt-12 grid grid-cols-1 gap-x-8 md:grid-cols-2">
              {sector.needs.map((n) => (
                <li key={n} className="flex gap-3 border-t border-[#ece9e3] py-5 text-[17px] leading-[1.5] text-[#3f3d3a]">
                  <Check size={18} className="mt-1 shrink-0 text-[#222221]" aria-hidden="true" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-[#f7f4ef] py-20 md:py-28">
          <div className={CONTAINER}>
            <h2 className={H2}>What we build</h2>
            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
              {sector.build.map((b) => (
                <Link
                  key={b.title}
                  href={`/product/${b.service}`}
                  className="group flex flex-col justify-between gap-8 rounded-[20px] bg-white p-7 transition-shadow hover:shadow-[0_20px_50px_-30px_rgba(40,30,20,0.4)]"
                >
                  <div>
                    <h3 className="text-[21px] tracking-[-0.03em] text-[#222221]">{b.title}</h3>
                    <p className="mt-2 text-[15.5px] leading-[1.55] text-[#6b6864]">{b.body}</p>
                  </div>
                  <ArrowRight size={18} className="text-[#222221] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
