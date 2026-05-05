import { pngResponse, renderPwaLogoPng } from "@/lib/pwa-assets";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return pngResponse(await renderPwaLogoPng(size.width));
}
