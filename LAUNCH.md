# Credyr launch checklist

Branch: `feature/premium-homepage-rebuild`. Nothing here has been deployed.

## Why the live contact form doesn't work (root cause)

The GitHub repo deploys to **two separate Vercel projects** on every push to
`main` (see the repo's GitHub "Environments"):

| Vercel project | Serves | Problem |
| --- | --- | --- |
| `credyr-website` | credyr.com / www.credyr.com | Static site only. `/api/*` falls through to the single-page-app catch-all and returns `index.html`. |
| `credlyr-api-server-izla` | its own `*.vercel.app` URL (behind Vercel deployment protection) | The Express API. The website never calls it, and on Express 5 it crashes at start-up. |

Older environments `credlyr-website` and `credlyr-api-server` are leftovers.

**Fix in this branch:** one project serves both. `vercel.json` builds the Vite
site to `artifacts/credlyr/dist/public` and Vercel runs the functions in
`api/` (`/api/contact`, `/api/healthz`). Express is no longer deployed.

## 1. Infrastructure (Vercel dashboard, project `credyr-website`)

1. **Settings → Build & Deployment → Root Directory: leave empty (repository root).**
   This is required so Vercel reads `vercel.json` and finds `api/`.
2. Framework preset: **Other**. Leave Build Command, Output Directory and Install
   Command **without overrides** (they come from `vercel.json`).
3. Node.js version: **22.x**.
4. Keep the domains `credyr.com` and `www.credyr.com` on this project
   (`credyr.com` redirects to `www`, the canonical host).
5. After the new deployment is live and verified: in `credlyr-api-server-izla`,
   `credlyr-api-server` and `credlyr-website`, disconnect the Git repository or
   delete the projects so pushes stop deploying them.
6. Optional hard rate limit: **Firewall → Rate limiting**, e.g. 10 requests per
   10 minutes per IP on `/api/contact`. The function has its own best-effort limit.

## 2. Email (Resend) and environment variables

Receiving mail at credyr.com uses Google Workspace. That does **not** authorise
Resend to send, so outbound needs its own records.

1. In Resend: **Domains → Add domain → `credyr.com`**, region **EU (Ireland,
   eu-west-1)**.
2. Add the records Resend shows at **GoDaddy** (DNS for credyr.com is at
   `domaincontrol.com`). They follow this pattern; copy the exact values from
   Resend, especially the DKIM key:

   | Type | Name (host) | Value | Priority |
   | --- | --- | --- | --- |
   | TXT | `resend._domainkey` | `p=MIGfMA0G…` (unique DKIM key from Resend) | — |
   | MX | `send` | `feedback-smtp.eu-west-1.amazonses.com` | 10 |
   | TXT | `send` | `v=spf1 include:amazonses.com ~all` | — |

   Leave the existing root SPF (`v=spf1 include:dc-aa8e722993._spfm.credyr.com ~all`)
   and DMARC (`p=quarantine`) records unchanged. DKIM on `credyr.com` keeps DMARC
   aligned.
3. Wait until Resend shows the domain as **Verified**.
4. Create an API key with **Sending access**, restricted to `credyr.com`.
5. In Vercel (`credyr-website` → Settings → Environment Variables), for
   **Production and Preview**:

   | Variable | Value |
   | --- | --- |
   | `RESEND_API_KEY` | the key from step 4 |
   | `CONTACT_EMAIL_TO` | `hello@credyr.com` (confirm this mailbox exists) |
   | `CONTACT_EMAIL_FROM` | `Credyr Website <website@credyr.com>` |
   | `VITE_CAL_URL` | after the Cal.com event exists: `https://cal.com/william-vanderpl/website-audit` |

   Remove obsolete variables if present: `SUPABASE_*`, `EMAIL_TO`, `EMAIL_FROM`,
   `WEBHOOK_URL`, `SLACK_WEBHOOK_URL`, `DISCORD_WEBHOOK_URL`.
6. `GET /api/healthz` must return `{"status":"ok","contactConfigured":true}`.

## 3. Cal.com

Create **Event Types → New**: title `Credyr — Website Audit`, URL slug
`website-audit`, 30 minutes, location Cal Video or Google Meet. Under
**Advanced → Redirect on booking**: `https://www.credyr.com/thanks?booked=1`.
Then set `VITE_CAL_URL` (above) and redeploy; it is read at build time.

## 4. Business and legal details needed

- Legal entity name, registered address, enterprise number (KBO/BCE) and VAT
  number, for the footer and the privacy notice.
- Confirmation that `hello@credyr.com` is a working mailbox.
- Approval of the founder biography on `/about`.
- Legal review of `/privacy`, including whether the Cal.com embed (third-party
  cookies) needs consent or click-to-load, and whether the business is
  correctly described as Belgium-based.

## 5. Preview testing (before production)

On the preview URL Vercel creates for the branch:

1. `GET /api/healthz` → JSON with `contactConfigured: true`.
2. `GET /api/nope` → Vercel 404 (not the website). `/product/websites` and `/nope` → website pages.
3. Every page renders; no requests to fonts.googleapis.com (browser network tab).
4. Contact form: **one approved test submission** → it arrives at
   `hello@credyr.com` from `website@credyr.com`, and replying goes to the
   visitor's address. Then check an invalid email is rejected and the error
   message appears when the API is unavailable.
5. Booking: the embed shows the Website Audit event. **One approved test
   booking**, then cancel it; the redirect lands on `/thanks?booked=1`.
6. Old URLs return a 308 redirect: `/customers/reviews`, `/status`, `/careers`, `/resources-hub/anything` → current pages.
7. Share-preview check: `https://www.opengraph.xyz/` with the preview URL shows `og-image.jpg`.

## 6. Rollback

Vercel keeps every deployment. If anything fails after release:
**Deployments → the previous production deployment → ⋯ → Promote to Production**
(instant, no rebuild). Revert the dashboard Root Directory setting only if you
roll back to a deployment built before this branch.

## 7. Replacing the outdated live site safely

The current live site publicly shows fabricated testimonials, a fake status
page, text copied from duna.com and a third-party cartoon. Replace it as soon as
the preview passes:

1. Apply the dashboard settings (section 1) and environment variables (section 2).
2. Push `feature/premium-homepage-rebuild` and let Vercel build a **preview**.
3. Run the preview tests (section 5).
4. Merge into `main` (or promote the verified preview) to release to production.
5. Immediately verify on www.credyr.com: `/api/healthz` JSON, `/customers/reviews`
   redirects to `/`, `/nobody-knows-youre-a-dog.png` no longer exists, and the
   homepage shows the new design.
6. Retire the extra Vercel projects (section 1, step 5).
7. Optionally, in Google Search Console, request recrawling of `/` and submit
   `https://www.credyr.com/sitemap.xml`.

## Repository

The GitHub repo is **public**. It still contains third-party screenshots
(including full-page captures of duna.com), early planning prompts in
`attached_assets/`, and, in older commits, a personal email address and text
copied from duna.com. Making the repo **private** removes public access to all of
it, including history. Vercel's GitHub integration keeps deploying private repos
it has been granted access to. Check **GitHub → Settings → Applications →
Vercel** includes this repository before switching.
