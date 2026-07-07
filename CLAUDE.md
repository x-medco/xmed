# Project conventions (read this before making changes)

This file exists so a future AI session (or teammate) doesn't need to re-read the whole codebase to make a routine change. Point Claude/Claude Code at this file first.

## Golden rule
**Everything about a product lives in one place: `lib/products.ts`.** Adding, editing, or removing a product never requires touching any page, component, or route. If a task looks like it needs changes in `app/products/[slug]/page.tsx`, `components/ProductCard.tsx`, sitemap, or cart — stop, it almost certainly doesn't. Only edit `lib/products.ts`.

## Common tasks → exact file to touch

| Task | File(s) | Notes |
|---|---|---|
| Add a new product | `lib/products.ts` | Add one object to the `products` array. Page, sitemap entry, cart support, and JSON-LD are automatic. |
| Change a price | `lib/products.ts` | Edit `price` field only. |
| Add product photo | `lib/products.ts` (+image field) then `components/ProductCard.tsx` / `app/products/[slug]/page.tsx` | Add `image: string` (Cloudinary URL) to the `Product` type and each entry, then replace the placeholder `<div>` with `<Image src={product.image} .../>`. Do this once for the type+components, not per product. |
| Add/change FAQ | `lib/products.ts` | Each product has its own `faqs` array; global homepage FAQ is in `app/page.tsx`. |
| Change payment processor | `app/api/checkout/route.ts` only | The cart/checkout UI is processor-agnostic — it just POSTs cart lines and expects `{ redirectUrl }` back. |
| Change design tokens (colors/fonts) | `tailwind.config.ts`, `app/globals.css` | Don't hand-edit hex colors inside components — they should reference the theme tokens (`ink`, `paper`, `signal`, `amber`, `graphite`, `line`). |
| Add a new category | `lib/products.ts` → `categories` array | Nav, footer, and `/products` filters all read from this array automatically. |

## Things to never do
- Never hardcode secrets (Stripe keys, DB passwords, etc.) in any `.ts`/`.tsx` file. Always `process.env.X`, documented in `.env.example`.
- Never duplicate product data in a component — always import from `lib/products.ts`.
- Never add a new payment/cart state mechanism — `lib/cart-context.tsx` is the only cart source of truth.

## Content/compliance rule
All product copy must stay in "research use only" framing (no dosing instructions, no claims of human therapeutic benefit). See `siteConfig.disclaimer` in `lib/products.ts` — it's rendered site-wide in the footer and must stay accurate if the business model changes.
