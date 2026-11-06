"use client";

import { usePathname } from "next/navigation";

type FooterHeadingProps = {
  /** Pathname to heading overrides, for example { "/about": "Say hello." }. */
  headings: Record<string, string>;
  fallback: string;
  className: string;
};

/** Footer H2 that lets a page override the default heading by pathname. */
export function FooterHeading({
  headings,
  fallback,
  className,
}: FooterHeadingProps) {
  const pathname = usePathname();
  return <h2 className={className}>{headings[pathname] ?? fallback}</h2>;
}
