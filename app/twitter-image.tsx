import { createSocialSvg, svgResponse } from "@/lib/metadata-svg";

export const size = { width: 1200, height: 600 };
export const contentType = "image/svg+xml";

export default function TwitterImage() {
  return svgResponse(
    createSocialSvg({
      width: size.width,
      height: size.height,
      eyebrow: "UCDT SERIES",
      title: "Urban Carbon DTs' Core",
      description: "Bilingual releases, previews, and product roles for the five-part UCDT workflow.",
      footer: "Extraction · Processing · Analysis · Computing · Planning",
    }),
  );
}
