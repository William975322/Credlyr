# Launch checklist

Branch: `feature/premium-homepage-rebuild`. Production (www.credyr.com) still
serves the old site from `main` (`1663f6f`, June 2026). Nothing from this
branch is in production.

Run `pnpm run check:launch` at any time: it lists what is still missing.

## Current setup (October 2026)

| Vercel project | Git | Serves | Notes |
| --- | --- | --- | --- |
| `credyr-website` | `main` | www.credyr.com (`credyr.com` → `www`) | Still configured for the old Express app: Root Directory `artifacts/api-server`, framework Express, Node 24, no environment variables. Branch previews here fail until the settings in step 3 are applied. |
| `credyr-website-staging` | none | protected `*.vercel.app` previews | Review builds of this branch, deployed by hand. Correct settings, no environment variables yet. |
| `credlyr-api-server-izla` | `main` | its own `*.vercel.app` URL | Old Express API. Returns 500 and nothing calls it. Remove after launch. |

The new site needs one project: `vercel.json` builds the Vite site to
`artifacts/credlyr/dist/public` and Vercel runs the functions in `api/`
(`/api/contact`, `/api/healthz`).

## 1. Information needed before launch

- **Business details** in `artifacts/credlyr/src/business.json`: legal name,
  legal form, registered address, enterprise number (KBO/BCE), VAT number, a
  public email address that receives mail, and how long enquiries are kept.
  They appear on `/legal`, `/privacy`, `/contact` and in the footer. Empty values
  are hidden on the site; never fill in guesses.
- **Cal.com:** the public link of the existing Website Audit event
  (Cal.com → Event Types → the event → Copy link). Confirm it is free and 30
  minutes, as `/get-started` now says.
- **About page:** confirm the founder biography is accurate.
- **Legal review** of `/privacy` and `/legal` (not provided by this repository).

## 2. Email

The old Google Workspace subscription is not accessible, so `credyr.com` has
no working mailbox, although its MX records still point to Google. Do not
configure the contact form against it.

1. Choose a mailbox provider and set up the address that will receive
   enquiries. Update the domain's MX (and root SPF) records to that provider.
2. In Resend, add the sending domain in region **EU (Ireland, eu-west-1)** and
   add the DKIM, `send` MX and `send` SPF records it shows at GoDaddy. DMARC is
   already `p=quarantine`, so wait until Resend shows **Verified**.
3. Create a Resend API key with sending access restricted to that domain.
4. Put the public address in `business.json` (`publicEmail`, and optionally
   `emailProvider`).

If the business is renamed first, do this for the new domain only.

## 3. Vercel configuration (`credyr-website`, needs approval)

| Setting | Value |
| --- | --- |
| Root Directory | empty (repository root) |
| Framework preset | Other; leave build, install and output commands unset (they come from `vercel.json`) |
| Node.js | 22.x |
| Domains → auto-assign custom domains | **off** during the release, back on afterwards |

Environment variables, for **Production and Preview**:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | the key from step 2 |
| `CONTACT_EMAIL_TO` | the mailbox that receives enquiries |
| `CONTACT_EMAIL_FROM` | e.g. `Website <website@your-domain>` on the Resend-verified domain |
| `VITE_CAL_URL` | the Website Audit event link (read at build time) |

Optional: **Firewall → Rate limiting**, e.g. 10 requests per 10 minutes per IP
on `/api/contact`. The function only has a best-effort limit of its own.

## 4. Staging tests (before production)

Add the same variables to `credyr-website-staging` (Preview), redeploy it, then:

1. `GET /api/healthz` → `{"status":"ok","contactConfigured":true}`.
2. `GET /api/nope` → Vercel 404. `/product/websites` and `/nope` → website pages.
3. Old URLs return a 308: `/customers/reviews`, `/status`, `/careers`,
   `/resources-hub/anything`.
4. `/get-started`: nothing from cal.com loads until **Show available times** is
   pressed; the calendar then shows the Website Audit event with no empty
   space below it.
5. **One approved test booking**, then cancel it: it ends on `/thanks?booked=1`.
6. **One approved contact-form submission**: it arrives at the inbox, and
   replying goes to the visitor. Invalid email is rejected; the error message
   appears when the API is unavailable.
7. `pnpm run check:launch` passes, and with production values loaded
   (`vercel env pull`, then `node --env-file=.env.local scripts/check-launch.mjs --env`)
   it passes with `--env` too.

## 5. Privacy and consent launch checks

- No cookies or third-party requests on any page until the visitor asks for the
  booking calendar (check the browser's network tab and cookie storage).
- `/privacy` names the responsible business, purposes and legal bases,
  processors (Vercel, Resend, Cal.com, the email provider), transfers outside
  the EEA, the retention period, the visitor's rights and the Belgian Data
  Protection Authority.
- `/legal` shows the business name, legal form, address, enterprise number,
  VAT number and email.

## 6. Release and rollback

1. Note the current production deployment for rollback:
   `credyr-website-9wvwp7630` (`1663f6f`).
2. Turn **auto-assign custom domains** off, apply step 3, then immediately open
   and merge the pull request into `main`. (Once the settings change, any push
   to `main` builds with them.)
3. Check the new production deployment on its own URL: `/api/healthz`, the
   pages, redirects and booking.
4. **Promote to Production.** On www.credyr.com check `/api/healthz`,
   `/customers/reviews` → `/`, the new homepage, and that the old cartoon image
   is gone.
5. Turn auto-assign custom domains back on.
6. Optionally submit `https://www.credyr.com/sitemap.xml` in Google Search Console.

**Rollback:** Deployments → `credyr-website-9wvwp7630` → ⋯ → **Promote to
Production** (instant, no rebuild, no need to revert settings). Then revert
the merge on `main` so the next push does not redeploy the new site.

## 7. After launch

- Disconnect Git from `credlyr-api-server-izla` and delete it once its logs
  show no traffic.
- Delete the leftover GitHub environments `credlyr-website` and
  `credlyr-api-server`.
- Keep or delete `credyr-website-staging`.

## Rename

The brand name and domain are not part of the launch fixes. When a new name is
chosen, these change together: page titles and metadata (`index.html`,
`usePageTitle` in `src/components/site.tsx`), structured data, logo and
favicon, footer, About and Privacy wording, `og-image.jpg`, canonical URLs and
`sitemap.xml`/`robots.txt`, `business.json`, the Resend domain and
`CONTACT_EMAIL_FROM`, the Cal.com event title, and the Vercel project and
domains (keep `credyr.com` redirecting to the new domain).

## Repository

The GitHub repo is **public**. It still contains third-party screenshots
(including full-page captures of duna.com), early planning prompts in
`attached_assets/`, and, in older commits, a personal email address and text
copied from duna.com. Making the repo **private** removes public access to all
of it, including history. Check **GitHub → Settings → Applications → Vercel**
includes this repository before switching.
