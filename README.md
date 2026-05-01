<p align="center">
 <img width="100px" src="assets/logo.png" align="center" alt="UCDT Series Apps" />
 <h2 align="center">UCDT Series</h2>
 <p align="center">Get UCDT Series Apps</p>
</p>

## Features

- Single-page tabbed product experience for 5 UCDT applications
- Dark glassmorphism visual system for the UCDT landing experience
- Centered hero layout with GitHub CTA and per-platform download buttons
- Chinese / English content switching
- Real release metadata and GitHub Releases links for Processing and Analysis
- Procedural concept visuals retained as the main preview layer
- Real screenshots rendered below the concept visual when available
- Shared metadata, route-based app icons, and social image routes for deployment readiness
- Vercel-friendly Next.js structure

## Architecture

- `app/page.tsx`: single-route entry that renders the download page
- `components/download-page.tsx`: stateful composition layer for locale, active product, and FAQ state
- `components/download-page-sections.tsx`: reusable presentational sections and display helpers
- `components/product-preview.tsx`: preview video, screenshot grid, and lightbox behavior
- `components/site-icons.tsx`: shared SVG icon primitives used across sections
- `data/products.ts`: source of truth for product copy, status, accents, versions, links, and workflow roles
- `lib/site-metadata.ts`: shared metadata configuration for layout, Open Graph, Twitter card, and canonical placeholders
- `app/favicon.ico`: committed favicon binary used for browser favicon resolution
- `app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx`, `app/twitter-image.tsx`, `app/manifest.ts`: generated asset and metadata routes

## Development

Install dependencies locally in this project:

```bash
pnpm install
```

Run the dev server:

```bash
pnpm dev
```

Create a production build:

```bash
pnpm build
```

## Package Manager

- This project uses `pnpm` as the only supported package manager.
- Install dependencies from the repository root so packages are placed in the current project only.
- Do not use `npm install` for this repository.

## Content Source

Product copy, accent colors, version labels, release URLs, and product state are managed in:

- `data/products.ts`

Keep new marketing copy, FAQ content, workflow descriptions, and release-facing labels in this file so the page remains data-driven.

## Asset Conventions

- `assets/logo.png`: site logo
- Product `logo.png`: transparent product logo asset
- Product `logo-rounded.png`: product switcher icon
- Product `logo-words.png`: centered product wordmark
- At the moment, only Processing and Analysis expose public GitHub release/license links

## Metadata and Icons

- App Router metadata is centralized in `lib/site-metadata.ts`
- `NEXT_PUBLIC_SITE_URL` can be set later to enable canonical URL and absolute Open Graph URL output
- The site currently defaults to author `ONing` and publisher `Bitcookies`
- `app/favicon.ico` is the committed browser favicon source
- `app/icon.tsx` and `app/apple-icon.tsx` provide the route-based app icon and Apple touch icon
- Open Graph, Twitter, and manifest assets remain generated through App Router metadata routes

## Maintenance Notes

- Reuse the shared utility classes in `app/globals.css` before adding new long Tailwind class strings
- Prefer extending `components/download-page-sections.tsx` or splitting out another section component instead of re-growing `download-page.tsx`
- Keep the page visually stable unless a design task explicitly asks for UI changes
- When adding a released desktop app, update the product entry with `releaseUrl`, `repoUrl`, `license.url`, version, and platform availability together
- In the desktop `Module Responsibilities` cards, keep the icon on its own row at `xl` widths so bilingual text length does not squeeze the product mark
- Local media tooling currently available on the primary Windows workstation: `magick convert`, `ffmpeg`, and an NVIDIA RTX 4060 Ti for future accelerated media-processing workflows
- The current repository root and project folder name is `ucdt-app`

## Deployment

This project is intended for deployment on Vercel.

## License

GPL 3.0
