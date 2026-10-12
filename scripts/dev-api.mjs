// Local stand-in for Vercel Functions: serves the handlers in /api on
// http://127.0.0.1:3901 so the Vite dev server can proxy /api to them.
// Uses whatever RESEND_* / CONTACT_* variables are in your shell; without
// them the contact endpoint honestly reports "not_configured".
//
// Usage: node scripts/dev-api.mjs
import { createServer } from "node:http";
import { readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const PORT = Number(process.env.API_PORT || 3901);
const apiDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../api");

const routes = {};
for (const file of readdirSync(apiDir)) {
  if (!file.endsWith(".ts") || file.startsWith("_")) continue;
  routes[`/api/${file.replace(/\.ts$/, "")}`] = await import(pathToFileURL(path.join(apiDir, file)).href);
}

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const mod = routes[url.pathname];
  const handler = mod?.[req.method];
  if (!mod || !handler) {
    res.writeHead(mod ? 405 : 404, { "Content-Type": "application/json" }).end(JSON.stringify({ error: mod ? "method_not_allowed" : "not_found" }));
    return;
  }
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const request = new Request(url, {
    method: req.method,
    headers: { ...req.headers, "x-forwarded-for": req.socket.remoteAddress ?? "local" },
    body: ["GET", "HEAD"].includes(req.method) ? undefined : Buffer.concat(chunks),
  });
  const response = await handler(request);
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(Buffer.from(await response.arrayBuffer()));
}).listen(PORT, "127.0.0.1", () => {
  console.log(`Local API on http://127.0.0.1:${PORT} — routes: ${Object.keys(routes).join(", ")}`);
});
