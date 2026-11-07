import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { getPage, getProfile, getResumes } from "@/lib/content";
import { Button } from "../_components/button";
import { Card } from "../_components/card";
import { Container } from "../_components/container";
import { formatDate } from "../_components/format-date";
import {
  EducationBlock,
  ExperienceList,
  SkillsGrid,
} from "../_components/hire/summary";

const page = getPage("resume");
const hire = getPage("hire");

export const metadata: Metadata = pageMetadata({
  title: page.meta.title,
  description: page.meta.description,
  path: "/resume",
});

/** /resume (brief 4.7). Download cards from resumes.yaml; the summary reuses the /hire fields. */
export default function Page() {
  const profile = getProfile();
  const resumes = getResumes();
  const picker = new Map(
    hire.resumePicker.items.map((item) => [item.audience, item]),
  );

  return (
    <>
      <Container
        as="section"
        aria-label="Introduction"
        className="flex flex-col gap-3 pt-16 pb-10"
      >
        <h1 className="type-title">{page.title}</h1>
        <p className="type-lede max-w-[60ch] text-ink-2">{page.lede}</p>
      </Container>

      <Container as="section" aria-label="Downloads" className="pb-14">
        {resumes.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-5">
            {resumes.map((resume) => {
              const who = picker.get(resume.audience);
              return (
                <Card as="article" key={resume.id}>
                  <h2 className="type-h3">{resume.label}</h2>
                  {who ? (
                    <p className="text-[15px] leading-[1.55] text-ink-2">
                      {who.text}
                    </p>
                  ) : null}
                  <p className="font-mono text-[12px] tracking-[0.06em] text-muted uppercase">
                    Updated {formatDate(resume.updated)}
                  </p>
                  <div className="mt-auto pt-2">
                    <Button href={resume.file}>{page.downloadLabel}</Button>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <p className="type-body max-w-[60ch] text-ink-2">
            {page.emptyState.before}{" "}
            <a
              href={`mailto:${profile.email}`}
              className="font-semibold text-accent underline underline-offset-4 hover:text-accent-strong"
            >
              {page.emptyState.linkLabel}
            </a>{" "}
            {page.emptyState.after}
          </p>
        )}
      </Container>

      <section
        aria-label="Summary"
        className="border-t border-line bg-ground-2"
      >
        <Container className="flex flex-col gap-12 py-14">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] gap-10">
            <div className="flex min-w-0 flex-col gap-4">
              <h2 className="type-h2">{hire.education.heading}</h2>
              <EducationBlock education={hire.education} />
            </div>
            <div className="flex min-w-0 flex-col gap-4">
              <h2 className="type-h2">{hire.experience.heading}</h2>
              <ExperienceList experience={hire.experience} />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="type-h2">{hire.skills.heading}</h2>
            <SkillsGrid skills={hire.skills} />
          </div>
        </Container>
      </section>
    </>
  );
}
