import { useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "wouter";
import { BrandProvider } from "./components/BrandLogo";
import { SiteNav } from "./components/SiteNav";
import { SiteFooter } from "./components/SiteFooter";
import HomePage from "./pages/Home";
import ServicePage from "./pages/ServicePage";
import SectorPage from "./pages/Sector";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import BookingPage from "./pages/Booking";
import ThanksPage from "./pages/Thanks";
import PrivacyPage from "./pages/Privacy";
import LegalPage from "./pages/Legal";
import NotFound from "./pages/not-found";
import BrandShowcasePage from "./pages/BrandShowcase";

// Re-exported for archived pages that still import the footer from App.
export { SiteFooter };

// Retired URLs and where they now lead. Pages with invented content (reviews,
// status, news, partners, community, docs, security claims) were removed;
// off-positioning pages point to their closest current equivalent.
// Keep in sync with the permanent redirects in vercel.json, which handle these
// on Vercel before the app loads; this list covers local development.
const REDIRECTS: [string, string][] = [
  ["/status", "/"],
  ["/customers/reviews", "/"],
  ["/customers/partners", "/"],
  ["/customers/community", "/"],
  ["/docs", "/"],
  ["/news", "/about"],
  ["/careers", "/about"],
  ["/security", "/privacy"],
  ["/trust", "/privacy"],
  ["/resources-hub", "/"],
  ["/resources-hub/*", "/"],
  ["/services/brand-strategy", "/industries/advisory"],
  ["/services/visual-identity", "/product/websites"],
  ["/services/optimisation", "/product/websites"],
  ["/industries/spas", "/industries/aesthetics"],
  ["/industries/home-services", "/"],
  ["/industries/real-estate", "/"],
];

export default function App() {
  const [location] = useLocation();

  // Start each route at the top of the page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // The root background is what macOS and iOS show when the page is pulled
  // past either end. Match the hero near the top and the footer near the
  // bottom (see index.css).
  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      const middle = (root.scrollHeight - window.innerHeight) / 2;
      root.dataset.overscroll = middle > 0 && window.scrollY > middle ? "bottom" : "top";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [location]);

  return (
    <BrandProvider>
      <div className="min-h-screen bg-white">
        <a
          href="#content"
          className="sr-only z-[110] rounded-full bg-[#16100c] px-5 py-3 text-[15px] font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteNav />
        <div id="content" tabIndex={-1} className="outline-none">
          <Switch>
            <Route path="/">
              <>
                <HomePage />
                <SiteFooter />
              </>
            </Route>
            {/* Redirects come before dynamic routes so they take precedence. */}
            {REDIRECTS.map(([from, to]) => (
              <Route key={from} path={from}>
                <Redirect to={to} replace />
              </Route>
            ))}
            <Route path="/product/:id" component={ServicePage} />
            <Route path="/industries/:id" component={SectorPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/get-started" component={BookingPage} />
            <Route path="/thanks" component={ThanksPage} />
            <Route path="/privacy" component={PrivacyPage} />
            <Route path="/legal" component={LegalPage} />
            {import.meta.env.DEV && <Route path="/brand" component={BrandShowcasePage} />}
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </BrandProvider>
  );
}
