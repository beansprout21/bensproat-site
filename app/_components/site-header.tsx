import Link from "next/link";
import { Suspense } from "react";
import { getPage, getProfile } from "@/lib/content";
import { ActiveNavLinks } from "./active-nav-links";
import { Mark } from "./mark";
import { NavLinkList, type NavItem } from "./nav-link-list";

/** Header links; "All my links" shows only below 721 px (issue #54). */
function navItems(): NavItem[] {
  return [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/now", label: "Now" },
    { href: "/contact", label: "Contact" },
    { href: "/links", label: getPage("links").name, mobileOnly: true },
  ];
}

/** Site header (brief 1.5): mark and name on the left, links and Resume on the right. */
export function SiteHeader() {
  const profile = getProfile();
  const nav = navItems();

  return (
    <header className="border-b border-line">
      <nav
        aria-label="Primary"
        className="container-x flex flex-wrap items-center gap-x-6 gap-y-3.5 py-3.5"
      >
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center gap-2.5 font-display text-[17px] font-semibold text-ink no-underline"
        >
          <Mark size={26} />
          <span>{profile.name}</span>
        </Link>
        <div className="ml-auto flex flex-wrap items-center gap-x-1.5 gap-y-1">
          <Suspense fallback={<NavLinkList items={nav} pathname={null} />}>
            <ActiveNavLinks items={nav} />
          </Suspense>
          <Link
            href="/resume"
            className="ml-1.5 inline-flex min-h-[44px] items-center rounded-button border border-ink px-4 text-[15px] font-semibold text-ink no-underline hover:bg-ground-2"
          >
            Resume
          </Link>
        </div>
      </nav>
    </header>
  );
}
