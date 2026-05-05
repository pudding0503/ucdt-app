import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "UCDT Series",
    short_name: "UCDT",
    description: "A bilingual download hub for the UCDT urban digital twin desktop suite.",
    start_url: "/",
    display: "standalone",
    background_color: "#020409",
    theme_color: "#02050b",
    lang: "zh-CN",
    icons: [
      {
        src: "/icon?size=192",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        src: "/icon?size=512",
        sizes: "512x512",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/svg+xml",
      },
    ],
  };
}
