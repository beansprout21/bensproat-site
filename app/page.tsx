import type { Metadata } from "next";
import { SITE_NAME, pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import {
  getHome,
  getProfile,
  getProjects,
  getResumes,
  resolveImage,
} from "@/lib/content";
import { buildHomeGraph, serializeJsonLd } from "@/lib/jsonld";
import { Container } from "./_components/container";
import {
  HomeRouter,
  type HomeRouterProps,
} from "./_components/home/home-router";

// Alt text from brief 1.6. The hero omits the photo if the file is missing.
const HEADSHOT = {
  src: "/images/headshot.jpg",
  alt: "Ben Sproat, smiling, in a navy shirt against a white wall",
  width: 960,
  height: 1200,
};

const home = getHome();
const profile = getProfile();

export const metadata: Metadata = pageMetadata({
  title: SITE_NAME,
  description: profile.headline,
  path: "/",
  ownImage: true,
});

function buildProps(): HomeRouterProps {
  const bySlug = new Map(
    getProjects().map((project) => [project.slug, project]),
  );
  const resumes = getResumes();
  const defaultResume =
    resumes.find((resume) => resume.audience === "ai-product") ?? resumes[0];
  const headshot = resolveImage(HEADSHOT.src);

  return {
    hero: {
      name: home.hero.name,
      headline: home.hero.headline,
      headlineAccent: home.hero.headlineAccent,
      sub: home.hero.sub,
      availability: home.hero.availability,
      cta: home.default.cta,
      resume: {
        label: home.hero.resumeLabel,
        href: defaultResume?.file ?? "/resume",
      },
      email: { label: home.hero.emailLabel, href: `mailto:${profile.email}` },
      photo: headshot ? { ...HEADSHOT, src: headshot } : null,
      photoTag: home.hero.photoTag,
    },
    doors: {
      heading: home.doors.heading,
      lede: home.doors.lede,
      panel: home.doors.panel,
      items: home.doors.items,
    },
    work: {
      label: home.work.label,
      heading: home.work.heading,
      all: { label: home.work.allLabel, href: "/projects" },
      // Fixed order (default.order); content:check guarantees a card per slug.
      items: home.default.order.flatMap((slug) => {
        const item = home.work.items.find((card) => card.slug === slug);
        const project = bySlug.get(slug);
        if (!item || !project) return [];
        return [
          {
            slug,
            kind: item.kind,
            title: item.title,
            text: item.text,
            tags: project.tags,
            live: project.live
              ? { label: item.liveLabel, url: project.live.url }
              : null,
            page: { label: item.pageLabel, href: `/projects/${slug}` },
          },
        ];
      }),
    },
  };
}

export default function Home() {
  const props = buildProps();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildHomeGraph(profile)),
        }}
      />
      <HomeRouter {...props} />
      {home.now.line ? (
        <section aria-label={home.now.label} className="border-t border-line">
          <Container className="flex flex-wrap items-baseline gap-x-6 gap-y-2.5 py-7">
            <p className="type-mono-label text-muted">{home.now.label}</p>
            <p className="flex-[1_1_420px] text-[16px] leading-[1.5] text-ink-2">
              {home.now.line}{" "}
              <Link
                href="/now"
                className="font-semibold text-accent no-underline hover:text-accent-strong"
              >
                {home.now.linkLabel}
              </Link>
            </p>
          </Container>
        </section>
      ) : null}
    </>
  );
}
