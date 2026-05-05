import { createSocialSvg, svgResponse } from "@/lib/metadata-svg";

export const size = { width: 1200, height: 630 };
export const contentType = "image/svg+xml";

export default function OpenGraphImage() {
  return svgResponse(
    createSocialSvg({
      width: size.width,
      height: size.height,
      eyebrow: "UCDT SERIES",
      title: "Urban Carbon DTs' Core",
      description: "Releases, previews, and product roles for Extraction, Processing, Analysis, Computing, and Planning.",
      footer: "Bitcookies · ONing · Vercel-ready Next.js site",
    }),
  );
}
