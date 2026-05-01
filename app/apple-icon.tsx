import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 30%, rgba(52,178,123,0.24), transparent 40%), linear-gradient(180deg, #07110d 0%, #04070d 45%, #020409 100%)",
          borderRadius: 36,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 10,
            borderRadius: 28,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "linear-gradient(180deg, rgba(13,18,32,0.72), rgba(8,12,24,0.68))",
          }}
        />
        <div
          style={{
            display: "flex",
            height: 90,
            width: 90,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 24,
            background: "linear-gradient(180deg, rgba(52,178,123,0.18), rgba(255,255,255,0.08))",
            border: "1px solid rgba(255,255,255,0.16)",
            color: "white",
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: "-0.08em",
          }}
        >
          U
        </div>
      </div>
    ),
    size,
  );
}
