import { createIconSvg, svgResponse } from "@/lib/metadata-svg";

export const size = { width: 512, height: 512 };
export const contentType = "image/svg+xml";

export default function Icon() {
  return svgResponse(createIconSvg({ size: size.width, radius: 96 }));
}
