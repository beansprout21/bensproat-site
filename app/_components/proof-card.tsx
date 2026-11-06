import Link from "next/link";
import type { CSSProperties } from "react";
import { ExternalLink } from "./external-link";

export type ProofCardProps = {
  /** 1-based position in the current order; rendered as "01". */
  rank: number;
  kind: string;
  title: string;
  text: string;
  live: { label: string; url: string } | null;
  page: { label: string; href: string };
  className?: string;
  style?: CSSProperties;
};

/** Proof strip card (brief 1.5): mono rank and kind, title, body, live link first. */
export function ProofCard({
  rank,
  kind,
  title,
  text,
  live,
  page,
  className = "",
  style,
}: ProofCardProps) {
  return (
    <article
      className={`flex min-w-0 flex-col gap-3 rounded-card border border-line bg-surface p-6 ${className}`}
      style={style}
    >
      <p className="flex gap-2.5 font-mono text-[12px] tracking-[0.06em] text-muted uppercase">
        <span className="font-semibold text-accent">
          {String(rank).padStart(2, "0")}
        </span>
        <span>{kind}</span>
      </p>
      <h2 className="font-display text-[21px] leading-[1.25] font-semibold tracking-[-0.01em] text-ink">
        {title}
      </h2>
      <p className="text-[15px] leading-[1.55] text-ink-2">{text}</p>
      <div className="mt-auto flex flex-wrap items-center gap-x-[18px] gap-y-1">
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
    </article>
  );
}
