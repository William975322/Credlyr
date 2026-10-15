// Tests for the Vercel functions in /api. Resend is always mocked, so no
// email is ever sent. Run with: node --test tests/
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { handleContact, readConfig, resetRateLimit } from "../api/contact.ts";
import { GET as health } from "../api/healthz.ts";

const ENV = {
  RESEND_API_KEY: "re_test_key",
  CONTACT_EMAIL_TO: "hello@olerivo.com",
  CONTACT_EMAIL_FROM: "Olerivo Website <website@notify.olerivo.com>",
};

let ip = 0;
function req(body, { contentType = "application/json", raw } = {}) {
  ip += 1; // a fresh client per request unless a test pins it
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": contentType, "x-forwarded-for": `10.0.0.${ip}` },
    body: raw ?? JSON.stringify(body),
  });
}

function mockFetch(response) {
  const calls = [];
  const fn = async (url, init) => {
    calls.push({ url, init, body: JSON.parse(init.body) });
    if (response instanceof Error) throw response;
    return new Response(JSON.stringify(response.body), { status: response.status });
  };
  return { fn, calls };
}

const deps = (fetchMock, env = ENV) => ({ env, fetch: fetchMock.fn, now: Date.now });
const valid = { name: "Test Visitor", email: "visitor@example.test", service: "Website audit", message: "Hello" };

beforeEach(() => resetRateLimit());

test("rejects non-JSON requests", async () => {
  const m = mockFetch({ status: 200, body: { id: "x" } });
  const res = await handleContact(req(null, { contentType: "text/plain", raw: "hi" }), deps(m));
  assert.equal(res.status, 415);
  assert.equal(m.calls.length, 0);
});

test("rejects malformed JSON", async () => {
  const m = mockFetch({ status: 200, body: { id: "x" } });
  const res = await handleContact(req(null, { raw: "{not json" }), deps(m));
  assert.equal(res.status, 400);
});

test("rejects oversized bodies", async () => {
  const m = mockFetch({ status: 200, body: { id: "x" } });
  const res = await handleContact(req({ ...valid, message: "a".repeat(30000) }), deps(m));
  assert.equal(res.status, 413);
  assert.equal(m.calls.length, 0);
});

test("rejects honeypot submissions without delivering or claiming success", async () => {
  const m = mockFetch({ status: 200, body: { id: "x" } });
  const res = await handleContact(req({ ...valid, website: "http://spam.test" }), deps(m));
  assert.equal(res.status, 422);
  assert.equal((await res.json()).success, false);
  assert.equal(m.calls.length, 0);
});

test("validates name and email", async () => {
  const m = mockFetch({ status: 200, body: { id: "x" } });
  assert.equal((await handleContact(req({ ...valid, email: "nope" }), deps(m))).status, 400);
  assert.equal((await handleContact(req({ ...valid, name: "  " }), deps(m))).status, 400);
  assert.equal(m.calls.length, 0);
});

test("reports not configured honestly when env vars are missing", async () => {
  const m = mockFetch({ status: 200, body: { id: "x" } });
  const res = await handleContact(req(valid), deps(m, {}));
  assert.equal(res.status, 503);
  assert.deepEqual(await res.json(), { success: false, error: "not_configured" });
  assert.equal(m.calls.length, 0);
});

test("delivers to the inbox only, with reply-to the visitor and escaped HTML", async () => {
  const m = mockFetch({ status: 200, body: { id: "email_123" } });
  const res = await handleContact(req({ ...valid, name: "<script>alert(1)</script>" }), deps(m));
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { success: true });
  assert.equal(m.calls.length, 1, "exactly one email: no auto-reply to the visitor");
  const sent = m.calls[0].body;
  assert.deepEqual(sent.to, ["hello@olerivo.com"]);
  assert.equal(sent.reply_to, "visitor@example.test");
  assert.equal(sent.from, "Olerivo Website <website@notify.olerivo.com>");
  assert.ok(!sent.html.includes("<script>"));
  assert.ok(sent.html.includes("&lt;script&gt;"));
  assert.equal(m.calls[0].init.headers.Authorization, "Bearer re_test_key");
});

test("does not claim success when Resend rejects the email", async () => {
  const m = mockFetch({ status: 403, body: { message: "domain not verified" } });
  const res = await handleContact(req(valid), deps(m));
  assert.equal(res.status, 502);
  assert.equal((await res.json()).success, false);
});

test("does not claim success when Resend returns no email id", async () => {
  const m = mockFetch({ status: 200, body: {} });
  assert.equal((await handleContact(req(valid), deps(m))).status, 502);
});

test("does not claim success when the network request fails", async () => {
  const m = mockFetch(new Error("timeout"));
  assert.equal((await handleContact(req(valid), deps(m))).status, 502);
});

test("rate limits repeated submissions from one client", async () => {
  const m = mockFetch({ status: 200, body: { id: "x" } });
  const statuses = [];
  for (let i = 0; i < 7; i++) {
    const r = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.9" },
      body: JSON.stringify(valid),
    });
    statuses.push((await handleContact(r, deps(m))).status);
  }
  assert.deepEqual(statuses, [200, 200, 200, 200, 200, 429, 429]);
});

test("readConfig flags invalid settings without exposing values", () => {
  const c = readConfig({ RESEND_API_KEY: "", CONTACT_EMAIL_TO: "x", CONTACT_EMAIL_FROM: "Olerivo <bad>" });
  assert.equal(c.ok, false);
  assert.equal(c.problems.length, 3);
  assert.ok(readConfig(ENV).ok);
});

test("health check reports only a boolean", async () => {
  const saved = { ...process.env };
  try {
    for (const k of Object.keys(ENV)) delete process.env[k];
    assert.deepEqual(await health().json(), { status: "ok", contactConfigured: false });
    Object.assign(process.env, ENV);
    assert.deepEqual(await health().json(), { status: "ok", contactConfigured: true });
  } finally {
    for (const k of Object.keys(ENV)) delete process.env[k];
    Object.assign(process.env, saved);
  }
});
