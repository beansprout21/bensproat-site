import type { ReactNode } from "react";
import { ArrowOut } from "./icons";

type ExternalLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/**
 * A link to another site (brief 1.5): opens in a new tab, shows the arrow-out
 * icon, and tells screen readers about the new tab.
 */
export function ExternalLink({
  href,
  className = "",
  children,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 ${className}`}
    >
      {children}
      <ArrowOut />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
