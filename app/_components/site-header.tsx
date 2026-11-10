import Link from "next/link";
import { Suspense } from "react";
import { getPage, getProfile } from "@/lib/content";
import { ActiveNavLinks } from "./active-nav-links";
import { Mark } from "./mark";
import { NavMenu } from "./nav-menu";
import { NavLinkList, menuButtonClass, type NavItem } from "./nav-link-list";

/**
 * Header links, in order, before the Resume button (issues #63 and #65).
 * Page labels come from content: /hire and /ventures use their meta.title,
 * /links its visitor-facing name. Inline at 900 px and up; in the Menu panel below.
 */
function navItems(): NavItem[] {
  return [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Work" },
    { href: "/hire", label: getPage("hire").meta.title },
    { href: "/ventures", label: getPage("ventures").meta.title },
    { href: "/about", label: "About" },
    { href: "/now", label: "Now" },
    { href: "/contact", label: "Contact" },
    { href: "/links", label: getPage("links").name },
  ];
}

/**
 * Site header (brief 1.5, issue #67). At 900 px and up: mark and name on the
 * left, the links and Resume on the right. Below 900 px it is one row: mark
 * and name, then Resume and the Menu button; the links open in a panel.
 * Without JavaScript the links show wrapped instead (globals.css).
 */
export function SiteHeader() {
  const profile = getProfile();
  const nav = navItems();

  return (
    <header className="relative border-b border-line">
      <nav
        aria-label="Primary"
        className="site-nav container-x flex items-center gap-x-6 gap-y-3.5 py-3 min-[900px]:flex-wrap min-[900px]:py-3.5"
      >
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center gap-2.5 font-display text-[17px] font-semibold whitespace-nowrap text-ink no-underline"
        >
          <Mark size={26} />
          <span>{profile.name}</span>
        </Link>
        <div className="site-nav-items ml-auto flex items-center gap-x-1.5 gap-y-1 min-[900px]:flex-wrap">
          <div className="nav-inline-links hidden min-[900px]:contents">
            <Suspense fallback={<NavLinkList items={nav} pathname={null} />}>
              <ActiveNavLinks items={nav} />
            </Suspense>
          </div>
          <Link
            href="/resume"
            className="inline-flex min-h-[44px] items-center rounded-button border border-ink px-4 text-[15px] font-semibold text-ink no-underline hover:bg-ground-2 min-[900px]:ml-1.5"
          >
            Resume
          </Link>
          <Suspense
            fallback={
              <button
                type="button"
                aria-expanded={false}
                className={menuButtonClass}
              >
                Menu
              </button>
            }
          >
            <NavMenu items={nav} />
          </Suspense>
        </div>
      </nav>
    </header>
  );
}
