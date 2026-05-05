import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const logoPath = join(process.cwd(), "assets", "logo.png");

export async function renderPwaLogoPng(size: number) {
  const source = await readFile(logoPath);

  return sharp(source)
    .resize(size, size, {
      fit: "contain",
      background: {
        r: 0,
        g: 0,
        b: 0,
        alpha: 0,
      },
    })
    .png()
    .toBuffer();
}

export function pngResponse(buffer: Buffer) {
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
