"use client";

import { useMemo, useState } from "react";
import { pageSectionShellClass, pageSectionLargeBlockTopClass, pageProductSwitcherSectionClass } from "@/components/layout-spacing";
import { ProductPreview } from "@/components/product-preview";
import {
  FaqSection,
  getDisplayVersion,
  HeroSection,
  HighlightsSection,
  markdownToLines,
  ProductOverviewSection,
  ProductSwitcher,
  SiteFooter,
  ThemeStyle,
  TopNav,
} from "@/components/download-page-sections";
import {
  products,
  siteMeta,
  type Locale,
} from "@/data/products";

export function DownloadPage() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [activeId, setActiveId] = useState(products[1].id);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activeProduct = useMemo(
    () => products.find((product) => product.id === activeId) ?? products[0],
    [activeId],
  );

  const isReleased = activeProduct.status === "released";
  const githubUrl = activeProduct.repoUrl ?? siteMeta.githubUrl;
  const releaseLines = markdownToLines(activeProduct.releaseMarkdown);
  const displayVersion = getDisplayVersion(activeProduct.version, locale);

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

      <TopNav locale={locale} onLocaleChange={setLocale} githubUrl={githubUrl} accent={activeProduct.accent} />

      <HeroSection
        locale={locale}
        activeProduct={activeProduct}
        isReleased={isReleased}
        displayVersion={displayVersion}
        releaseLines={releaseLines}
      />

      <section className={`${pageSectionShellClass} ${pageProductSwitcherSectionClass}`}>
        <div id="products" className="w-full">
          <ProductSwitcher locale={locale} activeId={activeProduct.id} onProductChange={setActiveId} />
        </div>

        <div key={activeProduct.id} className={`content-fade-in w-full max-w-6xl ${pageSectionLargeBlockTopClass}`}>
          <ProductPreview product={activeProduct} locale={locale} />
        </div>
      </section>

      <div key={`${activeProduct.id}-details`} className="content-fade-in">
        <ProductOverviewSection
          locale={locale}
          activeProduct={activeProduct}
          activeStatus={activeProduct.status}
          displayVersion={displayVersion}
        />
        <HighlightsSection locale={locale} activeProduct={activeProduct} />
      </div>
      <FaqSection locale={locale} openFaq={openFaq} onFaqChange={setOpenFaq} />
      <SiteFooter locale={locale} />
    </main>
  );
}
