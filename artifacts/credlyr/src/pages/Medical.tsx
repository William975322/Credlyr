import IndustryPage from "./IndustryPage";
export default function MedicalPage() {
  return <IndustryPage data={{
    name: "Medical Clinics",
    tagline: "A patient-first digital presence that builds trust before the first appointment.",
    description: "Medical patients research extensively before choosing a clinic. Your website needs to project professional credibility, answer their questions, and make booking effortless.",
    hero: "medical",
    painPoints: [
      "Outdated website that doesn't reflect your clinical quality",
      "No clear pathway from landing to appointment booking",
      "Patients can't find your specialities or team online",
      "Missing accreditation and trust credentials on-site",
      "Poor performance on mobile where most searches happen",
      "No structured FAQ or symptom guidance content",
    ],
    features: [
      { title: "Professional, clinical aesthetic", desc: "Clean, reassuring design that communicates expertise and care — without feeling cold or corporate." },
      { title: "Specialist & team pages", desc: "Individual pages for each specialist with credentials, approach, and patient-friendly bios that build personal trust." },
      { title: "Treatment information hub", desc: "Structured, SEO-optimised service pages that answer patient questions and support informed decision-making." },
      { title: "Insurance & payment clarity", desc: "Clear, easy-to-find information on accepted insurance, payment options, and what to expect — reducing friction." },
      { title: "Appointment booking integration", desc: "Seamless booking flow integrated with your existing system — patients book without needing to call." },
      { title: "CQC & accreditation display", desc: "Your certifications, affiliations, and accreditations are front-and-centre so patients trust you before they arrive." },
    ],
    ctaLine: "Ready to create a digital presence that reflects your clinical standards?",
  }} />;
}
