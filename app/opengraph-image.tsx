import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { DEFAULT_OG_IMAGE } from "@/lib/metadata";
import { OG_COLORS, OG_FONTS, OG_SIZE, OgFrame } from "@/lib/og";

// Default share card for every page without its own (docs/brief-c5.md section 2).

export const alt = DEFAULT_OG_IMAGE.alt;
export const size = OG_SIZE;
export const contentType = "image/png";

const headshot = await readFile(
  join(process.cwd(), "public/images/headshot.jpg"),
  "base64",
);
const headshotSrc = `data:image/jpeg;base64,${headshot}`;

export default async function Image() {
  return new ImageResponse(
    <OgFrame
      eyebrow="AI product builder"
      title="I turn ideas into working AI products."
      titleSize={68}
      sub="Engineering student, Penn State Schreyer Honors College."
      textWidth={680}
      subWidth={560}
      aside={
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={headshotSrc}
          alt=""
          width={360}
          height={450}
          style={{
            width: 360,
            height: 450,
            objectFit: "cover",
            borderRadius: 20,
            border: `2px solid ${OG_COLORS.line}`,
          }}
        />
      }
    />,
    { ...size, fonts: OG_FONTS },
  );
}
