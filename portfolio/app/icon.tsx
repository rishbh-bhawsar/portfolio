import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
            "linear-gradient(135deg, #0f1218 0%, #07080c 100%)",
          color: "#5aa9ff",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: -1,
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          borderRadius: 6,
          border: "1px solid rgba(90,169,255,0.35)",
        }}
      >
        RS
      </div>
    ),
    { ...size },
  );
}
