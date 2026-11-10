import Link from "next/link";

export type NavItem = {
  href: string;
  label: string;
};

type NavLinkListProps = {
  items: NavItem[];
  /** Current pathname, or null when it is not known yet (static fallback). */
  pathname: string | null;
  /** Layout classes for each link; defaults to the inline header style. */
  linkClassName?: string;
  /** Called when a link is chosen (the phone menu closes itself). */
  onNavigate?: () => void;
};

/** The phone Menu button (issue #67); shared so the server fallback matches the client button. */
export const menuButtonClass =
  "nav-menu-button inline-flex min-h-[44px] items-center rounded-button border border-line-strong bg-surface px-4 text-[15px] font-semibold text-ink hover:bg-ground-2 min-[900px]:hidden";

const inlineLinkClass =
  "inline-flex min-h-[44px] items-center rounded-button px-3 text-[15px] no-underline";

/** The header links. Shared by the static fallback, the client version and the phone menu. */
export function NavLinkList({
  items,
  pathname,
  linkClassName = inlineLinkClass,
  onNavigate,
}: NavLinkListProps) {
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
            onClick={onNavigate}
            className={`${linkClassName} ${
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
