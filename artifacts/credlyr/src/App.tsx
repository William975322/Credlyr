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
import NotFound from "./pages/not-found";
import BrandShowcasePage from "./pages/BrandShowcase";

// Re-exported for archived pages that still import the footer from App.
export { SiteFooter };

// Retired URLs and where they now lead. Pages with invented content (reviews,
// status, news, partners, community, docs, security claims) were removed;
// off-positioning pages point to their closest current equivalent.
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
  ["/resources-hub/:rest*", "/"],
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

  return (
    <BrandProvider>
      <div className="min-h-screen bg-white">
        <SiteNav />
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
          {import.meta.env.DEV && <Route path="/brand" component={BrandShowcasePage} />}
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrandProvider>
  );
}
