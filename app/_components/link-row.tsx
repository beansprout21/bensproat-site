import Link from "next/link";
import type { PageLink } from "@/lib/content";
import { ExternalLink, opensInNewTab } from "./external-link";

/** A row of content links: external ones in accent with the arrow, internal ones underlined (brief 1.5). */
export function LinkRow({
  links,
  className = "",
}: {
  links: PageLink[];
  className?: string;
}) {
  if (links.length === 0) return null;
  return (
    <div
      className={`flex flex-wrap items-center gap-x-[18px] gap-y-1 ${className}`}
    >
      {links.map((link) =>
        link.external || opensInNewTab(link.href) ? (
          <ExternalLink
            key={link.href + link.label}
            href={link.href}
            className="min-h-[44px] text-[14.5px] font-semibold text-accent no-underline hover:text-accent-strong"
          >
            {link.label}
          </ExternalLink>
        ) : (
          <Link
            key={link.href + link.label}
            href={link.href}
            className="inline-flex min-h-[44px] items-center text-[14.5px] font-medium text-ink-2 underline underline-offset-4 hover:text-ink"
          >
            {link.label}
          </Link>
        ),
      )}
    </div>
  );
}
