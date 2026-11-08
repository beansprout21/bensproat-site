import { getPage, getResumes } from "@/lib/content";
import { Button } from "./button";
import { CardStrip } from "./card-strip";
import { formatDate } from "./format-date";

type Level = 2 | 3 | 4;

export type ResumeCardProps = {
  /** 1-based position, shown in the strip's number circle; omitted on the General card. */
  number?: number;
  label: string;
  /** Who this version is for. */
  text?: string;
  /** ISO date from content/resumes.yaml. */
  updated: string;
  file: string;
  downloadLabel: string;
  /** Right-hand strip label, for example "PDF". */
  tag: string;
  headingLevel?: Level;
  className?: string;
};

/**
 * One resume download card (issue #45, shared with the home page in #56):
 * strip, label, one-liner, updated date and the download button, which
 * opens the PDF in a new tab.
 */
export function ResumeCard({
  number,
  label,
  text,
  updated,
  file,
  downloadLabel,
  tag,
  headingLevel = 2,
  className = "",
}: ResumeCardProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <article
      className={`flex min-w-0 flex-col overflow-hidden rounded-card border-[1.5px] border-accent-strong bg-surface ${className}`}
    >
      <CardStrip number={number} label={label} right={tag} />
      <div className="flex flex-1 flex-col gap-3 p-[22px]">
        <Heading className="font-display text-[24px] leading-[1.2] font-bold tracking-[-0.01em] text-ink">
          {label}
        </Heading>
        {text ? (
          <p className="text-[15px] leading-[1.55] text-ink-2">{text}</p>
        ) : null}
        <p className="font-mono text-[12px] tracking-[0.06em] text-ink uppercase">
          Updated {formatDate(updated)}
        </p>
        <div className="mt-auto pt-2">
          <Button href={file}>{downloadLabel}</Button>
        </div>
      </div>
    </article>
  );
}

/**
 * The resume downloads shared by /resume and the home page (issue #63): the
 * General resume as a full-width card, then "Or pick the one for the role"
 * and the three role versions. `level` is the heading level of the General
 * card and the versions heading; the version cards sit one level below.
 */
export function ResumeDownloads({ level }: { level: 2 | 3 }) {
  const resumes = getResumes();
  const page = getPage("resume");
  const picker = new Map(
    getPage("hire").resumePicker.items.map((item) => [item.audience, item]),
  );
  const general = resumes.find((resume) => resume.audience === "general");
  const versions = resumes.filter((resume) => resume.audience !== "general");
  const VersionsHeading = `h${level}` as const;

  return (
    <div className="flex flex-col gap-5">
      {general ? (
        <ResumeCard
          label={general.label}
          text={page.general.text}
          updated={general.updated}
          file={general.file}
          downloadLabel={page.downloadLabel}
          tag={page.downloadTag}
          headingLevel={level}
        />
      ) : null}
      {versions.length > 0 ? (
        <>
          <VersionsHeading className="pt-3 font-display text-[20px] leading-[1.25] font-bold tracking-[-0.01em] text-ink">
            {page.versionsHeading}
          </VersionsHeading>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-5">
            {versions.map((resume, index) => (
              <ResumeCard
                key={resume.id}
                number={index + 1}
                label={resume.label}
                text={picker.get(resume.audience)?.text}
                updated={resume.updated}
                file={resume.file}
                downloadLabel={page.downloadLabel}
                tag={page.downloadTag}
                headingLevel={(level + 1) as Level}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
