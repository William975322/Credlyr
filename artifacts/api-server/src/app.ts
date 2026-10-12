import express from "express";
import cors from "cors";
import { pinoHttp } from "pino-http";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

const app = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: any) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: any) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
// The site and API share an origin; only Credyr's own domains (and local
// development) may call the API from a browser.
app.use(
  cors({
    origin: [
      "https://credyr.com",
      "https://www.credyr.com",
      /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/,
    ],
  }),
);
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.json({ limit: "20kb" }));

import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "../public");

app.use("/api", router);

app.use(express.static(publicDir));

// Single-page app fallback. Express 5 no longer accepts "*" as a path, so
// this is middleware; unknown /api routes still return a JSON 404.
app.use("/api", (_req: any, res: any) => {
  res.status(404).json({ error: "Not found" });
});
app.use((req: any, res: any) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.status(404).end();
    return;
  }
  res.sendFile(path.join(publicDir, "index.html"));
});

export default app;
