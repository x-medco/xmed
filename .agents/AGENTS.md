# X-Med Shop Protection & Integrity Guidelines

To prevent accidental visual regressions, catalog corruption, or broken workflows due to model misunderstandings, all AI assistants working on this codebase must strictly adhere to the following rules.

---

## 🚨 CRITICAL: Guardrails & Protections

### 1. Verification of Mismatches (Typo Protection)
*   **Do not guess intent on ambiguous requests:** If the user specifies a URL and an asset name that do not match (e.g., requesting to change PT-141's image but sending an Ipamorelin image), **STOP** and ask for clarification immediately. Do not guess or execute the change blindly.
*   **Always check image labels:** Before changing or updating any product image path, check the actual text on the image label inside `public/images/` using a viewer tool to verify it matches the target product.

### 2. Catalog & Database Protection
*   **Confirm price, image, and category edits:** Never modify, delete, or add products, prices, images, or categories in the database or `lib/products.ts` without explicit user confirmation of the exact target slug and target values.
*   **No bulk or destructive DB queries without dry runs:** Any database deletion or modification script must first output a dry-run log of all affected rows, showing "BEFORE" and "AFTER" values, and wait for confirmation.

### 3. Implementation Planning & Approvals
*   **Always use Planning Mode:** For any non-trivial modifications, create or update `implementation_plan.md` first, set `request_feedback = true`, and stop to wait for user approval.
*   **Preserve Existing Styles & Assets:** Do not overwrite global design system tokens, layout systems, color schemes, or logos unless explicitly requested.

---

## 📁 Key File Map

For reference, the source of truth for configuration is located at:
*   **Static Products Array:** [products.ts](file:///Users/shikha/x-med-shop/lib/products.ts)
*   **Email Sending Engine:** [send-marketing-email.js](file:///Users/shikha/x-med-shop/scripts/send-marketing-email.js)
*   **Database Migrations & Inserts:** [supabase/](file:///Users/shikha/x-med-shop/supabase/) and [scripts/](file:///Users/shikha/x-med-shop/scripts/)
