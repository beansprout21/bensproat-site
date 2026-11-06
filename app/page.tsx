import type { Metadata } from "next";
import Link from "next/link";
import {
  getHome,
  getProfile,
  getProjects,
  getResumes,
  resolveImage,
  type DoorKey,
  type HomeState,
} from "@/lib/content";
import { buildProfilePage, serializeJsonLd } from "@/lib/jsonld";
import { Container } from "./_components/container";
import {
  HomeRouter,
  type HomeRouterProps,
} from "./_components/home/home-router";

// Alt text from brief 1.6. The file itself arrives with issue #10; until it
// exists under /public the hero omits the figure.
const HEADSHOT = {
  src: "/images/headshot.jpg",
  alt: "Ben Sproat, smiling, in a navy shirt against a white wall",
  width: 960,
  height: 1200,
};

const home = getHome();
const profile = getProfile();

export const metadata: Metadata = {
  title: { absolute: home.meta.title },
  description: profile.headline,
};

function buildProps(): HomeRouterProps {
  const projects = getProjects();
  const bySlug = new Map(projects.map((project) => [project.slug, project]));
  const resumes = getResumes();
  const defaultResume =
    resumes.find((resume) => resume.audience === "ai-product") ?? resumes[0];
  const headshot = resolveImage(HEADSHOT.src);

  const states: HomeRouterProps["states"] = { default: home.default };
  for (const door of home.doors.items) {
    states[door.key as DoorKey] = door.state as HomeState;
  }

  return {
    hero: {
      name: home.hero.name,
      headline: home.hero.headline,
      sub: home.hero.sub,
      availability: home.hero.availability,
      resume: {
        label: home.hero.resumeLabel,
        href: defaultResume?.file ?? "/resume",
      },
      email: { label: home.hero.emailLabel, href: `mailto:${profile.email}` },
      photo: headshot ? { ...HEADSHOT, src: headshot } : null,
    },
    states,
    proof: {
      eyebrowPrefix: home.proof.eyebrowPrefix,
      caption: home.proof.caption,
      items: home.proof.items.map((item) => {
        const project = bySlug.get(item.slug);
        return {
          slug: item.slug,
          kind: item.kind,
          title: item.title,
          text: item.text,
          live: project?.live
            ? { label: item.liveLabel, url: project.live.url }
            : null,
          page: { label: item.pageLabel, href: `/projects/${item.slug}` },
        };
      }),
    },
    doors: {
      heading: home.doors.heading,
      lede: home.doors.lede,
      items: home.doors.items.map((door) => ({
        key: door.key,
        title: door.title,
        text: door.text,
        href: door.href,
        external: door.external,
      })),
    },
    work: {
      heading: home.work.heading,
      all: { label: home.work.allLabel, href: "/projects" },
      items: home.default.order.flatMap((slug) => {
        const project = bySlug.get(slug);
        if (!project) return [];
        const cover = project.cover ? resolveImage(project.cover) : null;
        // Same label as the proof strip for the same project ("Case study" for
        // Sprout, "Project page" otherwise); a full case study has a problem section.
        const proofLabel = home.proof.items.find(
          (item) => item.slug === slug,
        )?.pageLabel;
        return [
          {
            slug,
            title: project.title,
            summary: project.summary,
            tags: project.tags,
            cover: cover
              ? { src: cover, alt: `${project.title} screenshot` }
              : null,
            live: project.live ?? null,
            page: {
              label:
                proofLabel ??
                (project.sections?.problem
                  ? home.work.caseStudyLabel
                  : home.work.pageLabel),
              href: `/projects/${slug}`,
            },
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
          __html: serializeJsonLd(buildProfilePage(profile, "/")),
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
