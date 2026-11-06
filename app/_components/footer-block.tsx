"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowOut } from "./icons";

export type FooterButton = { label: string; href: string; external?: boolean };
export type FooterConfig = { heading: string; buttons: FooterButton[] };

type FooterBlockProps = {
  /** Per-pathname heading and extra buttons, for example { "/hire": { heading: "Let's talk.", buttons: [...] } }. */
  configs: Record<string, FooterConfig>;
  fallback: FooterConfig;
  headingClass: string;
  /** The email button, always first. */
  emailButton: ReactNode;
};

const extraButtonClass =
  "inline-flex min-h-[46px] items-center gap-2 rounded-button border border-on-dark-muted px-5 text-[15px] font-semibold text-on-dark no-underline hover:border-on-dark";

/** Footer heading and button row for the current page (brief 1.5, per-page overrides in 4.2 to 4.8). */
export function FooterBlock({
  configs,
  fallback,
  headingClass,
  emailButton,
}: FooterBlockProps) {
  const pathname = usePathname();
  const config = configs[pathname] ?? fallback;
  return (
    <>
      <h2 className={headingClass}>{config.heading}</h2>
      <div className="flex flex-wrap gap-3">
        {emailButton}
        {config.buttons.map((button) =>
          button.external ? (
            <a
              key={button.label}
              href={button.href}
              target="_blank"
              rel="noopener noreferrer"
              className={extraButtonClass}
            >
              {button.label}
              <ArrowOut />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : button.href.startsWith("/") && !button.href.endsWith(".pdf") ? (
            <Link
              key={button.label}
              href={button.href}
              className={extraButtonClass}
            >
              {button.label}
            </Link>
          ) : (
            <a
              key={button.label}
              href={button.href}
              className={extraButtonClass}
            >
              {button.label}
            </a>
          ),
        )}
      </div>
    </>
  );
}
