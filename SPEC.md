# SPEC

This project is a bilingual Next.js download page for the UCDT software suite and must remain a single-page, tab-switched experience designed for Vercel deployment.

## Package Management
- The project must use `pnpm` as its package manager.
- Dependency installation must be local to the current repository only.
- Do not use `npm install` or any global install workflow for this project.
- Standard package commands are:
  - `pnpm install`
  - `pnpm dev`
  - `pnpm build`
  - `pnpm start`

## Product and Content Requirements
- Keep all five UCDT products in one page:
  - UCDT Extraction Core
  - UCDT Processing Core
  - UCDT Analysis Core
  - UCDT Computing Core
  - UCDT Planning Core
- Use bilingual Chinese / English content.
- Treat `data/products.ts` as the source of truth for product copy, accent colors, state, versions, and links.
- Treat GitHub Releases as the release source of truth for shipped apps.
- Only Processing and Analysis currently have public GitHub repositories / release links.
- Current released products:
  - Processing Core: `v1.16.0`
  - Analysis Core: `v2.2.0`

## Design Requirements
- Preserve a dark glassmorphism style.
- Keep a floating blurred navbar inspired by the provided reference theme.
- Prefer a centered, single-column hero composition over a tight left/right split hero.
- Provide a GitHub CTA in the navbar and standalone platform download buttons in the hero.
- Use dark backgrounds with subtle aurora-style accent glows.
- Product tabs should update the active theme color and preview state.
- Released and unreleased products must be visually distinguishable.

## Asset Requirements
- Use local runtime assets only.
- Use `assets/logo.png` as the site logo.
- Each product asset folder should use:
  - `logo.png` for the transparent product logo
  - `logo-rounded.png` for the switcher icon
  - `logo-words.png` for the centered product wordmark
- Keep the procedural concept visual as the main preview.
- Show real screenshots underneath the concept visual when available.
- Use real Processing and Analysis logos/screenshots where available.
- Use programmatic placeholder visuals for Extraction, Computing, and Planning until new assets are provided.

## Deployment Requirements
- The project should remain compatible with Vercel.
- A successful `pnpm build` is required before deployment.
