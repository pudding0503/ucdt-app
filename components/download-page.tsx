"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CSSProperties, SVGProps } from "react";
import bitcookiesWords from "@/assets/bitcookies-words.svg";
import workflowLink from "@/assets/link.png";
import { ProductPreview } from "@/components/product-preview";
import {
  ecosystemHighlights,
  faqItems,
  products,
  siteMeta,
  type DownloadPlatform,
  type Locale,
  type ProductStatus,
} from "@/data/products";

type ThemeStyle = CSSProperties & {
  "--accent"?: string;
  "--accent-soft"?: string;
  "--accent-surface"?: string;
};

const statusText: Record<ProductStatus, Record<Locale, string>> = {
  released: { zh: "现已可用", en: "Available now" },
  comingSoon: { zh: "敬请期待", en: "Coming soon" },
};

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.343-3.369-1.343-.454-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.071 1.532 1.033 1.532 1.033.892 1.53 2.341 1.088 2.91.832.091-.647.349-1.088.635-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.56 9.56 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.481A10.019 10.019 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z" />
    </svg>
  );
}

function InfoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8Zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42Zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24Z" />
    </svg>
  );
}

function ChevronIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3l-22.6-22.6c-12.5-12.5-32.8-12.5-45.3 0L224 261.5 77.3 114.7c-12.5-12.5-32.8-12.5-45.3 0L9.4 137.4c-12.5 12.5-12.5 32.8 0 45.3l192 192Z" />
    </svg>
  );
}

function DatabaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
      <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  );
}

function PaletteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 3a9 9 0 0 0 0 18h1.1a2.4 2.4 0 0 0 0-4.8h-.6a1.7 1.7 0 0 1-1.7-1.7 1.7 1.7 0 0 1 .7-1.4l1.8-1.2A4.8 4.8 0 0 0 12 3Z" />
      <circle cx="7.5" cy="10" r="1" />
      <circle cx="9.5" cy="7" r="1" />
      <circle cx="14.5" cy="7.5" r="1" />
    </svg>
  );
}

function SparkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m12 3 1.8 4.7L18.5 9l-4.7 1.3L12 15l-1.8-4.7L5.5 9l4.7-1.3L12 3Z" />
      <path d="M19 15.5 20 18l2.5 1-2.5 1L19 22.5 18 20l-2.5-1 2.5-1 1-2.5Z" />
    </svg>
  );
}

function markdownToLines(markdown?: string) {
  if (!markdown) {
    return [] as string[];
  }

  return markdown
    .split("\n")
    .map((line) => line.replace(/^###\s*/, "").replace(/^-\s*/, "• ").trim())
    .filter(Boolean);
}

function PlatformIcon({ platform, className }: { platform: DownloadPlatform; className?: string }) {
  if (platform === "macOS") {
    return (
      <svg viewBox="0 0 384 512" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
    );
  }

  if (platform === "Windows") {
    return (
      <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M220.8 123.3c1 .5 1.8 1.7 3 1.7 1.1 0 2.8-.4 2.9-1.5.2-1.4-1.9-2.3-3.2-2.9-1.7-.7-3.9-1-5.5-.1-.4.2-.8.7-.6 1.1.3 1.3 2.3 1.1 3.4 1.7zm-21.9 1.7c1.2 0 2-1.2 3-1.7 1.1-.6 3.1-.4 3.5-1.6.2-.4-.2-.9-.6-1.1-1.6-.9-3.8-.6-5.5.1-1.3.6-3.4 1.5-3.2 2.9.1 1 1.8 1.5 2.8 1.4zM420 403.8c-3.6-4-5.3-11.6-7.2-19.7-1.8-8.1-3.9-16.8-10.5-22.4-1.3-1.1-2.6-2.1-4-2.9-1.3-.8-2.7-1.5-4.1-2 9.2-27.3 5.6-54.5-3.7-79.1-11.4-30.1-31.3-56.4-46.5-74.4-17.1-21.5-33.7-41.9-33.4-72C311.1 85.4 315.7.1 234.8 0 132.4-.2 158 103.4 156.9 135.2c-1.7 23.4-6.4 41.8-22.5 64.7-18.9 22.5-45.5 58.8-58.1 96.7-6 17.9-8.8 36.1-6.2 53.3-6.5 5.8-11.4 14.7-16.6 20.2-4.2 4.3-10.3 5.9-17 8.3s-14 6-18.5 14.5c-2.1 3.9-2.8 8.1-2.8 12.4 0 3.9.6 7.9 1.2 11.8 1.2 8.1 2.5 15.7.8 20.8-5.2 14.4-5.9 24.4-2.2 31.7 3.8 7.3 11.4 10.5 20.1 12.3 17.3 3.6 40.8 2.7 59.3 12.5 19.8 10.4 39.9 14.1 55.9 10.4 11.6-2.6 21.1-9.6 25.9-20.2 12.5-.1 26.3-5.4 48.3-6.6 14.9-1.2 33.6 5.3 55.1 4.1.6 2.3 1.4 4.6 2.5 6.7 10 19.3 28.8 32 54.8 26.2 7.4-1.6 14.7-3.6 21.5-6.7 16.1-7.3 34.8-19.5 48.4-20.7 13.8-1.2 26.9.7 36-4.8 6.8-4.1 10.5-11.2 10.5-21.8 0-6.4-1.5-13.4-4.6-20.8z" />
    </svg>
  );
}

function getShortName(slug: string) {
  return slug.replace("UCDT ", "").replace(" Core", "");
}

export function DownloadPage() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [activeId, setActiveId] = useState(products[1].id);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeProduct = useMemo(
    () => products.find((product) => product.id === activeId) ?? products[0],
    [activeId],
  );

  const isReleased = activeProduct.status === "released";
  const activeStatus: ProductStatus = activeProduct.status;
  const githubUrl = activeProduct.repoUrl ?? siteMeta.githubUrl;
  const releaseLines = markdownToLines(activeProduct.releaseMarkdown);
  const footerDescriptionLines = siteMeta.description[locale].split("\n");
  const highlightIcons = [DatabaseIcon, PaletteIcon, SparkIcon] as const;

  const themeStyle: ThemeStyle = {
    "--accent": activeProduct.accent.primary,
    "--accent-soft": activeProduct.accent.glow,
    "--accent-surface": activeProduct.accent.surface,
  };

  return (
    <main style={themeStyle} className="relative isolate overflow-hidden bg-[#02050b] text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-[-8rem] h-[32rem] blur-3xl"
        style={{ background: `radial-gradient(circle, ${activeProduct.accent.glow} 0%, transparent 68%)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-[10%] right-[-12rem] h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${activeProduct.accent.surface} 0%, transparent 70%)` }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-[-18rem] h-[34rem] bg-[radial-gradient(circle_at_center,rgba(52,178,123,0.18),transparent_62%)] blur-3xl" />

      <header className="fixed left-1/2 top-4 z-50 w-[95%] max-w-5xl -translate-x-1/2 sm:top-6 sm:w-[90%]">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Image src={siteMeta.logo} alt="UCDT logo" className="h-6 w-auto sm:h-8" priority />
            <span className="hidden truncate text-base font-semibold tracking-tight text-white sm:inline-block sm:text-lg">{siteMeta.name}</span>
            <span className="rounded-full border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider sm:px-2 sm:text-[10px]" style={{ color: activeProduct.accent.secondary, backgroundColor: activeProduct.accent.surface, borderColor: activeProduct.accent.glow }}>
              Beta
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="glass-chip hidden items-center rounded-full p-1 sm:flex">
              {(["zh", "en"] as const).map((value) => {
                const selected = locale === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setLocale(value)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${selected ? "bg-white text-black" : "text-white/65 hover:text-white"}`}
                  >
                    {value === "zh" ? "中文" : "EN"}
                  </button>
                );
              })}
            </div>
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm font-medium text-white transition hover:bg-white/[0.12]"
            >
              <GitHubIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Star on GitHub</span>
              <span className="sm:hidden">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center px-4 pb-28 pt-36 text-center sm:px-6 lg:px-8 lg:pt-44">
        <div className="pointer-events-none absolute left-1/2 top-10 z-0 h-[72rem] w-[140vw] max-w-none -translate-x-1/2 hero-grid opacity-[0.08] sm:top-12 lg:top-16" />
        <div className="max-w-4xl">
          <div className="group relative z-30 inline-flex cursor-default items-center gap-2 rounded-full border border-white/10 bg-[#08121ccc] px-4 py-2 text-xs text-white/82 shadow-[0_8px_32px_rgba(0,0,0,0.38)] backdrop-blur-xl transition-all duration-300 hover:bg-[#0b1621f2] hover:text-white sm:text-sm">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-3 w-3 rounded-full opacity-70 group-hover:animate-ping" style={{ backgroundColor: activeProduct.accent.primary }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: activeProduct.accent.primary }} />
            </span>
            <span>
              {isReleased
                ? `${activeProduct.version}. ${locale === "zh" ? "当前公开版本" : "Public release available"}`
                : locale === "zh"
                  ? `${activeProduct.version}. 当前为概念预览阶段`
                  : `${activeProduct.version}. Currently shown as a concept preview`}
            </span>
            {releaseLines.length ? (
              <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 mt-3 w-[22rem] -translate-x-1/2 translate-y-3 scale-[0.97] rounded-2xl border border-white/10 bg-[#08121cf2] p-4 text-left opacity-0 shadow-[0_18px_60px_rgba(0,0,0,0.52)] backdrop-blur-[24px] transition-all duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
                <div className="relative">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-white/42">GitHub Release Notes</p>
                  <div className="space-y-1.5 text-xs leading-6 text-white/92">
                    {releaseLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <h1 className="mt-8 text-balance text-4xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            {locale === "zh" ? "UCDT 城市数字孪生" : "Urban digital twin tools"}
            <br />
            <span style={{ color: activeProduct.accent.secondary }}>
              {locale === "zh" ? "软件下载与展示页" : "for downloads and previews"}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/58 sm:text-lg">
            {activeProduct.tagline[locale]}
          </p>

          <p className="mt-5 text-sm text-white/36 sm:text-base">
            {activeProduct.category[locale]}
          </p>

          <div id="downloads" className="mt-12 flex flex-col items-center gap-6">
            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
            {activeProduct.downloads.map((download) => {
              const platformLabel = download.platform === "macOS" ? "Mac" : download.platform;
              const label = locale === "zh" ? `下载 ${platformLabel}` : `Download for ${platformLabel}`;
              const isAvailable = Boolean(download.available && download.href);

              if (isAvailable) {
                return (
                  <a
                    key={download.platform}
                    href={download.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-w-[200px] items-center justify-between rounded-lg bg-[#E5E5E5] px-4 py-2.5 text-sm font-medium text-black shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-white hover:shadow-xl active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-2.5">
                      <PlatformIcon platform={download.platform} className="mb-0.5 h-[18px] w-[18px]" />
                      <span>{label}</span>
                    </div>
                    <ChevronIcon className="h-[10px] w-[10px] text-black/50" />
                  </a>
                );
              }

              return (
                <button
                  key={download.platform}
                  type="button"
                  disabled
                  className="inline-flex min-w-[200px] items-center justify-between rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-white/45"
                >
                  <div className="flex items-center gap-2.5">
                    <PlatformIcon platform={download.platform} className="mb-0.5 h-[18px] w-[18px]" />
                    <span>{label}</span>
                  </div>
                  <ChevronIcon className="h-[10px] w-[10px] text-white/30" />
                </button>
              );
            })}
            </div>

            <div className="max-w-md">
              <div className="flex flex-col items-center gap-1.5">
                <p className="flex items-center gap-1 text-[10px] text-white/30 sm:text-xs">
                  <span>If macOS says &quot;App is damaged&quot;, run this command</span>
                  <span className="group relative inline-flex">
                    <InfoIcon className="h-3 w-3 cursor-help text-white/20 transition-colors hover:text-white/40" />
                    <span className="pointer-events-none invisible absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 translate-y-2 scale-[0.97] rounded-xl border border-white/10 bg-[#08121cf2] p-2.5 opacity-0 shadow-[0_18px_60px_rgba(0,0,0,0.46)] backdrop-blur-[22px] transition-all duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                      <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <span className="absolute inset-0 rounded-xl bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
                      <span className="relative block text-left text-[10px] leading-5 text-white/72">
                        {locale === "zh" ? "首次下载的未签名应用在 macOS 上可能会被隔离，这条命令用于移除隔离属性。" : "Unsigned apps downloaded from the web may be quarantined by macOS. This command removes the quarantine attribute."}
                      </span>
                    </span>
                  </span>
                </p>
                <code className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] text-white/55 sm:text-xs">
                  xattr -rd com.apple.quarantine /Applications/Openscreen.app
                </code>
              </div>
            </div>
          </div>
        </div>

        <div id="products" className="mt-20 w-full">
          <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {products.map((product) => {
              const selected = product.id === activeProduct.id;
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setActiveId(product.id)}
                  className="rounded-[1.6rem] border px-4 py-4 text-left transition duration-300 hover:-translate-y-0.5"
                  style={{
                    borderColor: selected ? product.accent.primary : "rgba(255,255,255,0.08)",
                    background: selected ? `linear-gradient(180deg, ${product.accent.surface}, rgba(255,255,255,0.04))` : "rgba(255,255,255,0.03)",
                    boxShadow: selected ? `0 20px 50px ${product.accent.glow}` : "none",
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-1.5">
                      <Image src={product.icon} alt={`${product.slug} icon`} className="h-11 w-11 rounded-xl" />
                    </div>
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.2em] text-white/55">
                      {product.badge[locale]}
                    </span>
                  </div>
                  <p className="mt-4 text-lg font-semibold text-white">{getShortName(product.slug)}</p>
                  <p className="mt-2 text-sm text-white/62">{product.category[locale]}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-20 w-full max-w-6xl">
          <ProductPreview product={activeProduct} locale={locale} />
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <div className="flex flex-col items-start gap-4 text-left">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.22em]"
                style={{
                  borderColor: activeProduct.accent.primary,
                  color: activeProduct.accent.secondary,
                  backgroundColor: activeProduct.accent.surface,
                }}
              >
                {activeProduct.badge[locale]}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/50">
                {locale === "zh" ? statusText[activeStatus].zh : statusText[activeStatus].en}
              </span>
            </div>

            <p className="text-lg text-white/68">{activeProduct.category[locale]}</p>
            <p className="max-w-2xl text-sm leading-7 text-white/58 sm:text-base">{activeProduct.releaseNote[locale]}</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-white/40">{locale === "zh" ? "版本" : "Version"}</p>
              <p className="mt-4 text-3xl font-semibold text-white">{activeProduct.version}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-white/40">{locale === "zh" ? "平台" : "Platforms"}</p>
              <p className="mt-4 text-lg font-medium text-white/80">{activeProduct.platforms.join(" · ")}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-white/40">License</p>
              {activeProduct.license.url ? (
                <a href={activeProduct.license.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-lg font-medium text-white/86 transition hover:text-white">
                  {activeProduct.license.name}
                </a>
              ) : (
                <p className="mt-4 text-lg font-medium text-white/80">{activeProduct.license.name}</p>
              )}
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-white/40">GitHub</p>
              {activeProduct.releaseUrl ? (
                <a href={activeProduct.releaseUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-lg font-medium text-white/86 transition hover:text-white">
                  {locale === "zh" ? "打开 Releases" : "Open Releases"}
                </a>
              ) : (
                <p className="mt-4 text-lg font-medium text-white/80">{locale === "zh" ? "暂未公开" : "Not public yet"}</p>
              )}
            </div>
          </div>

          <div className="mt-8 grid gap-3">
            {activeProduct.highlights.map((item) => (
              <div key={item.en} className="glass-chip flex items-start gap-3 rounded-[1.25rem] px-4 py-4">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: activeProduct.accent.primary }} />
                <p className="text-sm leading-7 text-white/72 sm:text-base">{item[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="highlights" className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">{locale === "zh" ? "体系亮点" : "Ecosystem Highlights"}</p>
          <h2 className="mt-3 max-w-3xl text-2xl font-semibold text-white sm:text-3xl">
            {locale === "zh"
              ? "从数据准备到规划决策，UCDT 的五个核心模块可以自然串联。"
              : "From data preparation to planning decisions, the five UCDT modules are designed to connect naturally."}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {ecosystemHighlights.map((item, index) => {
              const Icon = highlightIcons[index] ?? SparkIcon;

              return (
                <div key={item.en} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                  <div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white"
                    style={{ boxShadow: `0 12px 36px ${activeProduct.accent.glow}` }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-7 text-white/72 sm:text-base">{item[locale]}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-14 rounded-[2rem] bg-white/[0.02] px-4 py-6 sm:px-6 sm:py-8">
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">Workflow Map</h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
                {locale === "zh" ? "按你提供的关系图素材直接展示，并保持原始比例。" : "Using the provided workflow artwork directly while preserving its original aspect ratio."}
              </p>
            </div>
            <div className="mx-auto max-w-6xl">
              <Image src={workflowLink} alt="UCDT workflow map" className="h-auto w-full" priority />
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="relative mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-white md:text-4xl">
            {locale === "zh" ? "常见问题" : "Frequently Asked Questions"}
          </h2>
          <div className="mt-12 space-y-2">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={item.question.en} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="group flex w-full items-center justify-between py-6 text-left focus:outline-none"
                  >
                    <span className="text-lg font-medium text-white/90 transition-colors group-hover:text-[var(--accent)]">
                      {item.question[locale]}
                    </span>
                    <span className={`ml-4 text-2xl text-white/40 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                  {isOpen ? (
                    <div className="pb-6 pr-10 text-sm leading-7 text-white/60 sm:text-base">
                      {item.answer[locale]}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <hr className="border-white/10" />
          <div className="relative z-10 flex flex-col items-center px-6 py-12 text-center">
            <div className="mb-8 flex items-center gap-3">
              <Image src={siteMeta.logo} alt="UCDT Series" className="h-8 w-auto opacity-90" />
              <span className="text-xl font-bold tracking-tight text-white">{siteMeta.name}</span>
            </div>
            <p className="mb-10 max-w-md text-sm leading-relaxed text-white/40">
              {footerDescriptionLines.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < footerDescriptionLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] text-white/16 sm:text-xs">
              <p>GPL 3.0 License</p>
              <span className="hidden text-white/10 sm:inline">·</span>
              <p>© 2026 Bitcookies</p>
              <span className="hidden text-white/10 sm:inline">·</span>
              <p>develop by ONing</p>
            </div>
            <Image src={bitcookiesWords} alt="Bitcookies" width={140} height={40} className="mt-8 h-8 w-auto opacity-80" />
          </div>
        </div>
      </footer>
    </main>
  );
 }
