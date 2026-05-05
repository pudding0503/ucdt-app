import { pngResponse, renderPwaLogoPng } from "@/lib/pwa-assets";

export async function GET() {
  return pngResponse(await renderPwaLogoPng(192));
}
