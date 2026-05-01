"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Locale, Product } from "@/data/products";

type ProductPreviewProps = {
  product: Product;
  locale: Locale;
};

export function ProductPreview({ product, locale }: ProductPreviewProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
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

      {product.screenshots?.length ? (
        <section className="relative overflow-hidden pb-6 pt-10 sm:pb-10 sm:pt-14">
          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{screenshotsHeading}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg font-light text-white/40">{screenshotText}</p>
          </div>
          <div className="relative z-10 mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            {product.screenshots.map((image, index) => (
              <button
                key={`${product.id}-${index}`}
                type="button"
                onClick={() => setSelectedImage(index)}
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

      {selectedImage !== null && product.screenshots ? (
        <div
          className="fixed inset-0 z-[80] overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="flex min-h-full items-center justify-center py-4 sm:py-6">
            <div className="relative max-h-[90vh] max-w-6xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/70 p-2" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute right-3 top-3 z-10 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-sm text-white/80"
              >
                {locale === "zh" ? "关闭" : "Close"}
              </button>
              <Image
                src={product.screenshots[selectedImage]}
                alt={`${product.slug} screenshot ${selectedImage + 1}`}
                className="max-h-[82vh] w-auto rounded-[1.1rem]"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
