# How to add a new product (no code experience needed)

1. Open `lib/products.ts`.
2. Copy any existing product object (the block between `{` and `},`).
3. Paste it at the end of the `products` array and edit these fields:
   - `slug` — URL-safe id, e.g. `"new-peptide-5mg"` → becomes `/products/new-peptide-5mg`
   - `name`, `category`, `strength`, `price`
   - `shortDescription` — one sentence, shown on cards
   - `longDescription` — array of 2-3 paragraph strings, shown on the product page
   - `highlights` — 3-5 short bullet points
   - `keywords`, `metaTitle`, `metaDescription` — for search engines
   - `faqs` — array of `{ q, a }` objects
4. Save. That's it — the product page, sitemap entry, cart support, and FAQ schema all generate automatically. No other file needs to change.

## SEO checklist for new product copy
- `metaTitle` under ~60 characters, include the product name + strength.
- `metaDescription` under ~155 characters, include a call to action.
- Use the exact product name/strength somewhere in the first paragraph of `longDescription` (search engines weight this).
- Keep all copy in "research use only" framing — no dosing or human-use claims.
- Write 3+ FAQs per product; these get FAQ rich-result eligibility in Google automatically.

## When product photos arrive
Once you have Cloudinary links, ask your developer (or Claude) to do this **once**:
1. Add `image: string` to the `Product` type and to each product entry in `lib/products.ts`.
2. Swap the placeholder box for `next/image` in `components/ProductCard.tsx` and `app/products/[slug]/page.tsx`.

After that one-time change, adding a photo to any product is just pasting the Cloudinary URL into that product's `image` field.
