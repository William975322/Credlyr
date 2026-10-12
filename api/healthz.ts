// Vercel Function: GET /api/healthz
//
// Confirms the API is deployed and whether contact delivery is configured.
// Reports a boolean only; configuration problems are written to the function
// logs, never to the public response.

const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;

function contactConfigured(env: Record<string, string | undefined>) {
  const from = (env.CONTACT_EMAIL_FROM ?? env.EMAIL_FROM)?.trim() ?? "";
  const fromAddress = from.match(/<([^>]+)>\s*$/)?.[1] ?? from;
  return (
    Boolean(env.RESEND_API_KEY?.trim()) &&
    EMAIL_RE.test((env.CONTACT_EMAIL_TO ?? env.EMAIL_TO)?.trim() ?? "") &&
    EMAIL_RE.test(fromAddress)
  );
}

export function GET() {
  return new Response(JSON.stringify({ status: "ok", contactConfigured: contactConfigured(process.env) }), {
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}
