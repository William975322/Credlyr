import { ART, PageHero, PrimaryButton, usePageTitle } from "../components/site";
import { SiteFooter } from "../components/SiteFooter";

export default function NotFound() {
  usePageTitle("Page not found");
  return (
    <>
      <main>
        <PageHero
          art={ART.sky}
          position="50% 30%"
          eyebrow="Page not found"
          title="This page doesn’t exist."
          lead="It may have moved, or the link may be out of date."
        >
          <PrimaryButton href="/">Back to the homepage</PrimaryButton>
        </PageHero>
        <div className="h-16 bg-white md:h-24" />
      </main>
      <SiteFooter />
    </>
  );
}
