import type { Metadata } from "next";
import { products, siteMeta } from "@/data/products";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const defaultProductionSiteUrl = "https://ucdt-app.vercel.app";
const fallbackSiteUrl = "http://localhost:3000";
const resolvedSiteUrl = configuredSiteUrl ?? (process.env.VERCEL ? defaultProductionSiteUrl : fallbackSiteUrl);
const hasPublicSiteOrigin = resolvedSiteUrl !== fallbackSiteUrl;

export const siteOrigin = new URL(resolvedSiteUrl.startsWith("http") ? resolvedSiteUrl : `https://${resolvedSiteUrl}`);

const keywords = [
  "UCDT",
  "UCDT Series",
  "urban digital twin",
  "urban computing",
  "city analysis",
  "digital twin software",
  "城市数字孪生",
  "城市计算",
  "能耗模拟",
  "建筑分析",
  "规划决策",
  ...products.map((product) => product.slug),
];

export const siteMetadata: Metadata = {
  metadataBase: siteOrigin,
  applicationName: siteMeta.name,
  title: {
    default: "UCDT Series | Urban Carbon DTs' Core",
    template: `%s | ${siteMeta.name}`,
  },
  description:
    "A bilingual download hub for the UCDT Series, covering extraction, processing, analysis, computing, and planning tools for urban digital twin workflows.",
  keywords,
  authors: [{ name: "ONing" }],
  creator: "ONing",
  publisher: "Bitcookies",
  category: "technology",
  classification: "Urban digital twin software",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
      { url: "/icon", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  alternates: hasPublicSiteOrigin
    ? {
        canonical: "/",
        languages: {
          "zh-CN": "/",
          en: "/?lang=en",
        },
      }
    : undefined,
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    siteName: siteMeta.name,
    title: "UCDT Series | Urban Carbon DTs' Core",
    description:
      "A bilingual UCDT landing page for releases, previews, and product overview across extraction, processing, analysis, computing, and planning workflows.",
    url: hasPublicSiteOrigin ? "/" : undefined,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "UCDT Series",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UCDT Series | Urban Carbon DTs' Core",
    description:
      "Explore releases, previews, and workflow roles for the five UCDT desktop tools in one bilingual landing page.",
    creator: "ONing",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: {
    capable: true,
    title: siteMeta.name,
    statusBarStyle: "black-translucent",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
