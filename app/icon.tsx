import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 30%, rgba(52,178,123,0.28), transparent 42%), linear-gradient(180deg, #07110d 0%, #04070d 45%, #020409 100%)",
          borderRadius: 96,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 26,
            borderRadius: 84,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "linear-gradient(180deg, rgba(13,18,32,0.72), rgba(8,12,24,0.68))",
            boxShadow: "0 30px 80px rgba(0,0,0,0.38)",
          }}
        />
        <div
          style={{
            display: "flex",
            height: 250,
            width: 250,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 72,
            background: "linear-gradient(180deg, rgba(52,178,123,0.18), rgba(255,255,255,0.06))",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 24px 70px rgba(52,178,123,0.18)",
            color: "white",
            fontSize: 110,
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
