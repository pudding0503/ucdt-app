import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type FocusEvent } from "react";
import bitcookiesWords from "@/assets/bitcookies-words.svg";
import workflowLink from "@/assets/link.png";
import {
  pageSectionShellClass,
  pageSectionTightSpacingClass,
  pageSectionSpacingClass,
  pageSectionWideSpacingClass,
  pageSectionHeaderClass,
  pageSectionTitleClass,
  pageSectionBlockTopClass,
  pageSectionSubBlockTopClass,
  pageSectionLargeBlockTopClass,
  pagePanelPaddingClass,
  pageHeroSectionClass,
  pageHeroBackdropGridClass,
  pageProductSwitchBadgeClass,
  pageProductSwitchCardClass,
  pageProductSwitchCategoryClass,
  pageProductSwitchHeaderClass,
  pageProductSwitchIconFrameClass,
  pageProductSwitchIconImageClass,
  pageProductSwitchIconInnerClass,
  pageProductSwitchTitleClass,
  pageProductSwitcherGridClass,
  pageProductSwitcherWrapClass,
  pageStackGapClass,
  pageCompactGapClass,
  pageGridGapClass,
  pageBulletRowClass,
  pageBulletDotClass,
  pageInlineDotTextClass,
  pageInlineDotClass,
} from "@/components/layout-spacing";
import {
  DatabaseIcon,
  PaletteIcon,
  SparkIcon,
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  GitHubIcon,
  InfoIcon,
  LicenseIcon,
  ChevronIcon,
  PlatformIcon,
} from "@/components/site-icons";
import {
  ecosystemHighlights,
  faqItems,
  siteMeta,
  type DownloadPlatform,
  type Locale,
  type Product,
  type ProductStatus,
} from "@/data/products";

const highlightIcons = [DatabaseIcon, PaletteIcon, SparkIcon] as const;
const statusText: Record<ProductStatus, Record<Locale, string>> = {
  released: { zh: "现已可用", en: "Released" },
  comingSoon: { zh: "敬请期待", en: "Coming" },
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
  releaseLines: ReleaseNoteBlock[];
};

type DownloadsSectionProps = {
  locale: Locale;
  activeProduct: Product;
};

type ProductSwitcherProps = {
  locale: Locale;
  products: Product[];
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
  products: Product[];
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
  "--hero-title-gradient-from"?: string;
  "--hero-title-gradient-to"?: string;
};

type ReleaseNoteImage = {
  alt: string;
  src: string;
};

type ReleaseNoteBadge = {
  label: string;
  value: string;
  tone: "blue" | "orange" | "neutral";
};

type ReleaseNoteBlock =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "listItem";
      content: string;
    }
  | {
      type: "images";
      images: ReleaseNoteImage[];
    };

 type ReleaseNoteInlineSegment =
   | {
       type: "text";
       content: string;
     }
   | {
       type: "code";
       content: string;
     }
   | {
       type: "link";
       label: string;
       href: string;
     };

 function parseReleaseNoteInlineSegments(content: string): ReleaseNoteInlineSegment[] {
   const pattern = /(\[[^\]]+\]\((https?:\/\/[^\s)]+)\)|`[^`]+`)/g;
   const segments: ReleaseNoteInlineSegment[] = [];
   let lastIndex = 0;

   for (const match of content.matchAll(pattern)) {
     const [fullMatch] = match;
     const matchIndex = match.index ?? 0;

     if (matchIndex > lastIndex) {
       segments.push({
         type: "text",
         content: content.slice(lastIndex, matchIndex),
       });
     }

     if (fullMatch.startsWith("`") && fullMatch.endsWith("`")) {
       segments.push({
         type: "code",
         content: fullMatch.slice(1, -1),
       });
     } else {
       const linkMatch = fullMatch.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);

       if (linkMatch) {
         segments.push({
           type: "link",
           label: linkMatch[1],
           href: linkMatch[2],
         });
       }
     }

     lastIndex = matchIndex + fullMatch.length;
   }

   if (lastIndex < content.length) {
     segments.push({
       type: "text",
       content: content.slice(lastIndex),
     });
   }

   return segments;
 }

export function markdownToLines(markdown?: string): ReleaseNoteBlock[] {
  if (!markdown) {
    return [] as ReleaseNoteBlock[];
  }

  return markdown
    .split("\n")
    .flatMap((line) => {
      const trimmedLine = line.trim();

      if (!trimmedLine) {
        return [] as ReleaseNoteBlock[];
      }

      const imageMatches = [...trimmedLine.matchAll(/!\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g)];
      const isListItem = /^-\s*/.test(trimmedLine);
      const textContent = trimmedLine
        .replace(/!\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g, "")
        .replace(/^###\s*/, "")
        .replace(/^-\s*/, "")
        .trim();

      const blocks: ReleaseNoteBlock[] = [];

      if (textContent) {
        blocks.push({
          type: isListItem ? "listItem" : "text",
          content: textContent,
        });
      }

      if (imageMatches.length) {
        blocks.push({
          type: "images",
          images: imageMatches.map((match) => ({
            alt: match[1] || "Release badge",
            src: match[2],
          })),
        });
      }

      return blocks;
    });
}

export function getShortName(slug: string) {
  return slug.replace("UCDT ", "").replace(" Core", "");
}

export function getDisplayVersion(version: string, locale: Locale) {
  return version === "Planned" ? (locale === "zh" ? "规划中" : "Planned") : version;
}

function getPlatformDisplayLabel(platform: DownloadPlatform) {
  return platform === "macOS" ? "Mac" : platform;
}

function getDownloadLabel(locale: Locale, platform: DownloadPlatform) {
  const platformLabel = getPlatformDisplayLabel(platform);

  return locale === "zh" ? `获取 ${platformLabel} 版` : `Get ${platformLabel}`;
}

function isDownloadPlatform(platform: string): platform is DownloadPlatform {
  return platform === "macOS" || platform === "Windows" || platform === "Linux";
}

function normalizeLicenseName(licenseName: string) {
  return licenseName.replace(/\s+/g, "-");
}

function parseStaticShieldsBadge(src: string): ReleaseNoteBadge | null {
  try {
    const url = new URL(src);

    if (url.hostname !== "img.shields.io") {
      return null;
    }

    if (!url.pathname.startsWith("/badge/")) {
      return null;
    }

    const escapedHyphen = "\u0000";
    const badgeParts = decodeURIComponent(url.pathname.slice("/badge/".length))
      .replace(/--/g, escapedHyphen)
      .split("-");

    if (badgeParts.length < 3) {
      return null;
    }

    const label = badgeParts.shift()?.replaceAll(escapedHyphen, "-");
    const color = badgeParts.pop();
    const value = badgeParts.join("-").replaceAll(escapedHyphen, "-");

    if (!label || !value || !color) {
      return null;
    }

    return {
      label,
      value,
      tone: color.toLowerCase().includes("blue") ? "blue" : "neutral",
    };
  } catch {
    return null;
  }
}

function getReleaseNoteBadge(image: ReleaseNoteImage, activeProduct: Product): ReleaseNoteBadge | null {
  const staticBadge = parseStaticShieldsBadge(image.src);

  if (staticBadge) {
    return staticBadge;
  }

  try {
    const url = new URL(image.src);
    const alt = image.alt.toLowerCase();

    if (url.hostname === "img.shields.io" && url.pathname.includes("/github/license/") && alt.includes("license")) {
      return {
        label: "license",
        value: normalizeLicenseName(activeProduct.license.name),
        tone: "orange",
      };
    }
  } catch {
    return null;
  }

  return null;
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
  const [releasePopoverOpen, setReleasePopoverOpen] = useState(false);
  const [releasePopoverVisible, setReleasePopoverVisible] = useState(false);
  const inlineCodeStyle = {
    color: activeProduct.accent.secondary,
    borderColor: activeProduct.accent.glow,
    background: `linear-gradient(180deg, rgba(6,10,16,0.96), ${activeProduct.accent.surface})`,
  };
  const releasePopoverWrapClass = `absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3 ${
    releasePopoverVisible ? "visible pointer-events-auto" : "pointer-events-none invisible"
  }`;
  const releasePopoverPanelClass = `release-popover rounded-2xl p-4 text-left transition-standard ${
    releasePopoverOpen
      ? "translate-y-0 scale-100 opacity-100"
      : "translate-y-3 scale-[0.97] opacity-0"
  }`;
  const handleReleasePopoverBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setReleasePopoverOpen(false);
    }
  };

  useEffect(() => {
    if (releasePopoverOpen) {
      setReleasePopoverVisible(true);
      return;
    }

    const timeoutId = window.setTimeout(() => setReleasePopoverVisible(false), 300);

    return () => window.clearTimeout(timeoutId);
  }, [releasePopoverOpen]);

  const renderReleaseNoteInlineSegments = (content: string, keyPrefix: string) => (
    parseReleaseNoteInlineSegments(content).map((segment, segmentIndex) => (
      segment.type === "text" ? (
        <span key={`${keyPrefix}-text-${segmentIndex}`}>{segment.content}</span>
      ) : segment.type === "code" ? (
        <code
          key={`${keyPrefix}-code-${segmentIndex}`}
          className="mx-0.5 rounded-md border px-1.5 py-0.5 text-[11px] font-medium"
          style={inlineCodeStyle}
        >
          {segment.content}
        </code>
      ) : (
        <a
          key={`${keyPrefix}-link-${segmentIndex}`}
          href={segment.href}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2"
          style={{ color: activeProduct.accent.secondary }}
        >
          {segment.label}
        </a>
      )
    ))
  );
  const renderReleaseNoteImage = (image: ReleaseNoteImage) => {
    const badge = getReleaseNoteBadge(image, activeProduct);

    if (badge) {
      return (
        <span key={`${image.src}-${image.alt}`} className={`release-badge-chip release-badge-chip--${badge.tone}`}>
          <span>{badge.label}</span>
          <strong>{badge.value}</strong>
        </span>
      );
    }

    return (
      <img
        key={`${image.src}-${image.alt}`}
        src={image.src}
        alt={image.alt}
        className="h-5 w-auto rounded-sm"
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
    );
  };

  return (
    <section className={`${pageSectionShellClass} ${pageHeroSectionClass}`}>
      <div className={pageHeroBackdropGridClass} />
      <div className="max-w-4xl">
        <div
          className="relative z-30 inline-flex flex-col items-center"
          onMouseEnter={() => setReleasePopoverOpen(true)}
          onMouseLeave={() => setReleasePopoverOpen(false)}
          onFocus={() => setReleasePopoverOpen(true)}
          onBlur={handleReleasePopoverBlur}
        >
          <div className="release-pill inline-flex cursor-default items-center gap-2 rounded-full px-4 py-2 text-xs text-white/82 sm:text-sm">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className={`absolute inline-flex h-3 w-3 rounded-full opacity-70 ${releasePopoverOpen ? "animate-ping" : ""}`} style={{ backgroundColor: activeProduct.accent.primary }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: activeProduct.accent.primary }} />
            </span>
            <span>
              {isReleased
                ? `${displayVersion}. ${locale === "zh" ? "当前公开版本" : "Public release"}`
                : locale === "zh"
                  ? `${displayVersion}. 当前为概念预览阶段`
                  : `${displayVersion}. Concept preview`}
            </span>
          </div>
          {releaseLines.length ? (
            <div className={releasePopoverWrapClass}>
              <div className={releasePopoverPanelClass}>
                <div className="relative">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-white/42">{locale === "zh" ? "版本更新说明" : "GitHub Release Notes"}</p>
                  <div className="space-y-1.5 text-xs leading-6 text-white/92">
                    {releaseLines.map((line, index) => (
                      line.type === "text" ? (
                        <p key={`${line.content}-${index}`}>
                          {renderReleaseNoteInlineSegments(line.content, `text-${index}`)}
                        </p>
                      ) : line.type === "listItem" ? (
                        <div key={`${line.content}-${index}`} className="flex gap-3">
                          <span className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: activeProduct.accent.primary, boxShadow: `0 0 12px ${activeProduct.accent.glow}` }} />
                          <p className="min-w-0 flex-1">{renderReleaseNoteInlineSegments(line.content, `list-${index}`)}</p>
                        </div>
                      ) : (
                        <div key={`images-${index}`} className="flex flex-wrap items-center gap-1.5">
                          {line.images.map(renderReleaseNoteImage)}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <h1 className="mt-8 text-balance text-4xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
          {locale === "zh" ? "低碳城市数字孪生" : "Urban Carbon DTs'"}
          <br />
          <span className="hero-title-gradient">
            {locale === "zh" ? "系列软件" : "Series Apps"}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-7 text-white/58 sm:text-lg">{activeProduct.tagline[locale]}</p>

        <p className="mt-5 text-balance text-sm text-white/36 sm:text-base">{activeProduct.category[locale]}</p>

        <div id="downloads" className={pageSectionBlockTopClass}>
          <DownloadsSection locale={locale} activeProduct={activeProduct} />
        </div>
      </div>
    </section>
  );
}

export function DownloadsSection({ locale, activeProduct }: DownloadsSectionProps) {
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [openPlatformMenu, setOpenPlatformMenu] = useState<"macOS" | null>(null);
  const macMenuRef = useRef<HTMLDivElement | null>(null);
  const quarantineCommand = "xattr -rd com.apple.quarantine /Applications/UCDT-xx.app";
  const noteTextStyle = { color: activeProduct.accent.secondary };
  const macMenuItems = locale === "zh"
    ? [
        { title: "Apple Silicon" },
        { title: "Intel Chip", detail: "旧款 Mac (x64)" },
      ]
    : [
        { title: "Apple Silicon" },
        { title: "Intel Chip", detail: "Older Macs (x64)" },
      ];

  useEffect(() => {
    if (!copiedCommand) {
      return;
    }

    const timeoutId = window.setTimeout(() => setCopiedCommand(false), 1600);

    return () => window.clearTimeout(timeoutId);
  }, [copiedCommand]);

  useEffect(() => {
    setOpenPlatformMenu(null);
  }, [activeProduct.id]);

  useEffect(() => {
    if (openPlatformMenu !== "macOS") {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (macMenuRef.current && !macMenuRef.current.contains(event.target as Node)) {
        setOpenPlatformMenu(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPlatformMenu(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openPlatformMenu]);

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(quarantineCommand);
      setCopiedCommand(true);
    } catch {
      setCopiedCommand(false);
    }
  };

  return (
    <div className={`flex flex-col items-center ${pageStackGapClass}`}>
      <div key={activeProduct.id} className={`flex flex-col items-stretch justify-center ${pageCompactGapClass} sm:flex-row sm:flex-wrap`}>
        {activeProduct.downloads.map((download) => {
          const isMacDownload = download.platform === "macOS";
          const isLinuxDownload = download.platform === "Linux";
          const label = getDownloadLabel(locale, download.platform);
          const directHref = isLinuxDownload ? activeProduct.repoUrl : download.href;
          const isDirectAction = Boolean(isLinuxDownload ? activeProduct.repoUrl : download.available && download.href);
          const isMacMenuEnabled = isMacDownload && activeProduct.status === "released";
          const macMenuOpen = openPlatformMenu === "macOS";

          if (isMacDownload) {
            return (
              <div key={download.platform} ref={macMenuRef} className="relative min-w-[200px]">
                <button
                  type="button"
                  onClick={() => setOpenPlatformMenu((current) => (current === "macOS" ? null : "macOS"))}
                  disabled={!isMacMenuEnabled}
                  aria-expanded={isMacMenuEnabled ? macMenuOpen : undefined}
                  aria-haspopup={isMacMenuEnabled ? "menu" : undefined}
                  aria-controls={isMacMenuEnabled ? `${activeProduct.id}-mac-download-menu` : undefined}
                  className={`platform-button relative inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-standard ${isMacMenuEnabled ? "platform-button--active text-black" : "text-white/45"}`}
                >
                  <div className="flex items-center gap-2.5">
                    <PlatformIcon platform={download.platform} className="mb-0.5 h-[18px] w-[18px]" />
                    <span>{label}</span>
                  </div>
                  <ChevronIcon className={`absolute right-4 h-[10px] w-[10px] transition-standard ${isMacMenuEnabled ? "text-black/50" : "text-white/30"} ${macMenuOpen ? "rotate-180" : "rotate-0"}`} />
                </button>

                {isMacMenuEnabled ? (
                  <div
                    id={`${activeProduct.id}-mac-download-menu`}
                    role="menu"
                    className={`release-popover absolute left-0 top-full z-50 mt-3 w-full min-w-[200px] overflow-hidden rounded-lg text-left transition-standard ${macMenuOpen ? "visible translate-y-0 scale-100 opacity-100" : "pointer-events-none invisible translate-y-3 scale-[0.97] opacity-0"}`}
                  >
                    <div className="relative">
                      {macMenuItems.map((item, index) => (
                        <button
                          key={item.title}
                          type="button"
                          role="menuitem"
                          className={`group block w-full text-left transition-standard hover:bg-white/[0.04] ${index === 0 ? "rounded-t-lg px-4 pb-2.5 pt-4" : "border-t border-white/30 px-4 py-2.5"}`}
                        >
                          <p className="text-sm font-semibold leading-6 text-white/94 transition-standard group-hover:text-white">{item.title}</p>
                          {item.detail ? (
                            <p className="mt-0.5 text-[11px] leading-4 text-white/30 transition-standard group-hover:text-white/42">{item.detail}</p>
                          ) : null}
                        </button>
                      ))}
                      <div className="text-balance border-t border-white/30 px-4 pb-4 pt-3 text-center text-[10px] leading-[0.85rem] text-white/30">
                        {locale === "zh" ? "* 安装完成后，请阅读下方说明。" : "* Read command and instruction below post installation."}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          }

          if (isDirectAction && directHref) {
            return (
              <a
                key={download.platform}
                href={directHref}
                target="_blank"
                rel="noreferrer"
                className="platform-button platform-button--active inline-flex min-w-[200px] items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-black"
              >
                <div className="flex items-center gap-2.5">
                  <PlatformIcon platform={download.platform} className="mb-0.5 h-[18px] w-[18px]" />
                  <span>{label}</span>
                </div>
              </a>
            );
          }

          return (
            <button
              key={download.platform}
              type="button"
              disabled
              className="platform-button inline-flex min-w-[200px] items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-white/45"
            >
              <div className="flex items-center gap-2.5">
                <PlatformIcon platform={download.platform} className="mb-0.5 h-[18px] w-[18px]" />
                <span>{label}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className={`max-w-md ${pageSectionSubBlockTopClass}`}>
        <div className="flex flex-col items-center gap-1.5">
          <p className="flex items-center gap-1 text-[9px] sm:text-[11px]">
            <span className="opacity-50" style={noteTextStyle}>{locale === "zh" ? "如果 macOS 提示 “App is damaged”，请运行以下命令" : 'If macOS says "App is damaged", run this command'}</span>
            <span className="group relative inline-flex">
              <InfoIcon className="h-3 w-3 cursor-help text-white/20 transition-colors hover:text-white/40" />
              <span className="release-popover pointer-events-none invisible absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 translate-y-2 scale-[0.97] rounded-2xl p-2.5 opacity-0 transition-standard group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                <span className="relative block text-left text-[10px] leading-5 text-white/72">
                  {locale === "zh"
                    ? "首次下载的未签名应用在 macOS 上可能会被隔离，这条命令用于移除隔离属性。"
                    : "Unsigned apps downloaded from the web may be quarantined by macOS. This command removes the quarantine attribute."}
                </span>
              </span>
            </span>
          </p>
          <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5">
            <code className="min-w-0 overflow-x-auto whitespace-nowrap text-[9px] opacity-60 sm:text-[11px]" style={noteTextStyle}>{quarantineCommand}</code>
            <button
              type="button"
              onClick={handleCopyCommand}
              className="inline-flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full transition-standard hover:bg-white/6"
              style={{ color: activeProduct.accent.secondary }}
              aria-label={copiedCommand ? (locale === "zh" ? "已复制命令" : "Command copied") : locale === "zh" ? "复制命令" : "Copy command"}
              title={copiedCommand ? (locale === "zh" ? "已复制" : "Copied") : locale === "zh" ? "复制" : "Copy"}
            >
              <span className="relative h-3 w-3">
                <CopyIcon className={`absolute inset-0 h-3 w-3 transition-standard ${copiedCommand ? "scale-75 opacity-0" : "scale-100 opacity-60"}`} />
                <CheckIcon className={`absolute inset-0 h-3 w-3 transition-standard ${copiedCommand ? "scale-100 opacity-80" : "scale-75 opacity-0"}`} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductSwitcher({ locale, products, activeId, onProductChange }: ProductSwitcherProps) {
  return (
    <div className={pageProductSwitcherWrapClass}>
      <div className={pageProductSwitcherGridClass}>
        {products.map((product) => {
          const selected = product.id === activeId;
          return (
            <button
              key={product.id}
              type="button"
              onClick={() => onProductChange(product.id)}
              className={pageProductSwitchCardClass}
              style={{
                borderColor: selected ? product.accent.primary : "rgba(255,255,255,0.1)",
                background: selected ? `linear-gradient(180deg, rgba(13,18,28,0.98), ${product.accent.surface})` : "rgba(10,14,22,0.82)",
                boxShadow: selected ? `0 20px 50px ${product.accent.glow}` : "none",
              }}
            >
              <div className={pageProductSwitchHeaderClass}>
                <div className={pageProductSwitchIconFrameClass}>
                  <div className={pageProductSwitchIconInnerClass}>
                    <Image src={product.icon} alt={`${product.slug} icon`} width={44} height={44} className={pageProductSwitchIconImageClass} />
                  </div>
                </div>
                <span className={pageProductSwitchBadgeClass}>
                  {product.badge[locale]}
                </span>
              </div>
              <p className={pageProductSwitchTitleClass}>{getShortName(product.slug)}</p>
              <p className={pageProductSwitchCategoryClass}>{product.category[locale]}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ProductOverviewSection({ locale, activeProduct, activeStatus, displayVersion }: ProductOverviewSectionProps) {
  return (
    <section className={`${pageSectionShellClass} ${pageSectionTightSpacingClass}`}>
      <div className={`glass-panel rounded-[2rem] ${pagePanelPaddingClass}`}>
        <div className={`flex flex-col items-start text-left ${pageStackGapClass}`}>
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

          <p className="text-balance text-lg text-white/68">{activeProduct.category[locale]}</p>
          <p className="max-w-2xl text-balance text-sm leading-7 text-white/58 sm:text-base">{activeProduct.releaseNote[locale]}</p>
        </div>

        <div className={`${pageSectionBlockTopClass} grid ${pageGridGapClass} md:grid-cols-2 xl:grid-cols-4`}>
          <DetailCard label={locale === "zh" ? "版本" : "Version"} value={displayVersion} />
          <div className="detail-card rounded-[1.5rem] p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-white/40">{locale === "zh" ? "平台" : "Platforms"}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {activeProduct.platforms.map((platform) => (
                <span key={platform} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-white/82">
                  {isDownloadPlatform(platform) ? <PlatformIcon platform={platform} className="h-4 w-4" /> : null}
                  {isDownloadPlatform(platform) ? getPlatformDisplayLabel(platform) : platform}
                </span>
              ))}
            </div>
          </div>
          <div className="detail-card rounded-[1.5rem] p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-white/40">{locale === "zh" ? "许可证" : "License"}</p>
            {activeProduct.license.url ? (
              <a href={activeProduct.license.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-lg font-medium text-white/86 transition hover:text-white">
                <LicenseIcon className="h-5 w-5" />
                {activeProduct.license.name}
              </a>
            ) : (
              <p className="mt-4 inline-flex items-center gap-2 text-lg font-medium text-white/80">
                <LicenseIcon className="h-5 w-5" />
                {activeProduct.license.name}
              </p>
            )}
          </div>
          <div className="detail-card rounded-[1.5rem] p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-white/40">GitHub</p>
            {activeProduct.releaseUrl ? (
              <a href={activeProduct.releaseUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-lg font-medium text-white/86 transition hover:text-white">
                <GitHubIcon className="h-5 w-5" />
                {locale === "zh" ? "打开 Releases" : "Open Releases"}
                <ExternalLinkIcon className="h-4 w-4 text-white/42" />
              </a>
            ) : (
              <p className="mt-4 text-lg font-medium text-white/80">{locale === "zh" ? "暂未公开" : "Not public yet"}</p>
            )}
          </div>
        </div>

        <div className={`${pageSectionBlockTopClass} grid ${pageCompactGapClass}`}>
          {activeProduct.highlights.map((item) => (
            <div key={item.en} className={`glass-chip rounded-[1.25rem] px-4 py-4 ${pageBulletRowClass}`}>
              <span className={pageBulletDotClass} style={{ backgroundColor: activeProduct.accent.primary }} />
              <p className="text-sm leading-7 text-white/72 sm:text-base">{item[locale]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HighlightsSection({ locale, activeProduct, products }: HighlightsSectionProps) {
  return (
    <section id="highlights" className={`${pageSectionShellClass} ${pageSectionWideSpacingClass}`}>
      <div className={`glass-panel rounded-[2rem] ${pagePanelPaddingClass}`}>
        <p className="text-sm uppercase tracking-[0.3em] text-white/40">{locale === "zh" ? "体系亮点" : "Ecosystem Highlights"}</p>
        <h2 className="mt-4 max-w-3xl text-balance text-2xl font-semibold text-white sm:text-3xl">
          {locale === "zh"
            ? "从数据准备、模拟计算到规划决策，UCDT 的五个核心模块可以自然串联。"
            : "From data prep and simulation to planning, UCDT’s five core apps work as one connected flow."}
        </h2>
        <div className={`${pageSectionBlockTopClass} grid ${pageGridGapClass} md:grid-cols-3`}>
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
                <p className="text-balance text-sm leading-7 text-white/72 sm:text-base">{item[locale]}</p>
              </div>
            );
          })}
        </div>

        <div className={pageSectionLargeBlockTopClass}>
          <div className="max-w-4xl">
            <p className={`uppercase text-white/40 ${locale === "zh" ? "text-sm tracking-[0.3em]" : "text-[11px] tracking-[0.2em] sm:text-sm sm:tracking-[0.26em]"}`}>{locale === "zh" ? "模块分工" : "Module Responsibilities"}</p>
            <p className="mt-4 text-balance text-sm leading-7 text-white/54 sm:text-base">
              {locale === "zh"
                ? "按软件查看五个核心模块分别承担的工作内容，便于快速理解整套体系如何串联。"
                : "See how each app fits into the five-part workflow."}
            </p>
          </div>
          <div className={`${pageSectionSubBlockTopClass} grid ${pageGridGapClass} sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5`}>
            {products.map((product) => {
              const selected = product.id === activeProduct.id;

              return (
                <div
                  key={`workflow-${product.id}`}
                  className="rounded-[1.5rem] border p-5 lg:min-h-[16.5rem]"
                  style={{
                    borderColor: selected ? product.accent.primary : "rgba(255,255,255,0.08)",
                    background: `linear-gradient(180deg, rgba(11,16,24,0.96), ${product.accent.surface})`,
                    boxShadow: selected ? `0 18px 42px ${product.accent.glow}` : "none",
                  }}
                >
                  <div className="flex items-center gap-3 2xl:flex-col 2xl:items-start 2xl:gap-4">
                    <div className="shrink-0 flex h-[54px] w-[54px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#111827] p-1.5">
                      <div className="flex aspect-square h-10 w-10 items-center justify-center overflow-hidden rounded-xl">
                        <Image src={product.icon} alt={`${product.slug} icon`} width={40} height={40} className="h-10 w-10 object-cover" />
                      </div>
                    </div>
                    <div className="min-w-0 2xl:w-full">
                      <p className="truncate text-balance text-base font-semibold text-white 2xl:overflow-visible 2xl:whitespace-normal 2xl:text-clip">{getShortName(product.slug)}</p>
                      <p className="mt-1 text-pretty text-xs leading-5 text-white/46">{product.category[locale]}</p>
                    </div>
                  </div>
                  <div className={`mt-4 text-[11px] uppercase tracking-[0.24em] text-white/42 ${pageInlineDotTextClass}`}>
                    <span className={pageInlineDotClass} style={{ backgroundColor: product.accent.primary }} />
                    <span>{product.badge[locale]}</span>
                  </div>
                  <p className="mt-4 text-balance text-sm leading-7 text-white/72">{product.workflowRole[locale]}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${pageSectionLargeBlockTopClass} rounded-[2rem] bg-white/[0.02] px-4 py-6 sm:px-6 sm:py-8`}>
          <div className="text-center">
            <h3 className="text-balance text-2xl font-semibold text-white sm:text-3xl">{locale === "zh" ? "流程关系图" : "Workflow Map"}</h3>
            <p className="mx-auto mt-4 max-w-2xl text-balance text-sm leading-7 text-white/50 sm:text-base">
              {locale === "zh" ? "UCDT 系列软件流程关系" : "How the UCDT apps connect."}
            </p>
          </div>
          <div className={`${pageSectionSubBlockTopClass} mx-auto max-w-6xl`}>
            <Image src={workflowLink} alt="UCDT workflow map" className="h-auto w-full" priority />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqSection({ locale, openFaq, onFaqChange }: FaqSectionProps) {
  return (
    <section id="faq" className={`${pageSectionShellClass} ${pageSectionSpacingClass}`}>
      <div className="mx-auto max-w-3xl">
        <div className={pageSectionHeaderClass}>
          <h2 className={pageSectionTitleClass}>{locale === "zh" ? "常见问题" : "FAQ"}</h2>
        </div>
        <div className="mt-10 space-y-2 sm:mt-12">
          {faqItems.map((item, index) => {
            const isOpen = openFaq === index;

            return (
              <div key={item.question.en} className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => onFaqChange(isOpen ? null : index)}
                  className="group flex w-full items-center justify-between py-6 text-left focus:outline-none"
                >
                  <span className="text-balance text-lg font-medium text-white/90 transition-colors group-hover:text-[var(--accent)]">{item.question[locale]}</span>
                  <span className={`ml-4 text-2xl text-white/40 transition-standard ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                {isOpen ? <div className="pb-6 pr-10 text-balance text-sm leading-7 text-white/60 sm:text-base">{item.answer[locale]}</div> : null}
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
    <footer className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <hr className="border-white/10" />
        <div className="relative z-10 flex flex-col items-center px-6 py-10 text-center sm:py-12">
          <div className="flex items-center gap-3">
            <Image src={siteMeta.logo} alt="UCDT Series" className="h-8 w-auto opacity-90" />
            <span className="text-xl font-bold tracking-tight text-white">{siteMeta.name}</span>
          </div>
          <p className="mt-8 max-w-md text-balance text-sm leading-relaxed text-white/40 sm:mt-10">
            {footerDescriptionLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < footerDescriptionLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] sm:mt-10 sm:text-[11px]" style={{ color: "#686C6E" }}>
            <p>GPL 3.0 License</p>
            <span className="hidden sm:inline">·</span>
            <p>© 2026 <a href="https://bitcookies.nousbuild.com/" target="_blank" rel="noopener noreferrer">Bitcookies</a></p>
            <span className="hidden sm:inline">·</span>
            <p>Developed by <a href="https://www.nousbuild.org/" target="_blank" rel="noopener noreferrer">ONing</a></p>
          </div>
          <Image src={bitcookiesWords} alt="Bitcookies" width={140} height={40} className="mt-8 h-8 w-auto opacity-80 sm:mt-10" />
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
