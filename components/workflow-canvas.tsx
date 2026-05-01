"use client";

import { useEffect, useRef } from "react";
import type { Product } from "@/data/products";

type WorkflowCanvasProps = {
  products: Product[];
};

type NodeLayout = {
  x: number;
  y: number;
  width: number;
  label?: string;
  labelX?: number;
  labelY?: number;
  labelColor?: string;
};

const nodeLayouts: Record<string, NodeLayout> = {
  extraction: {
    x: 0.08,
    y: 0.12,
    width: 0.24,
    label: "建筑几何提取",
    labelX: 0.22,
    labelY: 0.28,
    labelColor: "#9B5CFF",
  },
  processing: {
    x: 0.1,
    y: 0.58,
    width: 0.26,
    label: "数据标准化\n数据聚合",
    labelX: 0.24,
    labelY: 0.8,
    labelColor: "#1994F0",
  },
  computing: {
    x: 0.5,
    y: 0.1,
    width: 0.25,
    label: "能耗 / 碳排放模拟",
    labelX: 0.72,
    labelY: 0.08,
    labelColor: "#F58A1F",
  },
  analysis: {
    x: 0.59,
    y: 0.55,
    width: 0.23,
    label: "指标计算",
    labelX: 0.72,
    labelY: 0.76,
    labelColor: "#E41A6D",
  },
  planning: {
    x: 0.89,
    y: 0.31,
    width: 0.22,
    label: "规划决策",
    labelX: 0.95,
    labelY: 0.5,
    labelColor: "#38C172",
  },
};

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  start: { x: number; y: number },
  cp: { x: number; y: number },
  end: { x: number; y: number },
  color: string,
  lineWidth: number,
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.quadraticCurveTo(cp.x, cp.y, end.x, end.y);
  ctx.stroke();

  const angle = Math.atan2(end.y - cp.y, end.x - cp.x);
  const headLength = lineWidth * 4.2;

  ctx.beginPath();
  ctx.moveTo(end.x, end.y);
  ctx.lineTo(
    end.x - headLength * Math.cos(angle - Math.PI / 7),
    end.y - headLength * Math.sin(angle - Math.PI / 7),
  );
  ctx.moveTo(end.x, end.y);
  ctx.lineTo(
    end.x - headLength * Math.cos(angle + Math.PI / 7),
    end.y - headLength * Math.sin(angle + Math.PI / 7),
  );
  ctx.stroke();
  ctx.restore();
}

export function WorkflowCanvas({ products }: WorkflowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const draw = async () => {
      const parentWidth = canvas.parentElement?.clientWidth ?? 1100;
      const width = Math.max(780, Math.min(1180, parentWidth));
      const height = Math.round(width * 0.42);
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = "100%";
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const loadedImages = await Promise.all(
        products.map(async (product) => [product.id, await loadImage(product.wordmark.src)] as const),
      );
      const imageMap = new Map(loadedImages);

      drawArrow(
        ctx,
        { x: width * 0.13, y: height * 0.17 },
        { x: width * 0.13, y: height * 0.33 },
        { x: width * 0.13, y: height * 0.52 },
        "#9B5CFF",
        4,
      );
      drawArrow(
        ctx,
        { x: width * 0.29, y: height * 0.57 },
        { x: width * 0.38, y: height * 0.53 },
        { x: width * 0.55, y: height * 0.57 },
        "#1994F0",
        4,
      );
      drawArrow(
        ctx,
        { x: width * 0.31, y: height * 0.56 },
        { x: width * 0.42, y: height * 0.54 },
        { x: width * 0.43, y: height * 0.17 },
        "#1994F0",
        4,
      );
      drawArrow(
        ctx,
        { x: width * 0.61, y: height * 0.18 },
        { x: width * 0.83, y: height * 0.14 },
        { x: width * 0.62, y: height * 0.52 },
        "#F58A1F",
        4,
      );
      drawArrow(
        ctx,
        { x: width * 0.82, y: height * 0.55 },
        { x: width * 0.92, y: height * 0.54 },
        { x: width * 0.88, y: height * 0.36 },
        "#E41A6D",
        4,
      );

      products.forEach((product) => {
        const layout = nodeLayouts[product.id];
        const image = imageMap.get(product.id);
        if (!layout || !image) {
          return;
        }

        const boxWidth = width * layout.width;
        const ratio = image.height / image.width;
        const boxHeight = boxWidth * ratio;
        const x = width * layout.x - boxWidth / 2;
        const y = height * layout.y - boxHeight / 2;

        ctx.drawImage(image, x, y, boxWidth, boxHeight);

        if (layout.label && layout.labelX && layout.labelY && layout.labelColor) {
          ctx.save();
          ctx.fillStyle = layout.labelColor;
          ctx.font = `600 ${Math.max(12, width * 0.015)}px Inter, Arial, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          layout.label.split("\n").forEach((line, index, lines) => {
            const offset = (index - (lines.length - 1) / 2) * Math.max(16, width * 0.02);
            ctx.fillText(line, width * layout.labelX!, height * layout.labelY! + offset);
          });
          ctx.restore();
        }
      });
    };

    void draw();

    const resizeObserver = new ResizeObserver(() => {
      void draw();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [products]);

  return (
    <div className="overflow-x-auto">
      <canvas ref={canvasRef} className="mx-auto block min-w-[780px] max-w-full" />
    </div>
  );
}
