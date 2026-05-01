# AGENTS

## Project Purpose
This repository contains a bilingual Next.js download page for the UCDT software suite. The site is designed as a single-page experience with five tabbed products and is intended for deployment on Vercel.

## Tech Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Static image imports from the local `assets` directory
- pnpm for local project dependency management

## Working Rules
- Keep the page as a single-route landing/download experience unless requirements change.
- Preserve the dark glassmorphism design language and floating navigation.
- Use local runtime assets only.
- Treat GitHub Releases as the release source of truth for shipped desktop apps.
- Only Processing and Analysis currently expose public GitHub repository and release links.
- Keep product content data-driven in `data/products.ts`.
- Use `pnpm` for installs and scripts, scoped to the current project only.

## Asset Rules
- `logo.png` is the transparent brand/logo asset for a product.
- `logo-rounded.png` is the rounded rectangle icon used in product switchers.
- `logo-words.png` is the horizontal icon + wordmark asset used as the centered product title image.
- Keep procedural concept visuals as the primary preview layer.
- Show screenshots beneath the concept visual when real screenshots are available.

## Product Status
- Released:
  - UCDT Processing Core (`v1.16.0`)
  - UCDT Analysis Core (`v2.2.0`)
- Roadmap / placeholder preview:
  - UCDT Extraction Core
  - UCDT Computing Core
  - UCDT Planning Core

## Key Files
- `app/page.tsx`: homepage entry
- `components/download-page.tsx`: main landing page composition
- `components/product-preview.tsx`: visual preview area for released and unreleased products
- `data/products.ts`: product copy, versions, links, and theme tokens
- `DESIGN.md`: design system notes

## Deployment Notes
- Intended deployment target is Vercel.
- Production build should pass with `pnpm build` before deployment.
