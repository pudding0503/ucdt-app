import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UCDT Suite | Urban Computing Digital Twin Downloads",
  description:
    "A bilingual download hub for the UCDT software suite, covering extraction, processing, analysis, computing, and planning tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
