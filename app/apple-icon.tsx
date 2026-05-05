import { createIconSvg, svgResponse } from "@/lib/metadata-svg";

export const size = { width: 180, height: 180 };
export const contentType = "image/svg+xml";

export default function AppleIcon() {
  return svgResponse(createIconSvg({ size: size.width, radius: 36 }));
}
