import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import { siteMetadata } from "@/lib/site-metadata";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  themeColor: "#02050b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
