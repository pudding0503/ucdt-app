import { pngResponse, renderPwaLogoPng } from "@/lib/pwa-assets";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default async function Icon() {
  return pngResponse(await renderPwaLogoPng(size.width));
}
