import sharp from "sharp";

type SocialImageOptions = {
  width: number;
  height: number;
  eyebrow: string;
  title: string;
  description: string;
  footer: string;
};

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };

    return entities[character];
  });
}

export async function createSocialImage({
  width,
  height,
  eyebrow,
  title,
  description,
  footer,
}: SocialImageOptions) {
  const paddingX = Math.round(width * 0.053);
  const paddingY = Math.round(height * 0.09);
  const titleFontSize = Math.round(width * 0.06);
  const descriptionFontSize = Math.round(width * 0.0225);
  const footerFontSize = Math.round(width * 0.018);
  const eyebrowFontSize = Math.round(width * 0.015);
  const logoSize = Math.round(width * 0.065);
  const titleY = Math.round(height * 0.58);
  const descriptionY = titleY + Math.round(descriptionFontSize * 1.85);
  const footerY = height - paddingY + Math.round(footerFontSize * 0.2);
  const logoCenterX = paddingX + logoSize / 2;
  const logoCenterY = paddingY + logoSize / 2 + 2;
  const image = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="background" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stop-color="#07110d"/>
          <stop offset="45%" stop-color="#04070d"/>
          <stop offset="100%" stop-color="#020409"/>
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="20%" r="50%">
          <stop offset="0%" stop-color="#34b27b" stop-opacity="0.24"/>
          <stop offset="100%" stop-color="#34b27b" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="panel" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stop-color="#0d1220" stop-opacity="0.84"/>
          <stop offset="100%" stop-color="#080c18" stop-opacity="0.72"/>
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#34b27b" stop-opacity="0.28"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.08"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#background)"/>
      <rect width="${width}" height="${height}" fill="url(#glow)"/>
      <rect x="${Math.round(width * 0.025)}" y="${Math.round(width * 0.025)}"
        width="${width - Math.round(width * 0.05)}" height="${height - Math.round(width * 0.05)}"
        rx="${Math.round(width * 0.03)}" fill="url(#panel)" stroke="#ffffff" stroke-opacity="0.1"/>
      <rect x="${paddingX}" y="${paddingY}" width="${logoSize}" height="${logoSize}"
        rx="${Math.round(logoSize * 0.3)}" fill="url(#accent)" stroke="#ffffff" stroke-opacity="0.14"/>
      <text x="${logoCenterX}" y="${logoCenterY}" dominant-baseline="middle" text-anchor="middle"
        fill="white" font-family="Arial, sans-serif" font-size="${Math.round(logoSize * 0.46)}" font-weight="700">U</text>
      <text x="${paddingX + logoSize + Math.round(width * 0.018)}" y="${paddingY + 10 + logoSize / 2}"
        fill="#ffffff" fill-opacity="0.48" font-family="Arial, sans-serif" font-size="${eyebrowFontSize}"
        font-weight="600" letter-spacing="${Math.max(4, Math.round(width * 0.004))}">${escapeXml(eyebrow)}</text>
      <text x="${paddingX}" y="${titleY}" fill="white" font-family="Arial, sans-serif"
        font-size="${titleFontSize}" font-weight="700" letter-spacing="-${Math.max(2, Math.round(width * 0.0025))}">${escapeXml(title)}</text>
      <text x="${paddingX}" y="${descriptionY}" fill="#ffffff" fill-opacity="0.72"
        font-family="Arial, sans-serif" font-size="${descriptionFontSize}" font-weight="500">${escapeXml(description)}</text>
      <text x="${paddingX}" y="${footerY}" fill="#ffffff" fill-opacity="0.56"
        font-family="Arial, sans-serif" font-size="${footerFontSize}" font-weight="500">${escapeXml(footer)}</text>
    </svg>`;

  return sharp(Buffer.from(image)).png().toBuffer();
}

export function pngResponse(buffer: Buffer) {
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
