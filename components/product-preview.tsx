"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { Locale, Product } from "@/data/products";

type LightboxRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type ProductPreviewProps = {
  product: Product;
  locale: Locale;
};

const lightboxRestingTransform = "translate3d(0, 0, 0) scale(1)";
const lightboxFrameRadius = "24px";
const lightboxThumbnailRadius = "16px";
const lightboxAnimationDuration = 320;
const lightboxContentLeadDuration = 145;
const lightboxOpenCleanupDelay = lightboxAnimationDuration + 32;
const lightboxProxyOpacityDuration = 180;
const lightboxImageSizes = "(max-width: 640px) calc(100vw - 2rem), min(calc(100vw - 4rem), calc((100vh - 5rem) * 1.8), 1320px)";
const lightboxContentTransition = "opacity 160ms cubic-bezier(0.22, 1, 0.36, 1)";
const lightboxProxyTransition = `transform ${lightboxAnimationDuration}ms cubic-bezier(0.22, 1, 0.36, 1), border-radius ${lightboxAnimationDuration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${lightboxProxyOpacityDuration}ms ease-out`;
const lightboxOverlayStyle: CSSProperties = {
  backgroundColor: "rgba(2, 5, 11, 0.84)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
};

function getLightboxWidthStyle(image: StaticImageData | null) {
  if (!image) {
    return undefined;
  }

  return `min(calc(100vw - 4rem), calc((100vh - 5rem) * ${image.width / image.height}), 1320px)`;
}

export function ProductPreview({ product, locale }: ProductPreviewProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedImageOrigin, setSelectedImageOrigin] = useState<LightboxRect | null>(null);
  const [isLightboxOverlayVisible, setIsLightboxOverlayVisible] = useState(false);
  const [isLightboxContentVisible, setIsLightboxContentVisible] = useState(false);
  const [isLightboxProxyVisible, setIsLightboxProxyVisible] = useState(false);
  const [lightboxFrameNode, setLightboxFrameNode] = useState<HTMLDivElement | null>(null);
  const [lightboxProxyRect, setLightboxProxyRect] = useState<LightboxRect | null>(null);
  const [lightboxProxyTransform, setLightboxProxyTransform] = useState(lightboxRestingTransform);
  const [lightboxProxyBorderRadius, setLightboxProxyBorderRadius] = useState(lightboxFrameRadius);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const selectedImageTriggerRef = useRef<HTMLButtonElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const handoffTimerRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  const screenshots = product.screenshots ?? [];
  const previewHeading = locale === "zh" ? "界面预览" : "See it in action";
  const previewText =
    locale === "zh"
      ? "快速查看当前版本的界面风格、主要交互与整体布局。"
      : "A clean, intuitive interface designed for focus and speed.";
  const screenshotsHeading = locale === "zh" ? "界面截图" : "Screenshots";
  const screenshotText =
    locale === "zh"
      ? "补充展示关键界面与操作视图，便于快速浏览主要工作界面。"
      : "A clean, intuitive interface designed for focus and speed.";
  const previewGridStyle: CSSProperties = {
    backgroundImage:
      "linear-gradient(to right, rgb(52, 178, 123) 1px, transparent 1px), linear-gradient(rgb(52, 178, 123) 1px, transparent 1px)",
    backgroundSize: "80px 80px",
    maskImage: "radial-gradient(circle, black 20%, transparent 70%)",
  };
  const previewBackdropStyle: CSSProperties = {
    background: `linear-gradient(180deg, rgba(2, 5, 11, 0.08) 0%, rgba(3, 10, 17, 0.42) 16%, rgba(5, 17, 26, 0.72) 34%, ${product.accent.surface} 66%, rgba(7, 56, 46, 0.94) 100%), radial-gradient(120% 92% at 50% 100%, ${product.accent.primary} 0%, ${product.accent.glow} 24%, rgba(10, 37, 29, 0.9) 56%, rgba(2, 5, 11, 0) 100%)`,
  };
  const hasPreviewVideo = Boolean(product.previewVideo);
  const activeScreenshot = selectedImage !== null ? screenshots[selectedImage] ?? null : null;
  const activeScreenshotLabel =
    selectedImage !== null ? `${product.slug} screenshot ${selectedImage + 1}` : `${product.slug} screenshot preview`;
  const activeScreenshotWidthStyle = getLightboxWidthStyle(activeScreenshot);
  const isDialogOpen = selectedImage !== null;

  const setLightboxFrameRef = useCallback((node: HTMLDivElement | null) => {
    setLightboxFrameNode(node);
  }, []);

  const getLightboxRect = useCallback((element: Element): LightboxRect => {
    const rect = element.getBoundingClientRect();

    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  }, []);

  const getTransformFromRects = useCallback((originRect: LightboxRect, targetRect: LightboxRect) => {
    const translateX = originRect.left - targetRect.left;
    const translateY = originRect.top - targetRect.top;
    const scaleX = originRect.width / targetRect.width;
    const scaleY = originRect.height / targetRect.height;

    return `translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`;
  }, []);

  const hasRenderableRect = useCallback((rect: LightboxRect | null): rect is LightboxRect => {
    return Boolean(rect && rect.width > 0 && rect.height > 0);
  }, []);

  const resetLightboxProxyState = useCallback(() => {
    setIsLightboxProxyVisible(false);
    setLightboxProxyRect(null);
    setLightboxProxyTransform(lightboxRestingTransform);
    setLightboxProxyBorderRadius(lightboxFrameRadius);
  }, []);

  const showLightboxContentImmediately = useCallback(() => {
    setIsLightboxOverlayVisible(true);
    setIsLightboxContentVisible(true);
    resetLightboxProxyState();
  }, [resetLightboxProxyState]);

  const showLightboxProxy = useCallback((rect: LightboxRect, transform: string, borderRadius: string) => {
    setIsLightboxProxyVisible(true);
    setLightboxProxyRect(rect);
    setLightboxProxyTransform(transform);
    setLightboxProxyBorderRadius(borderRadius);
  }, []);

  const clearPendingLightboxMotion = useCallback(() => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (handoffTimerRef.current !== null) {
      window.clearTimeout(handoffTimerRef.current);
      handoffTimerRef.current = null;
    }

    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
  }, []);

  const resetLightboxAnimationState = useCallback(() => {
    setIsLightboxOverlayVisible(false);
    setIsLightboxContentVisible(false);
    resetLightboxProxyState();
  }, [resetLightboxProxyState]);

  const finishLightboxClose = useCallback(() => {
    setSelectedImage(null);
    setSelectedImageOrigin(null);
    resetLightboxAnimationState();
    selectedImageTriggerRef.current = null;
  }, [resetLightboxAnimationState]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !hasPreviewVideo) {
      return undefined;
    }

    const playPromise = video.play();

    if (playPromise) {
      playPromise.catch(() => undefined);
    }

    return () => {
      video.pause();
    };
  }, [hasPreviewVideo, product.id, product.previewVideo]);

  useLayoutEffect(() => {
    if (selectedImage === null) {
      return undefined;
    }

    setIsLightboxOverlayVisible(true);

    if (!lightboxFrameNode || !selectedImageOrigin) {
      return undefined;
    }

    const targetRect = getLightboxRect(lightboxFrameNode);

    if (!hasRenderableRect(targetRect) || !hasRenderableRect(selectedImageOrigin)) {
      showLightboxContentImmediately();
      return undefined;
    }

    setIsLightboxContentVisible(false);
    showLightboxProxy(targetRect, getTransformFromRects(selectedImageOrigin, targetRect), lightboxThumbnailRadius);

    animationFrameRef.current = window.requestAnimationFrame(() => {
      setLightboxProxyTransform(lightboxRestingTransform);
      setLightboxProxyBorderRadius(lightboxFrameRadius);
      animationFrameRef.current = null;
    });

    handoffTimerRef.current = window.setTimeout(() => {
      setIsLightboxContentVisible(true);
      handoffTimerRef.current = null;
    }, Math.max(lightboxAnimationDuration - lightboxContentLeadDuration, 120));

    transitionTimerRef.current = window.setTimeout(() => {
      setIsLightboxProxyVisible(false);
      transitionTimerRef.current = null;
    }, lightboxOpenCleanupDelay);

    return () => {
      clearPendingLightboxMotion();
    };
  }, [clearPendingLightboxMotion, getLightboxRect, getTransformFromRects, hasRenderableRect, lightboxFrameNode, selectedImage, selectedImageOrigin, showLightboxContentImmediately, showLightboxProxy]);

  useEffect(() => {
    return () => {
      clearPendingLightboxMotion();
    };
  }, [clearPendingLightboxMotion]);

  const openLightbox = (index: number, element: HTMLButtonElement) => {
    clearPendingLightboxMotion();

    selectedImageTriggerRef.current = element;
    setSelectedImageOrigin(getLightboxRect(element));
    setIsLightboxOverlayVisible(true);
    setIsLightboxContentVisible(false);
    resetLightboxProxyState();
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    if (selectedImage === null || transitionTimerRef.current !== null) {
      return;
    }

    clearPendingLightboxMotion();

    const originRect = selectedImageTriggerRef.current ? getLightboxRect(selectedImageTriggerRef.current) : selectedImageOrigin;
    const targetRect = lightboxFrameNode ? getLightboxRect(lightboxFrameNode) : null;

    setIsLightboxContentVisible(false);
    setIsLightboxOverlayVisible(false);

    if (hasRenderableRect(originRect) && hasRenderableRect(targetRect)) {
      const resolvedOriginRect = originRect;
      const resolvedTargetRect = targetRect;

      showLightboxProxy(targetRect, lightboxRestingTransform, lightboxFrameRadius);

      animationFrameRef.current = window.requestAnimationFrame(() => {
        setLightboxProxyTransform(getTransformFromRects(resolvedOriginRect, resolvedTargetRect));
        setLightboxProxyBorderRadius(lightboxThumbnailRadius);
        animationFrameRef.current = null;
      });

      transitionTimerRef.current = window.setTimeout(() => {
        finishLightboxClose();
        transitionTimerRef.current = null;
      }, lightboxAnimationDuration);
    } else {
      transitionTimerRef.current = window.setTimeout(() => {
        finishLightboxClose();
        transitionTimerRef.current = null;
      }, lightboxAnimationDuration);
    }
  };

  return (
    <div className="relative overflow-visible">
      <section className="relative overflow-visible pb-28 pt-6 sm:pb-36 sm:pt-10">
        <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-full w-screen -translate-x-1/2 overflow-hidden">
          <div className="absolute inset-0" style={previewBackdropStyle} />
          <div className="absolute inset-0 opacity-[0.12]" style={previewGridStyle} />
        </div>
        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{previewHeading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg font-light text-white/40">{previewText}</p>
        </div>
        <div className="relative z-10 mx-auto mt-12 max-w-5xl">
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1015] shadow-[0_24px_80px_rgba(0,0,0,0.36)]">
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/28 via-transparent to-transparent" />
              {hasPreviewVideo ? (
                <video
                  key={product.id}
                  ref={videoRef}
                  src={product.previewVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="block h-auto w-full"
                />
              ) : (
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#08101a]">
                  <div className="absolute inset-0 opacity-[0.18]" style={previewGridStyle} />
                  <div className="absolute inset-x-[8%] top-[14%] h-[20%] rounded-[1.5rem] border border-white/10 bg-white/[0.04] backdrop-blur-md" />
                  <div className="absolute left-[8%] top-[41%] h-[42%] w-[24%] rounded-[1.5rem] border border-white/10 bg-black/20 backdrop-blur-md" />
                  <div className="absolute right-[8%] top-[41%] h-[42%] w-[56%] rounded-[1.5rem] border border-white/10 bg-black/20 backdrop-blur-md" />
                  <div className="absolute inset-x-[12%] top-[20%] flex items-center gap-4">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-lg font-semibold text-white"
                      style={{ boxShadow: `0 14px 40px ${product.accent.glow}` }}
                    >
                      {product.slug.replace("UCDT ", "").charAt(0)}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">{locale === "zh" ? "预览制作中" : "Preview in Progress"}</p>
                      <p className="mt-1 text-sm text-white/55">
                        {locale === "zh"
                          ? "当前以程序化概念界面代替演示视频，后续会接入真实录屏。"
                          : "A procedural concept panel is shown here until a recorded demo is available."}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-[12%] top-[48%] flex w-[16%] flex-col gap-3">
                    <div className="h-3 rounded-full bg-white/10" />
                    <div className="h-3 w-[72%] rounded-full bg-white/8" />
                    <div className="h-3 w-[58%] rounded-full bg-white/8" />
                    <div className="mt-3 h-20 rounded-[1rem] border border-white/8 bg-white/[0.03]" />
                  </div>
                  <div className="absolute right-[12%] top-[48%] grid w-[48%] grid-cols-2 gap-3">
                    <div className="col-span-2 h-24 rounded-[1rem] border border-white/8 bg-white/[0.04]" />
                    <div className="h-24 rounded-[1rem] border border-white/8 bg-white/[0.03]" />
                    <div className="h-24 rounded-[1rem] border border-white/8 bg-white/[0.03]" />
                  </div>
                  <div
                    className="absolute bottom-[12%] left-[12%] h-2.5 w-24 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${product.accent.primary}, ${product.accent.secondary})` }}
                  />
                </div>
              )}
            </div>
            <div className="absolute -left-4 -top-4 h-8 w-8 rounded-tl-lg border-l-2 border-t-2" style={{ borderColor: product.accent.secondary }} />
            <div className="absolute -right-4 -top-4 h-8 w-8 rounded-tr-lg border-r-2 border-t-2" style={{ borderColor: product.accent.secondary }} />
            <div className="absolute -bottom-4 -left-4 h-8 w-8 rounded-bl-lg border-b-2 border-l-2" style={{ borderColor: product.accent.secondary }} />
            <div className="absolute -bottom-4 -right-4 h-8 w-8 rounded-br-lg border-b-2 border-r-2" style={{ borderColor: product.accent.secondary }} />
          </div>
        </div>
      </section>

      {screenshots.length ? (
        <section className="relative overflow-hidden pb-6 pt-10 sm:pb-10 sm:pt-14">
          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{screenshotsHeading}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg font-light text-white/40">{screenshotText}</p>
          </div>
          <div className="relative z-10 mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            {screenshots.map((image, index) => (
              <button
                key={`${product.id}-${index}`}
                type="button"
                onClick={(event) => openLightbox(index, event.currentTarget)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] text-left transition-colors duration-300 hover:border-white/20"
              >
                <div className="aspect-square w-full overflow-hidden">
                  <Image
                    src={image}
                    alt={`${product.slug} screenshot ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholder="blur"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="mb-5 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-sm text-white/80 backdrop-blur-sm">
                    {locale === "zh" ? "点击放大" : "Click to expand"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      <Dialog.Root open={isDialogOpen} onOpenChange={(open) => {
        if (!open) {
          closeLightbox();
        }
      }}>
        <Dialog.Portal>
          <Dialog.Overlay
            className={`fixed inset-0 z-[80] transition-opacity duration-300 ${isLightboxOverlayVisible ? "opacity-100" : "opacity-0"}`}
            style={lightboxOverlayStyle}
          />
          {activeScreenshot ? (
            <Dialog.Content
              ref={setLightboxFrameRef}
              onOpenAutoFocus={(event) => event.preventDefault()}
              onCloseAutoFocus={(event) => event.preventDefault()}
              className="fixed left-1/2 top-1/2 z-[81] w-fit overflow-hidden border border-white/10 bg-black/70 p-2 shadow-[0_32px_120px_rgba(0,0,0,0.48)] outline-none"
              style={{
                borderRadius: lightboxFrameRadius,
                transform: "translate(-50%, -50%)",
                opacity: isLightboxContentVisible ? 1 : 0,
                pointerEvents: isLightboxContentVisible ? "auto" : "none",
                transition: lightboxContentTransition,
                willChange: "opacity",
              }}
            >
              <Dialog.Title className="sr-only">{activeScreenshotLabel}</Dialog.Title>
              <Dialog.Description className="sr-only">
                {locale === "zh" ? "查看当前软件截图的大图预览" : "View the enlarged screenshot preview."}
              </Dialog.Description>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label={locale === "zh" ? "关闭预览" : "Close preview"}
                className={`absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/80 transition-all duration-300 hover:bg-black/75 ${
                  isLightboxContentVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
              >
                <span aria-hidden="true" className="text-xl leading-none">×</span>
              </button>
              <div className="relative" style={{ width: activeScreenshotWidthStyle }}>
                <Image
                  src={activeScreenshot}
                  alt={activeScreenshotLabel}
                  width={activeScreenshot.width}
                  height={activeScreenshot.height}
                  className="block h-auto max-h-[calc(100vh-5rem)] w-full rounded-[1.1rem] object-contain"
                  placeholder="blur"
                  sizes={lightboxImageSizes}
                  priority
                />
              </div>
            </Dialog.Content>
          ) : null}
          {activeScreenshot && isLightboxProxyVisible && lightboxProxyRect ? (
            <div
              aria-hidden="true"
              className="pointer-events-none fixed z-[82] overflow-hidden border border-white/10 bg-black/70 p-2 shadow-[0_32px_120px_rgba(0,0,0,0.48)]"
              style={{
                top: lightboxProxyRect.top,
                left: lightboxProxyRect.left,
                width: lightboxProxyRect.width,
                height: lightboxProxyRect.height,
                borderRadius: lightboxProxyBorderRadius,
                transform: lightboxProxyTransform,
                transformOrigin: "top left",
                opacity: isLightboxContentVisible ? 0 : 1,
                transition: lightboxProxyTransition,
                willChange: "transform, opacity",
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[1.1rem] bg-[#05070d]">
                <Image
                  src={activeScreenshot}
                  alt={activeScreenshotLabel}
                  fill
                  className="object-contain"
                  placeholder="blur"
                  sizes={lightboxImageSizes}
                  priority
                />
              </div>
            </div>
          ) : null}
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
