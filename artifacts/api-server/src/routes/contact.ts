import { Router } from "express";

const router = Router();

// Escape user input before it is placed in email HTML.
const escapeHtml = (value: unknown) =>
  String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Best-effort rate limit: 5 submissions per IP per 10 minutes. On serverless
// hosting this is per warm instance, so it slows bursts rather than
// guaranteeing a global limit.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > MAX_PER_WINDOW;
}

const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

router.post("/contact", async (req, res) => {
  const body = req.body ?? {};

  // Honeypot: real visitors never see or fill the "website" field. Pretend
  // success so bots get no signal, but deliver nothing.
  if (clean(body.website, 200)) {
    res.json({ success: true });
    return;
  }

  const ip = String(req.headers["x-forwarded-for"] ?? req.socket.remoteAddress ?? "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    res.status(429).json({ success: false, error: "Too many submissions. Please try again later." });
    return;
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  if (!name || !EMAIL_RE.test(email)) {
    res.status(400).json({ success: false, error: "A name and a valid email address are required." });
    return;
  }

  const payload = {
    name,
    email,
    phone: clean(body.phone, 40),
    message: clean(body.message, 5000),
    service: clean(body.service, 80) || "General Inquiry",
    submittedAt: new Date().toISOString(),
  };

  // Log without personal data; the lead itself goes to the delivery channels.
  console.log("New contact form submission:", { service: payload.service, submittedAt: payload.submittedAt });

  const results: Record<string, any> = {
    supabase: "skipped",
    resend: "skipped",
    webhook: "skipped",
  };

  // 1. Supabase integration (direct REST API)
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal",
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          message: payload.message,
          service: payload.service,
          submitted_at: payload.submittedAt,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Supabase insert failed:", response.statusText, text);
        results.supabase = `failed: ${response.status} ${response.statusText}`;
      } else {
        results.supabase = "success";
      }
    } catch (err: any) {
      console.error("Supabase integration error:", err);
      results.supabase = `error: ${err.message || err}`;
    }
  }

  // 2. Resend Email integration (direct REST API)
  const resendKey = process.env.RESEND_API_KEY;
  const emailTo = process.env.EMAIL_TO || "william.vanderplaetse@gmail.com";
  const emailFrom = process.env.EMAIL_FROM || "onboarding@credyr.com";

  if (resendKey) {
    try {
      // Send notification to admin (site owner)
      const adminEmailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Credyr Leads <${emailFrom}>`,
          to: [emailTo],
          subject: `New Lead: ${payload.name} (${payload.service})`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p>A new lead has submitted the contact form on Credyr.</p>
            <ul>
              <li><strong>Name:</strong> ${escapeHtml(payload.name)}</li>
              <li><strong>Email:</strong> ${escapeHtml(payload.email)}</li>
              <li><strong>Phone:</strong> ${escapeHtml(payload.phone)}</li>
              <li><strong>Interested Service:</strong> ${escapeHtml(payload.service)}</li>
              <li><strong>Message:</strong> ${escapeHtml(payload.message || "None provided")}</li>
              <li><strong>Submitted At:</strong> ${escapeHtml(payload.submittedAt)}</li>
            </ul>
          `,
        }),
      });

      if (!adminEmailRes.ok) {
        const text = await adminEmailRes.text();
        console.error("Resend admin notification failed:", text);
        results.resend = `failed: ${adminEmailRes.status}`;
      } else {
        results.resend = "success";
      }

      // Send auto-response confirmation to the lead/customer
      const customerEmailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Credyr <${emailFrom}>`,
          to: [payload.email],
          subject: "Thank you for reaching out to Credyr",
          html: `
            <p>Hi ${escapeHtml(payload.name)},</p>
            <p>Thanks for your interest in Credyr! We've received your information and we'll reach out to you shortly.</p>
            <p>If you'd like to book a call with us right away, you can schedule one anytime on our calendar:</p>
            <p><a href="https://credyr.com/get-started" style="display:inline-block;padding:10px 20px;background-color:#000000;color:#ffffff;text-decoration:none;border-radius:999px;font-weight:bold;">Schedule a call now</a></p>
            <p>Best regards,<br/>The Credyr Team</p>
          `,
        }),
      });

      if (!customerEmailRes.ok) {
        const text = await customerEmailRes.text();
        console.error("Resend auto-response failed:", text);
      }
    } catch (err: any) {
      console.error("Resend email error:", err);
      results.resend = `error: ${err.message || err}`;
    }
  }

  // 3. Webhook notification (Slack/Discord Webhook)
  const webhookUrl = process.env.WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const isDiscord = webhookUrl.includes("discord.com");
      const body = isDiscord 
        ? {
            content: `🎉 **New Lead Received on Credyr!**\n• **Name:** ${payload.name}\n• **Email:** ${payload.email}\n• **Phone:** ${payload.phone}\n• **Service:** ${payload.service}\n• **Message:** ${payload.message || "None"}`
          }
        : {
            text: `🎉 *New Lead Received on Credyr!*\n• *Name:* ${payload.name}\n• *Email:* ${payload.email}\n• *Phone:* ${payload.phone}\n• *Service:* ${payload.service}\n• *Message:* ${payload.message || "None"}`
          };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error("Webhook notification failed:", response.statusText);
        results.webhook = `failed: ${response.statusText}`;
      } else {
        results.webhook = "success";
      }
    } catch (err: any) {
      console.error("Webhook notification error:", err);
      results.webhook = `error: ${err.message || err}`;
    }
  }

  // Only report success if at least one channel actually delivered the lead,
  // so the website never tells a visitor their message arrived when it didn't.
  const delivered = Object.values(results).some((r) => r === "success");
  if (!delivered) {
    console.error("Contact submission not delivered to any channel:", results);
    res.status(503).json({ success: false, results });
    return;
  }
  res.json({ success: true, results });
});

export default router;
