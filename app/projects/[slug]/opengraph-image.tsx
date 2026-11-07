import { ImageResponse } from "next/og";
import { getProject, getProjects, type Project } from "@/lib/content";
import { OG_FONTS, OG_SIZE, OgFrame, cutAtWord } from "@/lib/og";

// One share card per project (docs/brief-c5.md section 2), built at build time.

export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

function ogLine(project: Project): string {
  return project.ogLine ?? cutAtWord(project.summary, 140);
}

/** Per-project alt text, "<title>: <ogLine>". The card keeps one image per page. */
export async function generateImageMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  return [
    {
      id: "card",
      alt: project ? `${project.title}: ${ogLine(project)}` : "Ben Sproat",
      size: OG_SIZE,
      contentType,
    },
  ];
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  return new ImageResponse(
    <OgFrame
      eyebrow={project?.ogEyebrow ?? "Project"}
      title={project?.title ?? "Ben Sproat"}
      titleSize={88}
      sub={project ? ogLine(project) : ""}
      textWidth={1056}
    />,
    { ...size, fonts: OG_FONTS },
  );
}
