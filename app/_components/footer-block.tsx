"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { NewTabNote, newTabProps, opensInNewTab } from "./external-link";
import { ArrowOut } from "./icons";

export type FooterButton = { label: string; href: string; external?: boolean };
export type FooterConfig = { heading: string; buttons: FooterButton[] };

type FooterBlockProps = {
  /** Per-pathname heading and extra buttons, for example { "/hire": { heading: "Let's talk.", buttons: [...] } }. */
  configs: Record<string, FooterConfig>;
  fallback: FooterConfig;
  headingClass: string;
  /** The email and phone buttons, always first. */
  leadButtons: ReactNode;
  /** Always last, for example the "All my links" button. */
  tailButtons: ReactNode;
};

export const footerSecondaryClass =
  "inline-flex min-h-[46px] items-center gap-2 rounded-button border border-on-dark-muted px-5 text-[15px] font-semibold text-on-dark no-underline hover:border-on-dark";

/** Footer heading and button row for the current page (brief 1.5, per-page overrides in 4.2 to 4.8). */
export function FooterBlock({
  configs,
  fallback,
  headingClass,
  leadButtons,
  tailButtons,
}: FooterBlockProps) {
  const pathname = usePathname();
  const config = configs[pathname] ?? fallback;
  return (
    <>
      <h2 className={headingClass}>{config.heading}</h2>
      <div className="flex flex-wrap gap-3">
        {leadButtons}
        {config.buttons.map((button) =>
          button.external || opensInNewTab(button.href) ? (
            <a
              key={button.label}
              href={button.href}
              {...newTabProps()}
              className={footerSecondaryClass}
            >
              {button.label}
              <ArrowOut />
              <NewTabNote />
            </a>
          ) : button.href.startsWith("/") ? (
            <Link
              key={button.label}
              href={button.href}
              className={footerSecondaryClass}
            >
              {button.label}
            </Link>
          ) : (
            <a
              key={button.label}
              href={button.href}
              className={footerSecondaryClass}
            >
              {button.label}
            </a>
          ),
        )}
        {tailButtons}
      </div>
    </>
  );
}
