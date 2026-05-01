import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background: "radial-gradient(circle at 50% 20%, rgba(52,178,123,0.20), transparent 28%), linear-gradient(180deg, #07110d 0%, #04070d 45%, #020409 100%)",
          color: "white",
          padding: "56px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 28,
            borderRadius: 36,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "linear-gradient(180deg, rgba(13,18,32,0.72), rgba(8,12,24,0.68))",
            boxShadow: "0 28px 90px rgba(0,0,0,0.35)",
          }}
        />
        <div style={{ display: "flex", position: "relative", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                height: 78,
                width: 78,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 24,
                background: "linear-gradient(180deg, rgba(52,178,123,0.18), rgba(255,255,255,0.08))",
                border: "1px solid rgba(255,255,255,0.12)",
                fontSize: 40,
                fontWeight: 700,
                letterSpacing: "-0.08em",
              }}
            >
              U
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 18, textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(255,255,255,0.46)" }}>UCDT Series</div>
              <div style={{ fontSize: 30, fontWeight: 600 }}>Urban Digital Twin Downloads</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 860 }}>
            <div style={{ fontSize: 82, lineHeight: 1.02, fontWeight: 700, letterSpacing: "-0.06em" }}>One bilingual hub for five urban workflow tools.</div>
            <div style={{ marginTop: 24, fontSize: 28, lineHeight: 1.5, color: "rgba(255,255,255,0.72)" }}>
              Releases, previews, and workflow roles for Extraction, Processing, Analysis, Computing, and Planning.
            </div>
          </div>
          <div style={{ display: "flex", gap: 14, color: "rgba(255,255,255,0.58)", fontSize: 22 }}>
            <div>Bitcookies</div>
            <div>·</div>
            <div>ONing</div>
            <div>·</div>
            <div>Vercel-ready Next.js site</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
