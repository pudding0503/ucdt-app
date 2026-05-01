# DESIGN

## Design Goal
The site should echo the visual feeling of the provided `example-web` reference while remaining an original, maintainable implementation tailored to the five-product UCDT suite.

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
- Open Screen-inspired floating navbar with GitHub CTA
- Product switcher as the primary interaction model
- Platform-specific download buttons presented as standalone actions
- Shared download/details area that updates with the active tab
- Secondary sections for ecosystem context and FAQ

## Content Strategy
- Bilingual Chinese / English copy from the first release
- Released apps show real version information and GitHub Releases links
- Unreleased apps use polished placeholder visuals rather than empty states

## Asset Strategy
- `assets/logo.png` is the site brand mark
- Each product folder follows this asset convention:
  - `logo.png`: transparent logo asset
  - `logo-rounded.png`: rounded rectangle icon for product switchers
  - `logo-words.png`: horizontal wordmark for centered product title display
- Procedural concept visuals remain the primary preview for every product
- Real screenshots are shown below the concept visual when available
- Only Processing and Analysis currently have public GitHub repositories and release links

## Interaction Notes
- Switching products should update:
  - accent color
  - release badge
  - copy blocks
  - download CTA behavior
  - preview visuals
  - centered wordmark and platform download buttons
- Navigation remains lightweight and anchored within the same page
