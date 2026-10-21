import { createSocialImage, pngResponse } from "@/lib/social-image";

export const size = { width: 1200, height: 600 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function TwitterImage() {
  return pngResponse(await createSocialImage({
    width: size.width,
    height: size.height,
    eyebrow: "UCDT SERIES",
    title: "Urban Carbon DTs' Core",
    description: "Bilingual releases, previews, and product roles for the five-part UCDT workflow.",
    footer: "Extraction · Processing · Analysis · Computing · Planning",
  }));
}
