# api-server (not deployed)

Superseded on 12 Oct 2026. Production uses Vercel Functions in the repository
root `api/` folder (`/api/contact`, `/api/healthz`), and local development
serves the same handlers with `node scripts/dev-api.mjs`.

This Express package is no longer part of the Vercel build. Its contact route
was removed (it is recoverable from Git history); it is kept only so the pnpm
workspace and lockfile stay valid. It can be deleted together with a lockfile
update.
