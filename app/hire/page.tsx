import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import {
  getHome,
  getPage,
  getProjects,
  getResumes,
  resolveImage,
} from "@/lib/content";
import { Button } from "../_components/button";
import { Card } from "../_components/card";
import { Container } from "../_components/container";
import {
  EducationBlock,
  ExperienceList,
  SkillsGrid,
} from "../_components/hire/summary";
import { WorkCard } from "../_components/work-card";

const page = getPage("hire");

export const metadata: Metadata = pageMetadata({
  title: page.meta.title,
  description: page.meta.description,
  path: "/hire",
});

/** /hire, "Hire me" (brief 4.3). Every string comes from content/pages/hire.yaml. */
export default function Page() {
  const { skills, evidence, experience, education, resumePicker } = page;
  const home = getHome();
  const resumes = getResumes();
  const projects = new Map(
    getProjects().map((project) => [project.slug, project]),
  );
  const evidenceCards = evidence.slugs.flatMap((slug) => {
    const project = projects.get(slug);
    if (!project) return [];
    const cover = project.cover ? resolveImage(project.cover) : null;
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
          label: project.sections?.problem
            ? home.work.caseStudyLabel
            : home.work.pageLabel,
          href: `/projects/${slug}`,
        },
      },
    ];
  });

  return (
    <>
      <Container
        as="section"
        aria-label="Introduction"
        className="flex flex-col gap-3 pt-16 pb-10"
      >
        <p className="type-mono-label text-muted">{page.eyebrow}</p>
        <h1 className="type-title max-w-[22ch]">{page.title}</h1>
        {page.availability ? (
          <p className="inline-flex items-center gap-2.5 font-mono text-[12.5px] tracking-[0.02em] text-ink-2">
            <span
              className="size-2 shrink-0 rounded-full bg-accent"
              aria-hidden="true"
            />
            {page.availability}
          </p>
        ) : null}
      </Container>

      <Container
        as="section"
        aria-label={skills.heading}
        className="flex flex-col gap-6 pb-14"
      >
        <h2 className="type-h2">{skills.heading}</h2>
        <SkillsGrid skills={skills} />
      </Container>

      <section
        aria-label={evidence.heading}
        className="border-y border-line bg-ground-2"
      >
        <Container className="flex flex-col gap-6 py-14">
          <h2 className="type-h2">{evidence.heading}</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
            {evidenceCards.map((card) => (
              <WorkCard
                key={card.slug}
                title={card.title}
                summary={card.summary}
                tags={card.tags}
                cover={card.cover}
                live={card.live}
                page={card.page}
              />
            ))}
          </div>
        </Container>
      </section>

      <Container
        as="section"
        aria-label={experience.heading}
        className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] gap-10 pt-14 pb-10"
      >
        <div className="flex min-w-0 flex-col gap-4">
          <h2 className="type-h2">{experience.heading}</h2>
          <ExperienceList experience={experience} />
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <h2 className="type-h2">{education.heading}</h2>
          <EducationBlock education={education} />
        </div>
      </Container>

      <Container
        as="section"
        aria-label={resumePicker.heading}
        className="flex flex-col gap-6 pt-6 pb-16"
      >
        <h2 className="type-h2">{resumePicker.heading}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-5">
          {resumePicker.items.map((item) => {
            const file = resumes.find(
              (resume) => resume.audience === item.audience,
            )?.file;
            return (
              <Card as="article" key={item.audience}>
                <h3 className="type-h3">{item.title}</h3>
                <p className="text-[15px] leading-[1.55] text-ink-2">
                  {item.text}
                </p>
                <div className="mt-auto pt-2">
                  <Button
                    href={file ?? "/resume"}
                    variant={file ? "primary" : "secondary"}
                  >
                    {file
                      ? resumePicker.downloadLabel
                      : resumePicker.fallbackLabel}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </>
  );
}
