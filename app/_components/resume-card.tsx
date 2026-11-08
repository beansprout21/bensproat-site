import { Button } from "./button";
import { CardStrip } from "./card-strip";
import { formatDate } from "./format-date";

export type ResumeCardProps = {
  /** 1-based position, shown in the strip's number circle. */
  number: number;
  label: string;
  /** Who this version is for, from the /hire resume picker. */
  text?: string;
  /** ISO date from content/resumes.yaml. */
  updated: string;
  file: string;
  downloadLabel: string;
  /** Right-hand strip label, for example "PDF". */
  tag: string;
  /** 2 on /resume (under the page title), 3 under a section heading. */
  headingLevel?: 2 | 3;
};

/**
 * One resume download card (issue #45, shared with the home page in #56):
 * numbered strip, label, one-liner, updated date and the download button,
 * which opens the PDF in a new tab.
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
}: ResumeCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-card border-[1.5px] border-accent-strong bg-surface">
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
