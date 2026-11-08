import type { ReactNode } from "react";
import { ArrowOut } from "./icons";

const SITE_HOSTS = new Set(["bensproat.com", "www.bensproat.com"]);

/**
 * Links that open in a new tab (docs/issues/26-site-wide-polish.md): any
 * absolute http(s) URL on another host, and the resume PDFs under /resumes/.
 * Site pages, mailto: and tel: stay in the same tab.
 */
export function opensInNewTab(href: string): boolean {
  if (/^https?:\/\//.test(href)) {
    try {
      return !SITE_HOSTS.has(new URL(href).host);
    } catch {
      return true;
    }
  }
  return /^\/resumes\/.+\.pdf$/i.test(href);
}

/** target and rel for a new-tab link; `me` adds rel="me" for Ben's own profiles. */
export function newTabProps(me = false) {
  return {
    target: "_blank",
    rel: me ? "me noopener noreferrer" : "noopener noreferrer",
  } as const;
}

/** The screen-reader note every new-tab link carries. */
export function NewTabNote() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}

type ExternalLinkProps = {
  href: string;
  className?: string;
  /** rel="me" for Ben's own profiles. */
  me?: boolean;
  /** Show the arrow-out icon after the text (default true). */
  icon?: boolean;
  children: ReactNode;
};

/**
 * A link to another site or a resume PDF (brief 1.5): opens in a new tab,
 * shows the arrow-out icon, and tells screen readers about the new tab.
 */
export function ExternalLink({
  href,
  className = "",
  me = false,
  icon = true,
  children,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      {...newTabProps(me)}
      className={`inline-flex items-center gap-1.5 ${className}`}
    >
      {children}
      {icon ? <ArrowOut /> : null}
      <NewTabNote />
    </a>
  );
}
