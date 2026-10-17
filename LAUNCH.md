# Olerivo launch checklist

Brand: **Olerivo**. Production URL: **https://www.olerivo.com**, with the apex
`olerivo.com` redirecting to `www`. Code: branch
`feature/premium-homepage-rebuild` (not yet merged into `main`).

Nothing is public yet: every deployment requires Vercel sign-in until the
public launch is approved.

Run `pnpm run check:launch` at any time: it lists what is still missing
(business details, mailbox DNS, old branding in the build). With production
environment variables loaded, `--env` also checks the Vercel and Resend
settings (step 5).

Technical names keep the old spelling on purpose: the repository
(`Credlyr`), the `artifacts/credlyr` folder, the `@workspace/credlyr` package
and the `credyr-website-staging` project. Visitors never see them.

## Vercel projects

| Project | Git | Role | Settings |
| --- | --- | --- | --- |
| **`olerivo-website`** | `William975322/Credlyr`, production branch `feature/premium-homepage-rebuild` | **Production.** Temporary URL https://olerivo-website.vercel.app | Root Directory empty, framework Other, Node 22.x, functions in `fra1` (Frankfurt). Protection: **All Deployments** until launch. |
| `credyr-website-staging` | none (deployed by hand) | Protected staging/review builds | Same build settings, no environment variables. |

`vercel.json` builds the Vite site to `artifacts/credlyr/dist/public`, and
Vercel runs the functions in `api/` (`/api/contact`, `/api/healthz`). Build,
install and output commands come from `vercel.json`; leave them unset in the
dashboard.

Every push to `feature/premium-homepage-rebuild` now builds a production
deployment of `olerivo-website`. That is safe while it has no public domain.
After launch, merge into `main` and set the production branch to `main`
(step 8).

The old projects `credyr-website`, `credlyr-api-server-izla`, `foresea` and
`v0-saa-s-landing-page-design` were deleted on 17 October 2026.
`credyr.com` no longer serves a website.

### Environment variables (`olerivo-website`, Production and Preview)

| Variable | Value | Status |
| --- | --- | --- |
| `CONTACT_EMAIL_TO` | `hello@olerivo.com` | set |
| `CONTACT_EMAIL_FROM` | `Olerivo Website <website@notify.olerivo.com>` | set |
| `RESEND_API_KEY` | Resend key restricted to `notify.olerivo.com` | set as a Sensitive shared variable |
| `VITE_CAL_URL` | the Website Audit event link | **missing** |

`VITE_CAL_URL` is read at build time: redeploy after changing it. Secrets are
added only in the Vercel dashboard (Settings → Environment Variables, marked
Sensitive), never in the repository or in chat.

## 1. Business details

Fill in `artifacts/credlyr/src/business.json` with the real values; never
guesses. They appear on `/legal`, `/privacy`, `/contact` and in the footer,
and empty values are hidden:

- legal name and legal form
- registered address (street, postcode, city)
- enterprise number (KBO/BCE) and VAT number
- `enquiryRetention`: one sentence on how long enquiries are kept

`publicEmail` is `hello@olerivo.com` and `emailProvider` is `Google Workspace`.
Also confirm the founder biography on `/about`, and have `/privacy` and
`/legal` reviewed (Belgian Code of Economic Law book XII; GDPR article 13).

## 2. Email (done)

- Google Workspace: primary account `william.vanderplaetse@olerivo.com`;
  `hello@olerivo.com` is an alias used on the website and for customers.
  `olerivo.com` has MX `smtp.google.com`, Google SPF, DKIM
  (`google._domainkey`) and DMARC (`p=quarantine`).
- Resend: `notify.olerivo.com` verified in the EU region
  (`resend._domainkey.notify`, `send.notify` MX and SPF).

Contact-form notifications go **to** `hello@olerivo.com` **from**
`website@notify.olerivo.com`, with the visitor as Reply-To. Nothing is sent to
the visitor. Do not change any of these DNS records during the launch.

## 3. Cal.com

- Use the existing Website Audit event. Its page must match the site: free,
  30 minutes, by video call. Title it e.g. `Olerivo — Website Audit`.
- Its public link (Event Types → the event → Copy link) is `VITE_CAL_URL`.
- Optional: Advanced → Redirect on booking →
  `https://www.olerivo.com/thanks?booked=1`. The embedded calendar already
  sends visitors there after booking.

## 4. Pre-launch tests (on https://olerivo-website.vercel.app, signed in)

1. `GET /api/healthz` → `{"status":"ok","contactConfigured":true}`.
2. `GET /api/nope` → 404. Every page renders; old URLs (`/customers/reviews`,
   `/status`, `/careers`, `/resources-hub/anything`) return a 308.
3. `/get-started`: nothing from cal.com loads until **Show available times**
   is pressed; the calendar then shows the Website Audit event.
4. **One approved test booking**, then cancel it: it ends on `/thanks?booked=1`.
5. **One approved contact-form submission**: it arrives at `hello@olerivo.com`
   from `website@notify.olerivo.com`; replying goes to the visitor.
6. No cookies or third-party requests on any page before the calendar is
   opened (browser network tab and cookie storage).

## 5. Launch checks

- `pnpm run check:launch` passes.
- With production values loaded it passes with `--env` too:
  `vercel env pull .env.local --environment=production`, then
  `node --env-file=.env.local scripts/check-launch.mjs --env`, then delete
  `.env.local` (it is git-ignored; never commit it).

## 6. Connecting olerivo.com (after steps 1–5 and explicit approval)

**In Vercel** (`olerivo-website` → Settings → Domains):

1. Add `www.olerivo.com` (production).
2. Add `olerivo.com` and set it to **Redirect to `www.olerivo.com`, 308**.
3. Note the DNS values Vercel shows for each domain.
4. Settings → Deployment Protection → Vercel Authentication → **Standard
   Protection** (custom domains public, `*.vercel.app` URLs stay protected).

**In GoDaddy** (DNS for `olerivo.com`), change only these two records:

| Type | Name | Current (GoDaddy parking) | New |
| --- | --- | --- | --- |
| A | `@` | `15.197.148.33` and `3.33.130.190` (delete both) | the A value Vercel shows, currently `216.198.79.1` |
| CNAME | `www` | `olerivo.com` | the CNAME Vercel shows, e.g. `<id>.vercel-dns-017.com` or `cname.vercel-dns.com` |

Use TTL 600 (10 minutes). Also make sure GoDaddy **Forwarding** is off for
the domain. Leave every other record unchanged: MX `smtp.google.com`, the SPF
and `google-site-verification` TXT records, `google._domainkey`, `_dmarc`,
`resend._domainkey.notify`, and the `send.notify` MX and TXT. There are no CAA
records, so Vercel can issue the certificate.

**Then verify:** Vercel shows both domains as Valid with certificates;
https://www.olerivo.com loads; `http://olerivo.com` and `https://olerivo.com`
redirect to `https://www.olerivo.com`; `/api/healthz` reports
`contactConfigured: true`; the share preview (e.g. opengraph.xyz) shows the
Olerivo image. Submit `https://www.olerivo.com/sitemap.xml` in Google Search
Console.

## 7. Rollback

- **Hide the site immediately:** Deployment Protection → **All Deployments**.
  The domain stays connected but requires sign-in.
- **Bad release:** Deployments → previous good deployment → ⋯ → **Promote to
  Production** (instant, no rebuild).
- **Undo the domain switch:** restore the two GoDaddy records in step 6
  (A `@` → `15.197.148.33` and `3.33.130.190`; CNAME `www` → `olerivo.com`)
  and remove the domains from the project.

## 8. After launch

- Merge `feature/premium-homepage-rebuild` into `main`, then set the
  `olerivo-website` production branch to `main`.
- Keep or delete `credyr-website-staging`.
- Optional: Firewall → Rate limiting on `/api/contact` (e.g. 10 requests per
  10 minutes per IP); the function only has a best-effort limit of its own.

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
