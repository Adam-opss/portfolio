import { ImageResponse } from "next/og";
import { portfolio } from "@/config/portfolio";
import { site } from "@/config/site";

export const runtime = "edge";
export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded monochrome share card generated at request time. */
export default function OpengraphImage() {
  const { person } = portfolio;
  const initials = person.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(120% 120% at 0% 0%, #17171b 0%, #08080a 55%)",
          color: "#f4f4f6",
          fontFamily: "sans-serif",
        }}
      >
        {/* top: monogram + availability */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "92px",
              height: "92px",
              borderRadius: "22px",
              background: "linear-gradient(135deg, #ffffff, #a1a1aa)",
              color: "#0a0a0c",
              fontSize: "42px",
              fontWeight: 700,
            }}
          >
            {initials}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              border: "1px solid #2a2a30",
              borderRadius: "999px",
              padding: "12px 24px",
              color: "#9a9ea6",
              fontSize: "22px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "999px",
                background: "#22d3ee",
              }}
            />
            {person.availability}
          </div>
        </div>

        {/* middle: name + title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "104px",
              fontWeight: 800,
              letterSpacing: "-4px",
              lineHeight: 1,
            }}
          >
            {person.name}
          </div>
          <div style={{ fontSize: "44px", color: "#9a9ea6", marginTop: "18px" }}>
            {person.title}
          </div>
        </div>

        {/* bottom: tagline */}
        <div
          style={{
            display: "flex",
            fontSize: "30px",
            color: "#cdd0d6",
            maxWidth: "960px",
          }}
        >
          {person.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
