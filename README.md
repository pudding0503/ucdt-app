# UCDT Web

A bilingual Next.js landing and download page for the UCDT software suite.

## Features
- Single-page tabbed product experience for 5 UCDT applications
- Dark glassmorphism visual system inspired by the provided reference site
- Centered hero layout with GitHub CTA and per-platform download buttons
- Chinese / English content switching
- Real release metadata and GitHub Releases links for Processing and Analysis
- Procedural concept visuals retained as the main preview layer
- Real screenshots rendered below the concept visual when available
- Vercel-friendly Next.js structure

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

## Asset Conventions
- `assets/logo.png`: site logo
- Product `logo.png`: transparent product logo asset
- Product `logo-rounded.png`: product switcher icon
- Product `logo-words.png`: centered product wordmark
- At the moment, only Processing and Analysis expose public GitHub release/license links

## Deployment
This project is intended for deployment on Vercel.
