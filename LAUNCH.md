# Olerivo launch checklist

Brand: **Olerivo**. Production URL: **https://www.olerivo.com** (the apex
`olerivo.com` redirects to `www`). Branch: `feature/premium-homepage-rebuild`.

Production (www.credyr.com) still serves the old Credyr site from `main`
(`1663f6f`, June 2026). Nothing from this branch is in production.

Run `pnpm run check:launch` at any time: it lists what is still missing
(business details, mailbox DNS, and old branding in the build). With
production environment variables loaded, `--env` also checks Vercel and
Resend settings (see step 6).

Technical names keep the old spelling on purpose: the repository
(`Credlyr`), the `artifacts/credlyr` folder, the `@workspace/credlyr` package
and the Vercel project names. Renaming them would break builds and
deployments, and visitors never see them.

## Current setup

| Vercel project | Git | Serves | Notes |
| --- | --- | --- | --- |
| `credyr-website` | `main` | www.credyr.com (`credyr.com` → `www`) | The production project. Still configured for the old Express app: Root Directory `artifacts/api-server`, framework Express, Node 24, no environment variables. Branch previews here fail until step 5 is applied. |
| `credyr-website-staging` | none | protected `*.vercel.app` previews | Review builds of this branch, deployed by hand. Correct settings, no environment variables yet. |
| `credlyr-api-server-izla` | `main` | its own `*.vercel.app` URL | Old Express API. Returns 500 and nothing calls it. Remove after launch. |

One project serves the whole site: `vercel.json` builds the Vite site to
`artifacts/credlyr/dist/public`, and Vercel runs the functions in `api/`
(`/api/contact`, `/api/healthz`).

## 1. Business details (needed from you)

Fill in `artifacts/credlyr/src/business.json` with the real values; never
guesses. They appear on `/legal`, `/privacy`, `/contact` and in the footer,
and empty values are hidden:

- legal name and legal form
- registered address (street, postcode, city)
- enterprise number (KBO/BCE) and VAT number
- `enquiryRetention`: one sentence on how long enquiries are kept

`publicEmail` is `hello@olerivo.com` and `emailProvider` is `Google Workspace`.
Also confirm the founder biography on `/about`, and have `/privacy` and
`/legal` reviewed.

## 2. Google Workspace (olerivo.com)

- Primary account: `william.vanderplaetse@olerivo.com`, for administration and
  personal business mail.
- Public address: `hello@olerivo.com`, an **alias** of the primary account.
  It is used on the website, in the contact form, the privacy notice and all
  customer-facing mail.

In GoDaddy DNS for `olerivo.com`, add what the Workspace setup asks for:

| Type | Name | Value |
| --- | --- | --- |
| TXT | `@` | `google-site-verification=…` (domain verification) |
| MX | `@` | `smtp.google.com`, priority 1 (Google's current single-record setup) |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` |
| TXT | `google._domainkey` | the DKIM key from Admin console → Apps → Gmail → Authenticate email |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:william.vanderplaetse@olerivo.com` (tighten to `p=quarantine` once reports are clean) |

Send a test message from an outside address to `hello@olerivo.com` and
confirm it arrives in the primary inbox.

## 3. Resend (website notifications)

Resend sends from its own subdomain, `notify.olerivo.com`, so Google's MX
and SPF records for `olerivo.com` stay untouched.

1. Resend → Domains → Add `notify.olerivo.com`, region **EU (Ireland)**.
2. Add the records Resend shows in GoDaddy. They follow this pattern; copy the
   exact values, especially the DKIM key:

   | Type | Name (host in GoDaddy) | Value | Priority |
   | --- | --- | --- | --- |
   | TXT | `resend._domainkey.notify` | `p=MIGfMA0G…` (from Resend) | |
   | MX | `send.notify` | `feedback-smtp.eu-west-1.amazonses.com` | 10 |
   | TXT | `send.notify` | `v=spf1 include:amazonses.com ~all` | |

3. Wait for **Verified**, then create an API key with sending access to
   `notify.olerivo.com` only. Put it in Vercel only, never in the repository.

Notifications go **to** `hello@olerivo.com` **from**
`Olerivo Website <website@notify.olerivo.com>`, with the visitor as Reply-To.
Nothing is sent to the visitor.

## 4. Cal.com

- Use the existing Website Audit event. Its page must match the site: free,
  30 minutes, by video call. Title it e.g. `Olerivo — Website Audit`.
- Copy its public link (Event Types → the event → Copy link) for
  `VITE_CAL_URL`.
- Optional: Advanced → Redirect on booking →
  `https://www.olerivo.com/thanks?booked=1`. The embedded calendar already
  sends visitors there after booking.

## 5. Vercel configuration (`credyr-website`, needs approval)

| Setting | Value |
| --- | --- |
| Root Directory | empty (repository root) |
| Framework preset | Other; leave build, install and output commands unset (they come from `vercel.json`) |
| Node.js | 22.x |
| Domains → auto-assign custom domains | **off** during the release, back on afterwards |

Environment variables, for **Production and Preview** (and Preview on
`credyr-website-staging` for testing):

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | the key from step 3 |
| `CONTACT_EMAIL_TO` | `hello@olerivo.com` |
| `CONTACT_EMAIL_FROM` | `Olerivo Website <website@notify.olerivo.com>` |
| `VITE_CAL_URL` | the Website Audit event link (read at build time) |

Domains, added at release time (step 7):

| Domain | Setting |
| --- | --- |
| `www.olerivo.com` | primary production domain |
| `olerivo.com` | redirect (308) to `www.olerivo.com` |
| `www.credyr.com`, `credyr.com` | redirect (308) to `www.olerivo.com`, once Olerivo is live |

Vercel shows the DNS records each domain needs (typically an `A` record for
`@` and a `CNAME` for `www`). Add them in GoDaddy only when releasing.

Optional: Firewall → Rate limiting, e.g. 10 requests per 10 minutes per IP on
`/api/contact`. The function only has a best-effort limit of its own.

## 6. Staging tests (before production)

After setting the variables on `credyr-website-staging` and redeploying:

1. `GET /api/healthz` → `{"status":"ok","contactConfigured":true}`.
2. `GET /api/nope` → Vercel 404. `/product/websites` and `/nope` → website pages.
3. Old URLs return a 308: `/customers/reviews`, `/status`, `/careers`,
   `/resources-hub/anything`.
4. `/get-started`: nothing from cal.com loads until **Show available times**
   is pressed; the calendar then shows the Website Audit event, without empty
   space below it.
5. **One approved test booking**, then cancel it: it ends on `/thanks?booked=1`.
6. **One approved contact-form submission**: it arrives at `hello@olerivo.com`
   from `website@notify.olerivo.com`, and replying goes to the visitor.
7. `pnpm run check:launch` passes, and with production values loaded
   (`vercel env pull`, then `node --env-file=.env.local scripts/check-launch.mjs --env`)
   it passes with `--env` too.

## 7. Privacy and consent checks (Belgium / GDPR)

- No cookies or third-party requests on any page until the visitor asks for
  the booking calendar (browser network tab and cookie storage).
- `/legal` shows the business name, legal form, registered address,
  enterprise number, VAT number and email (Code of Economic Law, book XII).
- `/privacy` names the responsible business, purposes and legal bases,
  processors (Vercel, Resend, Cal.com, Google Workspace), transfers outside
  the EEA, the retention period, the visitor's rights and the Belgian Data
  Protection Authority.

## 8. Release and rollback

1. Note the current production deployment for rollback:
   `credyr-website-9wvwp7630` (`1663f6f`).
2. Turn **auto-assign custom domains** off, apply step 5 (settings and
   variables), then open and merge the pull request into `main` straight
   away. Once the settings change, any push to `main` builds with them.
3. Check the new production deployment on its own `*.vercel.app` URL:
   `/api/healthz`, the pages, the redirects and booking.
4. Add `www.olerivo.com` and `olerivo.com` to the project and their DNS
   records in GoDaddy. **Promote** the new deployment to production, then turn
   auto-assign back on.
5. On https://www.olerivo.com check `/api/healthz`, the homepage, the booking
   page and the share preview (e.g. opengraph.xyz). Confirm `olerivo.com`
   redirects to `www`.
6. Set `credyr.com` and `www.credyr.com` to redirect to `www.olerivo.com`.
   This takes the old Credyr site offline while keeping old links working.
7. Submit `https://www.olerivo.com/sitemap.xml` in Google Search Console.

**Rollback:** Deployments → `credyr-website-9wvwp7630` → ⋯ → **Promote to
Production** (instant, no rebuild, no need to revert settings). Undo the
credyr.com redirects if they were already set, then revert the merge on
`main` so the next push does not redeploy the new site.

## 9. After launch

- Disconnect Git from `credlyr-api-server-izla` and delete it once its logs
  show no traffic.
- Delete the leftover GitHub environments `credlyr-website` and
  `credlyr-api-server`.
- Keep or delete `credyr-website-staging`.
- Optional: rename the Vercel projects to Olerivo names (domains and
  deployments stay attached).

## Share image

`artifacts/credlyr/public/og-image.jpg` is rendered from
`scripts/og/og-image.html`. After changing the headline or brand, run
`scripts/og/render.sh`.

## Repository

The GitHub repo is **public**. It still contains third-party screenshots
(including full-page captures of duna.com), early planning prompts in
`attached_assets/`, and, in older commits, a personal email address and text
copied from duna.com. Making the repo **private** removes public access to
all of it, including history. Check **GitHub → Settings → Applications →
Vercel** includes this repository before switching.
