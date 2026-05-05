type IconSvgOptions = {
  size: number;
  radius: number;
};

type SocialSvgOptions = {
  width: number;
  height: number;
  eyebrow: string;
  title: string;
  description: string;
  footer: string;
};

export function svgResponse(svg: string) {
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

export function createIconSvg({ size, radius }: IconSvgOptions) {
  const outerInset = Math.max(10, Math.round(size * 0.05));
  const innerSize = Math.round(size * 0.48);
  const innerRadius = Math.round(innerSize * 0.28);
  const fontSize = Math.round(size * 0.22);

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">
    <defs>
      <linearGradient id="bg" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stop-color="#07110d" />
        <stop offset="45%" stop-color="#04070d" />
        <stop offset="100%" stop-color="#020409" />
      </linearGradient>
      <linearGradient id="panel" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stop-color="rgba(13,18,32,0.82)" />
        <stop offset="100%" stop-color="rgba(8,12,24,0.74)" />
      </linearGradient>
      <linearGradient id="mark" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stop-color="rgba(52,178,123,0.30)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0.10)" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="30%" r="50%">
        <stop offset="0%" stop-color="rgba(52,178,123,0.32)" />
        <stop offset="100%" stop-color="rgba(52,178,123,0)" />
      </radialGradient>
    </defs>
    <rect width="${size}" height="${size}" rx="${radius}" fill="url(#bg)" />
    <rect width="${size}" height="${size}" rx="${radius}" fill="url(#glow)" />
    <rect x="${outerInset}" y="${outerInset}" width="${size - outerInset * 2}" height="${size - outerInset * 2}" rx="${Math.max(12, radius - outerInset)}" fill="url(#panel)" stroke="rgba(255,255,255,0.12)" />
    <rect x="${Math.round((size - innerSize) / 2)}" y="${Math.round((size - innerSize) / 2)}" width="${innerSize}" height="${innerSize}" rx="${innerRadius}" fill="url(#mark)" stroke="rgba(255,255,255,0.14)" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Inter, Arial, sans-serif" font-size="${fontSize}" font-weight="700" letter-spacing="-${Math.max(2, Math.round(size * 0.01))}">U</text>
  </svg>`;
}

export function createSocialSvg({ width, height, eyebrow, title, description, footer }: SocialSvgOptions) {
  const cardInset = Math.round(width * 0.025);
  const cardRadius = Math.round(width * 0.03);
  const paddingX = Math.round(width * 0.053);
  const paddingY = Math.round(height * 0.09);
  const titleFontSize = Math.round(width * 0.06);
  const descFontSize = Math.round(width * 0.0225);
  const footerFontSize = Math.round(width * 0.018);
  const eyebrowFontSize = Math.round(width * 0.015);
  const logoSize = Math.round(width * 0.065);
  const logoRadius = Math.round(logoSize * 0.3);
  const lineOneY = paddingY + 10;
  const titleY = Math.round(height * 0.58);
  const descY = titleY + Math.round(descFontSize * 1.85);
  const footerY = height - paddingY + Math.round(footerFontSize * 0.2);

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
    <defs>
      <linearGradient id="bg" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stop-color="#07110d" />
        <stop offset="45%" stop-color="#04070d" />
        <stop offset="100%" stop-color="#020409" />
      </linearGradient>
      <linearGradient id="panel" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stop-color="rgba(13,18,32,0.84)" />
        <stop offset="100%" stop-color="rgba(8,12,24,0.72)" />
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(52,178,123,0.28)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0.08)" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="20%" r="50%">
        <stop offset="0%" stop-color="rgba(52,178,123,0.24)" />
        <stop offset="100%" stop-color="rgba(52,178,123,0)" />
      </radialGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)" />
    <rect width="${width}" height="${height}" fill="url(#glow)" />
    <rect x="${cardInset}" y="${cardInset}" width="${width - cardInset * 2}" height="${height - cardInset * 2}" rx="${cardRadius}" fill="url(#panel)" stroke="rgba(255,255,255,0.1)" />
    <rect x="${paddingX}" y="${paddingY}" width="${logoSize}" height="${logoSize}" rx="${logoRadius}" fill="url(#accent)" stroke="rgba(255,255,255,0.14)" />
    <text x="${paddingX + logoSize / 2}" y="${paddingY + logoSize / 2 + 2}" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Inter, Arial, sans-serif" font-size="${Math.round(logoSize * 0.46)}" font-weight="700" letter-spacing="-${Math.max(2, Math.round(width * 0.004))}">U</text>
    <text x="${paddingX + logoSize + Math.round(width * 0.018)}" y="${lineOneY + logoSize / 2}" fill="rgba(255,255,255,0.48)" font-family="Inter, Arial, sans-serif" font-size="${eyebrowFontSize}" font-weight="600" letter-spacing="${Math.max(4, Math.round(width * 0.004))}" text-transform="uppercase">${eyebrow}</text>
    <text x="${paddingX}" y="${titleY}" fill="white" font-family="Inter, Arial, sans-serif" font-size="${titleFontSize}" font-weight="700" letter-spacing="-${Math.max(2, Math.round(width * 0.0025))}">${title}</text>
    <text x="${paddingX}" y="${descY}" fill="rgba(255,255,255,0.72)" font-family="Inter, Arial, sans-serif" font-size="${descFontSize}" font-weight="500">${description}</text>
    <text x="${paddingX}" y="${footerY}" fill="rgba(255,255,255,0.56)" font-family="Inter, Arial, sans-serif" font-size="${footerFontSize}" font-weight="500">${footer}</text>
  </svg>`;
}
