import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/metadata";
import { getPage, getProfile, getResumes } from "@/lib/content";
import { Button } from "../_components/button";
import { CardStrip } from "../_components/card-strip";
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

/** One "At a glance" block: the shared strip card around existing /hire content. */
function SummaryCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={label}
      className="flex min-w-0 flex-col overflow-hidden rounded-card border-[1.5px] border-accent-strong bg-surface"
    >
      <CardStrip label={label} />
      <div className="p-[22px]">{children}</div>
    </section>
  );
}

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
        <p className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[14px] tracking-[0.02em] text-ink">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-[44px] items-center underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-strong"
          >
            {profile.email}
          </a>
          <a
            href={profile.phoneHref}
            className="inline-flex min-h-[44px] items-center underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-strong"
          >
            {profile.phone}
          </a>
        </p>
      </Container>

      <Container as="section" aria-label="Downloads" className="pb-14">
        {resumes.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-5">
            {resumes.map((resume, index) => {
              const who = picker.get(resume.audience);
              return (
                <article
                  key={resume.id}
                  className="flex min-w-0 flex-col overflow-hidden rounded-card border-[1.5px] border-accent-strong bg-surface"
                >
                  <CardStrip
                    number={index + 1}
                    label={resume.label}
                    right={page.downloadTag}
                  />
                  <div className="flex flex-1 flex-col gap-3 p-[22px]">
                    <h2 className="font-display text-[24px] leading-[1.2] font-bold tracking-[-0.01em] text-ink">
                      {resume.label}
                    </h2>
                    {who ? (
                      <p className="text-[15px] leading-[1.55] text-ink-2">
                        {who.text}
                      </p>
                    ) : null}
                    <p className="font-mono text-[12px] tracking-[0.06em] text-ink uppercase">
                      Updated {formatDate(resume.updated)}
                    </p>
                    <div className="mt-auto pt-2">
                      <Button href={resume.file}>{page.downloadLabel}</Button>
                    </div>
                  </div>
                </article>
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
        aria-labelledby="summary-heading"
        className="border-y border-accent-line bg-accent-tint"
      >
        <Container className="flex flex-col gap-6 py-14">
          <h2 id="summary-heading" className="type-h2">
            {page.summary.heading}
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] items-start gap-5">
            <SummaryCard label={page.summary.education}>
              <EducationBlock education={hire.education} variant="carded" />
            </SummaryCard>
            <SummaryCard label={page.summary.experience}>
              <ExperienceList experience={hire.experience} variant="carded" />
            </SummaryCard>
          </div>
          <SummaryCard label={page.summary.skills}>
            <SkillsGrid skills={hire.skills} variant="carded" />
          </SummaryCard>
        </Container>
      </section>
    </>
  );
}
