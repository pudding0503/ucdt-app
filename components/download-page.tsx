"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
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
  siteMeta,
  type Locale,
  type Product,
} from "@/data/products";

type DownloadPageProps = {
  products: Product[];
};

type TimeoutRef = {
  current: number | null;
};

const productSwitchExitDelayMs = 180;
const productSwitchEnterDelayMs = 80;

function clearTimeoutRef(timeoutRef: TimeoutRef) {
  if (!timeoutRef.current) {
    return;
  }

  window.clearTimeout(timeoutRef.current);
  timeoutRef.current = null;
}

function getDefaultActiveProductId(products: Product[]) {
  return products.find((product) => product.status === "released")?.id ?? products[0]?.id ?? "";
}

function getRandomReleasedProductId(products: Product[]) {
  const releasedProducts = products.filter((product) => product.status === "released");
  const productPool = releasedProducts.length ? releasedProducts : products;

  return productPool[Math.floor(Math.random() * productPool.length)]?.id ?? "";
}

const productTitleGradientAccents: Record<string, string> = {
  extraction: "var(--ucdt-extraction-gradient-from)",
  processing: "var(--ucdt-processing-gradient-from)",
  analysis: "var(--ucdt-analysis-gradient-from)",
  computing: "var(--ucdt-computing-gradient-from)",
  planning: "var(--ucdt-planning-gradient-from)",
};

export function DownloadPage({ products }: DownloadPageProps) {
  const [locale, setLocale] = useState<Locale>("zh");
  const [activeId, setActiveId] = useState(() => getDefaultActiveProductId(products));
  const [randomizedInitialProduct, setRandomizedInitialProduct] = useState(false);
  const [isProductSwitching, setIsProductSwitching] = useState(false);
  const [isPendingProductSwitch, startProductSwitchTransition] = useTransition();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const switchOutTimeoutRef = useRef<number | null>(null);
  const switchInTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (randomizedInitialProduct) {
      return;
    }

    const randomProductId = getRandomReleasedProductId(products);

    if (randomProductId) {
      setActiveId(randomProductId);
    }

    setRandomizedInitialProduct(true);
  }, [products, randomizedInitialProduct]);

  useEffect(() => (
    () => {
      clearTimeoutRef(switchOutTimeoutRef);
      clearTimeoutRef(switchInTimeoutRef);
    }
  ), []);

  const activeProduct = useMemo(
    () => products.find((product) => product.id === activeId) ?? products[0],
    [activeId, products],
  );

  const isReleased = activeProduct.status === "released";
  const githubUrl = activeProduct.repoUrl ?? siteMeta.githubUrl;
  const releaseLines = markdownToLines(activeProduct.releaseMarkdown);
  const displayVersion = getDisplayVersion(activeProduct.version, locale);
  const titleGradientAccent = productTitleGradientAccents[activeProduct.id] ?? productTitleGradientAccents.processing;
  const appSwitching = isProductSwitching || isPendingProductSwitch;

  const handleProductChange = (productId: string) => {
    if (productId === activeProduct.id) {
      return;
    }

    clearTimeoutRef(switchOutTimeoutRef);
    clearTimeoutRef(switchInTimeoutRef);

    setIsProductSwitching(true);

    switchOutTimeoutRef.current = window.setTimeout(() => {
      startProductSwitchTransition(() => setActiveId(productId));

      switchInTimeoutRef.current = window.setTimeout(() => {
        setIsProductSwitching(false);
      }, productSwitchEnterDelayMs);
    }, productSwitchExitDelayMs);
  };

  const themeStyle: ThemeStyle = {
    "--accent": activeProduct.accent.primary,
    "--accent-soft": activeProduct.accent.glow,
    "--accent-surface": activeProduct.accent.surface,
    "--hero-title-gradient-from": activeProduct.accent.secondary,
    "--hero-title-gradient-to": titleGradientAccent,
  };

  return (
    <main style={themeStyle} className="relative isolate overflow-hidden bg-[#02050b] text-white">
      <div
        className="app-theme-glow pointer-events-none absolute inset-x-0 top-[-8rem] h-[32rem] blur-3xl"
        data-switching={appSwitching}
        style={{ background: `radial-gradient(circle, ${activeProduct.accent.glow} 0%, transparent 68%)` }}
      />
      <div
        className="app-theme-glow pointer-events-none absolute inset-y-[10%] right-[-12rem] h-[28rem] w-[28rem] rounded-full blur-3xl"
        data-switching={appSwitching}
        style={{ background: `radial-gradient(circle, ${activeProduct.accent.surface} 0%, transparent 70%)` }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-[-18rem] h-[34rem] bg-[radial-gradient(circle_at_center,rgba(52,178,123,0.18),transparent_62%)] blur-3xl" />

      <TopNav locale={locale} onLocaleChange={setLocale} githubUrl={githubUrl} accent={activeProduct.accent} />

      <div className="app-switch-soft" data-switching={appSwitching}>
        <HeroSection
          locale={locale}
          activeProduct={activeProduct}
          isReleased={isReleased}
          displayVersion={displayVersion}
          releaseLines={releaseLines}
        />
      </div>

      <section className={`${pageSectionShellClass} ${pageProductSwitcherSectionClass}`}>
        <div id="products" className="w-full">
          <ProductSwitcher locale={locale} products={products} activeId={activeProduct.id} onProductChange={handleProductChange} />
        </div>

        <div key={activeProduct.id} className={`app-switch-soft content-fade-in w-full max-w-6xl ${pageSectionLargeBlockTopClass}`} data-switching={appSwitching}>
          <ProductPreview product={activeProduct} locale={locale} />
        </div>
      </section>

      <div key={`${activeProduct.id}-details`} className="app-switch-soft content-fade-in" data-switching={appSwitching}>
        <ProductOverviewSection
          locale={locale}
          activeProduct={activeProduct}
          activeStatus={activeProduct.status}
          displayVersion={displayVersion}
        />
        <HighlightsSection locale={locale} activeProduct={activeProduct} products={products} />
      </div>
      <FaqSection locale={locale} openFaq={openFaq} onFaqChange={setOpenFaq} />
      <SiteFooter locale={locale} />
    </main>
  );
}
