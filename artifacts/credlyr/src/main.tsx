import { createRoot, hydrateRoot } from "react-dom/client";
import { Router } from "wouter";
import App from "./App";
import "./fonts.css";
import "./index.css";

const container = document.getElementById("root")!;
// Router with no ssrPath reads the real URL, which matches the path used at
// build time. Hydrate when the HTML was pre-rendered; otherwise mount fresh
// (local dev, where the root is empty).
const app = (
  <Router>
    <App />
  </Router>
);

if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
