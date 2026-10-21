import { createSocialImage, pngResponse } from "@/lib/social-image";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  return pngResponse(await createSocialImage({
    width: size.width,
    height: size.height,
    eyebrow: "UCDT SERIES",
    title: "Urban Carbon DTs' Core",
    description: "Releases, previews, and product roles for Extraction, Processing, Analysis, Computing, and Planning.",
    footer: "Bitcookies · ONing · Vercel-ready Next.js site",
  }));
}
