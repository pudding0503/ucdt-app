import Image from "next/image";
import type { CSSProperties } from "react";
import bitcookiesWords from "@/assets/bitcookies-words.svg";
import workflowLink from "@/assets/link.png";
import {
  DatabaseIcon,
  PaletteIcon,
  SparkIcon,
  GitHubIcon,
  InfoIcon,
  ChevronIcon,
  PlatformIcon,
} from "@/components/site-icons";
import {
  ecosystemHighlights,
  faqItems,
  products,
  siteMeta,
  type Locale,
  type Product,
  type ProductStatus,
} from "@/data/products";

const highlightIcons = [DatabaseIcon, PaletteIcon, SparkIcon] as const;
const statusText: Record<ProductStatus, Record<Locale, string>> = {
  released: { zh: "现已可用", en: "Available now" },
  comingSoon: { zh: "敬请期待", en: "Coming soon" },
};

type TopNavProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  githubUrl: string;
  accent: Product["accent"];
};

type HeroSectionProps = {
  locale: Locale;
  activeProduct: Product;
  isReleased: boolean;
  displayVersion: string;
  releaseLines: string[];
};

type DownloadsSectionProps = {
  locale: Locale;
  activeProduct: Product;
};

type ProductSwitcherProps = {
  locale: Locale;
  activeId: string;
  onProductChange: (productId: string) => void;
};

type ProductOverviewSectionProps = {
  locale: Locale;
  activeProduct: Product;
  activeStatus: ProductStatus;
  displayVersion: string;
};

type HighlightsSectionProps = {
  locale: Locale;
  activeProduct: Product;
};

type FaqSectionProps = {
  locale: Locale;
  openFaq: number | null;
  onFaqChange: (index: number | null) => void;
};

type SiteFooterProps = {
  locale: Locale;
};

export type ThemeStyle = CSSProperties & {
  "--accent"?: string;
  "--accent-soft"?: string;
  "--accent-surface"?: string;
};

export function markdownToLines(markdown?: string) {
  if (!markdown) {
    return [] as string[];
  }

  return markdown
    .split("\n")
    .map((line) => line.replace(/^###\s*/, "").replace(/^-\s*/, "• ").trim())
    .filter(Boolean);
}

export function getShortName(slug: string) {
  return slug.replace("UCDT ", "").replace(" Core", "");
}

export function getDisplayVersion(version: string, locale: Locale) {
  return version === "Planned" ? (locale === "zh" ? "规划中" : "Planned") : version;
}

export function TopNav({ locale, onLocaleChange, githubUrl, accent }: TopNavProps) {
  return (
    <header className="fixed left-1/2 top-4 z-50 w-[95%] max-w-5xl -translate-x-1/2 sm:top-6 sm:w-[90%]">
      <div className="glass-nav flex items-center justify-between gap-3 rounded-2xl px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Image src={siteMeta.logo} alt="UCDT logo" className="h-6 w-auto sm:h-8" priority />
          <span className="hidden truncate text-base font-semibold tracking-tight text-white sm:inline-block sm:text-lg">{siteMeta.name}</span>
          <span
            className="rounded-full border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider sm:px-2 sm:text-[10px]"
            style={{ color: accent.secondary, backgroundColor: accent.surface, borderColor: accent.glow }}
          >
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
                  onClick={() => onLocaleChange(value)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-standard ${selected ? "bg-white text-black" : "text-white/65 hover:text-white"}`}
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
            className="interactive-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white"
          >
            <GitHubIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Star on GitHub</span>
            <span className="sm:hidden">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export function HeroSection({ locale, activeProduct, isReleased, displayVersion, releaseLines }: HeroSectionProps) {
  return (
    <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center px-4 pb-28 pt-36 text-center sm:px-6 lg:px-8 lg:pt-44">
      <div className="pointer-events-none absolute left-1/2 top-10 z-0 h-[88rem] w-[140vw] max-w-none -translate-x-1/2 hero-grid opacity-[0.08] sm:top-12 sm:h-[92rem] lg:top-16 lg:h-[96rem]" />
      <div className="max-w-4xl">
        <div className="release-pill group relative z-30 inline-flex cursor-default items-center gap-2 rounded-full px-4 py-2 text-xs text-white/82 sm:text-sm">
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-3 w-3 rounded-full opacity-70 group-hover:animate-ping" style={{ backgroundColor: activeProduct.accent.primary }} />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: activeProduct.accent.primary }} />
          </span>
          <span>
            {isReleased
              ? `${displayVersion}. ${locale === "zh" ? "当前公开版本" : "Public release available"}`
              : locale === "zh"
                ? `${displayVersion}. 当前为概念预览阶段`
                : `${displayVersion}. Currently shown as a concept preview`}
          </span>
          {releaseLines.length ? (
            <div className="release-popover pointer-events-none invisible absolute left-1/2 top-full z-50 mt-3 w-[22rem] -translate-x-1/2 translate-y-3 scale-[0.97] rounded-2xl p-4 text-left opacity-0 transition-standard group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
              <div className="relative">
                <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-white/42">{locale === "zh" ? "版本更新说明" : "GitHub Release Notes"}</p>
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
          {locale === "zh" ? "低碳城市数字孪生" : "Urban Carbon DTs'"}
          <br />
          <span style={{ color: activeProduct.accent.secondary }}>
            {locale === "zh" ? "系列软件" : "Series Apps"}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/58 sm:text-lg">{activeProduct.tagline[locale]}</p>

        <p className="mt-5 text-sm text-white/36 sm:text-base">{activeProduct.category[locale]}</p>

        <div id="downloads" className="mt-12">
          <DownloadsSection locale={locale} activeProduct={activeProduct} />
        </div>
      </div>
    </section>
  );
}

export function DownloadsSection({ locale, activeProduct }: DownloadsSectionProps) {
  return (
    <div className="flex flex-col items-center gap-6">
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
                className="platform-button platform-button--active inline-flex min-w-[200px] items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-black"
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
              className="platform-button inline-flex min-w-[200px] items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-white/45"
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
            <span>{locale === "zh" ? "如果 macOS 提示 “App is damaged”，请运行以下命令" : 'If macOS says "App is damaged", run this command'}</span>
            <span className="group relative inline-flex">
              <InfoIcon className="h-3 w-3 cursor-help text-white/20 transition-colors hover:text-white/40" />
              <span className="release-popover pointer-events-none invisible absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 translate-y-2 scale-[0.97] rounded-xl p-2.5 opacity-0 transition-standard group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="absolute inset-0 rounded-xl bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
                <span className="relative block text-left text-[10px] leading-5 text-white/72">
                  {locale === "zh"
                    ? "首次下载的未签名应用在 macOS 上可能会被隔离，这条命令用于移除隔离属性。"
                    : "Unsigned apps downloaded from the web may be quarantined by macOS. This command removes the quarantine attribute."}
                </span>
              </span>
            </span>
          </p>
          <code className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] text-white/55 sm:text-xs">
            xattr -rd com.apple.quarantine /Applications/UCDT-xx.app
          </code>
        </div>
      </div>
    </div>
  );
}

export function ProductSwitcher({ locale, activeId, onProductChange }: ProductSwitcherProps) {
  return (
    <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {products.map((product) => {
        const selected = product.id === activeId;
        return (
          <button
            key={product.id}
            type="button"
            onClick={() => onProductChange(product.id)}
            className="product-switch-card rounded-[1.6rem] border px-4 py-4 text-left backdrop-blur-md"
            style={{
              borderColor: selected ? product.accent.primary : "rgba(255,255,255,0.1)",
              background: selected ? `linear-gradient(180deg, rgba(13,18,28,0.98), ${product.accent.surface})` : "rgba(10,14,22,0.82)",
              boxShadow: selected ? `0 20px 50px ${product.accent.glow}` : "none",
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-[58px] w-[58px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#111827] p-1.5">
                <div className="flex aspect-square h-11 w-11 items-center justify-center overflow-hidden rounded-xl">
                  <Image src={product.icon} alt={`${product.slug} icon`} width={44} height={44} className="h-11 w-11 object-cover" />
                </div>
              </div>
              <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] uppercase tracking-[0.2em] text-white/60">
                {product.badge[locale]}
              </span>
            </div>
            <p className="mt-4 text-lg font-semibold text-white">{getShortName(product.slug)}</p>
            <p className="mt-2 text-sm text-white/62">{product.category[locale]}</p>
          </button>
        );
      })}
    </div>
  );
}

export function ProductOverviewSection({ locale, activeProduct, activeStatus, displayVersion }: ProductOverviewSectionProps) {
  return (
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
              {statusText[activeStatus][locale]}
            </span>
          </div>

          <p className="text-lg text-white/68">{activeProduct.category[locale]}</p>
          <p className="max-w-2xl text-sm leading-7 text-white/58 sm:text-base">{activeProduct.releaseNote[locale]}</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DetailCard label={locale === "zh" ? "版本" : "Version"} value={displayVersion} />
          <DetailCard label={locale === "zh" ? "平台" : "Platforms"} value={activeProduct.platforms.join(" · ")} compact />
          <div className="detail-card rounded-[1.5rem] p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-white/40">{locale === "zh" ? "许可证" : "License"}</p>
            {activeProduct.license.url ? (
              <a href={activeProduct.license.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-lg font-medium text-white/86 transition hover:text-white">
                {activeProduct.license.name}
              </a>
            ) : (
              <p className="mt-4 text-lg font-medium text-white/80">{activeProduct.license.name}</p>
            )}
          </div>
          <div className="detail-card rounded-[1.5rem] p-5">
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
  );
}

export function HighlightsSection({ locale, activeProduct }: HighlightsSectionProps) {
  return (
    <section id="highlights" className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-white/40">{locale === "zh" ? "体系亮点" : "Ecosystem Highlights"}</p>
        <h2 className="mt-3 max-w-3xl text-2xl font-semibold text-white sm:text-3xl">
          {locale === "zh"
            ? "从数据准备、模拟计算到规划决策，UCDT 的五个核心模块可以自然串联。"
            : "From data preparation and simulation to planning and decision-making, UCDT’s five core modules can be seamlessly integrated."}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {ecosystemHighlights.map((item, index) => {
            const Icon = highlightIcons[index] ?? SparkIcon;

            return (
              <div key={item.en} className="detail-card rounded-[1.5rem] p-5">
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

        <div className="mt-12">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-white/40">{locale === "zh" ? "模块分工" : "Module Responsibilities"}</p>
            <p className="mt-3 text-sm leading-7 text-white/54 sm:text-base">
              {locale === "zh"
                ? "按软件查看五个核心模块分别承担的工作内容，便于快速理解整套体系如何串联。"
                : "See how each core app contributes a distinct role within the full five-part workflow."}
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {products.map((product) => {
              const selected = product.id === activeProduct.id;

              return (
                <div
                  key={`workflow-${product.id}`}
                  className="rounded-[1.5rem] border p-5"
                  style={{
                    borderColor: selected ? product.accent.primary : "rgba(255,255,255,0.08)",
                    background: `linear-gradient(180deg, rgba(11,16,24,0.96), ${product.accent.surface})`,
                    boxShadow: selected ? `0 18px 42px ${product.accent.glow}` : "none",
                  }}
                >
                  <div className="flex items-center gap-3 xl:flex-col xl:items-start xl:gap-4">
                    <div className="shrink-0 flex h-[54px] w-[54px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#111827] p-1.5">
                      <div className="flex aspect-square h-10 w-10 items-center justify-center overflow-hidden rounded-xl">
                        <Image src={product.icon} alt={`${product.slug} icon`} width={40} height={40} className="h-10 w-10 object-cover" />
                      </div>
                    </div>
                    <div className="min-w-0 xl:w-full">
                      <p className="truncate text-base font-semibold text-white xl:overflow-visible xl:whitespace-normal xl:text-clip">{getShortName(product.slug)}</p>
                      <p className="mt-1 text-xs text-white/46">{product.category[locale]}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-white/42">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: product.accent.primary }} />
                    <span>{product.badge[locale]}</span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/72">{product.workflowRole[locale]}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-14 rounded-[2rem] bg-white/[0.02] px-4 py-6 sm:px-6 sm:py-8">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">{locale === "zh" ? "流程关系图" : "Workflow Map"}</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
              {locale === "zh" ? "UCDT 系列软件流程关系" : "UCDT Series Apps Flow Diagram."}
            </p>
          </div>
          <div className="mx-auto max-w-6xl">
            <Image src={workflowLink} alt="UCDT workflow map" className="h-auto w-full" priority />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqSection({ locale, openFaq, onFaqChange }: FaqSectionProps) {
  return (
    <section id="faq" className="relative mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold text-white md:text-4xl">{locale === "zh" ? "常见问题" : "Frequently Asked Questions"}</h2>
        <div className="mt-12 space-y-2">
          {faqItems.map((item, index) => {
            const isOpen = openFaq === index;

            return (
              <div key={item.question.en} className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => onFaqChange(isOpen ? null : index)}
                  className="group flex w-full items-center justify-between py-6 text-left focus:outline-none"
                >
                  <span className="text-lg font-medium text-white/90 transition-colors group-hover:text-[var(--accent)]">{item.question[locale]}</span>
                  <span className={`ml-4 text-2xl text-white/40 transition-standard ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                {isOpen ? <div className="pb-6 pr-10 text-sm leading-7 text-white/60 sm:text-base">{item.answer[locale]}</div> : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ locale }: SiteFooterProps) {
  const footerDescriptionLines = siteMeta.description[locale].split("\n");

  return (
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
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] sm:text-[11px]" style={{ color: "#686C6E" }}>
            <p>GPL 3.0 License</p>
            <span className="hidden sm:inline">·</span>
            <p>© 2026 <a href="https://bitcookies.nousbuild.com/" target="_blank" rel="noopener noreferrer">Bitcookies</a></p>
            <span className="hidden sm:inline">·</span>
            <p>Developed by <a href="https://www.nousbuild.org/" target="_blank" rel="noopener noreferrer">ONing</a></p>
          </div>
          <Image src={bitcookiesWords} alt="Bitcookies" width={140} height={40} className="mt-8 h-8 w-auto opacity-80" />
        </div>
      </div>
    </footer>
  );
}

function DetailCard({ label, value, compact = false }: { label: string; value: string; compact?: boolean }) {
  return (
    <div className="detail-card rounded-[1.5rem] p-5">
      <p className="text-sm uppercase tracking-[0.28em] text-white/40">{label}</p>
      <p className={`mt-4 font-semibold text-white ${compact ? "text-lg font-medium text-white/80" : "text-3xl"}`}>{value}</p>
    </div>
  );
}
