# DESIGN

Project package milestone: `1.0.0`.

## Design Goal
The site should preserve the current UCDT landing-page UI while staying maintainable, data-driven, and easy to extend as more products reach release status.

## Core Visual Principles
- Deep near-black background
- Floating glassmorphism navbar
- Large blur layers and restrained aurora-style glow
- Rounded panels, soft borders, and luminous accent gradients
- Strong contrast between product states: released vs. upcoming

## Product Accent Tokens
- Extraction: purple
- Processing: blue
- Analysis: magenta-red
- Computing: orange
- Planning: green

## Layout Strategy
- Single-page experience
- Large centered hero with immediate product identity
- Floating navbar with GitHub CTA and locale switch
- Product switcher as the primary interaction model
- Platform-specific download buttons presented as standalone actions
- Shared download/details area that updates with the active tab
- Secondary sections for ecosystem context and FAQ

## Component Strategy
- Keep `components/download-page.tsx` focused on state and composition only
- Keep repeated presentational sections in `components/download-page-sections.tsx`
- Keep shared SVG icons in `components/site-icons.tsx`
- Keep product content and release metadata in `data/products.ts`
- Prefer global utility classes for repeatable glass, card, and motion treatments

## Content Strategy
- Bilingual Chinese / English copy from the first release
- Released apps show real version information and GitHub Releases links
- Unreleased apps use polished placeholder visuals rather than empty states
- Workflow responsibility copy should remain product-specific and data-driven

## Asset Strategy
- `assets/logo.png` is the site brand mark
- Each product folder follows this asset convention:
  - `logo.png`: transparent logo asset
  - `logo-rounded.png`: rounded rectangle icon for product switchers
  - `logo-words.png`: horizontal wordmark for centered product title display
- Procedural concept visuals remain the primary preview for every product
- Real screenshots are shown below the concept visual when available
- Only Processing and Analysis currently have public GitHub repositories and release links
- `app/favicon.ico` remains the browser favicon binary
- `app/icon.tsx`, `app/apple-icon.tsx`, `app/manifest.ts`, `app/opengraph-image.tsx`, and `app/twitter-image.tsx` handle route-based metadata assets

## Interaction Notes
- Switching products should update:
  - accent color
  - release badge
  - copy blocks
  - download CTA behavior
  - preview visuals
  - centered wordmark and platform download buttons
- Navigation remains lightweight and anchored within the same page
- Motion should stay subtle and reusable; prefer shared transition utilities over ad-hoc animation declarations
- Screenshot previews should open in a stable centered dialog with a dark blurred overlay; motion polish should remain secondary to guaranteed content visibility
- The preview lightbox should keep the current thumbnail-to-center expansion feel, but fallback paths must always show the final image immediately if geometry or animation setup fails

## SEO and Metadata Notes
- Metadata is centralized in `lib/site-metadata.ts`
- Canonical URL and `metadataBase` should be driven by `NEXT_PUBLIC_SITE_URL` when the production domain is finalized
- Use truthful metadata only: released apps can expose real release URLs, unreleased apps should remain clearly marked as planned/conceptual

## Responsive Notes
- The page is optimized as a single-column narrative on mobile rather than a re-laid-out alternate experience
- Watch for full-bleed sections inside centered containers; background layers should break out to viewport width when needed, while content remains constrained
- Product cards and CTA rows should wrap rather than shrink below comfortable tap targets
- In the `Module Responsibilities` grid, use a stacked icon-then-text header at desktop widths so long English labels do not visually compress the product logos

## 踩坑经验
- Next.js App Router metadata is easiest to maintain when title, Open Graph, Twitter card, and icon configuration all come from one shared module
- Full-bleed visual slabs should use viewport-width background layers instead of relying on the main content container width
- Product content should stay in `data/products.ts`; if copy leaks into components, bilingual maintenance becomes error-prone quickly
- If a section starts collecting its own state, hover cards, and repeated style strings, split it before `download-page.tsx` becomes monolithic again
- For motion polish, prefer low-risk opacity/translate transitions and always consider `prefers-reduced-motion`
- When product logos sit beside bilingual labels, fix the logo render box and, if needed, separate the logo onto its own row at larger breakpoints instead of letting copy length distort the mark
- For the screenshot lightbox, keep overlay/content visibility decoupled from animation bootstrap timing so modal scroll lock never outlives visible content
