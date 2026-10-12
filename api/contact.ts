// Vercel Function: POST /api/contact
//
// Delivers website enquiries to Credyr's inbox through Resend. The response
// reports `success: true` only when Resend has accepted the email, so the
// website never confirms a message that was not delivered.
//
// Required environment variables (see /api/healthz and LAUNCH.md):
//   RESEND_API_KEY      Resend API key with sending access
//   CONTACT_EMAIL_TO    Inbox that receives enquiries, e.g. hello@credyr.com
//   CONTACT_EMAIL_FROM  Sender on a Resend-verified domain,
//                       e.g. "Credyr Website <website@credyr.com>"
//
// No email is ever sent to the visitor's address.

type Env = Record<string, string | undefined>;

interface Deps {
  env: Env;
  fetch: typeof fetch;
  now: () => number;
}

const MAX_BODY_BYTES = 20_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;

// Best-effort rate limit, per warm function instance. It slows bursts; a hard
// global limit needs Vercel Firewall rules (see LAUNCH.md).
const recent = new Map<string, number[]>();

export function resetRateLimit() {
  recent.clear();
}

function rateLimited(key: string, now: number) {
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > MAX_PER_WINDOW;
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Validates the delivery configuration without exposing secret values. */
export function readConfig(env: Env) {
  const apiKey = env.RESEND_API_KEY?.trim() ?? "";
  const to = (env.CONTACT_EMAIL_TO ?? env.EMAIL_TO)?.trim() ?? "";
  const from = (env.CONTACT_EMAIL_FROM ?? env.EMAIL_FROM)?.trim() ?? "";
  const fromAddress = from.match(/<([^>]+)>\s*$/)?.[1] ?? from;
  const problems: string[] = [];
  if (!apiKey) problems.push("RESEND_API_KEY is not set");
  if (!EMAIL_RE.test(to)) problems.push("CONTACT_EMAIL_TO is not a valid email address");
  if (!EMAIL_RE.test(fromAddress)) problems.push("CONTACT_EMAIL_FROM is not a valid sender");
  return { ok: problems.length === 0, problems, apiKey, to, from };
}

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

function clientKey(request: Request) {
  const fwd = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown";
  return fwd.split(",")[0].trim();
}

export async function handleContact(
  request: Request,
  deps: Deps = { env: process.env, fetch: globalThis.fetch, now: Date.now },
): Promise<Response> {
  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return json(415, { success: false, error: "unsupported_media_type" });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { success: false, error: "too_large" });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
    if (!body || typeof body !== "object") throw new Error("not an object");
  } catch {
    return json(400, { success: false, error: "invalid_json" });
  }

  // Honeypot: people never see or fill the "website" field. Reject quietly;
  // never report success for something that was not delivered.
  if (clean(body.website, 200)) return json(422, { success: false, error: "rejected" });

  if (rateLimited(clientKey(request), deps.now())) {
    return json(429, { success: false, error: "rate_limited" });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  if (!name || !EMAIL_RE.test(email)) {
    return json(400, { success: false, error: "invalid_input" });
  }
  const lead = {
    name,
    email,
    phone: clean(body.phone, 40),
    service: clean(body.service, 80) || "General enquiry",
    message: clean(body.message, 5000),
    submittedAt: new Date(deps.now()).toISOString(),
  };

  const config = readConfig(deps.env);
  if (!config.ok) {
    console.error("Contact delivery is not configured:", config.problems.join("; "));
    return json(503, { success: false, error: "not_configured" });
  }

  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone || "—"],
    ["Topic", lead.service],
    ["Message", lead.message || "—"],
    ["Submitted", lead.submittedAt],
  ];
  const html = `<h2>New enquiry from credyr.com</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td valign="top"><strong>${k}</strong></td><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  try {
    const res = await deps.fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: lead.email,
        subject: `New enquiry: ${lead.name} (${lead.service})`.replace(/[\r\n]+/g, " "),
        html,
        text,
      }),
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json().catch(() => null)) as { id?: string } | null;
    if (!res.ok || !data?.id) {
      console.error("Resend rejected the enquiry:", res.status);
      return json(502, { success: false, error: "delivery_failed" });
    }
    // Log without personal data.
    console.log("Enquiry delivered:", { id: data.id, topic: lead.service });
    return json(200, { success: true });
  } catch (err) {
    console.error("Resend request failed:", err instanceof Error ? err.name : "unknown");
    return json(502, { success: false, error: "delivery_failed" });
  }
}

export function POST(request: Request) {
  return handleContact(request);
}
