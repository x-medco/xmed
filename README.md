# X-Med — Research Peptide Shop

Next.js 14 (App Router) e-commerce storefront: dynamic product catalog, cart, checkout, thank-you page, and full SEO scaffolding (per-product metadata, JSON-LD, sitemap, robots, FAQ schema).

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in Stripe keys when ready — works without them in demo mode
npm run dev
```

Open http://localhost:3000.

## What's here

- `lib/products.ts` — single source of truth for all 27 products (pricing, SEO copy, FAQs). Add a product here and it automatically gets a page, sitemap entry, and cart support.
- `lib/cart-context.tsx` — client-side cart (React context + localStorage), no backend required.
- `app/products/[slug]/page.tsx` — dynamic product page (metadata, Product + Breadcrumb JSON-LD, FAQ schema).
- `app/api/checkout/route.ts` — Stripe Checkout session creation. Falls back to a clickable demo flow if `STRIPE_SECRET_KEY` isn't set yet.
- `app/sitemap.ts` / `app/robots.ts` — generated automatically from the product list.

See `docs/ADDING_PRODUCTS.md` and `CLAUDE.md` before asking an AI assistant (or a new teammate) to extend this — it'll save a lot of back-and-forth.

## Deploy

1. Push this repo to GitHub.
2. Import into Vercel → set environment variables from `.env.example` in the Vercel dashboard (never in code).
3. Point your domain (x-med.co) at the Vercel deployment.

## Payments

Ships wired for **Stripe Checkout**. Peptide/research-chemical merchants are sometimes restricted by mainstream processors — if Stripe declines the account, swap the single file `app/api/checkout/route.ts` for a crypto processor (BTCPay, Coinbase Commerce) or manual bank-transfer flow. Nothing else in the app needs to change.

## Product photography

Product cards/pages currently show a placeholder. Once you have Cloudinary URLs, add an `image: string` field per product in `lib/products.ts` and swap the placeholder `<div>` in `components/ProductCard.tsx` and `app/products/[slug]/page.tsx` for `next/image`.
