# Tung.NT — Real Estate Photo Editing

Standalone marketing website for Tung.NT real estate photo editing service.
Built with Next.js 14 (App Router) + TypeScript. Fully static, no backend.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Content

Single-page site (`src/app/page.tsx`):
hero video, stats, About Us, services, Before/After showcase (HDR, Twilights,
Flash, Virtual Staging, Remove Objects, Demolition & Renovation), pricing,
portfolio, testimonials, contact form, Google Map, footer.

Assets live in `public/img/hrl/` (photos + `tour.mp4`).

## Deploy (Vercel)

1. Push this repo to GitHub.
2. On https://vercel.com → **New Project** → import this repo → Deploy
   (framework auto-detected as Next.js, no env vars needed).
3. Add your custom domain under **Project → Settings → Domains**.

## Edit contact info

Constants at the top of `src/app/page.tsx`: `WHATSAPP`, `IG_URL`, `FB_URL`,
`EMAIL`, `ADDRESS`, `MAP_EMBED`.
