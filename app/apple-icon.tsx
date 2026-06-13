import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 30% 0%, rgba(90,169,255,0.25), transparent 60%), linear-gradient(160deg, #0f1218 0%, #07080c 100%)",
          color: "#e6e8ee",
          fontSize: 92,
          fontWeight: 700,
          letterSpacing: -4,
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          borderRadius: 36,
          border: "2px solid rgba(90,169,255,0.35)",
        }}
      >
        <span
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #5aa9ff 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            display: "flex",
          }}
        >
          RS
        </span>
      </div>
    ),
    { ...size },
  );
}
