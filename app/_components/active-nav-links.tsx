"use client";

import { usePathname } from "next/navigation";
import { NavLinkList, type NavItem } from "./nav-link-list";

/**
 * Header links with the current page marked. Reads the pathname on the
 * client, so the server renders the plain list as a Suspense fallback.
 */
export function ActiveNavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return <NavLinkList items={items} pathname={pathname} />;
}
