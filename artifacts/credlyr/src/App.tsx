import { useEffect, useLayoutEffect, useRef } from "react";
import { MotionConfig } from "framer-motion";
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

  // New pages start at the top; Back and Forward return to where the visitor
  // was on that page. The browser cannot do this itself here, because the
  // page content is rendered after the history change.
  const positions = useRef(new Map<string, number>());
  const popped = useRef(false);
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    // Capture phase, so this runs before wouter's own popstate listener,
    // which re-renders the new route synchronously.
    const onPop = () => (popped.current = true);
    window.addEventListener("popstate", onPop, true);
    return () => window.removeEventListener("popstate", onPop, true);
  }, []);
  useLayoutEffect(() => {
    window.scrollTo(0, popped.current ? (positions.current.get(location) ?? 0) : 0);
    popped.current = false;
    const save = () => positions.current.set(location, window.scrollY);
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, [location]);

  // The root background is what macOS and iOS show when the page is pulled
  // past either end. Match the hero near the top and the footer near the
  // bottom (see index.css).
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const apply = () => {
      frame = 0;
      const middle = (root.scrollHeight - window.innerHeight) / 2;
      root.dataset.overscroll = middle > 0 && window.scrollY > middle ? "bottom" : "top";
    };
    const update = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [location]);

  return (
    <MotionConfig reducedMotion="user">
      <BrandProvider>
        <div className="min-h-screen bg-white">
          <a
            href="#content"
            className="sr-only z-[110] rounded-full bg-[#16100c] text-[15px] font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:px-5 focus:py-3"
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
    </MotionConfig>
  );
}
