import { ImageResponse } from "next/og";
import { profile } from "@/data/content";

export const runtime = "edge";
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(1200px 600px at 80% -10%, rgba(90,169,255,0.18), transparent 60%), radial-gradient(900px 500px at -10% 20%, rgba(125,211,252,0.10), transparent 60%), #07080c",
          color: "#e6e8ee",
          fontFamily: "system-ui, -apple-system, Segoe UI, Inter, sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.03)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              letterSpacing: -0.5,
              color: "#e6e8ee",
            }}
          >
            RS
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#7dd3fc",
            }}
          >
            Portfolio · 2026
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            {profile.name}.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#8a91a3",
              maxWidth: 980,
              lineHeight: 1.3,
            }}
          >
            {profile.role} — backend systems, distributed workflows, and clean engineering.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#5a6275",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
            <div style={{ display: "flex", color: "#e6e8ee" }}>Spring Boot</div>
            <div style={{ display: "flex", color: "#5a6275" }}>·</div>
            <div style={{ display: "flex", color: "#e6e8ee" }}>Node.js</div>
            <div style={{ display: "flex", color: "#5a6275" }}>·</div>
            <div style={{ display: "flex", color: "#e6e8ee" }}>PostgreSQL</div>
            <div style={{ display: "flex", color: "#5a6275" }}>·</div>
            <div style={{ display: "flex", color: "#e6e8ee" }}>gRPC</div>
          </div>
          <div style={{ display: "flex", color: "#7dd3fc" }}>{profile.location}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
