import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";

export { NOT_FOUND_SEO, PAGES, SITE_URL, canonicalUrl, pageSeo } from "./seo";

/** Render one route to HTML. `url` is a path such as `/product/websites`. */
export function render(url: string) {
  return renderToString(
    <Router ssrPath={url}>
      <App />
    </Router>,
  );
}
