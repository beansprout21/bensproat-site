import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ExternalLink } from "./external-link";

export type WorkCardProps = {
  title: string;
  summary: string;
  tags: string[];
  cover: { src: string; alt: string } | null;
  live: { label: string; url: string } | null;
  page: { label: string; href: string };
  /** 3 under a section heading (default), 2 when the grid sits directly under the page title. */
  headingLevel?: 2 | 3;
  className?: string;
  style?: CSSProperties;
};

/** Work grid card (brief 1.5): optional 16:10 cover, mono tags, title, summary, links. */
export function WorkCard({
  title,
  summary,
  tags,
  cover,
  live,
  page,
  headingLevel = 3,
  className = "",
  style,
}: WorkCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article
      className={`flex min-w-0 flex-col gap-3.5 ${className}`}
      style={style}
    >
      {cover ? (
        <Image
          src={cover.src}
          alt={cover.alt}
          width={1600}
          height={1000}
          sizes="(min-width: 721px) 33vw, 100vw"
          className="aspect-[16/10] w-full rounded-card border border-line object-cover"
        />
      ) : null}
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[12px] tracking-[0.06em] text-muted uppercase">
          {tags.join(", ")}
        </p>
        <Heading className="font-display text-[22px] leading-[1.2] font-semibold tracking-[-0.01em] text-ink">
          {title}
        </Heading>
        <p className="text-[15px] leading-[1.55] text-ink-2">{summary}</p>
        <div className="flex flex-wrap items-center gap-x-[18px] gap-y-1">
          {live ? (
            <ExternalLink
              href={live.url}
              className="min-h-[44px] text-[14.5px] font-semibold text-accent no-underline hover:text-accent-strong"
            >
              {live.label}
            </ExternalLink>
          ) : null}
          <Link
            href={page.href}
            className="inline-flex min-h-[44px] items-center text-[14.5px] font-medium text-ink-2 underline underline-offset-4 hover:text-ink"
          >
            {page.label}
          </Link>
        </div>
      </div>
    </article>
  );
}
