import Link from "next/link";

export type NavItem = {
  href: string;
  label: string;
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
        const active =
          exact || (pathname !== null && pathname.startsWith(`${item.href}/`));
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={exact ? "page" : undefined}
            className={`inline-flex min-h-[44px] items-center rounded-button px-3 text-[15px] no-underline ${
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
