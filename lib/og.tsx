import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ReactNode } from "react";

// Share-image frame (docs/brief-c5.md section 2), shared by app/opengraph-image.tsx
// and app/projects/[slug]/opengraph-image.tsx. Rendered by next/og at build time;
// the fonts are read from assets/og-fonts/ and never reach the browser.

export const OG_SIZE = { width: 1200, height: 630 };

const COLORS = {
  ground: "#FAFAF8",
  ink: "#15171A",
  ink2: "#454A52",
  muted: "#5F656E",
  accent: "#1F7A4A",
  line: "#E4E2DC",
};

const fontDir = join(process.cwd(), "assets/og-fonts");
const [displayBold, interRegular, monoMedium] = await Promise.all([
  readFile(join(fontDir, "InterDisplay-Bold.ttf")),
  readFile(join(fontDir, "Inter-Regular.ttf")),
  readFile(join(fontDir, "JetBrainsMono-Medium.ttf")),
]);

export const OG_FONTS = [
  {
    name: "Inter Display",
    data: displayBold,
    style: "normal" as const,
    weight: 700 as const,
  },
  {
    name: "Inter",
    data: interRegular,
    style: "normal" as const,
    weight: 400 as const,
  },
  {
    name: "JetBrains Mono",
    data: monoMedium,
    style: "normal" as const,
    weight: 500 as const,
  },
];

/** Cuts text at a word boundary so the result, ellipsis included, is shorter than `max` characters. */
export function cutAtWord(text: string, max: number): string {
  if (text.length < max) return text;
  const slice = text.slice(0, max - 4);
  const lastSpace = slice.lastIndexOf(" ");
  return `${slice.slice(0, lastSpace > 0 ? lastSpace : slice.length).replace(/[,;:.]$/, "")}...`;
}

function Mark() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke={COLORS.accent}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21V10.5" />
      <path d="M12 14.5C9 14.5 6.2 12.4 5.5 8.6C9.3 8.3 12 10.6 12 14.5Z" />
      <path d="M12 10.5C12 6.6 14.8 4.2 18.6 4C18 7.9 15.2 10.5 12 10.5Z" />
    </svg>
  );
}

type OgFrameProps = {
  eyebrow: string;
  title: string;
  titleSize: number;
  sub: string;
  /** Right-hand column, for example the headshot on the default card. */
  aside?: ReactNode;
  /** Max width of the text column. */
  textWidth: number;
  /** Max width of the sub line, when narrower than the column. */
  subWidth?: number;
};

export function OgFrame({
  eyebrow,
  title,
  titleSize,
  sub,
  aside,
  textWidth,
  subWidth,
}: OgFrameProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: COLORS.ground,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "64px 72px 52px",
        }}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: textWidth,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Mark />
            <div
              style={{
                fontFamily: "Inter Display",
                fontSize: 30,
                fontWeight: 700,
                color: COLORS.ink,
                letterSpacing: "-0.01em",
              }}
            >
              Ben Sproat
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "JetBrains Mono",
                fontSize: 22,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: COLORS.muted,
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                marginTop: 14,
                fontFamily: "Inter Display",
                fontSize: titleSize,
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                color: COLORS.ink,
              }}
            >
              {title}
            </div>
            <div
              style={{
                marginTop: 22,
                fontFamily: "Inter",
                fontSize: 28,
                lineHeight: 1.35,
                color: COLORS.ink2,
                maxWidth: subWidth ?? textWidth,
              }}
            >
              {sub}
            </div>
            <div
              style={{
                marginTop: 26,
                fontFamily: "JetBrains Mono",
                fontSize: 22,
                color: COLORS.accent,
              }}
            >
              bensproat.com
            </div>
          </div>
        </div>
        {aside}
      </div>
      <div style={{ height: 14, background: COLORS.accent }} />
    </div>
  );
}

export const OG_COLORS = COLORS;
