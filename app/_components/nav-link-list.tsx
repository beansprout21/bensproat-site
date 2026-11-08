import Link from "next/link";

export type NavItem = {
  href: string;
  label: string;
  /** Shown only below 721 px. */
  mobileOnly?: boolean;
};

type NavLinkListProps = {
  items: NavItem[];
  /** Current pathname, or null when it is not known yet (static fallback). */
  pathname: string | null;
};

/** The header links. Shared by the static fallback and the client version. */
export function NavLinkList({ items, pathname }: NavLinkListProps) {
  return (
    <>
      {items.map((item) => {
        const exact = pathname === item.href;
        // Home is active on / only; other items also cover their subpages.
        const active =
          exact ||
          (item.href !== "/" &&
            pathname !== null &&
            pathname.startsWith(`${item.href}/`));
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={exact ? "page" : undefined}
            className={`inline-flex min-h-[44px] items-center rounded-button px-3 text-[15px] no-underline ${
              item.mobileOnly ? "min-[721px]:hidden" : ""
            } ${
              active
                ? "font-semibold text-ink"
                : "font-medium text-ink-2 hover:text-ink"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
