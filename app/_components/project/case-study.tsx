import Image from "next/image";
import type { Project } from "@/lib/content";
import { Button } from "../button";
import { Container } from "../container";
import { ExternalLink } from "../external-link";
import { Prose } from "../prose";
import { PipelineRow } from "./pipeline-row";

const eyebrowClass = "type-mono-label text-muted";
const bodyClass = "max-w-[60ch] text-[16.5px] leading-[1.6] text-ink-2";
const twoColumn =
  "grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] gap-10";

function Eyebrow({ number, label }: { number: number; label: string }) {
  return (
    <p className={eyebrowClass}>
      {String(number).padStart(2, "0")} / {label}
    </p>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <>
      {items.map((paragraph, index) => (
        <p key={index} className={bodyClass}>
          {paragraph}
        </p>
      ))}
    </>
  );
}

/** Live link first as the primary button, then the other links as secondary buttons. */
export function ProjectLinks({ project }: { project: Project }) {
  const buttons = [
    ...(project.live
      ? [{ label: project.live.label, url: project.live.url, primary: true }]
      : []),
    ...project.links.map((link) => ({
      label: link.label,
      url: link.url,
      primary: false,
    })),
  ];
  if (buttons.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {buttons.map((button) => (
        <Button
          key={button.url + button.label}
          href={button.url}
          external
          variant={button.primary ? "primary" : "secondary"}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
}

/**
 * The case-study sections in brief order: problem, built, how, failed,
 * results, visuals, links (with the footnote). Missing sections are skipped
 * and the eyebrow numbers follow the sections that exist.
 */
export function CaseStudySections({ project }: { project: Project }) {
  const sections = project.sections ?? {};
  const hasLinks = Boolean(project.live) || project.links.length > 0;
  let number = 0;
  const next = () => ++number;

  return (
    <>
      {project.paragraphs && project.paragraphs.length > 0 ? (
        <Container
          as="section"
          aria-label="About this project"
          className="pb-14"
        >
          <Prose paragraphs={project.paragraphs} className="max-w-[64ch]" />
        </Container>
      ) : null}

      {sections.problem ? (
        <section
          aria-label="The problem"
          className="border-t border-line bg-ground-2"
        >
          <Container className={`${twoColumn} py-14`}>
            <div className="flex min-w-0 flex-col gap-4">
              <Eyebrow number={next()} label="Problem" />
              <h2 className="type-h2">{sections.problem.heading}</h2>
              <Paragraphs items={sections.problem.paragraphs} />
            </div>
            {sections.problem.stats && sections.problem.stats.length > 0 ? (
              <ul className="m-0 flex min-w-0 list-none flex-col gap-3 p-0">
                {sections.problem.stats.map((stat) => (
                  <li
                    key={stat.label}
                    className="flex items-baseline gap-4 rounded-card border border-line bg-surface px-[18px] py-4"
                  >
                    <p className="min-w-[96px] shrink-0 font-display text-[30px] leading-none font-bold tracking-[-0.02em] text-ink">
                      {stat.value}
                    </p>
                    <p className="text-[14px] leading-[1.5] text-ink-2">
                      {stat.label}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
          </Container>
        </section>
      ) : null}

      {sections.built ? (
        <Container
          as="section"
          aria-label="What was built"
          className={`${twoColumn} pt-16 pb-14`}
        >
          <div className="flex min-w-0 flex-col gap-4">
            <Eyebrow number={next()} label="What we built" />
            <h2 className="type-h2">{sections.built.heading}</h2>
            <Paragraphs items={sections.built.paragraphs} />
          </div>
          {sections.built.steps && sections.built.steps.length > 0 ? (
            <ol className="m-0 flex min-w-0 list-none flex-col gap-3.5 p-0">
              {sections.built.steps.map((step, index) => (
                <li key={step.lead} className="flex items-start gap-4">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-[12.5px] font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="text-[15.5px] leading-[1.55] text-ink-2">
                    <strong className="font-semibold text-ink">
                      {step.lead}
                    </strong>{" "}
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          ) : null}
        </Container>
      ) : null}

      {sections.how ? (
        <section
          aria-label="How it works"
          className="border-t border-line bg-ground-2"
        >
          <Container className="flex flex-col gap-7 py-14">
            <div className="flex max-w-[64ch] flex-col gap-3">
              <Eyebrow number={next()} label="How it works" />
              <h2 className="type-h2">{sections.how.heading}</h2>
              <Paragraphs items={sections.how.paragraphs} />
            </div>
            {sections.how.columns && sections.how.columns.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-4">
                {sections.how.columns.map((column) => (
                  <div
                    key={column.title}
                    className="flex min-w-0 flex-col gap-2.5 rounded-card border border-line bg-surface p-6"
                  >
                    <p className="font-mono text-[12px] font-semibold tracking-[0.06em] text-accent uppercase">
                      {column.title}
                    </p>
                    <p className="text-[15px] leading-[1.55] text-ink-2">
                      {column.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
            {sections.how.pipeline && sections.how.pipeline.length > 0 ? (
              <div className="rounded-card border border-line bg-surface p-6">
                <PipelineRow
                  steps={sections.how.pipeline}
                  label={sections.how.pipelineLabel}
                />
              </div>
            ) : null}
          </Container>
        </section>
      ) : null}

      {sections.failed ? (
        <Container
          as="section"
          aria-label="What failed and what changed"
          className={`${twoColumn} pt-16 pb-14`}
        >
          <div className="flex min-w-0 flex-col gap-3">
            <Eyebrow number={next()} label="What failed and what changed" />
            <h2 className="type-h2">{sections.failed.heading}</h2>
          </div>
          <ul className="m-0 flex min-w-0 list-none flex-col border-t border-line p-0">
            {sections.failed.items.map((item) => (
              <li
                key={item.lead}
                className="border-b border-line py-4 text-[15.5px] leading-[1.55] text-ink-2"
              >
                <strong className="font-semibold text-ink">{item.lead}</strong>{" "}
                {item.text}
              </li>
            ))}
          </ul>
        </Container>
      ) : null}

      {sections.results ? (
        <section
          aria-label="Results"
          className="border-t border-line bg-ground-2"
        >
          <Container className={`${twoColumn} py-14`}>
            <div className="flex min-w-0 flex-col gap-3">
              <Eyebrow number={next()} label="Results" />
              <h2 className="type-h2">{sections.results.heading}</h2>
            </div>
            <ul className="m-0 flex min-w-0 list-none flex-col gap-3 p-0">
              {sections.results.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[15.5px] leading-[1.55] text-ink-2"
                >
                  <span
                    className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {sections.visuals &&
      (sections.visuals.images.length > 0 || sections.visuals.video) ? (
        <Container
          as="section"
          aria-label="Visuals"
          className="flex flex-col gap-5 pt-16 pb-14"
        >
          <Eyebrow number={next()} label="Visuals" />
          {sections.visuals.images.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] gap-4">
              {sections.visuals.images.map((image) => (
                <Image
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  width={1600}
                  height={1000}
                  sizes="(min-width: 800px) 50vw, 100vw"
                  className="h-auto w-full rounded-image border border-line"
                />
              ))}
            </div>
          ) : null}
          {sections.visuals.video ? (
            <ExternalLink
              href={sections.visuals.video.url}
              className="text-[15px] font-semibold text-accent no-underline hover:text-accent-strong"
            >
              {sections.visuals.video.label}
            </ExternalLink>
          ) : null}
        </Container>
      ) : null}

      {hasLinks || sections.footnote ? (
        <Container
          as="section"
          aria-label="Links"
          className="flex flex-col gap-[22px] pt-16 pb-16"
        >
          {hasLinks ? (
            <div className="flex flex-col gap-3">
              <Eyebrow number={next()} label="Links" />
              <ProjectLinks project={project} />
            </div>
          ) : null}
          {sections.footnote ? (
            <p className="max-w-[80ch] text-[13.5px] leading-[1.6] text-muted">
              {sections.footnote}
            </p>
          ) : null}
        </Container>
      ) : null}
    </>
  );
}
