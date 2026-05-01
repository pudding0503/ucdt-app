import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background: "radial-gradient(circle at 50% 22%, rgba(52,178,123,0.18), transparent 30%), linear-gradient(180deg, #07110d 0%, #04070d 45%, #020409 100%)",
          color: "white",
          padding: "48px 56px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 24,
            borderRadius: 32,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "linear-gradient(180deg, rgba(13,18,32,0.72), rgba(8,12,24,0.68))",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                height: 68,
                width: 68,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                background: "linear-gradient(180deg, rgba(52,178,123,0.18), rgba(255,255,255,0.08))",
                border: "1px solid rgba(255,255,255,0.12)",
                fontSize: 36,
                fontWeight: 700,
                letterSpacing: "-0.08em",
              }}
            >
              U
            </div>
            <div style={{ fontSize: 28, fontWeight: 600 }}>UCDT Series</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 860 }}>
            <div style={{ fontSize: 72, lineHeight: 1.04, fontWeight: 700, letterSpacing: "-0.06em" }}>Urban Digital Twin Downloads</div>
            <div style={{ marginTop: 22, fontSize: 30, lineHeight: 1.5, color: "rgba(255,255,255,0.72)" }}>
              Bilingual releases, previews, and product roles for the five-part UCDT workflow.
            </div>
          </div>
          <div style={{ display: "flex", gap: 14, color: "rgba(255,255,255,0.56)", fontSize: 22 }}>
            <div>Extraction</div>
            <div>·</div>
            <div>Processing</div>
            <div>·</div>
            <div>Analysis</div>
            <div>·</div>
            <div>Computing</div>
            <div>·</div>
            <div>Planning</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
