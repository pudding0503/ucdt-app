import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "UCDT Series",
    short_name: "UCDT",
    description: "A bilingual installable download hub for the UCDT urban digital twin desktop suite.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#020409",
    theme_color: "#02050b",
    lang: "zh-CN",
    categories: ["productivity", "utilities", "developer"],
    prefer_related_applications: false,
    icons: [
      {
        src: "/pwa-icon-192",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
