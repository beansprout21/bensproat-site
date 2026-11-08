import Link from "next/link";
import { Button } from "../button";

export type SelectedWorkCardProps = {
  /** 1-based position, rendered as "01". */
  number: number;
  kind: string;
  title: string;
  text: string;
  tags: string[];
  live: { label: string; url: string } | null;
  page: { label: string; href: string };
};

/**
 * Selected work card on the home page (docs/issues/19-home-refresh.md): a
 * green header strip with the number and kind, then tags, title, text and
 * links. /projects keeps the shared WorkCard.
 */
export function SelectedWorkCard({
  number,
  kind,
  title,
  text,
  tags,
  live,
  page,
}: SelectedWorkCardProps) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-card border-[1.5px] border-accent-strong bg-surface transition-[transform,border-color] duration-200 ease-out hover:border-accent motion-safe:hover:[transform:translateY(-3px)]">
      <p className="flex items-center gap-3 bg-accent-strong px-5 py-3">
        <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-on-dark-accent font-mono text-[11px] font-semibold text-ink">
          {String(number).padStart(2, "0")}
        </span>
        <span className="font-mono text-[12px] tracking-[0.1em] text-white uppercase">
          {kind}
        </span>
      </p>
      <div className="flex flex-1 flex-col gap-3 p-[22px]">
        {tags.length > 0 ? (
          <ul aria-label="Tags" className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-[6px] border border-accent-line px-2 py-[3px] font-mono text-[11.5px] leading-[1.3] text-ink"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
        <h3 className="type-h3 text-ink">{title}</h3>
        <p className="text-[15px] leading-[1.55] text-ink">{text}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
          {live ? (
            <Button
              href={live.url}
              external
              className="min-h-[44px]! px-4! text-[14px]!"
            >
              {live.label}
            </Button>
          ) : null}
          <Link
            href={page.href}
            className="inline-flex min-h-[44px] items-center text-[14.5px] font-medium text-ink underline underline-offset-4 hover:text-accent-strong"
          >
            {page.label}
          </Link>
        </div>
      </div>
    </article>
  );
}
